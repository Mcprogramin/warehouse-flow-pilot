import { useState } from "react";
import { 
  Package2, 
  Bot, 
  Layers3, 
  LineChart,
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
  shelfData, 
  robotPositions, 
  notificationsData
} from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeSection, setActiveSection] = useState<'robots' | 'map' | 'packages'>('robots');

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <StatusCard
            title="Shelves Occupied"
            value={`${overviewStats.shelvesOccupied}/200`}
            icon={<Layers3 className="h-4 w-4" />}
            description="63.5% capacity used"
          />
          <StatusCard
            title="Error Rate"
            value={`${overviewStats.errorRate}%`}
            icon={<LineChart className="h-4 w-4" />}
            trend={{ value: 0.3, isPositive: false }}
            className="bg-error/5"
          />
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeSection === 'robots' ? 'default' : 'outline'} 
            onClick={() => setActiveSection('robots')}
            className="flex items-center gap-2"
          >
            <Bot className="h-4 w-4" />
            Robot Status
          </Button>
          <Button 
            variant={activeSection === 'map' ? 'default' : 'outline'} 
            onClick={() => setActiveSection('map')}
            className="flex items-center gap-2"
          >
            <Map className="h-4 w-4" />
            Warehouse Map
          </Button>
          <Button 
            variant={activeSection === 'packages' ? 'default' : 'outline'} 
            onClick={() => setActiveSection('packages')}
            className="flex items-center gap-2"
          >
            <Package2 className="h-4 w-4" />
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
