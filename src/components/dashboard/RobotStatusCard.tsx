
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

  const getProgressColor = (level: number) => {
    if (level > 70) return "bg-success";
    if (level > 30) return "bg-warning";
    return "bg-error";
  };

  const getProgressBgColor = (level: number) => {
    if (level > 70) return "bg-success/20";
    if (level > 30) return "bg-warning/20";
    return "bg-error/20";
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
                getProgressBgColor(batteryLevel)
              )}
              style={{
                backgroundColor: 
                  batteryLevel > 70 
                    ? 'hsl(var(--success) / 0.2)' 
                    : batteryLevel > 30 
                      ? 'hsl(var(--warning) / 0.2)' 
                      : 'hsl(var(--error) / 0.2)',
              }}
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
