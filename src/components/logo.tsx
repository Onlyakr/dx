import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({
  className,
  height = 100,
  width = 100,
}: {
  className?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <Image
      src="/scg-logo.png"
      alt="SCG Logo"
      loading="eager"
      width={width}
      height={height}
      className={cn("h-auto w-auto select-none", className)}
    />
  );
};
export default Logo;
