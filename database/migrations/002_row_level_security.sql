-- Enable Row Level Security on all tables
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE viva_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS VARCHAR AS $$
  SELECT role FROM users WHERE auth_user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user is faculty
CREATE OR REPLACE FUNCTION is_faculty_or_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role IN ('faculty', 'admin')
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Institutions policies
CREATE POLICY "Public read access to institutions"
  ON institutions FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage institutions"
  ON institutions FOR ALL
  USING (is_admin());

-- Subjects policies
CREATE POLICY "Public read access to subjects"
  ON subjects FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage subjects"
  ON subjects FOR ALL
  USING (is_admin());

-- Users policies
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth_user_id = auth.uid() OR is_faculty_or_admin());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "Admin can manage all users"
  ON users FOR ALL
  USING (is_admin());

-- Subject enrollments policies
CREATE POLICY "Users can read own enrollments"
  ON subject_enrollments FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR is_faculty_or_admin());

CREATE POLICY "Admin can manage enrollments"
  ON subject_enrollments FOR ALL
  USING (is_admin());

-- Experiments policies
CREATE POLICY "Users can read published experiments"
  ON experiments FOR SELECT
  USING (publication_status = 'published' OR is_faculty_or_admin());

CREATE POLICY "Faculty can create experiments"
  ON experiments FOR INSERT
  WITH CHECK (is_faculty_or_admin());

CREATE POLICY "Faculty can update own experiments"
  ON experiments FOR UPDATE
  USING (created_by IN (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR is_admin())
  WITH CHECK (created_by IN (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR is_admin());

CREATE POLICY "Admin can delete experiments"
  ON experiments FOR DELETE
  USING (is_admin());

-- Sub-experiments policies
CREATE POLICY "Users can read published sub-experiments"
  ON sub_experiments FOR SELECT
  USING (
    publication_status = 'published' OR 
    is_faculty_or_admin() OR
    experiment_id IN (
      SELECT id FROM experiments 
      WHERE created_by IN (SELECT id FROM users WHERE auth_user_id = auth.uid())
    )
  );

CREATE POLICY "Faculty can create sub-experiments"
  ON sub_experiments FOR INSERT
  WITH CHECK (is_faculty_or_admin());

CREATE POLICY "Faculty can update sub-experiments"
  ON sub_experiments FOR UPDATE
  USING (
    is_admin() OR
    experiment_id IN (
      SELECT id FROM experiments 
      WHERE created_by IN (SELECT id FROM users WHERE auth_user_id = auth.uid())
    )
  );

CREATE POLICY "Admin can delete sub-experiments"
  ON sub_experiments FOR DELETE
  USING (is_admin());

-- Resources policies
CREATE POLICY "Users can read resources for published content"
  ON resources FOR SELECT
  USING (true);

CREATE POLICY "Faculty can manage resources"
  ON resources FOR ALL
  USING (is_faculty_or_admin());

-- Datasets policies
CREATE POLICY "Users can read datasets"
  ON datasets FOR SELECT
  USING (true);

CREATE POLICY "Faculty can manage datasets"
  ON datasets FOR ALL
  USING (is_faculty_or_admin());

-- Viva questions policies
CREATE POLICY "Users can read viva questions"
  ON viva_questions FOR SELECT
  USING (true);

CREATE POLICY "Faculty can manage viva questions"
  ON viva_questions FOR ALL
  USING (is_faculty_or_admin());

-- Lab cart policies
CREATE POLICY "Users can read own cart"
  ON lab_cart_items FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can manage own cart"
  ON lab_cart_items FOR ALL
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()))
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Student progress policies
CREATE POLICY "Users can read own progress"
  ON student_progress FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR is_faculty_or_admin());

CREATE POLICY "Users can manage own progress"
  ON student_progress FOR ALL
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()))
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Bookmarks policies
CREATE POLICY "Users can read own bookmarks"
  ON bookmarks FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can manage own bookmarks"
  ON bookmarks FOR ALL
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()))
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Personal notes policies
CREATE POLICY "Users can read own notes"
  ON personal_notes FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can manage own notes"
  ON personal_notes FOR ALL
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()))
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()))
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Faculty can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (is_faculty_or_admin());

CREATE POLICY "Admin can delete notifications"
  ON notifications FOR DELETE
  USING (is_admin());
