"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MapPin, AlertCircle, Plus, Minus } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { createDirectBooking } from "@/actions/booking.actions";

interface Props {
  vehicle: {
    _id: string;
    hourlyRate: number;
    shiftRate: number;
    withOperator: boolean;
    withFuel: boolean;
  };
}

export default function BookingSummaryCard({ vehicle }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as any;

  const [rateType, setRateType] = useState<"HOURLY" | "SHIFT">("SHIFT");
  const [units, setUnits] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Logged-in user details auto-fill
  useEffect(() => {
    if (user) {
      if (user.name && !customerName) setCustomerName(user.name);
      if (user.phone && !customerPhone) setCustomerPhone(user.phone);
    }
  }, [user]);

  const currentRate = rateType === "HOURLY" ? vehicle.hourlyRate : vehicle.shiftRate;
  const safeUnits = Math.max(1, units);
  const estimatedTotal = currentRate * safeUnits;
  const advanceToken = Math.round(estimatedTotal * 0.2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await createDirectBooking({
      vehicleId: vehicle._id,
      customerName,
      customerPhone,
      startDate,
      endDate,
      siteAddress,
      rateType,
      units: safeUnits,
    });

    setLoading(false);

    if (res.success) {
      router.push(`/my-bookings/${res.bookingId}`);
    } else {
      setErrorMsg(res.error || "Booking failed. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold text-slate-900">Book Equipment</h3>
        <p className="text-xs text-slate-500">Secure this machine with a 20% advance token</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Rate Type Selector */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setRateType("SHIFT")}
            className={`rounded-lg py-2 text-xs font-bold transition ${
              rateType === "SHIFT" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            Shift Basis (8 Hrs)
          </button>
          <button
            type="button"
            onClick={() => setRateType("HOURLY")}
            className={`rounded-lg py-2 text-xs font-bold transition ${
              rateType === "HOURLY" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            Hourly Basis
          </button>
        </div>

        {/* Units / Quantity Selector with Plus & Minus Controls */}
        <div>
          <label className="text-xs font-semibold text-slate-700">
            Number of {rateType === "SHIFT" ? "Shifts" : "Hours"}
          </label>
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUnits((prev) => Math.max(1, prev - 1))}
              className="flex h-10 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-95"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              min={1}
              value={units}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setUnits(isNaN(val) ? 1 : Math.max(1, val));
              }}
              required
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-center text-sm font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setUnits((prev) => prev + 1)}
              className="flex h-10 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Start and End Dates */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Start Date</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">End Date</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Site Location */}
        <div>
          <label className="text-xs font-semibold text-slate-700">Work Site Address</label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. Sector 62, Metro Site, Noida"
              required
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Your Name</label>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">Phone</label>
            <input
              type="tel"
              required
              placeholder="10-digit number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="rounded-xl bg-amber-50/50 p-4 border border-amber-200/50 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Rate</span>
            <span>{formatINR(currentRate)} / {rateType === "SHIFT" ? "Shift" : "Hour"}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated Total</span>
            <span className="font-semibold text-slate-900">{formatINR(estimatedTotal)}</span>
          </div>
          <div className="flex justify-between border-t border-amber-200 pt-2 font-bold text-amber-900 text-sm">
            <span>Advance Token (20%)</span>
            <span>{formatINR(advanceToken)}</span>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-1.5 text-xs text-rose-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Confirm & Pay Token ${formatINR(advanceToken)}`}
        </button>
      </form>
    </div>
  );
}