/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

type NavItem = {
  name: string;
  url: string;
  icon: LucideIcon;
  nested?: NavItem[];
};

function NavItemRow({
  item,
  pathname,
  isExpanded,
  onToggle,
}: {
  item: NavItem;
  pathname: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isActive =
    pathname === item.url ||
    (item.url !== "/dashboard" && pathname.startsWith(item.url));
  const hasNested = item.nested && item.nested.length > 0;

  return (
    <>
      <SidebarMenuButton
        render={
          <div className="flex w-full items-center justify-between pr-2">
            <Link href={item.url} className="flex flex-1 items-center gap-2">
              <item.icon className="size-4" />
              <span>{item.name}</span>
            </Link>
            {hasNested && (
              <button
                className="pointer-events-auto p-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggle();
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </button>
            )}
          </div>
        }
        isActive={isActive}
      />
      {hasNested && isExpanded && (
        <SidebarMenuSub>
          {item.nested!.map((subItem) => {
            const isSubActive = pathname === subItem.url;
            return (
              <SidebarMenuSubItem key={subItem.name}>
                <SidebarMenuSubButton
                  render={
                    <Link href={subItem.url}>
                      <span>{subItem.name}</span>
                    </Link>
                  }
                  isActive={isSubActive}
                />
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </>
  );
}

export function NavMain({
  navItems,
  label = "Navigation",
}: {
  navItems: NavItem[];
  label?: string;
}) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => {
          const hasNested = item.nested && item.nested.length > 0;
          const isExpanded = hasNested
            ? (expandedItems[item.name] ?? false)
            : false;

          return (
            <SidebarMenuItem key={item.name}>
              <NavItemRow
                item={item}
                pathname={pathname}
                isExpanded={isExpanded}
                onToggle={() => toggleExpanded(item.name)}
              />
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
