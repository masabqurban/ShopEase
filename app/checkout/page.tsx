'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, CreditCard, Truck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// This would typically come from your cart state
const cartItems = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Smart Speaker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop',
    quantity: 2,
  }
];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = shippingMethod === 'express' ? 15 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate shipping info
    if (Object.values(shippingInfo).some(value => !value)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setActiveStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate payment info
    if (paymentMethod === 'credit' && Object.values(cardInfo).some(value => !value)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required payment fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Process payment
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep('confirmation');
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
    }, 2000);
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/cart" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to cart
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="w-full lg:w-2/3">
            <Tabs value={activeStep} className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger 
                  value="shipping" 
                  disabled={activeStep !== 'shipping' && activeStep !== 'payment' && activeStep !== 'confirmation'}
                  onClick={() => activeStep !== 'shipping' && setActiveStep('shipping')}
                >
                  Shipping
                </TabsTrigger>
                <TabsTrigger 
                  value="payment" 
                  disabled={activeStep !== 'payment' && activeStep !== 'confirmation'}
                  onClick={() => activeStep === 'confirmation' && setActiveStep('payment')}
                >
                  Payment
                </TabsTrigger>
                <TabsTrigger 
                  value="confirmation" 
                  disabled={activeStep !== 'confirmation'}
                >
                  Confirmation
                </TabsTrigger>
              </TabsList>

              {/* Shipping Information */}
              <TabsContent value="shipping" className="mt-6">
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State / Province</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                      <RadioGroup 
                        value={shippingMethod} 
                        onValueChange={setShippingMethod}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 flex justify-between">
                            <div>
                              <span className="font-medium">Standard Shipping</span>
                              <p className="text-sm text-muted-foreground">Delivery in 5-7 business days</p>
                            </div>
                            <span className="font-medium">Free</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 flex justify-between">
                            <div>
                              <span className="font-medium">Express Shipping</span>
                              <p className="text-sm text-muted-foreground">Delivery in 2-3 business days</p>
                            </div>
                            <span className="font-medium">$15.00</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Payment Information */}
              <TabsContent value="payment" className="mt-6">
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-4 mb-6"
                    >
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit / Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'credit' && (
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardInfo.cardNumber}
                            onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardInfo.cardName}
                            onChange={(e) => setCardInfo({...cardInfo, cardName: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                              value={cardInfo.cvc}
                              onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="bg-muted p-4 rounded-md mb-6">
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                      </div>
                    )}

                    <Separator className="my-6" />

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                      <div className="flex items-center space-x-3 space-y-0">
                        <input
                          type="checkbox"
                          id="sameAsShipping"
                          className="rounded border-input h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="sameAsShipping">
                          Same as shipping address
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveStep('shipping')}
                        className="w-1/2"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="w-1/2"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>

              {/* Order Confirmation */}
              <TabsContent value="confirmation" className="mt-6">
                <div className="bg-card rounded-lg shadow-sm p-6 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Thank You for Your Order!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your order has been placed and is being processed.
                  </p>
                  
                  <div className="bg-muted p-4 rounded-md mb-6 text-left">
                    <p className="font-medium mb-2">Order #12345</p>
                    <p className="text-sm text-muted-foreground">
                      A confirmation email has been sent to {shippingInfo.email}
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button variant="outline">
                        Continue Shopping
                      </Button>
                    </Link>
                    <Link href="/account/orders">
                      <Button>
                        View Order Status
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>
                  {shippingMethod === 'express' 
                    ? 'Express shipping (2-3 business days)' 
                    : 'Standard shipping (5-7 business days)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}