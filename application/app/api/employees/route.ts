import { NextResponse } from "next/server"
import type { Employee } from "@/types"

let employees: Employee[] = []

export async function GET() {
  return NextResponse.json(employees)
}

export async function POST(request: Request) {
  const employee: Omit<Employee, "id"> = await request.json()
  const newEmployee: Employee = {
    ...employee,
    id: Date.now().toString(),
  }
  employees.push(newEmployee)
  return NextResponse.json(newEmployee, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedEmployee: Employee = await request.json()
  employees = employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
  return NextResponse.json(updatedEmployee)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  employees = employees.filter((emp) => emp.id !== id)
  return NextResponse.json({ message: "Employee deleted" })
}

