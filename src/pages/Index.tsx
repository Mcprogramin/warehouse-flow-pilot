
import { useState } from "react";
import { 
  Package2, 
  Robot, 
  Layers3, 
  LineChart
} from "lucide-react";
import Dashboard from "@/components/layout/Dashboard";
import StatusCard from "@/components/dashboard/StatusCard";
import RobotStatusCard from "@/components/dashboard/RobotStatusCard";
import PackageStatusTable from "@/components/dashboard/PackageStatusTable";
import WarehouseMapView from "@/components/dashboard/WarehouseMapView";
import NotificationFeed from "@/components/dashboard/NotificationFeed";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import { 
  overviewStats, 
  robotsData, 
  packagesData, 
  shelfData, 
  robotPositions, 
  notificationsData, 
  performanceData 
} from "@/data/mockData";

const Index = () => {
  const [notifications, setNotifications] = useState(notificationsData);

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
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Active Robots"
            value={overviewStats.activeRobots}
            icon={<Robot className="h-4 w-4" />}
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

        {/* Performance Chart */}
        <PerformanceChart data={performanceData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            {/* Robots Status Cards */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Robot Status</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {robotsData.map((robot) => (
                  <RobotStatusCard
                    key={robot.id}
                    id={robot.id}
                    status={robot.status}
                    batteryLevel={robot.batteryLevel}
                    position={robot.position}
                    payload={robot.payload}
                  />
                ))}
              </div>
            </div>

            {/* Warehouse Map */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Warehouse Map</h2>
              <WarehouseMapView 
                shelves={shelfData} 
                robots={robotPositions} 
                mapSize={{ rows: 12, cols: 16 }}
              />
            </div>

            {/* Packages Table */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Package Tracking</h2>
              <PackageStatusTable packages={packagesData} />
            </div>
          </div>

          {/* Notifications Sidebar */}
          <div className="space-y-6">
            <NotificationFeed
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
