'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function AccountSettingsPage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
  });
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [emailNotifications, setEmailNotifications] = useState({
    orders: true,
    promotions: true,
    news: false,
    reminders: true,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Profile updated",
      description: "Your personal information has been updated successfully.",
    });
    
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsLoading(false);
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
    
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    // This would typically show a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
      
      // Redirect to home page
      router.push('/');
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/account" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Account
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <div className="space-y-10">
          {/* Personal Information */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  />
                </div>
              </div>

              <Button type="submit" className="mt-4" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>

          {/* Password */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    className="pl-10"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="pl-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="mt-4" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
            
            <form onSubmit={handleNotificationSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="orders">Order Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your orders
                    </p>
                  </div>
                  <Switch
                    id="orders"
                    checked={emailNotifications.orders}
                    onCheckedChange={(checked) => 
                      setEmailNotifications({...emailNotifications, orders: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promotions">Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about sales and special offers
                    </p>
                  </div>
                  <Switch
                    id="promotions"
                    checked={emailNotifications.promotions}
                    onCheckedChange={(checked) => 
                      setEmailNotifications({...emailNotifications, promotions: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="news">News and Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Stay informed about new features and updates
                    </p>
                  </div>
                  <Switch
                    id="news"
                    checked={emailNotifications.news}
                    onCheckedChange={(checked) => 
                      setEmailNotifications({...emailNotifications, news: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminders">Cart Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders about items left in your cart
                    </p>
                  </div>
                  <Switch
                    id="reminders"
                    checked={emailNotifications.reminders}
                    onCheckedChange={(checked) => 
                      setEmailNotifications({...emailNotifications, reminders: checked})
                    }
                  />
                </div>
              </div>

              <Button type="submit" className="mt-4" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </form>
          </div>

          {/* Delete Account */}
          <div className="bg-card rounded-lg shadow-sm p-6 border border-red-200">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Account</h2>
            <p className="text-muted-foreground mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Delete Account"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}