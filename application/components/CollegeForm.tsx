import { useState } from 'react'
import { College } from '@/types'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CollegeFormProps {
  college?: College
  onSubmit: (college: Omit<College, 'id'>) => void
}

export function CollegeForm({ college, onSubmit }: CollegeFormProps) {
  const [name, setName] = useState(college?.name || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name })
    if (!college) setName('') // Reset form if it's a new college
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">{college ? 'Update' : 'Add'} College</Button>
    </form>
  )
}

