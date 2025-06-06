"use client";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function CouponsPage() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Coupons Available</h1>
        {/* Add Coupons Available content here */}
      </div>
    </div>
  );
}
