"use client"

import { useState, useEffect } from "react"
import type {
  DepartmentRequirement,
  Department,
  Certificate,
  College,
  GeneralSpecialization,
  Subspecialty,
  Employee,
  EmployeeSuggestion,
} from "@/types"
import { Button } from "@/components/ui/button"
import { PlusIcon, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RequirementsList } from "@/components/RequirementsList"
import { SuggestionsList } from "@/components/SuggestionsList"
import { RequirementForm } from "@/components/RequirementForm"
import {
  fetchDepartmentRequirements,
  fetchColleges,
  fetchDepartments,
  fetchCertificates,
  fetchGeneralSpecializations,
  fetchSubspecialties,
  fetchEmployees,
  fetchSuggestionsForRequirement,
  createDepartmentRequirement,
  updateDepartmentRequirement,
  deleteDepartmentRequirement,
} from "@/utils/api"

export default function DepartmentRequirementsPage() {
  const [requirements, setRequirements] = useState<DepartmentRequirement[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [generalSpecializations, setGeneralSpecializations] = useState<GeneralSpecialization[]>([])
  const [subspecialties, setSubspecialties] = useState<Subspecialty[]>([])
  const [isAddingRequirement, setIsAddingRequirement] = useState(false)
  const [isEditingRequirement, setIsEditingRequirement] = useState(false)
  const [editingRequirement, setEditingRequirement] = useState<DepartmentRequirement | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [suggestions, setSuggestions] = useState<EmployeeSuggestion[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [
        requirementsData,
        collegesData,
        departmentsData,
        certificatesData,
        generalSpecializationsData,
        subspecialtiesData,
        employeesData,
      ] = await Promise.all([
        fetchDepartmentRequirements(),
        fetchColleges(),
        fetchDepartments(),
        fetchCertificates(),
        fetchGeneralSpecializations(),
        fetchSubspecialties(),
        fetchEmployees(),
      ])

      setRequirements(requirementsData || [])
      setColleges(collegesData || [])
      setDepartments(departmentsData || [])
      setCertificates(certificatesData || [])
      setGeneralSpecializations(generalSpecializationsData || [])
      setSubspecialties(subspecialtiesData || [])
      setEmployees(employeesData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب البيانات",
        variant: "destructive",
      })
    }
  }

  const handleCreateRequirement = async (requirement: Omit<DepartmentRequirement, "id">) => {
    if (
      !requirement.departmentId ||
      (requirement.administrative.length === 0 &&
        requirement.teaching.length === 0 &&
        requirement.technician.length === 0)
    ) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة متطلبات للقسم قبل الإرسال",
        variant: "destructive",
      })
      return
    }

    try {
      await createDepartmentRequirement(requirement)
      fetchData()
      setIsAddingRequirement(false)
      toast({
        title: "نجاح",
        description: "تمت إضافة متطلبات القسم بنجاح",
      })
    } catch (error) {
      console.error("Error creating department requirement:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة متطلبات القسم",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRequirement = async (requirement: DepartmentRequirement) => {
    try {
      await updateDepartmentRequirement(requirement)
      fetchData()
      setIsEditingRequirement(false)
      setEditingRequirement(null)
      toast({
        title: "نجاح",
        description: "تم تحديث متطلبات القسم بنجاح",
      })
    } catch (error) {
      console.error("Error updating department requirement:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث متطلبات القسم",
        variant: "destructive",
      })
    }
  }

  const handleDeleteRequirement = async (id: string) => {
    try {
      await deleteDepartmentRequirement(id)
      fetchData()
      toast({
        title: "نجاح",
        description: "تم حذف متطلبات القسم بنجاح",
      })
    } catch (error) {
      console.error("Error deleting department requirement:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف متطلبات القسم",
        variant: "destructive",
      })
    }
  }

  const handleFetchSuggestions = async (requirementId: string) => {
    try {
      const suggestionsData = await fetchSuggestionsForRequirement(requirementId)
      setSuggestions(suggestionsData.suggestions)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب الاقتراحات",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">متطلبات الأقسام</h1>
        <Dialog open={isAddingRequirement} onOpenChange={setIsAddingRequirement}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingRequirement(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add Requirements
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة متطلبات قسم جديدة</DialogTitle>
            </DialogHeader>
            <RequirementForm
              colleges={colleges}
              departments={departments}
              certificates={certificates}
              generalSpecializations={generalSpecializations}
              subspecialties={subspecialties}
              onSubmit={handleCreateRequirement}
            />
            <Button type="submit" form="requirement-form" className="mt-4">
              إرسال المتطلبات
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      {requirements.map((requirement) => {
        const department = departments.find((d) => d.id === requirement.departmentId)
        const college = colleges.find((c) => c.id === department?.collegeId)

        return (
          <Card key={requirement.id} className="mb-6">
            <CardHeader>
              <CardTitle>{department?.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{college?.name}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">المتطلبات</h3>
                  <RequirementsList
                    requirement={requirement}
                    certificates={certificates}
                    generalSpecializations={generalSpecializations}
                    subspecialties={subspecialties}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">الاقتراحات</h3>
                  <Button onClick={() => handleFetchSuggestions(requirement.id)} className="mb-2">
                    جلب الاقتراحات
                  </Button>
                  {suggestions.length > 0 && (
                    <ScrollArea className="h-[300px]">
                      <SuggestionsList
                        suggestions={suggestions}
                        certificates={certificates}
                        generalSpecializations={generalSpecializations}
                        subspecialties={subspecialties}
                      />
                    </ScrollArea>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Dialog open={isEditingRequirement} onOpenChange={setIsEditingRequirement}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingRequirement(requirement)
                        setIsEditingRequirement(true)
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Department Requirements</DialogTitle>
                    </DialogHeader>
                    <RequirementForm
                      colleges={colleges}
                      departments={departments}
                      certificates={certificates}
                      generalSpecializations={generalSpecializations}
                      subspecialties={subspecialties}
                      onSubmit={handleUpdateRequirement}
                      initialData={editingRequirement}
                    />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={() => handleDeleteRequirement(requirement.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

