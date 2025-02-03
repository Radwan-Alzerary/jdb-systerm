import { NextResponse } from "next/server"
import type { Admin } from "@/types"
import bcrypt from "bcryptjs"

let admins: Admin[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@example.com",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDuy0Bx8KmXK", // hashed "password123"
    role: "full",
  },
]

export async function GET(request: Request) {
  const url = new URL(request.url)
  const role = url.searchParams.get("role")
  const entityId = url.searchParams.get("entityId")

  let filteredAdmins = admins

  if (role) {
    filteredAdmins = filteredAdmins.filter((admin) => admin.role === role)
  }

  if (entityId) {
    filteredAdmins = filteredAdmins.filter((admin) => admin.entityId === entityId)
  }

  // When sending admin data to the client, we'll omit the password
  const safeAdmins = filteredAdmins.map(({ password, ...admin }) => admin)
  return NextResponse.json(safeAdmins)
}

export async function POST(request: Request) {
  const adminData: Omit<Admin, "id"> = await request.json()
  const hashedPassword = await bcrypt.hash(adminData.password, 10)
  const newAdmin: Admin = {
    ...adminData,
    id: Date.now().toString(),
    password: hashedPassword,
  }
  admins.push(newAdmin)
  const { password, ...safeAdmin } = newAdmin
  return NextResponse.json(safeAdmin, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedAdmin: Admin = await request.json()
  const index = admins.findIndex((admin) => admin.id === updatedAdmin.id)
  if (index !== -1) {
    if (updatedAdmin.password) {
      updatedAdmin.password = await bcrypt.hash(updatedAdmin.password, 10)
    } else {
      updatedAdmin.password = admins[index].password
    }
    admins[index] = updatedAdmin
    const { password, ...safeAdmin } = updatedAdmin
    return NextResponse.json(safeAdmin)
  }
  return NextResponse.json({ error: "Admin not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  admins = admins.filter((admin) => admin.id !== id)
  return NextResponse.json({ message: "Admin deleted" })
}

