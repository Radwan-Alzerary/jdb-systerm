import { NextResponse } from "next/server"
import type { Certificate } from "@/types"

let certificates: Certificate[] = []

export async function GET() {
  return NextResponse.json(certificates)
}

export async function POST(request: Request) {
  const certificate: Omit<Certificate, "id"> = await request.json()
  const newCertificate: Certificate = {
    ...certificate,
    id: Date.now().toString(),
  }
  certificates.push(newCertificate)
  return NextResponse.json(newCertificate, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedCertificate: Certificate = await request.json()
  const index = certificates.findIndex((cert) => cert.id === updatedCertificate.id)
  if (index !== -1) {
    certificates[index] = updatedCertificate
    return NextResponse.json(updatedCertificate)
  }
  return NextResponse.json({ error: "Certificate not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  certificates = certificates.filter((cert) => cert.id !== id)
  return NextResponse.json({ message: "Certificate deleted" })
}

