import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FolderKanban,
  Book,
  ChartArea,
  Calendar,
  Clock,
  Coins,
  FileText,
  Briefcase,
  UserRound,
  MessageSquare,
  ArrowRight,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { internshipInfo, initialProfile, userSkills, userMentorMessage, kmShared, impressiveActivities, quickLinks } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Home | DX Scrum Meeting",
  description: "Welcome to DX Scrum Meeting - Manage your projects, knowledge base, and team dashboard",
};

const quickLinksWithIcon = [
  { ...quickLinks[0], icon: UserRound },
  { ...quickLinks[1], icon: FolderKanban },
  { ...quickLinks[2], icon: Book },
  { ...quickLinks[3], icon: ChartArea },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      {/*<div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userProfile.name}
        </h1>
        <p className="text-muted-foreground">
          Here is what is happening with your projects today.
        </p>
      </div>*/}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 font-thai">
              <Calendar className="size-4" />
              วันที่ฝึกงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{internshipInfo.startDate}</p>
            <p className="text-sm text-muted-foreground font-thai">
              ถึง {internshipInfo.endDate}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 font-thai">
              <Clock className="size-4" />
              จำนวนวันที่เหลือ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold font-thai">
              {internshipInfo.daysRemaining} วัน
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 font-thai">
              <Coins className="size-4" />
              เงินที่ได้จากการฝึก
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold font-thai">
              {internshipInfo.earnings.toLocaleString()} บาท
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 font-thai">
              <FileText className="size-4" />
              KM ที่แชร์
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold font-thai">
              {kmShared.length} บทความ
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-thai">
              <UserRound className="size-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="size-20">
                <AvatarImage src={initialProfile.profile || ""} alt={initialProfile.firstName} />
                <AvatarFallback>{initialProfile.firstName.charAt(0)}{initialProfile.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="font-semibold text-lg">{initialProfile.prefix} {initialProfile.firstName} {initialProfile.lastName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1 font-thai">
                    <Briefcase className="size-4" />
                    ตำแหน่ง: {initialProfile.appliedPosition}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium font-thai">
                    เครื่องมือที่ถนัด:
                  </span>
                  {userSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium flex items-center gap-2 mb-2 font-thai">
                <MessageSquare className="size-4" />
                ฝากถึงพี่เลี้ยง
              </p>
              <p className="text-sm text-muted-foreground font-thai">
                {userMentorMessage}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {quickLinksWithIcon.map((link) => (
              <Link key={link.title} href={link.href}>
                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="size-8 border rounded-md flex items-center justify-center">
                      <link.icon className="size-4 text-foreground" />
                    </div>
                    <span className="font-medium">{link.title}</span>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="size-5" />
            Impressive Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {impressiveActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col gap-2 rounded-lg border bg-card hover:bg-muted/50 transition-colors overflow-hidden"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/*<activity.icon className={`size-5 ${activity.color}`} />*/}
                    <p className="font-medium text-sm">{activity.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-auto">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
