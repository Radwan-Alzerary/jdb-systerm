'use client'

import { useState } from 'react';
import { College, Department, EmployeeCategory } from '../../types';

// Using the same mock data as in the main page
const mockColleges: College[] = [
  // ... (same as in app/page.tsx)
];

export default function EmployeeRequirements() {
  const [colleges] = useState<College[]>(mockColleges);
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<EmployeeCategory | ''>('');

  const departments = selectedCollege 
    ? colleges.find(c => c._id === selectedCollege)?.departments || []
    : [];

  const employees = selectedDepartment && selectedCategory
    ? departments.find(d => d._id === selectedDepartment)?.employees[selectedCategory as EmployeeCategory] || []
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Employee Requirements</h1>
      
      <div className="mb-4">
        <label className="block mb-2">College:</label>
        <select 
          className="w-full p-2 border rounded"
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
        >
          <option value="">Select a college</option>
          {colleges.map((college) => (
            <option key={college._id} value={college._id}>{college.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Department:</label>
        <select 
          className="w-full p-2 border rounded"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          disabled={!selectedCollege}
        >
          <option value="">Select a department</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>{department.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Category:</label>
        <select 
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as EmployeeCategory)}
          disabled={!selectedDepartment}
        >
          <option value="">Select a category</option>
          <option value="Administrative">Administrative</option>
          <option value="Teaching">Teaching</option>
          <option value="Technician">Technician</option>
        </select>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Employees:</h2>
        {employees.map((employee) => (
          <div key={employee._id} className="border p-4 rounded mb-4">
            <h3 className="font-bold">{employee.name}</h3>
            <p>Type: {employee.type}</p>
            <p>Certificate: {employee.certificate}</p>
            <p>General Specialization: {employee.generalSpecialization}</p>
            <p>Subspecialty: {employee.subspecialty}</p>
            <p>Position: {employee.position}</p>
            <p>Workplace: {employee.workplace}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

