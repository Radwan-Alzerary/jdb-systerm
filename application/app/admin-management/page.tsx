"use client"

import { useState, useEffect } from "react"
import type { Admin, College, Department } from "@/types"
import { Button } from "@/components/ui/button"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { AdminForm } from "@/components/AdminForm"
import { fetchAdmins, createAdmin, updateAdmin, deleteAdmin, fetchColleges, fetchDepartments } from "@/utils/api"

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [adminsData, collegesData, departmentsData] = await Promise.all([
        fetchAdmins(),
        fetchColleges(),
        fetchDepartments(),
      ])
      setAdmins(adminsData)
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

  const handleCreateAdmin = async (admin: Omit<Admin, "id">) => {
    try {
      await createAdmin(admin)
      fetchData()
      setIsAddingAdmin(false)
      toast({
        title: "نجاح",
        description: "تمت إضافة المسؤول بنجاح",
      })
    } catch (error) {
      console.error("Error creating admin:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة المسؤول",
        variant: "destructive",
      })
    }
  }

  const handleUpdateAdmin = async (admin: Admin) => {
    try {
      await updateAdmin(admin)
      fetchData()
      setEditingAdmin(null)
      toast({
        title: "نجاح",
        description: "تم تحديث المسؤول بنجاح",
      })
    } catch (error) {
      console.error("Error updating admin:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث المسؤول",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAdmin = async (id: string) => {
    try {
      await deleteAdmin(id)
      fetchData()
      toast({
        title: "نجاح",
        description: "تم حذف المسؤول بنجاح",
      })
    } catch (error) {
      console.error("Error deleting admin:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف المسؤول",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة المسؤولين</h1>
        <Dialog open={isAddingAdmin} onOpenChange={setIsAddingAdmin}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة مسؤول
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مسؤول جديد</DialogTitle>
            </DialogHeader>
            <AdminForm onSubmit={handleCreateAdmin} colleges={colleges} departments={departments} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>الدور</TableHead>
            <TableHead>الكيان</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                {admin.role === "full" ? "مدير كامل" : admin.role === "college" ? "مدير كلية" : "مدير قسم"}
              </TableCell>
              <TableCell>
                {admin.role === "college"
                  ? colleges.find((c) => c.id === admin.entityId)?.name
                  : admin.role === "department"
                    ? departments.find((d) => d.id === admin.entityId)?.name
                    : "-"}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setEditingAdmin(admin)}>
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل المسؤول</DialogTitle>
                    </DialogHeader>
                    <AdminForm
                      admin={admin}
                      onSubmit={handleUpdateAdmin}
                      colleges={colleges}
                      departments={departments}
                    />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={() => handleDeleteAdmin(admin.id)}>
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

