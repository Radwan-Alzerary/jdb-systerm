import { useState } from "react"
import type { Admin, AdminRole, College, Department } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdminFormProps {
  admin?: Partial<Admin>
  onSubmit: (admin: Omit<Admin, "id">) => void
  colleges: College[]
  departments: Department[]
}

export function AdminForm({ admin, onSubmit, colleges, departments }: AdminFormProps) {
  const [name, setName] = useState(admin?.name || "")
  const [email, setEmail] = useState(admin?.email || "")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<AdminRole>(admin?.role || "department")
  const [entityId, setEntityId] = useState(admin?.entityId || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, password, role, entityId })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">الاسم</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">كلمة المرور</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!admin}
          placeholder={admin ? "اتركه فارغًا للاحتفاظ بكلمة المرور الحالية" : ""}
        />
      </div>
      <div>
        <Label htmlFor="role">الدور</Label>
        <Select value={role} onValueChange={(value: AdminRole) => setRole(value)}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">مدير كامل</SelectItem>
            <SelectItem value="college">مدير كلية</SelectItem>
            <SelectItem value="department">مدير قسم</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {role !== "full" && (
        <div>
          <Label htmlFor="entityId">{role === "college" ? "الكلية" : "القسم"}</Label>
          <Select value={entityId} onValueChange={setEntityId}>
            <SelectTrigger>
              <SelectValue placeholder={`اختر ${role === "college" ? "الكلية" : "القسم"}`} />
            </SelectTrigger>
            <SelectContent>
              {role === "college"
                ? colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))
                : departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Button type="submit">{admin ? "تحديث" : "إضافة"} المسؤول</Button>
    </form>
  )
}

