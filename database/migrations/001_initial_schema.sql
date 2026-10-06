-- Digital Lab Manual Database Schema
-- PostgreSQL + Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Institutions table
CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  branding_settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects table
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  subject_code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  academic_year VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  roll_number VARCHAR(50),
  section VARCHAR(10),
  department VARCHAR(255) NOT NULL,
  designation VARCHAR(100),
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subject enrollments
CREATE TABLE subject_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  enrollment_status VARCHAR(20) DEFAULT 'active' CHECK (enrollment_status IN ('active', 'inactive', 'completed')),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subject_id)
);

-- Experiments table
CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  experiment_number INTEGER NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_minutes INTEGER,
  publication_status VARCHAR(20) DEFAULT 'draft' CHECK (publication_status IN ('draft', 'published', 'archived')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(subject_id, experiment_number)
);

-- Sub-experiments table
CREATE TABLE sub_experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  sub_experiment_number VARCHAR(10) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  aim TEXT,
  objectives TEXT[], -- Array of strings
  requirements TEXT[], -- Array of strings
  theory TEXT,
  prerequisites TEXT[], -- Array of strings
  syntax TEXT,
  algorithm TEXT[], -- Array of steps
  procedure TEXT[], -- Array of steps
  program TEXT,
  program_language VARCHAR(50) DEFAULT 'python',
  program_filename VARCHAR(255),
  expected_output TEXT,
  explanation TEXT,
  result TEXT,
  publication_status VARCHAR(20) DEFAULT 'draft' CHECK (publication_status IN ('draft', 'published', 'archived')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(experiment_id, sub_experiment_number)
);

-- Resources table
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  sub_experiment_id UUID REFERENCES sub_experiments(id) ON DELETE CASCADE,
  resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('youtube', 'github', 'documentation', 'dataset', 'notebook', 'file', 'reading')),
  title VARCHAR(500) NOT NULL,
  url TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (experiment_id IS NOT NULL OR sub_experiment_id IS NOT NULL)
);

-- Datasets table
CREATE TABLE datasets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  sub_experiment_id UUID REFERENCES sub_experiments(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  source_url TEXT,
  file_path TEXT,
  file_type VARCHAR(50),
  file_size INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (experiment_id IS NOT NULL OR sub_experiment_id IS NOT NULL)
);

-- Viva questions table
CREATE TABLE viva_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sub_experiment_id UUID REFERENCES sub_experiments(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lab cart items table
CREATE TABLE lab_cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, experiment_id)
);

-- Student progress table
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  sub_experiment_id UUID REFERENCES sub_experiments(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, sub_experiment_id)
);

-- Bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  sub_experiment_id UUID REFERENCES sub_experiments(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (experiment_id IS NOT NULL AND sub_experiment_id IS NULL AND resource_id IS NULL) OR
    (experiment_id IS NULL AND sub_experiment_id IS NOT NULL AND resource_id IS NULL) OR
    (experiment_id IS NULL AND sub_experiment_id IS NULL AND resource_id IS NOT NULL)
  )
);

-- Personal notes table
CREATE TABLE personal_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  sub_experiment_id UUID REFERENCES sub_experiments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (experiment_id IS NOT NULL OR sub_experiment_id IS NOT NULL)
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  destination_url TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_experiments_subject ON experiments(subject_id);
CREATE INDEX idx_experiments_status ON experiments(publication_status);
CREATE INDEX idx_sub_experiments_experiment ON sub_experiments(experiment_id);
CREATE INDEX idx_sub_experiments_status ON sub_experiments(publication_status);
CREATE INDEX idx_resources_experiment ON resources(experiment_id);
CREATE INDEX idx_resources_sub_experiment ON resources(sub_experiment_id);
CREATE INDEX idx_cart_user ON lab_cart_items(user_id);
CREATE INDEX idx_progress_user ON student_progress(user_id);
CREATE INDEX idx_progress_status ON student_progress(status);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_notes_user ON personal_notes(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, read_at) WHERE read_at IS NULL;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiments_updated_at BEFORE UPDATE ON experiments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sub_experiments_updated_at BEFORE UPDATE ON sub_experiments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON lab_cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON student_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON personal_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
