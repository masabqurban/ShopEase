import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

// This would typically come from your database based on the category
const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Minimalist Watch',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: 'Smart Speaker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.3,
    reviews: 156
  },
  {
    id: 4,
    name: 'Designer Sunglasses',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.6,
    reviews: 92
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

  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category === params.category
  );

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range
                  </label>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    $0 - $1000
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select defaultValue="featured">
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="text-muted-foreground">{categoryProducts.length} products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group"
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          ★ {product.rating} ({product.reviews})
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}