import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, CloudLightning, IdCard, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/utils';
import { ActivityType, Challenge, Difficulty } from '@shared/schema';
import { ACTIVITY_TYPES } from '@/lib/constants';

interface Activity {
  id: number;
  type: ActivityType;
  timestamp: string;
  challenge?: {
    id: number;
    title: string;
    difficulty: Difficulty;
    language: string;
  };
  certificate?: {
    id: number;
    title: string;
    language: string;
  };
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'started_challenge':
        return <CloudLightning className="h-5 w-5 text-blue-500" />;
      case 'completed_challenge':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'earned_certificate':
        return <IdCard className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };
  
  const getActivityBadgeVariant = (type: ActivityType, difficulty?: Difficulty) => {
    if (type === 'earned_certificate') return 'certificate';
    if (!difficulty) return 'default';
    
    return difficulty as any;
  };
  
  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'started_challenge':
        return `Started "${activity.challenge?.title}" challenge`;
      case 'completed_challenge':
        return `Completed "${activity.challenge?.title}" challenge`;
      case 'earned_certificate':
        return `Earned "${activity.certificate?.title}" certificate`;
      default:
        return '';
    }
  };
  
  const getActivityBadgeText = (activity: Activity) => {
    switch (activity.type) {
      case 'started_challenge':
      case 'completed_challenge':
        return activity.challenge?.difficulty;
      case 'earned_certificate':
        return 'IdCard';
      default:
        return '';
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
      <Card className="mt-4">
        <ul role="list" className="divide-y divide-gray-200">
          {activities.length === 0 ? (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              No recent activity yet. Start solving challenges!
            </li>
          ) : (
            activities.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${ACTIVITY_TYPES[activity.type]?.icon ? ACTIVITY_TYPES[activity.type].icon : 'bg-gray-100'}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <p className="ml-3 text-sm font-medium text-gray-900">
                        {getActivityText(activity)}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <Badge 
                        variant={getActivityBadgeVariant(activity.type, activity.challenge?.difficulty as Difficulty)}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {getActivityBadgeText(activity)}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {activity.challenge?.language || activity.certificate?.language}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </Card>
    </div>
  );
}
