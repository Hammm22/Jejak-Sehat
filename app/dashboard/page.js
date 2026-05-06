import { prisma } from "../../lib/prisma";
import Layout from "../components/dashboardLayout";
import Navbar from "../components/navbar";
import TripCards from "../components/TripCards";
import WeeklyChart from "../components/WeeklyChart";

import { getSession } from "../../lib/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  // protect dashboard
  if (!session) {
    redirect("/login");
  }

  // ambil catatan sesuai user login
  const catatan = await prisma.catatan.findMany({
    where: {
      nik: session.user.nik,
    },

    orderBy: {
      tanggal: "desc",
    },
  });

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const result = Array(7).fill(0);

  catatan.forEach((c) => {
    const d = new Date(c.tanggal).getDay();
    result[d]++;
  });

  const chartData = days.map((d, i) => ({
    day: d,
    total: result[i],
  }));

  return (
    <Layout>
      <Navbar />

      <main className="min-h-screen bg-[#09090B] text-white p-6 space-y-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="pt-32">
          <h1 className="text-4xl font-bold">Welcome, {session.user.nama}</h1>

          <p className="text-gray-400 mt-2">Kelola catatan perjalanan kamu</p>
        </div>

        {/* RIWAYAT */}
        <section className="min-h-screen py-20" id="home">
          <h2 className="text-xl mb-4">Riwayat Perjalanan</h2>
          <TripCards data={catatan} />
        </section>

        {/* LAPORAN */}
        <section className="min-h-screen py-20" id="laporan">
          <h2 className="text-xl mb-4">Statistik Mingguan</h2>
          <WeeklyChart data={chartData} />
        </section>
      </main>
    </Layout>
  );
}
