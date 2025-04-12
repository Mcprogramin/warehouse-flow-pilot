import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/layout/Dashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<string[]>([]);

  // Form instances with default values
  const systemForm = useForm({
    defaultValues: {
      algorithmType: "astar",
      computationPriority: [70],
      dynamicRerouting: true,
      storageStrategy: "frequent",
      autoReorganization: true,
    },
  });
  const appearanceForm = useForm({
    defaultValues: {
      theme: "light",
      animations: true,
      realtimeUpdates: true,
      updateFrequency: "5",
    },
  });

  // Load user settings from database
  const loadUserSettings = async (userId: string) => {
    try {
      const { data: settingsData, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      if (!settingsData) return;

      const settings = settingsData as any;
      systemForm.reset({
        algorithmType: settings.pathfinding_algorithm || "astar",
        computationPriority: [settings.computation_priority || 70],
        dynamicRerouting: settings.dynamic_rerouting ?? true,
        storageStrategy: settings.storage_strategy || "frequent",
        autoReorganization: settings.auto_reorganization ?? true,
      });
      appearanceForm.reset({
        theme: settings.theme || "light",
        animations: settings.animations_enabled ?? true,
        realtimeUpdates: settings.realtime_updates ?? true,
        updateFrequency: String(settings.update_frequency || 5),
      });
    } catch (error) {
      console.error("Failed to load settings:", error);
      throw error;
    }
  };

  // Check auth and load settings on mount
  useEffect(() => {
    const initialize = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/auth");
        return;
      }
      setUser(data.user);
      try {
        await loadUserSettings(data.user.id);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error loading settings",
          description:
            "Failed to load your settings. Please try again later.",
        });
      }
    };
    initialize();
  }, [navigate, toast]);

  // Generic save handler for user settings
  const saveSettings = async (updateData: any) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("user_settings")
        .update({ ...updateData, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (error) throw error;
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: error.message || "An error occurred while saving settings",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Form submission handlers
  const onSystemSubmit = async (data: any) => {
    await saveSettings({
      pathfinding_algorithm: data.algorithmType,
      computation_priority: data.computationPriority[0],
      dynamic_rerouting: data.dynamicRerouting,
      storage_strategy: data.storageStrategy,
      auto_reorganization: data.autoReorganization,
    });
  };
  const onAppearanceSubmit = async (data: any) => {
    await saveSettings({
      theme: data.theme,
      animations_enabled: data.animations,
      realtime_updates: data.realtimeUpdates,
      update_frequency: parseInt(data.updateFrequency),
    });
  };

  // MQTT Functions
  const startConnect = async () => {
    const host = (document.getElementById("host") as HTMLInputElement).value;
    const port = (document.getElementById("port") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const topic_s = (document.getElementById("topic_s") as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:3001/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host, port, username, password, topic: topic_s }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, result.message]);
      } else {
        setMessages((prev) => [...prev, `ERROR: ${result.message}`]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, "ERROR: Failed to connect to MQTT broker."]);
    }
  };

  const startDisconnect = async () => {
    try {
      const response = await fetch("http://localhost:3001/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, result.message]);
      } else {
        setMessages((prev) => [...prev, `ERROR: ${result.message}`]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, "ERROR: Failed to disconnect from MQTT broker."]);
    }
  };

  const publishMessage = async () => {
    const topic_p = (document.getElementById("topic_p") as HTMLInputElement).value;
    const msg = (document.getElementById("Message") as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:3001/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic_p, message: msg }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, result.message]);
      } else {
        setMessages((prev) => [...prev, `ERROR: ${result.message}`]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, "ERROR: Failed to publish message."]);
    }
  };

  // Loading state
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
        <Tabs defaultValue="mqtt">
          <TabsList className="flex justify-center w-full lg:w-[400px] gap-4">
            <TabsTrigger value="mqtt">MQTT</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          {/* MQTT Tab */}
          <TabsContent value="mqtt" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>MQTT Configuration</CardTitle>
                <CardDescription>
                  Connect to an MQTT broker and manage subscriptions and messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="connection-information-form" className="space-y-4">
                  <div>
                    <b>Hostname or IP Address and Port Number:</b>
                    <div className="flex space-x-2">
                      <Input
                        id="host"
                        type="text"
                        placeholder="Broker address"
                        defaultValue="broker.emqx.io"
                      />
                      <Input id="port" type="text" defaultValue="8083" />
                    </div>
                  </div>
                  <div>
                    <b>Username and Password:</b>
                    <div className="flex space-x-2">
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        defaultValue="emqx"
                      />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div>
                    <b>Subscription Topic:</b>
                    <Input id="topic_s" type="text" defaultValue="#" />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="button" onClick={startConnect}>
                      Connect
                    </Button>
                    <Button type="button" onClick={startDisconnect}>
                      Disconnect
                    </Button>
                  </div>
                  <div>
                    <b>Publish Topic and Message:</b>
                    <div className="flex space-x-2">
                      <Input
                        id="topic_p"
                        type="text"
                        placeholder="Publish topic"
                      />
                      <Input
                        id="Message"
                        type="text"
                        placeholder="Message"
                      />
                      <Button type="button" onClick={publishMessage}>
                        Publish
                      </Button>
                    </div>
                  </div>
                </form>
                <div id="messages" className="mt-4">
                  <h3 className="font-bold">Messages:</h3>
                  <ul>
                    {messages.map((msg, index) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Appearance Tab */}
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      appearanceForm.handleSubmit(onAppearanceSubmit)(e);
                    }}
                    className="space-y-4"
                  >
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
                              <label htmlFor="light" className="text-sm">
                                Light
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <label htmlFor="dark" className="text-sm">
                                Dark
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="system" id="system" />
                              <label htmlFor="system" className="text-sm">
                                System preference
                              </label>
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
                              <label htmlFor="1sec" className="text-sm">
                                1 second (may impact performance)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="5" id="5sec" />
                              <label htmlFor="5sec" className="text-sm">
                                5 seconds
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="15" id="15sec" />
                              <label htmlFor="15sec" className="text-sm">
                                15 seconds
                              </label>
                            </div>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      aria-disabled={isLoading}
                    >
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