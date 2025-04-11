import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, CloudLightning, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { formatRelativeTime } from '@/lib/utils';

interface ProgressProps {
  total: number;
  completed: number;
}

interface StreakProps {
  current: number;
  best: number;
  lastActivity: string;
}

interface CertificatesProps {
  count: number;
}

interface ProgressOverviewProps {
  progress: ProgressProps;
  streak: StreakProps;
  certificates: CertificatesProps;
}

export function ProgressOverview({ progress, streak, certificates }: ProgressOverviewProps) {
  const progressPercentage = progress.total > 0 
    ? Math.floor((progress.completed / progress.total) * 100) 
    : 0;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900">Your Progress</h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Completed Challenges Card */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed Challenges
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {progress.completed} of {progress.total}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100">
                  <div 
                    style={{ width: `${progressPercentage}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Streak Card */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CloudLightning className="h-6 w-6 text-amber-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Current Streak
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {streak.current} day{streak.current !== 1 && 's'}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-gray-600">
                <div>Best: {streak.best} day{streak.best !== 1 && 's'}</div>
                <div>Last activity: {formatRelativeTime(streak.lastActivity)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earned Certificates Card */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <IdCard className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Earned Certificates
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {certificates.count}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="link" asChild>
                <Link href="/certificates">
                  <a className="text-sm text-blue-600 hover:text-blue-800 font-medium p-0">
                    View all certificates
                  </a>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
