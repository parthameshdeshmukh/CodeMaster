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
    vertical: 'auto' as const,
    horizontal: 'auto' as const
  },
  automaticLayout: true,
};

// Theme settings for Monaco editor
export const monacoTheme = {
  base: 'vs' as const, // Using light theme ('vs') instead of dark ('vs-dark')
  inherit: true,
  rules: [
    { token: 'comment', foreground: '008000', fontStyle: 'italic' },
    { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
    { token: 'string', foreground: 'A31515' },
    { token: 'number', foreground: '098658' },
    { token: 'regexp', foreground: 'EE0000' },
    { token: 'operator', foreground: '000000' },
    { token: 'namespace', foreground: '267F99' },
    { token: 'type', foreground: '267F99', fontStyle: 'bold' },
    { token: 'struct', foreground: '267F99' },
    { token: 'class', foreground: '267F99', fontStyle: 'bold' },
    { token: 'interface', foreground: '267F99' },
    { token: 'enum', foreground: '267F99' },
    { token: 'parameter', foreground: '001080' },
    { token: 'variable', foreground: '001080' },
    { token: 'property', foreground: '001080' },
    { token: 'function', foreground: '795E26', fontStyle: 'bold' },
    { token: 'identifier', foreground: '001080' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#000000',
    'editorCursor.foreground': '#000000',
    'editor.lineHighlightBackground': '#F5F5F5',
    'editorLineNumber.foreground': '#237893',
    'editor.selectionBackground': '#ADD6FF',
    'editor.selectionHighlightBackground': '#D3E8F8',
    'editor.foldBackground': '#E6F3FF',
    'editorBracketMatch.background': '#BBDEFF',
  }
};

/**
 * Load Monaco editor dynamically
 */
export const loadMonaco = async () => {
  const monaco = await import('monaco-editor');
  
  // Register Monaco theme
  monaco.editor.defineTheme('codemaster-light', monacoTheme);
  
  return monaco;
};
