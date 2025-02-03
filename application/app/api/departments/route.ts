import { NextResponse } from "next/server"
import type { Department } from "@/types"

let departments: Department[] = []

export async function GET() {
  return NextResponse.json(departments)
}

export async function POST(request: Request) {
  const department: Omit<Department, "id"> = await request.json()
  const newDepartment: Department = {
    ...department,
    id: Date.now().toString(),
  }
  departments.push(newDepartment)
  return NextResponse.json(newDepartment, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedDepartment: Department = await request.json()
  departments = departments.map((dept) => (dept.id === updatedDepartment.id ? updatedDepartment : dept))
  return NextResponse.json(updatedDepartment)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  departments = departments.filter((dept) => dept.id !== id)
  return NextResponse.json({ message: "Department deleted" })
}

