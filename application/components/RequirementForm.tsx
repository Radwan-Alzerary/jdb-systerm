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
  colleges: College[]
  departments: Department[]
  certificates: Certificate[]
  generalSpecializations: GeneralSpecialization[]
  subspecialties: Subspecialty[]
  onSubmit: (requirement: Omit<DepartmentRequirement, "id">) => void
  initialData?: DepartmentRequirement
}

export function RequirementForm({
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
    initialData ? departments.find((d) => d.id === initialData.departmentId)?.collegeId || "" : "",
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addCategoryRequirement =
    (category: keyof Omit<DepartmentRequirement, "id" | "departmentId">) => (e: React.MouseEvent) => {
      e.preventDefault() // Prevent form submission
      setFormData((prev) => ({
        ...prev,
        [category]: [
          ...(prev[category] || []),
          {
            id: Date.now().toString(),
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
      id="requirement-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
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
                <SelectItem key={college.id} value={college.id}>
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
                  <SelectItem key={dept.id} value={dept.id}>
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
                    options={certificates.map((cert) => ({ label: cert.name, value: cert.id }))}
                    selected={req.requiredCertificateIds}
                    onChange={(selected) =>
                      updateCategoryRequirement(category, index, "requiredCertificateIds", selected)
                    }
                  />
                  <CheckboxGroup
                    label="التخصصات العامة المطلوبة"
                    options={generalSpecializations.map((gs) => ({ label: gs.name, value: gs.id }))}
                    selected={req.requiredGeneralSpecializationIds}
                    onChange={(selected) =>
                      updateCategoryRequirement(category, index, "requiredGeneralSpecializationIds", selected)
                    }
                  />
                  <CheckboxGroup
                    label="التخصصات الدقيقة المطلوبة"
                    options={subspecialties.map((sub) => ({ label: sub.name, value: sub.id }))}
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

