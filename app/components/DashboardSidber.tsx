import { Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

const menuItemsByRole = {
  customer: [],
  owner: [],
  admin: [],
};

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role as string;
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus /> <span className="sr-only">Add Project</span>
        </SidebarGroupAction>
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>

      <SidebarFooter />
    </Sidebar>
  );
}
