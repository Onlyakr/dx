import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
// import {
//   Breadcrumb,
//   BreadcrumbList,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbSeparator,
//   BreadcrumbPage,
// } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import SearchBar from "@/components/search-bar";

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-8"
            />
            {/*<Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>*/}
          </div>

          {/*<SearchBar />*/}

          <div className="ml-auto mr-4">
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
