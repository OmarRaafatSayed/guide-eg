export interface Post {
  id: string;
  userId: string;
  username: string;
  userFullName: string;
  userAvatar?: string;
  content: string;
  images: string[];
  videos?: string[];
  location?: {
    name: string;
    governorate: string;
    coordinates?: [number, number];
  };
  badges?: string[]; // Badge IDs earned with this post
  likes: number;
  comments: Comment[];
  shares: number;
  createdAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  likes: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: {
    type: 'image' | 'video';
    url: string;
    duration?: number; // for videos
  };
  location?: string;
  createdAt: string;
  expiresAt: string;
  isViewed?: boolean;
}

export interface TravelBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'historical' | 'coastal' | 'cultural' | 'adventure' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: string;
  location: string;
  governorate: string;
}

// Sample travel badges
export const availableBadges: TravelBadge[] = [
  {
    id: 'pyramid-explorer',
    name: 'Pyramid Explorer',
    description: 'Visited the Great Pyramids of Giza',
    icon: '🏛️',
    category: 'historical',
    rarity: 'common',
    requirements: 'Visit the Giza Pyramids complex',
    location: 'Giza Pyramids',
    governorate: 'Giza'
  },
  {
    id: 'pharaoh-seeker',
    name: 'Pharaoh Seeker',
    description: 'Explored the Valley of the Kings',
    icon: '👑',
    category: 'historical',
    rarity: 'rare',
    requirements: 'Visit Valley of the Kings in Luxor',
    location: 'Valley of the Kings',
    governorate: 'Luxor'
  },
  {
    id: 'mediterranean-wanderer',
    name: 'Mediterranean Wanderer',
    description: 'Enjoyed the beaches of Alexandria',
    icon: '🏖️',
    category: 'coastal',
    rarity: 'common',
    requirements: 'Visit any beach in Alexandria',
    location: 'Alexandria Beaches',
    governorate: 'Alexandria'
  },
  {
    id: 'nile-navigator',
    name: 'Nile Navigator',
    description: 'Sailed the eternal Nile River',
    icon: '⛵',
    category: 'adventure',
    rarity: 'rare',
    requirements: 'Take a Nile cruise or felucca ride',
    location: 'Nile River',
    governorate: 'Multiple'
  },
  {
    id: 'temple-guardian',
    name: 'Temple Guardian',
    description: 'Visited 5 ancient temples',
    icon: '🏛️',
    category: 'historical',
    rarity: 'epic',
    requirements: 'Visit 5 different ancient temples',
    location: 'Multiple Temples',
    governorate: 'Multiple'
  },
  {
    id: 'desert-nomad',
    name: 'Desert Nomad',
    description: 'Survived a desert safari adventure',
    icon: '🐪',
    category: 'adventure',
    rarity: 'rare',
    requirements: 'Complete a desert safari experience',
    location: 'Western Desert',
    governorate: 'Multiple'
  },
  {
    id: 'culture-enthusiast',
    name: 'Culture Enthusiast',
    description: 'Experienced authentic Egyptian culture',
    icon: '🎭',
    category: 'cultural',
    rarity: 'common',
    requirements: 'Attend a cultural event or visit local markets',
    location: 'Cultural Sites',
    governorate: 'Multiple'
  },
  {
    id: 'egypt-master',
    name: 'Egypt Master',
    description: 'Visited all 5 major governorates',
    icon: '🏆',
    category: 'milestone',
    rarity: 'legendary',
    requirements: 'Visit Cairo, Giza, Alexandria, Luxor, and Aswan',
    location: 'All Egypt',
    governorate: 'Multiple'
  }
];

