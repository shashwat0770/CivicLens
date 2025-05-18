

export type UserRole = 'citizen' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  location: Location;
  status: IssueStatus;
  createdBy: string;
  createdAt: Date;
  assignedTo?: string;
  upvotes: string[];
  comments: Comment[];
}

