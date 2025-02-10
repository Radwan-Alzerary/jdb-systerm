"use client";

import { useState, useEffect } from "react";
import type {
  Employee,
  EmployeeType,
  Certificate,
  GeneralSpecialization,
  Subspecialty,
  Position,
  Workplace,
  College,
  Department,
  JobGrade,
} from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Stepper } from "@/components/Stepper";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface EmployeeFormProps {
  employee?: Partial<Employee>;
  onSubmit: (employee: Omit<Employee, "id">) => void;
  certificates: Certificate[];
  generalSpecializations: GeneralSpecialization[];
  subspecialties: Subspecialty[];
  positions: Position[];
  workplaces: Workplace[];
  colleges: College[];
  departments: Department[];
  jobGrades: JobGrade[];
}

const steps = [
  "المعلومات الشخصية",
  "تفاصيل الوظيفة",
  "التعليم والتخصص",
  "معلومات إضافية",
];

export function EmployeeForm({
  employee,
  onSubmit,
  certificates,
  generalSpecializations,
  subspecialties,
  positions,
  workplaces,
  colleges,
  departments,
  jobGrades,
}: EmployeeFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);

  // We include additional fields for splitting the name.
  const [formData, setFormData] = useState<
    Omit<Employee, "id"> & {
      firstName: string;
      secondName: string;
      thirdName: string;
      fourthName: string;
    }
  >(() => {
    const nameParts = employee?.name ? employee.name.split(" ") : ["", "", "", ""];
    return {
      firstName: nameParts[0] || "",
      secondName: nameParts[1] || "",
      thirdName: nameParts[2] || "",
      fourthName: nameParts[3] || "",
      name: employee?.name || "",
      type: employee?.type || "Full-time",
      certificateId: employee?.certificateId || "",
      generalSpecializationId: employee?.generalSpecializationId || "",
      subspecialtyId: employee?.subspecialtyId || "",
      positionId: employee?.positionId || "",
      workplaceId: employee?.workplaceId || "",
      collegeId: employee?.collegeId || "",
      departmentId: employee?.departmentId || "",
      startDate: employee?.startDate || "",
      specialCategory: employee?.specialCategory,
      jobGradeId: employee?.jobGradeId || "",
      isAssigned: employee?.isAssigned || false,
      assignedFrom: employee?.assignedFrom || "",
      assignedTo: employee?.assignedTo || "",
    };
  });

  const [showSpecialCategory, setShowSpecialCategory] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Recalculate validity whenever formData changes.
  useEffect(() => {
    checkFormValidity();
  }, [formData]);

  // Update a field in formData and recheck validity
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // checkFormValidity() will be called by useEffect after state update
  };

  // Define the required fields for our form
  const checkFormValidity = () => {
    const requiredFields = [
      "firstName",
      "secondName",
      "thirdName",
      "fourthName",
      "type",
      "certificateId",
      "generalSpecializationId",
      "subspecialtyId",
      "positionId",
      "workplaceId",
      "collegeId",
      "departmentId",
      "startDate",
      "jobGradeId",
    ];

    const isValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData] !== ""
    );
    setIsFormValid(isValid);
  };

  // Calculate progress based on filled fields (excluding isAssigned, assignedFrom, assignedTo)
  const calculateProgress = () => {
    // Get keys that we care about (exclude the ones that are not required for progress)
    const keys = Object.keys(formData).filter(
      (key) => key !== "isAssigned" && key !== "assignedFrom" && key !== "assignedTo"
    );
    const totalFields = keys.length;
    const filledFields = keys.filter((key) => {
      const value = formData[key as keyof typeof formData];
      return value !== "";
    }).length;
    return (filledFields / totalFields) * 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length - 1 && isFormValid) {
      const fullName = `${formData.firstName} ${formData.secondName} ${formData.thirdName} ${formData.fourthName}`.trim();
      const submissionData = {
        ...formData,
        name: fullName,
      };
      // Remove the split name parts from the submission data
      delete (submissionData as any).firstName;
      delete (submissionData as any).secondName;
      delete (submissionData as any).thirdName;
      delete (submissionData as any).fourthName;
      onSubmit(submissionData);
    } else if (currentStep === steps.length - 1) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
    }
  };

  // Renders the current step's inputs
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div>
              <Label htmlFor="firstName">الاسم الأول</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
                className={formData.firstName === "" ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label htmlFor="secondName">الاسم الثاني</Label>
              <Input
                id="secondName"
                name="secondName"
                value={formData.secondName}
                onChange={(e) => handleChange("secondName", e.target.value)}
                required
                className={formData.secondName === "" ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label htmlFor="thirdName">الاسم الثالث</Label>
              <Input
                id="thirdName"
                name="thirdName"
                value={formData.thirdName}
                onChange={(e) => handleChange("thirdName", e.target.value)}
                required
                className={formData.thirdName === "" ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label htmlFor="fourthName">الاسم الرابع</Label>
              <Input
                id="fourthName"
                name="fourthName"
                value={formData.fourthName}
                onChange={(e) => handleChange("fourthName", e.target.value)}
                required
                className={formData.fourthName === "" ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label htmlFor="type">صنف الموظف</Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) =>
                  handleChange("type", value as EmployeeType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر صنف الموظف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">دوام كامل</SelectItem>
                  <SelectItem value="Part-time">دوام جزئي</SelectItem>
                  <SelectItem value="Contract">عقد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div>
              <Label htmlFor="positionId">المنصب</Label>
              <Select
                name="positionId"
                value={formData.positionId}
                onValueChange={(value) => handleChange("positionId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنصب" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos._id} value={pos._id}>
                      {pos.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="workplaceId">مكان العمل</Label>
              <Select
                name="workplaceId"
                value={formData.workplaceId}
                onValueChange={(value) => handleChange("workplaceId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مكان العمل" />
                </SelectTrigger>
                <SelectContent>
                  {workplaces.map((wp) => (
                    <SelectItem key={wp._id} value={wp._id}>
                      {wp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="collegeId">الكلية</Label>
              <Select
                name="collegeId"
                value={formData.collegeId}
                onValueChange={(value) => handleChange("collegeId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الكلية" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((col) => (
                    <SelectItem key={col._id} value={col._id}>
                      {col.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="departmentId">القسم</Label>
              <Select
                name="departmentId"
                value={formData.departmentId}
                onValueChange={(value) => handleChange("departmentId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept._id} value={dept._id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <Label htmlFor="certificateId">الشهادة</Label>
              <Select
                name="certificateId"
                value={formData.certificateId}
                onValueChange={(value) => handleChange("certificateId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشهادة" />
                </SelectTrigger>
                <SelectContent>
                  {certificates.map((cert) => (
                    <SelectItem key={cert._id} value={cert._id}>
                      {cert.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="generalSpecializationId">التخصص العام</Label>
              <Select
                name="generalSpecializationId"
                value={formData.generalSpecializationId}
                onValueChange={(value) =>
                  handleChange("generalSpecializationId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر التخصص العام" />
                </SelectTrigger>
                <SelectContent>
                  {generalSpecializations.map((spec) => (
                    <SelectItem key={spec._id} value={spec._id}>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subspecialtyId">التخصص الدقيق</Label>
              <Select
                name="subspecialtyId"
                value={formData.subspecialtyId}
                onValueChange={(value) =>
                  handleChange("subspecialtyId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر التخصص الدقيق" />
                </SelectTrigger>
                <SelectContent>
                  {subspecialties.map((sub) => (
                    <SelectItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <Label htmlFor="jobGradeId">القب العلمي</Label>
              <Select
                name="jobGradeId"
                value={formData.jobGradeId}
                onValueChange={(value) => handleChange("jobGradeId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="القب العلمي" />
                </SelectTrigger>
                <SelectContent>
                  {jobGrades.map((grade) => (
                    <SelectItem key={grade._id} value={grade._id}>
                      {grade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">تاريخ المباشرة</Label>
              <div className="relative">
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-right font-normal",
                    !formData.startDate && "text-muted-foreground"
                  )}
                  onClick={() => {
                    // For demo, we use the calendar icon button to simulate date selection.
                    const today = new Date();
                    handleChange("startDate", today.toISOString());
                  }}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {formData.startDate
                    ? format(new Date(formData.startDate), "yyyy/MM/dd", {
                        locale: ar,
                      })
                    : "اختر التاريخ"}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isAssigned"
                checked={formData.isAssigned}
                onCheckedChange={(checked) => handleChange("isAssigned", checked)}
              />
              <Label htmlFor="isAssigned">منسب</Label>
            </div>
            {formData.isAssigned && (
              <>
                <div>
                  <Label htmlFor="assignedFrom">منسب من</Label>
                  <Input
                    id="assignedFrom"
                    value={formData.assignedFrom}
                    onChange={(e) => handleChange("assignedFrom", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="assignedTo">منسب الى</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) => handleChange("assignedTo", e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="special-category"
                  checked={showSpecialCategory}
                  onCheckedChange={setShowSpecialCategory}
                />
                <Label htmlFor="special-category">تفعيل الفئات الخاصة</Label>
              </div>
              {showSpecialCategory && (
                <RadioGroup
                  value={formData.specialCategory}
                  onValueChange={(value) => handleChange("specialCategory", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="politicalPrisoner" id="political-prisoner" />
                    <Label htmlFor="political-prisoner">السجناء السياسيين</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="martyrFamily" id="martyr-family" />
                    <Label htmlFor="martyr-family">ذوي الشهداء</Label>
                  </div>
                </RadioGroup>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <Label>اكتمال النموذج</Label>
        <Progress value={calculateProgress()} className="mt-2" />
      </div>
      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
      {renderStep()}
      <div className="flex justify-between">
        {currentStep > 0 && (
          <Button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
            السابق
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
            التالي
          </Button>
        ) : (
          <Button type="submit" disabled={!isFormValid}>
            {employee ? "تحديث الموظف" : "إضافة الموظف"}
          </Button>
        )}
      </div>
    </form>
  );
}
