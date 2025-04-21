import React, { useEffect, useRef, useState } from 'react';
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
    setIsLoading(false);
    
    // Focus on the editor once loaded (if not read-only)
    if (!readOnly) {
      setTimeout(() => {
        editor.focus();
      }, 100);
    }
  };

  return (
    <div className={cn("border border-gray-300 rounded-md overflow-hidden", className)}>
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Code Editor</span>
      </div>

      {isLoading && (
        <Skeleton className="w-full h-64" />
      )}

      <Editor
        height={height}
        language={monacoLanguageMap[language]}
        value={value}
        onChange={(val) => onChange(val || '')}
        options={{
          ...monacoOptions,
          readOnly,
          theme: 'vs',
          backgroundColor: '#ffffff'
        }}
        onMount={handleEditorDidMount}
        theme="codemaster-light"
        className="w-full"
      />
    </div>
  );
}
