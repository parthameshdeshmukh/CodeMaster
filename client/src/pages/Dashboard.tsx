import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { DashboardTabs } from '@/components/DashboardTabs';
import { ProgressOverview } from '@/components/ProgressOverview';
import { RecentActivity } from '@/components/RecentActivity';
import { ChallengeList } from '@/components/ChallengeList';
import { Skeleton } from '@/components/ui/skeleton';
import { Challenge, UserActivity } from '@shared/schema';

interface UserStats {
  completedChallenges: number;
  totalChallenges: number;
  streak: number;
  bestStreak: number;
  lastActivity: string;
  certificatesCount: number;
}

export default function Dashboard() {
  // Fetch user stats
  const { data: stats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ['/api/user/stats'],
  });

  // Fetch recent activity
  const { data: activities, isLoading: activitiesLoading } = useQuery<UserActivity[]>({
    queryKey: ['/api/user/activity'],
  });

  // Fetch recommended challenges
  const { data: recommendedChallenges, isLoading: challengesLoading } = useQuery<Challenge[]>({
    queryKey: ['/api/challenges/recommended'],
  });

  return (
    <Layout>
      <DashboardTabs />
      
      {/* Progress Overview Section */}
      {statsLoading ? (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">Your Progress</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      ) : (
        stats && (
          <ProgressOverview
            progress={{
              total: stats.totalChallenges,
              completed: stats.completedChallenges
            }}
            streak={{
              current: stats.streak,
              best: stats.bestStreak,
              lastActivity: stats.lastActivity
            }}
            certificates={{
              count: stats.certificatesCount
            }}
          />
        )
      )}
      
      {/* Recent Activity Section */}
      {activitiesLoading ? (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <Skeleton className="mt-4 h-60 w-full" />
        </div>
      ) : (
        activities && (
          <RecentActivity 
            activities={activities.map(activity => ({
              id: activity.id,
              type: activity.activityType as any,
              timestamp: activity.createdAt as any,
              challenge: activity.challenge as any,
              certificate: activity.certificate as any
            }))} 
          />
        )
      )}
      
      {/* Recommended Challenges Section */}
      {challengesLoading ? (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recommended Challenges</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      ) : (
        recommendedChallenges && (
          <ChallengeList challenges={recommendedChallenges} />
        )
      )}
    </Layout>
  );
}
