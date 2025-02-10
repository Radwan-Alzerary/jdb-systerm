/**
 * If you’re on Node 18+:
 *   No extra fetch library needed, just use the built-in global fetch.
 *
 * If you’re on an older Node version:
 *   Install node-fetch:
 *      npm install node-fetch
 *   Then uncomment the import line below:
 */
// import fetch from 'node-fetch';

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

// Read from a standard Node environment variable (not Next.js):
const API_URL = process.env.API_URL || "http://localhost:5000/api";

/**
 * Helper function to build the auth headers.
 * In a Node environment, you'll typically pass in the token from
 * your server's session or some secure storage rather than localStorage.
 */
function getAuthHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// ---------------------------------------------------------------------------------
// Example: In a Node.js environment, you usually do server-to-server fetch calls.
// This code can be used in an Express route, a stand-alone Node script, or
// any server-side function. Just ensure that `API_URL` points to your backend.
// ---------------------------------------------------------------------------------

// ----------------------
// Employee functions
// ----------------------
export async function fetchEmployees(token?: string): Promise<Employee[]> {
  const response = await fetch(`${API_URL}/employees`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
}

export async function createEmployee(
  employee: Omit<Employee, "id">,
  token?: string
): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error("Failed to create employee");
  }
  return response.json();
}

export async function updateEmployee(employee: Employee, token?: string): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees/${employee._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error("Failed to update employee");
  }
  return response.json();
}

export async function deleteEmployee(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
}

// ----------------------
// Department functions
// ----------------------
export async function fetchDepartments(token?: string): Promise<Department[]> {
  const response = await fetch(`${API_URL}/departments`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  return response.json();
}

export async function createDepartment(
  department: Omit<Department, "id">,
  token?: string
): Promise<Department> {
  const response = await fetch(`${API_URL}/departments`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(department),
  });
  if (!response.ok) {
    throw new Error("Failed to create department");
  }
  return response.json();
}

export async function updateDepartment(
  department: Department,
  token?: string
): Promise<Department> {
  const response = await fetch(`${API_URL}/departments/${department._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(department),
  });
  if (!response.ok) {
    throw new Error("Failed to update department");
  }
  return response.json();
}

export async function deleteDepartment(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/departments/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete department");
  }
}

// ----------------------
// College functions
// ----------------------
export async function fetchColleges(token?: string): Promise<College[]> {
  const response = await fetch(`${API_URL}/colleges`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch colleges");
  }
  return response.json();
}

export async function createCollege(
  college: Omit<College, "id">,
  token?: string
): Promise<College> {
  const response = await fetch(`${API_URL}/colleges`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(college),
  });
  if (!response.ok) {
    throw new Error("Failed to create college");
  }
  return response.json();
}

export async function updateCollege(
  college: College,
  token?: string
): Promise<College> {
  const response = await fetch(`${API_URL}/colleges/${college._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(college),
  });
  if (!response.ok) {
    throw new Error("Failed to update college");
  }
  return response.json();
}

export async function deleteCollege(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/colleges/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete college");
  }
}

// ----------------------
// Certificate functions
// ----------------------
export async function fetchCertificates(token?: string): Promise<Certificate[]> {
  const response = await fetch(`${API_URL}/certificates`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch certificates");
  }
  return response.json();
}

export async function createCertificate(
  certificate: Omit<Certificate, "id">,
  token?: string
): Promise<Certificate> {
  const response = await fetch(`${API_URL}/certificates`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(certificate),
  });
  if (!response.ok) {
    throw new Error("Failed to create certificate");
  }
  return response.json();
}

export async function updateCertificate(
  certificate: Certificate,
  token?: string
): Promise<Certificate> {
  const response = await fetch(`${API_URL}/certificates/${certificate._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(certificate),
  });
  if (!response.ok) {
    throw new Error("Failed to update certificate");
  }
  return response.json();
}

export async function deleteCertificate(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/certificates/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete certificate");
  }
}

// ----------------------
// General Specialization
// ----------------------
export async function fetchGeneralSpecializations(
  token?: string
): Promise<GeneralSpecialization[]> {
  const response = await fetch(`${API_URL}/general-specializations`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch general specializations");
  }
  return response.json();
}

export async function createGeneralSpecialization(
  specialization: Omit<GeneralSpecialization, "id">,
  token?: string
): Promise<GeneralSpecialization> {
  const response = await fetch(`${API_URL}/general-specializations`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(specialization),
  });
  if (!response.ok) {
    throw new Error("Failed to create general specialization");
  }
  return response.json();
}

export async function updateGeneralSpecialization(
  specialization: GeneralSpecialization,
  token?: string
): Promise<GeneralSpecialization> {
  const response = await fetch(`${API_URL}/general-specializations/${specialization._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(specialization),
  });
  if (!response.ok) {
    throw new Error("Failed to update general specialization");
  }
  return response.json();
}

export async function deleteGeneralSpecialization(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/general-specializations/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete general specialization");
  }
}

// ----------------------
// Subspecialty
// ----------------------
export async function fetchSubspecialties(token?: string): Promise<Subspecialty[]> {
  const response = await fetch(`${API_URL}/subspecialties`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch subspecialties");
  }
  return response.json();
}

export async function createSubspecialty(
  subspecialty: Omit<Subspecialty, "id">,
  token?: string
): Promise<Subspecialty> {
  const response = await fetch(`${API_URL}/subspecialties`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(subspecialty),
  });
  if (!response.ok) {
    throw new Error("Failed to create subspecialty");
  }
  return response.json();
}

