import { NextResponse } from "next/server"
import type { GeneralSpecialization } from "@/types"

let generalSpecializations: GeneralSpecialization[] = []

export async function GET() {
  return NextResponse.json(generalSpecializations)
}

export async function POST(request: Request) {
  const generalSpecialization: Omit<GeneralSpecialization, "id"> = await request.json()
  const newGeneralSpecialization: GeneralSpecialization = {
    ...generalSpecialization,
    id: Date.now().toString(),
  }
  generalSpecializations.push(newGeneralSpecialization)
  return NextResponse.json(newGeneralSpecialization, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedGeneralSpecialization: GeneralSpecialization = await request.json()
  generalSpecializations = generalSpecializations.map((gs) =>
    gs.id === updatedGeneralSpecialization.id ? updatedGeneralSpecialization : gs,
  )
  return NextResponse.json(updatedGeneralSpecialization)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  generalSpecializations = generalSpecializations.filter((gs) => gs.id !== id)
  return NextResponse.json({ message: "General Specialization deleted" })
}

