export type EmployeeType = "Full-time" | "Part-time" | "Contract"

export interface Employee {
  id: string
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
  departmentId: string
  administrative: CategoryRequirement[]
  teaching: CategoryRequirement[]
  technician: CategoryRequirement[]
}

export interface Workplace {
  id: string
  name: string
}

export interface Certificate {
  id: string
  name: string
}

export interface GeneralSpecialization {
  id: string
  name: string
}

export interface Subspecialty {
  id: string
  name: string
}

export interface Position {
  id: string
  name: string
}

export interface JobGrade {
  id: string
  name: string
  level: number
}

// Dummy data
export const dummyEmployees: Employee[] = [
  {
    id: "1",
    name: "د. محمد الجبوري",
    type: "Full-time",
    certificateId: "1",
    generalSpecializationId: "1",
    subspecialtyId: "1",
    positionId: "1",
    workplaceId: "1",
    collegeId: "1",
    departmentId: "1",
    startDate: "2023-01-01",
    jobGradeId: "1",
    isAssigned: false,
    assignedFrom: undefined,
    assignedTo: undefined,
  },
  {
    id: "2",
    name: "م. فاطمة العبيدي",
    type: "Part-time",
    certificateId: "2",
    generalSpecializationId: "2",
    subspecialtyId: "2",
    positionId: "2",
    workplaceId: "1",
    collegeId: "2",
    departmentId: "4",
    startDate: "2023-02-15",
    jobGradeId: "2",
    isAssigned: false,
    assignedFrom: undefined,
    assignedTo: undefined,
  },
  {
    id: "3",
    name: "د. أحمد الطائي",
    type: "Contract",
    certificateId: "3",
    generalSpecializationId: "3",
    subspecialtyId: "3",
    positionId: "3",
    workplaceId: "2",
    collegeId: "3",
    departmentId: "6",
    startDate: "2023-03-10",
    jobGradeId: "3",
    isAssigned: false,
    assignedFrom: undefined,
    assignedTo: undefined,
  },
  {
    id: "4",
    name: "د. زينب الدليمي",
    type: "Full-time",
    certificateId: "1",
    generalSpecializationId: "1",
    subspecialtyId: "2",
    positionId: "4",
    workplaceId: "2",
    collegeId: "4",
    departmentId: "8",
    startDate: "2023-04-20",
    jobGradeId: "4",
    isAssigned: false,
    assignedFrom: undefined,
    assignedTo: undefined,
  },
  {
    id: "5",
    name: "م. عمر السامرائي",
    type: "Part-time",
    certificateId: "2",
    generalSpecializationId: "3",
    subspecialtyId: "1",
    positionId: "5",
    workplaceId: "1",
    collegeId: "5",
    departmentId: "10",
    startDate: "2023-05-01",
    jobGradeId: "5",
    isAssigned: false,
    assignedFrom: undefined,
    assignedTo: undefined,
  },
]

export const dummyDepartments: Department[] = [
  { id: "1", name: "قسم الهندسة المدنية", collegeId: "1" },
  { id: "2", name: "قسم الهندسة الميكانيكية", collegeId: "1" },
  { id: "3", name: "قسم الهندسة الكهربائية", collegeId: "1" },
  { id: "4", name: "قسم هندسة النفط", collegeId: "2" },
  { id: "5", name: "قسم هندسة التعدين", collegeId: "2" },
  { id: "6", name: "قسم علوم الحياة", collegeId: "3" },
  { id: "7", name: "قسم الكيمياء", collegeId: "3" },
  { id: "8", name: "قسم علوم الحاسوب", collegeId: "4" },
  { id: "9", name: "قسم نظم المعلومات", collegeId: "4" },
  { id: "10", name: "قسم إدارة الأعمال", collegeId: "5" },
  { id: "11", name: "قسم المحاسبة", collegeId: "5" },
  { id: "12", name: "قسم التمريض", collegeId: "6" },
  { id: "13", name: "قسم الطب البيطري", collegeId: "7" },
  { id: "14", name: "قسم البستنة", collegeId: "8" },
  { id: "15", name: "قسم المحاصيل الحقلية", collegeId: "8" },
]

export const dummyColleges: College[] = [
  { id: "1", name: "كلية الهندسة" },
  { id: "2", name: "كلية هندسة النفط والتعدين" },
  { id: "3", name: "كلية العلوم" },
  { id: "4", name: "كلية علوم الحاسوب وتكنولوجيا المعلومات" },
  { id: "5", name: "كلية الادارة والاقتصاد" },
  { id: "6", name: "كلية التمريض" },
  { id: "7", name: "كلية الطب البيطري" },
  { id: "8", name: "كلية الزراعة" },
]

