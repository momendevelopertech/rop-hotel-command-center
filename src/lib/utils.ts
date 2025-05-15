
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to conditionally apply RTL styles
export function rtlClass(isRtl: boolean, rtlStyle: string, ltrStyle: string = "") {
  return isRtl ? rtlStyle : ltrStyle;
}

