import { NextResponse } from "next/server"
import type { Subspecialty } from "@/types"

let subspecialties: Subspecialty[] = []

export async function GET() {
  return NextResponse.json(subspecialties)
}

export async function POST(request: Request) {
  const subspecialty: Omit<Subspecialty, "id"> = await request.json()
  const newSubspecialty: Subspecialty = {
    ...subspecialty,
    id: Date.now().toString(),
  }
  subspecialties.push(newSubspecialty)
  return NextResponse.json(newSubspecialty, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedSubspecialty: Subspecialty = await request.json()
  subspecialties = subspecialties.map((sub) => (sub.id === updatedSubspecialty.id ? updatedSubspecialty : sub))
  return NextResponse.json(updatedSubspecialty)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  subspecialties = subspecialties.filter((sub) => sub.id !== id)
  return NextResponse.json({ message: "Subspecialty deleted" })
}

