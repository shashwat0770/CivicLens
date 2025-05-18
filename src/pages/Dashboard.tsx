
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IssueCard from '../components/IssueCard';
import MapView from '../components/MapView';
import { Issue, IssueStatus } from '../types';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, MapPin, List } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus[]>(['Pending', 'In Progress', 'Resolved']);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Mock data
  useEffect(() => {
    const mockIssues: Issue[] = [
      {
        id: '1',
        title: 'Broken Streetlight',
        description: 'The streetlight at the corner of Main and 1st has been out for over a week, making the intersection dangerous at night.',
        imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&h=500&q=80',
        location: {
          lat: 40.7128,
          lng: -74.0060,
          address: 'Corner of Main St & 1st Ave'
        },
        status: 'Pending',
        createdBy: '123',
        createdAt: new Date('2023-05-15'),
        upvotes: ['user1', 'user2', 'user3'],
        comments: [
          {
            id: 'c1',
            text: 'I noticed this too. Very dangerous!',
            userId: 'user1',
            userName: 'Jane Doe',
            createdAt: new Date('2023-05-16')
          }
        ]
      },
      {
        id: '2',
        title: 'Pothole on Oak Street',
        description: 'Large pothole on Oak Street between 3rd and 4th Avenue. It\'s causing damage to vehicles.',
        imageUrl: 'https://images.unsplash.com/photo-1552761831-7af39aude0ca?auto=format&fit=crop&w=800&h=500&q=80',
        location: {
          lat: 40.7200,
          lng: -74.0100,
          address: 'Oak Street between 3rd and 4th Ave'
        },
        status: 'In Progress',
        createdBy: '123',
        createdAt: new Date('2023-05-10'),
        upvotes: ['user1', 'user4'],
        comments: []
      },
      {
        id: '3',
        title: 'Overflowing Trash Bin',
        description: 'The public trash bin in Central Park hasn\'t been emptied for days and is overflowing.',
        imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?auto=format&fit=crop&w=800&h=500&q=80',
        location: {
          lat: 40.7300,
          lng: -74.0050,
          address: 'Central Park, near east entrance'
        },
        status: 'Resolved',
        createdBy: 'user2',
        createdAt: new Date('2023-05-05'),
        assignedTo: 'admin1',
        upvotes: ['user3', 'user5'],
        comments: [
          {
            id: 'c2',
            text: 'This has been cleaned up now.',
            userId: 'admin1',
            userName: 'Park Services',
            createdAt: new Date('2023-05-07')
          }
        ]
      },
      {
        id: '4',
        title: 'Graffiti on Public Library',
        description: 'Someone has spray painted graffiti on the north wall of the public library building.',
        imageUrl: 'https://images.unsplash.com/photo-1533625216968-c4d9a9a7a636?auto=format&fit=crop&w=800&h=500&q=80',
        location: {
          lat: 40.7180,
          lng: -74.0080,
          address: 'Public Library, 500 Main St'
        },
        status: 'Pending',
        createdBy: 'user4',
        createdAt: new Date('2023-05-12'),
        upvotes: ['user2'],
        comments: []
      },
      {
        id: '5',
        title: 'Broken Swing in Park',
        description: 'One of the swings in the children\'s playground is broken and poses a safety risk.',
        imageUrl: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&w=800&h=500&q=80',
        location: {
          lat: 40.7250,
          lng: -74.0120,
          address: 'City Park Playground, West Side'
        },
        status: 'In Progress',
        createdBy: 'user5',
        createdAt: new Date('2023-05-08'),
        assignedTo: 'admin2',
        upvotes: ['user1', 'user3', 'user4'],
        comments: [
          {
            id: 'c3',
            text: 'My child almost got hurt on this swing.',
            userId: 'user1',
            userName: 'Concerned Parent',
            createdAt: new Date('2023-05-09')
          },
          {
            id: 'c4',
            text: 'We have ordered replacement parts and will fix this by next week.',
            userId: 'admin2',
            userName: 'Park Maintenance',
            createdAt: new Date('2023-05-11')
          }
        ]
      }
    ];
    
    setIssues(mockIssues);
    setFilteredIssues(mockIssues);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = issues;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    result = result.filter(issue => statusFilter.includes(issue.status));
    
    setFilteredIssues(result);
  }, [searchTerm, statusFilter, issues]);

  const handleUpvote = (issueId: string) => {
    // In a real app, this would call an API to update the upvote
    setIssues(prevIssues => 
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          const userId = user?.id || 'anonymous';
          const hasUpvoted = issue.upvotes.includes(userId);
          
          return {
            ...issue,
            upvotes: hasUpvoted
              ? issue.upvotes.filter(id => id !== userId)
              : [...issue.upvotes, userId]
          };
        }
        return issue;
      })
    );
  };

  const toggleStatusFilter = (status: IssueStatus) => {
    setStatusFilter(prevFilters => {
      if (prevFilters.includes(status)) {
        return prevFilters.filter(s => s !== status);
      } else {
        return [...prevFilters, status];
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            View and manage reported civic issues in your area
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search issues..." 
              className="pl-10 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('Pending')}
                onCheckedChange={() => toggleStatusFilter('Pending')}
              >
                Pending Issues
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('In Progress')}
                onCheckedChange={() => toggleStatusFilter('In Progress')}
              >
                In Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('Resolved')}
                onCheckedChange={() => toggleStatusFilter('Resolved')}
              >
                Resolved
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/report">
            <Button className="gap-2">
              <Plus size={16} />
              <span>Report Issue</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="mb-6">
          <TabsTrigger value="list" className="gap-2">
            <List size={16} />
            <span>List View</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="gap-2">
            <MapPin size={16} />
            <span>Map View</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">No issues found</h3>
              <p className="mt-2 text-gray-500">
                {searchTerm ? 'Try adjusting your search or filters' : 'Be the first to report an issue!'}
              </p>
              <Link to="/report" className="mt-4 inline-block">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.map(issue => (
                <IssueCard 
                  key={issue.id} 
                  issue={issue} 
                  onUpvote={handleUpvote}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="map">
          <MapView 
            issues={filteredIssues} 
            onSelectIssue={setSelectedIssue} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
