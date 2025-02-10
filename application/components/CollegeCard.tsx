import { College } from '../types';
import { DepartmentCard } from './DepartmentCard';

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <div className="border p-6 rounded-lg shadow-lg mb-8">
      <h1 className="text-2xl font-bold mb-4">{college.name}</h1>
      {college.departments.map((department) => (
        <DepartmentCard key={department._id} department={department} />
      ))}
    </div>
  );
}

