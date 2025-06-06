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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewShipmentPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Shipment</CardTitle>
            <CardDescription>
              Fill in the details to create a new shipment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup address" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai Warehouse</SelectItem>
                      <SelectItem value="delhi">Delhi Warehouse</SelectItem>
                      <SelectItem value="bangalore">
                        Bangalore Warehouse
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery address" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Address</SelectItem>
                      <SelectItem value="office">Office Address</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packageDetails">Package Details</Label>
                  <Textarea
                    id="packageDetails"
                    placeholder="Enter package details (dimensions, weight, etc.)"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    placeholder="Any special handling instructions"
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingMethod">Shipping Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="express">
                        Express (3-5 days)
                      </SelectItem>
                      <SelectItem value="standard">
                        Standard (5-7 days)
                      </SelectItem>
                      <SelectItem value="economy">
                        Economy (7-10 days)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance coverage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Coverage</SelectItem>
                      <SelectItem value="standard">
                        Standard Coverage
                      </SelectItem>
                      <SelectItem value="premium">Premium Coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="declaredValue">Declared Value</Label>
                  <Input
                    id="declaredValue"
                    type="number"
                    placeholder="Enter the declared value of your shipment"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    onClick={() => setStep(3)}
                  >
                    Review & Submit
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Shipment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Pickup Address:
                      </span>
                      <span>Mumbai Warehouse</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery Address:
                      </span>
                      <span>Home Address</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Shipping Method:
                      </span>
                      <span>Express (3-5 days)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Insurance:</span>
                      <span>Standard Coverage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Declared Value:
                      </span>
                      <span>$500</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total Cost:</span>
                      <span>$75.00</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    Create Shipment
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
