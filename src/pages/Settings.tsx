
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Dashboard from "@/components/layout/Dashboard";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Define the shape of user settings to help TypeScript recognize the structure
interface UserSettings {
  pathfinding_algorithm: string;
  computation_priority: number;
  dynamic_rerouting: boolean;
  storage_strategy: string;
  auto_reorganization: boolean;
  speed_limit: number;
  recharge_threshold: number;
  collision_avoidance: boolean;
  automated_charging: boolean;
  theme: string;
  animations_enabled: boolean;
  realtime_updates: boolean;
  update_frequency: number;
}

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Create form for system settings
  const systemForm = useForm({
    defaultValues: {
      algorithmType: "astar",
      computationPriority: [70],
      dynamicRerouting: true,
      storageStrategy: "frequent",
      autoReorganization: true
    }
  });

  // Create form for robot settings
  const robotForm = useForm({
    defaultValues: {
      speedLimit: [1.2],
      rechargeThreshold: 20,
      collisionAvoidance: true,
      automatedCharging: true
    }
  });

  // Create form for appearance settings
  const appearanceForm = useForm({
    defaultValues: {
      theme: "light",
      animations: true,
      realtimeUpdates: true,
      updateFrequency: "5"
    }
  });

  // Check authentication status on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/auth');
        return;
      }
      setUser(data.user);
      
      // Load user settings
      try {
        const { data: settingsData, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (error) {
          console.error('Error loading settings:', error);
          return;
        }
        
        if (settingsData) {
          // Update system form
          systemForm.reset({
            algorithmType: settingsData.pathfinding_algorithm || "astar",
            computationPriority: [settingsData.computation_priority || 70],
            dynamicRerouting: settingsData.dynamic_rerouting !== null ? settingsData.dynamic_rerouting : true,
            storageStrategy: settingsData.storage_strategy || "frequent",
            autoReorganization: settingsData.auto_reorganization !== null ? settingsData.auto_reorganization : true
          });
          
          // Update robot form
          robotForm.reset({
            speedLimit: [settingsData.speed_limit || 1.2],
            rechargeThreshold: settingsData.recharge_threshold || 20,
            collisionAvoidance: settingsData.collision_avoidance !== null ? settingsData.collision_avoidance : true,
            automatedCharging: settingsData.automated_charging !== null ? settingsData.automated_charging : true
          });
          
          // Update appearance form
          appearanceForm.reset({
            theme: settingsData.theme || "light",
            animations: settingsData.animations_enabled !== null ? settingsData.animations_enabled : true,
            realtimeUpdates: settingsData.realtime_updates !== null ? settingsData.realtime_updates : true,
            updateFrequency: String(settingsData.update_frequency || 5)
          });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        toast({
          variant: "destructive",
          title: "Error loading settings",
          description: "Failed to load your settings. Please try again later.",
        });
      }
    };
    
    checkUser();
  }, [navigate]);

  const onSystemSubmit = async (data) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          pathfinding_algorithm: data.algorithmType,
          computation_priority: data.computationPriority[0],
          dynamic_rerouting: data.dynamicRerouting,
          storage_strategy: data.storageStrategy,
          auto_reorganization: data.autoReorganization,
          updated_at: new Date()
        })
        .eq('id', user.id);

      if (error) throw error;
      toast({
        title: "Settings saved",
        description: "Your system settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRobotSubmit = async (data) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          speed_limit: data.speedLimit[0],
          recharge_threshold: data.rechargeThreshold,
          collision_avoidance: data.collisionAvoidance,
          automated_charging: data.automatedCharging,
          updated_at: new Date()
        })
        .eq('id', user.id);

      if (error) throw error;
      toast({
        title: "Settings saved",
        description: "Your robot settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onAppearanceSubmit = async (data) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          theme: data.theme,
          animations_enabled: data.animations,
          realtime_updates: data.realtimeUpdates,
          update_frequency: parseInt(data.updateFrequency),
          updated_at: new Date()
        })
        .eq('id', user.id);

      if (error) throw error;
      toast({
        title: "Settings saved",
        description: "Your appearance settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If loading or not authenticated yet, show minimal content
  if (!user) {
    return (
      <Dashboard>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <div className="flex h-40 items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        
        <Tabs defaultValue="system">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="robots">Robots</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pathfinding Settings</CardTitle>
                <CardDescription>
                  Configure the pathfinding algorithm used by robots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...systemForm}>
                  <form onSubmit={systemForm.handleSubmit(onSystemSubmit)} className="space-y-4">
                    <FormField
                      control={systemForm.control}
                      name="algorithmType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Algorithm Type</FormLabel>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value} 
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="astar" id="astar" />
                              <label htmlFor="astar" className="text-sm">A* (Recommended)</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dijkstra" id="dijkstra" />
                              <label htmlFor="dijkstra" className="text-sm">Dijkstra</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <label htmlFor="custom" className="text-sm">Custom Algorithm</label>
                            </div>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={systemForm.control}
                      name="computationPriority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Computation Priority</FormLabel>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Speed</span>
                              <span className="text-sm">Accuracy</span>
                            </div>
                            <FormControl>
                              <Slider 
                                value={field.value} 
                                onValueChange={field.onChange}
                                max={100} 
                                step={10} 
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={systemForm.control}
                      name="dynamicRerouting"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Enable Dynamic Rerouting</FormLabel>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Allow robots to recalculate routes when obstacles are detected
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Storage Optimization</CardTitle>
                <CardDescription>
                  Configure how packages are assigned to shelves
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...systemForm}>
                  <form onSubmit={systemForm.handleSubmit(onSystemSubmit)} className="space-y-4">
                    <FormField
                      control={systemForm.control}
                      name="storageStrategy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Storage Strategy</FormLabel>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value} 
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="frequent" id="frequent" />
                              <label htmlFor="frequent" className="text-sm">Frequency-based (frequently accessed items closer)</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="category" id="category" />
                              <label htmlFor="category" className="text-sm">Category-based grouping</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="random" id="random" />
                              <label htmlFor="random" className="text-sm">Random assignment</label>
                            </div>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="autoReorganization"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Enable Automatic Reorganization</FormLabel>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Periodically reorganize stored items based on access patterns
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="robots" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Robot Configuration</CardTitle>
                <CardDescription>
                  Manage robot behavior and performance settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...robotForm}>
                  <form onSubmit={robotForm.handleSubmit(onRobotSubmit)} className="space-y-4">
                    <FormField
                      control={robotForm.control}
                      name="speedLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Speed Limit</FormLabel>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">0.5 m/s</span>
                              <span className="text-sm">2.0 m/s</span>
                            </div>
                            <FormControl>
                              <Slider 
                                value={field.value} 
                                onValueChange={field.onChange}
                                min={0.5} 
                                max={2.0} 
                                step={0.1} 
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Current: {field.value} m/s
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={robotForm.control}
                      name="rechargeThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Battery Management</FormLabel>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Recharge when below:</span>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                  className="w-16 h-8" 
                                />
                              </FormControl>
                              <span className="text-sm">%</span>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={robotForm.control}
                      name="collisionAvoidance"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Collision Avoidance</FormLabel>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Enable advanced collision detection and avoidance
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={robotForm.control}
                      name="automatedCharging"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Automated Charging</FormLabel>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Allow robots to autonomously seek charging stations when needed
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Appearance</CardTitle>
                <CardDescription>
                  Customize how the dashboard looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...appearanceForm}>
                  <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-4">
                    <FormField
                      control={appearanceForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme</FormLabel>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value} 
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="light" id="light" />
                              <label htmlFor="light" className="text-sm">Light</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <label htmlFor="dark" className="text-sm">Dark</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="system" id="system" />
                              <label htmlFor="system" className="text-sm">System preference</label>
                            </div>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={appearanceForm.control}
                      name="animations"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Animations</FormLabel>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Enable animations in the dashboard
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={appearanceForm.control}
                      name="realtimeUpdates"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Real-time Updates</FormLabel>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Update dashboard data in real-time
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={appearanceForm.control}
                      name="updateFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Update Frequency</FormLabel>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value} 
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="1sec" />
                              <label htmlFor="1sec" className="text-sm">1 second (may impact performance)</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="5" id="5sec" />
                              <label htmlFor="5sec" className="text-sm">5 seconds</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="15" id="15sec" />
                              <label htmlFor="15sec" className="text-sm">15 seconds</label>
                            </div>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default Settings;
