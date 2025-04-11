import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

interface TestResultsProps {
  results: TestResult[] | null;
  consoleOutput: string;
  isLoading?: boolean;
  showConsole?: boolean;
}

export function TestResults({ 
  results, 
  consoleOutput,
  isLoading = false,
  showConsole = true 
}: TestResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Test Cases</h4>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>

        {showConsole && (
          <Card>
            <CardContent className="p-4 flex flex-col h-full">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Console Output</h4>
              <div className="animate-pulse flex-grow bg-black rounded p-3">
                <div className="h-3 bg-gray-700 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Test Cases</h4>
          <ul className="space-y-2">
            {results && results.length > 0 ? (
              results.map((result, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <div className="flex items-center">
                    {result.passed ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <code className="font-mono text-xs truncate">
                      Input: {result.input}
                    </code>
                  </div>
                  <div className="ml-6 mt-1">
                    <code className="font-mono text-xs">
                      Expected: {result.expectedOutput}
                    </code>
                  </div>
                  {!result.passed && (
                    <div className="ml-6 mt-1">
                      <code className="font-mono text-xs text-red-500">
                        Got: {result.actualOutput}
                      </code>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">
                Run your code to see test results
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      {showConsole && (
        <Card>
          <CardContent className="p-4 flex flex-col h-full">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Console Output</h4>
            <div className="flex-grow bg-black rounded p-3 text-green-400 font-mono text-xs overflow-auto max-h-60">
              {consoleOutput ? (
                <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
              ) : (
                <span className="text-gray-500">Run your code to see console output</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
