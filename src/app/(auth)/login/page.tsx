"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AlertCircle, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMsg("Invalid email or password. Please try again.");
    } else {
      router.push("/vehicles");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-3 text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="mt-1 text-xs text-slate-500">Sign in to manage rentals or track your fleet</p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
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
            {loading ? "Signing in..." : "Sign In to Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          New to HeavyRent?{" "}
          <Link href="/register" className="font-bold text-amber-600 hover:text-amber-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}