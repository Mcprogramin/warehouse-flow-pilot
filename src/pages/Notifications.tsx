
import { useState } from "react";
import Dashboard from "@/components/layout/Dashboard";
import NotificationFeed from "@/components/dashboard/NotificationFeed";
import { notificationsData } from "@/data/mockData";

const Notifications = () => {
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
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <div className="max-w-2xl">
          <NotificationFeed
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Notifications;
