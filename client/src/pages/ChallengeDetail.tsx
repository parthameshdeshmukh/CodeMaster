import React, { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { CodeEditor } from '@/components/ui/code-editor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, RefreshCcw, Save, PlayCircle } from 'lucide-react';
import { Language, Challenge, TestCase, executeCodeSchema } from '@shared/schema';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { getDifficultyInfo } from '@/lib/utils';
import { DEFAULT_STARTER_CODES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

export default function ChallengeDetail() {
  const { id } = useParams();
  const challengeId = parseInt(id);
  const { toast } = useToast();
  
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [testResults, setTestResults] = useState<{
    passed: boolean;
    results: {
      input: string;
      expectedOutput: string;
      actualOutput: string;
      passed: boolean;
    }[];
    consoleOutput: string;
  } | null>(null);
  
  // Fetch challenge details
  const { data: challenge, isLoading } = useQuery<Challenge>({
    queryKey: [`/api/challenges/${challengeId}`],
  });
  
  // Fetch user progress for this challenge
  const { data: userProgress } = useQuery<{
    status: string;
    code: string;
  } | null>({
    queryKey: [`/api/user/progress/${challengeId}`],
  });
  
  // Set initial code when challenge loads or when language changes
  useEffect(() => {
    if (challenge) {
      // If user has saved code for this challenge, load it
      if (userProgress?.code) {
        setCode(userProgress.code);
        if (challenge.language as Language) {
          setLanguage(challenge.language as Language);
        }
      } else {
        // Otherwise, load the starter code for selected language
        if (language === challenge.language) {
          setCode(challenge.starterCode);
        } else {
          // If language is different, load the default starter code
          setCode(DEFAULT_STARTER_CODES[language] || '// Your code here');
        }
      }
    }
  }, [challenge, language, userProgress]);
  
  // Run code mutation
  const runMutation = useMutation({
    mutationFn: async (testRun: boolean) => {
      const response = await apiRequest('POST', '/api/code/run', {
        ...executeCodeSchema.parse({
          code,
          language,
          challengeId: testRun ? challengeId : undefined,
        })
      });
      return response.json();
    },
    onSuccess: (data) => {
      setTestResults(data);
      
      if (data.passed) {
        toast({
          title: "All tests passed!",
          description: "You've successfully solved this challenge.",
          variant: "default",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error running code",
        description: error.message || "There was an error executing your code.",
        variant: "destructive",
      });
    }
  });
  
  // Save progress mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/user/progress/${challengeId}`, {
        code,
        language,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Progress saved",
        description: "Your code has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/user/progress/${challengeId}`] });
    },
    onError: (error) => {
      toast({
        title: "Error saving progress",
        description: error.message || "There was an error saving your progress.",
        variant: "destructive",
      });
    }
  });
  
  // Submit solution mutation
  const submitMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/challenges/${challengeId}/submit`, {
        code,
        language,
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: data.passed ? "Solution accepted!" : "Tests failed",
        description: data.passed 
          ? "Congratulations! Your solution passed all test cases." 
          : "Your solution didn't pass all test cases. Try again.",
        variant: data.passed ? "default" : "destructive",
      });
      
      if (data.passed) {
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ['/api/user/stats'] });
        queryClient.invalidateQueries({ queryKey: ['/api/user/activity'] });
        queryClient.invalidateQueries({ queryKey: [`/api/user/progress/${challengeId}`] });
      }
      
      setTestResults(data);
    },
    onError: (error) => {
      toast({
        title: "Error submitting solution",
        description: error.message || "There was an error submitting your solution.",
        variant: "destructive",
      });
    }
  });
  
  const handleRunCode = () => {
    runMutation.mutate(false);
  };
  
  const handleTestCode = () => {
    runMutation.mutate(true);
  };
  
  const handleSaveProgress = () => {
    saveMutation.mutate();
  };
  
  const handleSubmitSolution = () => {
    submitMutation.mutate();
  };
  
  const handleResetCode = () => {
    if (challenge) {
      if (language === challenge.language as Language) {
        setCode(challenge.starterCode);
      } else {
        setCode(DEFAULT_STARTER_CODES[language] || '// Your code here');
      }
      toast({
        title: "Code reset",
        description: "The editor has been reset to the starter code.",
      });
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="mt-8">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }
  
  if (!challenge) {
    return (
      <Layout>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Challenge not found</h2>
          <p className="mt-2 text-gray-600">The challenge you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }
  
  const difficultyInfo = getDifficultyInfo(challenge.difficulty as any);
  const isPending = runMutation.isPending || saveMutation.isPending || submitMutation.isPending;
  
  return (
    <Layout>
      <div className="mt-8 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {challenge.title}
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>{challenge.description}</p>
          </div>
          
          <div className="mt-5 border-t border-gray-200 pt-5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mr-3">Language:</label>
                <Select 
                  value={language} 
                  onValueChange={(value) => setLanguage(value as Language)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                  </SelectContent>
                </Select>
                <Badge 
                  variant={challenge.difficulty as any} 
                  className="ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {difficultyInfo.name}
                </Badge>
              </div>
              <div>
                <Badge variant="points" className="px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {challenge.points} points
                </Badge>
              </div>
            </div>
            
            {/* Code editor */}
            <div className="mt-5">
              <div className="bg-gray-100 px-4 py-2 border border-gray-300 rounded-t-md flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Code Editor</span>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResetCode}
                    disabled={isPending}
                  >
                    <RefreshCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
              <CodeEditor
                value={code}
                onChange={setCode}
                language={language}
                height="300px"
                className="rounded-t-none"
              />
            </div>

            {/* Test cases and results */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Test Cases</h4>
                  <ul className="space-y-2">
                    {testResults ? (
                      testResults.results.map((result, index) => (
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

              <Card>
                <CardContent className="p-4 flex flex-col h-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Console Output</h4>
                  <div className="flex-grow bg-black rounded p-3 text-green-400 font-mono text-xs overflow-auto h-40">
                    {testResults ? (
                      <pre className="whitespace-pre-wrap">
                        {testResults.consoleOutput || 'No console output'}
                        {testResults.passed === false && (
                          <span className="text-red-400">
                            {"\n\nSome tests failed. Check the test cases for details."}
                          </span>
                        )}
                        {testResults.passed === true && (
                          <span className="text-green-400">
                            {"\n\nAll tests passed! You can submit your solution."}
                          </span>
                        )}
                      </pre>
                    ) : (
                      <span className="text-gray-500">Run your code to see console output</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-5 flex justify-end">
              <Button
                variant="outline"
                onClick={handleSaveProgress}
                disabled={isPending}
                className="mr-2"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>
              <Button
                variant="outline"
                onClick={handleRunCode}
                disabled={isPending}
                className="mr-2"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Run Code
              </Button>
              <Button
                onClick={handleTestCode}
                disabled={isPending}
                className="mr-2"
              >
                Run Tests
              </Button>
              <Button
                variant="default"
                onClick={handleSubmitSolution}
                disabled={isPending}
                className="bg-secondary hover:bg-green-600"
              >
                Submit Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
