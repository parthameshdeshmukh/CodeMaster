import { Language } from "@shared/schema";
import type { editor } from 'monaco-editor';

// Map to Monaco language IDs
export const monacoLanguageMap: Record<Language, string> = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
  rust: "rust",
  go: "go"
};

// Monaco editor options
export const monacoOptions = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 14,
  fontFamily: "'Fira Code', monospace",
  lineNumbersMinChars: 3,
  scrollbar: {
    vertical: 'auto',
    horizontal: 'auto'
  },
  automaticLayout: true,
};

// Theme settings for Monaco editor
export const monacoTheme = {
  base: 'vs-dark' as const,
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
    { token: 'string', foreground: 'FF9D6F' },  // Brighter orange
    { token: 'number', foreground: '8AE234' },  // Brighter green
    { token: 'regexp', foreground: 'FF5252' },  // Brighter red
    { token: 'operator', foreground: 'FFFFFF' }, // Pure white
    { token: 'namespace', foreground: '4EC9B0' },
    { token: 'type', foreground: '4EC9B0', fontStyle: 'bold' },
    { token: 'struct', foreground: '4EC9B0' },
    { token: 'class', foreground: '4EC9B0', fontStyle: 'bold' },
    { token: 'interface', foreground: '4EC9B0' },
    { token: 'enum', foreground: '4EC9B0' },
    { token: 'parameter', foreground: 'ADDFFF' }, // Brighter blue
    { token: 'variable', foreground: 'ADDFFF' },  // Brighter blue
    { token: 'property', foreground: 'ADDFFF' },  // Brighter blue
    { token: 'function', foreground: 'DCDCAA', fontStyle: 'bold' }, // Gold color for functions
    { token: 'identifier', foreground: 'FFFFFF' }, // User input identifiers in white
  ],
  colors: {
    'editor.background': '#1E1E1E',
    'editor.foreground': '#FFFFFF', // Brighter default text
    'editorCursor.foreground': '#FFFFFF',
    'editor.lineHighlightBackground': '#353535', // Slightly lighter for better contrast
    'editorLineNumber.foreground': '#A0A0A0', // Brighter line numbers
    'editor.selectionBackground': '#3D7DB5', // Brighter selection
    'editor.selectionHighlightBackground': '#ADD6FF40', // More visible selection highlight
    'editor.foldBackground': '#2D3B55', // Adding fold background color
    'editorBracketMatch.background': '#556B2F', // Better bracket matching
  }
};

/**
 * Load Monaco editor dynamically
 */
export const loadMonaco = async () => {
  const monaco = await import('monaco-editor');
  
  // Register Monaco theme
  monaco.editor.defineTheme('codemaster-dark', monacoTheme);
  
  return monaco;
};
