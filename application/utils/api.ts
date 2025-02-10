import type {
  Employee,
  Department,
  College,
  Certificate,
  GeneralSpecialization,
  Subspecialty,
  Position,
  Workplace,
  DepartmentRequirement,
  Admin,
  JobGrade,
  EmployeeSuggestion,
} from "@/types";

// Dummy data for employee suggestions (for demonstration)
const dummyEmployeeSuggestions: EmployeeSuggestion[] = [
  {
    id: "1",
    name: "أحمد محمد",
    certificateId: "1",
    generalSpecializationId: "1",
    subspecialtyId: "1",
    matchPercentage: 95,
  },
  {
    id: "2",
    name: "فاطمة علي",
    certificateId: "2",
    generalSpecializationId: "2",
    subspecialtyId: "2",
    matchPercentage: 88,
  },
  {
    id: "3",
    name: "محمود حسن",
    certificateId: "3",
    generalSpecializationId: "3",
    subspecialtyId: "3",
    matchPercentage: 82,
  },
];

// Use the NEXT_PUBLIC_API_URL environment variable if available,
// otherwise fall back to "http://localhost:5000/api"
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://10.13.35.239:5000/api";

/**
 * Helper function to get the authentication headers.
 * It reads the token from localStorage (if available) and returns the headers.
 */
const getAuthHeaders = (): HeadersInit => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Define a default fetch options object that adds CORS mode to every request.
const defaultFetchOptions: RequestInit = {
  mode: "cors",
};

// ----------------------
// Employee functions
// ----------------------
export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/employees`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
};

export const createEmployee = async (employee: Omit<Employee, "id">): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error("Failed to create employee");
  return response.json();
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees/${employee._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error("Failed to update employee");
  return response.json();
};

export const deleteEmployee = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete employee");
};

// ----------------------
// Department functions
// ----------------------
export const fetchDepartments = async (): Promise<Department[]> => {
  const response = await fetch(`${API_URL}/departments`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch departments");
  return response.json();
};

export const createDepartment = async (department: Omit<Department, "id">): Promise<Department> => {
  const response = await fetch(`${API_URL}/departments`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(department),
  });
  if (!response.ok) throw new Error("Failed to create department");
  return response.json();
};

export const updateDepartment = async (department: Department): Promise<Department> => {
  const response = await fetch(`${API_URL}/departments/${department._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(department),
  });
  if (!response.ok) throw new Error("Failed to update department");
  return response.json();
};

export const deleteDepartment = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/departments/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete department");
};

// ----------------------
// College functions
// ----------------------
export const fetchColleges = async (): Promise<College[]> => {
  const response = await fetch(`${API_URL}/colleges`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch colleges");
  return response.json();
};

export const createCollege = async (college: Omit<College, "id">): Promise<College> => {
  const response = await fetch(`${API_URL}/colleges`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(college),
  });
  if (!response.ok) throw new Error("Failed to create college");
  return response.json();
};

export const updateCollege = async (college: College): Promise<College> => {
  const response = await fetch(`${API_URL}/colleges/${college._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(college),
  });
  if (!response.ok) throw new Error("Failed to update college");
  return response.json();
};

export const deleteCollege = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/colleges/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete college");
};

// ----------------------
// Certificate functions
// ----------------------
export const fetchCertificates = async (): Promise<Certificate[]> => {
  const response = await fetch(`${API_URL}/certificates`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch certificates");
  return response.json();
};

export const createCertificate = async (certificate: Omit<Certificate, "id">): Promise<Certificate> => {
  const response = await fetch(`${API_URL}/certificates`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(certificate),
  });
  if (!response.ok) throw new Error("Failed to create certificate");
  return response.json();
};

export const updateCertificate = async (certificate: Certificate): Promise<Certificate> => {
  const response = await fetch(`${API_URL}/certificates/${certificate._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(certificate),
  });
  if (!response.ok) throw new Error("Failed to update certificate");
  return response.json();
};

export const deleteCertificate = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/certificates/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete certificate");
};

// -------------------------------
// General Specialization functions
// -------------------------------
export const fetchGeneralSpecializations = async (): Promise<GeneralSpecialization[]> => {
  const response = await fetch(`${API_URL}/general-specializations`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch general specializations");
  return response.json();
};

export const createGeneralSpecialization = async (
  specialization: Omit<GeneralSpecialization, "id">
): Promise<GeneralSpecialization> => {
  const response = await fetch(`${API_URL}/general-specializations`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(specialization),
  });
  if (!response.ok) throw new Error("Failed to create general specialization");
  return response.json();
};

export const updateGeneralSpecialization = async (
  specialization: GeneralSpecialization
): Promise<GeneralSpecialization> => {
  const response = await fetch(`${API_URL}/general-specializations/${specialization._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(specialization),
  });
  if (!response.ok) throw new Error("Failed to update general specialization");
  return response.json();
};

export const deleteGeneralSpecialization = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/general-specializations/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete general specialization");
};

// ----------------------
// Subspecialty functions
// ----------------------
export const fetchSubspecialties = async (): Promise<Subspecialty[]> => {
  const response = await fetch(`${API_URL}/subspecialties`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch subspecialties");
  return response.json();
};

export const createSubspecialty = async (
  subspecialty: Omit<Subspecialty, "id">
): Promise<Subspecialty> => {
  const response = await fetch(`${API_URL}/subspecialties`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(subspecialty),
  });
  if (!response.ok) throw new Error("Failed to create subspecialty");
  return response.json();
};

export const updateSubspecialty = async (subspecialty: Subspecialty): Promise<Subspecialty> => {
  const response = await fetch(`${API_URL}/subspecialties/${subspecialty._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(subspecialty),
  });
  if (!response.ok) throw new Error("Failed to update subspecialty");
  return response.json();
};

