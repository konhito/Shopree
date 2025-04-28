import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Services() {
  const services = [
    {
      title: "Shop & Ship",
      description: "Shop from any Indian store and we'll ship it to your doorstep worldwide.",
      icon: "/images/shop-ship-icon.png",
      link: "/services#shop-ship",
    },
    {
      title: "Assisted Purchase",
      description: "Facing problems while shopping from Indian sites? Our Personal Shopper will help you.",
      icon: "/images/assisted-purchase-icon.png",
      link: "/services#assisted-purchase",
    },
    {
      title: "Package Consolidation",
      description: "Save up to 80% on shipping by combining multiple packages into one.",
      icon: "/images/consolidation-icon.png",
      link: "/services#consolidation",
    },
    {
      title: "Indian Virtual Address",
      description: "Get a free Indian shipping address to shop from any Indian store.",
      icon: "/images/virtual-address-icon.png",
      link: "/services#virtual-address",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          We offer comprehensive solutions to help you shop from India and get your packages delivered anywhere in the
          world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-2 border-gray-100 hover:border-saffron/50 transition-all">
              <CardHeader className="pb-2">
                <div className="w-16 h-16 mb-4">
                  <Image src={service.icon || "/placeholder.svg"} alt={service.title} width={64} height={64} />
                </div>
                <CardTitle className="text-xl text-navy-blue">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="link" asChild className="p-0 text-saffron">
                  <Link href={service.link}>Learn more →</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
