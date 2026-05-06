"use client";
import Aurora from "./components/aurora";
import Navbar from "./components/navbar";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TextType from "./components/typewriter";
import SplitText from "./components/fadeintest";
import SpotlightCard from "./components/card";
import Link from "next/link";

import BorderGlow from "./components/glowcard";
import {
  FaLocationDot,
  FaChartSimple,
  FaLock,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import { IoPersonAdd, IoLogIn } from "react-icons/io5";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const MainFeatures = [
    { id: 1, title: "LOGGING\n TRIPS", icon: FaLocationDot },
    { id: 2, title: "TRIPS\n REPORT", icon: FaChartSimple },
    { id: 3, title: "ACCOUNT\n SAFETY", icon: FaLock },
  ];

  const HowToUse = [
    { id: 1, title: "REGISTER", icon: IoPersonAdd },
    { id: 2, title: "LOGIN", icon: IoLogIn },
    { id: 3, title: "INPUT DATA", icon: FaLocationDot },
    { id: 4, title: "GENERATE REPORT", icon: FaChartSimple },
  ];

  return (
    <>
      <section className="relative h-screen overflow-hidden" id="home">
        <Navbar />
        <div className="absolute inset-0 -z-10">
          <Aurora />
        </div>
        <div className="h-screen relative z-10 flex flex-col justify-center items-center gap-10">
          <TextType
            className="text-6xl font-semibold text-center h-2/12 "
            text={[
              "JEJAK SEHAT",
              "RECORD YOUR TRAVEL & MONITOR YOUR \nHEALTH DAILY",
              "SIMPLE APP FOR LOGGING TRIPS, LOCATION \n AND PHOTOS!",
            ]}
            typingSpeed={75}
            deletingSpeed={60}
            cursorCharacter="|"
            cursorBlinkDuration={0.4}
          />

          <div className="flex flex-row max-w-8/12 gap-12">
            <Link href="/login">
              <motion.button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-xl transition w-32 h-12 text-xl font-medium">
                Start Now
              </motion.button>
            </Link>
            <motion.button
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-xl transition w-32 h-12 text-xl font-medium"
              onClick={() => {
                document
                  .getElementById("about")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              About Us
            </motion.button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl"
        >
          <BorderGlow
            className="flex flex-col items-center text-center gap-8 p-10 bg-[#18181B] rounded-3xl border border-white/10"
            colors={["#ffffff", "#18181B", "#4DD658"]}
            backgroundColor="#09090B"
          >
            <h2 className="text-white text-4xl md:text-5xl font-semibold">
              ABOUT US
            </h2>

            <SplitText
              text="JejakSehat is a web-based application designed to help users track their daily journeys and monitor their health conditions in a simple and organized way. Through this platform, users can easily record important information such as location, time, and body temperature, allowing them to keep a clear record of their daily activities."
              splitType="words"
              delay={40}
              duration={1.5}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
            />
          </BorderGlow>
        </motion.div>
      </section>

      <section
        id="features"
        className="h-screen flex items-center justify-center flex-col gap-20"
      >
        <motion.h1
          className="text-6xl font-semibold"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          MAIN FEATURES
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full px-6">
          {MainFeatures.map((features, index) => {
            const Icon = features.icon;

            return (
              <motion.div
                key={features.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.2, // 🔥 delay antar item
                }}
                viewport={{ once: true }}
              >
                <SpotlightCard
                  className="custom-spotlight-card p-6 flex flex-col items-center justify-center gap-4"
                  spotlightColor="rgba(77, 214, 88, 1)"
                >
                  {Icon && (
                    <Icon className="text-5xl text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
                  )}

                  <h2 className="text-center text-2xl font-semibold">
                    {features.title}
                  </h2>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section
        id="steps"
        className="h-screen flex items-center justify-center flex-col gap-20"
      >
        <motion.h1
          className="text-6xl font-semibold"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          HOW TO USE
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full px-6">
          {HowToUse.map((steps, index) => {
            const Icon = steps.icon;

            return (
              <motion.div
                key={steps.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.2, // 🔥 delay antar item
                }}
                viewport={{ once: true }}
              >
                <SpotlightCard
                  className="custom-spotlight-card p-6 flex flex-col items-center justify-center gap-4"
                  spotlightColor="rgba(77, 214, 88, 1)"
                >
                  {Icon && (
                    <Icon className="text-5xl text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
                  )}

                  <h2 className="text-center text-2xl font-semibold">
                    {steps.title}
                  </h2>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="relative mt-40 border-t border-white/10 bg-zinc-950">
        {/* glow top biar nyambung */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-green-500/10 blur-3xl rounded-full" />

        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-green-500">
              JEJAK SEHAT
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              A simple web app to record your trips, monitor your health, and
              keep your daily activities organized.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <a
              href="#home"
              className="text-gray-400 hover:text-green-400 transition"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-400 hover:text-green-400 transition"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-400 hover:text-green-400 transition"
            >
              Features
            </a>
            <a
              href="#steps"
              className="text-gray-400 hover:text-green-400 transition"
            >
              How To Use
            </a>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Connect</h3>

            <div className="flex items-center gap-3 text-gray-400">
              <FaLocationDot />
              <span>Indonesia</span>
            </div>

            <div className="flex gap-4 mt-2">
              <a
                className="text-gray-400 hover:text-green-400 text-xl transition cursor-pointer"
                href="https://instagram.com/ilham22008"
              >
                <FaInstagram />
              </a>
              <a
                className="text-gray-400 hover:text-green-400 text-xl transition cursor-pointer"
                href="https://github.com/Hammm22"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col border-t border-white/10 text-center py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Jejak Sehat. All rights reserved.
          <br></br>
          Made By Hamm22 A.K.A Ilham Dwi Arsandy
        </div>
      </footer>
    </>
  );
}
