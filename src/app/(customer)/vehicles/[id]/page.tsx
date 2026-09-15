import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck, Fuel, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import BookingSummaryCard from "@/components/customer/BookingSummaryCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: Props) {
  await dbConnect();
  const { id } = await params;

  let vehicle;
  try {
    const raw = await Vehicle.findById(id).populate("vendorId", "name phone").lean();
    if (!raw) return notFound();
    vehicle = JSON.parse(JSON.stringify(raw));
  } catch {
    return notFound();
  }

  const imageUrl =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images[0]
      : "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <Link
        href="/vehicles"
        className="mb-6 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Details, Gallery, Specs */}
        <div className="space-y-6 lg:col-span-2">
          {/* Main Image */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl bg-slate-900">
            <img
              src={imageUrl}
              alt={vehicle.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-lg bg-amber-500 px-3 py-1 font-bold text-slate-950 text-xs shadow">
              {vehicle.category}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Registration ({vehicle.registrationNo})
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              {vehicle.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Located at {vehicle.city}, {vehicle.state}
            </p>
          </div>

          {/* Included Features */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <User className="h-5 w-5 text-amber-500" />
              <p className="mt-2 text-xs text-slate-500">Operator</p>
              <p className="text-sm font-bold text-slate-800">
                {vehicle.withOperator ? "Included" : "Excluded"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <Fuel className="h-5 w-5 text-amber-500" />
              <p className="mt-2 text-xs text-slate-500">Fuel Policy</p>
              <p className="text-sm font-bold text-slate-800">
                {vehicle.withFuel ? "Fuel Included" : "Client Scope"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <Clock className="h-5 w-5 text-amber-500" />
              <p className="mt-2 text-xs text-slate-500">Shift Length</p>
              <p className="text-sm font-bold text-slate-800">8 Hours / Shift</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <p className="mt-2 text-xs text-slate-500">Compliance</p>
              <p className="text-sm font-bold text-emerald-700">RC Verified</p>
            </div>
          </div>

          {/* Commercial Terms */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <h3 className="font-bold text-slate-900">Rental & Dispatch Terms</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 leading-relaxed">
              <li>Machine mobilization commences upon advance confirmation.</li>
              <li>Toll taxes, inter-state permit fees, and RTO charges (if any) are billed as actuals.</li>
              <li>Standard 1 hour lunch/service maintenance window included in full-day shifts.</li>
              <li>Operator overtime beyond 8 hours is charged proportionally at standard hourly rates.</li>
            </ul>
          </div>
        </div>

        {/* Right 1 Col: Dynamic Booking Calculator */}
        <div className="lg:col-span-1">
          <BookingSummaryCard vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}