// src/pages/dashboard/Layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/core/app-sidebar";
import { Outlet } from "react-router-dom";
import ProfileAvatar from "@/components/core/ProfileAvatar";
import DynamicBreadcrumb from "@/components/core/DynamicBreadcrumb";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4">
        <div className="flex items-center justify-between bg-sidebar border border-sidebar-border shadow-sm mt-2 rounded-lg px-4 py-1">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <DynamicBreadcrumb />
          </div>
          <ProfileAvatar />
        </div>
        <div className="p-4 mt-6 bg-sidebar border border-sidebar-border shadow-sm rounded-lg min-h-[89vh]">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
