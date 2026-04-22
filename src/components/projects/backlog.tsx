import {
  Plus,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Search,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import TaskFilter from "./task-filter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const backlogItems = [
  {
    id: 1,
    title: "Setup project structure",
    priority: "High",
    status: "Done",
    assignee: "John",
  },
  {
    id: 2,
    title: "Implement authentication",
    priority: "High",
    status: "In Progress",
    assignee: "Jane",
  },
  {
    id: 3,
    title: "Create dashboard",
    priority: "Medium",
    status: "Todo",
    assignee: "Mike",
  },
  {
    id: 4,
    title: "Add user settings",
    priority: "Low",
    status: "Todo",
    assignee: "Sarah",
  },
  {
    id: 5,
    title: "Setup database",
    priority: "High",
    status: "Done",
    assignee: "John",
  },
  {
    id: 6,
    title: "API integration",
    priority: "High",
    status: "In Progress",
    assignee: "Jane",
  },
];

export default function BacklogTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/*Search & Filter*/}
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              type="search"
              placeholder="Search task..."
            />
          </div>
          <TaskFilter />
          <Button className="cursor-pointer">
            <RotateCcw />
          </Button>
        </div>

        <Button size="sm">
          <Plus className="mr-2 size-4" />
          Add Task
        </Button>
      </div>
      {/*<p className="text-muted-foreground">
        All {backlogItems.length} tasks for this project
      </p>*/}

      <div className="flex flex-col gap-2">
        {backlogItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-5 w-5 items-center justify-center">
                {item.status === "Done" && (
                  <CheckCircle2 className="size-4 text-green-500" />
                )}
                {item.status === "In Progress" && (
                  <Clock className="size-4 text-blue-500" />
                )}
                {item.status === "Todo" && (
                  <div className="size-3 rounded-full bg-muted-foreground" />
                )}
              </div>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  {item.assignee} • {item.status}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  item.priority === "High"
                    ? "destructive"
                    : item.priority === "Medium"
                      ? "default"
                      : "secondary"
                }
              >
                {item.priority}
              </Badge>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/*Pagination*/}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
