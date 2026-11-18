/**
 * CHEXY HUB — Curated Collection Metadata
 * All dynamic products are fetched directly from live Supabase database
 * Mock products removed per user architectural directive
 */

export const PRODUCTS = [];

export const COLLECTIONS = [
  { id: 'Highland Heritage', name: 'Highland Heritage', description: 'Timeless Scottish clan tartans woven with deep heritage tones' },
  { id: 'Urban Tartan', name: 'Urban Tartan', description: 'Contemporary metro check shirts designed for effortless street and office style' },
  { id: 'Lumberjack Heritage', name: 'Lumberjack Heritage', description: 'Heavyweight brushed flannels and bold rugged buffalo checks' },
  { id: 'Pastel Gingham', name: 'Pastel Gingham', description: 'Soft airy gingham patterns inspired by sun-drenched European countryside' },
  { id: 'Summer Madras', name: 'Summer Madras', description: 'Artisan yarn-dyed lightweight Indian checks made for balmy weather' },
  { id: 'Minimalist Windowpane', name: 'Minimalist Windowpane', description: 'Clean architectural lines and quiet luxury geometries' }
];

export const CATEGORIES = [
  {
    id: 'men',
    name: 'Men',
    tagline: 'Everyday classics. Effortless confidence.',
    image: 'https://images.unsplash.com/photo-1623162905251-e98a25a45a67?auto=format&fit=crop&w=800&q=80',
    description: 'Structured button-downs, brushed flannels, and crisp gingham tailored to perfection.'
  },
  {
    id: 'women',
    name: 'Women',
    tagline: 'Modern patterns. Timeless elegance.',
    image: 'https://images.unsplash.com/photo-1610886886310-be2828d6afd5?auto=format&fit=crop&w=800&q=80',
    description: 'Boyfriend overshirts, cropped gingham blouses, and fluid tunics cut for contemporary styling.'
  },
  {
    id: 'kids',
    name: 'Kids',
    tagline: 'Little styles. Big personalities.',
    image: 'https://images.unsplash.com/photo-1627278107893-b89d828d4ff3?auto=format&fit=crop&w=800&q=80',
    description: 'Hypoallergenic organic cotton, snap closures, and cheerful patterns made for active play.'
  },
  {
    id: 'family',
    name: 'Family Collection',
    tagline: 'One pattern. Endless connections.',
    image: 'https://images.unsplash.com/photo-1602848137189-ad9301200244?auto=format&fit=crop&w=800&q=80',
    description: 'Harmonious matching check patterns for fathers, mothers, and kids to celebrate togetherness.'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1623162905251-e98a25a45a67?auto=format&fit=crop&w=600&q=80',
    likes: '2.4k',
    caption: 'Autumn mornings in our signature Highland Royal Tartan #CheckYourStyle #CHEXYHUB',
    tag: '@chexyhub'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1610886886310-be2828d6afd5?auto=format&fit=crop&w=600&q=80',
    likes: '4.1k',
    caption: 'Effortless oversized layering in Parisian Terracotta #OOTD #ModernCheck',
    tag: '@chexyhub'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1602848137189-ad9301200244?auto=format&fit=crop&w=600&q=80',
    likes: '5.8k',
    caption: 'Matching weekend flannel checks #FamilyCollection #CHEXYFamily',
    tag: '@chexyhub'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1599837855737-d15830f71159?auto=format&fit=crop&w=600&q=80',
    likes: '1.9k',
    caption: 'Monochrome check aesthetics. Heavyweight twill for chilly evenings #Streetwear',
    tag: '@chexyhub'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1598137203946-3c19bf3f47b1?auto=format&fit=crop&w=600&q=80',
    likes: '3.6k',
    caption: 'Forest walks in deep emerald flannel check #SunDrenched #PastelFashion',
    tag: '@chexyhub'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1627278107893-b89d828d4ff3?auto=format&fit=crop&w=600&q=80',
    likes: '6.2k',
    caption: 'One pattern, endless memories. Celebrating moments together #FamilyFirst',
    tag: '@chexyhub'
  }
];

export const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Aarav Mehta',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '2026-10-14',
    productName: 'Royal Highland Tartan Oxford Shirt',
    comment: 'The quality of the Egyptian cotton blew me away! The brushed finish feels super luxurious against the skin, and the fit is genuinely tailored rather than boxy. Have washed it 5 times and zero shrinkage. CHEXY HUB is now my go-to for checkered shirts.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Pooja Sundaram',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: '2026-10-28',
    productName: 'Parisian Oversized Check Boyfriend Shirt',
    comment: 'Obsessed with the terracotta shade! The drape has that high-end editorial feel you usually only find in European designer brands. I wore it unbuttoned over a cream crop top and got endless compliments.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Rohan & Simran Kapoor',
    location: 'New Delhi',
    rating: 5,
    date: '2026-11-02',
    productName: 'Highland Clan Heritage Coordinated Family Set',
    comment: 'Ordered the 3-piece coordinated set for our Diwali family photoshoot. The shirts are breathtaking together. Soft, premium, and our 4-year-old was comfortable throughout the entire 2-hour shoot without scratching!',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Vikram Sengupta',
    location: 'Kolkata, West Bengal',
    rating: 5,
    date: '2026-11-08',
    productName: 'Urban Monochrome Buffalo Check Overshirt',
    comment: 'Substantial weight, impeccable pattern matching across the placket and chest pockets (which cheap brands always mess up). The 3D studio on the website was also super cool to inspect the texture before buying.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true
  }
];
