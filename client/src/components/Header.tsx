import React from 'react';
import { Link, useLocation } from 'wouter';
import { Code, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';

export function Header() {
  const [location] = useLocation();
  const { data: user } = useQuery<{ username: string } | null>({
    queryKey: ['/api/user/current'],
  });

  return (
    <header className="bg-[#0E1525] border-b border-[#1C2333] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-[#0093B0]" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#0093B0] to-[#4CC9F0] bg-clip-text text-transparent">CSS Visualizer</span>
              </div>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/challenges">
                <div className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium cursor-pointer ${
                  location === '/challenges' ? 'border-[#0093B0] text-white' : 'border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300'
                }`}>
                  Challenges
                </div>
              </Link>
              <Link href="/dashboard">
                <div className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium cursor-pointer ${
                  location === '/dashboard' ? 'border-[#0093B0] text-white' : 'border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300'
                }`}>
                  Dashboard
                </div>
              </Link>
              <Link href="/certificates">
                <div className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium cursor-pointer ${
                  location === '/certificates' ? 'border-[#0093B0] text-white' : 'border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300'
                }`}>
                  Certificates
                </div>
              </Link>
              <Link href="/leaderboard">
                <div className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium cursor-pointer ${
                  location === '/leaderboard' ? 'border-[#0093B0] text-white' : 'border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300'
                }`}>
                  Leaderboard
                </div>
              </Link>
              <Link href="/css-visualizer">
                <div className={`border-b-2 px-1 pt-1 inline-flex items-center text-sm font-medium cursor-pointer ${
                  location === '/css-visualizer' ? 'border-[#0093B0] text-white' : 'border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300'
                }`}>
                  <Palette className="h-4 w-4 mr-1" />
                  CSS Visualizer
                </div>
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button className="bg-[#0093B0] hover:bg-[#0082A0] text-white" asChild>
                <Link href="/challenges">
                  <div className="relative inline-flex items-center px-4 py-2">
                    <span>New Challenge</span>
                  </div>
                </Link>
              </Button>
            </div>
            {user && (
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div className="ml-3 relative">
                  <div>
                    <Avatar className="border border-[#0093B0]">
                      <AvatarFallback className="bg-[#1C2333] text-[#0093B0]">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
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
