"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Truck,
  ShoppingCart,
  Store,
  Tag,
  LifeBuoy,
  HelpCircle,
  Globe,
  Book,
  Monitor,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const mainNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Locker", href: "/dashboard/locker", icon: Package },
    { name: "Shipments", href: "/dashboard/shipments", icon: Truck },
    {
      name: "Personal Shopper",
      href: "/dashboard/personal-shopper",
      icon: ShoppingCart,
    },
    { name: "Indian Stores", href: "/dashboard/indian-stores", icon: Store },
    { name: "Stores Offers", href: "/dashboard/stores-offers", icon: Tag },
    { name: "Coupons Available", href: "/dashboard/coupons", icon: Tag }, // Using Tag icon as placeholder
  ];

  const helpItems = [
    {
      name: "Prohibited Items",
      href: "/dashboard/help/prohibited",
      icon: LifeBuoy,
    }, // Using LifeBuoy as placeholder
    { name: "FAQ", href: "/dashboard/help/faq", icon: HelpCircle },
    {
      name: "Shipping Calculator",
      href: "/dashboard/help/calculator",
      icon: Globe,
    },
    { name: "Blog", href: "/dashboard/help/blog", icon: Book },
    { name: "Here's your guide", href: "/dashboard/help/guide", icon: Monitor },
  ];

  return (
    <div className="w-64 bg-card text-card-foreground h-full p-4 flex flex-col">
      <div className="text-xl font-bold mb-6">Indi Bridge</div>
      <div className="text-sm text-muted-foreground mb-6">indiBridge</div>

      <nav className="space-y-2 flex-grow">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 rounded-md ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
          Help
        </h3>
        <nav className="space-y-2">
          {helpItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-2 rounded-md ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
          Your Stuff
        </h3>
        {/* Add Your Stuff links here if needed */}
      </div>
    </div>
  );
}
