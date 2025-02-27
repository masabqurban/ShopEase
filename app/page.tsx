import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200&auto=format&fit=crop',
      description: 'Discover our latest collection of electronics'
    },
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
      description: 'Discover our latest collection of fashion'
    },
    {
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop',
      description: 'Discover our latest collection of home & living'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Minimalist Watch',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Designer Sunglasses',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Smart Speaker',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-background py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover object-center opacity-10"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to <span className="text-primary">ShopEase</span>
            </h1>
            <p className="mt-3 text-xl text-muted-foreground sm:mt-5">
              Your one-stop destination for all your shopping needs
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/collections">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="bg-background rounded-lg shadow-md overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Link href={`/collections/${category.name.toLowerCase().replace(' & ', '-')}`}>
                    <Button variant="outline" className="w-full">
                      Explore {category.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link 
                href={`/products/${product.id}`} 
                key={product.id}
                className="group relative"
              >
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest updates and exclusive offers
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}