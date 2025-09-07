export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience: Experience[];
}

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface ApiError {
  code: number;
  message: string;
}