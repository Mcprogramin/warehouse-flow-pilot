import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Settings, 
  HelpCircle,
  Package2,
  Bot
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface AppSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function AppSidebar({ isCollapsed, toggleSidebar }: AppSidebarProps) {
  const navItems = [
    {
      title: "Home",
      path: "/",
      icon: LayoutDashboard,
      description: "Overview dashboard"
    },
    {
      title: "Robots",
      path: "/robots",
      icon: Settings,
      description: "Control robots"
    },
    {
      title: "Help",
      path: "/help",
      icon: HelpCircle,
      description: "Documentation & support"
    }
  ];

  return (
    <Sidebar className={`bg-sidebar ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 hidden md:block`}>
      <SidebarHeader className="flex items-center justify-center px-4 py-6">
        {!isCollapsed && (
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Package2 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Warehouse</span>
          </NavLink>
        )}
        {isCollapsed && (
          <NavLink to="/">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Package2 className="h-5 w-5 text-primary" />
            </div>
          </NavLink>
        )}
      </SidebarHeader>
      <SidebarSeparator className="my-4" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => `flex items-center px-4 py-3 ${isActive ? 'text-primary bg-primary/10' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <div className="flex flex-col ml-3">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      )}
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
