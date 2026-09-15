"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { registerNewVehicle } from "@/actions/vehicle.actions";

export default function AddVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    vendorName: "",
    vendorPhone: "",
    title: "",
    category: "JCB" as const,
    registrationNo: "",
    hourlyRate: "",
    shiftRate: "",
    withOperator: true,
    withFuel: false,
    city: "",
    state: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await registerNewVehicle({
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      shiftRate: Number(formData.shiftRate),
    });

    setLoading(false);

    if (res.success) {
      router.push("/vehicles");
    } else {
      setErrorMsg(res.error || "Failed to add equipment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/vehicles"
          className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">List Commercial Machinery</h1>
              <p className="text-xs text-slate-500">Register your vehicle on the heavy rental network</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Vendor Owner Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Owner / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chaudhary Earthmovers"
                  value={formData.vendorName}
                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={formData.vendorPhone}
                  onChange={(e) => setFormData({ ...formData, vendorPhone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Vehicle Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Machine Model / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JCB 3DX Super 2023"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                >
                  <option value="JCB">JCB / Backhoe</option>
                  <option value="CRANE">Hydraulic Crane</option>
                  <option value="EXCAVATOR">Excavator</option>
                  <option value="TIPPER">Tipper / Dumper</option>
                  <option value="ROLLER">Road Roller</option>
                </select>
              </div>
            </div>

            {/* Registration & Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Vehicle RC Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UP-14-AX-1234"
                  value={formData.registrationNo}
                  onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs uppercase outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Image Web URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Rates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Hourly Rate (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1200"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Shift Rate (8 Hrs) (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 9000"
                  value={formData.shiftRate}
                  onChange={(e) => setFormData({ ...formData, shiftRate: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hapur / Noida"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">State</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uttar Pradesh"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.withOperator}
                  onChange={(e) => setFormData({ ...formData, withOperator: e.target.checked })}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                Driver / Operator Included
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.withFuel}
                  onChange={(e) => setFormData({ ...formData, withFuel: e.target.checked })}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                Fuel Included
              </label>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Registering Equipment..." : "Register Vehicle & Publish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}