export const dummyCertificates: Certificate[] = [
  { id: "1", name: "دكتوراه" },
  { id: "2", name: "ماجستير" },
  { id: "3", name: "بكالوريوس" },
  { id: "4", name: "دبلوم عالي" },
  { id: "5", name: "دبلوم" },
]

export const dummyGeneralSpecializations: GeneralSpecialization[] = [
  { id: "1", name: "علوم الحاسوب" },
  { id: "2", name: "الهندسة الكهربائية" },
  { id: "3", name: "الهندسة الميكانيكية" },
  { id: "4", name: "الطب" },
  { id: "5", name: "العلوم الإدارية" },
]

export const dummySubspecialties: Subspecialty[] = [
  { id: "1", name: "الذكاء الاصطناعي" },
  { id: "2", name: "أنظمة الطاقة" },
  { id: "3", name: "الروبوتات" },
  { id: "4", name: "طب القلب" },
  { id: "5", name: "إدارة الموارد البشرية" },
]

export const dummyPositions: Position[] = [
  { id: "1", name: "أستاذ" },
  { id: "2", name: "أستاذ مساعد" },
  { id: "3", name: "محاضر" },
  { id: "4", name: "مساعد باحث" },
  { id: "5", name: "فني مختبر" },
]

export const dummyWorkplaces: Workplace[] = [
  { id: "1", name: "الحرم الجامعي الرئيسي - كركوك" },
  { id: "2", name: "فرع الجامعة - الحويجة" },
]

export const dummyDepartmentRequirements: DepartmentRequirement[] = [
  {
    id: "1",
    departmentId: "1",
    administrative: [
      {
        id: "1",
        numberOfEmployees: 2,
        requiredCertificateIds: ["1"],
        requiredGeneralSpecializationIds: ["1"],
        requiredSubspecialtyIds: ["1"],
      },
    ],
    teaching: [
      {
        id: "2",
        numberOfEmployees: 5,
        requiredCertificateIds: ["1", "2"],
        requiredGeneralSpecializationIds: ["1"],
        requiredSubspecialtyIds: ["1"],
      },
    ],
    technician: [
      {
        id: "3",
        numberOfEmployees: 3,
        requiredCertificateIds: ["2"],
        requiredGeneralSpecializationIds: ["1"],
        requiredSubspecialtyIds: [],
      },
    ],
  },
  {
    id: "2",
    departmentId: "2",
    administrative: [
      {
        id: "4",
        numberOfEmployees: 1,
        requiredCertificateIds: ["2"],
        requiredGeneralSpecializationIds: ["2"],
        requiredSubspecialtyIds: [],
      },
    ],
    teaching: [
      {
        id: "5",
        numberOfEmployees: 4,
        requiredCertificateIds: ["1"],
        requiredGeneralSpecializationIds: ["2"],
        requiredSubspecialtyIds: ["2"],
      },
    ],
    technician: [
      {
        id: "6",
        numberOfEmployees: 2,
        requiredCertificateIds: ["3"],
        requiredGeneralSpecializationIds: ["2"],
        requiredSubspecialtyIds: [],
      },
    ],
  },
]

export const dummyAdmins: Admin[] = [
  {
    id: "1",
    name: "مدير النظام",
    email: "admin@example.com",
    password: "hashed_password_here",
    role: "full",
    entityId: "1",
  },
  {
    id: "2",
    name: "مدير القسم",
    email: "dept_admin@example.com",
    password: "hashed_password_here",
    role: "department",
    entityId: "1",
  },
]

export const dummyJobGrades: JobGrade[] = [
  { id: "1", name: "متدرب", level: 1 },
  { id: "2", name: "موظف جديد", level: 2 },
  { id: "3", name: "موظف", level: 3 },
  { id: "4", name: "موظف أول", level: 4 },
  { id: "5", name: "مشرف", level: 5 },
]

export interface EmployeeSuggestion {
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

export const dummyEmployeeSuggestions: EmployeeSuggestion[] = [
  {
    id: "1",
    name: "محمد أحمد",
    certificateId: "1",
    generalSpecializationId: "1",
    subspecialtyId: "1",
    matchPercentage: 95,
  },
  {
    id: "2",
    name: "فاطمة علي",
    certificateId: "2",
    generalSpecializationId: "1",
    subspecialtyId: "2",
    matchPercentage: 88,
  },
  {
    id: "3",
    name: "أحمد محمود",
    certificateId: "1",
    generalSpecializationId: "2",
    subspecialtyId: "3",
    matchPercentage: 82,
  },
  {
    id: "4",
    name: "زينب حسن",
    certificateId: "3",
    generalSpecializationId: "3",
    subspecialtyId: "1",
    matchPercentage: 78,
  },
  {
    id: "5",
    name: "عمر خالد",
    certificateId: "2",
    generalSpecializationId: "2",
    subspecialtyId: "2",
    matchPercentage: 75,
  },
]

