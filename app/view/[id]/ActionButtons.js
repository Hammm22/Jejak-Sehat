"use client";

import { useRouter } from "next/navigation";
import { IoPencil, IoTrash, IoArrowBack } from "react-icons/io5";

export default function ActionButtons({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin mau hapus catatan ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/catatan/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Berhasil dihapus");
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Gagal hapus");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error");
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 mt-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-white/10 text-white hover:bg-green-500 hover:text-black transition cursor-pointer"
      >
        <IoArrowBack size={20} />
      </button>

      <button
        onClick={() => router.push(`/edit/${id}`)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-white/10 text-white hover:bg-green-500 hover:text-black transition cursor-pointer"
      >
        <IoPencil size={20} />
      </button>

      <button
        onClick={handleDelete}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-white/10 text-white hover:bg-red-500 hover:text-black transition cursor-pointer"
      >
        <IoTrash size={20} />
      </button>
    </div>
  );
}
