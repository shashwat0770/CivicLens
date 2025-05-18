
import React from 'react';
import { Issue } from '../types';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  issues: Issue[];
  onSelectIssue: (issue: Issue) => void;
}

const MapView: React.FC<MapViewProps> = ({ issues, onSelectIssue }) => {
  // This is a mock map implementation
  // In a real application, you would integrate with Google Maps or similar
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-status-pending';
      case 'In Progress':
        return 'bg-status-inProgress';
      case 'Resolved':
        return 'bg-status-resolved';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="border rounded-lg p-4 h-96 relative bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500 font-medium">
          Map integration will be implemented in Phase 4
        </p>
      </div>
      
      {/* Mock pins for issues */}
      <div className="relative w-full h-full">
        {issues.map((issue) => (
          <div 
            key={issue.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:z-10"
            style={{ 
              left: `${30 + Math.random() * 40}%`, 
              top: `${30 + Math.random() * 40}%`
            }}
            onClick={() => onSelectIssue(issue)}
          >
            <div className="flex flex-col items-center">
              <div className={`${getStatusColor(issue.status)} p-1 rounded-full shadow-lg`}>
                <MapPin size={20} className="text-white" />
              </div>
              <div className="bg-white text-xs px-2 py-1 rounded shadow mt-1 whitespace-nowrap">
                {issue.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
