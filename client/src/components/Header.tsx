import React from 'react';
import { Link, useLocation } from 'wouter';
import { Code, Trophy, Medal, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';

export function Header() {
  const [location] = useLocation();
  const { data: user } = useQuery<{ username: string } | null>({
    queryKey: ['/api/user/current'],
  });

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">CodeMaster</span>
              </div>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/challenges">
                <a className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium ${
                  location === '/challenges' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  Challenges
                </a>
              </Link>
              <Link href="/dashboard">
                <a className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium ${
                  location === '/dashboard' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  Dashboard
                </a>
              </Link>
              <Link href="/certificates">
                <a className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium ${
                  location === '/certificates' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  Certificates
                </a>
              </Link>
              <Link href="/leaderboard">
                <a className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium ${
                  location === '/leaderboard' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  Leaderboard
                </a>
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button asChild>
                <Link href="/challenges">
                  <a className="relative inline-flex items-center px-4 py-2">
                    <span>New Challenge</span>
                  </a>
                </Link>
              </Button>
            </div>
            {user && (
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div className="ml-3 relative">
                  <div>
                    <Avatar>
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
