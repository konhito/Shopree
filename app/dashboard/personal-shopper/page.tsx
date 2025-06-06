"use client";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function PersonalShopperPage() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Personal Shopper</h1>
        {/* Add Personal Shopper content here */}
      </div>
    </div>
  );
}
