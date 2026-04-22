import { MoreHorizontal, Plus, RotateCcw, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

import TaskFilter from "./task-filter";

const scrumBoard = {
  todo: [
    { id: 1, title: "Add notifications", assignee: "Mike", priority: "Medium" },
    { id: 2, title: "Setup CI/CD", assignee: "John", priority: "High" },
  ],
  inProgress: [
    {
      id: 3,
      title: "Implement authentication",
      assignee: "Jane",
      priority: "High",
    },
    {
      id: 4,
      title: "Create API endpoints",
      assignee: "Mike",
      priority: "High",
    },
  ],
  done: [
    {
      id: 5,
      title: "Setup project structure",
      assignee: "John",
      priority: "High",
    },
    {
      id: 6,
      title: "Create database schema",
      assignee: "Jane",
      priority: "High",
    },
  ],
};

export default function ScrumBoardTab() {
  const columns = [
    {
      key: "todo",
      title: "To Do",
      items: scrumBoard.todo,
      color: "bg-gray-500",
    },
    {
      key: "inProgress",
      title: "In Progress",
      items: scrumBoard.inProgress,
      color: "bg-blue-500",
    },
    {
      key: "done",
      title: "Done",
      items: scrumBoard.done,
      color: "bg-green-500",
    },
  ];

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
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => (
          <Card key={column.key} className="group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className={`size-2 rounded-full ${column.color}`} />
                {column.title}
                <Badge variant="secondary" className="ml-2">
                  {column.items.length}
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon-sm"
                className="group-hover:visible invisible transition duration-200"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border p-3 hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="font-medium text-sm mb-2">{item.title}</div>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-xs">
                        {item.assignee[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Badge
                      variant={
                        item.priority === "High"
                          ? "destructive"
                          : item.priority === "Medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
