import { Department, EmployeeCategory } from '../types';
import { EmployeeCard } from './EmployeeCard';

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const categories: EmployeeCategory[] = ['Administrative', 'Teaching', 'Technician'];

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{department.name}</h2>
      {categories.map((category) => (
        <div key={category} className="mb-4">
          <h3 className="text-lg font-semibold">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {department.employees[category].map((employee) => (
              <EmployeeCard key={employee._id} employee={employee} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

