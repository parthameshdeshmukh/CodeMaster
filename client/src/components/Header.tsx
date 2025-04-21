import React from 'react';
import { Link, useLocation } from 'wouter';
import { Code, Trophy, Medal, LayoutDashboard, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: user } = useQuery<{ id: number; username: string } | null>({
    queryKey: ['/api/user/current'],
  });

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
      queryClient.invalidateQueries({ queryKey: ['/api/user/current'] });
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      setLocation('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <Code className="h-8 w-8 text-primary" />
                  <span className="ml-2 text-xl font-bold text-gray-900">CodeMaster</span>
                </a>
              </Link>
            </div>
            
            {user && (
              <nav className="hidden md:ml-6 md:flex md:space-x-8 items-center">
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
            )}
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                <div className="flex-shrink-0 mr-4">
                  <Button asChild>
                    <Link href="/challenges">
                      <a className="relative inline-flex items-center px-4 py-2">
                        <span>New Challenge</span>
                      </a>
                    </Link>
                  </Button>
                </div>
                <div className="md:flex-shrink-0 md:flex md:items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center">
                        <Avatar>
                          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuLabel className="font-normal text-xs text-gray-500">
                        Signed in as {user.username}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <a className="flex cursor-pointer items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </a>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/certificates">
                          <a className="flex cursor-pointer items-center">
                            <Medal className="mr-2 h-4 w-4" />
                            <span>Certificates</span>
                          </a>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <a className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </a>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
