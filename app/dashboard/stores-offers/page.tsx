"use client";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function StoresOffersPage() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Stores Offers</h1>
        {/* Add Stores Offers content here */}
      </div>
    </div>
  );
}
