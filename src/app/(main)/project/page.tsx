"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Plus,
  FolderKanban,
  RotateCcw,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ProjectFilter from "@/components/projects/project-filter";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const projects = [
  {
    id: "project-1",
    name: "Project 1",
    description: "Main project for DX Scrum Meeting",
    members: 5,
    createdAt: "2024-01-01",
    status: "In Progress",
    color: "bg-blue-500",
  },
  {
    id: "project-2",
    name: "Project 2",
    description: "Secondary project for feature development",
    members: 3,
    createdAt: "2024-02-15",
    status: "Planning",
    color: "bg-purple-500",
  },
];

export default function ProjectPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    members: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const handleCreateProject = () => {
    setNewProject({
      title: "",
      description: "",
      members: "",
    });
    setIsDialogOpen(false);
    toast.success("Project created successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all your projects
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        {/*Search & Filter*/}
        <div className="flex flex-1 gap-2">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              type="search"
              placeholder="Search Project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ProjectFilter />
          <Button className="cursor-pointer" onClick={clearFilters}>
            <RotateCcw />
          </Button>
        </div>

        {/*Create Project Button*/}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button className="cursor-pointer">
                <Plus className="mr-2 size-4" />
                New Project
              </Button>
            }
          />
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New project</DialogTitle>
              <DialogDescription>
                Add a new Project to the Project base.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Project title"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Project description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="members">Members</Label>
                <Input
                  id="members"
                  placeholder="@Jamie Oliver"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />

              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`}>
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors gap-4">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-10 rounded-lg ${project.color} flex items-center justify-center`}
                  >
                    <FolderKanban className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="flex gap-4 items-center">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <CardDescription className="mt-1">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="size-4" />
                </Button>
              </CardHeader>

              <Separator />

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="size-4" />
                    <span>{project.members} members</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created {project.createdAt}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
