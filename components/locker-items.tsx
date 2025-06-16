"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Clock, CheckCircle2 } from "lucide-react";

interface LockerItem {
  id: string;
  name: string;
  image: string;
  itemIsReady: boolean;
  itemReceivedData: string | null;
}

export default function LockerItems() {
  const [items, setItems] = useState<LockerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLockerItems = async () => {
      try {
        const response = await fetch("/api/user/locker/items");
        if (!response.ok) {
          throw new Error("Failed to fetch locker items");
        }

        const data = await response.json();
        setItems(data.items);
      } catch (err) {
        setError("Failed to load locker items");
        console.error("Error fetching locker items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLockerItems();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-muted-foreground animate-pulse" />
        <p className="mt-4 text-muted-foreground">Loading items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">No items in your locker</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              {item.itemIsReady ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <Clock className="h-6 w-6 text-yellow-500" />
              )}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {item.itemIsReady ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Ready for pickup</span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>Processing</span>
                </>
              )}
            </div>
            {item.itemReceivedData && (
              <p className="text-sm text-muted-foreground mt-2">
                Received: {new Date(item.itemReceivedData).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
