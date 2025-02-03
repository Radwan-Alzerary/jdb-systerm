import { Employee } from '../types';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3 className="font-bold">{employee.name}</h3>
      <p>Type: {employee.type}</p>
      <p>Certificate: {employee.certificate}</p>
      <p>General Specialization: {employee.generalSpecialization}</p>
      <p>Subspecialty: {employee.subspecialty}</p>
      <p>Position: {employee.position}</p>
      <p>Workplace: {employee.workplace}</p>
    </div>
  );
}

