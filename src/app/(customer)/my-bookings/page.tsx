import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Vehicle from "@/models/Vehicle";
import User from "@/models/User";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Calendar, MapPin, Truck, ArrowRight, Lock } from "lucide-react";
import { auth } from "@/auth";

export default async function MyBookingsPage() {
  const session = await auth();
  const user = session?.user as any;

  // 1. Agar user logged-in nahi hai toh login button dikhayein
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900">Sign in to view bookings</h2>
          <p className="mt-2 text-xs text-slate-500">
            Aapki bookings aur invoices dekhne ke liye please apne registered account se login karein.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            Sign In to HeavyRent
          </Link>
        </div>
      </div>
    );
  }

  await dbConnect();

  // 2. Sirf current logged-in user ki bookings find karein (by userId ya phone)
  const rawBookings = await Booking.find({
    $or: [{ customerId: user.id }, { customerPhone: user.phone }],
  })
    .populate("vehicleId")
    .sort({ createdAt: -1 })
    .lean();

  const bookings = JSON.parse(JSON.stringify(rawBookings));

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">My Rentals & Orders</h1>
        <p className="text-xs text-slate-500">
          Showing active machinery deployments for {user.name} ({user.phone})
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Truck className="mx-auto h-10 w-10 text-slate-400" />
          <h3 className="mt-3 text-base font-bold text-slate-800">No bookings yet</h3>
          <p className="mt-1 text-xs text-slate-500">
            Aapne abhi tak koi heavy machine book nahi ki hai.
          </p>
          <Link
            href="/vehicles"
            className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((item: any) => (
            <div
              key={item._id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-amber-600">
                    #{item._id.slice(-6).toUpperCase()}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      item.status === "PENDING"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : item.status === "ACCEPTED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-black text-slate-900 line-clamp-1">
                    {item.vehicleId?.title || "Heavy Machinery"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {item.vehicleId?.registrationNo} • {item.vehicleId?.category}
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.siteAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>
                      {new Date(item.startDate).toLocaleDateString("en-IN")} ({item.units}{" "}
                      {item.rateType === "SHIFT" ? "Shifts" : "Hours"})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Contract</span>
                    <span className="text-sm font-black text-slate-900">
                      {formatINR(item.estimatedTotal)}
                    </span>
                  </div>
                  <Link
                    href={`/my-bookings/${item._id}`}
                    className="flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
                  >
                    <span>View Bill</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}