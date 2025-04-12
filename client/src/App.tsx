import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import { useQuery } from "@tanstack/react-query";

// Lazy load pages for better performance
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Challenges = lazy(() => import('@/pages/Challenges'));
const ChallengeDetail = lazy(() => import('@/pages/ChallengeDetail'));
const Certificates = lazy(() => import('@/pages/Certificates'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Login = lazy(() => import('@/pages/Login'));

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

// Protected route component
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/user/current'],
  });
  
  const [location, setLocation] = useLocation();
  
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [user, isLoading, setLocation]);
  
  if (isLoading) {
    return <PageLoader />;
  }
  
  if (!user) {
    return null; // Will redirect via useEffect
  }
  
  return <Component {...rest} />;
};

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard">
          {() => <ProtectedRoute component={Dashboard} />}
        </Route>
        <Route path="/challenges">
          {() => <ProtectedRoute component={Challenges} />}
        </Route>
        <Route path="/challenges/:id">
          {(params) => <ProtectedRoute component={ChallengeDetail} params={params} />}
        </Route>
        <Route path="/certificates">
          {() => <ProtectedRoute component={Certificates} />}
        </Route>
        <Route path="/leaderboard">
          {() => <ProtectedRoute component={Leaderboard} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return <Router />;
}

export default App;
