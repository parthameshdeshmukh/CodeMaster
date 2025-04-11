import { Language } from "@shared/schema";

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
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: '569CD6' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'number', foreground: 'B5CEA8' },
    { token: 'regexp', foreground: 'D16969' },
    { token: 'operator', foreground: 'D4D4D4' },
    { token: 'namespace', foreground: '4EC9B0' },
    { token: 'type', foreground: '4EC9B0' },
    { token: 'struct', foreground: '4EC9B0' },
    { token: 'class', foreground: '4EC9B0' },
    { token: 'interface', foreground: '4EC9B0' },
    { token: 'enum', foreground: '4EC9B0' },
    { token: 'parameter', foreground: '9CDCFE' },
    { token: 'variable', foreground: '9CDCFE' },
    { token: 'property', foreground: '9CDCFE' },
  ],
  colors: {
    'editor.background': '#1E1E1E',
    'editor.foreground': '#D4D4D4',
    'editorCursor.foreground': '#D4D4D4',
    'editor.lineHighlightBackground': '#2D2D2D',
    'editorLineNumber.foreground': '#858585',
    'editor.selectionBackground': '#264F78',
    'editor.selectionHighlightBackground': '#ADD6FF26',
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
