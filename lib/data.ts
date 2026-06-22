export type Product = {
  _id?: string   // ← add this line
  id: string
  name: string
  category: 'Dogs' | 'Cats' | 'Birds' | 'Fish' | 'Small Pets'
  price: number
  stock: number
  image: string
  description: string
  featured: boolean
  rating: number
  reviews: number
}

export type Order = {
  id: string
  customer: string
  email: string
  date: string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  total: number
  items: { name: string; qty: number; price: number }[]
}

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  joined: string
  orders: number
}

export const ADMIN_CREDENTIALS = {
  email: 'admin@pawmart.com',
  password: 'pawmart123',
}

export const CATEGORY_EMOJI: Record<Product['category'], string> = {
  Dogs: '🐶',
  Cats: '🐱',
  Birds: '🐦',
  Fish: '🐟',
  'Small Pets': '🐹',
}

export function getCategoryEmoji(category: string) {
  return CATEGORY_EMOJI[category as Product['category']] || '🐾'
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Dog Kibble – Chicken & Rice',
    category: 'Dogs',
    price: 1299,
    stock: 54,
    image: 'https://placehold.co/400x300/f97316/fff?text=Dog+Food',
    description: 'High-protein dry food with real chicken and wholesome rice. No artificial colours or preservatives.',
    featured: true,
    rating: 4.8,
    reviews: 212,
  },
  {
    id: 'p2',
    name: 'Cat Scratching Post Tower',
    category: 'Cats',
    price: 2499,
    stock: 22,
    image: 'https://placehold.co/400x300/f97316/fff?text=Cat+Tower',
    description: 'Multi-level sisal scratching post with cosy perch. Keeps claws healthy and furniture safe.',
    featured: true,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 'p3',
    name: 'Retractable Dog Leash – 5m',
    category: 'Dogs',
    price: 599,
    stock: 87,
    image: 'https://placehold.co/400x300/f97316/fff?text=Dog+Leash',
    description: 'Ergonomic grip with one-button brake. Suitable for dogs up to 30 kg.',
    featured: false,
    rating: 4.3,
    reviews: 344,
  },
  {
    id: 'p4',
    name: 'Budgie Starter Cage Kit',
    category: 'Birds',
    price: 3499,
    stock: 11,
    image: 'https://placehold.co/400x300/f97316/fff?text=Bird+Cage',
    description: 'Complete cage with perches, feeders, swing, and a bag of seed mix. Perfect for new bird owners.',
    featured: false,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 'p5',
    name: 'Aquarium Starter Tank – 20L',
    category: 'Fish',
    price: 1999,
    stock: 16,
    image: 'https://placehold.co/400x300/f97316/fff?text=Fish+Tank',
    description: 'Crystal-clear glass tank with built-in LED lighting and a quiet-running filter.',
    featured: true,
    rating: 4.7,
    reviews: 53,
  },
  {
    id: 'p6',
    name: 'Hamster Habitat Deluxe',
    category: 'Small Pets',
    price: 1749,
    stock: 34,
    image: 'https://placehold.co/400x300/f97316/fff?text=Hamster+Home',
    description: 'Spacious two-level habitat with tunnels, wheel, and hideaway for small rodents.',
    featured: false,
    rating: 4.4,
    reviews: 41,
  },
  {
    id: 'p7',
    name: 'Grain-Free Cat Wet Food (Pack of 12)',
    category: 'Cats',
    price: 849,
    stock: 120,
    image: 'https://placehold.co/400x300/f97316/fff?text=Cat+Food',
    description: 'Tender tuna and salmon in natural broth. No grain, no soy, no nasties.',
    featured: true,
    rating: 4.9,
    reviews: 175,
  },
  {
    id: 'p8',
    name: 'Interactive Dog Puzzle Toy',
    category: 'Dogs',
    price: 799,
    stock: 60,
    image: 'https://placehold.co/400x300/f97316/fff?text=Dog+Toy',
    description: 'Slow-feeder puzzle with sliding tiles. Keeps dogs mentally stimulated at meal times.',
    featured: false,
    rating: 4.2,
    reviews: 89,
  },
]

export const orders: Order[] = [
  {
    id: 'ORD-1001',
    customer: 'Priya Sharma',
    email: 'priya@example.com',
    date: '2024-06-10',
    status: 'Delivered',
    total: 2098,
    items: [
      { name: 'Premium Dog Kibble', qty: 1, price: 1299 },
      { name: 'Interactive Dog Puzzle Toy', qty: 1, price: 799 },
    ],
  },
  {
    id: 'ORD-1002',
    customer: 'Rahul Mehta',
    email: 'rahul@example.com',
    date: '2024-06-11',
    status: 'Processing',
    total: 2499,
    items: [{ name: 'Cat Scratching Post Tower', qty: 1, price: 2499 }],
  },
  {
    id: 'ORD-1003',
    customer: 'Aisha Khan',
    email: 'aisha@example.com',
    date: '2024-06-12',
    status: 'Pending',
    total: 3499,
    items: [{ name: 'Budgie Starter Cage Kit', qty: 1, price: 3499 }],
  },
  {
    id: 'ORD-1004',
    customer: 'Vijay Nair',
    email: 'vijay@example.com',
    date: '2024-06-12',
    status: 'Shipped',
    total: 4748,
    items: [
      { name: 'Aquarium Starter Tank', qty: 1, price: 1999 },
      { name: 'Retractable Dog Leash', qty: 1, price: 599 },
      { name: 'Hamster Habitat Deluxe', qty: 1, price: 1749 },
    ],
  },
  {
    id: 'ORD-1005',
    customer: 'Sneha Patel',
    email: 'sneha@example.com',
    date: '2024-06-13',
    status: 'Processing',
    total: 1698,
    items: [
      { name: 'Grain-Free Cat Wet Food', qty: 2, price: 849 },
    ],
  },
]

export const users: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@pawmart.com', role: 'admin', joined: '2024-01-01', orders: 0 },
  { id: 'u2', name: 'Priya Sharma', email: 'priya@example.com', role: 'customer', joined: '2024-05-20', orders: 3 },
  { id: 'u3', name: 'Rahul Mehta', email: 'rahul@example.com', role: 'customer', joined: '2024-04-14', orders: 1 },
  { id: 'u4', name: 'Aisha Khan', email: 'aisha@example.com', role: 'customer', joined: '2024-06-01', orders: 1 },
  { id: 'u5', name: 'Vijay Nair', email: 'vijay@example.com', role: 'customer', joined: '2024-03-30', orders: 4 },
  { id: 'u6', name: 'Sneha Patel', email: 'sneha@example.com', role: 'customer', joined: '2024-06-10', orders: 1 },
]