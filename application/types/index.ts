export type EmployeeType = "Full-time" | "Part-time" | "Contract"

export interface Employee {
  id: string
  _id: string
  name: string
  type: EmployeeType
  certificateId: string
  generalSpecializationId: string
  subspecialtyId: string
  positionId: string
  workplaceId: string
  collegeId: string
  departmentId: string
  startDate: string
  specialCategory?: "politicalPrisoner" | "martyrFamily"
  jobGradeId: string
  isAssigned: boolean
  assignmentEntity?: string
  assignedFrom?: string
  assignedTo?: string
  ScientificTitle?:string
  startFromDegreeDate?:string
  hierarchy?:string
}

export interface Department {
  _id: string
  id: string
  name: string
  collegeId: string
  adminId?: string
}

export interface College {
  _id: string
  id: string
  name: string
  adminId?: string
}

export type AdminRole = "full" | "college" | "department"

export interface Admin {
  _id:string
  id: string
  name: string
  email: string
  password: string
  role: AdminRole
  entityId?: string // College or Department ID, depending on the role
}

export interface CategoryRequirement {
  _id: string

  id: string
  numberOfEmployees: number
  requiredCertificateIds: string[]
  requiredGeneralSpecializationIds: string[]
  requiredSubspecialtyIds: string[]
}

export interface DepartmentRequirement {
  id: string
  _id: string

  departmentId: string
  administrative: CategoryRequirement[]
  teaching: CategoryRequirement[]
  technician: CategoryRequirement[]
}

export interface Workplace {
  id: string
  _id: string

  name: string
}

export interface Certificate {
  id: string
  _id: string

  name: string
}

export interface GeneralSpecialization {
  id: string
  _id: string

  name: string
}

export interface Subspecialty {
  id: string
  _id: string

  name: string
}

export interface Position {
  id: string
  _id: string

  name: string
}

export interface JobGrade {
  id: string
  _id: string

  name: string
  level: number
}




export interface EmployeeSuggestion {
  _id: string
  id: string
  name: string
  certificateId: string
  generalSpecializationId: string
  subspecialtyId: string
  matchPercentage: number
}

export interface DepartmentRequirementSuggestions {
  requirementId: string
  suggestions: EmployeeSuggestion[]
}

