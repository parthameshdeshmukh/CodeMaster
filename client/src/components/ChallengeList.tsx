import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Challenge, Difficulty } from '@shared/schema';
import { getDifficultyInfo, getLanguageInfo } from '@/lib/utils';

interface ChallengeListProps {
  challenges: Challenge[];
  title?: string;
}

export function ChallengeList({ challenges, title = "Recommended Challenges" }: ChallengeListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.length === 0 ? (
          <p className="text-gray-500 col-span-full">No challenges available at the moment.</p>
        ) : (
          challenges.map((challenge) => {
            const difficultyInfo = getDifficultyInfo(challenge.difficulty as Difficulty);
            const languageInfo = getLanguageInfo(challenge.language as any);
            
            return (
              <Card key={challenge.id} className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {challenge.title}
                      </h3>
                      <div className="mt-1 flex items-center">
                        <Badge 
                          variant={challenge.difficulty as any}
                          className="px-2 py-1 text-xs font-medium rounded-full"
                        >
                          {difficultyInfo.name}
                        </Badge>
                        <span className="ml-2 text-sm text-gray-500">
                          {languageInfo.name}
                        </span>
                      </div>
                    </div>
                    <Badge variant="points" className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {challenge.points} points
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">
                      {challenge.description.length > 100
                        ? `${challenge.description.substring(0, 100)}...`
                        : challenge.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link href={`/challenges/${challenge.id}`}>
                        <a className="w-full inline-flex justify-center items-center">
                          Start Challenge
                        </a>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
