import { NextResponse } from "next/server"
import type { DepartmentRequirement } from "@/types"

let departmentRequirements: DepartmentRequirement[] = []

export async function GET() {
  return NextResponse.json(departmentRequirements)
}

export async function POST(request: Request) {
  const requirement: Omit<DepartmentRequirement, "id"> = await request.json()
  const newRequirement: DepartmentRequirement = {
    ...requirement,
    id: Date.now().toString(),
    administrative: requirement.administrative || [],
    teaching: requirement.teaching || [],
    technician: requirement.technician || [],
  }
  departmentRequirements.push(newRequirement)
  return NextResponse.json(newRequirement, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedRequirement: DepartmentRequirement = await request.json()
  departmentRequirements = departmentRequirements.map((req) =>
    req.id === updatedRequirement.id ? updatedRequirement : req,
  )
  return NextResponse.json(updatedRequirement)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  departmentRequirements = departmentRequirements.filter((req) => req.id !== id)
  return NextResponse.json({ message: "Department requirement deleted" })
}

