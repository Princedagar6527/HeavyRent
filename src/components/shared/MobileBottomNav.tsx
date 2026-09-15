"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, CalendarCheck, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Vehicles", href: "/vehicles", icon: Search },
    { label: "Bookings", href: "/my-bookings", icon: CalendarCheck },
    { label: "Profile", href: "/login", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white py-2 px-4 md:hidden shadow-lg">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive ? "text-amber-600 font-semibold" : "text-slate-500 font-medium hover:text-slate-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}