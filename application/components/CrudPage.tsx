import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon, Pencil } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CrudPageProps<T extends { id: string; name: string }> {
  title: string;
  entityName: string;
  apiEndpoint: string;
}

export function CrudPage<T extends { id: string; name: string }>({ title, entityName, apiEndpoint }: CrudPageProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [formData, setFormData] = useState({ name: '' })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch(apiEndpoint)
    const data = await response.json()
    setItems(data)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      fetchItems()
      setIsAdding(false)
      setFormData({ name: '' })
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    const response = await fetch(apiEndpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: editingItem.id }),
    })
    if (response.ok) {
      fetchItems()
      setEditingItem(null)
      setFormData({ name: '' })
    }
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(apiEndpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      fetchItems()
    }
  }

  const Form = ({ onSubmit, initialData }: { onSubmit: (e: React.FormEvent) => void, initialData?: { name: string } }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          required 
        />
      </div>
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Add {entityName}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {entityName}</DialogTitle>
            </DialogHeader>
            <Form onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setEditingItem(item)
                        setFormData({ name: item.name })
                      }}>
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit {entityName}</DialogTitle>
                      </DialogHeader>
                      <Form onSubmit={handleUpdate} initialData={{ name: item.name }} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

