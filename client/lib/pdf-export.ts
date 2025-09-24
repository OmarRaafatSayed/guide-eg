import jsPDF from 'jspdf';

interface SelectedItem {
  id: string;
  name: string;
  type: string;
  governorate: string;
  city: string;
}

interface QuestionnaireAnswers {
  days: string;
  budget: string;
  groupSize: string;
  travelWith: string;
  interests: string;
  pace: string;
  accommodation: string;
  transportation: string;
  dining: string;
  specialRequests: string;
}

interface Slot {
  time: string;
  name: string;
  city: string;
  type: string;
  description?: string;
  duration?: string;
  transport?: string;
}

interface ItineraryData {
  selections: SelectedItem[];
  answers: QuestionnaireAnswers;
  itinerary: Slot[][];
  generatedAt: Date;
}

export function exportItineraryToPDF(data: ItineraryData) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false, color: string = '#000000') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(color);
    
    const lines = pdf.splitTextToSize(text, contentWidth);
    const lineHeight = fontSize * 0.4;
    
    // Check if we need a new page
    if (yPosition + (lines.length * lineHeight) > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * lineHeight + 5;
    return yPosition;
  };

  // Helper function to add a section divider
  const addDivider = () => {
    if (yPosition + 10 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;
  };

  // Header
  pdf.setFillColor(41, 128, 185); // Primary blue color
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NileNavigator', margin, 25);
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Your Personalized Egypt Itinerary', margin, 35);
  
  yPosition = 60;

  // Trip Summary Section
  pdf.setTextColor(0, 0, 0);
  addText('TRIP SUMMARY', 16, true, '#2980b9');
  
  const summaryItems = [
    `Duration: ${data.answers.days}`,
    `Group Size: ${data.answers.groupSize} ${data.answers.travelWith}`,
    `Budget: ${data.answers.budget}`,
    `Travel Pace: ${data.answers.pace}`,
    `Primary Interest: ${data.answers.interests}`,
    `Accommodation: ${data.answers.accommodation}`,
    `Transportation: ${data.answers.transportation}`,
    `Dining Preference: ${data.answers.dining}`
  ];

  summaryItems.forEach(item => {
    addText(`• ${item}`, 10);
  });

  if (data.answers.specialRequests && data.answers.specialRequests.trim()) {
    addText('Special Requests:', 12, true);
    addText(data.answers.specialRequests, 10);
  }

  addDivider();

  // Selected Destinations Section
  addText('SELECTED DESTINATIONS', 16, true, '#2980b9');
  
  const destinationsByGov = data.selections.reduce((acc, item) => {
    if (!acc[item.governorate]) {
      acc[item.governorate] = [];
    }
    acc[item.governorate].push(item);
    return acc;
  }, {} as Record<string, SelectedItem[]>);

  Object.entries(destinationsByGov).forEach(([governorate, items]) => {
    addText(governorate, 12, true);
    items.forEach(item => {
      addText(`  • ${item.name} (${item.city})`, 10);
    });
  });

  addDivider();

  // Daily Itinerary Section
  addText('DAILY ITINERARY', 16, true, '#2980b9');

  data.itinerary.forEach((day, dayIndex) => {
    // Check if we need a new page for the day
    if (yPosition + 60 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }

    addText(`Day ${dayIndex + 1}`, 14, true, '#34495e');
    
    if (day.length === 0) {
      addText('Free day for rest or personal exploration', 10, false, '#7f8c8d');
    } else {
      day.forEach(slot => {
        const timeText = `${slot.time} - ${slot.name}`;
        addText(timeText, 11, true);
        
        const details = [];
        if (slot.city) details.push(`Location: ${slot.city}`);
        if (slot.duration) details.push(`Duration: ${slot.duration}`);
        if (slot.transport) details.push(`Transport: ${slot.transport}`);
        
        if (details.length > 0) {
          addText(`  ${details.join(' | ')}`, 9, false, '#7f8c8d');
        }
        
        if (slot.description) {
          addText(`  ${slot.description}`, 9, false, '#7f8c8d');
        }
        
        yPosition += 3; // Extra spacing between activities
      });
    }
    
    yPosition += 10; // Extra spacing between days
  });

  // Footer
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      `Generated on ${data.generatedAt.toLocaleDateString()} | Page ${i} of ${totalPages} | NileNavigator.com`,
      margin,
      pageHeight - 10
    );
  }

  // Save the PDF
  const fileName = `Egypt-Itinerary-${data.generatedAt.toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
}

// Alternative function for generating a more visual PDF with better formatting
export function exportItineraryToPDFAdvanced(data: ItineraryData) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Create a more sophisticated layout with colors and better typography
  // This would be expanded based on specific design requirements
  
  // For now, use the basic version
  exportItineraryToPDF(data);
}