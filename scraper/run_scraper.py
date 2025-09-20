#!/usr/bin/env python3
"""
Simple script to run the Egyptian Handicrafts scraper
"""

from handicrafts_scraper import EgyptianHandicraftsScraper

def main():
    print("🏺 Egyptian Handicrafts Marketplace Data Scraper")
    print("=" * 50)
    
    scraper = EgyptianHandicraftsScraper()
    
    try:
        data = scraper.run_scraper()
        
        print(f"\n✅ Successfully scraped {len(data)} locations!")
        print("\nFiles generated:")
        print("📄 egyptian_handicrafts.json")
        print("📊 egyptian_handicrafts.csv") 
        print("💻 marketplace-data-scraped.ts")
        
        print("\n🎯 Next steps:")
        print("1. Review the generated data files")
        print("2. Update coordinates with actual location data")
        print("3. Add product information for each location")
        print("4. Import the TypeScript file into your application")
        
    except Exception as e:
        print(f"❌ Error running scraper: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())