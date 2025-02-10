"use client"

import { useState, useEffect } from "react"
import type { Position } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchPositions, createPosition, updatePosition, deletePosition } from "@/utils/api"

export default function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>([])
  const [isAddingPosition, setIsAddingPosition] = useState(false)
  const [editingPosition, setEditingPosition] = useState<Position | null>(null)
  const [name, setName] = useState("")

  useEffect(() => {
    fetchPositionsData()
  }, [])

  const fetchPositionsData = async () => {
    try {
      const data = await fetchPositions()
      setPositions(data)
    } catch (error) {
      console.error("Error fetching positions:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب المناصب",
        variant: "destructive",
      })
    }
  }

  const handleCreatePosition = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPosition({ name })
      fetchPositionsData()
      setIsAddingPosition(false)
      setName("")
      toast({
        title: "نجاح",
        description: "تمت إضافة المنصب بنجاح",
      })
    } catch (error) {
      console.error("Error creating position:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنصب",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePosition = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPosition) return
    try {
      await updatePosition({ ...editingPosition, name })
      fetchPositionsData()
      setEditingPosition(null)
      setName("")
      toast({
        title: "نجاح",
        description: "تم تحديث المنصب بنجاح",
      })
    } catch (error) {
      console.error("Error updating position:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث المنصب",
        variant: "destructive",
      })
    }
  }

  const handleDeletePosition = async (id: string) => {
    try {
      await deletePosition(id)
      fetchPositionsData()
      toast({
        title: "نجاح",
        description: "تم حذف المنصب بنجاح",
      })
    } catch (error) {
      console.error("Error deleting position:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف المنصب",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">المناصب</h1>
        <Dialog open={isAddingPosition} onOpenChange={setIsAddingPosition}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingPosition(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة منصب
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة منصب جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePosition} className="space-y-4">
              <Input placeholder="اسم المنصب" value={name} onChange={(e) => setName(e.target.value)} required />
              <Button type="submit">إضافة المنصب</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position._id}>
              <TableCell>{position.name}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPosition(position)
                        setName(position.name)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل المنصب</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdatePosition} className="space-y-4">
                      <Input placeholder="اسم المنصب" value={name} onChange={(e) => setName(e.target.value)} required />
                      <Button type="submit">تحديث المنصب</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={() => handleDeletePosition(position._id)} className="mr-2">
                  حذف
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

