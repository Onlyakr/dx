import { Filter } from "lucide-react";
import { Button } from "../ui/button";

export default function ProjectFilter() {
  return (
    <Button variant="outline" className="cursor-pointer">
      <Filter className="size-4" />
    </Button>
  );
}
