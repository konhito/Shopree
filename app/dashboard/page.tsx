"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Package,
  Truck,
  History,
  Plus,
  Wallet,
  Lock,
  Copy,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import Image from "next/image";

export default function DashboardPage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  // Placeholder data for Shoppre Address (replace with actual data fetching)
  const shoppreAddress = {
    name: "Aditya",
    address1:
      "IndianShoppre Pvt Ltd, SF-23D10-429847, #218/190, Outer Ring Road",
    address2: "Agara, Sector 1, H.S.R. Layout,",
    landmark: "Near Hindustan Furnishing & Furniture",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560102",
  };

  const handleCopyAddress = () => {
    const fullAddress = `${shoppreAddress.name}\n${shoppreAddress.address1}\n${shoppreAddress.address2}\n${shoppreAddress.landmark}\n${shoppreAddress.city}, ${shoppreAddress.state} ${shoppreAddress.pincode}`;
    navigator.clipboard.writeText(fullAddress);
    // Optionally show a toast notification
    alert("Address copied to clipboard!");
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
            <Plus className="mr-2 h-4 w-4" /> New Shipment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Locker Number
                  </CardTitle>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">SF-23D10-429847</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Shoppre Wallet
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹ 0</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Locker</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0 Packages</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Shipments
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0 Packages</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Delivered
                  </CardTitle>
                  <History className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0 Packages</div>
                </CardContent>
              </Card>
            </div>

            <div className="relative w-full h-60 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <h2 className="text-3xl font-bold mb-2">
                  Make your 1st best purchase with a
                </h2>
                <p className="text-6xl font-bold mb-4">FLAT Rs. 200 OFF!</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3 rounded-full">
                  HELLO200
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Track Your Parcel</CardTitle>
                <CardDescription>
                  Enter your tracking number to check your shipment status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Shipments</TabsTrigger>
                <TabsTrigger value="history">Shipping History</TabsTrigger>
                <TabsTrigger value="addresses">My Addresses</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Shipment #12345
                      </CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">In Transit</div>
                      <p className="text-xs text-muted-foreground">
                        From: Mumbai, India
                        <br />
                        To: New York, USA
                      </p>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="h-4 w-4" />
                          <span>Estimated Delivery: 5-7 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Shipment #12344
                      </CardTitle>
                      <History className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Delivered</div>
                      <p className="text-xs text-muted-foreground">
                        From: Delhi, India
                        <br />
                        To: London, UK
                      </p>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="h-4 w-4" />
                          <span>Delivered on: March 15, 2024</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Home Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        123 Main Street
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
                      <Button variant="ghost" className="h-full w-full">
                        <Plus className="h-8 w-8 mb-2" />
                        <span>Add New Address</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">
                  Your Shoppre Provided Address
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleCopyAddress}>
                  <Copy className="h-4 w-4 mr-2" /> Copy Full Address
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={shoppreAddress.name}
                    readOnly
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input
                    id="address1"
                    value={shoppreAddress.address1}
                    readOnly
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    value={shoppreAddress.address2}
                    readOnly
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    value={shoppreAddress.landmark}
                    readOnly
                    className="text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shoppreAddress.city}
                      readOnly
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      value={shoppreAddress.state}
                      readOnly
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={shoppreAddress.pincode}
                    readOnly
                    className="text-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
