"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  UserRound,
  Briefcase,
  Pencil,
  MapPin,
  GraduationCap,
  FileText,
  Upload,
  Contact,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { ProfileData, initialProfile, profileOptions } from "@/lib/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>(initialProfile);

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const transcriptInputRef = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const [previewFile, setPreviewFile] = useState<{
    type: string;
    name: string;
  } | null>(null);

  const handleFileUpload = (
    type: "resume" | "transcript" | "report" | "profile",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "profile") {
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload image file only");
          return;
        }
      } else {
        if (file.type !== "application/pdf") {
          toast.error("Please upload PDF file only");
          return;
        }
      }
      const fileName = file.name;
      setProfile((prev) => ({ ...prev, [type]: fileName }));
      toast.success(
        `Upload ${type === "resume" ? "Resume" : type === "transcript" ? "Transcript" : type === "report" ? "Report" : "Profile"} successfully`,
      );
    }
  };

  const handleEditClick = () => {
    setEditForm(profile);
    setIsEditOpen(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditOpen(false);
    toast.success("Updated profile successfully");
  };

  const handleProgramToggle = (program: string) => {
    if (editForm.preferredPrograms.includes(program)) {
      setEditForm({
        ...editForm,
        preferredPrograms: editForm.preferredPrograms.filter(
          (p) => p !== program,
        ),
      });
    } else {
      if (editForm.preferredPrograms.length < 3) {
        setEditForm({
          ...editForm,
          preferredPrograms: [...editForm.preferredPrograms, program],
        });
      } else {
        toast.warning("You can select up to 3 items");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Personal and internship information
          </p>
        </div>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger
            render={
              <Button
                className="cursor-pointer"
                onClick={handleEditClick}
              >
                <Pencil className="mr-2 size-4" />
                Edit Profile
              </Button>
            }
          />

          <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <h3 className="font-semibold font-thai text-lg border-b pb-2">
                  ข้อมูลส่วนตัว
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prefix" className="font-thai">
                      คำนำหน้าชื่อ *
                    </Label>
                    <Select
                      value={editForm.prefix}
                      onValueChange={(value) =>
                        setEditForm({ ...editForm, prefix: value as string })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {profileOptions.prefix.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName" className="font-thai">
                      ชื่อ *
                    </Label>
                    <Input
                      id="firstName"
                      value={editForm.firstName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName" className="font-thai">
                      นามสกุล *
                    </Label>
                    <Input
                      id="lastName"
                      value={editForm.lastName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nickname" className="font-thai">
                      ชื่อเล่น *
                    </Label>
                    <Input
                      id="nickname"
                      value={editForm.nickname}
                      onChange={(e) =>
                        setEditForm({ ...editForm, nickname: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                  <div className="grid gap-2">
                    <Label htmlFor="studentId" className="font-thai">
                      รหัสนักศึกษาฝึกงาน *
                    </Label>
                    <Input
                      id="studentId"
                      value={editForm.studentId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, studentId: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="age" className="font-thai">
                      อายุ *
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={editForm.age}
                      onChange={(e) =>
                        setEditForm({ ...editForm, age: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="birthDate" className="font-thai">
                      วันเกิด *
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={editForm.birthDate}
                      onChange={(e) =>
                        setEditForm({ ...editForm, birthDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="citizenId" className="font-thai">
                      เลขบัตรประชาชน *
                    </Label>
                    <Input
                      id="citizenId"
                      value={editForm.citizenId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, citizenId: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="nationality" className="font-thai">
                      สัญชาติ *
                    </Label>
                    <Input
                      id="nationality"
                      value={editForm.nationality}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          nationality: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="religion" className="font-thai">
                      ศาสนา *
                    </Label>
                    <Input
                      id="religion"
                      value={editForm.religion}
                      onChange={(e) =>
                        setEditForm({ ...editForm, religion: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender" className="font-thai">
                      เพศ *
                    </Label>
                    <Select
                      value={editForm.gender}
                      onValueChange={(value) =>
                        setEditForm({ ...editForm, gender: value as string })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {profileOptions.gender.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold font-thai text-lg border-b pb-2">
                  ข้อมูลการติดต่อ
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="font-thai">
                      เบอร์โทรศัพท์ *
                    </Label>
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lineId" className="font-thai">
                      ID Line *
                    </Label>
                    <Input
                      id="lineId"
                      value={editForm.lineId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, lineId: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emailProject" className="font-thai">
                      Email (สำหรับสื่อสารโครงการ) *
                    </Label>
                    <Input
                      id="emailProject"
                      type="email"
                      value={editForm.emailProject}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          emailProject: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="emailTeams" className="font-thai">
                      Email (ใช้สำหรับ Microsoft Teams) *
                    </Label>
                    <Input
                      id="emailTeams"
                      type="email"
                      value={editForm.emailTeams}
                      onChange={(e) =>
                        setEditForm({ ...editForm, emailTeams: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="github" className="font-thai">
                      GitHub (ถ้ามี)
                    </Label>
                    <Input
                      id="github"
                      value={editForm.github}
                      onChange={(e) =>
                        setEditForm({ ...editForm, github: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold font-thai text-lg border-b pb-2">
                  ที่อยู่
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="cardAddress" className="font-thai">
                      ที่อยู่ตามบัตรประชาชน *
                    </Label>
                    <Textarea
                      id="cardAddress"
                      value={editForm.cardAddress}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          cardAddress: e.target.value,
                        })
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currentAddress" className="font-thai">
                      ที่อยู่ปัจจุบัน *
                    </Label>
                    <Textarea
                      id="currentAddress"
                      value={editForm.currentAddress}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          currentAddress: e.target.value,
                        })
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="useCardAddress"
                    checked={editForm.useCardAddress}
                    onCheckedChange={(checked) =>
                      setEditForm({
                        ...editForm,
                        useCardAddress: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="useCardAddress"
                    className="font-thai cursor-pointer"
                  >
                    ใช้ที่อยู่ตามบัตรประชาชน
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold font-thai text-lg border-b pb-2">
                  ข้อมูลการศึกษา
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="university" className="font-thai">
                      สถานศึกษาปัจจุบัน *
                    </Label>
                    <Input
                      id="university"
                      value={editForm.university}
                      onChange={(e) =>
                        setEditForm({ ...editForm, university: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="faculty" className="font-thai">
                      คณะ *
                    </Label>
                    <Input
                      id="faculty"
                      value={editForm.faculty}
                      onChange={(e) =>
                        setEditForm({ ...editForm, faculty: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="major" className="font-thai">
                      สาขา *
                    </Label>
                    <Input
                      id="major"
                      value={editForm.major}
                      onChange={(e) =>
                        setEditForm({ ...editForm, major: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="degree" className="font-thai">
                      วุฒิการศึกษา *
                    </Label>
                    <Input
                      id="degree"
                      value={editForm.degree}
                      onChange={(e) =>
                        setEditForm({ ...editForm, degree: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="educationLevel" className="font-thai">
                      ระดับการศึกษา *
                    </Label>
                    <Select
                      value={editForm.educationLevel}
                      onValueChange={(value) =>
                        setEditForm({
                          ...editForm,
                          educationLevel: value as string,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {profileOptions.educationLevel.map((e) => (
                          <SelectItem key={e} value={e}>
                            {e}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gpa" className="font-thai">
                      เกรดเฉลี่ยรวม *
                    </Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      value={editForm.gpa}
                      onChange={(e) =>
                        setEditForm({ ...editForm, gpa: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold font-thai text-lg border-b pb-2">
                  ข้อมูลเพิ่มเติม
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="hobbies" className="font-thai">
                      งานอดิเรก
                    </Label>
                    <Input
                      id="hobbies"
                      value={editForm.hobbies}
                      onChange={(e) =>
                        setEditForm({ ...editForm, hobbies: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specialAbility" className="font-thai">
                      ความสามารถพิเศษ
                    </Label>
                    <Input
                      id="specialAbility"
                      value={editForm.specialAbility}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          specialAbility: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold font-thai text-lg border-b pb-2">
                  ข้อมูลการฝึกงาน
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="appliedPosition" className="font-thai">
                      ตำแหน่งที่สมัคร *
                    </Label>
                    <Input
                      id="appliedPosition"
                      value={editForm.appliedPosition}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          appliedPosition: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department" className="font-thai">
                      หน่วยงานที่ฝึก *
                    </Label>
                    <Input
                      id="department"
                      value={editForm.department}
                      onChange={(e) =>
                        setEditForm({ ...editForm, department: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mentor" className="font-thai">
                      พี่เลี้ยง *
                    </Label>
                    <Input
                      id="mentor"
                      value={editForm.mentor}
                      onChange={(e) =>
                        setEditForm({ ...editForm, mentor: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="preferredTrack" className="font-thai">
                      สายงานที่ถนัดที่สุด *
                    </Label>
                    <Select
                      value={editForm.preferredTrack}
                      onValueChange={(value) =>
                        setEditForm({
                          ...editForm,
                          preferredTrack: value as string,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {profileOptions.track.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label className="font-thai">
                      โปรแกรมหรืองานที่ถนัด (เลือก 3 ข้อ) *
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {profileOptions.programs.map((program) => (
                        <Badge
                          key={program}
                          variant={
                            editForm.preferredPrograms.includes(program)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => handleProgramToggle(program)}
                        >
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="internshipStartDate" className="font-thai">
                      วัน/เดือน/ปี ที่เริ่มฝึกงาน *
                    </Label>
                    <Input
                      id="internshipStartDate"
                      type="date"
                      value={editForm.internshipStartDate}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          internshipStartDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="internshipEndDate" className="font-thai">
                      วัน/เดือน/ปี ที่ฝึกงานวันสุดท้าย *
                    </Label>
                    <Input
                      id="internshipEndDate"
                      type="date"
                      value={editForm.internshipEndDate}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          internshipEndDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant="outline">
                    Cancel
                  </Button>
                }
              />
              <Button onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-thai text-lg">รูปโปรไฟล์</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <input
              type="file"
              ref={profileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload("profile", e)}
            />
            <Avatar className="size-32">
              <AvatarImage
                src={profile.profile || ""}
                alt={profile.firstName}
              />
              <AvatarFallback className="text-2xl">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              onClick={() => profileInputRef.current?.click()}
            >
              <Upload className="mr-2 size-4" />
              Upload
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-thai flex items-center gap-2">
              <UserRound className="size-5" />
              ข้อมูลส่วนตัว
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  คำนำหน้าชื่อ
                </p>
                <p className="font-medium">{profile.prefix}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">ชื่อ</p>
                <p className="font-medium">{profile.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  นามสกุล
                </p>
                <p className="font-medium">{profile.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  ชื่อเล่น
                </p>
                <p className="font-medium">{profile.nickname}</p>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  รหัสนักศึกษาฝึกงาน
                </p>
                <p className="font-medium">{profile.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">อายุ</p>
                <p className="font-medium">{profile.age} ปี</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  วันเกิด
                </p>
                <p className="font-medium font-thai">{profile.birthDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">เพศ</p>
                <p className="font-medium font-thai">{profile.gender}</p>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  สัญชาติ
                </p>
                <p className="font-medium font-thai">{profile.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">ศาสนา</p>
                <p className="font-medium font-thai">{profile.religion}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  พี่เลี้ยง
                </p>
                <p className="font-medium font-thai">{profile.mentor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
<Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  เบอร์โทรศัพท์
                </p>
                <p className="font-medium">{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  ID Line
                </p>
                <p className="font-medium">{profile.lineId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  Email (สำหรับสื่อสารโครงการ)
                </p>
                <p className="font-medium">{profile.emailProject}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  Email (Microsoft Teams)
                </p>
                <p className="font-medium">{profile.emailTeams}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  GitHub
                </p>
                <p className="font-medium">{profile.github || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-thai flex items-center gap-2">
              <MapPin className="size-5" />
              ที่อยู่
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-thai">
                ที่อยู่ตามบัตรประชาชน
              </p>
              <p className="font-medium font-thai">{profile.cardAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-thai">
                ที่อยู่ปัจจุบัน
              </p>
              <p className="font-medium font-thai">{profile.currentAddress}</p>
            </div>
            {profile.useCardAddress && (
              <Badge variant="outline" className="font-thai">
                ใช้ที่อยู่ตามบัตรประชาชน
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-thai flex items-center gap-2">
              <GraduationCap className="size-5" />
              ข้อมูลการศึกษา
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  สถานศึกษาปัจจุบัน
                </p>
                <p className="font-medium font-thai">{profile.university}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">คณะ</p>
                <p className="font-medium font-thai">{profile.faculty}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">สาขา</p>
                <p className="font-medium font-thai">{profile.major}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  วุฒิการศึกษา
                </p>
                <p className="font-medium font-thai">{profile.degree}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  ระดับการศึกษา
                </p>
                <p className="font-medium font-thai">
                  {profile.educationLevel}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  เกรดเฉลี่ยรวม
                </p>
                <p className="font-medium">{profile.gpa}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-thai flex items-center gap-2">
              <Star className="size-5" />
              ข้อมูลเพิ่มเติม
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  งานอดิเรก
                </p>
                <p className="font-medium font-thai">
                  {profile.hobbies || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-thai">
                  ความสามารถพิเศษ
                </p>
                <p className="font-medium font-thai">
                  {profile.specialAbility || "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-thai flex items-center gap-2">
            <Briefcase className="size-5" />
            ข้อมูลการฝึกงาน
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground font-thai">
                ตำแหน่งที่สมัคร
              </p>
              <p className="font-medium">{profile.appliedPosition}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-thai">
                หน่วยงานที่ฝึก
              </p>
              <p className="font-medium font-thai">{profile.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-thai">
                สายงานที่ถนัด
              </p>
              <p className="font-medium font-thai">{profile.preferredTrack}</p>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground font-thai">
                วันที่เริ่มฝึกงาน
              </p>
              <p className="font-medium font-thai">
                {profile.internshipStartDate}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-thai">
                วันที่ฝึกงานวันสุดท้าย
              </p>
              <p className="font-medium font-thai">
                {profile.internshipEndDate}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-thai mb-2">
              โปรแกรมหรืองานที่ถนัด
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.preferredPrograms.map((program) => (
                <Badge key={program} variant="secondary" className="font-thai">
                  {program}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="file"
            ref={resumeInputRef}
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileUpload("resume", e)}
          />
          <input
            type="file"
            ref={transcriptInputRef}
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileUpload("transcript", e)}
          />
          <input
            type="file"
            ref={reportInputRef}
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileUpload("report", e)}
          />
          <Dialog
            open={!!previewFile}
            onOpenChange={() => setPreviewFile(null)}
          >
            <DialogContent className="max-w-3xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>
                  Preview: {previewFile?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 w-full h-full bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Preview PDF: {previewFile?.name}
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col gap-2 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Resume</p>
                <FileText className="size-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {profile.resume || "Not uploaded"}
              </p>
              <div className="flex gap-2">
                {profile.resume && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setPreviewFile({ type: "resume", name: profile.resume! })
                    }
                  >
                    Preview
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <Upload className="size-4 mr-1" />
                  {profile.resume ? "New" : "Upload"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Transcript</p>
                <FileText className="size-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {profile.transcript || "Not uploaded"}
              </p>
              <div className="flex gap-2">
                {profile.transcript && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setPreviewFile({
                        type: "transcript",
                        name: profile.transcript!,
                      })
                    }
                  >
                    Preview
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => transcriptInputRef.current?.click()}
                >
                  <Upload className="size-4 mr-1" />
                  {profile.transcript ? "New" : "Upload"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Report (if any)</p>
                <FileText className="size-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {profile.report || "Not uploaded"}
              </p>
              <div className="flex gap-2">
                {profile.report && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setPreviewFile({ type: "report", name: profile.report! })
                    }
                  >
                    Preview
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => reportInputRef.current?.click()}
                >
                  <Upload className="size-4 mr-1" />
                  {profile.report ? "New" : "Upload"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
