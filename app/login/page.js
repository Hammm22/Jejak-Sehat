"use client";

import BorderGlow from "../components/glowcard";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Login() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        nik,
        password,
        redirect: false,
      });

      if (!res.error) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("NIK atau password salah");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#09090B]">
      <div className="w-full max-w-md">
        <BorderGlow
          className="flex flex-col gap-6 p-8 bg-[#18181B] rounded-2xl border border-white/10 shadow-xl"
          colors={["#ffffff", "#18181B", "#4DD658"]}
          backgroundColor="#09090B"
        >
          <h2 className="text-3xl font-semibold text-center text-white">
            LOGIN
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* NIK */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm text-gray-400">NIK:</label>
              <input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your NIK"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm text-gray-400">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Link */}
            <h4 className="text-sm text-gray-400">
              Doesn't have an account?
              <a href="/register" className="text-green-500 ml-1">
                Register
              </a>
            </h4>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </BorderGlow>
      </div>
    </main>
  );
}
