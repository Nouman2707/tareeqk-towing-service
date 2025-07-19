export interface TowingRequest {
  id?: number;
  customer_name: string;
  location: string;
  note?: string;
  status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  error?: string;
}

export interface FormErrors {
  customer_name?: string;
  location?: string;
  note?: string;
}