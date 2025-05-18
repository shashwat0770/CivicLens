
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <MapPin size={24} className="text-primary mr-2" />
              <span className="text-xl font-bold text-primary">CivicLens</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-primary">Admin</Link>
                )}
                <Link to="/report" className="text-gray-600 hover:text-primary">Report Issue</Link>
                <div className="border-l border-gray-300 h-6 mx-2"></div>
                <span className="text-sm text-gray-600 hidden sm:block">
                  {user?.name} ({user?.role})
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