// Sample posts data
export const samplePosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'sarah_explorer',
    userFullName: 'Sarah Johnson',
    userAvatar: '/api/placeholder/40/40',
    content: 'Just witnessed the breathtaking sunrise over the Great Pyramids! The ancient wonder never fails to amaze me. Earned my Pyramid Explorer badge! 🏛️✨ #Egypt #Pyramids #TravelGoals',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    location: {
      name: 'Great Pyramids of Giza',
      governorate: 'Giza'
    },
    badges: ['pyramid-explorer'],
    likes: 127,
    comments: [
      {
        id: 'c1',
        userId: 'user2',
        username: 'mike_traveler',
        content: 'Incredible shot! I\'m planning my trip there next month.',
        likes: 5,
        createdAt: '2024-01-15T10:30:00Z'
      }
    ],
    shares: 23,
    createdAt: '2024-01-15T06:00:00Z',
    isLiked: false
  },
  {
    id: '2',
    userId: 'user3',
    username: 'ahmed_local',
    userFullName: 'Ahmed Hassan',
    userAvatar: '/api/placeholder/40/40',
    content: 'Exploring the vibrant Khan el-Khalili bazaar in Cairo! The colors, sounds, and aromas are absolutely mesmerizing. Perfect place to find authentic souvenirs and experience local culture. 🛍️',
    images: ['/api/placeholder/400/300'],
    location: {
      name: 'Khan el-Khalili Bazaar',
      governorate: 'Cairo'
    },
    badges: ['culture-enthusiast'],
    likes: 89,
    comments: [
      {
        id: 'c2',
        userId: 'user1',
        username: 'sarah_explorer',
        content: 'Love this place! Did you try the traditional tea?',
        likes: 3,
        createdAt: '2024-01-14T15:45:00Z'
      }
    ],
    shares: 12,
    createdAt: '2024-01-14T14:20:00Z',
    isLiked: true
  },
  {
    id: '3',
    userId: 'user4',
    username: 'emma_wanderlust',
    userFullName: 'Emma Rodriguez',
    userAvatar: '/api/placeholder/40/40',
    content: 'Sailing on a traditional felucca along the Nile in Aswan. The peaceful waters and Nubian villages create such a magical atmosphere. Just earned my Nile Navigator badge! ⛵🌅',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    location: {
      name: 'Nile River, Aswan',
      governorate: 'Aswan'
    },
    badges: ['nile-navigator'],
    likes: 156,
    comments: [
      {
        id: 'c3',
        userId: 'user5',
        username: 'travel_photographer',
        content: 'The golden hour lighting is perfect! Great composition.',
        likes: 8,
        createdAt: '2024-01-13T18:20:00Z'
      }
    ],
    shares: 34,
    createdAt: '2024-01-13T17:30:00Z',
    isLiked: false
  }
];

// Sample stories data
export const sampleStories: Story[] = [
  {
    id: 's1',
    userId: 'user1',
    username: 'sarah_explorer',
    userAvatar: '/api/placeholder/40/40',
    content: {
      type: 'image',
      url: '/api/placeholder/300/500'
    },
    location: 'Luxor Temple',
    createdAt: '2024-01-15T12:00:00Z',
    expiresAt: '2024-01-16T12:00:00Z',
    isViewed: false
  },
  {
    id: 's2',
    userId: 'user3',
    username: 'ahmed_local',
    userAvatar: '/api/placeholder/40/40',
    content: {
      type: 'video',
      url: '/api/placeholder/300/500',
      duration: 15
    },
    location: 'Alexandria Corniche',
    createdAt: '2024-01-15T10:30:00Z',
    expiresAt: '2024-01-16T10:30:00Z',
    isViewed: true
  }
];

// Helper functions
export function getBadgeById(badgeId: string): TravelBadge | undefined {
  return availableBadges.find(badge => badge.id === badgeId);
}

export function getBadgesByCategory(category: TravelBadge['category']): TravelBadge[] {
  return availableBadges.filter(badge => badge.category === category);
}

export function getBadgesByRarity(rarity: TravelBadge['rarity']): TravelBadge[] {
  return availableBadges.filter(badge => badge.rarity === rarity);
}

export function checkBadgeEligibility(userVisitedLocations: string[], badgeId: string): boolean {
  const badge = getBadgeById(badgeId);
  if (!badge) return false;
  
  // Simple check - in a real app, this would be more sophisticated
  return userVisitedLocations.some(location => 
    location.toLowerCase().includes(badge.location.toLowerCase())
  );
}

export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}