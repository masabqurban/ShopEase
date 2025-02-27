import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// This would typically come from your database
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200&auto=format&fit=crop',
    description: 'Latest gadgets and electronic devices',
    productCount: 24
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
    description: 'Trendy clothing and accessories',
    productCount: 36
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop',
    description: 'Beautiful home decor and furniture',
    productCount: 28
  },
  {
    id: 'beauty',
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1200&auto=format&fit=crop',
    description: 'Cosmetics and personal care',
    productCount: 42
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    description: 'Sports equipment and fitness gear',
    productCount: 31
  },
  {
    id: 'books',
    name: 'Books & Media',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop',
    description: 'Books, movies, and music',
    productCount: 45
  }
];

export default function Collections() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Collections</h1>
          <p className="text-muted-foreground text-lg">
            Explore our wide range of carefully curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              href={`/collections/${category.id}`}
              key={category.id}
              className="group block"
            >
              <div className="bg-card rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-white text-2xl font-bold mb-1">{category.name}</h2>
                    <p className="text-white/90 text-sm">{category.productCount} Products</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button className="w-full">
                    Explore Collection
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}