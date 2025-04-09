
import Dashboard from "@/components/layout/Dashboard";
import PackageStatusTable from "@/components/dashboard/PackageStatusTable";
import { packagesData } from "@/data/mockData";

const Packages = () => {
  return (
    <Dashboard>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Package Management</h1>
        <PackageStatusTable packages={packagesData} />
      </div>
    </Dashboard>
  );
};

export default Packages;
