import { NextResponse } from "next/server"
import type { Position } from "@/types"

let positions: Position[] = []

export async function GET() {
  return NextResponse.json(positions)
}

export async function POST(request: Request) {
  const position: Omit<Position, "id"> = await request.json()
  const newPosition: Position = {
    ...position,
    id: Date.now().toString(),
  }
  positions.push(newPosition)
  return NextResponse.json(newPosition, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedPosition: Position = await request.json()
  positions = positions.map((pos) => (pos.id === updatedPosition.id ? updatedPosition : pos))
  return NextResponse.json(updatedPosition)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  positions = positions.filter((pos) => pos.id !== id)
  return NextResponse.json({ message: "Position deleted" })
}

