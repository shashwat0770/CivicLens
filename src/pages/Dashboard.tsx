
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

  // Mock data with Indian urban issues
  useEffect(() => {
    const mockIssues: Issue[] = [
      {
        id: '1',
        title: 'Broken Road in Karol Bagh',
        description: 'The road near Karol Bagh metro station has several large potholes making it dangerous for two-wheelers especially during monsoon season.',
        imageUrl: 'https://images.unsplash.com/photo-1635068741358-ab1b9813623f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJva2VuJTIwcm9hZHxlbnwwfHwwfHx8MA%3D%3D',
        location: {
          lat: 28.6466,
          lng: 77.1905,
          address: 'Near Karol Bagh Metro Station, Delhi'
        },
        status: 'Pending',
        createdBy: '123',
        createdAt: new Date('2023-05-15'),
        upvotes: ['user1', 'user2', 'user3'],
        comments: [
          {
            id: 'c1',
            text: 'My bike got damaged because of these potholes!',
            userId: 'user1',
            userName: 'Raj Kumar',
            createdAt: new Date('2023-05-16')
          }
        ]
      },
      {
        id: '2',
        title: 'Illegal Parking in Connaught Place',
        description: 'Multiple cars are constantly parked in no-parking zones near Connaught Place, blocking pedestrian walkways and causing traffic congestion.',
        imageUrl: 'https://media.istockphoto.com/id/1463835828/photo/lift-truck-removing-illegally-parked-vehicle.jpg?s=612x612&w=0&k=20&c=O7G__v2E2Mr3BPnzwDVn9ap1Oy9LXEjq_V-jWACQDlM=',
        location: {
          lat: 28.6289,
          lng: 77.2065,
          address: 'Block A, Connaught Place, New Delhi'
        },
        status: 'In Progress',
        createdBy: '123',
        createdAt: new Date('2023-05-10'),
        upvotes: ['user1', 'user4'],
        comments: []
      },
      {
        id: '3',
        title: 'Littering and Waste Disposal Issue',
        description: 'The area near Nehru Place market has overflowing garbage bins that haven\'t been cleaned for days causing health hazards.',
        imageUrl: 'https://media.gettyimages.com/id/1025471054/photo/garbage-pollution-global-warming.jpg?s=612x612&w=0&k=20&c=i-fOgSq3h_ML9Gp0uAVYYzCV3Vi3HhPZZzwFIQRIV-A=',
        location: {
          lat: 28.5491,
          lng: 77.2540,
          address: 'Nehru Place Market, New Delhi'
        },
        status: 'Resolved',
        createdBy: 'user2',
        createdAt: new Date('2023-05-05'),
        assignedTo: 'admin1',
        upvotes: ['user3', 'user5'],
        comments: [
          {
            id: 'c2',
            text: 'MCD has cleaned up this area now.',
            userId: 'admin1',
            userName: 'Sanitation Department',
            createdAt: new Date('2023-05-07')
          }
        ]
      },
      {
        id: '4',
        title: 'Noise Pollution from Construction',
        description: 'Ongoing construction at Dwarka Sector 12 continues even during night hours causing severe noise pollution for residents.',
        imageUrl: 'https://t3.ftcdn.net/jpg/05/13/02/44/240_F_513024415_blH36yE0tARUqNXldCSXlmcQv7Znp2lV.jpg',
        location: {
          lat: 28.5921,
          lng: 77.0420,
          address: 'Sector 12, Dwarka, New Delhi'
        },
        status: 'Pending',
        createdBy: 'user4',
        createdAt: new Date('2023-05-12'),
        upvotes: ['user2'],
        comments: []
      },
      {
        id: '5',
        title: 'Open Defecation Near Yamuna Bank',
        description: 'Despite Swachh Bharat initiatives, open defecation is common near the Yamuna river banks near unauthorized colonies, creating health hazards.',
        imageUrl: 'https://media.istockphoto.com/id/1136672861/vector/stop-open-defecation-healthcare-infographic.jpg?s=612x612&w=0&k=20&c=BNy6rtKgSm6VRuWuJDANE0vKXtFBLAslYofBLtTaacI=',
        location: {
          lat: 28.6126,
          lng: 77.2571,
          address: 'Yamuna Khadar area, East Delhi'
        },
        status: 'In Progress',
        createdBy: 'user5',
        createdAt: new Date('2023-05-08'),
        assignedTo: 'admin2',
        upvotes: ['user1', 'user3', 'user4'],
        comments: [
          {
            id: 'c3',
            text: 'This is a serious health concern for local residents.',
            userId: 'user1',
            userName: 'Public Health Advocate',
            createdAt: new Date('2023-05-09')
          },
          {
            id: 'c4',
            text: 'Mobile toilets are being installed in the area to address this issue.',
            userId: 'admin2',
            userName: 'Delhi Jal Board',
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
            View and manage reported civic issues in Delhi
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
