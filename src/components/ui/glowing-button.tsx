import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlowingButtonProps extends ButtonProps {
  glowColor?: string;
  hoverGlowColor?: string;
}

export function GlowingButton({
  className,
  glowColor = "rgba(59, 130, 246, 0.5)",
  hoverGlowColor = "rgba(59, 130, 246, 0.8)",
  ...props
}: GlowingButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]",
        "active:scale-95",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent",
        "after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000 after:delay-200",
        className
      )}
      style={{
        boxShadow: `0 0 10px ${glowColor}`,
        transition: "all 0.3s ease-in-out",
      }}
      {...props}
    />
  );
} 