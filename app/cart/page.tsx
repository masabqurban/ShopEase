'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// This would typically come from a cart state management system
const initialCartItems = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    quantity: 1,
    color: 'Black',
    maxQuantity: 5
  },
  {
    id: 3,
    name: 'Smart Speaker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop',
    quantity: 2,
    color: 'Gray',
    maxQuantity: 10
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const { toast } = useToast();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Apply discount if promo code is applied
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  
  // Calculate shipping (free over $100)
  const shipping = subtotal > 100 ? 0 : 10;
  
  // Calculate total
  const total = subtotal - discount + shipping;

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      setIsPromoApplied(true);
      toast({
        title: "Promo code applied",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/collections">
              <Button size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="hidden md:grid md:grid-cols-6 text-sm font-medium text-muted-foreground mb-4">
                  <div className="col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>

                <Separator className="mb-6 hidden md:block" />

                {cartItems.map((item) => (
                  <div key={item.id} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-3 flex gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-medium hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            Color: {item.color}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 hover:text-red-700 transition-colors mt-2 flex items-center gap-1 md:hidden"
                          >
                            <X className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:text-center">
                        <span className="md:hidden text-sm text-muted-foreground">Price: </span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="md:text-center">
                        <span className="md:hidden text-sm text-muted-foreground">Quantity: </span>
                        <div className="flex items-center justify-start md:justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:text-right">
                        <span className="md:hidden text-sm text-muted-foreground">Total: </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors ml-4 hidden md:inline-block"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <Separator className="mt-6" />
                  </div>
                ))}

                <div className="flex justify-between items-center mt-6">
                  <Link href="/collections">
                    <Button variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => setCartItems([])}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {isPromoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      disabled={isPromoApplied}
                    />
                    <Button
                      onClick={applyPromoCode}
                      disabled={isPromoApplied || !promoCode}
                      variant="outline"
                    >
                      Apply
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <p className="text-sm text-green-600 mt-2">
                      Promo code applied successfully!
                    </p>
                  )}
                </div>

                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}