import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom utility functions

// Add smooth scrolling for navigation
export function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = (this as HTMLAnchorElement).getAttribute('href');
      const targetElement = document.querySelector(targetId || '');
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 70, // Adjusted for header height
          behavior: 'smooth'
        });
      }
    });
  });
}

// Utility to format CSS class names from values
export function formatCssClassName(value: string): string {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
