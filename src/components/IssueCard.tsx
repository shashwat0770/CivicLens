
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Issue } from '../types';
import { MapPin, ThumbsUp, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
  onUpvote?: (id: string) => void;
  showActions?: boolean;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onUpvote, showActions = true }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-status-pending text-white';
      case 'In Progress':
        return 'bg-status-inProgress text-white';
      case 'Resolved':
        return 'bg-status-resolved text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{issue.title}</CardTitle>
          <Badge className={getStatusColor(issue.status)}>
            {issue.status}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{issue.location.address}</span>
        </div>
      </CardHeader>
      <CardContent>
        {issue.imageUrl && (
          <div className="mb-3 overflow-hidden rounded-md h-48">
            <img 
              src={issue.imageUrl} 
              alt={issue.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className="text-sm text-gray-600 line-clamp-3">
          {issue.description}
        </p>
        <div className="flex items-center mt-3 text-xs text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>Reported {format(new Date(issue.createdAt), 'MMM d, yyyy')}</span>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="pt-2 border-t">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 flex items-center"
                onClick={() => onUpvote && onUpvote(issue.id)}
              >
                <ThumbsUp size={16} className="mr-1" />
                <span>{issue.upvotes.length}</span>
              </Button>
              <div className="flex items-center text-gray-600">
                <MessageSquare size={16} className="mr-1" />
                <span>{issue.comments.length}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default IssueCard;
