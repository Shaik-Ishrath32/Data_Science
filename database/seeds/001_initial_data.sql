-- Seed data for Digital Lab Manual

-- Insert institution
INSERT INTO institutions (id, name, logo_url) VALUES
('00000000-0000-0000-0000-000000000001', 'Mohan Babu University', NULL);

-- Insert subject
INSERT INTO subjects (id, institution_id, name, subject_code, description, academic_year) VALUES
('00000000-0000-0000-0000-000000000002', 
 '00000000-0000-0000-0000-000000000001',
 'Data Science', 
 '22DS102006', 
 'Comprehensive Data Science laboratory covering essential Python libraries, data analysis, machine learning, and visualization techniques.',
 '2024-2028');

-- Note: User creation will be handled through Supabase Auth
-- Sample users will need to be created through the application's sign-up flow
-- Then their profiles can be updated with the following pattern:

-- Example user profile update (to be done after auth signup):
-- INSERT INTO users (auth_user_id, full_name, roll_number, section, department, role) VALUES
-- ('<auth-user-id>', 'Shaik Ishrath', 'ROLL_NUMBER', 'Section A', 'Computer Science and Engineering (Data Science)', 'student');

-- Faculty user example:
-- INSERT INTO users (auth_user_id, full_name, department, designation, role) VALUES
-- ('<faculty-auth-id>', 'Dr. Faculty Name', 'Computer Science and Engineering', 'Assistant Professor', 'faculty');
