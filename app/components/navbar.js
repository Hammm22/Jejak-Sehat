"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const guestMenu = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Main Features", id: "features" },
  { name: "How To Use", id: "steps" },
];

const authMenu = [
  { name: "Home", id: "home" },
  { name: "Laporan", id: "laporan" },
  { name: "Catat", href: "/catat" },
];

export default function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState("home");

  const isLoggedIn =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/catat") ||
    pathname.startsWith("/laporan");

  const menuData = isLoggedIn ? authMenu : guestMenu;

  useEffect(() => {
    const sections = menuData
      .filter((item) => item.id)
      .map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoggedIn]);

  return (
    <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-5/12">
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
      >
        {/* LOGO */}
        <Image
          src="/logo.jpg"
          alt="logo"
          width={100}
          height={100}
          className="w-32 h-13 rounded-4xl"
        />

        {/* MENU */}
        <div className="flex gap-2 items-center">
          {menuData.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.href) {
                  router.push(item.href);
                } else if (item.id) {
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative px-4 py-1.5 text-sm font-medium"
            >
              {/* ACTIVE INDICATOR hanya di guest */}
              {active === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/80 rounded-full"
                />
              )}

              <span
                className={
                  active === item.id
                    ? "text-green-500 font-semibold relative z-10"
                    : "text-white/60 hover:text-white relative z-10"
                }
              >
                {item.name}
              </span>
            </button>
          ))}

          {isLoggedIn && (
            <div className="flex flex-row gap-6">
              <img
                src={session?.user?.profil}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 rounded-xl bg-red-500 text-black font-semibold hover:opacity-90 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
