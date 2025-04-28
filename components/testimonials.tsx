"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Rajiv Mehta",
      location: "New York, USA",
      image: "/images/testimonial-1.png",
      rating: 5,
      text: "IndiBridge has been a game-changer for me! Living in New York, I missed authentic Indian products. Now I can shop from any Indian store and get everything delivered to my doorstep. The consolidation service saves me a lot on shipping costs.",
    },
    {
      name: "Priya Sharma",
      location: "London, UK",
      image: "/images/testimonial-2.png",
      rating: 5,
      text: "I've been using IndiBridge for over 2 years now to shop Indian clothing and jewelry. Their personal shopper service is excellent - they helped me purchase items from stores that don't accept international payments. Highly recommended!",
    },
    {
      name: "Anand Patel",
      location: "Sydney, Australia",
      image: "/images/testimonial-3.png",
      rating: 4,
      text: "The virtual Indian address service is brilliant! I can now shop from any Indian website without worrying about shipping restrictions. The package consolidation saved me nearly 70% on shipping costs for my last order.",
    },
    {
      name: "Meera Krishnan",
      location: "Toronto, Canada",
      image: "/images/testimonial-4.png",
      rating: 5,
      text: "As an Indian living abroad, I always struggled to get authentic Indian products. IndiBridge solved this problem completely! Their customer service is exceptional, and they always keep me updated about my shipments.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Trusted by thousands of Indians worldwide
            </p>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="overflow-hidden border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-orange-100">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < testimonial.rating ? "fill-orange-500 text-orange-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mb-4 italic text-gray-600">"{testimonial.text}"</p>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
