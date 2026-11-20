import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Properties",
  description:
    "Compare up to three EstatePro listings side by side — price, location, size, amenities, and more.",
  robots: { index: false, follow: true },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
