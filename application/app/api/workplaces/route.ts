import { NextResponse } from "next/server"
import type { Workplace } from "@/types"

let workplaces: Workplace[] = []

export async function GET() {
  return NextResponse.json(workplaces)
}

export async function POST(request: Request) {
  const workplace: Omit<Workplace, "id"> = await request.json()
  const newWorkplace: Workplace = {
    ...workplace,
    id: Date.now().toString(),
  }
  workplaces.push(newWorkplace)
  return NextResponse.json(newWorkplace, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedWorkplace: Workplace = await request.json()
  workplaces = workplaces.map((wp) => (wp.id === updatedWorkplace.id ? updatedWorkplace : wp))
  return NextResponse.json(updatedWorkplace)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  workplaces = workplaces.filter((wp) => wp.id !== id)
  return NextResponse.json({ message: "Workplace deleted" })
}

