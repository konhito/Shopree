"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import DashboardSidebar from "@/components/DashboardSidebar";

interface ShipmentItem {
  title: string;
  img: string;
  quantity: number;
  price: number;
  description: string;
}

interface Locker {
  lockerNumber: string;
  items: ShipmentItem[];
  status: "pending" | "processing" | "shipped" | "delivered";
  totalValue: number;
  createdAt: string;
}

export default function LockerPage() {
  const params = useParams();
  const router = useRouter();
  const [locker, setLocker] = useState<Locker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocker = async () => {
      try {
        const response = await fetch(`/api/locker/${params.lockerNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch locker details");
        }
        const data = await response.json();
        setLocker(data);
      } catch (error) {
        toast.error("Failed to load locker details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocker();
  }, [params.lockerNumber]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 container mx-auto py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!locker) {
    return (
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 container mx-auto py-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Locker not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Locker {locker.lockerNumber}</CardTitle>
              <Badge className={`${getStatusColor(locker.status)} text-white`}>
                {locker.status.charAt(0).toUpperCase() + locker.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created At</p>
                <p>{new Date(locker.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Value</p>
                <p>₹{locker.totalValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locker.items.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="relative w-full h-48">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p>{item.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Price</p>
                        <p>₹{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
