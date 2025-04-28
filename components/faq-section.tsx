"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How does package forwarding work?",
      answer:
        "When you sign up with IndiBridge, you get a free Indian shipping address. You can use this address to shop from any Indian website. Once your packages arrive at our facility, we'll notify you. You can then request to ship them to your international address. We'll consolidate multiple packages to save on shipping costs and send them to you.",
    },
    {
      question: "How much can I save on shipping costs?",
      answer:
        "By using our package consolidation service, you can save up to 60% on international shipping costs. We combine multiple packages into one shipment, reducing the dimensional weight and shipping fees. We also remove unnecessary packaging to further reduce the weight.",
    },
    {
      question: "Which countries do you ship to?",
      answer:
        "We ship to over 50 countries worldwide, including the United States, United Kingdom, Canada, Australia, UAE, Singapore, and many more. If you're unsure about shipping to your country, please contact our customer support.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary depending on your location and the shipping method you choose. Typically, packages arrive within 3-6 business days for express shipping and 7-14 business days for standard shipping. You can track your package in real-time through our online portal.",
    },
    {
      question: "What is the Personal Shopper service?",
      answer:
        "Our Personal Shopper service helps you purchase products from Indian websites that don't accept international payments or don't ship to our facility. Simply share the product details with us, and our team will purchase it on your behalf. We charge a nominal fee of 7% of the product value for this service.",
    },
    {
      question: "Are there any customs duties or taxes?",
      answer:
        "Customs duties and taxes are determined by the customs authority of your destination country and are not included in our shipping rates. You'll be responsible for paying any applicable duties or taxes when your package arrives in your country. We provide all necessary documentation to help with customs clearance.",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-50 to-pink-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our services
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
