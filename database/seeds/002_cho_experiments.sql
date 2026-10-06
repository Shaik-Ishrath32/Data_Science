-- Data Science Course Experiments from CHO Document
-- Mohan Babu University - Course Code: 22DS102006
-- Instructor: S. Bosubabu
-- Academic Year: 2025-2026

-- Get the subject ID
DO $$
DECLARE
  v_subject_id UUID;
  v_exp1_id UUID;
  v_exp2_id UUID;
  v_exp3_id UUID;
  v_exp4_id UUID;
  v_exp5_id UUID;
  v_exp6_id UUID;
  v_exp7_id UUID;
  v_exp8_id UUID;
  v_exp9_id UUID;
  v_exp10_id UUID;
BEGIN
  -- Get subject ID
  SELECT id INTO v_subject_id FROM subjects WHERE subject_code = '22DS102006';

  -- EXPERIMENT 1: Working with Different Data Formats using Pandas
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    1,
    'Working with Different Data Formats using Pandas',
    'Learn to read and write data in various formats including CSV, JSON, and Excel using Pandas library.',
    'published',
    1
  ) RETURNING id INTO v_exp1_id;

  -- Sub-experiments for Experiment 1
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp1_id, '1A', 'Reading and Writing CSV Data', 
     'Perform reading and writing data in text format using read_csv and read_table with an online dataset in delimited CSV format.',
     'To understand and implement CSV data handling operations using Pandas.',
     'published', 1),
    (v_exp1_id, '1B', 'Working with JSON Format', 
     'Perform reading, writing and parsing data in JSON format using read_json.',
     'To master JSON data manipulation using Pandas read_json method.',
     'published', 2),
    (v_exp1_id, '1C', 'Microsoft Excel File Operations', 
     'Perform reading and writing Microsoft Excel files using read_excel.',
     'To handle Excel file formats for data import and export operations.',
     'published', 3);

  -- EXPERIMENT 2: Interacting with Web APIs and Databases
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    2,
    'Interacting with Web APIs and Databases',
    'Extract data from web APIs and interact with relational databases using Python.',
    'published',
    2
  ) RETURNING id INTO v_exp2_id;

  -- Sub-experiments for Experiment 2
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp2_id, '2A', 'GitHub API Data Extraction', 
     'Predict/extract the last 30 GitHub issues for pandas using the request and response object''s JSON method. Move the extracted data into a DataFrame and extract fields of interest.',
     'To extract and process data from GitHub API.',
     'published', 1),
    (v_exp2_id, '2B', 'Relational Database Operations', 
     'Connect to a relational database using SQL driver and perform table creation, data population, selection, DataFrame conversion, updates, and deletions.',
     'To understand database connectivity and perform CRUD operations.',
     'published', 2);

  -- EXPERIMENT 3: Data Cleaning and Preparation
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    3,
    'Data Cleaning and Preparation',
    'Master techniques for handling missing data, data transformation, outlier detection, and text manipulation.',
    'published',
    3
  ) RETURNING id INTO v_exp3_id;

  -- Sub-experiments for Experiment 3
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp3_id, '3A', 'Handling Missing Data', 
     'Create a DataFrame and identify missing data using NA handling, dropna(), fillna(), duplicated(), and drop_duplicates().',
     'To master missing data identification and handling techniques.',
     'published', 1),
    (v_exp3_id, '3B', 'Data Transformation', 
     'Perform transformation using map(), replace(), and rename(). Create transformed version without modifying original dataset.',
     'To learn data transformation methods while preserving original data.',
     'published', 2),
    (v_exp3_id, '3C', 'Outlier Detection', 
     'Create a DataFrame with normally distributed data using random sampling and detect possible outliers.',
     'To identify and handle outliers in datasets.',
     'published', 3),
    (v_exp3_id, '3D', 'Text Manipulation with Regular Expressions', 
     'Use regular expressions to split strings containing variable whitespace, handle tabs, spaces, newlines, and extract matching patterns.',
     'To master text manipulation using regular expressions.',
     'published', 4);

  -- EXPERIMENT 4: Data Wrangling
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    4,
    'Data Wrangling',
    'Perform advanced data manipulation using hierarchical indexing, stacking/unstacking, and merging operations.',
    'published',
    4
  ) RETURNING id INTO v_exp4_id;

  -- Sub-experiments for Experiment 4
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp4_id, '4A', 'Hierarchical Indexing', 
     'Create a Series using list of lists/arrays as index. Perform hierarchical indexing, selection at outer level, inner level, and partial indexing.',
     'To understand and implement hierarchical indexing in Pandas.',
     'published', 1),
    (v_exp4_id, '4B', 'Stack and Unstack Operations', 
     'Rearrange tabular data with hierarchical indexing using unstack() and stack() methods.',
     'To master data restructuring using stack and unstack operations.',
     'published', 2),
    (v_exp4_id, '4C', 'DataFrame Merge and combine_first', 
     'Create two DataFrames, merge them using index as merge key, and combine overlapping data using combine_first().',
     'To learn DataFrame merging and data combination techniques.',
     'published', 3);

  -- EXPERIMENT 5: Data Visualization with Matplotlib and Seaborn
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    5,
    'Data Visualization with Matplotlib and Seaborn',
    'Create comprehensive visualizations including line plots, bar charts, histograms, scatter plots, and box plots using online datasets.',
    'published',
    5
  ) RETURNING id INTO v_exp5_id;

  -- Sub-experiments for Experiment 5
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp5_id, '5A', 'Line Plot with Annotations', 
     'Create Line Plot with title, axis labels, ticks, tick labels, annotations, subplots, and save plot to file.',
     'To master line plot creation with comprehensive customization.',
     'published', 1),
    (v_exp5_id, '5B', 'Bar Plots - Grouped and Stacked', 
     'Create Bar Plots using Series and DataFrame index. Create grouped bar plot (5B-i) where values display side-by-side and stacked bar plot (5B-ii) from DataFrame.',
     'To visualize categorical data using grouped and stacked bar charts.',
     'published', 2),
    (v_exp5_id, '5C', 'Histogram and Density Plot', 
     'Create histogram to display value frequency and density plot to generate continuous probability distribution representation.',
     'To understand data distribution through histograms and density plots.',
     'published', 3),
    (v_exp5_id, '5D', 'Scatter Plot Analysis', 
     'Create scatter plot and examine relationship between two one-dimensional data series.',
     'To analyze correlations and relationships using scatter plots.',
     'published', 4),
    (v_exp5_id, '5E', 'Box Plot for Categorical Data', 
     'Create box plots to visualize data with many categorical variables.',
     'To visualize data distribution and outliers using box plots.',
     'published', 5);

  -- EXPERIMENT 6: Time Series Analysis
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    6,
    'Time Series Analysis',
    'Master time series operations including datetime handling, timezone conversions, period arithmetic, and resampling techniques.',
    'published',
    6
  ) RETURNING id INTO v_exp6_id;

  -- Sub-experiments for Experiment 6
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp6_id, '6A', 'Creating Time Series with Datetime', 
     'Create time series using pandas datetime object indexed by timestamps.',
     'To understand time series creation using datetime objects.',
     'published', 1),
    (v_exp6_id, '6B', 'Using pandas.date_range', 
     'Use pandas.date_range to generate DateTimeIndex with indicated length.',
     'To generate date ranges programmatically.',
     'published', 2),
    (v_exp6_id, '6C', 'Timezone Operations', 
     'Generate date ranges by setting timezone, localizing timezone, converting using tz_convert(), and combining different timezones.',
     'To master timezone handling in time series data.',
     'published', 3),
    (v_exp6_id, '6D', 'Period Arithmetic', 
     'Perform period arithmetic by adding/subtracting integers and constructing ranges using period_range().',
     'To perform arithmetic operations on period objects.',
     'published', 4),
    (v_exp6_id, '6E', 'Frequency Conversion with asfreq', 
     'Convert Period and PeriodIndex objects to another frequency using asfreq().',
     'To convert between different time frequencies.',
     'published', 5),
    (v_exp6_id, '6F', 'Converting Timestamps to Periods', 
     'Convert Series and DataFrame objects indexed by timestamps to periods using to_period().',
     'To transform timestamp-based data to period-based data.',
     'published', 6),
    (v_exp6_id, '6G', 'Resampling Operations', 
     'Perform resampling, downsampling, and upsampling on time series data.',
     'To master temporal data aggregation and interpolation.',
     'published', 7);

  -- EXPERIMENT 7: Data Aggregation
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    7,
    'Data Aggregation',
    'Master data grouping, aggregation, and exploratory data analysis using groupby operations on online datasets.',
    'published',
    7
  ) RETURNING id INTO v_exp7_id;

  -- Sub-experiments for Experiment 7
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp7_id, '7A', 'Grouping Data with groupby', 
     'Create tabular dataset as DataFrame. Use groupby() with single key, multiple keys, single column, and multiple columns.',
     'To master data grouping using various key combinations.',
     'published', 1),
    (v_exp7_id, '7B', 'Computing Summary Statistics', 
     'Compute sum, mean, and standard deviation using aggregate method for grouped data.',
     'To calculate statistical summaries on grouped data.',
     'published', 2),
    (v_exp7_id, '7C', 'Exploratory Data Analysis with groupby', 
     'Use groupby() to split data, group by one/multiple columns, compute summary statistics, and perform EDA using online dataset.',
     'To conduct comprehensive exploratory data analysis.',
     'published', 3);

  -- EXPERIMENT 8: Web Scraping using Beautiful Soup
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    8,
    'Web Scraping using Beautiful Soup',
    'Extract product reviews, perform EDA, generate WordClouds, analyze text statistics, and conduct sentiment analysis using NLTK and VADER.',
    'published',
    8
  ) RETURNING id INTO v_exp8_id;

  -- Sub-experiments for Experiment 8
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp8_id, '8A', 'Product Review Extraction', 
     'Extract product reviews from Amazon and save to file. EDUCATIONAL EXAMPLE - respects website terms of service.',
     'To learn web scraping techniques for data collection.',
     'published', 1),
    (v_exp8_id, '8B', 'Exploratory Data Analysis on Reviews', 
     'Perform EDA including WordCloud (all/positive/negative reviews) and text statistics (stopwords, numerics, word count, character count, average word length distributions).',
     'To analyze extracted text data comprehensively.',
     'published', 2),
    (v_exp8_id, '8B-i', 'WordCloud Generation', 
     'Generate WordCloud for all reviews, positive reviews, and negative reviews.',
     'To visualize word frequency in review datasets.',
     'published', 3),
    (v_exp8_id, '8B-ii', 'Text Statistics and Sentiment Analysis', 
     'Plot distributions and display sentiment values using NLTK and VADER. Create Scatter Intensity Plot of sentiments.',
     'To quantify and visualize sentiment in text data.',
     'published', 4);

  -- EXPERIMENT 9: Case Study 3 - Customer Personality Analysis
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    9,
    'Case Study 3: Customer Personality Analysis',
    'Analyze company''s ideal customers and understand customer segments to modify products according to different customer needs, behaviours and concerns. Determine which segment is most likely to buy products for targeted marketing.',
    'published',
    9
  ) RETURNING id INTO v_exp9_id;

  -- Single comprehensive case study
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp9_id, '9', 'Customer Personality Analysis Case Study', 
     'Complete case study analyzing customer personality to segment customers and identify ideal targets for product marketing.',
     'To apply data science techniques to real-world customer analysis problems.',
     'published', 1);

  -- EXPERIMENT 10: Case Study 1 - Text Emotions Detection
  INSERT INTO experiments (id, subject_id, experiment_number, title, description, publication_status, display_order)
  VALUES (
    uuid_generate_v4(),
    v_subject_id,
    10,
    'Case Study 1: Text Emotions Detection',
    'Detect emotions from text as content-based classification problem. Applications include chatbots, customer support forums, and customer reviews. Train ML model to identify emotion and present relevant emoji.',
    'published',
    10
  ) RETURNING id INTO v_exp10_id;

  -- Single comprehensive case study
  INSERT INTO sub_experiments (experiment_id, sub_experiment_number, title, description, aim, publication_status, display_order)
  VALUES
    (v_exp10_id, '10', 'Text Emotions Detection Case Study', 
     'Train machine learning model to detect emotions from text input and display appropriate emoji representation.',
     'To build emotion detection system using text classification.',
     'published', 1);

END $$;
