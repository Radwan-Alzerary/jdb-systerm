"use client"

import { useState, useEffect } from "react"
import type { Workplace } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchWorkplaces, createWorkplace, updateWorkplace, deleteWorkplace } from "@/utils/api"

export default function WorkplacesPage() {
  const [workplaces, setWorkplaces] = useState<Workplace[]>([])
  const [isAddingWorkplace, setIsAddingWorkplace] = useState(false)
  const [editingWorkplace, setEditingWorkplace] = useState<Workplace | null>(null)
  const [name, setName] = useState("")

  useEffect(() => {
    fetchWorkplacesData()
  }, [])

  const fetchWorkplacesData = async () => {
    try {
      const data = await fetchWorkplaces()
      setWorkplaces(data)
    } catch (error) {
      console.error("خطأ في جلب أماكن العمل:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب أماكن العمل",
        variant: "destructive",
      })
    }
  }

  const handleCreateWorkplace = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createWorkplace({ name })
      fetchWorkplacesData()
      setIsAddingWorkplace(false)
      setName("")
      toast({
        title: "نجاح",
        description: "تمت إضافة مكان العمل بنجاح",
      })
    } catch (error) {
      console.error("خطأ في إنشاء مكان العمل:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة مكان العمل",
        variant: "destructive",
      })
    }
  }

  const handleUpdateWorkplace = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingWorkplace) return
    try {
      await updateWorkplace({ ...editingWorkplace, name })
      fetchWorkplacesData()
      setEditingWorkplace(null)
      setName("")
      toast({
        title: "نجاح",
        description: "تم تحديث مكان العمل بنجاح",
      })
    } catch (error) {
      console.error("خطأ في تحديث مكان العمل:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث مكان العمل",
        variant: "destructive",
      })
    }
  }

  const handleDeleteWorkplace = async (id: string) => {
    try {
      await deleteWorkplace(id)
      fetchWorkplacesData()
      toast({
        title: "نجاح",
        description: "تم حذف مكان العمل بنجاح",
      })
    } catch (error) {
      console.error("خطأ في حذف مكان العمل:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف مكان العمل",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">أماكن العمل</h1>
        <Dialog open={isAddingWorkplace} onOpenChange={setIsAddingWorkplace}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingWorkplace(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة مكان عمل
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مكان عمل جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateWorkplace} className="space-y-4">
              <Input placeholder="اسم مكان العمل" value={name} onChange={(e) => setName(e.target.value)} required />
              <Button type="submit">إضافة مكان العمل</Button>
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
          {workplaces.map((workplace) => (
            <TableRow key={workplace.id}>
              <TableCell>{workplace.name}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingWorkplace(workplace)
                        setName(workplace.name)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل مكان العمل</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateWorkplace} className="space-y-4">
                      <Input
                        placeholder="اسم مكان العمل"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <Button type="submit">تحديث مكان العمل</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteWorkplace(workplace.id)}
                  className="mr-2"
                >
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

