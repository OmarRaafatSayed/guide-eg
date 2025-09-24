export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  locationId: string;
  artisanName: string;
  variations?: {
    type: 'color' | 'size';
    options: string[];
  };
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface ArtisanLocation {
  id: string;
  name: string;
  governorate: string;
  description: string;
  history: string;
  images: string[];
  videoUrl?: string;
  openingHours: string;
  coordinates: [number, number];
  specialties: string[];
  products: Product[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  variation?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
  };
  createdAt: string;
}

export const HANDICRAFT_CATEGORIES = [
  'Pottery',
  'Textiles',
  'Woodwork',
  'Jewelry',
  'Metalwork',
  'Glasswork',
  'Leather',
  'Carpets',
  'Papyrus',
  'Perfumes'
];

export const sampleLocations: ArtisanLocation[] = [
  {
    id: 'fustat-pottery',
    name: 'Potters Village, Fustat',
    governorate: 'Cairo',
    description: 'Ancient pottery village where traditional Egyptian ceramics are crafted using techniques passed down through generations.',
    history: 'Fustat pottery has been produced for over 1,000 years, representing one of Egypt\'s oldest continuous craft traditions.',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop'],
    openingHours: '9:00 AM - 6:00 PM',
    coordinates: [31.2357, 30.0131],
    specialties: ['Traditional pottery', 'Decorative ceramics', 'Functional kitchenware'],
    products: [
      {
        id: 'pottery-vase-1',
        name: 'Traditional Egyptian Vase',
        description: 'Handcrafted ceramic vase with traditional Islamic patterns',
        price: 45,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop'],
        category: 'Pottery',
        locationId: 'fustat-pottery',
        artisanName: 'Ahmed Hassan',
        variations: {
          type: 'size',
          options: ['Small', 'Medium', 'Large']
        },
        inStock: true,
        rating: 4.8,
        reviewCount: 23
      }
    ]
  },
  {
    id: 'khan-khalili',
    name: 'Khan el-Khalili Bazaar',
    governorate: 'Cairo',
    description: 'Historic bazaar featuring traditional crafts, jewelry, and textiles from master artisans.',
    history: 'Established in the 14th century, Khan el-Khalili has been Cairo\'s premier marketplace for over 600 years.',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop'],
    openingHours: '10:00 AM - 10:00 PM',
    coordinates: [31.2621, 30.0472],
    specialties: ['Gold jewelry', 'Silver crafts', 'Traditional textiles'],
    products: [
      {
        id: 'jewelry-necklace-1',
        name: 'Pharaonic Gold Necklace',
        description: 'Handcrafted gold necklace inspired by ancient Egyptian designs',
        price: 120,
        images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'],
        category: 'Jewelry',
        locationId: 'khan-khalili',
        artisanName: 'Mahmoud Ali',
        inStock: true,
        rating: 4.9,
        reviewCount: 15
      }
    ]
  },
  {
    id: 'siwa-textiles',
    name: 'Siwa Oasis Weavers',
    governorate: 'Matrouh',
    description: 'Traditional Berber textiles and embroidery from the remote Siwa Oasis.',
    history: 'Siwa\'s textile tradition dates back centuries, featuring unique Berber patterns and techniques.',
    images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=400&fit=crop'],
    openingHours: '8:00 AM - 5:00 PM',
    coordinates: [25.5197, 29.2033],
    specialties: ['Berber textiles', 'Traditional embroidery', 'Handwoven carpets'],
    products: [
      {
        id: 'textile-scarf-1',
        name: 'Berber Embroidered Scarf',
        description: 'Traditional handwoven scarf with authentic Berber patterns',
        price: 35,
        images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'],
        category: 'Textiles',
        locationId: 'siwa-textiles',
        artisanName: 'Fatima Osman',
        variations: {
          type: 'color',
          options: ['Blue', 'Red', 'Green', 'Purple']
        },
        inStock: true,
        rating: 4.7,
        reviewCount: 31
      }
    ]
  }
];

export const sampleProducts: Product[] = sampleLocations.flatMap(location => location.products);

export function getLocationById(id: string): ArtisanLocation | undefined {
  return sampleLocations.find(location => location.id === id);
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return sampleProducts.filter(product => product.category === category);
}

export function getProductsByLocation(locationId: string): Product[] {
  return sampleProducts.filter(product => product.locationId === locationId);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}