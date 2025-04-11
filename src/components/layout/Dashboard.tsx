
import { ReactNode, useState, useEffect } from "react";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        
        {/* Mobile sidebar overlay */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div 
              className="w-64 h-full bg-sidebar p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-sidebar-foreground">Warehouse</span>
              </div>
              <nav>
                <ul className="space-y-2">
                  {[
                    { title: "Dashboard", path: "/", icon: "LayoutDashboard" },
                    { title: "Settings", path: "/settings", icon: "Settings" },
                    { title: "Help", path: "/help", icon: "HelpCircle" }
                  ].map((item) => (
                    <li key={item.path}>
                      <a 
                        href={item.path}
                        className="flex items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
                      >
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-auto p-2 sm:p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
