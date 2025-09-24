import { Request, Response } from "express";
import { sampleProducts, sampleLocations, getProductById, HANDICRAFT_CATEGORIES } from "../../client/lib/marketplace-data";
import { scrapedLocations } from "../../client/lib/marketplace-data-scraped";

const allLocations = [...sampleLocations, ...scrapedLocations];

export function handleGetProducts(req: Request, res: Response) {
  const { category, governorate, minPrice, maxPrice, search } = req.query;
  
  let products = [...sampleProducts];
  
  // Filter by category
  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }
  
  // Filter by governorate
  if (governorate && governorate !== 'all') {
    products = products.filter(product => {
      const location = allLocations.find(loc => loc.id === product.locationId);
      return location?.governorate === governorate;
    });
  }
  
  // Filter by price range
  if (minPrice) {
    products = products.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => p.price <= Number(maxPrice));
  }
  
  // Search filter
  if (search) {
    const query = String(search).toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }
  
  res.json({ products });
}

export function handleGetProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = getProductById(id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Get location details
  const location = allLocations.find(loc => loc.id === product.locationId);
  
  res.json({ 
    product: {
      ...product,
      location
    }
  });
}

export function handleGetFilters(req: Request, res: Response) {
  const governorates = [...new Set(allLocations.map(loc => loc.governorate))];
  
  res.json({
    categories: HANDICRAFT_CATEGORIES,
    governorates
  });
}