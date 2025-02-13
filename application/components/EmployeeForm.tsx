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
import { Progress } from "@/components/ui/progress";
import { Stepper } from "@/components/Stepper";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface EmployeeFormProps {
  employee?: Partial<Employee>;
  onSubmit: (employee: Employee) => void;
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
  "معلومات وظيفية",
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

  // We include the id (if any) and also keep the split name parts.
  const [formData, setFormData] = useState<
    Employee & {
      firstName: string;
      secondName: string;
      thirdName: string;
      fourthName: string;
      sirName: string;
    }
  >(() => {
    const nameParts = employee?.name
      ? employee.name.split(" ")
      : ["", "", "", "", ""];
    return {
      id: employee?._id,
      firstName: nameParts[0] || "",
      secondName: nameParts[1] || "",
      thirdName: nameParts[2] || "",
      fourthName: nameParts[3] || "",
      sirName: nameParts[4] || "",
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
      ScientificTitle: employee?.ScientificTitle || "",
      startFromDegreeDate: employee?.startFromDegreeDate || "",
    };
  });

  const [showSpecialCategory, setShowSpecialCategory] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Recalculate form validity when formData changes.
  useEffect(() => {
    checkFormValidity();
  }, [formData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Use the same list of required fields for both validity and progress.
  const requiredFields = [
    "firstName",
    "secondName",
    "thirdName",
    "fourthName",
    "sirName",
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

  const checkFormValidity = () => {
    const isValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData] !== ""
    );
    setIsFormValid(isValid);
  };

  const calculateProgress = () => {
    const filledCount = requiredFields.filter(
      (field) => formData[field as keyof typeof formData] !== ""
    ).length;
    return (filledCount / requiredFields.length) * 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length - 1 && isFormValid) {
      // Recombine the name parts.
      const fullName = `${formData.firstName} ${formData.secondName} ${formData.thirdName} ${formData.fourthName} ${formData.sirName}`.trim();
      const submissionData: Employee = {
        ...formData,
        name: fullName,
      };

      // Remove the separate name parts (they were only used for editing).
      delete (submissionData as any).firstName;
      delete (submissionData as any).secondName;
      delete (submissionData as any).thirdName;
      delete (submissionData as any).fourthName;
      delete (submissionData as any).sirName;

      onSubmit(submissionData);
    } else if (currentStep === steps.length - 1) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
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

      {/* --- STEP 0: Personal Information --- */}
      <div className={currentStep === 0 ? "block" : "hidden"}>
        <div>
          <Label htmlFor="hierarchy">صنف الموظف</Label>
          <Select
            name="hierarchy"
            value={(formData as any).hierarchy}
            onValueChange={(value) => handleChange("hierarchy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر اللقب العلمي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="تدريسي" value="تدريسي">
                تدريسي
              </SelectItem>
              <SelectItem key="اداري" value="اداري">
                اداري
              </SelectItem>
              <SelectItem key="فني" value="فني">
                فني
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          <Label htmlFor="sirName">اللقب</Label>
          <Input
            id="sirName"
            name="sirName"
            value={formData.sirName}
            onChange={(e) => handleChange("sirName", e.target.value)}
            required
            className={formData.sirName === "" ? "border-red-500" : ""}
          />
        </div>
        <div>
          <Label htmlFor="type">حالة الموظف</Label>
          <Select
            name="type"
            value={formData.type}
            onValueChange={(value) => handleChange("type", value as EmployeeType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر حالة الموظف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">ملاك</SelectItem>
              <SelectItem value="Part-time">عقد</SelectItem>
              <SelectItem value="Contract">منسب</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.type === "Contract" && (
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
      </div>

      {/* --- STEP 1: Job Details --- */}
      <div className={currentStep === 1 ? "block" : "hidden"}>
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
      </div>

      {/* --- STEP 2: Education & Specialization --- */}
      <div className={currentStep === 2 ? "block" : "hidden"}>
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
            onValueChange={(value) => handleChange("subspecialtyId", value)}
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
      </div>

      {/* --- STEP 3: Job Information --- */}
      <div className={currentStep === 3 ? "block" : "hidden"}>
        <div>
          <Label htmlFor="ScientificTitle">اللقب العلمي</Label>
          <Select
            name="ScientificTitle"
            value={formData.ScientificTitle}
            onValueChange={(value) => handleChange("ScientificTitle", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر اللقب العلمي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="تدريسي" value="تدريسي">
                مدرس مساعد
              </SelectItem>
              <SelectItem key="مدرس" value="مدرس">
                مدرس
              </SelectItem>
              <SelectItem key="استاذ مساعد" value="استاذ مساعد">
                استاذ مساعد
              </SelectItem>
              <SelectItem key="استاذ" value="استاذ">
                استاذ
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="jobGradeId">الدرجة الوظيفية</Label>
          <Select
            name="jobGradeId"
            value={formData.jobGradeId}
            onValueChange={(value) => handleChange("jobGradeId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="الدرجة الوظيفية" />
            </SelectTrigger>
            <SelectContent>
              {jobGrades.map((grade) => (
                <SelectItem key={grade._id} value={grade._id}>
                  {grade.name} - {grade.level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="startFromDegreeDate">
            تاريخ الحصول على الدرجة الوظيفية
          </Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-right font-normal",
                    !formData.startFromDegreeDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {formData.startFromDegreeDate
                    ? format(new Date(formData.startFromDegreeDate), "yyyy/MM/dd", { locale: ar })
                    : "اختر التاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={
                    formData.startFromDegreeDate
                      ? new Date(formData.startFromDegreeDate)
                      : undefined
                  }
                  onSelect={(date) => {
                    if (date) {
                      handleChange("startFromDegreeDate", date.toISOString());
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          <Label htmlFor="startDate">تاريخ المباشرة في التعليم</Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-right font-normal",
                    !formData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {formData.startDate
                    ? format(new Date(formData.startDate), "yyyy/MM/dd", { locale: ar })
                    : "اختر التاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={
                    formData.startDate
                      ? new Date(formData.startDate)
                      : undefined
                  }
                  onSelect={(date) => {
                    if (date) {
                      handleChange("startDate", date.toISOString());
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div style={{ direction: "rtl" }}>
          <Label htmlFor="assignedTo">
            الرقم التعريفي في منصة ال (ems)
          </Label>
          <Input
            id="assignedTo"
            value={formData.assignedTo}
            onChange={(e) => handleChange("assignedTo", e.target.value)}
          />
        </div>
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
      </div>

      {/* --- Navigation Buttons --- */}
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
