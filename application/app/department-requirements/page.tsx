// DepartmentRequirementsPage.tsx
"use client";

import { useState, useEffect } from "react";
import type {
  DepartmentRequirement,
  Department,
  Certificate,
  College,
  GeneralSpecialization,
  Subspecialty,
  Employee,
  EmployeeSuggestion,
} from "@/types";
import { Button } from "@/components/ui/button";
import { PlusIcon, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RequirementsList } from "@/components/RequirementsList";
import { SuggestionsList } from "@/components/SuggestionsList";
import { RequirementForm } from "@/components/RequirementForm";
import {
  fetchDepartmentRequirements,
  fetchColleges,
  fetchDepartments,
  fetchCertificates,
  fetchGeneralSpecializations,
  fetchSubspecialties,
  fetchEmployees,
  fetchSuggestionsForRequirement,
  createDepartmentRequirement,
  updateDepartmentRequirement,
  deleteDepartmentRequirement,
} from "@/utils/api";

// Helper to check if an employee matches a requirement item
function doesEmployeeMatch(
  employee: Employee,
  requirementItem: {
    certificateId?: string;
    generalSpecializationId?: string;
    subspecialtyId?: string;
  }
) {
  if (requirementItem.certificateId && employee.certificateId !== requirementItem.certificateId) {
    return false;
  }
  if (
    requirementItem.generalSpecializationId &&
    employee.generalSpecializationId !== requirementItem.generalSpecializationId
  ) {
    return false;
  }
  if (
    requirementItem.subspecialtyId &&
    employee.subspecialtyId !== requirementItem.subspecialtyId
  ) {
    return false;
  }
  return true;
}

