import { useState } from "react";
import { 
  Package2, 
  Bot
} from "lucide-react";
import Dashboard from "@/components/layout/Dashboard";
import StatusCard from "@/components/dashboard/StatusCard";
import RobotStatusCard from "@/components/dashboard/RobotStatusCard";
import PackageStatusTable from "@/components/dashboard/PackageStatusTable";

import { 
  overviewStats, 
  robotsData, 
  packagesData
} from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'robots' | 'packages'>('robots');

  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Monitor and manage your warehouse operations in real-time
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StatusCard
            title="Active Robots"
            value={overviewStats.activeRobots}
            icon={<Bot className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatusCard
            title="Packages in Transit"
            value={overviewStats.packagesInTransit}
            icon={<Package2 className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button 
            variant={activeSection === 'robots' ? 'default' : 'outline'} 
            onClick={() => setActiveSection('robots')}
            className="flex items-center gap-2 min-w-32"
            size="lg"
          >
            <Bot className="h-5 w-5" />
            Robot Status
          </Button>
          <Button 
            variant={activeSection === 'packages' ? 'default' : 'outline'} 
            onClick={() => setActiveSection('packages')}
            className="flex items-center gap-2 min-w-32"
            size="lg"
          >
            <Package2 className="h-5 w-5" />
            Package Tracking
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Robots Status Cards */}
          {activeSection === 'robots' && (
            <div>
              <h2 className="text-lg font-semibold">Robot Status</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-4">
                {robotsData.map((robot) => (
                  <RobotStatusCard
                    key={robot.id}
                    id={robot.id}
                    status={robot.status}
                    position={robot.position}
                    payload={robot.payload}
                    batteryLevel={robot.batteryLevel}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Packages Table */}
          {activeSection === 'packages' && (
            <div>
              <h2 className="text-lg font-semibold">Package Tracking</h2>
              <div className="mt-4">
                <PackageStatusTable packages={packagesData.slice(0, 1)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
