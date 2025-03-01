import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CategoryFilters from './CategoryFilters';

// This would typically come from your database based on the category
const allProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.5,
    reviews: 128,
    brand: 'SoundMaster',
    color: 'Black'
  },
  {
    id: 2,
    name: 'Minimalist Watch',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.8,
    reviews: 89,
    brand: 'TimeKeeper',
    color: 'Brown'
  },
  {
    id: 3,
    name: 'Smart Speaker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.3,
    reviews: 156,
    brand: 'EchoTech',
    color: 'Gray'
  },
  {
    id: 4,
    name: 'Designer Sunglasses',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.6,
    reviews: 92,
    brand: 'VisionStyle',
    color: 'Black'
  },
  {
    id: 5,
    name: 'Ultra HD Smart TV',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.7,
    reviews: 215,
    brand: 'VisionTech',
    color: 'Black'
  },
  {
    id: 6,
    name: 'Leather Wallet',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.4,
    reviews: 78,
    brand: 'LeatherCraft',
    color: 'Brown'
  },
  {
    id: 7,
    name: 'Wireless Earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.6,
    reviews: 183,
    brand: 'SoundMaster',
    color: 'White'
  },
  {
    id: 8,
    name: 'Casual Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.5,
    reviews: 112,
    brand: 'UrbanStep',
    color: 'White'
  },
  {
    id: 9,
    name: 'Digital Camera',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviews: 95,
    brand: 'PixelPro',
    color: 'Black'
  },
  {
    id: 10,
    name: 'Luxury Handbag',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.9,
    reviews: 67,
    brand: 'EleganceStyle',
    color: 'Tan'
  },
  {
    id: 11,
    name: 'Modern Coffee Table',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a694?q=80&w=800&auto=format&fit=crop',
    category: 'home-living',
    rating: 4.7,
    reviews: 54,
    brand: 'HomeEssentials',
    color: 'Walnut'
  },
  {
    id: 12,
    name: 'Ceramic Vase Set',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6dc?q=80&w=800&auto=format&fit=crop',
    category: 'home-living',
    rating: 4.5,
    reviews: 38,
    brand: 'ArtDecor',
    color: 'White'
  },
  {
    id: 13,
    name: 'Luxury Bedding Set',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop',
    category: 'home-living',
    rating: 4.8,
    reviews: 72,
    brand: 'ComfortNest',
    color: 'Gray'
  },
  {
    id: 14,
    name: 'Scented Candle Collection',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
    category: 'home-living',
    rating: 4.6,
    reviews: 91,
    brand: 'AromaLux',
    color: 'Mixed'
  },
  {
    id: 15,
    name: 'Decorative Wall Art',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    category: 'home-living',
    rating: 4.4,
    reviews: 47,
    brand: 'ArtDecor',
    color: 'Multicolor'
  },
  {
    id: 16,
    name: 'Organic Face Serum',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    category: 'beauty',
    rating: 4.7,
    reviews: 128,
    brand: 'NaturalGlow',
    color: 'Clear'
  },
  {
    id: 17,
    name: 'Makeup Brush Set',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
    category: 'beauty',
    rating: 4.5,
    reviews: 86,
    brand: 'BeautyPro',
    color: 'Pink'
  },
  {
    id: 18,
    name: 'Luxury Perfume',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    category: 'beauty',
    rating: 4.8,
    reviews: 74,
    brand: 'EssenceElite',
    color: 'Gold'
  },
  {
    id: 19,
    name: 'Skincare Gift Set',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=800&auto=format&fit=crop',
    category: 'beauty',
    rating: 4.6,
    reviews: 59,
    brand: 'NaturalGlow',
    color: 'Mixed'
  },
  {
    id: 20,
    name: 'Hair Styling Tools',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    category: 'beauty',
    rating: 4.4,
    reviews: 92,
    brand: 'StylePro',
    color: 'Black'
  },
  {
    id: 21,
    name: 'Yoga Mat',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=800&auto=format&fit=crop',
    category: 'sports',
    rating: 4.6,
    reviews: 112,
    brand: 'FitLife',
    color: 'Purple'
  },
  {
    id: 22,
    name: 'Fitness Tracker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=800&auto=format&fit=crop',
    category: 'sports',
    rating: 4.7,
    reviews: 183,
    brand: 'TechFit',
    color: 'Black'
  },
  {
    id: 23,
    name: 'Running Shoes',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    category: 'sports',
    rating: 4.8,
    reviews: 215,
    brand: 'SpeedRunner',
    color: 'Red'
  },
  {
    id: 24,
    name: 'Protein Supplement',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800&auto=format&fit=crop',
    category: 'sports',
    rating: 4.5,
    reviews: 78,
    brand: 'NutriFit',
    color: 'White'
  },
  {
    id: 25,
    name: 'Adjustable Dumbbells',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
    category: 'sports',
    rating: 4.9,
    reviews: 95,
    brand: 'PowerLift',
    color: 'Black'
  },
  {
    id: 26,
    name: 'Classic Novel Collection',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
    category: 'books',
    rating: 4.8,
    reviews: 67,
    brand: 'LiteraryPress',
    color: 'Mixed'
  },
  {
    id: 27,
    name: 'E-Reader',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    category: 'books',
    rating: 4.7,
    reviews: 142,
    brand: 'ReadTech',
    color: 'Black'
  },
  {
    id: 28,
    name: 'Cookbook Bundle',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop',
    category: 'books',
    rating: 4.5,
    reviews: 54,
    brand: 'CulinaryPress',
    color: 'Mixed'
  },
  {
    id: 29,
    name: 'Vinyl Record Collection',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800&auto=format&fit=crop',
    category: 'books',
    rating: 4.9,
    reviews: 38,
    brand: 'ClassicSounds',
    color: 'Mixed'
  },
  {
    id: 30,
    name: 'Desk Journal Set',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop',
    category: 'books',
    rating: 4.6,
    reviews: 91,
    brand: 'WriteCraft',
    color: 'Brown'
  }
];

// This generates all possible category paths at build time
export function generateStaticParams() {
  return [
    { category: 'electronics' },
    { category: 'fashion' },
    { category: 'home-living' },
    { category: 'beauty' },
    { category: 'sports' },
    { category: 'books' }
  ];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = params.category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Get products for this category
  const categoryProducts = allProducts.filter(product => product.category === params.category);
  
  // Get unique brands and colors for the current category
  const uniqueBrands = Array.from(new Set(categoryProducts.map(product => product.brand)));
  const uniqueColors = Array.from(new Set(categoryProducts.map(product => product.color)));

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Pass the data to the client component */}
          <CategoryFilters 
            products={categoryProducts}
            uniqueBrands={uniqueBrands}
            uniqueColors={uniqueColors}
            categoryName={categoryName}
          />
        </div>
      </div>
    </div>
  );
}