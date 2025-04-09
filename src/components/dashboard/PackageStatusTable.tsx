
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye, RotateCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  destination: string;
  currentLocation: string;
  status: "in_transit" | "stored" | "delivered" | "error";
  priority: "low" | "medium" | "high";
  estimatedArrival?: string;
}

interface PackageStatusTableProps {
  packages: Package[];
}

export default function PackageStatusTable({
  packages: initialPackages,
}: PackageStatusTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState(initialPackages);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.currentLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusBadgeClasses = {
    in_transit: "status-badge-info",
    stored: "status-badge-success",
    delivered: "status-badge-neutral",
    error: "status-badge-error",
  };

  const statusLabels = {
    in_transit: "In Transit",
    stored: "Stored",
    delivered: "Delivered",
    error: "Error",
  };

  const priorityBadgeClasses = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-warning/20 text-warning",
    high: "bg-error/20 text-error",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search packages..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Current Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Est. Arrival</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No packages found
                </TableCell>
              </TableRow>
            ) : (
              filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.id}</TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>{pkg.currentLocation}</TableCell>
                  <TableCell>
                    <span className={cn("status-badge", statusBadgeClasses[pkg.status])}>
                      {statusLabels[pkg.status]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "status-badge",
                        priorityBadgeClasses[pkg.priority]
                      )}
                    >
                      {pkg.priority.charAt(0).toUpperCase() + pkg.priority.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{pkg.estimatedArrival || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RotateCw className="h-4 w-4" />
                        <span className="sr-only">Re-route</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
