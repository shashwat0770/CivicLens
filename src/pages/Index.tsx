
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { MapPin, CheckCircle, Users, AlertCircle, Layers } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Report. Track. Resolve.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            CivicLens empowers citizens to report local issues and connect with authorities for faster resolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isAuthenticated ? (
              <Link to="/report">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Report an Issue
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <MapPin size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
              <p className="text-gray-600">
                Submit local problems with photos and location data for quick identification.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <Layers size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Follow the status of your reports and stay updated on resolution efforts.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">See Results</h3>
              <p className="text-gray-600">
                Witness issues being resolved and your community improving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Location Mapping</h3>
                <p className="text-gray-600">
                  Automatically detect your location or pinpoint issues on a map for accurate reporting.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community Engagement</h3>
                <p className="text-gray-600">
                  Upvote issues that matter to you and add comments to support community concerns.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <AlertCircle className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Status Updates</h3>
                <p className="text-gray-600">
                  Receive real-time updates as your reported issues move from pending to resolved.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Transparent Resolution</h3>
                <p className="text-gray-600">
                  See who is assigned to fix issues and track the entire resolution process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to improve your community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join CivicLens today and start reporting issues that matter to you and your neighbors.
          </p>
          <Link to={isAuthenticated ? "/report" : "/register"}>
            <Button size="lg" className="bg-primary hover:bg-blue-700">
              {isAuthenticated ? "Report an Issue" : "Sign Up Now"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
