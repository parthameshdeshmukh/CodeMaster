import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { Leaderboard as LeaderboardComponent } from '@/components/Leaderboard';
import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardUser {
  id: number;
  username: string;
  points: number;
  completedChallenges: number;
  certificates: number;
  rank: number;
}

export default function LeaderboardPage() {
  // Fetch leaderboard data
  const { data: leaderboardUsers, isLoading } = useQuery<LeaderboardUser[]>({
    queryKey: ['/api/leaderboard'],
  });

  return (
    <Layout>
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Leaderboard</h1>
        
        {isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <LeaderboardComponent users={leaderboardUsers || []} />
        )}
      </div>
    </Layout>
  );
}
