'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock data for orders
const orders = [
  {
    id: 'ORD-12345',
    date: '2024-04-15',
    status: 'Delivered',
    total: 289.98,
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 3,
        name: 'Smart Speaker',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'ORD-12344',
    date: '2024-03-28',
    status: 'Delivered',
    total: 149.99,
    items: [
      {
        id: 2,
        name: 'Minimalist Watch',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
      }
    ]
  }
];

// Mock data for wishlist
const wishlistItems = [
  {
    id: 4,
    name: 'Designer Sunglasses',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Leather Wallet',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop'
  }
];

// Mock data for addresses
const addresses = [
  {
    id: 1,
    type: 'Home',
    default: true,
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  {
    id: 2,
    type: 'Work',
    default: false,
    name: 'John Doe',
    street: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'United States'
  }
];

// Mock data for payment methods
const paymentMethods = [
  {
    id: 1,
    type: 'Credit Card',
    default: true,
    cardType: 'Visa',
    lastFour: '4242',
    expiryDate: '05/25'
  },
  {
    id: 2,
    type: 'Credit Card',
    default: false,
    cardType: 'Mastercard',
    lastFour: '5678',
    expiryDate: '08/26'
  }
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    // This would typically clear auth tokens, etc.
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to home page
    router.push('/');
  };

  const removeFromWishlist = (id: number) => {
    toast({
      title: "Item removed",
      description: "Item has been removed from your wishlist.",
    });
  };

  const removeAddress = (id: number) => {
    toast({
      title: "Address removed",
      description: "Address has been removed from your account.",
    });
  };

  const removePaymentMethod = (id: number) => {
    toast({
      title: "Payment method removed",
      description: "Payment method has been removed from your account.",
    });
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-2">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('overview')}
            >
              <User className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button 
              variant={activeTab === 'orders' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('orders')}
            >
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button 
              variant={activeTab === 'wishlist' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
            <Button 
              variant={activeTab === 'addresses' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Addresses
            </Button>
            <Button 
              variant={activeTab === 'payment' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('payment')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Methods
            </Button>
            <Link href="/account/settings">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </Link>
            <Separator className="my-2" />
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p>John Doe</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>john.doe@example.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/account/settings">
                      <Button variant="outline" size="sm">
                        Edit Information
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setActiveTab('orders')}
                    >
                      View All
                    </Button>
                  </div>
                  
                  {orders.slice(0, 1).map((order) => (
                    <div key={order.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex -space-x-4">
                          {order.items.map((item, index) => (
                            <div 
                              key={item.id} 
                              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-background"
                              style={{ zIndex: 10 - index }}
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total: ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Default Address</h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab('addresses')}
                      >
                        Manage
                      </Button>
                    </div>
                    
                    {addresses.filter(addr => addr.default).map((address) => (
                      <div key={address.id}>
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-muted-foreground">{address.street}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-muted-foreground">{address.country}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-card rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Default Payment</h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab('payment')}
                      >
                        Manage
                      </Button>
                    </div>
                    
                    {paymentMethods.filter(pm => pm.default).map((payment) => (
                      <div key={payment.id} className="flex items-center">
                        <div className="mr-3">
                          {payment.cardType === 'Visa' ? (
                            <div className="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold">VISA</div>
                          ) : (
                            <div className="bg-red-600 text-white rounded px-2 py-1 text-xs font-bold">MC</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{payment.cardType} ending in {payment.lastFour}</p>
                          <p className="text-sm text-muted-foreground">Expires {payment.expiryDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-md p-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {order.status}
                          </span>
                          <p className="font-medium">
                            Total: ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <Link href={`/products/${item.id}`}>
                                <Button variant="outline" size="sm">
                                  Buy Again
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-lg font-medium">Your wishlist is empty</p>
                    <p className="text-muted-foreground mb-6">
                      Items added to your wishlist will appear here
                    </p>
                    <Link href="/collections">
                      <Button>
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border rounded-md p-4 flex gap-4">
                        <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-lg font-semibold mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Link href={`/products/${item.id}`}>
                              <Button size="sm">
                                View Product
                              </Button>
                            </Link>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Addresses</h2>
                  <Button>
                    Add New Address
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <p className="font-medium">{address.type}</p>
                          {address.default && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeAddress(address.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p>{address.name}</p>
                        <p className="text-sm text-muted-foreground">{address.street}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-muted-foreground">{address.country}</p>
                      </div>
                      {!address.default && (
                        <Button variant="outline" size="sm" className="mt-3">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <Button>
                    Add Payment Method
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((payment) => (
                    <div key={payment.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {payment.cardType === 'Visa' ? (
                              <div className="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold">VISA</div>
                            ) : (
                              <div className="bg-red-600 text-white rounded px-2 py-1 text-xs font-bold">MC</div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {payment.cardType} ending in {payment.lastFour}
                            </p>
                            {payment.default && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removePaymentMethod(payment.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Expires {payment.expiryDate}</p>
                      {!payment.default && (
                        <Button variant="outline" size="sm" className="mt-3">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}