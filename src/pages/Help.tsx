import { useState } from "react";
import Dashboard from "@/components/layout/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  BookOpen, 
  Info,
  MessageSquare
} from "lucide-react";

const Help = () => {
  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-6 w-6" />
          <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
        </div>
        
        <p className="text-muted-foreground text-base leading-relaxed text-center">
  Find answers to common questions and learn how to use the warehouse management system effectively.
</p>

        
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-4">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="instructions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Instructions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to the most common questions about our warehouse management system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* FAQ Items */}
                  {/* You can add or remove items here */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I set up the Robot Communication?
                    </AccordionTrigger>
                    <AccordionContent>
                      Go to the Settings Page and set the MQTT broker address, port, and topic prefix. Ensure your robot firmware uses the same configuration.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How does the robot know where to go?
                    </AccordionTrigger>
                    <AccordionContent>
                      The robot uses onboard navigation and path-planning logic to calculate the optimal route based on the package’s destination.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      How does the system recognize and route packages?
                    </AccordionTrigger>
                    <AccordionContent>
                      Computer vision identifies labels or QR codes on packages, then uses a routing algorithm to assign the correct shelf.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Can I override package routes?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, from the dashboard, select a package and manually change its destination if needed.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      Why isn't the robot responding?
                    </AccordionTrigger>
                    <AccordionContent>
                      Check MQTT connection, broker URL, and ensure the robot is powered and listening to the correct topics. Also verify firmware status.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  System Instructions
                </CardTitle>
                <CardDescription>
                  Learn how to use the warehouse management system effectively.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Getting Started</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    First, configure your MQTT broker in the Settings Page. Then, power on the robots and ensure they are connected to the broker.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Configure MQTT settings in Settings Page</li>
                    <li>Ensure robot firmware matches MQTT topics</li>
                    <li>Use the dashboard to track robot status</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Dashboard Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Use the dashboard to monitor robot positions, package movement, and shelf status in real-time.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Real-time map for robot tracking</li>
                    <li>Status cards for package and shelf info</li>
                    <li>Manual override and logs available</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Managing Warehouse Settings</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Customize system behavior, robot limits, and other parameters from the Settings Page.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Set MQTT credentials and topics</li>
                    <li>Adjust robot speed or boundaries</li>
                    <li>Enable or disable manual overrides</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default Help;
