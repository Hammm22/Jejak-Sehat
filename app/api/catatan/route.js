import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "../../../lib/getSession";

export async function POST(req) {
  try {
    const session = await getSession();

    // protect API
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const data = await prisma.catatan.create({
      data: {
        nik: session.user.nik, // 🔥 AUTO DARI SESSION
        nama_tempat: body.nama_tempat,
        lokasi: body.lokasi,
        suhu: Number(body.suhu),
        tanggal: new Date(body.tanggal),
        waktu: new Date(`1970-01-01T${body.waktu}`),
      },
    });

    return NextResponse.json(data);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Gagal simpan" },
      { status: 500 }
    );
  }
}