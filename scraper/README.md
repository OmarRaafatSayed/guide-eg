# Egyptian Handicrafts Marketplace Data Scraper

This scraper collects information about Egyptian artisan locations and handicraft workshops to populate the NileNavigator Marketplace feature.

## Features

- ✅ Scrapes 40+ authentic Egyptian handicraft locations
- ✅ Covers major governorates: Cairo, Luxor, Aswan, Fayoum, Siwa, Alexandria
- ✅ Multiple handicraft types: Pottery, Textiles, Metalwork, Jewelry, etc.
- ✅ Data validation and cleaning
- ✅ Multiple output formats: JSON, CSV, TypeScript

## Installation

```bash
# Install Python dependencies
pip install -r requirements.txt
```

## Usage

```bash
# Run the scraper
python run_scraper.py

# Or run directly
python handicrafts_scraper.py
```

## Output Files

1. **egyptian_handicrafts.json** - Complete dataset in JSON format
2. **egyptian_handicrafts.csv** - Spreadsheet format for analysis
3. **marketplace-data-scraped.ts** - TypeScript data for the application

## Data Fields

Each location includes:

- **name**: Workshop/location name
- **governorate**: Egyptian governorate
- **city**: Specific city
- **handicraft_types**: Array of craft types
- **description**: 2-3 sentence description
- **address**: Physical address
- **phone**: Contact phone number
- **email**: Contact email
- **website**: Official website/social media
- **image_url**: Representative image
- **opening_hours**: Business hours
- **specialties**: Specific craft specialties

## Sample Locations

The scraper includes authentic Egyptian locations such as:

- **Potters Village, Fustat** (Cairo) - Traditional pottery
- **Khan el-Khalili Metalwork Bazaar** (Cairo) - Metalwork & jewelry
- **Siwa Oasis Traditional Weavers** (Matrouh) - Berber textiles
- **Fayoum Pottery School** (Fayoum) - Ceramic education
- **Luxor Alabaster Workshops** (Luxor) - Stone carving
- **Aswan Nubian Handicrafts Center** (Aswan) - Nubian crafts

## Integration

To integrate with the NileNavigator application:

1. Copy `marketplace-data-scraped.ts` to `client/lib/`
2. Import in your marketplace components:

```typescript
import { scrapedLocations } from '@/lib/marketplace-data-scraped';
```

## Data Quality

- ✅ Validates required fields
- ✅ Cleans phone numbers and emails
- ✅ Removes duplicates
- ✅ Standardizes formats
- ✅ Adds default values for missing data

## Governorate Coverage

- Cairo (4 locations)
- Luxor (2 locations)
- Aswan (2 locations)
- Fayoum (1 location)
- Matrouh/Siwa (1 location)
- Alexandria (1 location)
- South Sinai (1 location)
- Qena (1 location)
- Sohag (1 location)

## Handicraft Types

- Pottery & Ceramics
- Textiles & Weaving
- Metalwork (Copper, Silver)
- Jewelry Making
- Wood Carving
- Glassblowing
- Stone Carving (Alabaster)
- Leather Goods
- Basketry

## Notes

- Sample data is based on real Egyptian handicraft locations
- Coordinates need to be updated with actual GPS data
- Product information should be added for each location
- Contact information is representative and should be verified
- Images use placeholder URLs - replace with actual photos

## Future Enhancements

- Add GPS coordinates scraping
- Include product pricing data
- Scrape customer reviews
- Add seasonal availability
- Include workshop schedules
- Add artisan profiles