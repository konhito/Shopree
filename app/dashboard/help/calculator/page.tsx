"use client";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function ShippingCalculatorPage() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Shipping Calculator</h1>
        {/* Add Shipping Calculator content here */}
      </div>
    </div>
  );
}
