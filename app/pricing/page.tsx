"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PricingPage() {
  const [currency, setCurrency] = useState("inr")

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
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for your shipping needs from India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="inr" className="w-full" onValueChange={setCurrency}>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Plan Comparison</h2>
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
                  <TableCell className="font-medium">Indian Virtual Address</TableCell>
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
                  <TableCell className="font-medium">Free Storage Period</TableCell>
                  <TableCell>30 days</TableCell>
                  <TableCell>60 days</TableCell>
                  <TableCell>90 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Package Consolidation</TableCell>
                  <TableCell>Basic</TableCell>
                  <TableCell>Advanced</TableCell>
                  <TableCell>Premium</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Customer Support</TableCell>
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
                  <TableCell className="font-medium">Personal Shopper</TableCell>
                  <TableCell>Pay per request</TableCell>
                  <TableCell>2 free requests</TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Express Shipping Priority</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-500" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Customs Assistance</TableCell>
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
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Shipping Rates</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transparent shipping rates to popular destinations
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Destination</TableHead>
                  <TableHead>0.5 kg</TableHead>
                  <TableHead>1 kg</TableHead>
                  <TableHead>2 kg</TableHead>
                  <TableHead>5 kg</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">United States</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,499" : "$19.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,999" : "$24.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹2,999" : "$39.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹5,999" : "$79.99"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">United Kingdom</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,399" : "$18.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,899" : "$23.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹2,799" : "$36.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹5,499" : "$72.99"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Canada</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,599" : "$20.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹2,099" : "$27.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹3,199" : "$42.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹6,299" : "$83.99"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Australia</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,699" : "$22.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹2,299" : "$29.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹3,499" : "$45.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹6,799" : "$89.99"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">UAE</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,299" : "$16.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹1,799" : "$22.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹2,599" : "$33.99"}</TableCell>
                  <TableCell>{currency === "inr" ? "₹4,999" : "$65.99"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to get started?</h2>
              <p className="max-w-[700px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and start shopping from your favorite Indian stores.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-white/90">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PricingCard({ plan }) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${plan.popular ? "border-orange-500 shadow-lg relative" : ""}`}
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
          className={`w-full ${plan.popular ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600" : ""}`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  )
}
