import { prisma } from "../../../lib/prisma";
import Layout from "../../components/dashboardLayout";
import BorderGlow from "../../components/glowcard";
import ActionButtons from "./ActionButtons";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const data = await prisma.catatan.findUnique({
    where: { id_catatan: id },
  });

  if (!data) {
    return <div className="text-white p-10">Data tidak ditemukan</div>;
  }

  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center bg-[#09090B] text-white p-6">
        <div className="w-full max-w-xl">
          <BorderGlow
            className="p-8 bg-[#18181B] rounded-2xl border border-white/10 shadow-xl"
            colors={["#ffffff", "#18181B", "#4DD658"]}
            backgroundColor="#09090B"
          >
            {/* HEADER */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold">{data.nama_tempat}</h1>
              <p className="text-gray-400 text-sm mt-1">
                Detail Catatan Perjalanan
              </p>
            </div>

            {/* CONTENT */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Tanggal</span>
                <span>{new Date(data.tanggal).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Waktu</span>
                <span>
                  {new Date(data.waktu).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Lokasi</span>
                <span>{data.lokasi}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Suhu</span>
                <span className="text-green-400 font-semibold">
                  {data.suhu}°C
                </span>
              </div>

              <ActionButtons id={data.id_catatan} />
            </div>
          </BorderGlow>
        </div>
      </main>
    </Layout>
  );
}
