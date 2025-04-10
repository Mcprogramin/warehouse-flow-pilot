
import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Settings, 
  HelpCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface AppSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function AppSidebar({ isCollapsed, toggleSidebar }: AppSidebarProps) {
  const navItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      title: "Help",
      path: "/help",
      icon: HelpCircle,
    }
  ];

  return (
    <Sidebar className={`bg-sidebar ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 hidden md:block`}>
      <SidebarHeader className="flex items-center justify-center px-4 py-4">
        {!isCollapsed && (
          <div className="flex items-center">
            <span className="ml-2 text-lg font-semibold text-sidebar-foreground">Warehouse</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => `flex items-center ${isActive ? 'text-primary' : 'text-sidebar-foreground'}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
