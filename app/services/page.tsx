import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Package, Truck, Shield, Clock, CreditCard } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | IndiBridge",
  description: "Explore our range of services designed to bring India closer to you, no matter where you are.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comprehensive solutions to bring your favorite Indian products to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              icon={<ShoppingBag className="h-10 w-10 text-orange-600" />}
              title="Personal Shopper"
              description="Don't have time to browse? Our team will shop for you based on your requirements from any Indian store."
              features={[
                "Personalized shopping assistance",
                "Product recommendations",
                "Price negotiation when possible",
                "Quality checks before shipping",
              ]}
              gradient="from-orange-500 to-pink-500"
            />

            <ServiceCard
              icon={<Package className="h-10 w-10 text-purple-600" />}
              title="Package Consolidation"
              description="Save on shipping costs by combining multiple packages into one shipment."
              features={[
                "Combine packages from different stores",
                "Remove unnecessary packaging",
                "Optimize package dimensions",
                "Save up to 60% on shipping costs",
              ]}
              gradient="from-purple-500 to-blue-500"
            />

            <ServiceCard
              icon={<Clock className="h-10 w-10 text-blue-600" />}
              title="Storage Facility"
              description="We'll store your packages for up to 30 days free of charge while you decide what to do with them."
              features={[
                "30-day free storage",
                "Secure warehouse facility",
                "Real-time inventory tracking",
                "Package photos upon request",
              ]}
              gradient="from-blue-500 to-teal-500"
            />

            <ServiceCard
              icon={<Shield className="h-10 w-10 text-teal-600" />}
              title="Customs Assistance"
              description="Navigate complex customs regulations with our expert guidance and documentation support."
              features={[
                "Customs documentation preparation",
                "Duty and tax estimation",
                "Customs clearance assistance",
                "Compliance with international regulations",
              ]}
              gradient="from-teal-500 to-green-500"
            />

            <ServiceCard
              icon={<Truck className="h-10 w-10 text-green-600" />}
              title="Express Shipping"
              description="Need your packages urgently? Choose our express shipping option for faster delivery."
              features={["3-5 business days delivery", "Priority handling", "Real-time tracking", "Insurance included"]}
              gradient="from-green-500 to-yellow-500"
            />

            <ServiceCard
              icon={<CreditCard className="h-10 w-10 text-yellow-600" />}
              title="Payment Assistance"
              description="We'll help you pay for your purchases if the Indian store doesn't accept international payments."
              features={[
                "Secure payment processing",
                "Multiple currency support",
                "Transparent fee structure",
                "Purchase verification",
              ]}
              gradient="from-yellow-500 to-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Process</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've streamlined the process to make international shopping from India as easy as possible.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="relative">
              <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-orange-500 to-pink-500"></div>
              <ProcessStep
                number="01"
                title="Sign Up"
                description="Create an account and get your personal Indian shipping address."
                isLeft={true}
              />
              <ProcessStep
                number="02"
                title="Shop"
                description="Use your Indian address when shopping on Indian websites."
                isLeft={false}
              />
              <ProcessStep
                number="03"
                title="Receive & Process"
                description="We receive your packages and notify you. You can request consolidation or other services."
                isLeft={true}
              />
              <ProcessStep
                number="04"
                title="Ship"
                description="We ship your packages to your international address."
                isLeft={false}
              />
              <ProcessStep
                number="05"
                title="Delivery"
                description="Receive your favorite Indian products at your doorstep."
                isLeft={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to get started?</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and start shopping from your favorite Indian stores.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ icon, title, description, features, gradient }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="mb-2">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${gradient} bg-clip-padding p-[2px]`}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">{icon}</div>
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4 text-orange-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProcessStep({ number, title, description, isLeft }) {
  return (
    <div className="relative mb-8 flex items-center">
      <div
        className={`absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white`}
      >
        {number}
      </div>
      <div
        className={`relative ml-auto mr-auto w-5/12 rounded-lg bg-white p-6 shadow-lg ${
          isLeft ? "mr-auto text-right" : "ml-auto"
        }`}
      >
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  )
}
