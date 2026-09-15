export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 pb-20 md:pb-8">
      <div className="container mx-auto px-4 space-y-2">
        <p className="font-semibold text-slate-700">HeavyRent - On-Demand Commercial Equipment Network</p>
        <p>Book verified JCBs, Hydraulic Cranes, and Tipper Trucks directly from fleet owners.</p>
        <p className="text-slate-400">© {new Date().getFullYear()} HeavyRent Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}