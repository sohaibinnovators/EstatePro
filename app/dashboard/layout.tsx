import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | EstatePro Dashboard",
  },
  description:
    "Manage your EstatePro demo listings, favorites, inquiries, and profile locally in this browser.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
