"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Truck, HardHat, AlertCircle, ArrowRight } from "lucide-react";
import { registerUser } from "@/actions/auth.actions";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"CUSTOMER" | "VENDOR">("CUSTOMER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await registerUser({ name, email, phone, password, role });

    if (!res.success) {
      setErrorMsg(res.error || "Registration failed");
      setLoading(false);
      return;
    }

    // Auto sign-in after successful registration
    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (loginRes?.error) {
      router.push("/login");
    } else {
      router.push(role === "VENDOR" ? "/vendor/dashboard" : "/vehicles");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">Create HeavyRent Account</h1>
          <p className="mt-1 text-xs text-slate-500">Sign up to hire or list commercial construction machinery</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setRole("CUSTOMER")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition ${
              role === "CUSTOMER" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            <HardHat className="h-4 w-4 text-amber-500" />
            <span>I Need Machines</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("VENDOR")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition ${
              role === "VENDOR" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            <Truck className="h-4 w-4 text-amber-500" />
            <span>I Own Machinery</span>
          </button>
        </div>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">
              {role === "VENDOR" ? "Fleet / Owner Name" : "Your Full Name"}
            </label>
            <input
              type="text"
              required
              placeholder={role === "VENDOR" ? "e.g. Chaudhary Earthmovers" : "e.g. Prince Chaudhary"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Contact Number</label>
            <input
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <input
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs outline-none focus:border-amber-500"
            />
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
            className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : `Register as ${role === "VENDOR" ? "Fleet Owner" : "Customer"}`}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="font-bold text-amber-600 hover:text-amber-700">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}