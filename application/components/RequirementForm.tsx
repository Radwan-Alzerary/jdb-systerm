import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import type {
  DepartmentRequirement,
  CategoryRequirement,
  Certificate,
  GeneralSpecialization,
  Subspecialty,
  College,
  Department,
} from "@/types"

interface RequirementFormProps {
  id?: string // Allow passing an id prop
  colleges: College[]
  departments: Department[]
  certificates: Certificate[]
  generalSpecializations: GeneralSpecialization[]
  subspecialties: Subspecialty[]
  onSubmit: (requirement: Omit<DepartmentRequirement, "id">) => void
  initialData?: DepartmentRequirement
}

export function RequirementForm({
  id = "requirement-form", // default id if none is provided
  colleges,
  departments,
  certificates,
  generalSpecializations,
  subspecialties,
  onSubmit,
  initialData,
}: RequirementFormProps) {
  const [formData, setFormData] = useState<Omit<DepartmentRequirement, "id">>({
    departmentId: initialData?.departmentId || "",
    administrative: initialData?.administrative || [],
    teaching: initialData?.teaching || [],
    technician: initialData?.technician || [],
  })

  const [collegeId, setCollegeId] = useState<string>(
    initialData ? departments.find((d) => d._id === initialData.departmentId)?.collegeId || "" : "",
  )

  // Function to remove any client-side "id" keys from the category requirements
  const cleanCategory = (items: CategoryRequirement[]) =>
    items.map(({ id, ...rest }) => rest)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanedFormData = {
      ...formData,
      administrative: cleanCategory(formData.administrative),
      teaching: cleanCategory(formData.teaching),
      technician: cleanCategory(formData.technician),
    }
    onSubmit(cleanedFormData)
  }

  const addCategoryRequirement =
    (category: keyof Omit<DepartmentRequirement, "id" | "departmentId">) => (e: React.MouseEvent) => {
      e.preventDefault() // Prevent form submission
      setFormData((prev) => ({
        ...prev,
        [category]: [
          ...(prev[category] || []),
          {
            id: Date.now().toString(), // This client-side id will be removed on submit
            numberOfEmployees: 0,
            requiredCertificateIds: [],
            requiredGeneralSpecializationIds: [],
            requiredSubspecialtyIds: [],
          },
        ],
      }))
    }

  const updateCategoryRequirement = (
    category: keyof Omit<DepartmentRequirement, "id" | "departmentId">,
    index: number,
    field: keyof CategoryRequirement,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].map((req, i) => (i === index ? { ...req, [field]: value } : req)),
    }))
  }

  const removeCategoryRequirement = (
    category: keyof Omit<DepartmentRequirement, "id" | "departmentId">,
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }))
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="collegeId">الكلية</Label>
          <Select
            value={collegeId}
            onValueChange={(value) => {
              setCollegeId(value)
              setFormData((prev) => ({ ...prev, departmentId: "" }))
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الكلية" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map((college) => (
                <SelectItem key={college._id} value={college._id}>
                  {college.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="departmentId">القسم</Label>
          <Select
            value={formData.departmentId}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, departmentId: value }))}
            disabled={!collegeId}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر القسم" />
            </SelectTrigger>
            <SelectContent>
              {departments
                .filter((dept) => dept.collegeId === collegeId)
                .map((dept) => (
                  <SelectItem key={dept._id} value={dept._id}>
                    {dept.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="administrative">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="administrative">إداري</TabsTrigger>
          <TabsTrigger value="teaching">تدريسي</TabsTrigger>
          <TabsTrigger value="technician">فني</TabsTrigger>
        </TabsList>
        {(["administrative", "teaching", "technician"] as const).map((category) => (
          <TabsContent key={category} value={category}>
            {formData[category].map((req, index) => (
              // Use req.id for client-side keys only
              <Card key={req.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">المتطلب {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`${category}-${index}-numberOfEmployees`}>عدد الموظفين</Label>
                    <Input
                      type="number"
                      id={`${category}-${index}-numberOfEmployees`}
                      value={req.numberOfEmployees}
                      onChange={(e) =>
                        updateCategoryRequirement(category, index, "numberOfEmployees", Number(e.target.value))
                      }
                      min={0}
                    />
                  </div>
                  <CheckboxGroup
                    label="الشهادات المطلوبة"
                    options={certificates.map((cert) => ({ label: cert.name, value: cert._id }))}
                    selected={req.requiredCertificateIds}
                    onChange={(selected) =>
                      updateCategoryRequirement(category, index, "requiredCertificateIds", selected)
                    }
                  />
                  <CheckboxGroup
                    label="التخصصات العامة المطلوبة"
                    options={generalSpecializations.map((gs) => ({ label: gs.name, value: gs._id }))}
                    selected={req.requiredGeneralizationIds || req.requiredGeneralSpecializationIds}
                    onChange={(selected) =>
                      updateCategoryRequirement(category, index, "requiredGeneralSpecializationIds", selected)
                    }
                  />
                  <CheckboxGroup
                    label="التخصصات الدقيقة المطلوبة"
                    options={subspecialties.map((sub) => ({ label: sub.name, value: sub._id }))}
                    selected={req.requiredSubspecialtyIds}
                    onChange={(selected) =>
                      updateCategoryRequirement(category, index, "requiredSubspecialtyIds", selected)
                    }
                  />
                  <Button variant="destructive" onClick={() => removeCategoryRequirement(category, index)}>
                    حذف المتطلب
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button onClick={addCategoryRequirement(category)}>
              إضافة متطلب {category === "administrative" ? "إداري" : category === "teaching" ? "تدريسي" : "فني"}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </form>
  )
}
