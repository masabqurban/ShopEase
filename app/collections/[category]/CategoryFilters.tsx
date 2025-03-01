'use client';

import { useState, useEffect } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  color: string;
};

interface CategoryFiltersProps {
  products: Product[];
  uniqueBrands: string[];
  uniqueColors: string[];
  categoryName: string;
}

export default function CategoryFilters({ 
  products, 
  uniqueBrands, 
  uniqueColors, 
  categoryName 
}: CategoryFiltersProps) {
  // State for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Filter by price
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter(product => selectedColors.includes(product.color));
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured' - no specific sorting
        break;
    }

    setFilteredProducts(result);
  }, [products, priceRange, sortBy, selectedBrands, selectedColors]);

  // Format price for display
  const formatPrice = (price: number) => {
    return `$${price.toFixed(0)}`;
  };

  return (
    <>
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </label>
              <div className="px-2 py-4">
                <Slider
                  value={priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Brand</h4>
              <div className="space-y-2">
                {uniqueBrands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm">{brand}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Color</h4>
              <div className="space-y-2">
                {uniqueColors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`color-${color}`} 
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => toggleColor(color)}
                    />
                    <Label htmlFor={`color-${color}`} className="text-sm">{color}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
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

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setPriceRange([0, 1000]);
                setSortBy('featured');
                setSelectedBrands([]);
                setSelectedColors([]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{categoryName}</h1>
          <p className="text-muted-foreground">{filteredProducts.length} products</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products match your filters.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setPriceRange([0, 1000]);
                setSortBy('featured');
                setSelectedBrands([]);
                setSelectedColors([]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </>
  );
}