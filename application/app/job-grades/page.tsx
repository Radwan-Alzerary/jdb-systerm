"use client"

import { useState, useEffect } from "react"
import type { JobGrade } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchJobGrades, createJobGrade, updateJobGrade, deleteJobGrade } from "@/utils/api"

export default function JobGradesPage() {
  const [jobGrades, setJobGrades] = useState<JobGrade[]>([])
  const [isAddingGrade, setIsAddingGrade] = useState(false)
  const [isEditingGrade, setIsEditingGrade] = useState(false)
  const [editingGrade, setEditingGrade] = useState<JobGrade | null>(null)
  const [name, setName] = useState("")
  const [level, setLevel] = useState("")

  useEffect(() => {
    fetchJobGradesData()
  }, [])

  const fetchJobGradesData = async () => {
    try {
      const data = await fetchJobGrades()
      setJobGrades(data)
    } catch (error) {
      console.error("Error fetching job grades:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب الدرجات الوظيفية",
        variant: "destructive",
      })
    }
  }

  const handleCreateGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createJobGrade({ name, level: Number(level) })
      fetchJobGradesData()
      setIsAddingGrade(false)
      setName("")
      setLevel("")
      toast({
        title: "نجاح",
        description: "تمت إضافة القب العلمي بنجاح",
      })
    } catch (error) {
      console.error("Error creating job grade:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة القب العلمي",
        variant: "destructive",
      })
    }
  }

  const handleUpdateGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGrade) return
    try {
      await updateJobGrade({ ...editingGrade, name, level: Number(level) })
      fetchJobGradesData()
      setIsEditingGrade(false)
      setEditingGrade(null)
      setName("")
      setLevel("")
      toast({
        title: "نجاح",
        description: "تم تحديث القب العلمي بنجاح",
      })
    } catch (error) {
      console.error("Error updating job grade:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث القب العلمي",
        variant: "destructive",
      })
    }
  }

  const handleDeleteGrade = async (id: string) => {
    try {
      await deleteJobGrade(id)
      fetchJobGradesData()
      toast({
        title: "نجاح",
        description: "تم حذف القب العلمي بنجاح",
      })
    } catch (error) {
      console.error("Error deleting job grade:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف القب العلمي",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">الدرجة الوظيفية</h1>
        <Dialog open={isAddingGrade} onOpenChange={setIsAddingGrade}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingGrade(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة درجة وظيفية
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة درجة وظيفية جديدة</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateGrade} className="space-y-4">
              <Input
                placeholder="الدرجة الوظيفية"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder="المرحلة"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              />
              <Button type="submit">إضافة</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>المرحلة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobGrades.map((grade) => (
            <TableRow key={grade._id}>
              <TableCell>{grade.name}</TableCell>
              <TableCell>{grade.level}</TableCell>
              <TableCell>
                <Dialog open={isEditingGrade} onOpenChange={setIsEditingGrade}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingGrade(grade)
                        setName(grade.name)
                        setLevel(grade.level.toString())
                        setIsEditingGrade(true)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل القب العلمي</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateGrade} className="space-y-4">
                      <Input
                        placeholder="الدرجة الوظيفية"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <Input
                        type="number"
                        placeholder="المرحلة"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                      />
                      <Button type="submit">تحديث</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={() => handleDeleteGrade(grade._id)} className="mr-2">
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

