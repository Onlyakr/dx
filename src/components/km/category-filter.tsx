import { Filter } from "lucide-react";
import { Button } from "../ui/button";

export default function CategoryFilter() {
  return (
    <Button variant="outline" className="cursor-pointer">
      <Filter className="size-4" />
    </Button>
  );
}
