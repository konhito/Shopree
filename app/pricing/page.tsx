"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Star,
  Flag,
  Package,
  Calculator,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [currency, setCurrency] = useState("inr");
  const [showVolumetric, setShowVolumetric] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  type ShippingEstimate = {
    cost: string;
    deliveryTime: string;
    carrier: string;
  };

  const [shippingEstimate, setShippingEstimate] =
    useState<ShippingEstimate | null>(null);
  const [calculatorData, setCalculatorData] = useState({
    country: "US",
    weight: "0.5",
    unit: "cm",
    length: "",
    width: "",
    height: "",
  });

  // Add shipping calculation function
  const calculateShipping = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const baseRate = currency === "inr" ? 1500 : 20;
      const weight = parseFloat(calculatorData.weight);
      let volumetricWeight = 0;

      if (showVolumetric) {
        volumetricWeight =
          (parseFloat(calculatorData.length || "0") *
            parseFloat(calculatorData.width || "0") *
            parseFloat(calculatorData.height || "0")) /
          5000;
      }

      const chargeableWeight = Math.max(weight, volumetricWeight);
      const estimate = Math.round(chargeableWeight * baseRate);

      setShippingEstimate({
        cost: currency === "inr" ? `₹${estimate}` : `$${estimate}`,
        deliveryTime: "3-5 business days",
        carrier: "Express Delivery",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const pricingPlans = {
    inr: [
      {
        name: "Simple",
        price: "₹999",
        description: "Perfect for occasional shoppers",
        features: [
          "Indian virtual address",
          "30-day free storage",
          "Basic consolidation",
          "Email support",
          "Standard shipping options",
        ],
        popular: false,
      },
      {
        name: "Pro",
        price: "₹1,999",
        description: "Ideal for regular shoppers",
        features: [
          "Everything in Simple",
          "60-day free storage",
          "Advanced consolidation",
          "Priority support",
          "Discounted shipping rates",
          "Personal shopper (2 free requests)",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "₹3,999",
        description: "For business & frequent shoppers",
        features: [
          "Everything in Pro",
          "90-day free storage",
          "Premium consolidation",
          "24/7 dedicated support",
          "Exclusive shipping rates",
          "Personal shopper (unlimited)",
          "Express shipping priority",
        ],
        popular: false,
      },
    ],
    usd: [
      {
        name: "Simple",
        price: "$14.99",
        description: "Perfect for occasional shoppers",
        features: [
          "Indian virtual address",
          "30-day free storage",
          "Basic consolidation",
          "Email support",
          "Standard shipping options",
        ],
        popular: false,
      },
      {
        name: "Pro",
        price: "$29.99",
        description: "Ideal for regular shoppers",
        features: [
          "Everything in Simple",
          "60-day free storage",
          "Advanced consolidation",
          "Priority support",
          "Discounted shipping rates",
          "Personal shopper (2 free requests)",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "$59.99",
        description: "For business & frequent shoppers",
        features: [
          "Everything in Pro",
          "90-day free storage",
          "Premium consolidation",
          "24/7 dedicated support",
          "Exclusive shipping rates",
          "Personal shopper (unlimited)",
          "Express shipping priority",
        ],
        popular: false,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for your shipping needs from
                India
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Estimate Your International Shipping Costs
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get a quick shipping quote – Use the tool below to find out how
                much your international shipment might cost. Simply enter the
                country, package weight, and dimensions.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={calculateShipping}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Destination Country
                      </label>
                      <select
                        className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={calculatorData.country}
                        onChange={(e) =>
                          setCalculatorData({
                            ...calculatorData,
                            country: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Country</option>
                        <option value="IND">India</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="UAE">UAE</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Package Weight (kg)
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        placeholder="Enter weight"
                        className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={calculatorData.weight}
                        onChange={(e) =>
                          setCalculatorData({
                            ...calculatorData,
                            weight: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Length (cm)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Length"
                        className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={calculatorData.length}
                        onChange={(e) =>
                          setCalculatorData({
                            ...calculatorData,
                            length: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Width (cm)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Width"
                        className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={calculatorData.width}
                        onChange={(e) =>
                          setCalculatorData({
                            ...calculatorData,
                            width: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Height"
                        className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={calculatorData.height}
                        onChange={(e) =>
                          setCalculatorData({
                            ...calculatorData,
                            height: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    size="lg"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      "Calculate Shipping Cost"
                    )}
                  </Button>

                  {isCalculating && !shippingEstimate && (
                    <div className="mt-6 p-6 bg-white rounded-lg border border-orange-100">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                        <p className="text-sm text-gray-600">
                          Calculating your shipping cost...
                        </p>
                      </div>
                    </div>
                  )}

                  {!isCalculating && shippingEstimate && (
                    <div className="mt-6 p-6 bg-white rounded-lg border border-orange-100">
                      <h3 className="text-2xl font-bold text-center mb-4">
                        {shippingEstimate.cost}
                      </h3>
                      <div className="grid gap-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Carrier:</span>
                          <span className="font-medium">
                            {shippingEstimate.carrier}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Time:</span>
                          <span className="font-medium">
                            {shippingEstimate.deliveryTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <p className="text-center text-sm text-gray-600">
                      Note: This is an estimated cost. Final shipping costs may
                      vary based on actual weight, dimensions, and destination.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Country Resources Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Top Country Guides */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Flag className="h-5 w-5 text-orange-500" />
                  <CardTitle>Top Country Guides</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Detailed shipping guides for our most popular destinations
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-orange-600">
                  View Guides <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Shipping Resources */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  <CardTitle>Shipping Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Everything you need to know about international shipping
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-orange-600">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Volumetric Calculator */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-orange-500" />
                  <CardTitle>Weight Calculator</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Calculate volumetric weight for accurate shipping costs
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-orange-600">
                  Calculate Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Restricted Items */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <CardTitle>Restricted Items</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Check what items are restricted or prohibited for shipping
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-orange-600">
                  View List <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Medicine Shipping Rules */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
                📦 Shipping Medicines? Read This First
              </h2>
              <p className="text-gray-500">
                Important guidelines for shipping medicines internationally
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Prescription Requirements
                </AccordionTrigger>
                <AccordionContent>
                  All medicine shipments require valid prescriptions from
                  licensed medical practitioners. Prescriptions must be in
                  English or accompanied by certified translations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Packaging Guidelines
                </AccordionTrigger>
                <AccordionContent>
                  Medicines must be in original packaging with clear labels
                  showing contents, dosage, and manufacturer details.
                  Temperature-sensitive medications require special handling.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Customs Documentation
                </AccordionTrigger>
                <AccordionContent>
                  Additional documentation including medical certificates and
                  import permits may be required depending on destination
                  country regulations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Restricted Medications
                </AccordionTrigger>
                <AccordionContent>
                  Certain medications may be restricted or prohibited in
                  specific countries. Check destination country regulations
                  before shipping.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <Tabs
            defaultValue="inr"
            className="w-full"
            onValueChange={setCurrency}
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-64 grid-cols-2">
                <TabsTrigger value="inr" className="text-base">
                  ₹ INR
                </TabsTrigger>
                <TabsTrigger value="usd" className="text-base">
                  $ USD
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="inr" className="mt-0">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.inr.map((plan, index) => (
                  <PricingCard key={index} plan={plan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="usd" className="mt-0">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.usd.map((plan, index) => (
                  <PricingCard key={index} plan={plan} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Plan Comparison
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Compare our plans to find the perfect fit for your needs
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead>Simple</TableHead>
                  <TableHead>Pro</TableHead>
                  <TableHead>Premium</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Indian Virtual Address
                  </TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-500" />
                  </TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-500" />
                  </TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-500" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Free Storage Period
                  </TableCell>
                  <TableCell>30 days</TableCell>
                  <TableCell>60 days</TableCell>
                  <TableCell>90 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Package Consolidation
                  </TableCell>
                  <TableCell>Basic</TableCell>
                  <TableCell>Advanced</TableCell>
                  <TableCell>Premium</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Customer Support
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>24/7 Dedicated</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Shipping Rates</TableCell>
                  <TableCell>Standard</TableCell>
                  <TableCell>Discounted</TableCell>
                  <TableCell>Exclusive</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Personal Shopper
                  </TableCell>
                  <TableCell>Pay per request</TableCell>
                  <TableCell>2 free requests</TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Express Shipping Priority
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-500" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Customs Assistance
                  </TableCell>
                  <TableCell>Basic</TableCell>
                  <TableCell>Advanced</TableCell>
                  <TableCell>Premium</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Shipping Rates */}

      {/* Shipping Calculator Section */}

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="max-w-[700px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and start shopping from your favorite Indian
                stores.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-white text-orange-500 hover:bg-white/90"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-orange-500 border-white hover:bg-white/20"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
};

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${
        plan.popular ? "border-orange-500 shadow-lg relative" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
          POPULAR
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-6">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground ml-2">/year</span>
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-orange-500 mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${
            plan.popular
              ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              : ""
          }`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
