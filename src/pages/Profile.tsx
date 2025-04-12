import { useEffect, useState } from "react";
import Dashboard from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Profile | Warehouse Flow Pilot';
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <Dashboard>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8">
        <div className="flex items-center gap-2">
          <UserIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your personal account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarFallback className="text-2xl bg-primary/80">
                  {user?.email?.[0].toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Email</span>
              </div>
              <p className="text-lg pl-6">{user?.email || 'No email found'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
};

export default Profile; 