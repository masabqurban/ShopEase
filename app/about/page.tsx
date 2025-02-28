import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
      bio: 'Sarah founded ShopEase with a vision to create a seamless shopping experience for everyone. With over 15 years in retail and e-commerce, she leads our company with passion and innovation.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      bio: 'Michael oversees all technical aspects of ShopEase. His expertise in software development and e-commerce platforms ensures we stay at the cutting edge of technology.'
    },
    {
      name: 'Olivia Rodriguez',
      role: 'Head of Customer Experience',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      bio: 'Olivia is dedicated to making every customer interaction exceptional. She leads our support team with empathy and efficiency, ensuring customer satisfaction.'
    },
    {
      name: 'David Kim',
      role: 'Product Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      bio: 'David brings products to life at ShopEase. His keen eye for design and functionality helps us curate collections that delight our customers.'
    }
  ];

  const values = [
    {
      title: 'Customer First',
      description: 'We prioritize our customers in every decision we make, striving to exceed expectations and create memorable shopping experiences.'
    },
    {
      title: 'Quality & Reliability',
      description: 'We stand behind every product we sell, ensuring the highest standards of quality, durability, and performance.'
    },
    {
      title: 'Innovation',
      description: 'We continuously seek new ways to improve our platform, products, and services to stay ahead in the ever-evolving e-commerce landscape.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible practices throughout our operations, from product sourcing to packaging and shipping.'
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">About ShopEase</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to transform online shopping with a seamless, personalized experience that puts customers first.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, ShopEase began with a simple idea: online shopping should be easy, enjoyable, and accessible to everyone. What started as a small operation has grown into a thriving e-commerce platform serving customers worldwide.
                </p>
                <p>
                  Our journey hasn't been without challenges. During the global pandemic, we pivoted to meet the changing needs of consumers, expanding our product range and enhancing our delivery capabilities to ensure people could get what they needed safely and conveniently.
                </p>
                <p>
                  Today, ShopEase offers thousands of products across multiple categories, from electronics and fashion to home goods and beauty. But despite our growth, we remain committed to our founding principles: exceptional quality, outstanding service, and an unwavering focus on customer satisfaction.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
                alt="ShopEase office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm">
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for talented individuals to join our team. If you're passionate about e-commerce and creating exceptional customer experiences, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg">View Careers</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}