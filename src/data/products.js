/**
 * CHEXY HUB - Product Catalog
 * 24+ Premium Checkered Shirts across Men, Women, Kids, and Family Collections
 */

export const PRODUCTS = [
  // ================= MEN'S COLLECTION =================
  {
    id: 'men-01',
    slug: 'oxford-royal-tartan-shirt',
    name: 'Royal Highland Tartan Oxford Shirt',
    description: 'A signature Scottish royal tartan tailored from 100% long-staple Egyptian cotton. Designed with a structured button-down collar, mother-of-pearl buttons, and a brushed soft finish that looks immaculate whether layered or worn solo.',
    category: 'men',
    collection: 'Highland Heritage',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Heritage Navy & Crimson', hex: '#1C2841', secondary: '#B74737' },
      { name: 'Forest Green Tartan', hex: '#1E3F20', secondary: '#C9BBA6' },
      { name: 'Charcoal Shadow', hex: '#2B2B2B', secondary: '#777777' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    SKU: 'CH-MN-001',
    rating: 4.9,
    reviewCount: 238,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Tartan', 'Oxford', 'Premium Cotton', 'Smart Casual'],
    specifications: {
      fit: 'Tailored Modern Slim',
      fabric: '100% Long-Staple Egyptian Cotton',
      weave: 'Twill Weave with Peached Finish',
      collar: 'Structured Button-Down',
      sleeves: 'Full Sleeve with Adjustable Barrel Cuffs',
      care: 'Machine wash cold 30°C, warm iron, tumble dry low'
    },
    sizeGuide: [
      { size: 'S', chest: '38 in', length: '29 in', shoulder: '17.5 in', sleeve: '25 in' },
      { size: 'M', chest: '40 in', length: '30 in', shoulder: '18 in', sleeve: '25.5 in' },
      { size: 'L', chest: '42 in', length: '30.5 in', shoulder: '18.75 in', sleeve: '26 in' },
      { size: 'XL', chest: '45 in', length: '31 in', shoulder: '19.5 in', sleeve: '26.5 in' },
      { size: 'XXL', chest: '48 in', length: '31.5 in', shoulder: '20.25 in', sleeve: '27 in' }
    ],
    model3D: {
      pattern: 'tartan',
      primaryColor: '#B74737',
      secondaryColor: '#1C2841',
      accentColor: '#EDE7DC',
      gridScale: 12,
      collarType: 'button-down'
    }
  },
  {
    id: 'men-02',
    slug: 'urban-monochrome-buffalo-check',
    name: 'Urban Monochrome Buffalo Check Overshirt',
    description: 'Heavyweight brushed twill overshirt crafted for transitional layering. Features an oversized buffalo check in crisp monochrome, twin chest flap pockets, and horn buttons.',
    category: 'men',
    collection: 'Lumberjack Heritage',
    price: 2899,
    originalPrice: 4299,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Black & Pure White', hex: '#111111', secondary: '#F7F5F0' },
      { name: 'Oatmeal & Terracotta', hex: '#EDE7DC', secondary: '#B74737' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    SKU: 'CH-MN-002',
    rating: 4.8,
    reviewCount: 184,
    stockStatus: 'Only 5 Left',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Buffalo Check', 'Overshirt', 'Heavyweight', 'Streetwear'],
    specifications: {
      fit: 'Relaxed Overshirt Fit',
      fabric: '100% Heavy Brushed Cotton Flannel',
      weave: 'Heavy Twill 280 GSM',
      collar: 'Camp Collar',
      sleeves: 'Full Sleeve with Reinforced Elbow Patches',
      care: 'Gentle cycle cold, dry flat'
    },
    sizeGuide: [
      { size: 'M', chest: '42 in', length: '30.5 in', shoulder: '18.5 in', sleeve: '26 in' },
      { size: 'L', chest: '44 in', length: '31 in', shoulder: '19.25 in', sleeve: '26.5 in' },
      { size: 'XL', chest: '47 in', length: '31.5 in', shoulder: '20 in', sleeve: '27 in' },
      { size: 'XXL', chest: '50 in', length: '32 in', shoulder: '20.75 in', sleeve: '27.5 in' }
    ],
    model3D: {
      pattern: 'buffalo',
      primaryColor: '#171717',
      secondaryColor: '#F7F5F0',
      accentColor: '#777777',
      gridScale: 8,
      collarType: 'camp'
    }
  },
  {
    id: 'men-03',
    slug: 'terracotta-windowpane-linen-shirt',
    name: 'Terracotta Minimalist Windowpane Linen Shirt',
    description: 'Breezy French Normandy linen woven with an architectural micro-windowpane grid. An effortless modern shirt for warm evenings, featuring a relaxed Cuban collar and natural horn buttons.',
    category: 'men',
    collection: 'Minimalist Windowpane',
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Warm Terracotta Sand', hex: '#B74737', secondary: '#F7F5F0' },
      { name: 'Sage Minimalist', hex: '#7A8B7B', secondary: '#EDE7DC' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    SKU: 'CH-MN-003',
    rating: 4.7,
    reviewCount: 96,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Windowpane', 'Pure Linen', 'Cuban Collar', 'Summer Casual'],
    specifications: {
      fit: 'Relaxed Resort Fit',
      fabric: '100% French Normandy Linen',
      weave: 'Open Plain Weave',
      collar: 'Cuban Open Collar',
      sleeves: 'Half Sleeve / Rolled Cuffs',
      care: 'Cold hand wash or dry clean'
    },
    sizeGuide: [
      { size: 'S', chest: '39 in', length: '28.5 in', shoulder: '17.5 in', sleeve: '9 in' },
      { size: 'M', chest: '41 in', length: '29.5 in', shoulder: '18 in', sleeve: '9.5 in' },
      { size: 'L', chest: '43 in', length: '30 in', shoulder: '18.75 in', sleeve: '10 in' },
      { size: 'XL', chest: '46 in', length: '30.5 in', shoulder: '19.5 in', sleeve: '10.5 in' }
    ],
    model3D: {
      pattern: 'windowpane',
      primaryColor: '#B74737',
      secondaryColor: '#F7F5F0',
      accentColor: '#C9BBA6',
      gridScale: 16,
      collarType: 'spread'
    }
  },
  {
    id: 'men-04',
    slug: 'indigo-madras-check-shirt',
    name: 'Artisan Indigo Summer Madras Shirt',
    description: 'Authentic yarn-dyed Indian Madras fabric woven on traditional looms. Lightweight, exceptionally breathable, and washed for a vintage sun-drenched appearance.',
    category: 'men',
    collection: 'Summer Madras',
    price: 1999,
    originalPrice: 2799,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Indigo & Ochre', hex: '#263859', secondary: '#E3A857' },
      { name: 'Teal & Rust', hex: '#2A6F68', secondary: '#B74737' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    SKU: 'CH-MN-004',
    rating: 4.8,
    reviewCount: 153,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Madras', 'Yarn-Dyed', 'Summer', 'Lightweight'],
    specifications: {
      fit: 'Regular Fit',
      fabric: '100% Breathable Combed Cotton',
      weave: 'Hand-Feel Madras Weave',
      collar: 'Casual Point Collar',
      sleeves: 'Full Sleeve with Roll-Tab',
      care: 'Wash separately in cold water'
    },
    sizeGuide: [
      { size: 'S', chest: '38 in', length: '29 in', shoulder: '17.5 in', sleeve: '25 in' },
      { size: 'M', chest: '40 in', length: '30 in', shoulder: '18 in', sleeve: '25.5 in' },
      { size: 'L', chest: '42 in', length: '30.5 in', shoulder: '18.75 in', sleeve: '26 in' },
      { size: 'XL', chest: '45 in', length: '31 in', shoulder: '19.5 in', sleeve: '26.5 in' }
    ],
    model3D: {
      pattern: 'madras',
      primaryColor: '#263859',
      secondaryColor: '#E3A857',
      accentColor: '#EDE7DC',
      gridScale: 14,
      collarType: 'classic'
    }
  },
  {
    id: 'men-05',
    slug: 'classic-navy-gingham-poplin',
    name: 'Executive Navy Gingham Poplin Shirt',
    description: 'Crisp micro-gingham woven with fine 80s two-ply yarns. Delivers a clean, sharp look under a tailored blazer or worn casually untucked with chinos.',
    category: 'men',
    collection: 'Urban Tartan',
    price: 2299,
    originalPrice: 3499,
    discount: 34,
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Navy & White Gingham', hex: '#1B263B', secondary: '#FFFFFF' },
      { name: 'Sky Blue Gingham', hex: '#4A7C9B', secondary: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    SKU: 'CH-MN-005',
    rating: 4.9,
    reviewCount: 312,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Gingham', 'Poplin', 'Formal', 'Versatile'],
    specifications: {
      fit: 'Slim Fit',
      fabric: '100% Superfine Cotton Poplin',
      weave: '80s 2-Ply Poplin',
      collar: 'Semi-Spread Collar with Removable Stays',
      sleeves: 'Full Sleeve',
      care: 'Machine wash warm, iron while damp'
    },
    sizeGuide: [
      { size: 'S', chest: '38 in', length: '29 in', shoulder: '17.5 in', sleeve: '25 in' },
      { size: 'M', chest: '40 in', length: '30 in', shoulder: '18 in', sleeve: '25.5 in' },
      { size: 'L', chest: '42 in', length: '30.5 in', shoulder: '18.75 in', sleeve: '26 in' },
      { size: 'XL', chest: '45 in', length: '31 in', shoulder: '19.5 in', sleeve: '26.5 in' }
    ],
    model3D: {
      pattern: 'gingham',
      primaryColor: '#1B263B',
      secondaryColor: '#FFFFFF',
      accentColor: '#C9BBA6',
      gridScale: 20,
      collarType: 'spread'
    }
  },
  {
    id: 'men-06',
    slug: 'olive-shadow-plaid-flannel',
    name: 'Smoky Olive Shadow Plaid Flannel',
    description: 'Subtle gradient shadow check woven from plush melange yarns. The ultimate cold-weather staple offering elevated tactile warmth and quiet luxury.',
    category: 'men',
    collection: 'Highland Heritage',
    price: 2699,
    originalPrice: 3899,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1620012253295-c15c429fccf8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1620012253295-c15c429fccf8?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Olive Shadow & Amber', hex: '#3B4D3C', secondary: '#C28448' },
      { name: 'Burgundy Shadow', hex: '#582129', secondary: '#171717' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    SKU: 'CH-MN-006',
    rating: 4.8,
    reviewCount: 119,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Shadow Plaid', 'Brushed Flannel', 'Winter Wear'],
    specifications: {
      fit: 'Regular Relaxed Fit',
      fabric: '100% Organic Double-Brushed Cotton',
      weave: 'Shadow Twill',
      collar: 'Standard Spread Collar',
      sleeves: 'Full Sleeve',
      care: 'Machine wash cold inside out'
    },
    sizeGuide: [
      { size: 'S', chest: '38 in', length: '29 in', shoulder: '17.5 in', sleeve: '25 in' },
      { size: 'M', chest: '40 in', length: '30 in', shoulder: '18 in', sleeve: '25.5 in' },
      { size: 'L', chest: '42 in', length: '30.5 in', shoulder: '18.75 in', sleeve: '26 in' },
      { size: 'XL', chest: '45 in', length: '31 in', shoulder: '19.5 in', sleeve: '26.5 in' }
    ],
    model3D: {
      pattern: 'tartan',
      primaryColor: '#3B4D3C',
      secondaryColor: '#C28448',
      accentColor: '#101010',
      gridScale: 10,
      collarType: 'classic'
    }
  },

  // ================= WOMEN'S COLLECTION =================
  {
    id: 'women-01',
    slug: 'parisian-oversized-terracotta-check',
    name: 'Parisian Oversized Check Boyfriend Shirt',
    description: 'An editorial fashion piece with relaxed dropped shoulders, extended curved hem, and a rich terracotta and cream palette. Worn buttoned as a tunic dress or unbuttoned over a ribbed bralette.',
    category: 'women',
    collection: 'Urban Tartan',
    price: 2399,
    originalPrice: 3699,
    discount: 35,
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Terracotta & Ivory', hex: '#B74737', secondary: '#F7F5F0' },
      { name: 'Espresso & Latte', hex: '#3E2723', secondary: '#EDE7DC' },
      { name: 'Forest Noir', hex: '#1C3124', secondary: '#C9BBA6' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    SKU: 'CH-WN-001',
    rating: 4.9,
    reviewCount: 342,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Boyfriend Fit', 'Terracotta', 'Editorial', 'Street Style'],
    specifications: {
      fit: 'Relaxed Oversized Silhouette',
      fabric: '100% Breathable Rayon-Cotton Blend',
      weave: 'Silky Drape Twill',
      collar: 'Convertible Notched Collar',
      sleeves: 'Drop Shoulder Full Sleeve with Button Tab',
      care: 'Hand wash or dry clean recommended'
    },
    sizeGuide: [
      { size: 'XS', chest: '36 in', length: '30 in', shoulder: '18 in', sleeve: '23 in' },
      { size: 'S', chest: '38 in', length: '31 in', shoulder: '18.5 in', sleeve: '23.5 in' },
      { size: 'M', chest: '40 in', length: '31.5 in', shoulder: '19 in', sleeve: '24 in' },
      { size: 'L', chest: '43 in', length: '32 in', shoulder: '19.75 in', sleeve: '24.5 in' },
      { size: 'XL', chest: '46 in', length: '32.5 in', shoulder: '20.5 in', sleeve: '25 in' }
    ],
    model3D: {
      pattern: 'tartan',
      primaryColor: '#B74737',
      secondaryColor: '#F7F5F0',
      accentColor: '#3E2723',
      gridScale: 14,
      collarType: 'classic'
    }
  },
  {
    id: 'women-02',
    slug: 'provencal-pastel-gingham-tie-front',
    name: 'Provençal Pastel Gingham Cropped Shirt',
    description: 'Charming French countryside aesthetics meet modern tailoring. Features a structured point collar, gentle balloon sleeves, and an adjustable tie-front detail that accentuates high-rise denim or skirts.',
    category: 'women',
    collection: 'Pastel Gingham',
    price: 1999,
    originalPrice: 2899,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Powder Blue Gingham', hex: '#8EADC2', secondary: '#FFFFFF' },
      { name: 'Blush Rose Gingham', hex: '#D89E9E', secondary: '#FFFFFF' },
      { name: 'Buttercup Yellow', hex: '#EED596', secondary: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    SKU: 'CH-WN-002',
    rating: 4.8,
    reviewCount: 167,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Gingham', 'Tie-Front', 'Cropped', 'Pastel'],
    specifications: {
      fit: 'Cropped Tailored Fit',
      fabric: '100% Crisp Cotton Cambric',
      weave: 'Fine Gingham Weave',
      collar: 'Point Collar',
      sleeves: 'Three-Quarter Balloon Sleeves',
      care: 'Machine wash cold, line dry'
    },
    sizeGuide: [
      { size: 'XS', chest: '34 in', length: '19 in', shoulder: '14.5 in', sleeve: '17 in' },
      { size: 'S', chest: '36 in', length: '20 in', shoulder: '15 in', sleeve: '17.5 in' },
      { size: 'M', chest: '38 in', length: '20.5 in', shoulder: '15.5 in', sleeve: '18 in' },
      { size: 'L', chest: '41 in', length: '21 in', shoulder: '16.25 in', sleeve: '18.5 in' }
    ],
    model3D: {
      pattern: 'gingham',
      primaryColor: '#8EADC2',
      secondaryColor: '#FFFFFF',
      accentColor: '#EDE7DC',
      gridScale: 18,
      collarType: 'spread'
    }
  },
  {
    id: 'women-03',
    slug: 'scandinavian-monochrome-check-tunic',
    name: 'Nordic Windowpane Flannel Tunic',
    description: 'Minimalist Scandinavian styling crafted with fine brushed twill. Features hidden front placket buttons, elongated side slits, and an effortlessly elegant drape for chic layered styling.',
    category: 'women',
    collection: 'Minimalist Windowpane',
    price: 2599,
    originalPrice: 3799,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Oatmeal & Slate Windowpane', hex: '#EDE7DC', secondary: '#2F3E46' },
      { name: 'Charcoal & Chalk', hex: '#222222', secondary: '#F7F5F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    SKU: 'CH-WN-003',
    rating: 4.7,
    reviewCount: 92,
    stockStatus: 'Only 3 Left',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Tunic', 'Minimalist', 'Windowpane', 'Quiet Luxury'],
    specifications: {
      fit: 'Fluid Tunic Cut with Curved Hem',
      fabric: '70% Viscose, 30% Virgin Cotton',
      weave: 'Brushed Fluid Weave',
      collar: 'Mandarin Band Collar',
      sleeves: 'Full Sleeve with Extended Cuffs',
      care: 'Dry clean or gentle hand wash'
    },
    sizeGuide: [
      { size: 'S', chest: '38 in', length: '33 in', shoulder: '16 in', sleeve: '24 in' },
      { size: 'M', chest: '40 in', length: '34 in', shoulder: '16.5 in', sleeve: '24.5 in' },
      { size: 'L', chest: '43 in', length: '34.5 in', shoulder: '17.25 in', sleeve: '25 in' },
      { size: 'XL', chest: '46 in', length: '35 in', shoulder: '18 in', sleeve: '25.5 in' }
    ],
    model3D: {
      pattern: 'windowpane',
      primaryColor: '#EDE7DC',
      secondaryColor: '#2F3E46',
      accentColor: '#C9BBA6',
      gridScale: 14,
      collarType: 'band'
    }
  },
  {
    id: 'women-04',
    slug: 'highland-red-plaid-fitted-shirt',
    name: 'Highland Scarlett Tartan Fitted Shirt',
    description: 'A timeless silhouette designed with darted tailoring that contours effortlessly. Features rich ruby and forest tartan tones, finished with pearlised snaps and western shoulder yoke detailing.',
    category: 'women',
    collection: 'Highland Heritage',
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Ruby Tartan', hex: '#B74737', secondary: '#1C2841' },
      { name: 'Emerald Plaid', hex: '#1C3124', secondary: '#B74737' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    SKU: 'CH-WN-004',
    rating: 4.9,
    reviewCount: 285,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Tartan', 'Western Yoke', 'Tailored', 'Best Seller'],
    specifications: {
      fit: 'Fitted Contour Silhouette',
      fabric: '100% Peached Cotton Twill',
      weave: 'Scottish Tartan Twill',
      collar: 'Point Collar',
      sleeves: 'Full Sleeve with Triple Snap Cuffs',
      care: 'Machine wash cold, iron medium'
    },
    sizeGuide: [
      { size: 'XS', chest: '34 in', length: '26 in', shoulder: '14.5 in', sleeve: '23 in' },
      { size: 'S', chest: '36 in', length: '26.5 in', shoulder: '15 in', sleeve: '23.5 in' },
      { size: 'M', chest: '38 in', length: '27 in', shoulder: '15.5 in', sleeve: '24 in' },
      { size: 'L', chest: '41 in', length: '27.5 in', shoulder: '16.25 in', sleeve: '24.5 in' }
    ],
    model3D: {
      pattern: 'tartan',
      primaryColor: '#B74737',
      secondaryColor: '#1C2841',
      accentColor: '#F7F5F0',
      gridScale: 10,
      collarType: 'classic'
    }
  },
  {
    id: 'women-05',
    slug: 'sunlit-linen-madras-blouse',
    name: 'Amalfi Coast Citrus Madras Blouse',
    description: 'Infused with Mediterranean summer warmth, this featherlight linen blouse features golden mango and sea-foam checks with delicate mother-of-pearl buttons.',
    category: 'women',
    collection: 'Summer Madras',
    price: 2199,
    originalPrice: 3099,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Citrus & Aqua Madras', hex: '#E3A857', secondary: '#4A7C9B' },
      { name: 'Coral & Sand', hex: '#D47761', secondary: '#EDE7DC' }
    ],
    sizes: ['S', 'M', 'L'],
    SKU: 'CH-WN-005',
    rating: 4.7,
    reviewCount: 78,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Madras', 'Citrus', 'Resort', 'Pure Linen'],
    specifications: {
      fit: 'Easy Relaxed Fit',
      fabric: '100% Pure European Flax Linen',
      weave: 'Open Madras Weave',
      collar: 'V-Neck Camp Collar',
      sleeves: 'Short Cuffed Sleeves',
      care: 'Hand wash cold'
    },
    sizeGuide: [
      { size: 'S', chest: '37 in', length: '25 in', shoulder: '15 in', sleeve: '8 in' },
      { size: 'M', chest: '39 in', length: '25.5 in', shoulder: '15.5 in', sleeve: '8.5 in' },
      { size: 'L', chest: '42 in', length: '26 in', shoulder: '16.25 in', sleeve: '9 in' }
    ],
    model3D: {
      pattern: 'madras',
      primaryColor: '#E3A857',
      secondaryColor: '#4A7C9B',
      accentColor: '#EDE7DC',
      gridScale: 12,
      collarType: 'spread'
    }
  },
  {
    id: 'women-06',
    slug: 'monochrome-houndstooth-check-blazer-shirt',
    name: 'SoHo Micro-Houndstooth Structured Shirt',
    description: 'An architectural piece combining the crisp precision of a houndstooth grid with tailored shirtmaker finesse. Styled with double-breasted closure and peak lapels.',
    category: 'women',
    collection: 'Urban Tartan',
    price: 2799,
    originalPrice: 4199,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Black & Pure Chalk', hex: '#111111', secondary: '#F7F5F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    SKU: 'CH-WN-006',
    rating: 4.9,
    reviewCount: 145,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    tags: ['Houndstooth', 'Structured', 'Evening Wear', 'Luxury'],
    specifications: {
      fit: 'Structured Tailored Fit',
      fabric: '95% Compact Cotton, 5% Elastane',
      weave: 'Micro-Houndstooth Dobby',
      collar: 'Notched Peak Lapel',
      sleeves: 'Full Sleeve with Slit Cuffs',
      care: 'Dry clean only'
    },
    sizeGuide: [
      { size: 'XS', chest: '34 in', length: '27 in', shoulder: '14.5 in', sleeve: '23 in' },
      { size: 'S', chest: '36 in', length: '27.5 in', shoulder: '15 in', sleeve: '23.5 in' },
      { size: 'M', chest: '38 in', length: '28 in', shoulder: '15.5 in', sleeve: '24 in' },
      { size: 'L', chest: '41 in', length: '28.5 in', shoulder: '16.25 in', sleeve: '24.5 in' }
    ],
    model3D: {
      pattern: 'gingham',
      primaryColor: '#171717',
      secondaryColor: '#F7F5F0',
      accentColor: '#777777',
      gridScale: 24,
      collarType: 'spread'
    }
  },

  // ================= KIDS COLLECTION =================
  {
    id: 'kids-01',
    slug: 'junior-heritage-royal-tartan',
    name: 'Junior Royal Tartan Button-Down',
    description: 'Crafted from ultra-soft, hypoallergenic 100% organic combed cotton that is gentle on sensitive skin. Designed with easy-fasten buttons and reinforced seams for playground adventures.',
    category: 'kids',
    collection: 'Highland Heritage',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Royal Crimson & Navy', hex: '#B74737', secondary: '#1C2841' },
      { name: 'Forest Green', hex: '#1E3F20', secondary: '#C9BBA6' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    SKU: 'CH-KD-001',
    rating: 4.9,
    reviewCount: 194,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Organic Cotton', 'Kids Tartan', 'Hypoallergenic', 'Durable'],
    specifications: {
      fit: 'Comfort Regular Kids Fit',
      fabric: '100% Certified Organic Combed Cotton',
      weave: 'Soft Brush Twill',
      collar: 'Soft Button-Down',
      sleeves: 'Full Sleeve with Roll-Up Tabs',
      care: 'Machine wash warm, tumble dry gentle'
    },
    sizeGuide: [
      { size: '3-4Y', chest: '26 in', length: '17 in', shoulder: '10.5 in', sleeve: '14 in' },
      { size: '5-6Y', chest: '28 in', length: '19 in', shoulder: '11.5 in', sleeve: '16 in' },
      { size: '7-8Y', chest: '30 in', length: '21 in', shoulder: '12.5 in', sleeve: '18 in' },
      { size: '9-10Y', chest: '32 in', length: '23 in', shoulder: '13.5 in', sleeve: '20 in' },
      { size: '11-12Y', chest: '34 in', length: '25 in', shoulder: '14.5 in', sleeve: '22 in' }
    ],
    model3D: {
      pattern: 'tartan',
      primaryColor: '#B74737',
      secondaryColor: '#1C2841',
      accentColor: '#EDE7DC',
      gridScale: 14,
      collarType: 'button-down'
    }
  },
  {
    id: 'kids-02',
    slug: 'mini-gingham-sunny-meadow',
    name: 'Little Explorer Sunny Gingham Shirt',
    description: 'Bright cheerful yellow gingham crafted in featherweight breathable cotton. Features snap closures for quick dressing and dual chest pockets for collecting tiny treasures.',
    category: 'kids',
    collection: 'Pastel Gingham',
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Sunbeam Gingham', hex: '#EED596', secondary: '#FFFFFF' },
      { name: 'Sky Gingham', hex: '#8EADC2', secondary: '#FFFFFF' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    SKU: 'CH-KD-002',
    rating: 4.8,
    reviewCount: 112,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Gingham', 'Playwear', 'Easy Snap', 'Summer'],
    specifications: {
      fit: 'Relaxed Play Fit',
      fabric: '100% Breathable Poplin Cotton',
      weave: 'Micro-Gingham Plain Weave',
      collar: 'Peter Pan / Casual Soft Collar',
      sleeves: 'Half Sleeve',
      care: 'Machine wash cold'
    },
    sizeGuide: [
      { size: '3-4Y', chest: '26 in', length: '16.5 in', shoulder: '10.5 in', sleeve: '6 in' },
      { size: '5-6Y', chest: '28 in', length: '18.5 in', shoulder: '11.5 in', sleeve: '6.5 in' },
      { size: '7-8Y', chest: '30 in', length: '20.5 in', shoulder: '12.5 in', sleeve: '7 in' },
      { size: '9-10Y', chest: '32 in', length: '22.5 in', shoulder: '13.5 in', sleeve: '7.5 in' }
    ],
    model3D: {
      pattern: 'gingham',
      primaryColor: '#EED596',
      secondaryColor: '#FFFFFF',
      accentColor: '#EDE7DC',
      gridScale: 16,
      collarType: 'spread'
    }
  },
  {
    id: 'kids-03',
    slug: 'junior-buffalo-camp-overshirt',
    name: 'Junior Trail Blazer Buffalo Check Overshirt',
    description: 'Cozy brushed flannel mini-overshirt styled after dad’s favorite layer. Keeps little adventurers warm during park trips and chilly morning school runs.',
    category: 'kids',
    collection: 'Lumberjack Heritage',
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Red & Black Buffalo', hex: '#B74737', secondary: '#111111' },
      { name: 'Oatmeal & Navy', hex: '#EDE7DC', secondary: '#1C2841' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    SKU: 'CH-KD-003',
    rating: 4.9,
    reviewCount: 168,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Buffalo Check', 'Flannel', 'Cozy', 'Warm'],
    specifications: {
      fit: 'Relaxed Layering Cut',
      fabric: '100% Brushed Cotton Flannel',
      weave: 'Medium Twill',
      collar: 'Spread Collar with Contrast Inner Band',
      sleeves: 'Full Sleeve with Reinforced Elbows',
      care: 'Machine wash cold, tumble dry low'
    },
    sizeGuide: [
      { size: '3-4Y', chest: '27 in', length: '17.5 in', shoulder: '11 in', sleeve: '14.5 in' },
      { size: '5-6Y', chest: '29 in', length: '19.5 in', shoulder: '12 in', sleeve: '16.5 in' },
      { size: '7-8Y', chest: '31 in', length: '21.5 in', shoulder: '13 in', sleeve: '18.5 in' },
      { size: '9-10Y', chest: '33 in', length: '23.5 in', shoulder: '14 in', sleeve: '20.5 in' },
      { size: '11-12Y', chest: '35 in', length: '25.5 in', shoulder: '15 in', sleeve: '22.5 in' }
    ],
    model3D: {
      pattern: 'buffalo',
      primaryColor: '#B74737',
      secondaryColor: '#111111',
      accentColor: '#777777',
      gridScale: 10,
      collarType: 'camp'
    }
  },
  {
    id: 'kids-04',
    slug: 'junior-madras-coastal-shirt',
    name: 'Junior Coastal Breeze Madras Shirt',
    description: 'Vibrant multicolored Madras shirt designed for active summer fun. Featherlight, wrinkle-forgiving weave that dries quickly after sunny beach outings.',
    category: 'kids',
    collection: 'Summer Madras',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Tropical Multi-Madras', hex: '#2A6F68', secondary: '#E3A857' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    SKU: 'CH-KD-004',
    rating: 4.7,
    reviewCount: 84,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Madras', 'Vibrant', 'Summer', 'Lightweight'],
    specifications: {
      fit: 'Casual Easy Cut',
      fabric: '100% Combed Cotton',
      weave: 'Handspun Look Madras',
      collar: 'Soft Point Collar',
      sleeves: 'Half Sleeve',
      care: 'Machine wash cold'
    },
    sizeGuide: [
      { size: '3-4Y', chest: '26 in', length: '16.5 in', shoulder: '10.5 in', sleeve: '6 in' },
      { size: '5-6Y', chest: '28 in', length: '18.5 in', shoulder: '11.5 in', sleeve: '6.5 in' },
      { size: '7-8Y', chest: '30 in', length: '20.5 in', shoulder: '12.5 in', sleeve: '7 in' },
      { size: '9-10Y', chest: '32 in', length: '22.5 in', shoulder: '13.5 in', sleeve: '7.5 in' }
    ],
    model3D: {
      pattern: 'madras',
      primaryColor: '#2A6F68',
      secondaryColor: '#E3A857',
      accentColor: '#EDE7DC',
      gridScale: 12,
      collarType: 'classic'
    }
  },

  // ================= MATCHING FAMILY COLLECTION =================
  {
    id: 'family-01',
    slug: 'highland-clan-matching-family-set',
    name: 'Highland Clan Heritage Coordinated Family Set',
    description: 'Celebrate togetherness with coordinated tartan shirts crafted for Mom, Dad, and the little ones. Perfectly color-matched yarns woven from luxurious brushed cotton for holiday portraits, festive gatherings, or memorable family weekends.',
    category: 'family',
    collection: 'Highland Heritage',
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Crimson & Navy Tartan Set', hex: '#B74737', secondary: '#1C2841' },
      { name: 'Emerald & Gold Set', hex: '#1E3F20', secondary: '#E3A857' }
    ],
    sizes: ['Combo: Men L + Women M + Kid 5-6Y', 'Combo: Men M + Women S + Kid 3-4Y', 'Combo: Men XL + Women L + 2 Kids (Custom)'],
    SKU: 'CH-FAM-001',
    rating: 5.0,
    reviewCount: 420,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Family Matching', 'Coordinated Set', 'Holiday Festive', 'Photo Ready'],
    specifications: {
      fit: 'Harmonized Family Silhouettes (Men Tailored, Women Draped, Kids Relaxed)',
      fabric: '100% Premium Egyptian Cotton',
      weave: 'Matching Yarn-Dyed Tartan',
      collar: 'Coordinated Classic Collars',
      sleeves: 'Full Sleeves with Cuffs',
      care: 'Machine wash cold with like colors'
    },
    sizeGuide: [
      { size: 'Adult Men', chest: '38 - 46 in', length: '29 - 31 in', shoulder: '17.5 - 20 in', sleeve: '25 - 27 in' },
      { size: 'Adult Women', chest: '34 - 42 in', length: '26 - 29 in', shoulder: '14.5 - 17 in', sleeve: '23 - 25 in' },
      { size: 'Kids (3-12Y)', chest: '26 - 34 in', length: '17 - 25 in', shoulder: '10.5 - 14.5 in', sleeve: '14 - 22 in' }
    ],
    model3D: {
      pattern: 'tartan',
      primaryColor: '#B74737',
      secondaryColor: '#1C2841',
      accentColor: '#EDE7DC',
      gridScale: 10,
      collarType: 'button-down'
    }
  },
  {
    id: 'family-02',
    slug: 'father-son-monochrome-buffalo-duo',
    name: 'Father & Son Buffalo Check Duo',
    description: 'Iconic black-and-ivory buffalo check overshirts matched for father and son. Built for bonding camping weekends, weekend woodcraft, or urban strolls.',
    category: 'family',
    collection: 'Lumberjack Heritage',
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Black & Ivory Duo', hex: '#111111', secondary: '#F7F5F0' },
      { name: 'Red & Charcoal Duo', hex: '#B74737', secondary: '#171717' }
    ],
    sizes: ['Men M + Kid 3-4Y', 'Men L + Kid 5-6Y', 'Men L + Kid 7-8Y', 'Men XL + Kid 9-10Y'],
    SKU: 'CH-FAM-002',
    rating: 4.9,
    reviewCount: 230,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Father & Son', 'Matching Duo', 'Buffalo Check', 'Gift Idea'],
    specifications: {
      fit: 'Matching Rugged Overshirt Cut',
      fabric: '100% Heavy Brushed Cotton',
      weave: 'Heavy Twill',
      collar: 'Camp Collar',
      sleeves: 'Full Sleeves with Reinforced Elbows',
      care: 'Machine wash cold'
    },
    sizeGuide: [
      { size: 'Dad (M/L/XL)', chest: '40 - 45 in', length: '30 - 31 in', shoulder: '18 - 19.5 in', sleeve: '25.5 - 26.5 in' },
      { size: 'Son (3-10Y)', chest: '26 - 32 in', length: '17 - 23 in', shoulder: '10.5 - 13.5 in', sleeve: '14 - 20 in' }
    ],
    model3D: {
      pattern: 'buffalo',
      primaryColor: '#171717',
      secondaryColor: '#F7F5F0',
      accentColor: '#777777',
      gridScale: 8,
      collarType: 'camp'
    }
  },
  {
    id: 'family-03',
    slug: 'mother-daughter-provencal-gingham-duo',
    name: 'Mother & Daughter Pastel Gingham Pair',
    description: 'Delightfully coordinated powder-blue gingham shirts for mom and daughter. Features delicate balloon sleeves, feminine tailoring, and whisper-soft organic cotton cambric.',
    category: 'family',
    collection: 'Pastel Gingham',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Powder Blue Gingham', hex: '#8EADC2', secondary: '#FFFFFF' },
      { name: 'Blush Rose Gingham', hex: '#D89E9E', secondary: '#FFFFFF' }
    ],
    sizes: ['Mom S + Girl 3-4Y', 'Mom M + Girl 5-6Y', 'Mom M + Girl 7-8Y', 'Mom L + Girl 9-10Y'],
    SKU: 'CH-FAM-003',
    rating: 4.9,
    reviewCount: 310,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Mother & Daughter', 'Pastel Gingham', 'Coordinated', 'Spring'],
    specifications: {
      fit: 'Matching Flattering Silhouette',
      fabric: '100% Pure Organic Cotton Cambric',
      weave: 'Micro-Gingham Plain Weave',
      collar: 'Peter Pan / Point Collar',
      sleeves: 'Three-Quarter Cuffed Sleeves',
      care: 'Gentle cycle cold'
    },
    sizeGuide: [
      { size: 'Mom (S/M/L)', chest: '36 - 41 in', length: '26 - 28 in', shoulder: '15 - 16.5 in', sleeve: '23.5 - 24.5 in' },
      { size: 'Daughter (3-10Y)', chest: '26 - 32 in', length: '16.5 - 22.5 in', shoulder: '10.5 - 13.5 in', sleeve: '13 - 18 in' }
    ],
    model3D: {
      pattern: 'gingham',
      primaryColor: '#8EADC2',
      secondaryColor: '#FFFFFF',
      accentColor: '#EDE7DC',
      gridScale: 16,
      collarType: 'spread'
    }
  },
  {
    id: 'family-04',
    slug: 'family-summer-madras-holiday-pack',
    name: 'Coastal Haven Madras 4-Piece Family Pack',
    description: 'An idyllic holiday wardrobe set for 2 adults and 2 children featuring complementary yarn-dyed coastal Madras checks. Vibrant, breathable, and designed for family vacation memories.',
    category: 'family',
    collection: 'Summer Madras',
    price: 7499,
    originalPrice: 10999,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Azure & Coral Madras Pack', hex: '#2A6F68', secondary: '#D47761' }
    ],
    sizes: ['Complete 4-Piece Pack (Custom Sizes on Order Confirmation)'],
    SKU: 'CH-FAM-004',
    rating: 4.8,
    reviewCount: 98,
    stockStatus: 'Only 4 Left',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Family Pack', 'Holiday', 'Resort', 'Madras'],
    specifications: {
      fit: 'Breezy Resort Cut for the whole family',
      fabric: '100% Hand-Feel Cotton Madras',
      weave: 'Air-Woven Madras',
      collar: 'Casual Camp / Point Collars',
      sleeves: 'Half / Full Sleeve assortment',
      care: 'Hand wash cold'
    },
    sizeGuide: [
      { size: 'All Family Members', chest: 'Custom Fit Profile', length: 'Tailored', shoulder: 'Proportional', sleeve: 'Standard' }
    ],
    model3D: {
      pattern: 'madras',
      primaryColor: '#2A6F68',
      secondaryColor: '#D47761',
      accentColor: '#EDE7DC',
      gridScale: 14,
      collarType: 'spread'
    }
  },

  // ================= ADDITIONAL PRODUCTS TO REACH 24+ =================
  {
    id: 'men-07',
    slug: 'oxford-cobalt-gingham-classic',
    name: 'Oxford Cobalt Gingham Classic',
    description: 'Crisp cobalt blue and crisp white micro-check shirt. Tailored for all-day comfort with natural stretch cotton.',
    category: 'men',
    collection: 'Pastel Gingham',
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Cobalt & White', hex: '#1E40AF', secondary: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    SKU: 'CH-MN-007',
    rating: 4.7,
    reviewCount: 114,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    tags: ['Cobalt', 'Gingham', 'Classic', 'Office'],
    specifications: {
      fit: 'Tailored Regular',
      fabric: '100% Compact Cotton',
      weave: 'Fine Gingham Poplin',
      collar: 'Button-Down Collar',
      sleeves: 'Full Sleeve',
      care: 'Machine wash warm'
    },
    sizeGuide: [
      { size: 'S', chest: '38 in', length: '29 in', shoulder: '17.5 in', sleeve: '25 in' },
      { size: 'M', chest: '40 in', length: '30 in', shoulder: '18 in', sleeve: '25.5 in' },
      { size: 'L', chest: '42 in', length: '30.5 in', shoulder: '18.75 in', sleeve: '26 in' },
      { size: 'XL', chest: '45 in', length: '31 in', shoulder: '19.5 in', sleeve: '26.5 in' }
    ],
    model3D: {
      pattern: 'gingham',
      primaryColor: '#1E40AF',
      secondaryColor: '#FFFFFF',
      accentColor: '#EDE7DC',
      gridScale: 18,
      collarType: 'button-down'
    }
  },
  {
    id: 'men-08',
    slug: 'crimson-black-timber-flannel',
    name: 'Crimson Timber Heavyweight Flannel',
    description: 'The definitive lumberjack style reimagined for modern wardrobes. Deep scarlet and midnight black buffalo plaid with twin button pockets.',
    category: 'men',
    collection: 'Lumberjack Heritage',
    price: 2599,
    originalPrice: 3799,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Crimson & Midnight', hex: '#B74737', secondary: '#111111' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    SKU: 'CH-MN-008',
    rating: 4.9,
    reviewCount: 302,
    stockStatus: 'In Stock',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ['Flannel', 'Lumberjack', 'Heavyweight', 'Iconic'],
    specifications: {
      fit: 'Relaxed Fit',
      fabric: '100% Double-Faced Cotton Flannel',
      weave: 'Heavy Twill',
      collar: 'Spread Collar',
      sleeves: 'Full Sleeve with Reinforced Cuffs',
      care: 'Machine wash cold'
    },
    sizeGuide: [
      { size: 'M', chest: '42 in', length: '30.5 in', shoulder: '18.5 in', sleeve: '26 in' },
      { size: 'L', chest: '44 in', length: '31 in', shoulder: '19.25 in', sleeve: '26.5 in' },
      { size: 'XL', chest: '47 in', length: '31.5 in', shoulder: '20 in', sleeve: '27 in' },
      { size: 'XXL', chest: '50 in', length: '32 in', shoulder: '20.75 in', sleeve: '27.5 in' }
    ],
    model3D: {
      pattern: 'buffalo',
      primaryColor: '#B74737',
      secondaryColor: '#111111',
      accentColor: '#EDE7DC',
      gridScale: 8,
      collarType: 'classic'
    }
  },
  {
    id: 'women-07',
    slug: 'amber-harvest-flannel-shacket',
    name: 'Harvest Amber Plaid Flannel Shacket',
    description: 'An autumnal staple combining warm amber, chocolate, and cream tones. Features dropped shoulders, oversized horn buttons, and functional patch pockets.',
    category: 'women',
    collection: 'Highland Heritage',
    price: 2699,
    originalPrice: 3899,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Harvest Amber & Cream', hex: '#C28448', secondary: '#EDE7DC' }
    ],
    sizes: ['S', 'M', 'L'],
    SKU: 'CH-WN-007',
    rating: 4.8,
    reviewCount: 154,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Shacket', 'Autumn', 'Flannel', 'Layering'],
    specifications: {
      fit: 'Oversized Shacket Cut',
      fabric: '100% Brushed Melton Cotton',
      weave: 'Heavy Double-Weave',
      collar: 'Structured Shirt Collar',
      sleeves: 'Full Sleeve',
      care: 'Dry clean recommended'
    },
    sizeGuide: [
      { size: 'S', chest: '40 in', length: '30 in', shoulder: '18 in', sleeve: '23.5 in' },
      { size: 'M', chest: '42 in', length: '30.5 in', shoulder: '18.5 in', sleeve: '24 in' },
      { size: 'L', chest: '45 in', length: '31 in', shoulder: '19.25 in', sleeve: '24.5 in' }
    ],
    model3D: {
      pattern: 'tartan',
      primaryColor: '#C28448',
      secondaryColor: '#EDE7DC',
      accentColor: '#3E2723',
      gridScale: 12,
      collarType: 'classic'
    }
  },
  {
    id: 'women-08',
    slug: 'emerald-botanical-windowpane-shirt',
    name: 'Emerald Botanical Windowpane Silk-Cotton Shirt',
    description: 'Lustrous silk-cotton blend infused with subtle sheen. Minimalist cream grid over deep forest emerald, styled with French cuffs.',
    category: 'women',
    collection: 'Minimalist Windowpane',
    price: 2899,
    originalPrice: 4299,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Emerald & Cream', hex: '#1C3124', secondary: '#F7F5F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    SKU: 'CH-WN-008',
    rating: 4.9,
    reviewCount: 88,
    stockStatus: 'Only 2 Left',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Silk Cotton', 'Emerald', 'Windowpane', 'Luxury'],
    specifications: {
      fit: 'Fluid Tailored Fit',
      fabric: '70% Fine Cotton, 30% Mulberry Silk',
      weave: 'Satin Twill',
      collar: 'Point Collar',
      sleeves: 'Full Sleeve with French Cuffs',
      care: 'Dry clean only'
    },
    sizeGuide: [
      { size: 'XS', chest: '34 in', length: '26 in', shoulder: '14.5 in', sleeve: '23 in' },
      { size: 'S', chest: '36 in', length: '26.5 in', shoulder: '15 in', sleeve: '23.5 in' },
      { size: 'M', chest: '38 in', length: '27 in', shoulder: '15.5 in', sleeve: '24 in' },
      { size: 'L', chest: '41 in', length: '27.5 in', shoulder: '16.25 in', sleeve: '24.5 in' }
    ],
    model3D: {
      pattern: 'windowpane',
      primaryColor: '#1C3124',
      secondaryColor: '#F7F5F0',
      accentColor: '#C9BBA6',
      gridScale: 16,
      collarType: 'spread'
    }
  },
  {
    id: 'kids-05',
    slug: 'junior-monochrome-skater-check',
    name: 'Junior Urban Skater Check Shirt',
    description: 'Black and white check with a streetwise skater twist. Soft jersey hood attachment and durable double-stitched cotton.',
    category: 'kids',
    collection: 'Urban Tartan',
    price: 1499,
    originalPrice: 2099,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Monochrome Skater Check', hex: '#111111', secondary: '#F7F5F0' }
    ],
    sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    SKU: 'CH-KD-005',
    rating: 4.8,
    reviewCount: 95,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    tags: ['Kids', 'Skater', 'Streetwear', 'Hooded'],
    specifications: {
      fit: 'Relaxed Street Cut',
      fabric: '100% Cotton with Cotton-Fleece Hood',
      weave: 'Medium Twill',
      collar: 'Attached Hood with Drawstrings',
      sleeves: 'Full Sleeve with Ribbed Cuffs',
      care: 'Machine wash cold'
    },
    sizeGuide: [
      { size: '5-6Y', chest: '29 in', length: '19.5 in', shoulder: '12 in', sleeve: '16.5 in' },
      { size: '7-8Y', chest: '31 in', length: '21.5 in', shoulder: '13 in', sleeve: '18.5 in' },
      { size: '9-10Y', chest: '33 in', length: '23.5 in', shoulder: '14 in', sleeve: '20.5 in' },
      { size: '11-12Y', chest: '35 in', length: '25.5 in', shoulder: '15 in', sleeve: '22.5 in' }
    ],
    model3D: {
      pattern: 'buffalo',
      primaryColor: '#171717',
      secondaryColor: '#F7F5F0',
      accentColor: '#777777',
      gridScale: 10,
      collarType: 'camp'
    }
  },
  {
    id: 'kids-06',
    slug: 'junior-pastel-rose-gingham',
    name: 'Little Meadow Rose Gingham Blouse',
    description: 'Delicate vintage rose gingham styled with frilled flutter collar and puff sleeves. 100% breathable organic cotton.',
    category: 'kids',
    collection: 'Pastel Gingham',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Rose & Cream Gingham', hex: '#D89E9E', secondary: '#FFFFFF' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y'],
    SKU: 'CH-KD-006',
    rating: 4.9,
    reviewCount: 76,
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    tags: ['Rose Gingham', 'Frill Collar', 'Vintage Style', 'Organic'],
    specifications: {
      fit: 'A-Line Gentle Flare',
      fabric: '100% Organic Cotton',
      weave: 'Fine Gingham Cambric',
      collar: 'Frilled Peter Pan Collar',
      sleeves: 'Puff Short Sleeves',
      care: 'Gentle hand wash'
    },
    sizeGuide: [
      { size: '3-4Y', chest: '25 in', length: '16 in', shoulder: '10 in', sleeve: '5.5 in' },
      { size: '5-6Y', chest: '27 in', length: '18 in', shoulder: '11 in', sleeve: '6 in' },
      { size: '7-8Y', chest: '29 in', length: '20 in', shoulder: '12 in', sleeve: '6.5 in' }
    ],
    model3D: {
      pattern: 'gingham',
      primaryColor: '#D89E9E',
      secondaryColor: '#FFFFFF',
      accentColor: '#EDE7DC',
      gridScale: 16,
      collarType: 'spread'
    }
  }
];

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
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: 'Structured button-downs, brushed flannels, and crisp gingham tailored to perfection.'
  },
  {
    id: 'women',
    name: 'Women',
    tagline: 'Modern patterns. Timeless elegance.',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
    description: 'Boyfriend overshirts, cropped gingham blouses, and fluid tunics cut for contemporary styling.'
  },
  {
    id: 'kids',
    name: 'Kids',
    tagline: 'Little styles. Big personalities.',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    description: 'Hypoallergenic organic cotton, snap closures, and cheerful patterns made for active play.'
  },
  {
    id: 'family',
    name: 'Family Collection',
    tagline: 'One pattern. Endless connections.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    description: 'Harmonious matching check patterns for fathers, mothers, and kids to celebrate togetherness.'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    likes: '2.4k',
    caption: 'Autumn mornings in our signature Highland Royal Tartan #CheckYourStyle #CHEXYHUB',
    tag: '@chexyhub'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80',
    likes: '4.1k',
    caption: 'Effortless oversized layering in Parisian Terracotta #OOTD #ModernCheck',
    tag: '@chexyhub'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80',
    likes: '5.8k',
    caption: 'Father & Son weekend road trip in matching Buffalo Plaid #FamilyCollection #CHEXYFamily',
    tag: '@chexyhub'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    likes: '1.9k',
    caption: 'Monochrome street aesthetics. Heavyweight twill for chilly evenings #Streetwear',
    tag: '@chexyhub'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    likes: '3.6k',
    caption: 'Sunny afternoons in Provençal Pastel Gingham #SunDrenched #PastelFashion',
    tag: '@chexyhub'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
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
