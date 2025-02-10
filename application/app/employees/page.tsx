"use client"

import { useState, useEffect } from "react"
import type {
  Employee,
  Department,
  College,
  Certificate,
  GeneralSpecialization,
  Subspecialty,
  Position,
  Workplace,
  JobGrade,
} from "@/types"
import { Button } from "@/components/ui/button"
import { PlusIcon, Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast"
import { EmployeeForm } from "@/components/EmployeeForm"
import {
  fetchEmployees,
  fetchDepartments,
  fetchColleges,
  fetchCertificates,
  fetchGeneralSpecializations,
  fetchSubspecialties,
  fetchPositions,
  fetchWorkplaces,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchJobGrades,
} from "@/utils/api"

export default function EmployeesPage() {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [generalSpecializations, setGeneralSpecializations] = useState<GeneralSpecialization[]>([])
  const [subspecialties, setSubspecialties] = useState<Subspecialty[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [workplaces, setWorkplaces] = useState<Workplace[]>([])
  const [jobGrades, setJobGrades] = useState<JobGrade[]>([])
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [
        employeesData,
        departmentsData,
        collegesData,
        certificatesData,
        generalSpecializationsData,
        subspecialtiesData,
        positionsData,
        workplacesData,
        jobGradesData,
      ] = await Promise.all([
        fetchEmployees(),
        fetchDepartments(),
        fetchColleges(),
        fetchCertificates(),
        fetchGeneralSpecializations(),
        fetchSubspecialties(),
        fetchPositions(),
        fetchWorkplaces(),
        fetchJobGrades(),
      ])

      setEmployees(employeesData)
      setDepartments(departmentsData)
      setColleges(collegesData)
      setCertificates(certificatesData)
      setGeneralSpecializations(generalSpecializationsData)
      setSubspecialties(subspecialtiesData)
      setPositions(positionsData)
      setWorkplaces(workplacesData)
      setJobGrades(jobGradesData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "خطأ",
        description: "فشل في جلب البيانات",
        variant: "destructive",
      })
    }
  }

  const handleCreate = async (employee: Omit<Employee, "id">) => {
    try {
      await createEmployee(employee)
      fetchData()
      setIsAddingEmployee(false)
      toast({
        title: "نجاح",
        description: "تمت إضافة الموظف بنجاح",
      })
    } catch (error) {
      console.error("Error creating employee:", error)
      toast({
        title: "خطأ",
        description: "فشل في إضافة الموظف",
        variant: "destructive",
      })
    }
  }

  const handleUpdate = async (employee: Employee) => {
    try {
      await updateEmployee(employee)
      fetchData()
      setEditingEmployee(null)
      toast({
        title: "نجاح",
        description: "تم تحديث بيانات الموظف بنجاح",
      })
    } catch (error) {
      console.error("Error updating employee:", error)
      toast({
        title: "خطأ",
        description: "فشل في تحديث بيانات الموظف",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id)
      fetchData()
      toast({
        title: "نجاح",
        description: "تم حذف الموظف بنجاح",
      })
    } catch (error) {
      console.error("Error deleting employee:", error)
      toast({
        title: "خطأ",
        description: "فشل في حذف الموظف",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">الموظفون</h1>
        <Dialog
          open={isAddingEmployee}
          onOpenChange={(open) => {
            setIsAddingEmployee(open)
            if (!open) setEditingEmployee(null)
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingEmployee(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> {editingEmployee ? "Edit Employee" : "Add Employee"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              onSubmit={editingEmployee ? handleUpdate : handleCreate}
              certificates={certificates}
              generalSpecializations={generalSpecializations}
              subspecialties={subspecialties}
              positions={positions}
              workplaces={workplaces}
              colleges={colleges}
              departments={departments}
              jobGrades={jobGrades}
              employee={editingEmployee}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>صنف الملاك</TableHead>
            <TableHead>الشهادة</TableHead>
            <TableHead>التخصص العام</TableHead>
            <TableHead>التخصص الدقيق</TableHead>
            <TableHead>المنصب</TableHead>
            <TableHead>مكان العمل</TableHead>
            <TableHead>الكلية</TableHead>
            <TableHead>القسم</TableHead>
            <TableHead>القب العلمي</TableHead>
            <TableHead>التعيين</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{`${employee.name.split(" ")[0]} ${employee.name.split(" ")[1]} ${employee.name.split(" ")[2]} ${employee.name.split(" ")[3]}`}</TableCell>
              <TableCell>
                {employee.type === "Full-time" ? "ملاك" : employee.type === "Part-time" ? "منسب" : "عقد"}
              </TableCell>
              <TableCell>{certificates.find((c) => c._id === employee.certificateId)?.name}</TableCell>
              <TableCell>
                {generalSpecializations.find((gs) => gs._id === employee.generalSpecializationId)?.name}
              </TableCell>
              <TableCell>{subspecialties.find((s) => s._id === employee.subspecialtyId)?.name}</TableCell>
              <TableCell>{positions.find((p) => p._id === employee.positionId)?.name}</TableCell>
              <TableCell>{workplaces.find((w) => w._id === employee.workplaceId)?.name}</TableCell>
              <TableCell>{colleges.find((c) => c._id === employee.collegeId)?.name}</TableCell>
              <TableCell>{departments.find((d) => d._id === employee.departmentId)?.name}</TableCell>
              <TableCell>{jobGrades.find((j) => j._id === employee.jobGradeId)?.name}</TableCell>
              <TableCell>
                {employee.isAssigned ? (
                  <>
                    منسب من: {employee.assignedFrom}
                    <br />
                    منسب الى: {employee.assignedTo}
                  </>
                ) : (
                  "غير منسب"
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingEmployee(employee)
                        setIsAddingEmployee(true)
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
                    </DialogHeader>
                    <EmployeeForm
                      employee={editingEmployee}
                      onSubmit={editingEmployee ? handleUpdate : handleCreate}
                      certificates={certificates}
                      generalSpecializations={generalSpecializations}
                      subspecialties={subspecialties}
                      positions={positions}
                      workplaces={workplaces}
                      colleges={colleges}
                      departments={departments}
                      jobGrades={jobGrades}
                    />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={() => handleDelete(employee._id)} className="ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

