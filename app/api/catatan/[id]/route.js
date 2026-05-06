import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(req, { params }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await req.json();

    const updated = await prisma.catatan.update({
      where: { id_catatan: id },
      data: {
        nama_tempat: body.nama_tempat,
        lokasi: body.lokasi,
        suhu: Number(body.suhu),
        tanggal: new Date(body.tanggal),
        waktu: new Date(`1970-01-01T${body.waktu}`),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await prisma.catatan.delete({
      where: { id_catatan: id },
    });

    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Gagal hapus data" }, { status: 500 });
  }
}
