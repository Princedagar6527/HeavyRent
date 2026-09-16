// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { Truck, Menu, X, PlusCircle, UserCheck, LogOut, LayoutDashboard } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { data: session, status } = useSession();
//   const user = session?.user as any;

//   return (
//     <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
//         {/* Brand Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm">
//             <Truck className="h-6 w-6" />
//           </div>
//           <div>
//             <span className="text-xl font-black tracking-tight text-slate-900">HEAVY</span>
//             <span className="text-xl font-black text-amber-500">RENT</span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
//           <Link href="/vehicles" className="hover:text-amber-600 transition">
//             Explore Machinery
//           </Link>

//           {/* Customer / General link */}
//           <Link href="/my-bookings" className="hover:text-amber-600 transition">
//             My Bookings
//           </Link>

//           {/* VENDOR ONLY: List machine & Vendor Console */}
//           {user?.role === "VENDOR" && (
//             <>
//               <Link
//                 href="/vendor/my-fleet/add"
//                 className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full hover:bg-amber-100 transition text-xs font-semibold"
//               >
//                 <PlusCircle className="h-4 w-4" />
//                 <span>List Machine</span>
//               </Link>

//               <Link
//                 href="/vendor/dashboard"
//                 className="flex items-center gap-1.5 text-slate-900 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition text-xs font-semibold"
//               >
//                 <LayoutDashboard className="h-4 w-4" />
//                 <span>Vendor Dashboard</span>
//               </Link>
//             </>
//           )}

//           {/* Logged Out Only: Option to become a vendor */}
//           {status !== "authenticated" && (
//             <Link
//               href="/register"
//               className="flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
//             >
//               <PlusCircle className="h-3.5 w-3.5" />
//               <span>Become a Vendor</span>
//             </Link>
//           )}

//           {/* Auth Button */}
//           {status === "authenticated" ? (
//             <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
//               <div className="text-right leading-tight">
//                 <p className="text-xs font-bold text-slate-900">{user?.name || "User"}</p>
//                 <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
//                   {user?.role}
//                 </span>
//               </div>
//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
//               >
//                 <LogOut className="h-3.5 w-3.5" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition text-xs font-semibold"
//             >
//               <UserCheck className="h-4 w-4" />
//               <span>Sign In</span>
//             </Link>
//           )}
//         </nav>

//         {/* Mobile Hamburger Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100"
//           aria-label="Toggle Menu"
//         >
//           {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {/* Mobile Drawer */}
//       {isOpen && (
//         <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
//           {status === "authenticated" && (
//             <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-bold text-slate-900">{user?.name}</p>
//                 <span className="text-[10px] uppercase font-bold text-amber-600">{user?.role}</span>
//               </div>
//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
//               >
//                 <LogOut className="h-3 w-3" /> Logout
//               </button>
//             </div>
//           )}

//           <Link
//             href="/vehicles"
//             onClick={() => setIsOpen(false)}
//             className="block text-sm font-medium text-slate-800 hover:text-amber-600"
//           >
//             Explore Machinery
//           </Link>
//           <Link
//             href="/my-bookings"
//             onClick={() => setIsOpen(false)}
//             className="block text-sm font-medium text-slate-800 hover:text-amber-600"
//           >
//             My Bookings
//           </Link>

//           {/* Mobile: VENDOR ONLY */}
//           {user?.role === "VENDOR" && (
//             <>
//               <Link
//                 href="/vendor/my-fleet/add"
//                 onClick={() => setIsOpen(false)}
//                 className="block text-sm text-amber-600 font-semibold"
//               >
//                 + List Machine
//               </Link>
//               <Link
//                 href="/vendor/dashboard"
//                 onClick={() => setIsOpen(false)}
//                 className="block text-sm text-slate-800 font-semibold"
//               >
//                 Vendor Dashboard
//               </Link>
//             </>
//           )}

//           {status !== "authenticated" && (
//             <Link
//               href="/login"
//               onClick={() => setIsOpen(false)}
//               className="block w-full text-center rounded-md bg-slate-900 px-4 py-2 text-sm text-white font-semibold"
//             >
//               Sign In / Register
//             </Link>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Truck, Menu, X, PlusCircle, UserCheck, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user as any;

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      // Hard navigation to home page ensures cookies & cache are completely flushed
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900">HEAVY</span>
            <span className="text-xl font-black text-amber-500">RENT</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/vehicles" className="hover:text-amber-600 transition">
            Explore Machinery
          </Link>

          {/* Customer / General link */}
          <Link href="/my-bookings" className="hover:text-amber-600 transition">
            My Bookings
          </Link>

          {/* VENDOR ONLY: List machine & Vendor Console */}
          {user?.role === "VENDOR" && (
            <>
              <Link
                href="/vendor/my-fleet/add"
                className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full hover:bg-amber-100 transition text-xs font-semibold"
              >
                <PlusCircle className="h-4 w-4" />
                <span>List Machine</span>
              </Link>

              <Link
                href="/vendor/dashboard"
                className="flex items-center gap-1.5 text-slate-900 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition text-xs font-semibold"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Vendor Dashboard</span>
              </Link>
            </>
          )}

          {/* Logged Out Only: Option to become a vendor */}
          {status !== "authenticated" && (
            <Link
              href="/register"
              className="flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Become a Vendor</span>
            </Link>
          )}

          {/* Auth Button */}
          {status === "authenticated" ? (
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="text-right leading-tight">
                <p className="text-xs font-bold text-slate-900">{user?.name || "User"}</p>
                <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                  {user?.role}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition active:scale-95"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition text-xs font-semibold"
            >
              <UserCheck className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          {status === "authenticated" && (
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                <span className="text-[10px] uppercase font-bold text-amber-600">{user?.role}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <LogOut className="h-3 w-3" /> Logout
              </button>
            </div>
          )}

          <Link
            href="/vehicles"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-slate-800 hover:text-amber-600"
          >
            Explore Machinery
          </Link>
          <Link
            href="/my-bookings"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-slate-800 hover:text-amber-600"
          >
            My Bookings
          </Link>

          {/* Mobile: VENDOR ONLY */}
          {user?.role === "VENDOR" && (
            <>
              <Link
                href="/vendor/my-fleet/add"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-amber-600 font-semibold"
              >
                + List Machine
              </Link>
              <Link
                href="/vendor/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-slate-800 font-semibold"
              >
                Vendor Dashboard
              </Link>
            </>
          )}

          {status !== "authenticated" && (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center rounded-md bg-slate-900 px-4 py-2 text-sm text-white font-semibold"
            >
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}