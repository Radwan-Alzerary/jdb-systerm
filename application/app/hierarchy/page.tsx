"use client"

import { useState, useEffect } from "react"
import type {
  College,
  Department,
  Employee,
  EmployeeType,
  Certificate,
  GeneralSpecialization,
  Subspecialty,
  Position,
  Workplace,
  JobGrade,
} from "@/types"
import { Button } from "@/components/ui/button"
import { PlusIcon, Users, GraduationCap, Wrench } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  fetchColleges,
  fetchDepartments,
  fetchEmployees,
  createEmployee,
  fetchCertificates,
  fetchGeneralSpecializations,
  fetchSubspecialties,
  fetchPositions,
  fetchWorkplaces,
  fetchJobGrades,
  updateEmployee,
} from "@/utils/api"
import { EmployeeSelector } from "@/components/EmployeeSelector"

type EmployeeCategory = "إداري" | "تدريسي" | "فني"

interface HierarchyEmployee extends Employee {
  category: EmployeeCategory
}

interface HierarchyDepartment extends Department {
  employees: {
    إداري: HierarchyEmployee[]
    تدريسي: HierarchyEmployee[]
    فني: HierarchyEmployee[]
  }
}

interface HierarchyCollege extends College {
  departments: HierarchyDepartment[]
}

const categoryIcons = {
  إداري: Users,
  تدريسي: GraduationCap,
  فني: Wrench,
}

