import { useState } from "react";
import { 
  Package2, 
  Bot, 
  Map
} from "lucide-react";
import Dashboard from "@/components/layout/Dashboard";
import StatusCard from "@/components/dashboard/StatusCard";
import RobotStatusCard from "@/components/dashboard/RobotStatusCard";
import PackageStatusTable from "@/components/dashboard/PackageStatusTable";
import WarehouseMapView from "@/components/dashboard/WarehouseMapView";

import { 
  overviewStats, 
  robotsData, 
  packagesData, 
  robotPositions, 
  shelfData 
} from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'robots' | 'map' | 'packages'>('robots');

  return (
    <Dashboard>
      <div className="space-y-6">
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
            variant={activeSection === 'map' ? 'default' : 'outline'} 
            onClick={() => setActiveSection('map')}
            className="flex items-center gap-2 min-w-32"
            size="lg"
          >
            <Map className="h-5 w-5" />
            Warehouse Map
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
              <h2 className="text-lg font-semibold mb-4">Robot Status</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

          {/* Warehouse Map */}
          {activeSection === 'map' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Warehouse Map</h2>
              <WarehouseMapView 
                shelves={shelfData} 
                robots={robotPositions} 
                mapSize={{ rows: 12, cols: 16 }}
              />
            </div>
          )}

          {/* Packages Table - Keep only the first example */}
          {activeSection === 'packages' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Package Tracking</h2>
              <PackageStatusTable packages={packagesData.slice(0, 1)} />
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
