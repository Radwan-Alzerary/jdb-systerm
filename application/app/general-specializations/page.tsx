"use client"

import { useState, useEffect } from "react"
import type { GeneralSpecialization } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import {
  fetchGeneralSpecializations,
  createGeneralSpecialization,
  updateGeneralSpecialization,
  deleteGeneralSpecialization,
} from "@/utils/api"

export default function GeneralSpecializationsPage() {
  const [generalSpecializations, setGeneralSpecializations] = useState<GeneralSpecialization[]>([])
  const [isAddingSpecialization, setIsAddingSpecialization] = useState(false)
  const [editingSpecialization, setEditingSpecialization] = useState<GeneralSpecialization | null>(null)
  const [name, setName] = useState("")

  useEffect(() => {
    fetchGeneralSpecializationsData()
  }, [])

  const fetchGeneralSpecializationsData = async () => {
    try {
      const data = await fetchGeneralSpecializations()
      setGeneralSpecializations(data)
    } catch (error) {
      console.error("Error fetching general specializations:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب التخصصات العامة",
        variant: "destructive",
      })
    }
  }

  const handleCreateSpecialization = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createGeneralSpecialization({ name })
      fetchGeneralSpecializationsData()
      setIsAddingSpecialization(false)
      setName("")
      toast({
        title: "نجاح",
        description: "تمت إضافة التخصص العام بنجاح",
      })
    } catch (error) {
      console.error("Error creating general specialization:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة التخصص العام",
        variant: "destructive",
      })
    }
  }

  const handleUpdateSpecialization = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSpecialization) return
    try {
      await updateGeneralSpecialization({ ...editingSpecialization, name })
      fetchGeneralSpecializationsData()
      setEditingSpecialization(null)
      setName("")
      toast({
        title: "نجاح",
        description: "تم تحديث التخصص العام بنجاح",
      })
    } catch (error) {
      console.error("Error updating general specialization:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث التخصص العام",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSpecialization = async (id: string) => {
    try {
      await deleteGeneralSpecialization(id)
      fetchGeneralSpecializationsData()
      toast({
        title: "نجاح",
        description: "تم حذف التخصص العام بنجاح",
      })
    } catch (error) {
      console.error("Error deleting general specialization:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف التخصص العام",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">التخصصات العامة</h1>
        <Dialog open={isAddingSpecialization} onOpenChange={setIsAddingSpecialization}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingSpecialization(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة تخصص عام
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة تخصص عام جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSpecialization} className="space-y-4">
              <Input placeholder="اسم التخصص العام" value={name} onChange={(e) => setName(e.target.value)} required />
              <Button type="submit">إضافة التخصص العام</Button>
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
          {generalSpecializations.map((specialization) => (
            <TableRow key={specialization.id}>
              <TableCell>{specialization.name}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingSpecialization(specialization)
                        setName(specialization.name)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل التخصص العام</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSpecialization} className="space-y-4">
                      <Input
                        placeholder="اسم التخصص العام"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <Button type="submit">تحديث التخصص العام</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteSpecialization(specialization.id)}
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

