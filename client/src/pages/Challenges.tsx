import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { DashboardTabs } from '@/components/DashboardTabs';
import { ChallengeList } from '@/components/ChallengeList';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Challenge, Difficulty, Language, ChallengeWithProgress } from '@shared/schema';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];
const languageOptions: Language[] = ['javascript', 'python', 'java', 'cpp', 'rust', 'go'];

export default function Challenges() {
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [language, setLanguage] = useState<Language | 'all'>('all');
  
  // Fetch challenges with progress info
  const { data: challenges, isLoading } = useQuery<ChallengeWithProgress[]>({
    queryKey: ['/api/challenges', { difficulty, language }],
  });
  
  // Filter for each category
  const getFilteredChallenges = (status?: string) => {
    if (!challenges) return [];
    
    return challenges.filter(challenge => {
      if (status && challenge.userStatus !== status) return false;
      if (difficulty !== 'all' && challenge.difficulty !== difficulty) return false;
      if (language !== 'all' && challenge.language !== language) return false;
      return true;
    });
  };
  
  const allChallenges = getFilteredChallenges();
  const completedChallenges = getFilteredChallenges('completed');
  const inProgressChallenges = getFilteredChallenges('started');
  const newChallenges = getFilteredChallenges('new');

  return (
    <Layout>
      <DashboardTabs />
      
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">All Challenges</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select 
              value={difficulty} 
              onValueChange={(value) => setDifficulty(value as Difficulty | 'all')}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficultyOptions.map(option => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={language} 
              onValueChange={(value) => setLanguage(value as Language | 'all')}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languageOptions.map(option => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({allChallenges.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({inProgressChallenges.length})</TabsTrigger>
              <TabsTrigger value="new">New ({newChallenges.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ChallengeList challenges={allChallenges} title="" />
            </TabsContent>
            
            <TabsContent value="completed">
              <ChallengeList challenges={completedChallenges} title="" />
            </TabsContent>
            
            <TabsContent value="in-progress">
              <ChallengeList challenges={inProgressChallenges} title="" />
            </TabsContent>
            
            <TabsContent value="new">
              <ChallengeList challenges={newChallenges} title="" />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
