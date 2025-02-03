import { Employee, Department, College } from '@/types'

export const groupEmployeesByDepartment = (employees: Employee[], departments: Department[]): Record<string, Employee[]> => {
  const groupedEmployees: Record<string, Employee[]> = {}

  departments.forEach(department => {
    groupedEmployees[department.id] = employees.filter(employee => employee.departmentId === department.id)
  })

  return groupedEmployees
}

export const groupDepartmentsByCollege = (departments: Department[], colleges: College[]): Record<string, Department[]> => {
  const groupedDepartments: Record<string, Department[]> = {}

  colleges.forEach(college => {
    groupedDepartments[college.id] = departments.filter(department => department.collegeId === college.id)
  })

  return groupedDepartments
}

export const calculateEmployeeStats = (employees: Employee[]) => {
  const totalEmployees = employees.length
  const fullTimeEmployees = employees.filter(e => e.type === 'Full-time').length
  const partTimeEmployees = employees.filter(e => e.type === 'Part-time').length
  const contractEmployees = employees.filter(e => e.type === 'Contract').length

  return {
    totalEmployees,
    fullTimeEmployees,
    partTimeEmployees,
    contractEmployees,
    fullTimePercentage: (fullTimeEmployees / totalEmployees) * 100,
    partTimePercentage: (partTimeEmployees / totalEmployees) * 100,
    contractPercentage: (contractEmployees / totalEmployees) * 100,
  }
}

export const findEmployeeById = (employees: Employee[], id: string): Employee | undefined => {
  return employees.find(employee => employee.id === id)
}

export const calculateAverageEmployeesPerDepartment = (employees: Employee[], departments: Department[]): number => {
  return employees.length / departments.length
}

export const sortEmployeesByName = (employees: Employee[]): Employee[] => {
  return [...employees].sort((a, b) => a.name.localeCompare(b.name))
}

export const filterEmployeesByType = (employees: Employee[], type: Employee['type']): Employee[] => {
  return employees.filter(employee => employee.type === type)
}

export const calculateDepartmentUtilization = (
  employees: Employee[],
  department: Department,
  requiredEmployees: number
): number => {
  const departmentEmployees = employees.filter(e => e.departmentId === department.id).length
  return (departmentEmployees / requiredEmployees) * 100
}

