"use client"

import { useState, useEffect } from "react"
import type { Certificate } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchCertificates, createCertificate, updateCertificate, deleteCertificate } from "@/utils/api"

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isAddingCertificate, setIsAddingCertificate] = useState(false)
  const [isEditingCertificate, setIsEditingCertificate] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null)
  const [newCertificateName, setNewCertificateName] = useState("")

  useEffect(() => {
    fetchCertificatesData()
  }, [])

  const fetchCertificatesData = async () => {
    try {
      const data = await fetchCertificates()
      setCertificates(data)
    } catch (error) {
      console.error("Error fetching certificates:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب الشهادات",
        variant: "destructive",
      })
    }
  }

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCertificate({ name: newCertificateName })
      fetchCertificatesData()
      setIsAddingCertificate(false)
      setNewCertificateName("")
      toast({
        title: "نجاح",
        description: "تمت إضافة الشهادة بنجاح",
      })
    } catch (error) {
      console.error("Error creating certificate:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة الشهادة",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCertificate) return
    try {
      await updateCertificate({ ...editingCertificate, name: newCertificateName })
      fetchCertificatesData()
      setIsEditingCertificate(false)
      setEditingCertificate(null)
      setNewCertificateName("")
      toast({
        title: "نجاح",
        description: "تم تحديث الشهادة بنجاح",
      })
    } catch (error) {
      console.error("Error updating certificate:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث الشهادة",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCertificate = async (id: string) => {
    try {
      await deleteCertificate(id)
      fetchCertificatesData()
      toast({
        title: "نجاح",
        description: "تم حذف الشهادة بنجاح",
      })
    } catch (error) {
      console.error("Error deleting certificate:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف الشهادة",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">الشهادات</h1>
        <Dialog open={isAddingCertificate} onOpenChange={setIsAddingCertificate}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingCertificate(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة شهادة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة شهادة جديدة</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCertificate} className="space-y-4">
              <Input
                placeholder="اسم الشهادة"
                value={newCertificateName}
                onChange={(e) => setNewCertificateName(e.target.value)}
                required
              />
              <Button type="submit">إضافة الشهادة</Button>
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
          {certificates.map((certificate) => (
            <TableRow key={certificate.id}>
              <TableCell>{certificate.name}</TableCell>
              <TableCell>
                <Dialog open={isEditingCertificate} onOpenChange={setIsEditingCertificate}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCertificate(certificate)
                        setNewCertificateName(certificate.name)
                        setIsEditingCertificate(true)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تعديل الشهادة</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateCertificate} className="space-y-4">
                      <Input
                        placeholder="اسم الشهادة"
                        value={newCertificateName}
                        onChange={(e) => setNewCertificateName(e.target.value)}
                        required
                      />
                      <Button type="submit">تحديث الشهادة</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCertificate(certificate.id)}
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