export const deleteSubspecialty = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/subspecialties/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete subspecialty");
};

// ----------------------
// Position functions
// ----------------------
export const fetchPositions = async (): Promise<Position[]> => {
  const response = await fetch(`${API_URL}/positions`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch positions");
  return response.json();
};

export const createPosition = async (position: Omit<Position, "id">): Promise<Position> => {
  const response = await fetch(`${API_URL}/positions`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(position),
  });
  if (!response.ok) throw new Error("Failed to create position");
  return response.json();
};

export const updatePosition = async (position: Position): Promise<Position> => {
  const response = await fetch(`${API_URL}/positions/${position._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(position),
  });
  if (!response.ok) throw new Error("Failed to update position");
  return response.json();
};

export const deletePosition = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/positions/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete position");
};

// ----------------------
// Workplace functions
// ----------------------
export const fetchWorkplaces = async (): Promise<Workplace[]> => {
  const response = await fetch(`${API_URL}/workplaces`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch workplaces");
  return response.json();
};

export const createWorkplace = async (workplace: Omit<Workplace, "id">): Promise<Workplace> => {
  const response = await fetch(`${API_URL}/workplaces`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(workplace),
  });
  if (!response.ok) throw new Error("Failed to create workplace");
  return response.json();
};

export const updateWorkplace = async (workplace: Workplace): Promise<Workplace> => {
  const response = await fetch(`${API_URL}/workplaces/${workplace._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(workplace),
  });
  if (!response.ok) throw new Error("Failed to update workplace");
  return response.json();
};

export const deleteWorkplace = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/workplaces/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete workplace");
};

// ----------------------
// Department Requirement functions
// ----------------------
export const fetchDepartmentRequirements = async (): Promise<DepartmentRequirement[]> => {
  const response = await fetch(`${API_URL}/department-requirements`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch department requirements");
  return response.json();
};

export const createDepartmentRequirement = async (
  requirement: Omit<DepartmentRequirement, "id">
): Promise<DepartmentRequirement> => {
  const response = await fetch(`${API_URL}/department-requirements`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(requirement),
  });
  if (!response.ok) throw new Error("Failed to create department requirement");
  return response.json();
};

export const updateDepartmentRequirement = async (
  requirement: DepartmentRequirement
): Promise<DepartmentRequirement> => {
  const response = await fetch(`${API_URL}/department-requirements/${requirement._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(requirement),
  });
  if (!response.ok) throw new Error("Failed to update department requirement");
  return response.json();
};

export const deleteDepartmentRequirement = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/department-requirements/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete department requirement");
};

// ----------------------
// Admin functions
// ----------------------
export const fetchAdmins = async (): Promise<Admin[]> => {
  const response = await fetch(`${API_URL}/admins`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch admins");
  return response.json();
};

export const createAdmin = async (admin: Omit<Admin, "id">): Promise<Admin> => {
  const response = await fetch(`${API_URL}/admins`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(admin),
  });
  if (!response.ok) throw new Error("Failed to create admin");
  return response.json();
};

export const updateAdmin = async (admin: Admin): Promise<Admin> => {
  console.log(admin);
  const response = await fetch(`${API_URL}/admins/${admin._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(admin),
  });
  if (!response.ok) throw new Error("Failed to update admin");
  return response.json();
};

export const deleteAdmin = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/admins/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete admin");
};

// ----------------------
// Job Grade functions
// ----------------------
export const fetchJobGrades = async (): Promise<JobGrade[]> => {
  const response = await fetch(`${API_URL}/job-grades`, {
    ...defaultFetchOptions,
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch job grades");
  return response.json();
};

export const createJobGrade = async (jobGrade: Omit<JobGrade, "id">): Promise<JobGrade> => {
  const response = await fetch(`${API_URL}/job-grades`, {
    ...defaultFetchOptions,
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(jobGrade),
  });
  if (!response.ok) throw new Error("Failed to create job grade");
  return response.json();
};

export const updateJobGrade = async (jobGrade: JobGrade): Promise<JobGrade> => {
  const response = await fetch(`${API_URL}/job-grades/${jobGrade._id}`, {
    ...defaultFetchOptions,
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(jobGrade),
  });
  if (!response.ok) throw new Error("Failed to update job grade");
  return response.json();
};

export const deleteJobGrade = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/job-grades/${id}`, {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete job grade");
};

// ----------------------
// Fetch suggestions for a department requirement (dummy implementation)
// ----------------------
export const fetchSuggestionsForRequirement = async (
  requirementId: string
): Promise<{ requirementId: string; suggestions: EmployeeSuggestion[] }> => {
  // In a real application, this would be an API call to your backend.
  // For now, we simulate an API delay and return dummy suggestions.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        requirementId,
        suggestions: dummyEmployeeSuggestions,
      });
    }, 500);
  });
};
