
// Mock data for demo purposes

// Dashboard overview stats
export const overviewStats = {
  activeRobots: 8,
  packagesInTransit: 24,
  shelvesOccupied: 127,
  errorRate: 1.2,
};

// Performance data for charts
export const performanceData = [
  {
    date: "Mon",
    efficiency: 78,
    deliveries: 41,
    errors: 2,
  },
  {
    date: "Tue",
    efficiency: 82,
    deliveries: 37,
    errors: 1,
  },
  {
    date: "Wed",
    efficiency: 86,
    deliveries: 45,
    errors: 3,
  },
  {
    date: "Thu",
    efficiency: 84,
    deliveries: 52,
    errors: 2,
  },
  {
    date: "Fri",
    efficiency: 90,
    deliveries: 49,
    errors: 0,
  },
  {
    date: "Sat",
    efficiency: 75,
    deliveries: 38,
    errors: 4,
  },
  {
    date: "Sun",
    efficiency: 72,
    deliveries: 30,
    errors: 1,
  },
];

// Robots data
export const robotsData = [
  {
    id: "R001",
    status: "active" as const,
    batteryLevel: 78,
    position: { x: 3, y: 5, z: 0 },
    payload: {
      packageId: "PKG0012",
      destination: "Shelf A-23",
    },
  },
  {
    id: "R002",
    status: "charging" as const,
    batteryLevel: 23,
    position: { x: 12, y: 2, z: 0 },
    payload: undefined,
  },
  {
    id: "R003",
    status: "idle" as const,
    batteryLevel: 92,
    position: { x: 7, y: 8, z: 0 },
    payload: undefined,
  },
  {
    id: "R004",
    status: "active" as const,
    batteryLevel: 65,
    position: { x: 1, y: 4, z: 0 },
    payload: {
      packageId: "PKG0027",
      destination: "Shelf C-14",
    },
  },
  {
    id: "R005",
    status: "error" as const,
    batteryLevel: 45,
    position: { x: 9, y: 9, z: 0 },
    payload: {
      packageId: "PKG0033",
      destination: "Shelf B-08",
    },
  },
  {
    id: "R006",
    status: "active" as const,
    batteryLevel: 81,
    position: { x: 5, y: 2, z: 0 },
    payload: {
      packageId: "PKG0041",
      destination: "Shelf D-05",
    },
  },
];

// Packages data
export const packagesData = [
  {
    id: "PKG0012",
    destination: "Shelf A-23",
    currentLocation: "Robot R001",
    status: "in_transit" as const,
    priority: "high" as const,
    estimatedArrival: "2 mins",
  },
  {
    id: "PKG0027",
    destination: "Shelf C-14",
    currentLocation: "Robot R004",
    status: "in_transit" as const,
    priority: "medium" as const,
    estimatedArrival: "4 mins",
  },
  {
    id: "PKG0033",
    destination: "Shelf B-08",
    currentLocation: "Robot R005",
    status: "error" as const,
    priority: "high" as const,
    estimatedArrival: undefined,
  },
  {
    id: "PKG0041",
    destination: "Shelf D-05",
    currentLocation: "Robot R006",
    status: "in_transit" as const,
    priority: "low" as const,
    estimatedArrival: "7 mins",
  },
  {
    id: "PKG0018",
    destination: "Shelf A-10",
    currentLocation: "Shelf A-10",
    status: "stored" as const,
    priority: "medium" as const,
    estimatedArrival: undefined,
  },
  {
    id: "PKG0022",
    destination: "Loading Dock",
    currentLocation: "Shelf C-21",
    status: "stored" as const,
    priority: "low" as const,
    estimatedArrival: undefined,
  },
  {
    id: "PKG0009",
    destination: "Delivery Zone",
    currentLocation: "Delivery Zone",
    status: "delivered" as const,
    priority: "high" as const,
    estimatedArrival: undefined,
  },
  {
    id: "PKG0037",
    destination: "Shelf B-14",
    currentLocation: "Shelf B-14",
    status: "stored" as const,
    priority: "medium" as const,
    estimatedArrival: undefined,
  },
];

// Shelf data
export const shelfData = [
  { row: 2, col: 3, height: 1, status: "occupied" as const, packageId: "PKG0018" },
  { row: 2, col: 4, height: 1, status: "vacant" as const },
  { row: 2, col: 5, height: 1, status: "vacant" as const },
  { row: 3, col: 3, height: 1, status: "vacant" as const },
  { row: 3, col: 4, height: 1, status: "occupied" as const, packageId: "PKG0022" },
  { row: 3, col: 5, height: 1, status: "vacant" as const },
  { row: 4, col: 3, height: 1, status: "vacant" as const },
  { row: 4, col: 4, height: 1, status: "reserved" as const, packageId: "PKG0027" },
  { row: 4, col: 5, height: 1, status: "occupied" as const, packageId: "PKG0037" },
  { row: 6, col: 8, height: 1, status: "vacant" as const },
  { row: 6, col: 9, height: 1, status: "vacant" as const },
  { row: 6, col: 10, height: 1, status: "vacant" as const },
  { row: 7, col: 8, height: 1, status: "vacant" as const },
  { row: 7, col: 9, height: 1, status: "reserved" as const, packageId: "PKG0041" },
  { row: 7, col: 10, height: 1, status: "occupied" as const, packageId: "PKG0011" },
  { row: 8, col: 8, height: 1, status: "vacant" as const },
  { row: 8, col: 9, height: 1, status: "vacant" as const },
  { row: 8, col: 10, height: 1, status: "reserved" as const, packageId: "PKG0033" },
];

// Robot positions for map
export const robotPositions = [
  { id: "R001", x: 3, y: 5, status: "active" as const },
  { id: "R002", x: 12, y: 2, status: "charging" as const },
  { id: "R003", x: 7, y: 8, status: "idle" as const },
  { id: "R004", x: 1, y: 4, status: "active" as const },
  { id: "R005", x: 9, y: 9, status: "error" as const },
  { id: "R006", x: 5, y: 2, status: "active" as const },
];

// Notifications data
export const notificationsData = [
  {
    id: "n1",
    title: "Robot R005 Error",
    message: "Robot R005 has encountered an obstacle and cannot proceed with package PKG0033.",
    timestamp: "5 min ago",
    type: "error" as const,
    read: false,
  },
  {
    id: "n2",
    title: "Low Battery Warning",
    message: "Robot R002 battery level is below 25%. Robot is now charging at station 2.",
    timestamp: "12 min ago",
    type: "warning" as const,
    read: false,
  },
  {
    id: "n3",
    title: "Package Delivered",
    message: "Package PKG0009 has been successfully delivered to the Delivery Zone.",
    timestamp: "27 min ago",
    type: "success" as const,
    read: true,
  },
  {
    id: "n4",
    title: "New Package Arrived",
    message: "Package PKG0041 has arrived at loading dock and is waiting for processing.",
    timestamp: "1 hour ago",
    type: "info" as const,
    read: true,
  },
  {
    id: "n5",
    title: "System Update",
    message: "Warehouse system will undergo scheduled maintenance tonight at 2:00 AM.",
    timestamp: "3 hours ago",
    type: "info" as const,
    read: true,
  },
];
