import { Card, CardContent } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "SIGN-UP",
      description: "Sign up easily for a FREE Indian Virtual Address",
    },
    {
      number: "02",
      title: "SHOP",
      description: "Shop from top Indian e-commerce stores & brands",
    },
    {
      number: "03",
      title: "SHIP",
      description: "Ship your consolidated parcel to your global address",
    },
    {
      number: "04",
      title: "RECEIVE",
      description: "Get it at your door within 3-6 days from India",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How does it work?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.number} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-saffron text-white flex items-center justify-center font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-navy-blue">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
