"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  MapPin,
  Award,
  Book,
  Microscope,
  Menu,
  FolderTreeIcon as HierarchyIcon,
  UserCog,
  LayoutDashboard,
  ClipboardList,
  Sun,
  Moon,
  Shield,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/dashboard" },
  { icon: GraduationCap, label: "الكليات و المعاهد", href: "/colleges" },
  { icon: Building2, label: "الأقسام", href: "/departments" },
  { icon: Award, label: "الشهادات", href: "/certificates" },
  { icon: Book, label: "التخصصات العامة", href: "/general-specializations" },
  { icon: Microscope, label: "التخصصات الدقيقة", href: "/subspecialties" },
  { icon: Briefcase, label: "المناصب", href: "/positions" },
  { icon: MapPin, label: "أماكن العمل", href: "/workplaces" },
  { icon: Briefcase, label: "الدرجة الوظيفية", href: "/job-grades" },
  { icon: Users, label: "الموظفون", href: "/employees" },
  { icon: ClipboardList, label: "متطلبات الأقسام", href: "/department-requirements" },
  { icon: HierarchyIcon, label: "الهيكل التنظيمي", href: "/hierarchy" },
  { icon: Shield, label: "إدارة المسؤولين", href: "/admin-management" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()
  const router = useRouter()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const filteredMenuItems = menuItems.filter((item) => {
    if (!user) return false
    if (user.role === "full") return true
    if (user.role === "college") return !["admin-management"].includes(item.href.slice(1))
    if (user.role === "department")
      return ["dashboard", "employees", "department-requirements"].includes(item.href.slice(1))
    return false
  })

  const SidebarContent = () => (
    <ScrollArea className="h-full py-6 pl-6 pr-6 lg:pr-0">
      <div className="flex items-center justify-between mb-6 pl-4">
        <div className="flex items-center">
          <GraduationCap className="h-6 w-6 text-primary ml-2" />
          <h2 className="text-2xl font-bold text-primary">خطة توصيف الملاك</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="space-y-1">
        {filteredMenuItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href={item.href} className="flex items-center gap-2 px-4 py-2">
              <item.icon className="h-4 w-4 mr-2" />
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}
        {user && (
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 ml-2" />
            <span>تسجيل الخروج</span>
          </Button>
        )}
      </nav>
    </ScrollArea>
  )

  const handleSignOut = () => {
    signOut()
    router.push("/signin")
  }

  if (!user) return null

  return (
    <>
      <aside className="hidden lg:flex h-screen w-64 flex-col border-l bg-background">
        <SidebarContent />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed right-4 top-4 z-40">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

