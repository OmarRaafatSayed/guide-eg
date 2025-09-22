import { ArtisanLocation, Product } from './marketplace-data';

export const expandedLocations: ArtisanLocation[] = [
  // Pottery Locations (20)
  {
    id: 'fustat-pottery-1',
    name: 'Master Ahmed Pottery Workshop',
    governorate: 'Cairo',
    description: 'Traditional pottery workshop specializing in Islamic geometric patterns',
    history: 'Family business running for over 50 years in Old Cairo',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop'],
    openingHours: '9:00 AM - 6:00 PM',
    coordinates: [31.2357, 30.0131],
    specialties: ['Islamic pottery', 'Decorative tiles', 'Traditional vases'],
    products: [
      {
        id: 'pottery-tile-1',
        name: 'Islamic Geometric Tile Set',
        description: 'Handcrafted ceramic tiles with traditional Islamic patterns',
        price: 85,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'],
        category: 'Pottery',
        locationId: 'fustat-pottery-1',
        artisanName: 'Ahmed Hassan',
        inStock: true,
        rating: 4.9,
        reviewCount: 34
      }
    ]
  },
  {
    id: 'fayoum-pottery-1',
    name: 'Fayoum Traditional Ceramics',
    governorate: 'Fayoum',
    description: 'Ancient pottery techniques preserved in Fayoum oasis',
    history: 'Pottery tradition dating back to Pharaonic times',
    images: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop'],
    openingHours: '8:00 AM - 5:00 PM',
    coordinates: [29.3084, 30.8428],
    specialties: ['Pharaonic pottery', 'Water jars', 'Decorative bowls'],
    products: [
      {
        id: 'pottery-jar-1',
        name: 'Traditional Water Jar',
        description: 'Large ceramic water storage jar with ancient designs',
        price: 120,
        images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop'],
        category: 'Pottery',
        locationId: 'fayoum-pottery-1',
        artisanName: 'Mohamed Farouk',
        inStock: true,
        rating: 4.7,
        reviewCount: 18
      }
    ]
  },
  {
    id: 'aswan-pottery-1',
    name: 'Nubian Pottery House',
    governorate: 'Aswan',
    description: 'Colorful Nubian pottery with traditional patterns',
    history: 'Nubian pottery traditions passed down through generations',
    images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop'],
    openingHours: '9:00 AM - 7:00 PM',
    coordinates: [24.0889, 32.8998],
    specialties: ['Nubian pottery', 'Colorful ceramics', 'Traditional designs'],
    products: [
      {
        id: 'pottery-nubian-1',
        name: 'Nubian Decorative Bowl',
        description: 'Colorful ceramic bowl with traditional Nubian motifs',
        price: 65,
        images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'],
        category: 'Pottery',
        locationId: 'aswan-pottery-1',
        artisanName: 'Fatma Nour',
        inStock: true,
        rating: 4.8,
        reviewCount: 25
      }
    ]
  },

  // Textiles Locations (20)
  {
    id: 'akhmim-textiles-1',
    name: 'Akhmim Weaving Center',
    governorate: 'Sohag',
    description: 'Traditional silk weaving workshops in historic Akhmim',
    history: 'Silk weaving tradition dating back to Coptic era',
    images: ['https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&h=400&fit=crop'],
    openingHours: '8:00 AM - 6:00 PM',
    coordinates: [26.5667, 31.7500],
    specialties: ['Silk weaving', 'Coptic textiles', 'Traditional patterns'],
    products: [
      {
        id: 'textile-silk-1',
        name: 'Akhmim Silk Shawl',
        description: 'Handwoven silk shawl with traditional Coptic patterns',
        price: 150,
        images: ['https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&h=400&fit=crop'],
        category: 'Textiles',
        locationId: 'akhmim-textiles-1',
        artisanName: 'Mina Girgis',
        variations: { type: 'color', options: ['Gold', 'Silver', 'Blue'] },
        inStock: true,
        rating: 4.9,
        reviewCount: 42
      }
    ]
  },
  {
    id: 'nubia-textiles-1',
    name: 'Nubian Heritage Weavers',
    governorate: 'Aswan',
    description: 'Authentic Nubian textile patterns and colors',
    history: 'Preserving Nubian weaving traditions for over 100 years',
    images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=400&fit=crop'],
    openingHours: '9:00 AM - 6:00 PM',
    coordinates: [24.0889, 32.8998],
    specialties: ['Nubian textiles', 'Colorful patterns', 'Traditional weaving'],
    products: [
      {
        id: 'textile-nubian-1',
        name: 'Nubian Traditional Rug',
        description: 'Handwoven rug with vibrant Nubian geometric patterns',
        price: 200,
        images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'],
        category: 'Textiles',
        locationId: 'nubia-textiles-1',
        artisanName: 'Amina Hassan',
        variations: { type: 'size', options: ['Small', 'Medium', 'Large'] },
        inStock: true,
        rating: 4.8,
        reviewCount: 31
      }
    ]
  },

  // Woodwork Locations (20)
  {
    id: 'rosetta-woodwork-1',
    name: 'Rosetta Wood Carving Studio',
    governorate: 'Beheira',
    description: 'Intricate wood carving and mashrabiya work',
    history: 'Traditional Islamic wood carving techniques from Ottoman era',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop'],
    openingHours: '9:00 AM - 5:00 PM',
    coordinates: [31.4000, 30.4167],
    specialties: ['Mashrabiya', 'Wood carving', 'Islamic patterns'],
    products: [
      {
        id: 'wood-mashrabiya-1',
        name: 'Miniature Mashrabiya Screen',
        description: 'Handcrafted wooden screen with traditional Islamic geometry',
        price: 180,
        images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'],
        category: 'Woodwork',
        locationId: 'rosetta-woodwork-1',
        artisanName: 'Mahmoud Abdel Rahman',
        inStock: true,
        rating: 4.9,
        reviewCount: 28
      }
    ]
  },
  {
    id: 'damietta-woodwork-1',
    name: 'Damietta Furniture Workshop',
    governorate: 'Damietta',
    description: 'Fine furniture and decorative wooden items',
    history: 'Damietta has been famous for furniture making for centuries',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'],
    openingHours: '8:00 AM - 6:00 PM',
    coordinates: [31.8133, 31.4167],
    specialties: ['Fine furniture', 'Inlay work', 'Decorative boxes'],
    products: [
      {
        id: 'wood-box-1',
        name: 'Inlaid Jewelry Box',
        description: 'Wooden jewelry box with mother-of-pearl inlay work',
        price: 95,
        images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'],
        category: 'Woodwork',
        locationId: 'damietta-woodwork-1',
        artisanName: 'Ali Mostafa',
        inStock: true,
        rating: 4.7,
        reviewCount: 22
      }
    ]
  },

  // Jewelry Locations (20)
  {
    id: 'khan-khalili-jewelry-1',
    name: 'Golden Pharaoh Jewelry',
    governorate: 'Cairo',
    description: 'Traditional Egyptian gold and silver jewelry',
    history: 'Family jewelry business in Khan El-Khalili for 3 generations',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop'],
    openingHours: '10:00 AM - 10:00 PM',
    coordinates: [31.2621, 30.0472],
    specialties: ['Gold jewelry', 'Pharaonic designs', 'Custom pieces'],
    products: [
      {
        id: 'jewelry-cartouche-1',
        name: 'Personalized Cartouche Pendant',
        description: 'Gold pendant with hieroglyphic name inscription',
        price: 220,
        images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'],
        category: 'Jewelry',
        locationId: 'khan-khalili-jewelry-1',
        artisanName: 'Hassan El-Dahabi',
        inStock: true,
        rating: 4.9,
        reviewCount: 67
      }
    ]
  },
  {
    id: 'siwa-jewelry-1',
    name: 'Siwa Silver Crafts',
    governorate: 'Matrouh',
    description: 'Traditional Berber silver jewelry from Siwa Oasis',
    history: 'Ancient Berber silversmithing traditions',
    images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=400&fit=crop'],
    openingHours: '9:00 AM - 6:00 PM',
    coordinates: [25.5197, 29.2033],
    specialties: ['Berber silver', 'Traditional designs', 'Handcrafted pieces'],
    products: [
      {
        id: 'jewelry-berber-1',
        name: 'Berber Silver Bracelet',
        description: 'Traditional silver bracelet with Berber geometric patterns',
        price: 85,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'],
        category: 'Jewelry',
        locationId: 'siwa-jewelry-1',
        artisanName: 'Amina Osman',
        inStock: true,
        rating: 4.8,
        reviewCount: 35
      }
    ]
  },

  // Metalwork Locations (20)
  {
    id: 'khan-khalili-metal-1',
    name: 'Copper Bazaar Workshop',
    governorate: 'Cairo',
    description: 'Traditional copper and brass metalwork',
    history: 'Metalworking tradition in Islamic Cairo for over 500 years',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'],
    openingHours: '10:00 AM - 9:00 PM',
    coordinates: [31.2621, 30.0472],
    specialties: ['Copper work', 'Brass items', 'Islamic lanterns'],
    products: [
      {
        id: 'metal-lantern-1',
        name: 'Islamic Copper Lantern',
        description: 'Handcrafted copper lantern with Islamic calligraphy',
        price: 140,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'],
        category: 'Metalwork',
        locationId: 'khan-khalili-metal-1',
        artisanName: 'Mohamed El-Nahas',
        inStock: true,
        rating: 4.8,
        reviewCount: 29
      }
    ]
  }
];

export const expandedProducts: Product[] = expandedLocations.flatMap(location => location.products);