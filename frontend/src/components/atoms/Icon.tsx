import React from "react";
import { cn } from "../../utils/cn";

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name:
    | "search"
    | "swap"
    | "x"
    | "arrow-down"
    | "check"
    | "loader"
    | "menu"
    | "close";
  size?: number;
}

const iconPaths: Record<string, React.ReactNode> = {
  search: (
    <path
      fill="currentColor"
      d="M11 19a8 8 0 100-16 8 8 0 000 16zm6.71-9.71l4.3-4.3a1 1 0 00-1.42-1.42l-4.3 4.3a10 10 0 111.42 1.42z"
    />
  ),
  swap: (
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M7 16V4m0 0L3 8m4-4l4 4m10-4v12m0 0l4-4m-4 4l-4-4"
    />
  ),
  x: (
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M18 6L6 18M6 6l12 12"
    />
  ),
  "arrow-down": (
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M12 5v14m0 0l-7-7m7 7l7-7"
    />
  ),
  check: (
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M5 13l4 4L19 7"
    />
  ),
  loader: (
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
  ),
  menu: (
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      d="M4 6h16M4 12h16M4 18h16"
    />
  ),
  close: (
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      d="M18 6L6 18M6 6l12 12"
    />
  ),
};

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("inline-block flex-shrink-0", className)}
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}
