
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueForm from '../components/IssueForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would make an API call
      console.log('Submitting issue:', data);
      
      // Mock successful submission
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('Issue reported successfully!');
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error submitting report:', error);
      setIsSubmitting(false);
      toast.error('Failed to submit report. Please try again.');
    }
  };

  if (isSubmitting) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-xl font-semibold">Submitting your report...</h2>
          <p className="text-gray-500 mt-2">
            This will just take a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Report an Issue</h1>
        <p className="text-gray-600 mt-2">
          Help improve your community by reporting local problems
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Important Note</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Please provide as much detail as possible. Photos and precise location information help authorities respond more effectively.
                </p>
              </div>
            </div>
          </div>
          
          <IssueForm onSubmit={handleSubmitReport} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIssue;
