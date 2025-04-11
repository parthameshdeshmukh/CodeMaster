import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/pages/not-found";

// Lazy load pages for better performance
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Challenges = lazy(() => import('@/pages/Challenges'));
const ChallengeDetail = lazy(() => import('@/pages/ChallengeDetail'));
const Certificates = lazy(() => import('@/pages/Certificates'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen w-full p-6">
    <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3 mb-8" />
    <Skeleton className="h-64 w-full mb-4" />
    <Skeleton className="h-64 w-full" />
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/challenges/:id" component={ChallengeDetail} />
        <Route path="/certificates" component={Certificates} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return <Router />;
}

export default App;
