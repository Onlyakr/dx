import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ListTodo,
  Plus,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { mockProject, teamMembers } from "@/app/(main)/project/[project]/page";

const summaryStats = [
  { label: "Total Tasks", value: "24", icon: ListTodo, change: "+3" },
  { label: "Completed", value: "12", icon: CheckCircle2, change: "+5" },
  { label: "In Progress", value: "8", icon: Clock, change: "+2" },
  { label: "Blocked", value: "4", icon: AlertCircle, change: "-1" },
];

const sprintProgress = 65;

export default function SummaryTab() {
  return (
    <div>Coming Soon.........</div>
    // <div className="space-y-6">
    //   <div className="grid grid-cols-4">
    //     <div className="grid grid-rows-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
    //       {summaryStats.map((stat) => {
    //         const Icon = stat.icon;
    //         return (
    //           <Card key={stat.label}>
    //             <CardHeader className="flex flex-row items-center justify-between pb-2">
    //               <CardDescription>{stat.label}</CardDescription>
    //               <Icon className="size-4 text-muted-foreground" />
    //             </CardHeader>
    //             <CardContent>
    //               <div className="flex items-center justify-between">
    //                 <div className="text-2xl font-bold">{stat.value}</div>
    //                 <Badge variant="secondary" className="text-xs">
    //                   {stat.change}
    //                 </Badge>
    //               </div>
    //             </CardContent>
    //           </Card>
    //         );
    //       })}
    //     </div>
    //   </div>

    //   <div className="grid gap-6 lg:grid-cols-3">
    //     <Card className="lg:col-span-2">
    //       <CardHeader>
    //         <CardTitle className="flex items-center gap-2">
    //           <Target className="size-5" />
    //           Sprint Progress
    //         </CardTitle>
    //         <CardDescription>
    //           Current sprint: Sprint 3 (Week 2 of 4)
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent className="space-y-4">
    //         <div className="space-y-2">
    //           <div className="flex items-center justify-between text-sm">
    //             <span>Progress</span>
    //             <span className="font-medium">{sprintProgress}%</span>
    //           </div>
    //           <Progress value={sprintProgress} className="h-3" />
    //         </div>
    //         <div className="grid grid-cols-3 gap-4 text-center">
    //           <div className="rounded-lg bg-muted p-3">
    //             <div className="text-2xl font-bold">12</div>
    //             <div className="text-xs text-muted-foreground">Completed</div>
    //           </div>
    //           <div className="rounded-lg bg-muted p-3">
    //             <div className="text-2xl font-bold">8</div>
    //             <div className="text-xs text-muted-foreground">In Progress</div>
    //           </div>
    //           <div className="rounded-lg bg-muted p-3">
    //             <div className="text-2xl font-bold">4</div>
    //             <div className="text-xs text-muted-foreground">Remaining</div>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>

    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="flex items-center gap-2">
    //           <Users className="size-5" />
    //           Team
    //         </CardTitle>
    //         <CardDescription>{mockProject.members} members</CardDescription>
    //       </CardHeader>
    //       <CardContent className="space-y-4">
    //         {teamMembers.map((member, i) => (
    //           <div key={i} className="flex items-center gap-3">
    //             <Avatar className="size-8">
    //               <AvatarImage src={member.avatar} />
    //               <AvatarFallback className="text-xs">
    //                 {member.name
    //                   .split(" ")
    //                   .map((n) => n[0])
    //                   .join("")}
    //               </AvatarFallback>
    //             </Avatar>
    //             <div className="flex-1 min-w-0">
    //               <div className="text-sm font-medium truncate">
    //                 {member.name}
    //               </div>
    //               <div className="text-xs text-muted-foreground">
    //                 {member.role}
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //         <Button variant="outline" className="w-full mt-4">
    //           <Plus className="mr-2 size-4" />
    //           Add Member
    //         </Button>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   <div className="grid gap-6 lg:grid-cols-2">
    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="flex items-center gap-2">
    //           <TrendingUp className="size-5" />
    //           Recent Activity
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="space-y-4">
    //           {recentActivity.map((activity, i) => (
    //             <div key={i} className="flex items-start gap-3">
    //               <Avatar className="size-8">
    //                 <AvatarFallback className="text-xs">
    //                   {activity.user[0]}
    //                 </AvatarFallback>
    //               </Avatar>
    //               <div className="flex-1 min-w-0">
    //                 <div className="text-sm">
    //                   <span className="font-medium">{activity.user}</span>{" "}
    //                   <span className="text-muted-foreground">
    //                     {activity.action}
    //                   </span>{" "}
    //                   <span className="font-medium">{activity.item}</span>
    //                 </div>
    //                 <div className="text-xs text-muted-foreground">
    //                   {activity.time}
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </CardContent>
    //     </Card>

    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="flex items-center gap-2">
    //           <Calendar className="size-5" />
    //           Upcoming
    //         </CardTitle>
    //         <CardDescription>Next 7 days</CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="space-y-3">
    //           <div className="flex items-center justify-between rounded-lg border p-3">
    //             <div className="flex items-center gap-3">
    //               <div className="text-center">
    //                 <div className="text-lg font-bold">Mon</div>
    //                 <div className="text-xs text-muted-foreground">Apr 21</div>
    //               </div>
    //               <Separator orientation="vertical" className="h-10" />
    //               <div className="text-sm font-medium">Sprint Planning</div>
    //             </div>
    //             <Badge variant="outline">10:00 AM</Badge>
    //           </div>
    //           <div className="flex items-center justify-between rounded-lg border p-3">
    //             <div className="flex items-center gap-3">
    //               <div className="text-center">
    //                 <div className="text-lg font-bold">Wed</div>
    //                 <div className="text-xs text-muted-foreground">Apr 23</div>
    //               </div>
    //               <Separator orientation="vertical" className="h-10" />
    //               <div className="text-sm font-medium">Daily Standup</div>
    //             </div>
    //             <Badge variant="outline">9:00 AM</Badge>
    //           </div>
    //           <div className="flex items-center justify-between rounded-lg border p-3">
    //             <div className="flex items-center gap-3">
    //               <div className="text-center">
    //                 <div className="text-lg font-bold">Fri</div>
    //                 <div className="text-xs text-muted-foreground">Apr 25</div>
    //               </div>
    //               <Separator orientation="vertical" className="h-10" />
    //               <div className="text-sm font-medium">Sprint Review</div>
    //             </div>
    //             <Badge variant="outline">2:00 PM</Badge>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
  );
}
