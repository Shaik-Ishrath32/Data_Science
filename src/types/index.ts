// Core domain types for the Digital Lab Manual application

export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  auth_user_id: string;
  full_name: string;
  roll_number?: string;
  section?: string;
  department: string;
  designation?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Institution {
  id: string;
  name: string;
  logo_url?: string;
  branding_settings?: Record<string, any>;
  created_at: string;
}

export interface Subject {
  id: string;
  institution_id: string;
  name: string;
  subject_code: string;
  description?: string;
  academic_year?: string;
  created_at: string;
}

export interface Experiment {
  id: string;
  subject_id: string;
  experiment_number: number;
  title: string;
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimated_minutes?: number;
  publication_status: 'draft' | 'published' | 'archived';
  display_order: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  sub_experiments_count?: number;
  completion_percentage?: number;
  technologies?: string[];
}

export interface SubExperiment {
  id: string;
  experiment_id: string;
  sub_experiment_number: string;
  title: string;
  description?: string;
  aim?: string;
  objectives?: string[];
  requirements?: string[];
  theory?: string;
  prerequisites?: string[];
  syntax?: string;
  algorithm?: string[];
  procedure?: string[];
  program?: string;
  program_language?: string;
  program_filename?: string;
  expected_output?: string;
  explanation?: string;
  result?: string;
  publication_status: 'draft' | 'published' | 'archived';
  display_order: number;
  created_at: string;
  updated_at: string;
  is_completed?: boolean;
}

export type ResourceType = 
  | 'youtube' 
  | 'github' 
  | 'documentation' 
  | 'dataset' 
  | 'notebook' 
  | 'file' 
  | 'reading';

export interface Resource {
  id: string;
  experiment_id?: string;
  sub_experiment_id?: string;
  resource_type: ResourceType;
  title: string;
  url?: string;
  description?: string;
  display_order: number;
  created_at: string;
}

export interface Dataset {
  id: string;
  experiment_id?: string;
  sub_experiment_id?: string;
  name: string;
  source_url?: string;
  file_path?: string;
  file_type?: string;
  file_size?: number;
  description?: string;
  created_at: string;
}

export interface VivaQuestion {
  id: string;
  sub_experiment_id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
}

export interface LabCartItem {
  id: string;
  user_id: string;
  experiment_id: string;
  quantity: number;
  created_at: string;
  experiment?: Experiment;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface StudentProgress {
  id: string;
  user_id: string;
  sub_experiment_id: string;
  status: ProgressStatus;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  experiment_id?: string;
  sub_experiment_id?: string;
  resource_id?: string;
  created_at: string;
}

export interface PersonalNote {
  id: string;
  user_id: string;
  experiment_id?: string;
  sub_experiment_id?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  destination_url?: string;
  read_at?: string;
  created_at: string;
}

// View models for UI components
export interface DashboardStats {
  total_experiments: number;
  completed_experiments: number;
  in_progress_experiments: number;
  total_sub_experiments: number;
  completed_sub_experiments: number;
  cart_items_count: number;
  bookmarks_count: number;
  completion_percentage: number;
}

export interface SearchResult {
  type: 'experiment' | 'sub_experiment' | 'resource';
  id: string;
  title: string;
  description?: string;
  experiment_number?: number;
  sub_experiment_number?: string;
  url: string;
  highlight?: string;
}

export interface RecentActivity {
  id: string;
  type: 'viewed' | 'completed' | 'bookmarked' | 'added_to_cart';
  title: string;
  description?: string;
  url: string;
  timestamp: string;
}

// Theme
export type Theme = 'light' | 'dark';

// Filter and sort options
export interface ExperimentFilters {
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  completion?: 'all' | 'completed' | 'in_progress' | 'not_started';
  search?: string;
}

export type SortOption = 'number_asc' | 'number_desc' | 'title_asc' | 'title_desc' | 'recent';
