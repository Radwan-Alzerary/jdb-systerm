"use client"

import { useState, useEffect } from "react"
import type { Department, College } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment, fetchColleges } from "@/utils/api"

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [isAddingDepartment, setIsAddingDepartment] = useState(false)
  const [isEditingDepartment, setIsEditingDepartment] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [newDepartmentName, setNewDepartmentName] = useState("")
  const [selectedCollegeId, setSelectedCollegeId] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [departmentsData, collegesData] = await Promise.all([fetchDepartments(), fetchColleges()])
      setDepartments(departmentsData)
      setColleges(collegesData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب البيانات",
        variant: "destructive",
      })
    }
  }

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createDepartment({ name: newDepartmentName, collegeId: selectedCollegeId })
      fetchData()
      setIsAddingDepartment(false)
      setNewDepartmentName("")
      setSelectedCollegeId("")
      toast({
        title: "نجاح",
        description: "تمت إضافة القسم بنجاح",
      })
    } catch (error) {
      console.error("Error creating department:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة القسم",
        variant: "destructive",
      })
    }
  }

  const handleUpdateDepartment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingDepartment) return
    try {
      await updateDepartment({ ...editingDepartment, name: newDepartmentName, collegeId: selectedCollegeId })
      fetchData()
      setIsEditingDepartment(false)
      setEditingDepartment(null)
      setNewDepartmentName("")
      setSelectedCollegeId("")
      toast({
        title: "نجاح",
        description: "تم تحديث القسم بنجاح",
      })
    } catch (error) {
      console.error("Error updating department:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث القسم",
        variant: "destructive",
      })
    }
  }

  const handleDeleteDepartment = async (id: string) => {
    try {
      await deleteDepartment(id)
      fetchData()
      toast({
        title: "نجاح",
        description: "تم حذف القسم بنجاح",
      })
    } catch (error) {
      console.error("Error deleting department:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف القسم",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">الأقسام</h1>
        <Dialog open={isAddingDepartment} onOpenChange={setIsAddingDepartment}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingDepartment(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة قسم
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة قسم جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateDepartment} className="space-y-4">
              <Input
                placeholder="اسم القسم"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                required
              />
              <Select value={selectedCollegeId} onValueChange={setSelectedCollegeId}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الكلية" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit">إضافة القسم</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>الكلية</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.id}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{colleges.find((c) => c.id === department.collegeId)?.name}</TableCell>
              <TableCell>
                <Dialog open={isEditingDepartment} onOpenChange={setIsEditingDepartment}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingDepartment(department)
                        setNewDepartmentName(department.name)
                        setSelectedCollegeId(department.collegeId)
                        setIsEditingDepartment(true)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل القسم</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateDepartment} className="space-y-4">
                      <Input
                        placeholder="اسم القسم"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                        required
                      />
                      <Select value={selectedCollegeId} onValueChange={setSelectedCollegeId}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الكلية" />
                        </SelectTrigger>
                        <SelectContent>
                          {colleges.map((college) => (
                            <SelectItem key={college.id} value={college.id}>
                              {college.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="submit">تحديث القسم</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteDepartment(department.id)}
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

