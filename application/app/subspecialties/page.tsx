"use client"

import { useState, useEffect } from "react"
import type { Subspecialty } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchSubspecialties, createSubspecialty, updateSubspecialty, deleteSubspecialty } from "@/utils/api"

export default function SubspecialtiesPage() {
  const [subspecialties, setSubspecialties] = useState<Subspecialty[]>([])
  const [isAddingSubspecialty, setIsAddingSubspecialty] = useState(false)
  const [editingSubspecialty, setEditingSubspecialty] = useState<Subspecialty | null>(null)
  const [name, setName] = useState("")

  useEffect(() => {
    fetchSubspecialtiesData()
  }, [])

  const fetchSubspecialtiesData = async () => {
    try {
      const data = await fetchSubspecialties()
      setSubspecialties(data)
    } catch (error) {
      console.error("Error fetching subspecialties:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب التخصصات الدقيقة",
        variant: "destructive",
      })
    }
  }

  const handleCreateSubspecialty = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createSubspecialty({ name })
      fetchSubspecialtiesData()
      setIsAddingSubspecialty(false)
      setName("")
      toast({
        title: "نجاح",
        description: "تمت إضافة التخصص الدقيق بنجاح",
      })
    } catch (error) {
      console.error("Error creating subspecialty:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة التخصص الدقيق",
        variant: "destructive",
      })
    }
  }

  const handleUpdateSubspecialty = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSubspecialty) return
    try {
      await updateSubspecialty({ ...editingSubspecialty, name })
      fetchSubspecialtiesData()
      setEditingSubspecialty(null)
      setName("")
      toast({
        title: "نجاح",
        description: "تم تحديث التخصص الدقيق بنجاح",
      })
    } catch (error) {
      console.error("Error updating subspecialty:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث التخصص الدقيق",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSubspecialty = async (id: string) => {
    try {
      await deleteSubspecialty(id)
      fetchSubspecialtiesData()
      toast({
        title: "نجاح",
        description: "تم حذف التخصص الدقيق بنجاح",
      })
    } catch (error) {
      console.error("Error deleting subspecialty:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف التخصص الدقيق",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">التخصصات الدقيقة</h1>
        <Dialog open={isAddingSubspecialty} onOpenChange={setIsAddingSubspecialty}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingSubspecialty(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة تخصص دقيق
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة تخصص دقيق جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSubspecialty} className="space-y-4">
              <Input placeholder="اسم التخصص الدقيق" value={name} onChange={(e) => setName(e.target.value)} required />
              <Button type="submit">إضافة التخصص الدقيق</Button>
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
          {subspecialties.map((subspecialty) => (
            <TableRow key={subspecialty.id}>
              <TableCell>{subspecialty.name}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingSubspecialty(subspecialty)
                        setName(subspecialty.name)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل التخصص الدقيق</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubspecialty} className="space-y-4">
                      <Input
                        placeholder="اسم التخصص الدقيق"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <Button type="submit">تحديث التخصص الدقيق</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteSubspecialty(subspecialty.id)}
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

