
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ShelfPosition {
  row: number;
  col: number;
  height: number;
  status: "vacant" | "occupied" | "reserved";
  packageId?: string;
}

interface RobotPosition {
  id: string;
  x: number;
  y: number;
  status: "active" | "idle" | "charging" | "error";
}

interface WarehouseMapViewProps {
  shelves: ShelfPosition[];
  robots: RobotPosition[];
  mapSize: {
    rows: number;
    cols: number;
  };
}

export default function WarehouseMapView({
  shelves,
  robots,
  mapSize,
}: WarehouseMapViewProps) {
  const [selectedShelf, setSelectedShelf] = useState<ShelfPosition | null>(null);

  // Calculate grid cell size based on map dimensions
  const cellSize = 40;
  const mapWidth = mapSize.cols * cellSize;
  const mapHeight = mapSize.rows * cellSize;

  const shelfStatusColors = {
    vacant: "bg-green-100 border-green-300",
    occupied: "bg-blue-100 border-blue-300",
    reserved: "bg-amber-100 border-amber-300",
  };

  const robotStatusColors = {
    active: "bg-robot-active text-white",
    idle: "bg-robot-idle text-white",
    charging: "bg-robot-charging text-white",
    error: "bg-robot-error text-white",
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Warehouse Map</CardTitle>
          <div className="flex space-x-4 text-xs">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-sm bg-green-100 border border-green-300 mr-1"></div>
              <span>Vacant</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-sm bg-blue-100 border border-blue-300 mr-1"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-sm bg-amber-100 border border-amber-300 mr-1"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="relative border border-border rounded-md overflow-auto bg-secondary/50"
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <div
            className="relative"
            style={{
              width: mapWidth,
              height: mapHeight,
            }}
          >
            {/* Grid */}
            <div className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(${mapSize.cols}, ${cellSize}px)`,
                gridTemplateRows: `repeat(${mapSize.rows}, ${cellSize}px)`,
              }}
            >
              {Array.from({ length: mapSize.rows * mapSize.cols }).map((_, index) => (
                <div
                  key={index}
                  className="border border-border/30"
                />
              ))}
            </div>

            {/* Shelves */}
            {shelves.map((shelf, index) => {
              const left = shelf.col * cellSize;
              const top = shelf.row * cellSize;
              return (
                <div
                  key={`shelf-${index}`}
                  className={cn(
                    "absolute flex items-center justify-center border-2 rounded-sm cursor-pointer transition-colors hover:opacity-80",
                    shelfStatusColors[shelf.status],
                    selectedShelf === shelf && "ring-2 ring-primary"
                  )}
                  style={{
                    left: left + 4,
                    top: top + 4,
                    width: cellSize - 8,
                    height: cellSize - 8,
                  }}
                  onClick={() => setSelectedShelf(shelf)}
                >
                  <span className="text-xs font-medium">
                    {shelf.status === "occupied" && shelf.packageId ? shelf.packageId.slice(-4) : ""}
                  </span>
                </div>
              );
            })}

            {/* Robots */}
            {robots.map((robot) => {
              const left = robot.x * cellSize;
              const top = robot.y * cellSize;
              return (
                <div
                  key={`robot-${robot.id}`}
                  className={cn(
                    "absolute flex items-center justify-center rounded-full z-10 transition-all animate-pulse-slow",
                    robotStatusColors[robot.status]
                  )}
                  style={{
                    left: left + cellSize / 4,
                    top: top + cellSize / 4,
                    width: cellSize / 2,
                    height: cellSize / 2,
                  }}
                  title={`Robot ${robot.id}`}
                >
                  <span className="text-xs font-bold">{robot.id.slice(-1)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shelf Details */}
        {selectedShelf && (
          <div className="mt-4 p-3 border rounded-md bg-card">
            <h4 className="font-medium text-sm">Shelf Details</h4>
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <div>
                <span className="text-muted-foreground">Position:</span>
                <div>
                  [{selectedShelf.row}, {selectedShelf.col}, {selectedShelf.height}]
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="capitalize">{selectedShelf.status}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Package ID:</span>
                <div>{selectedShelf.packageId || "None"}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
