import { TabsTrigger, TabsTriggerProps } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface GlowingTabTriggerProps extends Omit<TabsTriggerProps, 'children'> {
  glowColor?: string;
  hoverGlowColor?: string;
  children?: React.ReactNode;
}

export function GlowingTabTrigger({
  className,
  glowColor = "rgba(59, 130, 246, 0.3)",
  hoverGlowColor = "rgba(59, 130, 246, 0.5)",
  children,
  ...props
}: GlowingTabTriggerProps) {
  return (
    <TabsTrigger
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "data-[state=active]:scale-105 data-[state=active]:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        "hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent",
        "after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000 after:delay-200",
        className
      )}
      style={{
        boxShadow: `0 0 8px ${glowColor}`,
        transition: "all 0.3s ease-in-out",
      }}
      {...props}
    >
      {children}
    </TabsTrigger>
  );
} 