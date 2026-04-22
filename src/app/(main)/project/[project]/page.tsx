/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { Users, ListTodo, LayoutGrid } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

import SummaryTab from "@/components/projects/summary";
import BacklogTab from "@/components/projects/backlog";
import ScrumBoardTab from "@/components/projects/scrum";

type ProjectData = {
  slug: string;
  name: string;
  description: string;
  members: number;
  createdAt: string;
  status: string;
};

const mockProject: ProjectData[] = [
  {
    slug: "project-1",
    name: "Project 1",
    description: "Main project for DX Scrum Meeting",
    members: 5,
    createdAt: "2024-01-01",
    status: "In Progress",
  },
  {
    slug: "project-2",
    name: "Project 2",
    description: "Secondary project",
    members: 3,
    createdAt: "2024-01-02",
    status: "Done",
  },
];

const recentActivity = [
  {
    user: "Jane",
    action: "completed",
    item: "Setup database schema",
    time: "2 hours ago",
  },
  {
    user: "Mike",
    action: "moved",
    item: "API integration to In Progress",
    time: "4 hours ago",
  },
  {
    user: "John",
    action: "created",
    item: "New task: Add notifications",
    time: "1 day ago",
  },
];

const teamMembers = [
  { name: "John Doe", role: "Scrum Master", avatar: "" },
  { name: "Jane Smith", role: "Developer", avatar: "" },
  { name: "Mike Johnson", role: "Developer", avatar: "" },
  { name: "Sarah Wilson", role: "Designer", avatar: "" },
];

export default function ProjectPage() {
  const pathname = usePathname();
  const project = mockProject.find((p) => p.slug === pathname.split("/").pop());

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {project?.name}
            </h1>
            <Badge variant="outline">{project?.status}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">{project?.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {teamMembers.map((member, i) => (
              <Avatar key={i} className="size-8 border-2 border-background">
                <AvatarFallback className="text-xs">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span>{project?.members} members</span>
          </div>
        </div>
      </div>

      {/*<Separator />*/}

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">
            <ListTodo className="mr-2 size-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="backlog">
            <ListTodo className="mr-2 size-4" />
            Backlog
          </TabsTrigger>
          <TabsTrigger value="scrum">
            <LayoutGrid className="mr-2 size-4" />
            Scrum Board
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <SummaryTab />
        </TabsContent>
        <TabsContent value="backlog">
          <BacklogTab />
        </TabsContent>
        <TabsContent value="scrum">
          <ScrumBoardTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { mockProject, teamMembers };
