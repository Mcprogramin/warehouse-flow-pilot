
import Dashboard from "@/components/layout/Dashboard";
import WarehouseMapView from "@/components/dashboard/WarehouseMapView";
import { shelfData, robotPositions } from "@/data/mockData";

const Shelves = () => {
  return (
    <Dashboard>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Shelf Management</h1>
        <WarehouseMapView 
          shelves={shelfData} 
          robots={robotPositions} 
          mapSize={{ rows: 12, cols: 16 }}
        />
      </div>
    </Dashboard>
  );
};

export default Shelves;
