export interface ProfileData {
  prefix: string;
  firstName: string;
  lastName: string;
  nickname: string;
  studentId: string;
  age: string;
  birthDate: string;
  citizenId: string;
  nationality: string;
  religion: string;
  phone: string;
  lineId: string;
  emailProject: string;
  emailTeams: string;
  gender: string;
  mentor: string;
  cardAddress: string;
  currentAddress: string;
  useCardAddress: boolean;
  university: string;
  faculty: string;
  major: string;
  degree: string;
  educationLevel: string;
  gpa: string;
  hobbies: string;
  specialAbility: string;
  appliedPosition: string;
  department: string;
  preferredTrack: string;
  preferredPrograms: string[];
  internshipStartDate: string;
  internshipEndDate: string;
  resume: string | null;
  transcript: string | null;
  report: string | null;
  profile: string | null;
  github: string;
}

export const profileOptions = {
  prefix: ["นาย", "นาง", "นางสาว"],
  gender: ["ชาย", "หญิง", "อื่นๆ"],
  educationLevel: ["มัธยมศึกษา", "ปวส.", "ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก"],
  track: ["Frontend", "Backend", "Data Analysis", "Data Management", "Full stack", "อื่นๆ"],
  programs: ["Figma", "React", "PHP", "VS code", "SQL Server", "Docker", "GitHub", "อื่นๆ"],
} as const;

export const initialProfile: ProfileData = {
  prefix: "นาย",
  firstName: "John",
  lastName: "Doe",
  nickname: "Johnny",
  studentId: "64010001",
  age: "22",
  birthDate: "2003-01-15",
  citizenId: "1234567890123",
  nationality: "ไทย",
  religion: "พุทธ",
  phone: "081-234-5678",
  lineId: "johndoe123",
  emailProject: "john.doe@project.com",
  emailTeams: "john.doe@university.edu",
  gender: "ชาย",
  mentor: "สมชาย ใจดี",
  cardAddress: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
  currentAddress: "456 ถนนพระราม4 แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
  useCardAddress: true,
  university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
  faculty: "คณะเทคโนโลยีสารสนเทศ",
  major: "วิทยาการคอมพิวเตอร์",
  degree: "วิทยาศาสตรบัณฑิต",
  educationLevel: "ปริญญาตรี",
  gpa: "3.45",
  hobbies: "เล่นเกม, อ่านหนังสือ, ฟังเพลง",
  specialAbility: "เขียนโค้ด, ออกแบบ UI/UX",
  appliedPosition: "Frontend Developer",
  department: "แผนกพัฒนาซอฟต์แวร์",
  preferredTrack: "Frontend",
  preferredPrograms: ["React", "Figma", "VS code"],
  internshipStartDate: "2025-06-02",
  internshipEndDate: "2025-08-31",
  resume: "resume.pdf",
  transcript: "transcript.pdf",
  report: null,
  profile: "https://www.telegraph.co.uk/content/dam/pets/2017/01/06/1-JS117202740-yana-two-face-cat-news_trans_NvBQzQNjv4BqJNqHJA5DVIMqgv_1zKR2kxRY9bnFVTp4QZlQjJfe6H0.jpg?imwidth=450",
  github: "github.com/johndoe",
};

export const internshipInfo = {
  startDate: initialProfile.internshipStartDate,
  endDate: initialProfile.internshipEndDate,
  daysRemaining: 60,
  earnings: 18000,
};

export const kmShared = [
  { id: "1", title: "React Best Practices", author: "John Doe", date: "2025-04-15" },
  { id: "2", title: "TypeScript Tips & Tricks", author: "Jane Smith", date: "2025-04-18" },
  { id: "3", title: "Next.js 15 Features", author: "Mike Johnson", date: "2025-04-20" },
];

export const impressiveActivities = [
  {
    id: "1",
    title: "Completed React Fundamentals Training",
    description: "Finished the React Fundamentals course with certification",
    date: "2025-04-10",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
  },
  {
    id: "2",
    title: "Delivered First Project Presentation",
    description: "Presented the project dashboard to the team",
    date: "2025-04-15",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Shared KM: TypeScript Tips",
    description: "Created and shared knowledge base about TypeScript",
    date: "2025-04-18",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
  },
];

export const quickLinks = [
  { title: "Profile", description: "View and edit your profile", href: "/profile", icon: "UserRound" },
  { title: "Projects", description: "View and manage all your projects", href: "/project", icon: "FolderKanban" },
  { title: "KM", description: "Access the knowledge base and documentation", href: "/km", icon: "Book" },
  { title: "Dashboard", description: "Track progress and team metrics", href: "/dashboard", icon: "ChartArea" },
] as const;

export const userSkills = initialProfile.preferredPrograms;
export const userMentorMessage = "ขอบคุณพี่เลี้ยงที่คอยช่วยเหลือและให้คำแนะนำตลอดช่วงการฝึกงานครับ";