import React, { useState, useEffect } from 'react';
import Paho from 'paho-mqtt';
import Dashboard from '@/components/layout/Dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, Wifi, WifiOff, Settings as SettingsIcon } from 'lucide-react';
import './style.css';

let client: Paho.MQTT.Client | null = null;

const MQTTDashboard: React.FC = () => {
  const [host, setHost] = useState('broker.emqx.io');
  const [port, setPort] = useState('8083');
  const [username, setUsername] = useState('emqx');
  const [password, setPassword] = useState('');
  const [subTopic, setSubTopic] = useState('#');
  const [pubTopic, setPubTopic] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();

  const appendMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  const startConnect = () => {
    try {
      const clientID = 'clientID-' + Math.floor(Math.random() * 100000);
      appendMessage(`Connecting to ${host} on port ${port}`);
      appendMessage(`Using the client ID ${clientID}`);

      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      client = new Paho.Client(host, Number(port), clientID);

      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      const connectOptions: Paho.ConnectionOptions = {
        onSuccess: onConnect,
        useSSL: window.location.protocol === 'https:',
        mqttVersion: 4,
      };

      if (username) connectOptions.userName = username;
      if (password) connectOptions.password = password;

      client.connect(connectOptions);
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect to MQTT broker",
        variant: "destructive",
      });
    }
  };

  const onConnect = () => {
    setConnected(true);
    appendMessage(`Subscribing to topic ${subTopic}`);
    if (client) {
      client.subscribe(subTopic);
      toast({
        title: "Connected",
        description: `Successfully connected to ${host}`,
      });
    }
  };

  const onConnectionLost = (responseObject: any) => {
    setConnected(false);
    appendMessage('ERROR: Connection is lost.');
    if (responseObject.errorCode !== 0) {
      appendMessage(`ERROR: ${responseObject.errorMessage}`);
      toast({
        title: "Connection Lost",
        description: responseObject.errorMessage,
        variant: "destructive",
      });
    }
  };

  const onMessageArrived = (message: Paho.MQTT.Message) => {
    console.log('OnMessageArrived:', message.payloadString);
    appendMessage(`Topic: ${message.destinationName} | Message: ${message.payloadString}`);
  };

  const startDisconnect = () => {
    if (client && client.isConnected()) {
      try {
        client.disconnect();
        appendMessage('Disconnected.');
        setConnected(false);
        toast({
          title: "Disconnected",
          description: "Successfully disconnected from broker",
        });
      } catch (error) {
        console.error("Disconnect error:", error);
        toast({
          title: "Disconnect Error",
          description: error instanceof Error ? error.message : "Failed to disconnect",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Not Connected",
        description: "No active connection to disconnect",
        variant: "destructive",
      });
    }
  };

  const publishMessage = () => {
    if (!client || !client.isConnected()) {
      toast({
        title: "Publish Failed",
        description: "You must be connected to publish messages.",
        variant: "destructive",
      });
      return;
    }

    if (!pubTopic || !message) {
      toast({
        title: "Missing Fields",
        description: "Topic and message must be filled out before publishing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const mqttMessage = new Paho.Message(message);
      mqttMessage.destinationName = pubTopic;
      client.send(mqttMessage);

      appendMessage(`Message sent to topic ${pubTopic}: ${message}`);
      setMessage('');
      toast({
        title: "Message Sent",
        description: `Message sent to topic: ${pubTopic}`,
      });
    } catch (error) {
      console.error("Error publishing message:", error);
      toast({
        title: "Publish Error",
        description: error instanceof Error ? error.message : "Failed to publish message",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    document.title = 'Settings | Warehouse Flow Pilot';
  }, []);

  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Connect to MQTT brokers and publish/subscribe to topics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Connection Settings
              </CardTitle>
              <CardDescription className="text-center">Configure your MQTT broker connection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="host">Broker Address</Label>
                <Input
                  id="host"
                  type="text"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="broker address"
                  disabled={connected}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="port"
                  disabled={connected}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  disabled={connected}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  disabled={connected}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic_s">Subscription Topic</Label>
                <Input
                  id="topic_s"
                  type="text"
                  value={subTopic}
                  onChange={(e) => setSubTopic(e.target.value)}
                  placeholder="# for all topics"
                  disabled={connected}
                  className="w-full"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <GlowingButton
                onClick={startConnect}
                disabled={connected}
                variant={connected ? "outline" : "default"}
                className="flex items-center gap-2"
                glowColor={connected ? "rgba(156, 163, 175, 0.5)" : "rgba(59, 130, 246, 0.5)"}
                hoverGlowColor={connected ? "rgba(156, 163, 175, 0.8)" : "rgba(59, 130, 246, 0.8)"}
              >
                <Wifi className="h-4 w-4" />
                Connect
              </GlowingButton>
              <GlowingButton
                onClick={startDisconnect}
                variant="destructive"
                className="flex items-center gap-2"
                glowColor="rgba(239, 68, 68, 0.5)"
                hoverGlowColor="rgba(239, 68, 68, 0.8)"
              >
                <WifiOff className="h-4 w-4" />
                Disconnect
              </GlowingButton>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Publish Message</CardTitle>
              <CardDescription className="text-center">Send messages to topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic_p">Topic</Label>
                <Input
                  id="topic_p"
                  type="text"
                  value={pubTopic}
                  onChange={(e) => setPubTopic(e.target.value)}
                  placeholder="Publish topic"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Message">Message</Label>
                <Input
                  id="Message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      publishMessage();
                    }
                  }}
                  className="w-full"
                />
              </div>
            </CardContent>
            <CardFooter>
              <GlowingButton
                onClick={publishMessage}
                className="w-full"
                glowColor="rgba(59, 130, 246, 0.5)"
                hoverGlowColor="rgba(59, 130, 246, 0.8)"
              >
                Publish
              </GlowingButton>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Messages</CardTitle>
            <CardDescription className="text-center">MQTT message history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md h-[250px] overflow-auto">
              {messages.length === 0 ? (
                <p className="text-muted-foreground text-center">No messages yet</p>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className="py-1 border-b border-border last:border-0">
                    <span dangerouslySetInnerHTML={{ __html: msg }}></span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
};

export default MQTTDashboard;
