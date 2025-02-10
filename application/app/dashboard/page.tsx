"use client"

import { useState, useEffect } from "react"
import type { Employee, College, Department, DepartmentRequirement } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { calculateEmployeeStats, groupEmployeesByDepartment, groupDepartmentsByCollege } from "@/utils/helpers"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { fetchEmployees, fetchColleges, fetchDepartments, fetchDepartmentRequirements } from "@/utils/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [departmentRequirements, setDepartmentRequirements] = useState<DepartmentRequirement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesData, collegesData, departmentsData, requirementsData] = await Promise.all([
          fetchEmployees(),
          fetchColleges(),
          fetchDepartments(),
          fetchDepartmentRequirements(),
        ])
        setEmployees(employeesData)
        setColleges(collegesData)
        setDepartments(departmentsData)
        setDepartmentRequirements(requirementsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const employeeStats = calculateEmployeeStats(employees)
  const employeeTypeData = [
    { name: "ملاك", value: employeeStats.fullTimeEmployees },
    { name: "منسب", value: employeeStats.partTimeEmployees },
    { name: "عقد", value: employeeStats.contractEmployees },
  ]

  const groupedDepartments = groupDepartmentsByCollege(departments, colleges)
  const collegeEmployeeData = colleges.map((college) => ({
    name: college.name,
    employees:
      groupedDepartments[college._id]?.reduce(
        (sum, dept) => sum + employees.filter((e) => e.departmentId === dept._id).length,
        0,
      ) || 0,
  }))

  const groupedEmployees = groupEmployeesByDepartment(employees, departments)
  const departmentEmployeeData = departments.map((department) => ({
    name: department.name,
    employees: groupedEmployees[department._id]?.length || 0,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">عدد الموظفين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">عدد الكليات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{colleges.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">عدد الأقسام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>حالة الموظف</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={employeeTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {employeeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الموظفون حسب الكلية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={collegeEmployeeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="employees" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>توزيع الموظفين حسب الأقسام</CardTitle>
          </CardHeader>
          <CardContent>
            {departmentEmployeeData.map((dept, index) => (
              <div key={dept.name} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{dept.name}</span>
                  <span className="text-sm font-medium">{dept.employees}</span>
                </div>
                <Progress value={(dept.employees / employees.length) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>أعلى 5 أقسام حسب عدد الموظفين</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentEmployeeData.sort((a, b) => b.employees - a.employees).slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="employees" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>توزيع حالة الموظف حسب الكلية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={colleges.map((college) => ({
                    name: college.name,
                    "منسب": employees.filter((e) => e.collegeId === college._id && e.type === "Full-time").length,
                    "ملاك": employees.filter((e) => e.collegeId === college._id && e.type === "Part-time").length,
                    عقد: employees.filter((e) => e.collegeId === college._id && e.type === "Contract").length,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="منسب" stackId="a" fill="#8884d8" />
                  <Bar dataKey="ملاك" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="عقد" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>تحليل متطلبات الأقسام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((department) => {
                const requirement = departmentRequirements.find((req) => req.departmentId === department._id)
                const currentEmployees = employees.filter((e) => e.departmentId === department._id).length
                const requiredEmployees = requirement
                  ? requirement.administrative.reduce((sum, req) => sum + req.numberOfEmployees, 0) +
                    requirement.teaching.reduce((sum, req) => sum + req.numberOfEmployees, 0) +
                    requirement.technician.reduce((sum, req) => sum + req.numberOfEmployees, 0)
                  : 0
                const fulfillmentPercentage = requiredEmployees > 0 ? (currentEmployees / requiredEmployees) * 100 : 100

                return (
                  <div key={department._id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{department.name}</span>
                      <span className="text-sm">
                        {currentEmployees} / {requiredEmployees} موظف
                      </span>
                    </div>
                    <Progress value={fulfillmentPercentage} className="h-2" />
                    {requirement && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>
                          الشهادات المطلوبة:{" "}
                          {
                            [
                              ...new Set([
                                ...requirement.administrative.flatMap((r) => r.requiredCertificateIds),
                                ...requirement.teaching.flatMap((r) => r.requiredCertificateIds),
                                ...requirement.technician.flatMap((r) => r.requiredCertificateIds),
                              ]),
                            ].length
                          }
                        </p>
                        <p>
                          المناصب المطلوبة:{" "}
                          {
                            [
                              ...new Set([
                                ...requirement.administrative.flatMap((r) => r.requiredGeneralSpecializationIds),
                                ...requirement.teaching.flatMap((r) => r.requiredGeneralSpecializationIds),
                                ...requirement.technician.flatMap((r) => r.requiredGeneralSpecializationIds),
                              ]),
                            ].length
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-[100px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-[200px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-[250px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

