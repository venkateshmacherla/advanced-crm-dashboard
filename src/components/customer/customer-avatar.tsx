import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarColor, getInitials } from "@/lib/avatar-utils";
import { cn } from "@/lib/utils";

interface CustomerAvatarProps {
  name: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export default function CustomerAvatar({
  name,
  size = "default",
  className,
}: CustomerAvatarProps) {
  const { bg, text } = getAvatarColor(name);

  return (
    <Avatar size={size} className={cn("ring-1 ring-slate-800", className)}>
      <AvatarFallback className={cn(bg, text, "font-semibold")}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
