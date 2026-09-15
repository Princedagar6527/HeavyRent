import Link from "next/link";
import { CheckCircle2, User, Fuel, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface EquipmentProps {
  vehicle: {
    _id: string;
    title: string;
    category: string;
    city: string;
    state: string;
    hourlyRate: number;
    shiftRate: number;
    withOperator: boolean;
    withFuel: boolean;
    isAvailable: boolean;
    images?: string[];
  };
}

export default function EquipmentCard({ vehicle }: EquipmentProps) {
  const imageUrl =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images[0]
      : "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Vehicle Image */}
      <div className="relative h-48 w-full bg-slate-100">
        <img
          src={imageUrl}
          alt={vehicle.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-1">
          <span className="rounded-md bg-amber-500 px-2.5 py-1 text-xs font-bold text-slate-950 shadow">
            {vehicle.category}
          </span>
          {vehicle.isAvailable && (
            <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
              Ready to Dispatch
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 line-clamp-1">{vehicle.title}</h3>
              <p className="text-xs text-slate-500">{vehicle.city}, {vehicle.state}</p>
            </div>
          </div>

          {/* Perks (Operator & Fuel Included) */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 ${
              vehicle.withOperator ? "bg-slate-100 text-slate-700" : "bg-rose-50 text-rose-600"
            }`}>
              <User className="h-3.5 w-3.5" />
              {vehicle.withOperator ? "Operator Included" : "No Driver"}
            </span>

            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 ${
              vehicle.withFuel ? "bg-slate-100 text-slate-700" : "bg-slate-50 text-slate-500"
            }`}>
              <Fuel className="h-3.5 w-3.5" />
              {vehicle.withFuel ? "Fuel Included" : "Excl. Fuel"}
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-5 border-t border-slate-100 pt-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-400">Shift Rate (8 Hrs)</p>
              <p className="text-lg font-black text-slate-900">{formatINR(vehicle.shiftRate)}</p>
              <p className="text-xs font-semibold text-amber-600">{formatINR(vehicle.hourlyRate)}/hr</p>
            </div>

            <Link
              href={`/vehicles/${vehicle._id}`}
              className="flex items-center gap-1 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
            >
              <span>Book Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}