import { NextResponse } from "next/server"
import type { JobGrade } from "@/types"

let jobGrades: JobGrade[] = []

export async function GET() {
  return NextResponse.json(jobGrades)
}

export async function POST(request: Request) {
  const jobGrade: Omit<JobGrade, "id"> = await request.json()
  const newJobGrade: JobGrade = {
    ...jobGrade,
    id: Date.now().toString(),
  }
  jobGrades.push(newJobGrade)
  return NextResponse.json(newJobGrade, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedJobGrade: JobGrade = await request.json()
  jobGrades = jobGrades.map((grade) => (grade.id === updatedJobGrade.id ? updatedJobGrade : grade))
  return NextResponse.json(updatedJobGrade)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  jobGrades = jobGrades.filter((grade) => grade.id !== id)
  return NextResponse.json({ message: "Job grade deleted" })
}

