"use client";

import { usePathname } from "next/navigation";

export default function KMInfomation() {
  const pathname = usePathname();
  const projectName = pathname.split("/").pop();

  return <div>{projectName}</div>;
}
