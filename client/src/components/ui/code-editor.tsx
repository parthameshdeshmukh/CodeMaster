import React, { useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Language } from '@shared/schema';
import { monacoLanguageMap, monacoOptions } from '@/lib/monaco';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  height?: string;
  className?: string;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language,
  height = '300px',
  className,
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    // Define & apply light theme AFTER monaco is ready
    monaco.editor.defineTheme('force-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
      },
    });

    monaco.editor.setTheme('force-light');
    setIsLoading(false);

    if (!readOnly) {
      setTimeout(() => {
        editor.focus();
      }, 100);
    }
  };

  return (
    <div className={cn("border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white", className)}>
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-800">Code Editor</span>
      </div>

      {isLoading && <Skeleton className="w-full h-64" />}

      <div className="bg-white">
        <Editor
          height={height}
          language={monacoLanguageMap[language]}
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            ...monacoOptions,
            readOnly,
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: 'on',
          }}
          onMount={handleEditorDidMount}
          theme="force-light"
        />
      </div>
    </div>
  );
}
