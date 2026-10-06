-- Learning Resources from CHO Document
-- Video Lectures and Web Resources

-- Add Web Resources
INSERT INTO resources (experiment_id, sub_experiment_id, resource_type, title, url, description, display_order)
VALUES
  -- Video Lectures
  (NULL, NULL, 'youtube', 'SWAYAM - Data Science Course', 
   'https://swayam.gov.in/nd1_noc19_cs60/preview',
   'Comprehensive Data Science video lecture series from SWAYAM platform.',
   1),
  (NULL, NULL, 'reading', 'Udemy - Full Data Science Course: From Zero to Hero', 
   'https://www.udemy.com/',
   'Complete Data Science course covering fundamental to advanced topics. Note: Specific course URL to be provided by instructor.',
   2),
  
  -- Web Resources
  (NULL, NULL, 'documentation', 'Towards Data Science', 
   'https://towardsdatascience.com/',
   'Premium data science publication platform with articles, tutorials, and best practices.',
   3),
  (NULL, NULL, 'documentation', 'W3Schools Data Science', 
   'https://www.w3schools.com/datascience/',
   'Comprehensive tutorials and references for data science concepts and Python programming.',
   4),
  (NULL, NULL, 'github', 'Python Data Science Handbook - GitHub', 
   'https://github.com/jakevdp/PythonDataScienceHandbook',
   'Jake VanderPlas''s comprehensive Python Data Science Handbook with Jupyter notebooks.',
   5),
  (NULL, NULL, 'documentation', 'Kaggle', 
   'https://www.kaggle.com',
   'Platform for data science competitions, datasets, and collaborative notebooks.',
   6);

-- Add GitHub API resource to Experiment 2A
DO $$
DECLARE
  v_exp2a_id UUID;
BEGIN
  -- Get the sub-experiment ID for 2A
  SELECT se.id INTO v_exp2a_id
  FROM sub_experiments se
  JOIN experiments e ON se.experiment_id = e.id
  JOIN subjects s ON e.subject_id = s.id
  WHERE s.subject_code = '22DS102006' 
    AND e.experiment_number = 2 
    AND se.sub_experiment_number = '2A';

  IF v_exp2a_id IS NOT NULL THEN
    INSERT INTO resources (experiment_id, sub_experiment_id, resource_type, title, url, description, display_order)
    VALUES
      (NULL, v_exp2a_id, 'github', 'GitHub API - Pandas Issues', 
       'https://api.github.com/repos/pandas-dev/pandas/issues',
       'GitHub API endpoint for extracting pandas repository issues.',
       1);
  END IF;
END $$;

-- Note: Additional experiment-specific resources, datasets, and GitHub links 
-- will be added as content is provided by faculty.
