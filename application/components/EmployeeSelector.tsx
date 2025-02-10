import { useState } from "react"
import type { Employee, EmployeeCategory } from "@/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EmployeeForm } from "@/components/EmployeeForm"
import { Autocomplete } from "@/components/ui/autocomplete"
import { Badge } from "@/components/ui/badge"

interface EmployeeSelectorProps {
  employees: Employee[]
  onSelectEmployee: (employeeId: string) => void
  onAddEmployee: (employee: Omit<Employee, "id">) => void
  category: EmployeeCategory
  certificates: any[]
  generalSpecializations: any[]
  subspecialties: any[]
  positions: any[]
  workplaces: any[]
  colleges: any[]
  departments: any[]
  jobGrades: any[]
}

export function EmployeeSelector({
  employees,
  onSelectEmployee,
  onAddEmployee,
  category,
  certificates,
  generalSpecializations,
  subspecialties,
  positions,
  workplaces,
  colleges,
  departments,
  jobGrades,
}: EmployeeSelectorProps) {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
console.log(employees)
  const employeeOptions = employees.map((employee) => ({
    value: employee._id,
    label: (
      <div className="flex items-center justify-between w-full">
        <span>{employee.name}</span>
        {employee.isAssigned && (
          <Badge variant="outline" className="ml-2">
            منسب
          </Badge>
        )}
      </div>
    ),
  }))

  return (
    <div className="space-y-4">
      <Autocomplete options={employeeOptions} onSelect={onSelectEmployee} placeholder="اختر موظفًا موجودًا" />
      <div className="text-center">
        <span className="text-sm text-muted-foreground">أو</span>
      </div>
      <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            إضافة موظف جديد
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة موظف جديد</DialogTitle>
          </DialogHeader>
          <EmployeeForm
            onSubmit={(employee) => {
              onAddEmployee(employee)
              setIsAddingEmployee(false)
            }}
            certificates={certificates}
            generalSpecializations={generalSpecializations}
            subspecialties={subspecialties}
            positions={positions}
            workplaces={workplaces}
            colleges={colleges}
            departments={departments}
            jobGrades={jobGrades}
            employee={
              {
                type: category === "تدريسي" ? "Full-time" : category === "إداري" ? "Part-time" : "Contract",
                isAssigned: false,
              } as Employee
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

