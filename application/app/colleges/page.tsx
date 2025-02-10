"use client";

import { useState, useEffect } from "react";
import type { College, Department, Admin } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Disclosure } from "@headlessui/react";
import {
  fetchColleges,
  createCollege,
  updateCollege,
  deleteCollege,
  fetchDepartments,
  createDepartment,
  fetchAdmins,
  createAdmin,
  updateAdmin,
} from "@/utils/api";

export default function CollegesPage() {
  // Main data states
  const [colleges, setColleges] = useState<College[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);

  // College add/edit states
  const [isAddCollegeOpen, setIsAddCollegeOpen] = useState(false);
  const [isEditCollegeOpen, setIsEditCollegeOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [collegeName, setCollegeName] = useState("");

  // Department add states
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [activeCollegeForDept, setActiveCollegeForDept] = useState<string | null>(null);

  // Global state for College Admin Dialog (adding/editing)
  const [isAddCollegeAdminOpen, setIsAddCollegeAdminOpen] = useState(false);
  const [isEditCollegeAdminOpen, setIsEditCollegeAdminOpen] = useState(false);
  const [activeCollegeForAdmin, setActiveCollegeForAdmin] = useState<string | null>(null);
  const [editingCollegeAdmin, setEditingCollegeAdmin] = useState<Admin | null>(null);
  const [collegeAdminName, setCollegeAdminName] = useState("");
  const [collegeAdminEmail, setCollegeAdminEmail] = useState("");
  const [collegeAdminPassword, setCollegeAdminPassword] = useState("");

  // Global state for Department Admin Dialog (adding/editing)
  const [isAddDeptAdminOpen, setIsAddDeptAdminOpen] = useState(false);
  const [isEditDeptAdminOpen, setIsEditDeptAdminOpen] = useState(false);
  const [activeDeptForAdmin, setActiveDeptForAdmin] = useState<string | null>(null);
  const [editingDeptAdmin, setEditingDeptAdmin] = useState<Admin | null>(null);
  const [deptAdminName, setDeptAdminName] = useState("");
  const [deptAdminEmail, setDeptAdminEmail] = useState("");
  const [deptAdminPassword, setDeptAdminPassword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [collegesData, departmentsData, adminsData] = await Promise.all([
        fetchColleges(),
        fetchDepartments(),
        fetchAdmins(),
      ]);
      setColleges(collegesData);
      setDepartments(departmentsData);
      setAdmins(adminsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "خطأ",
        description: "فشل في جلب البيانات",
        variant: "destructive",
      });
    }
  };

  // --- College Handlers ---
  const handleCreateCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCollege({ name: collegeName });
      fetchData();
      setIsAddCollegeOpen(false);
      setCollegeName("");
      toast({ title: "نجاح", description: "تمت إضافة الكلية بنجاح" });
    } catch (error) {
      console.error("Error creating college:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة الكلية",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollege) return;
    try {
      await updateCollege({ ...editingCollege, name: collegeName });
      fetchData();
      setIsEditCollegeOpen(false);
      setEditingCollege(null);
      setCollegeName("");
      toast({ title: "نجاح", description: "تم تحديث الكلية بنجاح" });
    } catch (error) {
      console.error("Error updating college:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الكلية",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCollege = async (id: string) => {
    try {
      await deleteCollege(id);
      fetchData();
      toast({ title: "نجاح", description: "تم حذف الكلية بنجاح" });
    } catch (error) {
      console.error("Error deleting college:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الكلية",
        variant: "destructive",
      });
    }
  };

  // --- Department Handler ---
  const handleAddDepartment = async (e: React.FormEvent, collegeId: string) => {
    e.preventDefault();
    try {
      await createDepartment({ name: newDepartmentName, collegeId });
      fetchData();
      setNewDepartmentName("");
      setActiveCollegeForDept(null);
      toast({ title: "نجاح", description: "تمت إضافة القسم بنجاح" });
    } catch (error) {
      console.error("Error adding department:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة القسم",
        variant: "destructive",
      });
    }
  };

  // --- Global College Admin Handlers ---
  const handleAddCollegeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleAddCollegeAdmin called", {
      collegeAdminName,
      collegeAdminEmail,
      collegeAdminPassword,
      activeCollegeForAdmin,
    });
    if (!activeCollegeForAdmin) {
      console.error("activeCollegeForAdmin is undefined");
      toast({
        title: "خطأ",
        description: "يرجى اختيار الكلية أولاً",
        variant: "destructive",
      });
      return;
    }
    try {
      await createAdmin({
        name: collegeAdminName,
        email: collegeAdminEmail,
        password: collegeAdminPassword,
        role: "college",
        entityId: activeCollegeForAdmin,
      });
      fetchData();
      setIsAddCollegeAdminOpen(false);
      setActiveCollegeForAdmin(null);
      setCollegeAdminName("");
      setCollegeAdminEmail("");
      setCollegeAdminPassword("");
      toast({ title: "نجاح", description: "تمت إضافة عضو الارتباط الرئيسي بنجاح" });
    } catch (error) {
      console.error("Error adding college admin:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة عضو الارتباط الرئيسي",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCollegeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollegeAdmin) return;
    try {
      await updateAdmin({
        ...editingCollegeAdmin,
        name: collegeAdminName,
        email: collegeAdminEmail,
      });
      fetchData();
      setIsEditCollegeAdminOpen(false);
      setEditingCollegeAdmin(null);
      setCollegeAdminName("");
      setCollegeAdminEmail("");
      toast({ title: "نجاح", description: "تم تحديث عضو الارتباط الرئيسي بنجاح" });
    } catch (error) {
      console.error("Error updating college admin:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث عضو الارتباط الرئيسي",
        variant: "destructive",
      });
    }
  };

  // --- Global Department Admin Handlers ---
  const handleAddDeptAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleAddDeptAdmin called", {
      deptAdminName,
      deptAdminEmail,
      deptAdminPassword,
      activeDeptForAdmin,
    });
    if (!activeDeptForAdmin) {
      console.error("activeDeptForAdmin is undefined");
      toast({
        title: "خطأ",
        description: "يرجى اختيار القسم أولاً",
        variant: "destructive",
      });
      return;
    }
    try {
      await createAdmin({
        name: deptAdminName,
        email: deptAdminEmail,
        password: deptAdminPassword,
        role: "department",
        entityId: activeDeptForAdmin,
      });
      fetchData();
      setIsAddDeptAdminOpen(false);
      setActiveDeptForAdmin(null);
      setDeptAdminName("");
      setDeptAdminEmail("");
      setDeptAdminPassword("");
      toast({ title: "نجاح", description: "تمت إضافة مدير القسم بنجاح" });
    } catch (error) {
      console.error("Error adding department admin:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة مدير القسم",
        variant: "destructive",
      });
    }
  };

  const handleUpdateDeptAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDeptAdmin) return;
    try {
      await updateAdmin({
        ...editingDeptAdmin,
        name: deptAdminName,
        email: deptAdminEmail,
      });
      fetchData();
      setIsEditDeptAdminOpen(false);
      setEditingDeptAdmin(null);
      setDeptAdminName("");
      setDeptAdminEmail("");
      toast({ title: "نجاح", description: "تم تحديث مدير القسم بنجاح" });
    } catch (error) {
      console.error("Error updating department admin:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث مدير القسم",
        variant: "destructive",
      });
    }
  };

  // --- Helpers ---
  const getCollegeAdmin = (collegeId: string): Admin | undefined =>
    admins.find((admin) => admin.role === "college" && admin.entityId === collegeId);

  const getDeptAdmin = (deptId: string): Admin | undefined =>
    admins.find((admin) => admin.role === "department" && admin.entityId === deptId);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">الكليات</h1>
        <Dialog open={isAddCollegeOpen} onOpenChange={setIsAddCollegeOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddCollegeOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" /> إضافة كلية
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة كلية جديدة</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCollege} className="space-y-4">
              <Input
                placeholder="اسم الكلية"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
              />
              <Button type="submit">إضافة الكلية</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Colleges List */}
      <div className="space-y-4">
        {colleges.map((college) => (
          <Disclosure key={college._id}>
            {({ open }) => (
              <div className="bg-white rounded-lg shadow">
                <Disclosure.Button className="flex w-full justify-between items-center p-4 text-left">
                  <span className="text-xl font-semibold">{college.name}</span>
                  {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Disclosure.Button>
                <Disclosure.Panel className="p-4 border-t space-y-6">
                  {/* College Actions */}
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCollege(college);
                        setCollegeName(college.name);
                        setIsEditCollegeOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> تعديل الكلية
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteCollege(college._id)}>
                      حذف الكلية
                    </Button>
                  </div>
                  {/* College Admin Section */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold mb-2">عضو الارتباط الرئيسي للكلية</h3>
                    {getCollegeAdmin(college._id) ? (
                      <div className="flex items-center justify-between">
                        <span>
                          {getCollegeAdmin(college._id)?.name} ({getCollegeAdmin(college._id)?.email})
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const admin = getCollegeAdmin(college._id);
                            if (admin) {
                              setEditingCollegeAdmin(admin);
                              setCollegeAdminName(admin.name);
                              setCollegeAdminEmail(admin.email);
                              setIsEditCollegeAdminOpen(true);
                            }
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> تعديل
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>لا يوجد عضو ارتباط رئيسي</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setActiveCollegeForAdmin(college._id);
                            console.log("Setting activeCollegeForAdmin to", college._id);
                            setIsAddCollegeAdminOpen(true);
                          }}
                        >
                          <PlusIcon className="mr-2 h-4 w-4" /> إضافة مدير
                        </Button>
                      </div>
                    )}
                  </div>
                  {/* Departments Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-2">الأقسام</h3>
                    <ul className="space-y-2">
                      {departments
                        .filter((dept) => dept.collegeId === college._id)
                        .map((dept) => {
                          const deptAdmin = admins.find(
                            (admin) => admin.role === "department" && admin.entityId === dept._id
                          );
                          return (
                            <li key={dept._id} className="border p-2 rounded flex flex-col">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{dept.name}</span>
                                {deptAdmin ? (
                                  <div className="flex items-center">
                                    <span className="text-sm">
                                      {deptAdmin.name} ({deptAdmin.email})
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="ml-2"
                                      onClick={() => {
                                        setEditingDeptAdmin(deptAdmin);
                                        setDeptAdminName(deptAdmin.name);
                                        setDeptAdminEmail(deptAdmin.email);
                                        setIsEditDeptAdminOpen(true);
                                      }}
                                    >
                                      <Pencil className="mr-1 h-4 w-4" /> تعديل
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setActiveDeptForAdmin(dept._id);
                                      setIsAddDeptAdminOpen(true);
                                    }}
                                  >
                                    <PlusIcon className="mr-2 h-4 w-4" /> إضافة مدير
                                  </Button>
                                )}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                    <div className="mt-4">
                      {activeCollegeForDept === college._id ? (
                        <form
                          onSubmit={(e) => handleAddDepartment(e, college._id)}
                          className="flex space-x-2"
                        >
                          <Input
                            placeholder="اسم القسم الجديد"
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                            required
                          />
                          <Button type="submit" size="sm">
                            إضافة القسم
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setActiveCollegeForDept(null)}
                          >
                            إلغاء
                          </Button>
                        </form>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setActiveCollegeForDept(college._id)}
                        >
                          <PlusIcon className="mr-2 h-4 w-4" /> إضافة قسم
                        </Button>
                      )}
                    </div>
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Global Dialog for Adding College Admin */}
      {isAddCollegeAdminOpen && activeCollegeForAdmin && (
        <Dialog
          open={isAddCollegeAdminOpen}
          onOpenChange={(open) => {
            console.log("College Admin Dialog open:", open);
            setIsAddCollegeAdminOpen(open);
            if (!open) {
              setActiveCollegeForAdmin(null);
              setCollegeAdminName("");
              setCollegeAdminEmail("");
              setCollegeAdminPassword("");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                إضافة عضو الارتباط الرئيسي للكلية:{" "}
                {colleges.find((c) => c._id === activeCollegeForAdmin)?.name}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCollegeAdmin} className="space-y-4">
              <Input
                placeholder="اسم المدير"
                value={collegeAdminName}
                onChange={(e) => setCollegeAdminName(e.target.value)}
                required
              />
              <Input
                placeholder="البريد الإلكتروني"
                type="email"
                value={collegeAdminEmail}
                onChange={(e) => setCollegeAdminEmail(e.target.value)}
                required
              />
              <Input
                placeholder="كلمة المرور"
                type="password"
                value={collegeAdminPassword}
                onChange={(e) => setCollegeAdminPassword(e.target.value)}
                required
              />
              <Button type="submit">إضافة المدير</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Global Dialog for Editing College Admin */}
      {isEditCollegeAdminOpen && editingCollegeAdmin && (
        <Dialog
          open={isEditCollegeAdminOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsEditCollegeAdminOpen(false);
              setEditingCollegeAdmin(null);
              setCollegeAdminName("");
              setCollegeAdminEmail("");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل عضو الارتباط الرئيسي للكلية</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateCollegeAdmin} className="space-y-4">
              <Input
                placeholder="اسم المدير"
                value={collegeAdminName}
                onChange={(e) => setCollegeAdminName(e.target.value)}
                required
              />
              <Input
                placeholder="البريد الإلكتروني"
                type="email"
                value={collegeAdminEmail}
                onChange={(e) => setCollegeAdminEmail(e.target.value)}
                required
              />
              <Button type="submit">تحديث المدير</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Global Dialog for Adding Department Admin */}
      {isAddDeptAdminOpen && activeDeptForAdmin && (
        <Dialog
          open={isAddDeptAdminOpen}
          onOpenChange={(open) => {
            console.log("Department Admin Dialog open:", open);
            setIsAddDeptAdminOpen(open);
            if (!open) {
              setActiveDeptForAdmin(null);
              setDeptAdminName("");
              setDeptAdminEmail("");
              setDeptAdminPassword("");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                إضافة مدير للقسم:{" "}
                {departments.find((d) => d._id === activeDeptForAdmin)?.name}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDeptAdmin} className="space-y-4">
              <Input
                placeholder="اسم المدير"
                value={deptAdminName}
                onChange={(e) => setDeptAdminName(e.target.value)}
                required
              />
              <Input
                placeholder="البريد الإلكتروني"
                type="email"
                value={deptAdminEmail}
                onChange={(e) => setDeptAdminEmail(e.target.value)}
                required
              />
              <Input
                placeholder="كلمة المرور"
                type="password"
                value={deptAdminPassword}
                onChange={(e) => setDeptAdminPassword(e.target.value)}
                required
              />
              <Button type="submit">إضافة المدير</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Global Dialog for Editing Department Admin */}
      {isEditDeptAdminOpen && editingDeptAdmin && (
        <Dialog
          open={isEditDeptAdminOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsEditDeptAdminOpen(false);
              setEditingDeptAdmin(null);
              setDeptAdminName("");
              setDeptAdminEmail("");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل مدير القسم</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateDeptAdmin} className="space-y-4">
              <Input
                placeholder="اسم المدير"
                value={deptAdminName}
                onChange={(e) => setDeptAdminName(e.target.value)}
                required
              />
              <Input
                placeholder="البريد الإلكتروني"
                type="email"
                value={deptAdminEmail}
                onChange={(e) => setDeptAdminEmail(e.target.value)}
                required
              />
              <Button type="submit">تحديث المدير</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
