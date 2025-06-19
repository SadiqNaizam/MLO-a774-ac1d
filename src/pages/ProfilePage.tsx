import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ProfilePage: React.FC = () => {
  // Placeholder data - in a real app, this would come from state or API
  const userProfile = {
    name: 'Shad CN',
    email: 'shad.cn@example.com',
    avatarUrl: 'https://github.com/shadcn.png',
    bio: 'Frontend Developer passionate about building accessible and user-friendly web applications.',
    company: 'Acme Inc.',
    role: 'Software Engineer',
  };

  return (
    <MainAppLayout>
      <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-primary-text">User Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and profile information.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <Button variant="outline" size="sm">Change Avatar</Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue={userProfile.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={userProfile.email} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  rows={3} 
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={userProfile.bio}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue={userProfile.company} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue={userProfile.role} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-md font-medium text-primary-text">Password</h3>
              <p className="text-sm text-muted-foreground">Change your account password.</p>
              <Button variant="outline" className="mt-2">Change Password</Button>
            </div>
            <div>
              <h3 className="text-md font-medium text-primary-text">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              <Button variant="outline" className="mt-2">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </MainAppLayout>
  );
};

export default ProfilePage;