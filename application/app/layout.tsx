import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/AppSidebar";
import { SignOutButton } from "@/components/SignOutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "نظام توصيف الملاك",
  description: "إدارة خطة توصيف الملاك الخاصة بالأقسام والكليات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={`${inter.className} rtl`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto p-8 pt-16 lg:pt-8">
                <div className="flex justify-end mb-4">
                  <SignOutButton />
                </div>
                {children}
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
