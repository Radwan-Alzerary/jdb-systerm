import { NextResponse } from "next/server"
import type { College } from "@/types"

let colleges: College[] = []

export async function GET() {
  return NextResponse.json(colleges)
}

export async function POST(request: Request) {
  const college: Omit<College, "id"> = await request.json()
  const newCollege: College = {
    ...college,
    id: Date.now().toString(),
  }
  colleges.push(newCollege)
  return NextResponse.json(newCollege, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedCollege: College = await request.json()
  colleges = colleges.map((col) => (col.id === updatedCollege.id ? updatedCollege : col))
  return NextResponse.json(updatedCollege)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  colleges = colleges.filter((col) => col.id !== id)
  return NextResponse.json({ message: "College deleted" })
}

