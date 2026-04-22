"use client";

import { Search, Plus, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import KMCard from "@/components/km/km-card";
import CategoryFilter from "@/components/km/category-filter";

export type KMItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  author: { name: string; avatar: string };
  createdAt: string;
  views: number;
  readTime: number;
};

const categories = [
  {
    label: "Documentation",
    value: "documentation",
  },
  {
    label: "Tutorial",
    value: "tutorial",
  },
  {
    label: "Guide",
    value: "guide",
  },
  {
    label: "FAQ",
    value: "faq",
  },
  {
    label: "Best Practices",
    value: "best-practices",
  },
  {
    label: "Other",
    value: "other",
  },
];

const mockKMItems: KMItem[] = [
  {
    id: "1",
    slug: "getting-started-with-project-setup",
    title: "Getting Started with Project Setup",
    description: "Learn how to set up your development environment.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-01-15",
    views: 245,
    readTime: 5,
  },
  {
    id: "2",
    slug: "authentication-flow-guide",
    title: "Authentication Flow Guide",
    description: "Complete guide to JWT authentication.",
    category: "Tutorial",
    author: { name: "Jane Smith", avatar: "" },
    createdAt: "2024-01-20",
    views: 189,
    readTime: 10,
  },
  {
    id: "3",
    slug: "api-best-practices",
    title: "API Best Practices",
    description: "Best practices for RESTful API design.",
    category: "Best Practices",
    author: { name: "Mike Johnson", avatar: "" },
    createdAt: "2024-01-22",
    views: 312,
    readTime: 8,
  },
  {
    id: "4",
    slug: "database-schema-design",
    title: "Database Schema Design",
    description: "Guidelines for database schemas.",
    category: "Guide",
    author: { name: "Sarah Wilson", avatar: "" },
    createdAt: "2024-01-25",
    views: 156,
    readTime: 12,
  },
  {
    id: "5",
    slug: "frequently-asked-questions",
    title: "Frequently Asked Questions",
    description: "Common questions and answers.",
    category: "FAQ",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-01-28",
    views: 567,
    readTime: 3,
  },
  {
    id: "6",
    slug: "code-review-checklist",
    title: "Code Review Checklist",
    description: "Essential code review checklist.",
    category: "Best Practices",
    author: { name: "Jane Smith", avatar: "" },
    createdAt: "2024-02-01",
    views: 234,
    readTime: 5,
  },
  {
    id: "7",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
  {
    id: "8",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
  {
    id: "9",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
  {
    id: "10",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
  {
    id: "11",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
  {
    id: "12",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
  {
    id: "13",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
  {
    id: "14",
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Documentation",
    author: { name: "John Doe", avatar: "" },
    createdAt: "2024-02-01",
    views: 0,
    readTime: 0,
  },
];

export default function KMPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKnowledge, setNewKnowledge] = useState({
    title: "",
    description: "",
    category: "Documentation",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredItems = useMemo(() => {
    return mockKMItems.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const handleCreateKnowledge = () => {
    setNewKnowledge({
      title: "",
      description: "",
      category: "Documentation",
    });
    setIsDialogOpen(false);
    toast.success("Knowledge created successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Knowledge Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Browse and search through our knowledge base
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
              placeholder="Search knowledge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CategoryFilter />
          <Button className="cursor-pointer" onClick={clearFilters}>
            <RotateCcw />
          </Button>
        </div>

        {/*Create Knowledge Button*/}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button className="cursor-pointer">
                <Plus className="mr-2 size-4" />
                New Knowledge
              </Button>
            }
          />
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Knowledge</DialogTitle>
              <DialogDescription>
                Add a new knowledge to the knowledge base.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Knowledge title"
                  value={newKnowledge.title}
                  onChange={(e) =>
                    setNewKnowledge({
                      ...newKnowledge,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Knowledge description"
                  value={newKnowledge.description}
                  onChange={(e) =>
                    setNewKnowledge({
                      ...newKnowledge,
                      description: e.target.value,
                    })
                  }
                  className="min-h-25"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  items={categories}
                  defaultValue="documentation"
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />

              <Button onClick={handleCreateKnowledge}>Create Knowledge</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/*KM Lists*/}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedItems.map((item) => (
          <KMCard key={item.id} item={item} />
        ))}
      </div>

      {/*Pagination*/}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Search className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No knowledge found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
