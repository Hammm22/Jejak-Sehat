"use client";

import BorderGlow from "../components/glowcard";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState, useRef } from "react";

export default function Register() {
  const [preview, setPreview] = useState(null);
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  // 🔥 handle image preview
  const handleImage = (e) => {
    const f = e.target.files[0];
    if (f) {
      setPreview(URL.createObjectURL(f));
      setFile(f);
    }
  };

  // 🔥 handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nik", nik);
      formData.append("nama", nama);
      formData.append("password", password);

      if (file) {
        formData.append("profil", file);
      }

      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Register berhasil 🚀");
        window.location.href = "/login";
      } else {
        alert(data.error);
      }
    } catch (err) {
      toast.error("Terjadi error");
      console.error(err);
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
            REGISTER
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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

            {/* Username */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm text-gray-400">Username:</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your username"
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

            {/* Upload Photo */}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-sm text-gray-400 self-start">Photo:</label>

              <div
                onClick={() => fileInputRef.current.click()}
                className="relative w-28 h-28 rounded-full cursor-pointer group hover:scale-105 transition"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#09090B] border border-white/10 flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <FaCamera className="text-white text-xl" />
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImage}
                className="hidden"
              />
            </div>

            {/* Login link */}
            <h4 className="text-sm text-gray-400">
              Have an account?
              <a href="/login" className="text-green-500 ml-1">
                Login
              </a>
            </h4>

            {/* Submit */}
            <button
              type="submit"
              className="mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:opacity-90 transition"
            >
              Register
            </button>

          </form>
        </BorderGlow>
      </div>
    </main>
  );
}