export default function HierarchyPage() {
  const [hierarchyData, setHierarchyData] = useState<HierarchyCollege[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [generalSpecializations, setGeneralSpecializations] = useState<GeneralSpecialization[]>([])
  const [subspecialties, setSubspecialties] = useState<Subspecialty[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [workplaces, setWorkplaces] = useState<Workplace[]>([])
  const [jobGrades, setJobGrades] = useState<JobGrade[]>([])
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<EmployeeCategory | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    fetchHierarchy()
  }, [])

  const fetchHierarchy = async () => {
    try {
      const [
        collegesData,
        departmentsData,
        employeesData,
        certificatesData,
        generalSpecializationsData,
        subspecialtiesData,
        positionsData,
        workplacesData,
        jobGradesData,
      ] = await Promise.all([
        fetchColleges(),
        fetchDepartments(),
        fetchEmployees(),
        fetchCertificates(),
        fetchGeneralSpecializations(),
        fetchSubspecialties(),
        fetchPositions(),
        fetchWorkplaces(),
        fetchJobGrades(),
      ])

      const hierarchyData: HierarchyCollege[] = collegesData.map((college: College) => ({
        ...college,
        departments: departmentsData
          .filter((dept: Department) => dept.collegeId === college.id)
          .map((dept: Department) => ({
            ...dept,
            employees: {
              إداري: [],
              تدريسي: [],
              فني: [],
            },
          })),
      }))

      employeesData.forEach((employee: Employee) => {
        const college = hierarchyData.find((c) => c.id === employee.collegeId)
        if (college) {
          const department = college.departments.find((d) => d.id === employee.departmentId)
          if (department) {
            const category: EmployeeCategory =
              employee.type === "Full-time" ? "تدريسي" : employee.type === "Part-time" ? "إداري" : "فني"
            department.employees[category].push({ ...employee, category })
          }
        }
      })

      setHierarchyData(hierarchyData)
      setCertificates(certificatesData)
      setGeneralSpecializations(generalSpecializationsData)
      setSubspecialties(subspecialtiesData)
      setPositions(positionsData)
      setWorkplaces(workplacesData)
      setJobGrades(jobGradesData)
      setEmployees(employeesData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات الهيكل التنظيمي",
        variant: "destructive",
      })
    }
  }

  const handleAddEmployee = async (employee: Omit<Employee, "id">) => {
    if (!selectedDepartment || !selectedCategory) return

    try {
      await createEmployee(employee)
      fetchHierarchy()
      setIsAddingEmployee(false)
      toast({
        title: "نجاح",
        description: "تمت إضافة الموظف بنجاح",
      })
    } catch (error) {
      console.error("Error adding employee:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة الموظف",
        variant: "destructive",
      })
    }
  }

  const handleMoveEmployee = async (employeeId: string, newDepartmentId: string, newCategory: EmployeeCategory) => {
    const employee = employees.find((e) => e.id === employeeId)
    if (!employee) return

    const updatedEmployee: Employee = {
      ...employee,
      departmentId: newDepartmentId,
      type: newCategory === "تدريسي" ? "Full-time" : newCategory === "إداري" ? "Part-time" : "Contract",
    }

    try {
      await updateEmployee(updatedEmployee)
      fetchHierarchy()
      setIsAddingEmployee(false)
      toast({
        title: "نجاح",
        description: "تم نقل الموظف بنجاح",
      })
    } catch (error) {
      console.error("Error moving employee:", error)
      toast({
        title: "خطأ",
        description: "فشل في نقل الموظف",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">الهيكل التنظيمي</h1>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {hierarchyData.map((college) => (
          <AccordionItem value={college.id} key={college.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-2 hover:bg-accent hover:text-accent-foreground">
              <h2 className="text-xl font-semibold">{college.name}</h2>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 space-y-4">
                {college.departments.map((department) => (
                  <Card key={department.id}>
                    <CardHeader>
                      <CardTitle>{department.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(["إداري", "تدريسي", "فني"] as const).map((category) => {
                          const Icon = categoryIcons[category]
                          return (
                            <Card key={category} className="overflow-hidden">
                              <CardHeader className="bg-primary text-primary-foreground">
                                <CardTitle className="flex items-center text-lg">
                                  <Icon className="ml-2 h-5 w-5" />
                                  {category}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="p-0">
                                <ScrollArea className="h-[200px] p-4">
                                  {department.employees[category].length > 0 ? (
                                    <ul className="space-y-2">
                                      {department.employees[category].map((employee) => (
                                        <li key={employee.id} className="text-sm flex items-center justify-between">
                                          <span>{employee.name}</span>
                                          {employee.isAssigned && (
                                            <Badge variant="outline" className="ml-2">
                                              منسب
                                            </Badge>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-muted-foreground p-4">لا يوجد موظفون في هذه الفئة</p>
                                  )}
                                </ScrollArea>
                                <div className="p-4 bg-muted">
                                  <Dialog
                                    open={
                                      isAddingEmployee &&
                                      selectedDepartment === department.id &&
                                      selectedCategory === category
                                    }
                                    onOpenChange={(open) => {
                                      setIsAddingEmployee(open)
                                      if (open) {
                                        setSelectedDepartment(department.id)
                                        setSelectedCategory(category)
                                      } else {
                                        setSelectedDepartment(null)
                                        setSelectedCategory(null)
                                      }
                                    }}
                                  >
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => {
                                          setSelectedDepartment(department.id)
                                          setSelectedCategory(category)
                                          setIsAddingEmployee(true)
                                        }}
                                      >
                                        <PlusIcon className="h-4 w-4 ml-2" /> إضافة موظف
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>إضافة موظف للقسم</DialogTitle>
                                      </DialogHeader>
                                      <EmployeeSelector
                                        employees={employees.filter((e) => e.departmentId !== department.id)}
                                        onSelectEmployee={(employeeId) =>
                                          handleMoveEmployee(employeeId, department.id, category)
                                        }
                                        onAddEmployee={(employee) =>
                                          handleAddEmployee({ ...employee, departmentId: department.id })
                                        }
                                        category={category}
                                        certificates={certificates}
                                        generalSpecializations={generalSpecializations}
                                        subspecialties={subspecialties}
                                        positions={positions}
                                        workplaces={workplaces}
                                        colleges={hierarchyData}
                                        departments={
                                          department.collegeId
                                            ? hierarchyData.find((c) => c.id === department.collegeId)?.departments ||
                                              []
                                            : []
                                        }
                                        jobGrades={jobGrades}
                                      />
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

