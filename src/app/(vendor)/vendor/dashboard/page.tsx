import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Vehicle from "@/models/Vehicle";
import { formatINR } from "@/lib/utils";
import { Truck, IndianRupee, CalendarCheck, Check, X, MapPin, Phone } from "lucide-react";
import { updateBookingStatus } from "@/actions/booking.actions";

export default async function VendorDashboardPage() {
  await dbConnect();

  const rawBookings = await Booking.find()
    .populate("vehicleId")
    .populate("customerId", "name phone")
    .sort({ createdAt: -1 })
    .lean();

  const bookings = JSON.parse(JSON.stringify(rawBookings));
  const totalFleet = await Vehicle.countDocuments();

  const totalEarnings = bookings.reduce(
    (acc: number, curr: any) => (curr.status === "ACCEPTED" || curr.status === "COMPLETED" ? acc + curr.estimatedTotal : acc),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">Vendor Fleet Console</h1>
          <p className="text-xs text-slate-500">Manage incoming booking requests & track fleet deployments</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Active Machinery</p>
            <h3 className="text-2xl font-black text-slate-900">{totalFleet} Machines</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
            <IndianRupee className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Committed Revenue</p>
            <h3 className="text-2xl font-black text-slate-900">{formatINR(totalEarnings)}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Requests</p>
            <h3 className="text-2xl font-black text-slate-900">{bookings.length} Jobs</h3>
          </div>
        </div>
      </div>

      {/* Booking Requests Table / Feed */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-base font-bold text-slate-900">Job Requests & Site Dispatches</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {bookings.map((booking: any) => (
            <div key={booking._id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">#{booking._id.slice(-6).toUpperCase()}</span>
                  <span className="text-sm font-bold text-slate-900">{booking.vehicleId?.title}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {booking.vehicleId?.registrationNo}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-500" />
                    {booking.siteAddress}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {booking.customerId?.name} ({booking.customerId?.phone})
                  </span>
                  <span>
                    Duration: {booking.units} {booking.rateType === "SHIFT" ? "Shifts" : "Hours"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Contract Total</p>
                  <p className="text-sm font-black text-slate-900">{formatINR(booking.estimatedTotal)}</p>
                </div>

                {booking.status === "PENDING" ? (
                  <div className="flex gap-2">
                    <form action={async () => {
                      "use server";
                      await updateBookingStatus(booking._id, "ACCEPTED");
                    }}>
                      <button
                        type="submit"
                        className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                      >
                        <Check className="h-3.5 w-3.5" /> Accept
                      </button>
                    </form>

                    <form action={async () => {
                      "use server";
                      await updateBookingStatus(booking._id, "CANCELLED");
                    }}>
                      <button
                        type="submit"
                        className="flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100"
                      >
                        <X className="h-3.5 w-3.5" /> Reject
                      </button>
                    </form>
                  </div>
                ) : (
                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase ${
                      booking.status === "ACCEPTED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}