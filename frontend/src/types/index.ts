export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthResponse {
    message: string;
    token: string;
    user: User;
  }
  
  export interface Application {
    id: string;
    company: string;
    role: string;
    salary?: string;
    status: 'applied' | 'interview' | 'offer' | 'rejected';
    appliedDate: string;
    createdAt: string;
    userId: string;
    notes: Note[];
  }
  
  export interface Note {
    id: string;
    content: string;
    createdAt: string;
    applicationId: string;
  }