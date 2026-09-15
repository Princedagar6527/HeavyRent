import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Clock,
  ArrowRight,
  HardHat,
  ChevronRight,
  Gauge,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const machineryFleet = [
    {
      id: "JCB",
      title: "JCB 3DX Super Backhoe",
      category: "Excavation & Trenching",
      rate: "₹1,200 / hr",
      shiftRate: "₹9,000 / shift",
      badge: "Fastest Dispatch",
      image:
        "https://images.tractorjunction.com/Infrajunction-prod/JCB_3_DX_Super_9d3fdfca88.png?format=webp",
    },
    {
      id: "CRANE",
      title: "Hydraulic Mobile Crane",
      category: "Heavy Structural Lifts",
      rate: "₹2,400 / hr",
      shiftRate: "₹18,000 / shift",
      badge: "High Capacity",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGhk_ddx_gF_zSb8Nihwhew5f_6sfRy4QL7fHA2GC1LxLFpd1lqb0juog&s=10",
    },
    {
      id: "EXCAVATOR",
      title: "Crawler Heavy Excavator",
      category: "Demolition & Quarrying",
      rate: "₹2,800 / hr",
      shiftRate: "₹21,000 / shift",
      badge: "Heavy Duty",
      image:
        "https://in.hd-hyundaice.com/uploads/image/file/3770/Hyundai_215L_Mob_updated.webp",
    },
    {
      id: "TIPPER",
      title: "Multi-Axle Tipper / Dumper",
      category: "Bulk Material Logistics",
      rate: "₹1,100 / hr",
      shiftRate: "₹8,500 / shift",
      badge: "Site Transfer",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    },
  ];

  // Missing array - paste this below machineryFleet:
  const platformStats = [
    { value: "99.4%", label: "On-Time Site Dispatch" },
    { value: "4,800+", label: "Verified Heavy Units" },
    { value: "₹45Cr+", label: "Projects Serviced" },
    { value: "100%", label: "Certified Operators" },
  ];

  

  return (
    <div className="flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Hero Section with Ambient Industrial Video */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&q=80&w=1600"
            className="h-full w-full object-cover opacity-30 scale-105"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.85)_100%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Heavy Equipment On-Demand Network
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl leading-none">
              Deploy Heavy Machinery <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                Anywhere, Across India
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Book compliant JCBs, heavy cranes, dumpers, and excavators with pre-vetted operators.
              Transparent shift and hourly billing with a 20% advance token guarantee.
            </p>

            {/* Smart Search Console */}
            <div className="mt-10 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-3.5 shadow-2xl backdrop-blur-xl md:p-4 transition-all">
              <form
                action="/vehicles"
                method="GET"
                className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4"
              >
                <div className="flex flex-col text-left rounded-xl bg-slate-950/60 border border-slate-800 p-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Machinery
                  </label>
                  <select
                    name="category"
                    className="mt-0.5 bg-transparent text-sm font-semibold text-white outline-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-white">All Categories</option>
                    <option value="JCB" className="bg-slate-900 text-white">JCB / Backhoe</option>
                    <option value="CRANE" className="bg-slate-900 text-white">Hydraulic Crane</option>
                    <option value="EXCAVATOR" className="bg-slate-900 text-white">Excavator</option>
                    <option value="TIPPER" className="bg-slate-900 text-white">Tipper / Dumper</option>
                  </select>
                </div>

                <div className="flex flex-col text-left rounded-xl bg-slate-950/60 border border-slate-800 p-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    City / Site Location
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Noida, Delhi, Gurugram"
                    className="mt-0.5 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <div className="flex flex-col text-left rounded-xl bg-slate-950/60 border border-slate-800 p-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Rental Duration
                  </label>
                  <select className="mt-0.5 bg-transparent text-sm font-semibold text-white outline-none cursor-pointer">
                    <option className="bg-slate-900 text-white">8-Hour Shift Base</option>
                    <option className="bg-slate-900 text-white">Hourly Emergency</option>
                    <option className="bg-slate-900 text-white">Monthly Contract</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:brightness-110 active:scale-[0.98] sm:col-span-3 lg:col-span-1"
                >
                  <Search className="h-4 w-4 stroke-[2.5]" />
                  <span>Check Fleet</span>
                </button>
              </form>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Zero Mobilization Delay
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                20% Advance Token Booking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                RTO & Fitness Inspected
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Metrics Strip */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {platformStats.map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 font-mono">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 3D Fleet Diagnostics & Working Video Showcase */}
      <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 border-b border-slate-800/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Technical Specifications */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                3D Machine Telemetry
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Live 3D Fleet Diagnostics & Telematics Integration
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Experience zero-downtime operations. Every heavy machine deployed features
                real-time hour meters, load moment indicators (LMI), and GPS boundary locks
                synchronized directly with your dashboard.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <div className="rounded-lg bg-amber-500/20 p-2 text-amber-400">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Hydraulic Pressure Diagnostics
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Optimal breakout forces maintained up to 5,500 psi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Live Telematics & Eco-Mode
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Continuous fuel burn optimization yielding 15% lower project costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Automated Operator Logbooks
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Shift clock-in and work meter logs verified digitally to avoid billing disputes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Dock Player */}
            <div className="lg:col-span-7">
              <div className="relative group rounded-3xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl shadow-amber-500/10">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200"
                    className="h-full w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  >
                    <source
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20 pointer-events-none" />

                  {/* 3D UI Overlay Badges */}
                  <div className="absolute top-4 left-4 rounded-xl border border-white/10 bg-slate-950/80 p-3 backdrop-blur-md shadow-lg pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                        Engine Status: 100% Operational
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-black text-white">JCB 3DX Super 4x4 Tier-IV</p>
                  </div>

                  <div className="absolute bottom-4 right-4 rounded-xl border border-amber-500/40 bg-slate-950/85 p-3 backdrop-blur-md text-right shadow-lg pointer-events-none">
                    <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">Standard Pricing</span>
                    <p className="text-base font-black text-white">₹1,200 / hr</p>
                    <span className="text-[10px] text-slate-400 font-medium">Operator Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Machinery Fleet Showcase with Rupee Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Ready to Dispatch
              </span>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Featured Heavy Fleet
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Commercial machines available for instant job mobilization
              </p>
            </div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition"
            >
              <span>Explore All Machines</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {machineryFleet.map((machine) => (
              <div
                key={machine.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={machine.image}
                    alt={machine.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 rounded-md bg-amber-500/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-slate-950">
                    {machine.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <span className="text-[11px] font-medium text-amber-400">
                      {machine.category}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {machine.title}
                    </h3>
                  </div>

                  <div className="mt-6 border-t border-slate-800/80 pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Shift Standard
                        </span>
                        <p className="text-lg font-black text-white">{machine.shiftRate}</p>
                        <span className="text-xs font-semibold text-amber-500/90">
                          {machine.rate}
                        </span>
                      </div>

                      <Link
                        href={`/vehicles?category=${machine.id}`}
                        className="rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-bold text-white transition-all group-hover:bg-amber-500 group-hover:text-slate-950"
                      >
                        Reserve
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust & Quality Pillars */}
      <section className="border-t border-slate-800/80 bg-slate-900/30 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Engineered for Enterprise Sites
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Why leading infrastructure contractors deploy machinery through HeavyRent
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition hover:border-slate-700">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Full RC & Fitness Audits</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Every vehicle listed goes through rigorous physical engine checks, fitness clearance,
                and legal RTO registration validation before arriving at your work site.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition hover:border-slate-700">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Transparent Shift Billing</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Fair industry pricing with automated 8-hour shift calculation or emergency hourly
                rates. Direct GST invoices generated for corporate tax accounting.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition hover:border-slate-700">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <HardHat className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Certified Heavy Operators</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Avoid operator shortage risks. Machines arrive equipped with experienced,
                safety-certified drivers skilled in grade excavation and precision lifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Conversion CTA Banner */}
      <section className="relative overflow-hidden py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-8 sm:p-12 text-slate-950 shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-slate-900/80">
                Commercial Fleet Owners
              </span>
              <h2 className="mt-2 text-3xl font-black sm:text-5xl leading-tight">
                Turn Idle Machinery into Consistent Monthly Revenue.
              </h2>
              <p className="mt-3 text-sm font-medium text-slate-900/90 leading-relaxed">
                List your JCBs, cranes, and tippers on the HeavyRent ecosystem. Gain guaranteed project
                dispatches, upfront advance tokens, and complete fleet telemetry.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/vendor/my-fleet/add"
                  className="rounded-xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-900"
                >
                  List Machinery Now
                </Link>
                <Link
                  href="/vehicles"
                  className="rounded-xl border border-slate-950/30 px-6 py-3.5 text-xs font-bold text-slate-950 transition hover:bg-slate-950/10"
                >
                  Explore Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}