export default function DepartmentRequirementsPage() {
  const [requirements, setRequirements] = useState<DepartmentRequirement[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [generalSpecializations, setGeneralSpecializations] = useState<GeneralSpecialization[]>([]);
  const [subspecialties, setSubspecialties] = useState<Subspecialty[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [suggestions, setSuggestions] = useState<EmployeeSuggestion[]>([]);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<DepartmentRequirement | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        requirementsData,
        collegesData,
        departmentsData,
        certificatesData,
        generalSpecializationsData,
        subspecialtiesData,
        employeesData,
      ] = await Promise.all([
        fetchDepartmentRequirements(),
        fetchColleges(),
        fetchDepartments(),
        fetchCertificates(),
        fetchGeneralSpecializations(),
        fetchSubspecialties(),
        fetchEmployees(),
      ]);
      setRequirements(requirementsData || []);
      setColleges(collegesData || []);
      setDepartments(departmentsData || []);
      setCertificates(certificatesData || []);
      setGeneralSpecializations(generalSpecializationsData || []);
      setSubspecialties(subspecialtiesData || []);
      setEmployees(employeesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "خطأ",
        description: "فشل في جلب البيانات",
        variant: "destructive",
      });
    }
  };

  const handleCreateRequirement = async (requirement: Omit<DepartmentRequirement, "id">) => {
    if (
      !requirement.departmentId ||
      (requirement.administrative.length === 0 &&
        requirement.teaching.length === 0 &&
        requirement.technician.length === 0)
    ) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة متطلبات للقسم قبل الإرسال",
        variant: "destructive",
      });
      return;
    }
    try {
      await createDepartmentRequirement(requirement);
      fetchData();
      setAddDialogOpen(false);
      toast({
        title: "نجاح",
        description: "تمت إضافة متطلبات القسم بنجاح",
      });
    } catch (error) {
      console.error("Error creating department requirement:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة متطلبات القسم",
        variant: "destructive",
      });
    }
  };

  const handleUpdateRequirement = async (requirement: DepartmentRequirement) => {
    try {
      requirement._id = editingRequirement?._id || "";
      await updateDepartmentRequirement(requirement);
      fetchData();
      setEditDialogOpen(false);
      setEditingRequirement(null);
      toast({
        title: "نجاح",
        description: "تم تحديث متطلبات القسم بنجاح",
      });
    } catch (error) {
      console.error("Error updating department requirement:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث متطلبات القسم",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRequirement = async (id: string) => {
    try {
      await deleteDepartmentRequirement(id);
      fetchData();
      toast({
        title: "نجاح",
        description: "تم حذف متطلبات القسم بنجاح",
      });
    } catch (error) {
      console.error("Error deleting department requirement:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف متطلبات القسم",
        variant: "destructive",
      });
    }
  };

  const handleFetchSuggestions = async (requirementId: string) => {
    try {
      const suggestionsData = await fetchSuggestionsForRequirement(requirementId);
      setSuggestions(suggestionsData.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast({
        title: "خطأ",
        description: "فشل في جلب الاقتراحات",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with Add Requirement Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">متطلبات الأقسام</h1>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setAddDialogOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add Requirements
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة متطلبات قسم جديدة</DialogTitle>
            </DialogHeader>
            <RequirementForm
              id="add-requirement-form"
              colleges={colleges}
              departments={departments}
              certificates={certificates}
              generalSpecializations={generalSpecializations}
              subspecialties={subspecialties}
              onSubmit={handleCreateRequirement}
            />
            <Button type="submit" form="add-requirement-form" className="mt-4">
              إرسال المتطلبات
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* List of Department Requirements */}
      {requirements.map((requirement) => {
        const department = departments.find((d) => d._id === requirement.departmentId);
        const college = colleges.find((c) => c._id === department?.collegeId);

        // Combine admin/teaching/tech items into one array with a "type" label
        const breakdownItems = [
          ...requirement.administrative.map((item) => ({ ...item, type: "إداري" })),
          ...requirement.teaching.map((item) => ({ ...item, type: "تعليمي" })),
          ...requirement.technician.map((item) => ({ ...item, type: "فني" })),
        ];

        return (
          <Card key={requirement._id} className="mb-6">
            <CardHeader>
              <CardTitle>{department?.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{college?.name}</p>
            </CardHeader>
            <CardContent>
              {/* Existing Requirements Overview (Optional) */}
              <div className="mb-4">
                <RequirementsList
                  requirement={requirement}
                  certificates={certificates}
                  generalSpecializations={generalSpecializations}
                  subspecialties={subspecialties}
                />
              </div>

              {/* New Table: Required vs. Available in Department */}
              <h3 className="text-lg font-semibold mb-2">المتطلبات مقابل المتوفر</h3>
              <ScrollArea>
                <table className="w-full border border-collapse text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">الوظيفة</th>
                      <th className="border p-2">الشهادة</th>
                      <th className="border p-2">التخصص العام</th>
                      <th className="border p-2">التخصص الدقيق</th>
                      <th className="border p-2">المطلوب</th>
                      <th className="border p-2">المتوفر</th>
                      <th className="border p-2">الفجوة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdownItems.map((item, idx) => {
                      const requiredCount = item.count;

                      // Count how many employees match
                      const availableCount = employees.filter((emp) => {
                        if (emp.departmentId !== requirement.departmentId) return false;
                        return doesEmployeeMatch(emp, item);
                      }).length;

                      const gap = requiredCount - availableCount;

                      // Look up names
                      const certName =
                        certificates.find((c) => c._id === item.certificateId)?.name || "-";
                      const genSpecName =
                        generalSpecializations.find((gs) => gs._id === item.generalSpecializationId)
                          ?.name || "-";
                      const subSpecName =
                        subspecialties.find((ss) => ss._id === item.subspecialtyId)?.name || "-";

                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border p-2 text-center">{item.type}</td>
                          <td className="border p-2 text-center">{certName}</td>
                          <td className="border p-2 text-center">{genSpecName}</td>
                          <td className="border p-2 text-center">{subSpecName}</td>
                          <td className="border p-2 text-center">{requiredCount}</td>
                          <td className="border p-2 text-center">{availableCount}</td>
                          <td className="border p-2 text-center">{gap}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ScrollArea>

              {/* Suggestions Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">الاقتراحات</h3>
                <Button onClick={() => handleFetchSuggestions(requirement._id)} className="mb-2">
                  جلب الاقتراحات
                </Button>
                {suggestions.length > 0 && (
                  <ScrollArea className="h-[300px]">
                    <SuggestionsList
                      suggestions={suggestions}
                      certificates={certificates}
                      generalSpecializations={generalSpecializations}
                      subspecialties={subspecialties}
                    />
                  </ScrollArea>
                )}
              </div>

              {/* Edit / Delete Actions */}
              <div className="flex justify-end space-x-2 mt-4">
                <Dialog
                  open={editDialogOpen}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditingRequirement(null);
                    }
                    setEditDialogOpen(open);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingRequirement(requirement);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> تعديل
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>تعديل المتطلبات</DialogTitle>
                    </DialogHeader>
                    <RequirementForm
                      id="edit-requirement-form"
                      colleges={colleges}
                      departments={departments}
                      certificates={certificates}
                      generalSpecializations={generalSpecializations}
                      subspecialties={subspecialties}
                      onSubmit={handleUpdateRequirement}
                      initialData={editingRequirement || undefined}
                    />
                    <Button type="submit" form="edit-requirement-form" className="mt-4">
                      تعديل المتطلبات
                    </Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteRequirement(requirement._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
