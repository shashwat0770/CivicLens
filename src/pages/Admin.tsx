
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Issue, IssueStatus } from '../types';
import { Search, Filter, CheckCircle, Clock, AlertTriangle, BarChart4, PieChart } from 'lucide-react';
import { toast } from 'sonner';
import MapView from '../components/MapView';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  
  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
      toast.error('You do not have permission to access the admin panel');
    }
  }, [user, navigate]);

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
      // More mock data
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
    if (statusFilter !== 'all') {
      result = result.filter(issue => issue.status === statusFilter);
    }
    
    setFilteredIssues(result);
  }, [searchTerm, statusFilter, issues]);

  const handleUpdateStatus = (issueId: string, newStatus: IssueStatus) => {
    setIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          return { ...issue, status: newStatus };
        }
        return issue;
      })
    );
    toast.success(`Issue #${issueId} status updated to ${newStatus}`);
  };

  const handleAssignWorker = (issueId: string, workerId: string) => {
    setIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          return { ...issue, assignedTo: workerId };
        }
        return issue;
      })
    );
    toast.success(`Issue #${issueId} assigned to worker`);
  };

  const getStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-status-pending">Pending</Badge>;
      case 'In Progress':
        return <Badge className="bg-status-inProgress">In Progress</Badge>;
      case 'Resolved':
        return <Badge className="bg-status-resolved">Resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getIssueStats = () => {
    const total = issues.length;
    const pending = issues.filter(issue => issue.status === 'Pending').length;
    const inProgress = issues.filter(issue => issue.status === 'In Progress').length;
    const resolved = issues.filter(issue => issue.status === 'Resolved').length;
    
    return { total, pending, inProgress, resolved };
  };

  const stats = getIssueStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage and track all reported civic issues
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-status-pending" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Issues</p>
                <h3 className="text-3xl font-bold">{stats.pending}</h3>
                <p className="text-sm text-gray-500">Require attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100">
                <Clock className="h-6 w-6 text-status-inProgress" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <h3 className="text-3xl font-bold">{stats.inProgress}</h3>
                <p className="text-sm text-gray-500">Currently being addressed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-status-resolved" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <h3 className="text-3xl font-bold">{stats.resolved}</h3>
                <p className="text-sm text-gray-500">Successfully completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="issues">
        <TabsList className="mb-6">
          <TabsTrigger value="issues">Issue Management</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="issues">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Issues</CardTitle>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="relative grow md:grow-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Search issues..." 
                    className="pl-10 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">Filter:</span>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIssues.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No issues found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredIssues.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell className="font-medium">#{issue.id}</TableCell>
                          <TableCell>{issue.title}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {issue.location.address}
                          </TableCell>
                          <TableCell>{getStatusBadge(issue.status)}</TableCell>
                          <TableCell>
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {issue.assignedTo ? (
                              <span className="text-sm">Worker #{issue.assignedTo}</span>
                            ) : (
                              <span className="text-sm text-gray-500">Unassigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Select 
                                value={issue.status} 
                                onValueChange={(value) => handleUpdateStatus(issue.id, value as IssueStatus)}
                              >
                                <SelectTrigger className="h-8 w-28">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="In Progress">In Progress</SelectItem>
                                  <SelectItem value="Resolved">Resolved</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select
                                value={issue.assignedTo || ''}
                                onValueChange={(value) => handleAssignWorker(issue.id, value)}
                              >
                                <SelectTrigger className="h-8 w-28">
                                  <SelectValue placeholder="Assign" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="">Unassigned</SelectItem>
                                  <SelectItem value="worker1">Worker #1</SelectItem>
                                  <SelectItem value="worker2">Worker #2</SelectItem>
                                  <SelectItem value="worker3">Worker #3</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <p className="text-sm text-gray-500">
                Visual representation of reported issues across the city
              </p>
            </CardHeader>
            <CardContent>
              <MapView 
                issues={filteredIssues} 
                onSelectIssue={setSelectedIssue} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  <span>Issues by Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="h-80 flex items-center justify-center">
                  {/* Placeholder for chart - would use Recharts in real app */}
                  <div className="w-52 h-52 rounded-full relative">
                    <div 
                      className="absolute inset-0 bg-status-pending rounded-full" 
                      style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` }}
                    ></div>
                    <div 
                      className="absolute inset-0 bg-status-inProgress rounded-full" 
                      style={{ clipPath: `polygon(50% 50%, 100% 0, 100% 100%)` }}
                    ></div>
                    <div 
                      className="absolute inset-0 bg-status-resolved rounded-full" 
                      style={{ clipPath: `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full w-24 h-24 m-auto">
                      <span className="text-lg font-medium">{stats.total}</span>
                      <span className="text-xs ml-1">issues</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 px-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-status-pending rounded-full mb-1"></div>
                    <div className="text-sm font-medium">{stats.pending}</div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-status-inProgress rounded-full mb-1"></div>
                    <div className="text-sm font-medium">{stats.inProgress}</div>
                    <div className="text-xs text-gray-500">In Progress</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-status-resolved rounded-full mb-1"></div>
                    <div className="text-sm font-medium">{stats.resolved}</div>
                    <div className="text-xs text-gray-500">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart4 className="h-5 w-5" />
                  <span>Issues Over Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex flex-col items-center justify-center">
                  {/* Placeholder for chart - would use Recharts in real app */}
                  <div className="flex items-end h-48 gap-4 mt-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 bg-primary rounded-t-md" style={{height: '40px'}}></div>
                      <span className="text-xs mt-2">Mon</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 bg-primary rounded-t-md" style={{height: '70px'}}></div>
                      <span className="text-xs mt-2">Tue</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 bg-primary rounded-t-md" style={{height: '50px'}}></div>
                      <span className="text-xs mt-2">Wed</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 bg-primary rounded-t-md" style={{height: '85px'}}></div>
                      <span className="text-xs mt-2">Thu</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 bg-primary rounded-t-md" style={{height: '65px'}}></div>
                      <span className="text-xs mt-2">Fri</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 bg-primary rounded-t-md" style={{height: '35px'}}></div>
                      <span className="text-xs mt-2">Sat</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 bg-primary rounded-t-md" style={{height: '25px'}}></div>
                      <span className="text-xs mt-2">Sun</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-8">
                    Issues reported this week: {stats.total}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
