
import { Battery, Package, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface RobotStatusCardProps {
  id: string;
  status: "active" | "idle" | "charging" | "error";
  batteryLevel: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  payload?: {
    packageId: string;
    destination: string;
  };
}

export default function RobotStatusCard({
  id,
  status,
  batteryLevel,
  position,
  payload,
}: RobotStatusCardProps) {
  const statusColors = {
    active: "bg-robot-active/20 text-robot-active",
    idle: "bg-robot-idle/20 text-robot-idle",
    charging: "bg-robot-charging/20 text-robot-charging",
    error: "bg-robot-error/20 text-robot-error",
  };

  const statusLabels = {
    active: "Active",
    idle: "Idle",
    charging: "Charging",
    error: "Error",
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return "text-success";
    if (level > 30) return "text-warning";
    return "text-error";
  };

  return (
    <Card className="transition-all hover:shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Robot {id}</CardTitle>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              statusColors[status]
            )}
          >
            {statusLabels[status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Battery className={cn("h-4 w-4", getBatteryColor(batteryLevel))} />
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Battery</span>
              <span className={getBatteryColor(batteryLevel)}>{batteryLevel}%</span>
            </div>
            <Progress 
              value={batteryLevel} 
              className={cn(
                "h-2", 
                batteryLevel > 70 ? "bg-success/20" : batteryLevel > 30 ? "bg-warning/20" : "bg-error/20"
              )}
              indicatorClassName={
                batteryLevel > 70 ? "bg-success" : batteryLevel > 30 ? "bg-warning" : "bg-error"
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>
              Position: [{position.x}, {position.y}, {position.z}]
            </span>
          </div>
          
          {payload && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Package className="h-4 w-4 mr-2" />
              <span>
                Package: {payload.packageId} → {payload.destination}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
