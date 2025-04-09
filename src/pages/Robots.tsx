
import Dashboard from "@/components/layout/Dashboard";
import RobotStatusCard from "@/components/dashboard/RobotStatusCard";
import { robotsData } from "@/data/mockData";
import { Bot } from "lucide-react";

const Robots = () => {
  return (
    <Dashboard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Robot Management</h1>
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground hidden sm:inline">
              {robotsData.length} Robots
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </Dashboard>
  );
};

export default Robots;
