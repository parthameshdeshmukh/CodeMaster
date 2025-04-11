import { Difficulty, Language } from "@shared/schema";

// Difficulty display variants
export const DIFFICULTY_VARIANTS: Record<Difficulty, { name: string, variant: string }> = {
  easy: { name: "Easy", variant: "bg-green-100 text-green-800" },
  medium: { name: "Medium", variant: "bg-yellow-100 text-yellow-800" },
  hard: { name: "Hard", variant: "bg-red-100 text-red-800" }
};

// Language display variants
export const LANGUAGE_VARIANTS: Record<Language, { name: string, icon: string }> = {
  javascript: { name: "JavaScript", icon: "js" },
  python: { name: "Python", icon: "py" },
  java: { name: "Java", icon: "java" },
  cpp: { name: "C++", icon: "cpp" },
  rust: { name: "Rust", icon: "rs" },
  go: { name: "Go", icon: "go" },
  css: { name: "CSS", icon: "css" }
};

// Activity type variants
export const ACTIVITY_TYPES = {
  started_challenge: {
    variant: "bg-blue-100",
    icon: "bg-blue-100 text-blue-500",
    text: "Started",
    iconComponent: "LightningBolt"
  },
  completed_challenge: {
    variant: "bg-green-100",
    icon: "bg-green-100 text-green-500",
    text: "Completed",
    iconComponent: "CheckCircle"
  },
  earned_certificate: {
    variant: "bg-purple-100",
    icon: "bg-purple-100 text-purple-500",
    text: "Earned",
    iconComponent: "Certificate"
  }
};

// Sample starter codes for the challenge templates
export const DEFAULT_STARTER_CODES = {
  javascript: `/**
 * @param {string} str - The input string to check
 * @return {boolean} - Returns true if the string is a palindrome
 */
function isPalindrome(str) {
  // Your code here
  
  // Example: 
  // let reversed = str.split('').reverse().join('');
  // return str === reversed;
}

// Test your function
console.log(isPalindrome("racecar")); // Should return true
console.log(isPalindrome("hello"));   // Should return false`,
  
  python: `def is_palindrome(s: str) -> bool:
    """
    Check if a string is a palindrome.
    
    Args:
        s: The input string to check
        
    Returns:
        bool: True if the string is a palindrome, False otherwise
    """
    # Your code here
    
    # Example:
    # return s == s[::-1]

# Test your function
print(is_palindrome("racecar"))  # Should return True
print(is_palindrome("hello"))    # Should return False`,
  
  java: `public class Palindrome {
    /**
     * Checks if a string is a palindrome.
     * 
     * @param str The input string to check
     * @return true if the string is a palindrome, false otherwise
     */
    public static boolean isPalindrome(String str) {
        // Your code here
        
        // Example:
        // StringBuilder sb = new StringBuilder(str);
        // return str.equals(sb.reverse().toString());
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar")); // Should return true
        System.out.println(isPalindrome("hello"));   // Should return false
    }
}`,
  
  cpp: `#include <iostream>
#include <string>

/**
 * Checks if a string is a palindrome.
 * 
 * @param str The input string to check
 * @return true if the string is a palindrome, false otherwise
 */
bool isPalindrome(const std::string& str) {
    // Your code here
    
    // Example:
    // std::string reversed(str.rbegin(), str.rend());
    // return str == reversed;
    return false;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isPalindrome("racecar") << std::endl; // Should return true
    std::cout << isPalindrome("hello") << std::endl;   // Should return false
    return 0;
}`,
  
  rust: `fn is_palindrome(s: &str) -> bool {
    // Your code here
    
    // Example:
    // let reversed: String = s.chars().rev().collect();
    // s == reversed
    false
}

fn main() {
    println!("{}", is_palindrome("racecar")); // Should return true
    println!("{}", is_palindrome("hello"));   // Should return false
}`,
  
  go: `package main

import "fmt"

// IsPalindrome checks if a string is a palindrome
func IsPalindrome(s string) bool {
    // Your code here
    
    // Example:
    // runes := []rune(s)
    // for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
    //     if runes[i] != runes[j] {
    //         return false
    //     }
    // }
    // return true
    return false
}

func main() {
    fmt.Println(IsPalindrome("racecar")) // Should return true
    fmt.Println(IsPalindrome("hello"))   // Should return false
}`,

  css: `.container {
  /* Define your container styles here */
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
}

.box {
  /* Create a box with appropriate styling */
  width: 100px;
  height: 100px;
  background-color: #3498db;
  margin: 10px;
  
  /* Add transitions, transformations or other properties as needed */
  transition: all 0.3s ease;
}

/* Style the box on hover */
.box:hover {
  transform: scale(1.1);
  background-color: #2980b9;
}`
};
