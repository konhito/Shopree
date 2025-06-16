"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { X } from "lucide-react";

export default function ProhibitedItemsPage() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 container mx-auto py-8 px-4">
        {/* New Banner Section based on the second image */}
        <div className="relative w-full bg-yellow-100 flex items-center justify-between rounded-lg p-8 mb-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Prohibited Items: What We Cannot Ship <br /> Internationally from
              India
            </h1>
            <p className="text-lg text-orange-600 font-semibold">
              Shoppre International Shipping Service
            </p>
          </div>
          {/* Placeholder for the "EXPORT PROHIBITED" circle */}
          <div className="hidden md:flex items-center justify-center w-32 h-32 bg-pink-500 rounded-full text-white text-center font-bold text-lg p-4 shrink-0">
            EXPORT <br /> PROHIBITED
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary inline-block px-4">
            WHAT WE CANNOT SEND
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>{" "}
          {/* Separator line */}
        </div>

        {/* Prohibited Items List - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Category: Items Under Export/Import Control */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Items Under
                Export/Import Control
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                <li>
                  Goods that are subject to export restrictions imposed by
                  Indian authorities.
                </li>
                <li>
                  Items that face import restrictions in transit or destination
                  countries.
                </li>
              </ul>
            </div>

            {/* Category: Adult Material */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Adult
                Material
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                <li>Pornography</li>
                <li>Sexual Wellness products (condom, lube, spray etc)</li>
                <li>Sex Toys</li>
                <li>Any Sexual wellness medicines/supplements</li>
              </ul>
            </div>

            {/* Category: Agriculture Products */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Agriculture
                Products (Eg. Ginger,garlic paste or whole)
              </h3>
              {/* The image doesn't show sub-items for this category, keeping it as a title */}
            </div>

            {/* Category: Currency */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Currency
              </h3>
              {/* The image doesn't show sub-items for this category, keeping it as a title */}
            </div>

            {/* Category: Liquids, Powder, Chemicals */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Liquids,
                Powder, Chemicals
              </h3>
              {/* The image doesn't show sub-items for this category, keeping it as a title */}
            </div>

            {/* Category: Weapons */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Weapons
              </h3>
              {/* The image doesn't show sub-items for this category, keeping it as a title */}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Category: Electronics and Gadgets */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Electronics
                and Gadgets
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                <li>Drone cameras, Hoverboards</li>
                <li>DSLR cameras (can ship without lenses)</li>
                <li>Laptop/desktops/monitors</li>
                <li>Speakers, Television</li>
                <li>High-value gadgets, Radar detectors, Lasers</li>
                <li>Walkie talkies</li>
                <li>Printers / Printers INK, cartridges</li>
                <li>Power Bank</li>
              </ul>
            </div>

            {/* Category: Explosives, Flammable, and Dangerous Goods */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Explosives,
                Flammable, and Dangerous Goods
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                <li>Aerosols</li>
                <li>Air bags</li>
                <li>Ammunition</li>
                <li>Fireworks</li>
                <li>Blasting caps, Detonators and fuses</li>
                <li>Lighter fluid, Matches</li>
                <li>Nitroglycerin</li>
                <li>Paint</li>
                <li>Petroleum</li>
                <li>Propane tanks</li>
                <li>Solvents</li>
                <li>Fire Extinguishers</li>
                <li>Dry Ice</li>
                <li>Flammable and non-flammable gases</li>
                <li>Gasoline, fuels and gasoline tanks</li>
                <li>All kinds of liquids</li>
              </ul>
            </div>

            {/* Category: Other Items */}
            <div>
              <h3 className="text-lg font-bold flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" /> Other Items
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                <li>Antiques (more than 100 years old)</li>
                <li>Cigarettes and other tobacco products</li>
                <li>Collectables and fine art</li>
                <li>Counterfeit goods</li>
                <li>Dangerous goods</li>
                <li>Electronic cigarettes</li>
                <li>Food (Perishable)</li>
                <li>Gambling devices</li>
                <li>Human remains</li>
                <li>Liquor</li>
                <li>Live animals</li>
                <li>Lithium ion batteries (packed separately)</li>
                <li>Loyalty cards (with stored value)</li>
                <li>Medical waste</li>
                <li>Military equipment</li>
                <li>Perishable commodities</li>
                <li>Plants</li>
                <li>Pornography</li>
                <li>Prepaid cards (with stored value)</li>
                <li>Shark fins</li>
                <li>Skins (non-human)</li>
                <li>Soil</li>
                <li>Stamps (postage)</li>
                <li>Used medical devices</li>
                <li>Vaping products</li>
                <li>Weapons</li>
                <li>White powder</li>
                <li>Wildlife products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
