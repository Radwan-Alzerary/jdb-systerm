import { useState } from 'react'
import { Department } from '@/types'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface DepartmentFormProps {
  collegeId: string
  onSubmit: (department: Omit<Department, 'id'>) => void
}

export function DepartmentForm({ collegeId, onSubmit }: DepartmentFormProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, collegeId })
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Department Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add Department</Button>
    </form>
  )
}

