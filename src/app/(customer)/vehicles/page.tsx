import dbConnect from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import EquipmentCard from "@/components/customer/EquipmentCard";
import FilterSidebar from "@/components/customer/FilterSidebar";

interface SearchParamsProps {
  searchParams: Promise<{
    category?: string;
    city?: string;
    maxPrice?: string;
  }>;
}

export default async function VehiclesPage({ searchParams }: SearchParamsProps) {
  await dbConnect();
  const filters = await searchParams;

  const query: any = { isAvailable: true };

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.city) {
    query.city = { $regex: filters.city, $options: "i" };
  }

  if (filters.maxPrice) {
    query.shiftRate = { $lte: Number(filters.maxPrice) };
  }

  const rawVehicles = await Vehicle.find(query).sort({ createdAt: -1 }).lean();
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
          Heavy Equipment & Fleet Catalog
        </h1>
        <p className="text-sm text-slate-500">
          Showing {vehicles.length} verified machines available for direct dispatch
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Right Vehicles Grid */}
        <div className="lg:col-span-3">
          {vehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h3 className="text-base font-bold text-slate-800">No machinery found</h3>
              <p className="mt-1 text-xs text-slate-500">
                Aapke selected filters ke mutabik koi equipment available nahi hai. Filter reset karke try karein ya naya vehicle register karein.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((v: any) => (
                <EquipmentCard key={v._id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}