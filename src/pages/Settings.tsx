
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

const Settings = () => {
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
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <FormLabel>Algorithm Type</FormLabel>
                  <RadioGroup defaultValue="astar" className="flex flex-col space-y-2">
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
                </div>
                
                <div className="space-y-1">
                  <FormLabel>Computation Priority</FormLabel>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Speed</span>
                      <span className="text-sm">Accuracy</span>
                    </div>
                    <Slider defaultValue={[70]} max={100} step={10} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Enable Dynamic Rerouting</FormLabel>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow robots to recalculate routes when obstacles are detected
                  </p>
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Storage Optimization</CardTitle>
                <CardDescription>
                  Configure how packages are assigned to shelves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <FormLabel>Storage Strategy</FormLabel>
                  <RadioGroup defaultValue="frequent" className="flex flex-col space-y-2">
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
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Enable Automatic Reorganization</FormLabel>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Periodically reorganize stored items based on access patterns
                  </p>
                </div>

                <Button>Save Changes</Button>
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
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <FormLabel>Speed Limit</FormLabel>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">0.5 m/s</span>
                      <span className="text-sm">2.0 m/s</span>
                    </div>
                    <Slider defaultValue={[1.2]} min={0.5} max={2.0} step={0.1} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current: 1.2 m/s
                  </p>
                </div>
                
                <div className="space-y-1">
                  <FormLabel>Battery Management</FormLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recharge when below:</span>
                    <div className="flex items-center space-x-2">
                      <Input type="number" defaultValue={20} className="w-16 h-8" />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Collision Avoidance</FormLabel>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable advanced collision detection and avoidance
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Automated Charging</FormLabel>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow robots to autonomously seek charging stations when needed
                  </p>
                </div>

                <Button>Save Changes</Button>
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
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <FormLabel>Theme</FormLabel>
                  <RadioGroup defaultValue="light" className="flex flex-col space-y-2">
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
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Animations</FormLabel>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable animations in the dashboard
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Real-time Updates</FormLabel>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Update dashboard data in real-time
                  </p>
                </div>
                
                <div className="space-y-1">
                  <FormLabel>Update Frequency</FormLabel>
                  <RadioGroup defaultValue="5" className="flex flex-col space-y-2">
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
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default Settings;
