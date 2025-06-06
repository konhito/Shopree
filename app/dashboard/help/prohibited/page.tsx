"use client";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProhibitedItemsPage() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Prohibited Items</h1>
        {/* Add Prohibited Items content here */}
      </div>
    </div>
  );
}
