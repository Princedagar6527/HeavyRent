"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Filter, RotateCcw, MapPin, IndianRupee } from "lucide-react";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Sync state if URL params change externally
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setCity(searchParams.get("city") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/vehicles?${params.toString()}`);
  };

  const handleReset = () => {
    setCategory("");
    setCity("");
    setMaxPrice("");
    router.push("/vehicles");
  };

  const handleCityQuickSelect = (selectedCity: string) => {
    setCity(selectedCity);
    const params = new URLSearchParams(searchParams.toString());
    params.set("city", selectedCity);
    if (category) params.set("category", category);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
          <Filter className="h-4 w-4 text-amber-500" />
          <span>Filter Fleet</span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-700 transition"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <form onSubmit={handleApply} className="mt-4 space-y-4">
        {/* Machinery Category Dropdown */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Machinery Type
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition"
          >
            <option value="">All Machinery & Vehicles</option>
            <option value="JCB">JCB / Backhoe Loader</option>
            <option value="TIPPER">Tipper / Dumper</option>
            <option value="TEMPO">Commercial Tempo / Chota Hathi</option>
            <option value="CRANE">Hydraulic Crane</option>
            <option value="EXCAVATOR">Crawler Excavator</option>
            <option value="ROLLER">Road Roller</option>
          </select>
        </div>

        {/* City Input & Quick Select Chips */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Deployment Hub / City
          </label>
          <div className="relative mt-1.5">
            <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. Hapur, Noida, Ghaziabad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-semibold text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition"
            />
          </div>

          {/* Quick Hub Badges */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Hapur", "Ghaziabad", "Noida"].map((hub) => (
              <button
                type="button"
                key={hub}
                onClick={() => handleCityQuickSelect(hub)}
                className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition ${
                  city.toLowerCase() === hub.toLowerCase()
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {hub}
              </button>
            ))}
          </div>
        </div>

        {/* Max Shift Budget */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Max Shift Rate (₹ / 8-Hrs)
          </label>
          <div className="relative mt-1.5">
            <IndianRupee className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="number"
              placeholder="e.g. 10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-semibold text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}