import { Badge } from "@/components/ui/badge";
import { CustomerStatus } from "@/types/customer";

interface CustomerStatusBadgeProps {
  status: CustomerStatus;
}

export default function CustomerStatusBadge({
  status,
}: CustomerStatusBadgeProps) {
  const isActive = status === "Active";

  return (
    <Badge
      className={
        isActive
          ? "cursor-default border-green-600 bg-green-500/10 text-green-500 hover:bg-green-500/20"
          : "cursor-default border-red-600 bg-red-500/10 text-red-500 hover:bg-red-500/20"
      }
    >
      {status}
    </Badge>
  );
}
