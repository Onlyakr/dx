"use client";

import {
  Settings,
  FolderKanban,
  Book,
  ChartArea,
  Home,
  CalendarX,
  BanknoteArrowUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

import Link from "next/link";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Home",
    url: "/home",
    icon: Home,
  },
  {
    name: "Project",
    url: "/project",
    icon: FolderKanban,
    nested: [
      {
        name: "Project 1",
        url: "/project/project-1",
        icon: FolderKanban,
      },
      {
        name: "Project 2",
        url: "/project/project-2",
        icon: FolderKanban,
      },
    ],
  },
  {
    name: "KM",
    url: "/km",
    icon: Book,
  },
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: ChartArea,
  },
];

const secondaryItems = [
  {
    name: "แจ้งลา",
    url: "http://137.116.132.150/internship/assets/%E0%B9%83%E0%B8%9A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99-Dhnf0bGm.pdf",
    icon: CalendarX,
  },
  {
    name: "เบิกงบเบี้ยเลี้ยง",
    url: "https://forms.office.com/pages/responsepage.aspx?id=Dr-4XZKF0E6CsqbU13kz1HWtqYCabT1PkbKI66xW345UMTBTWDBPMk4zUENSOVQyNlBNRDVJSkk3OC4u&route=shorturl",
    icon: BanknoteArrowUp,
  },
  // {
  //   name: "Settings",
  //   url: "/settings",
  //   icon: Settings,
  // },
];

// Mock user data - replace with real auth
const userData = {
  name: "John Doe",
  email: "John@email.com",
  avatar:
    "https://www.telegraph.co.uk/content/dam/pets/2017/01/06/1-JS117202740-yana-two-face-cat-news_trans_NvBQzQNjv4BqJNqHJA5DVIMqgv_1zKR2kxRY9bnFVTp4QZlQjJfe6H0.jpg?imwidth=450",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <Link href="/home">
                  {/* <div className="flex size-8 items-center justify-center rounded-lg bg-grove-orange">
									<Citrus className="size-5 text-white" />
								</div> */}
                  <Logo height={30} width={50} />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-md font-semibold">
                      DX Scrum Meeting
                    </span>
                    {/*<span className="truncate text-xs text-muted-foreground">
                      Admin Dashboard
                    </span>*/}
                  </div>
                </Link>
              }
            ></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <NavMain navItems={navItems} label="Main Menu" />

        <SidebarSeparator />

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarMenu>
            {secondaryItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    render={
                      <Link href={item.url} target="_blank">
                        <item.icon className="size-4" />
                        <span className="font-thai">{item.name}</span>
                      </Link>
                    }
                    isActive={isActive}
                  ></SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
