import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package, ShoppingBag, Truck } from "lucide-react";
import { Testimonials } from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import heroImg from "@/public/images/1.png";
import worldMap from "@/public/images/world_map.png";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Sydney, Australia",
    image:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&q=80",
    text: "Finally, I can get all my favorite Indian products delivered right to my doorstep in Australia. The service is fantastic!",
  },
  {
    name: "Rahul Patel",
    location: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
    text: "Been using their service for over a year now. The shipping is reliable and customer support is always helpful.",
  },
  {
    name: "Anjali Desai",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    text: "Amazing service! Makes me feel connected to home through all my favorite Indian products.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                >
                  Trusted by Indians in 50+ countries
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Bringing India Closer —{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    One Parcel at a Time
                  </span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Shop from any Indian store and we'll handle the rest. Your
                  favorite products from home, delivered to your doorstep
                  anywhere in the world.
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
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 scale-[1] rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-20 blur-3xl"></div>
                <Image
                  src={heroImg}
                  alt="Indian delivery service with courier holding package"
                  width={500}
                  className="relative z-10 rounded-lg object-cover ransform -translate-y-20" // Added transform translate"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Shop from your favorite Indian stores without worrying about
                international shipping restrictions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-orange-100 text-center text-sm font-medium text-orange-600">
                1
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  Get a virtual Indian address
                </CardTitle>
                <CardDescription>
                  Sign up and receive your personal Indian shipping address to
                  use on any Indian website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                  <Package className="h-10 w-10 text-orange-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 text-orange-600">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-orange-100 text-center text-sm font-medium text-orange-600">
                2
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  Shop from any Indian store
                </CardTitle>
                <CardDescription>
                  Browse and buy from any Indian website. We'll receive your
                  packages at our facility.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                  <ShoppingBag className="h-10 w-10 text-orange-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 text-orange-600">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-orange-100 text-center text-sm font-medium text-orange-600">
                3
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  We pack & ship it globally
                </CardTitle>
                <CardDescription>
                  We consolidate your packages, repack them efficiently, and
                  ship them to your doorstep.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                  <Truck className="h-10 w-10 text-orange-600" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 text-orange-600">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Indians in 50+ Countries
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connecting the global Indian diaspora with products they love
                from home.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="relative">
              <Image
                src={worldMap}
                alt="World map showing Indian global connections"
                width={1200}
                height={600}
                className="rounded-lg object-cover w-full"
                priority={false}
              />
              <div className="absolute top-[30%] left-[20%] h-3 w-3 animate-ping rounded-full bg-orange-500"></div>
              <div className="absolute top-[25%] left-[80%] h-3 w-3 animate-ping rounded-full bg-orange-500"></div>
              <div className="absolute top-[40%] left-[50%] h-3 w-3 animate-ping rounded-full bg-orange-500"></div>
              <div className="absolute top-[60%] left-[30%] h-3 w-3 animate-ping rounded-full bg-orange-500"></div>
              <div className="absolute top-[70%] left-[85%] h-3 w-3 animate-ping rounded-full bg-orange-500"></div>
              <div className="absolute top-[30%] left-[85%] h-2 w-1 animate-ping rounded-full bg-orange-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to bring India closer?
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start shopping from your favorite Indian stores today.
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
  );
}
