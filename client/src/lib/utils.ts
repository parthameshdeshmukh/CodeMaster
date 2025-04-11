import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language, Difficulty } from "@shared/schema";
import { DIFFICULTY_VARIANTS, LANGUAGE_VARIANTS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date relative to current time
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

/**
 * Formats a date to display on certificates
 */
export function formatCertificateDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generates a unique certificate ID
 */
export function generateCertificateId(language: string, username: string): string {
  const prefix = language.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().substring(7);
  const userPrefix = username.substring(0, 2).toUpperCase();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${prefix}-${new Date().getFullYear()}-${userPrefix}${timestamp}${randomNum}`;
}

/**
 * Gets difficulty display info
 */
export function getDifficultyInfo(difficulty: Difficulty) {
  return DIFFICULTY_VARIANTS[difficulty] || { name: "Unknown", variant: "bg-gray-100 text-gray-800" };
}

/**
 * Gets language display info
 */
export function getLanguageInfo(language: Language) {
  return LANGUAGE_VARIANTS[language] || { name: "Unknown", icon: "code" };
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, maxLength = 60): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
