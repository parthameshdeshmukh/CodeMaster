import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from 'wouter';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, CheckCircle, IdCard, Trophy, ArrowRight } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const { data: user } = useQuery<{ username: string } | null>({
    queryKey: ['/api/user/current'],
  });

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/dashboard'); // In a real app, would redirect to sign up/login
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="py-12 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg my-6">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Master Coding with Interactive Challenges
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Improve your coding skills with hands-on challenges, get instant feedback, and earn certificates to showcase your expertise.
            </p>
            <Button onClick={handleGetStarted} size="lg" className="text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How CodeMaster Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-primary">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice with Real Challenges</h3>
                <p className="text-gray-600">
                  Solve coding challenges in multiple languages with varying difficulty levels. Each challenge is designed to improve specific skills.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-secondary">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Instant Feedback</h3>
                <p className="text-gray-600">
                  Run your code against test cases and get immediate feedback. See where you went wrong and how to improve.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-accent">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 rounded-full mb-4">
                  <IdCard className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Certificates</h3>
                <p className="text-gray-600">
                  Complete all challenges in a language to earn certificates that showcase your skills to employers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Challenge Categories */}
      <div className="py-16 bg-gray-50 -mx-6 px-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Challenge Categories</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          From algorithm fundamentals to advanced web applications, we have challenges for all skill levels.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-2">Algorithms</h3>
            <p className="text-gray-600 mb-3">Master sorting, searching, and optimization techniques.</p>
            <div className="flex items-center text-sm text-blue-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">JavaScript</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium ml-2">Python</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-2">Data Structures</h3>
            <p className="text-gray-600 mb-3">Implement and use arrays, linked lists, trees, and graphs.</p>
            <div className="flex items-center text-sm text-blue-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">JavaScript</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium ml-2">Java</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-2">Web Development</h3>
            <p className="text-gray-600 mb-3">Build responsive UIs and efficient backend systems.</p>
            <div className="flex items-center text-sm text-blue-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">JavaScript</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium ml-2">React</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-2">Database Design</h3>
            <p className="text-gray-600 mb-3">Learn SQL, database modeling, and optimization.</p>
            <div className="flex items-center text-sm text-blue-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">SQL</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium ml-2">NoSQL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-gray-700 font-semibold">JD</span>
              </div>
              <div>
                <h4 className="font-semibold">Jane Doe</h4>
                <p className="text-sm text-gray-600">Software Engineer</p>
              </div>
            </div>
            <p className="text-gray-600">
              "CodeMaster helped me prepare for technical interviews. The challenges are well-designed and the immediate feedback system is incredibly helpful."
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-gray-700 font-semibold">JS</span>
              </div>
              <div>
                <h4 className="font-semibold">John Smith</h4>
                <p className="text-sm text-gray-600">CS Student</p>
              </div>
            </div>
            <p className="text-gray-600">
              "I love the certificate feature! I completed all JavaScript challenges and added the certificate to my resume. It helped me stand out during job applications."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 -mx-6 px-6 rounded-lg text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Master Coding?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join CodeMaster today and take your programming skills to the next level.
          </p>
          <Button variant="secondary" size="lg" onClick={handleGetStarted} className="text-lg px-8 py-6">
            Start Coding Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
