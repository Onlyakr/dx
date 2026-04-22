import { getInitials } from "@/lib/utils";
import { ArrowUpRight, BookOpen, FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";

import type { KMItem } from "@/app/(main)/km/page";
import Link from "next/link";
import { Button } from "../ui/button";

export default function KMCard({ item }: { item: KMItem }) {
  return (
    <Card className="flex flex-col py-4 hover:shadow-md transition-shadow cursor-pointer gap-4">
      <CardHeader>
        <CardAction>
          <Link href={`/km/${item.slug}`}>
            <Button variant="ghost" size="icon-sm">
              <ArrowUpRight className="size-5" />
            </Button>
          </Link>
        </CardAction>
        <Badge variant="outline" className="mb-2 w-fit">
          {item.category}
        </Badge>
        <CardTitle className="line-clamp-2">{item.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarFallback className="text-xs">
                {getInitials(item.author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {item.author.name}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {/*<span className="flex items-center gap-1">
              <BookOpen className="size-3" />
              {item.readTime}
            </span>*/}
            <span className="flex items-center gap-1">
              <FileText className="size-3" />
              {item.views}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