export async function updateSubspecialty(
  subspecialty: Subspecialty,
  token?: string
): Promise<Subspecialty> {
  const response = await fetch(`${API_URL}/subspecialties/${subspecialty._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(subspecialty),
  });
  if (!response.ok) {
    throw new Error("Failed to update subspecialty");
  }
  return response.json();
}

export async function deleteSubspecialty(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/subspecialties/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete subspecialty");
  }
}

// ----------------------
// Position
// ----------------------
export async function fetchPositions(token?: string): Promise<Position[]> {
  const response = await fetch(`${API_URL}/positions`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch positions");
  }
  return response.json();
}

export async function createPosition(
  position: Omit<Position, "id">,
  token?: string
): Promise<Position> {
  const response = await fetch(`${API_URL}/positions`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(position),
  });
  if (!response.ok) {
    throw new Error("Failed to create position");
  }
  return response.json();
}

export async function updatePosition(position: Position, token?: string): Promise<Position> {
  const response = await fetch(`${API_URL}/positions/${position._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(position),
  });
  if (!response.ok) {
    throw new Error("Failed to update position");
  }
  return response.json();
}

export async function deletePosition(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/positions/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete position");
  }
}

// ----------------------
// Workplace
// ----------------------
export async function fetchWorkplaces(token?: string): Promise<Workplace[]> {
  const response = await fetch(`${API_URL}/workplaces`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch workplaces");
  }
  return response.json();
}

export async function createWorkplace(
  workplace: Omit<Workplace, "id">,
  token?: string
): Promise<Workplace> {
  const response = await fetch(`${API_URL}/workplaces`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(workplace),
  });
  if (!response.ok) {
    throw new Error("Failed to create workplace");
  }
  return response.json();
}

export async function updateWorkplace(workplace: Workplace, token?: string): Promise<Workplace> {
  const response = await fetch(`${API_URL}/workplaces/${workplace._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(workplace),
  });
  if (!response.ok) {
    throw new Error("Failed to update workplace");
  }
  return response.json();
}

export async function deleteWorkplace(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/workplaces/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete workplace");
  }
}

// ----------------------
// Department Requirement
// ----------------------
export async function fetchDepartmentRequirements(
  token?: string
): Promise<DepartmentRequirement[]> {
  const response = await fetch(`${API_URL}/department-requirements`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch department requirements");
  }
  return response.json();
}

export async function createDepartmentRequirement(
  requirement: Omit<DepartmentRequirement, "id">,
  token?: string
): Promise<DepartmentRequirement> {
  const response = await fetch(`${API_URL}/department-requirements`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(requirement),
  });
  if (!response.ok) {
    throw new Error("Failed to create department requirement");
  }
  return response.json();
}

export async function updateDepartmentRequirement(
  requirement: DepartmentRequirement,
  token?: string
): Promise<DepartmentRequirement> {
  const response = await fetch(`${API_URL}/department-requirements/${requirement._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(requirement),
  });
  if (!response.ok) {
    throw new Error("Failed to update department requirement");
  }
  return response.json();
}

export async function deleteDepartmentRequirement(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/department-requirements/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete department requirement");
  }
}

// ----------------------
// Admin
// ----------------------
export async function fetchAdmins(token?: string): Promise<Admin[]> {
  const response = await fetch(`${API_URL}/admins`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch admins");
  }
  return response.json();
}

export async function createAdmin(admin: Omit<Admin, "id">, token?: string): Promise<Admin> {
  const response = await fetch(`${API_URL}/admins`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(admin),
  });
  if (!response.ok) {
    throw new Error("Failed to create admin");
  }
  return response.json();
}

export async function updateAdmin(admin: Admin, token?: string): Promise<Admin> {
  const response = await fetch(`${API_URL}/admins/${admin._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(admin),
  });
  if (!response.ok) {
    throw new Error("Failed to update admin");
  }
  return response.json();
}

export async function deleteAdmin(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/admins/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete admin");
  }
}

// ----------------------
// Job Grade
// ----------------------
export async function fetchJobGrades(token?: string): Promise<JobGrade[]> {
  const response = await fetch(`${API_URL}/job-grades`, {
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch job grades");
  }
  return response.json();
}

export async function createJobGrade(
  jobGrade: Omit<JobGrade, "id">,
  token?: string
): Promise<JobGrade> {
  const response = await fetch(`${API_URL}/job-grades`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(jobGrade),
  });
  if (!response.ok) {
    throw new Error("Failed to create job grade");
  }
  return response.json();
}

export async function updateJobGrade(jobGrade: JobGrade, token?: string): Promise<JobGrade> {
  const response = await fetch(`${API_URL}/job-grades/${jobGrade._id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(jobGrade),
  });
  if (!response.ok) {
    throw new Error("Failed to update job grade");
  }
  return response.json();
}

export async function deleteJobGrade(id: string, token?: string): Promise<void> {
  const response = await fetch(`${API_URL}/job-grades/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Failed to delete job grade");
  }
}

// ----------------------
// Fetch suggestions for a department requirement (still dummy data)
// ----------------------
export async function fetchSuggestionsForRequirement(
  requirementId: string
): Promise<{ requirementId: string; suggestions: EmployeeSuggestion[] }> {
  // This remains an example. You can replace it with a real server-side call
  // if your real backend supports such an endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        requirementId,
        suggestions: dummyEmployeeSuggestions,
      });
    }, 500);
  });
}
