import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Vehicle from "@/models/Vehicle";
import User from "@/models/User";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Truck,
  ShieldCheck,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: Props) {
  await dbConnect();
  const { id } = await params;

  let booking: any = null;
  try {
    const rawBooking = await Booking.findById(id)
      .populate("vehicleId")
      .populate("vendorId", "name phone")
      .populate("customerId", "name phone")
      .lean();

    if (!rawBooking) return notFound();
    booking = JSON.parse(JSON.stringify(rawBooking));
  } catch {
    return notFound();
  }

  const remainingBalance = booking.estimatedTotal - booking.advanceAmount;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/vehicles"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Machinery Catalog
        </Link>

        {/* Order Status Banner */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-emerald-950">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-600 p-2.5 text-white shadow-sm">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Booking Reference #{booking._id.slice(-6).toUpperCase()}
              </span>
              <h1 className="text-xl sm:text-2xl font-black">
                Reservation Confirmed & Dispatched
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-800">
            Aapki requirement vendor ko forward kar di gayi hai. Fleet team job timing par machine site par mobilize karegi.
          </p>
        </div>

        {/* Details Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Equipment Summary */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Truck className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900">Equipment Details</h2>
            </div>
            <div>
              <p className="text-base font-black text-slate-900">{booking.vehicleId?.title}</p>
              <p className="text-xs text-slate-500">
                Reg: {booking.vehicleId?.registrationNo} • Category: {booking.vehicleId?.category}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-slate-400 block">Pricing Mode</span>
                <span className="font-semibold text-slate-900">{booking.rateType}</span>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-slate-400 block">Duration / Shifts</span>
                <span className="font-semibold text-slate-900">{booking.units} {booking.rateType === "SHIFT" ? "Shifts" : "Hours"}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Phone className="h-3.5 w-3.5 text-amber-500" />
                <span>Vendor Contact: {booking.vendorId?.phone || "Dispatched via Dispatch Hub"}</span>
              </div>
            </div>
          </div>

          {/* Site & Schedule Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900">Deployment Location & Date</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Work Site Address</span>
                <p className="font-semibold text-slate-800 mt-0.5">{booking.siteAddress}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-400 block">Start Date</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(booking.startDate).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">End Date</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(booking.endDate).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <span className="text-slate-400 block">Customer Name</span>
                <span className="font-semibold text-slate-900">{booking.customerId?.name} ({booking.customerId?.phone})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Bill Breakdown */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Payment Summary
          </h2>

          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Estimated Contract Total</span>
              <span>{formatINR(booking.estimatedTotal)}</span>
            </div>
            <div className="flex justify-between font-semibold text-emerald-700">
              <span>Advance Token (20% Paid / Due)</span>
              <span>{formatINR(booking.advanceAmount)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-slate-900 text-sm">
              <span>Payable Upon Work Completion</span>
              <span>{formatINR(remainingBalance)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}