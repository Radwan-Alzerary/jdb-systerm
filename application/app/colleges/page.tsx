"use client"

import { useState, useEffect } from "react"
import type { College, Department } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil, ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  fetchColleges,
  createCollege,
  updateCollege,
  deleteCollege,
  fetchDepartments,
  createDepartment,
} from "@/utils/api"

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [isAddingCollege, setIsAddingCollege] = useState(false)
  const [isEditingCollege, setIsEditingCollege] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [newCollegeName, setNewCollegeName] = useState("")
  const [newDepartmentName, setNewDepartmentName] = useState("")
  const [addingDepartmentToCollegeId, setAddingDepartmentToCollegeId] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [collegesData, departmentsData] = await Promise.all([fetchColleges(), fetchDepartments()])
      setColleges(collegesData)
      setDepartments(departmentsData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب البيانات",
        variant: "destructive",
      })
    }
  }

  const handleCreateCollege = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCollege({ name: newCollegeName })
      fetchData()
      setIsAddingCollege(false)
      setNewCollegeName("")
      toast({
        title: "نجاح",
        description: "تمت إضافة الكلية بنجاح",
      })
    } catch (error) {
      console.error("Error creating college:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة الكلية",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCollege = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCollege) return
    try {
      await updateCollege({ ...editingCollege, name: newCollegeName })
      fetchData()
      setIsEditingCollege(false)
      setEditingCollege(null)
      setNewCollegeName("")
      toast({
        title: "نجاح",
        description: "تم تحديث الكلية بنجاح",
      })
    } catch (error) {
      console.error("Error updating college:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث الكلية",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCollege = async (id: string) => {
    try {
      await deleteCollege(id)
      fetchData()
      toast({
        title: "نجاح",
        description: "تم حذف الكلية بنجاح",
      })
    } catch (error) {
      console.error("Error deleting college:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف الكلية",
        variant: "destructive",
      })
    }
  }

  const handleAddDepartment = async (e: React.FormEvent, collegeId: string) => {
    e.preventDefault()
    try {
      await createDepartment({ name: newDepartmentName, collegeId })
      fetchData()
      setNewDepartmentName("")
      setAddingDepartmentToCollegeId(null)
      toast({
        title: "نجاح",
        description: "تمت إضافة القسم بنجاح",
      })
    } catch (error) {
      console.error("Error adding department:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة القسم",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">الكليات</h1>
        <Dialog open={isAddingCollege} onOpenChange={setIsAddingCollege}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingCollege(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة كلية
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة كلية جديدة</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCollege} className="space-y-4">
              <Input
                placeholder="اسم الكلية"
                value={newCollegeName}
                onChange={(e) => setNewCollegeName(e.target.value)}
                required
              />
              <Button type="submit">إضافة الكلية</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {colleges.map((college) => (
          <AccordionItem key={college.id} value={college.id}>
            <AccordionTrigger className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
              <span>{college.name}</span>
              <ChevronDown className="h-4 w-4" />
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-50 rounded-b-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">الأقسام</h3>
                <ul className="list-disc list-inside space-y-2">
                  {departments
                    .filter((dept) => dept.collegeId === college.id)
                    .map((dept) => (
                      <li key={dept.id}>{dept.name}</li>
                    ))}
                </ul>
                {addingDepartmentToCollegeId === college.id ? (
                  <form onSubmit={(e) => handleAddDepartment(e, college.id)} className="space-y-2">
                    <Input
                      placeholder="اسم القسم الجديد"
                      value={newDepartmentName}
                      onChange={(e) => setNewDepartmentName(e.target.value)}
                      required
                    />
                    <Button type="submit" size="sm">
                      إضافة القسم
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setAddingDepartmentToCollegeId(null)}
                    >
                      إلغاء
                    </Button>
                  </form>
                ) : (
                  <Button size="sm" onClick={() => setAddingDepartmentToCollegeId(college.id)}>
                    <PlusIcon className="mr-2 h-4 w-4" /> إضافة قسم
                  </Button>
                )}
              </div>
              <div className="flex space-x-2 mt-4">
                <Dialog open={isEditingCollege} onOpenChange={setIsEditingCollege}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCollege(college)
                        setNewCollegeName(college.name)
                        setIsEditingCollege(true)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل الكلية</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateCollege} className="space-y-4">
                      <Input
                        placeholder="اسم الكلية"
                        value={newCollegeName}
                        onChange={(e) => setNewCollegeName(e.target.value)}
                        required
                      />
                      <Button type="submit">تحديث الكلية</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={() => handleDeleteCollege(college.id)}>
                  حذف
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

