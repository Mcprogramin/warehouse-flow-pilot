
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
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-6 w-6" />
          <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
        </div>
        
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to use the warehouse management system effectively.
        </p>
        
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="instructions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Instructions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-4 mt-6">
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
                  {/* FAQ Item 1 */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Lorem ipsum dolor sit amet?
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* FAQ Item 2 */}
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Consectetur adipiscing elit?
                    </AccordionTrigger>
                    <AccordionContent>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* FAQ Item 3 */}
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Sed do eiusmod tempor incididunt?
                    </AccordionTrigger>
                    <AccordionContent>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* FAQ Item 4 */}
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Ut labore et dolore magna aliqua?
                    </AccordionTrigger>
                    <AccordionContent>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* FAQ Item 5 */}
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      Quis nostrud exercitation ullamco?
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructions" className="space-y-4 mt-6">
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
                {/* Section 1 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Getting Started</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Sed do eiusmod tempor incididunt</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Dashboard Overview</h3>
                  <p className="text-muted-foreground">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Ut enim ad minim veniam</li>
                    <li>Quis nostrud exercitation ullamco</li>
                    <li>Laboris nisi ut aliquip ex ea commodo</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Managing Warehouse Settings</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Duis aute irure dolor in reprehenderit</li>
                    <li>In voluptate velit esse cillum dolore</li>
                    <li>Excepteur sint occaecat cupidatat non proident</li>
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
