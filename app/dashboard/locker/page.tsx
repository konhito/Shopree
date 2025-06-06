"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Package } from "lucide-react";

export default function LockerPage() {
  // Placeholder data - replace with actual data fetching
  const lockerId = "SF-23D10-429847";
  const packageSummary = {
    readyToSend: 0,
    inReview: 0,
    actionRequired: 0,
    all: 0,
    noOfPackages: 0,
    noOfItems: 0,
    totalValue: "$0.00",
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold">My Locker</h1>
        <p className="text-muted-foreground text-sm mb-8">Home / My Locker</p>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              Packages in Locker: {lockerId}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              No. of Packages: {packageSummary.noOfPackages} <br />
              No. of Items: {packageSummary.noOfItems} <br />
              Total Value: {packageSummary.totalValue}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="readyToSend">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="readyToSend">
                  Ready to Send ({packageSummary.readyToSend})
                </TabsTrigger>
                <TabsTrigger value="inReview">
                  In Review ({packageSummary.inReview})
                </TabsTrigger>
                <TabsTrigger value="actionRequired">
                  Action Required ({packageSummary.actionRequired})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All ({packageSummary.all})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="readyToSend" className="text-center py-12">
                <Package className="mx-auto h-24 w-24 text-muted" />
                <p className="mt-4 text-muted-foreground">No Package</p>
              </TabsContent>
              <TabsContent value="inReview" className="text-center py-12">
                <Package className="mx-auto h-24 w-24 text-muted" />
                <p className="mt-4 text-muted-foreground">No Package</p>
              </TabsContent>
              <TabsContent value="actionRequired" className="text-center py-12">
                <Package className="mx-auto h-24 w-24 text-muted" />
                <p className="mt-4 text-muted-foreground">No Package</p>
              </TabsContent>
              <TabsContent value="all" className="text-center py-12">
                <Package className="mx-auto h-24 w-24 text-muted" />
                <p className="mt-4 text-muted-foreground">No Package</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
