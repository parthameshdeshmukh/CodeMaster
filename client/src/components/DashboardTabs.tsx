import React from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

interface TabInfo {
  name: string;
  href: string;
  current: boolean;
}

export function DashboardTabs() {
  const [location] = useLocation();
  
  const tabs: TabInfo[] = [
    { name: 'My Progress', href: '/dashboard', current: location === '/dashboard' },
    { name: 'Challenges', href: '/challenges', current: location === '/challenges' },
    { name: 'Certificates', href: '/certificates', current: location === '/certificates' },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link key={tab.name} href={tab.href}>
            <a
              className={cn(
                tab.current
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}
