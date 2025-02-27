import Image from 'next/image';
import Link from 'next/link';
import { Star, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// This would typically come from your database
const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=800&auto=format&fit=crop',
    ],
    category: 'electronics',
    description: 'Experience premium sound quality with our wireless headphones. Features include active noise cancellation, 30-hour battery life, and premium comfort.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium comfort with memory foam ear cushions',
      'Bluetooth 5.0 connectivity',
      'Built-in microphone for calls',
      'Touch controls for easy operation'
    ],
    specs: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohm',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g'
    },
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        date: '2024-03-15',
        comment: 'Excellent sound quality and very comfortable for long listening sessions.'
      },
      {
        id: 2,
        user: 'Sarah M.',
        rating: 4,
        date: '2024-03-10',
        comment: 'Great headphones, battery life is impressive. Noise cancellation works well.'
      }
    ],
    stock: 15,
    relatedProducts: [2, 3, 4]
  },
  {
    id: 2,
    name: 'Minimalist Watch',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.8,
    reviews: []
  },
  {
    id: 3,
    name: 'Smart Speaker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop',
    category: 'electronics',
    rating: 4.3,
    reviews: []
  },
  {
    id: 4,
    name: 'Designer Sunglasses',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop',
    category: 'fashion',
    rating: 4.6,
    reviews: []
  }
];

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString()
  }));
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = products.filter(p => 
    product.relatedProducts?.includes(p.id)
  );

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Overview */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.images?.[0] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} />
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.length} reviews)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {product.stock} in stock
              </div>
            </div>

            <p className="text-2xl font-bold mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>

            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">1</span>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1" size="lg">
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="mb-16">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-6">
            <ul className="list-disc list-inside space-y-2">
              {product.features?.map((feature, index) => (
                <li key={index} className="text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-medium">{key}</dt>
                  <dd className="text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-8">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="font-medium">{review.user}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-card rounded-lg overflow-hidden shadow-md">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-semibold">
                        ${product.price.toFixed(2)}
                      </p>
                      <StarRating rating={product.rating} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}