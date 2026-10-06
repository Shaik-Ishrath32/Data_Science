// Course-specific types for CHO data

export interface CourseInfo {
  institution: string;
  school: string;
  department: string;
  course_code: string;
  course_title: string;
  year_semester: string;
  contact_hours: number;
  instructor: string;
  academic_year: string;
  prerequisite: string;
}

export interface CourseModule {
  id: string;
  module_number: number;
  title: string;
  topics: string[];
  description?: string;
  display_order: number;
}

export interface CourseOutcome {
  id: string;
  outcome_number: number;
  description: string;
  display_order: number;
}

export interface Textbook {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  edition?: string;
  year?: number;
  type: 'textbook' | 'reference';
  display_order: number;
}

export interface VideoLecture {
  id: string;
  title: string;
  platform: 'swayam' | 'udemy' | 'youtube' | 'other';
  url: string;
  description?: string;
  duration?: string;
  display_order: number;
}

export interface WebResource {
  id: string;
  title: string;
  url: string;
  description?: string;
  type: 'documentation' | 'tutorial' | 'repository' | 'platform';
  display_order: number;
}

// CHO Course Outcomes (6 total)
export const COURSE_OUTCOMES: CourseOutcome[] = [
  {
    id: 'co1',
    outcome_number: 1,
    description: 'Demonstrate knowledge on the concepts of data science to perform data analysis.',
    display_order: 1,
  },
  {
    id: 'co2',
    outcome_number: 2,
    description: 'Develop methods to extract meaning from data using feature selection techniques.',
    display_order: 2,
  },
  {
    id: 'co3',
    outcome_number: 3,
    description: 'Create data visualization using charts, plots and histograms to identify trends, patterns and outliers in data using Matplotlib and Seaborn.',
    display_order: 3,
  },
  {
    id: 'co4',
    outcome_number: 4,
    description: 'Develop distribution functions to analyze and interpret data to extract meaningful statistics.',
    display_order: 4,
  },
  {
    id: 'co5',
    outcome_number: 5,
    description: 'Design and develop predictive models for a given problem to support prediction and forecasting.',
    display_order: 5,
  },
  {
    id: 'co6',
    outcome_number: 6,
    description: 'Work independently or in team to solve data science related problems with effective communication.',
    display_order: 6,
  },
];

// CHO Course Modules (5 total)
export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'module1',
    module_number: 1,
    title: 'INTRODUCTION',
    topics: [
      'Definition of Data Science',
      'Skills for Data Science',
      'Tools for Data Science',
      'Data Types',
      'Data Collections',
      'Data Preprocessing',
      'Data Analysis and Data Analytics',
      'Descriptive Analysis',
      'Diagnostic Analytics',
      'Predictive Analytics',
      'Prescriptive Analytics',
      'Exploratory Analysis',
      'Mechanistic Analysis',
    ],
    display_order: 1,
  },
  {
    id: 'module2',
    module_number: 2,
    title: 'DATA EXTRACTION',
    topics: [
      'Feature Selection',
      'User Retention',
      'Filters',
      'Wrappers',
      'Entropy',
      'Decision Tree Algorithm',
      'Random Forests',
      'The Dimensionality Problem',
      'Singular Value Decomposition',
      'Principal Component Analysis',
    ],
    display_order: 2,
  },
  {
    id: 'module3',
    module_number: 3,
    title: 'DATA VISUALIZATION',
    topics: [
      'Matplotlib API Primer',
      'Plotting with Pandas and Seaborn',
      'Line Plots',
      'Bar Plots',
      'Histograms',
      'Density Plots',
      'Scatter Plots',
      'Facet Grids',
      'Categorical Data',
      'Other Python Visualization Tools',
    ],
    display_order: 3,
  },
  {
    id: 'module4',
    module_number: 4,
    title: 'STATISTICAL THINKING',
    topics: [
      'Distributions',
      'Histograms',
      'Outliers',
      'Summarizing Distributions',
      'Variance',
      'Reporting Results',
      'Probability Mass Function',
      'PMF Visualization',
      'Class Size Paradox',
      'DataFrame Indexing',
      'Cumulative Distribution Functions',
      'Percentile Statistics',
      'Random Numbers',
      'Percentile Ranks',
      'Exponential Distribution',
      'Normal Distribution',
      'Lognormal Distribution',
    ],
    display_order: 4,
  },
  {
    id: 'module5',
    module_number: 5,
    title: 'TIME SERIES ANALYSIS AND PREDICTIVE MODELING',
    topics: [
      'Importing and Cleaning',
      'Plotting',
      'Moving Averages',
      'Missing Values',
      'Serial Correlation',
      'Autocorrelation',
      'Predictive Modeling Overview',
      'Evaluating Predictive Models',
      'Building Predictive Model Solutions',
      'Sentiment Analysis',
    ],
    display_order: 5,
  },
];

// CHO Textbooks
export const TEXTBOOKS: Textbook[] = [
  {
    id: 'tb1',
    title: 'A Hands-on Introduction to Data Science',
    authors: ['Chirag Shah'],
    publisher: 'Cambridge University Press',
    year: 2020,
    type: 'textbook',
    display_order: 1,
  },
  {
    id: 'tb2',
    title: 'Think Stats: Exploratory Data Analysis',
    authors: ['Alen B. Downey'],
    publisher: "O'Reilly",
    edition: '2nd Edition',
    year: 2014,
    type: 'textbook',
    display_order: 2,
  },
];

// CHO Reference Books
export const REFERENCE_BOOKS: Textbook[] = [
  {
    id: 'ref1',
    title: 'Python for Data Analysis',
    authors: ['Wes McKinney'],
    publisher: "O'Reilly",
    edition: '2nd Edition',
    year: 2017,
    type: 'reference',
    display_order: 1,
  },
  {
    id: 'ref2',
    title: 'Practical Data Science with Hadoop and Spark',
    authors: ['Ofer Mendelevitch', 'Casey Stella', 'Douglas Eadline'],
    publisher: 'Addison Wesley',
    year: 2017,
    type: 'reference',
    display_order: 2,
  },
  {
    id: 'ref3',
    title: 'Doing Data Science: Straight Talk from the Frontline',
    authors: ['Rachel Schutt', "Cathy O'Neil"],
    publisher: "O'Reilly",
    year: 2014,
    type: 'reference',
    display_order: 3,
  },
  {
    id: 'ref4',
    title: 'Python Data Science Handbook',
    authors: ['Jake VanderPlas'],
    publisher: "O'Reilly",
    year: 2017,
    type: 'reference',
    display_order: 4,
  },
];

// CHO Video Lectures
export const VIDEO_LECTURES: VideoLecture[] = [
  {
    id: 'vid1',
    title: 'Data Science Course',
    platform: 'swayam',
    url: 'https://swayam.gov.in/nd1_noc19_cs60/preview',
    description: 'Comprehensive Data Science video lecture series from SWAYAM platform.',
    display_order: 1,
  },
  {
    id: 'vid2',
    title: 'Full Data Science Course: From Zero to Hero',
    platform: 'udemy',
    url: 'https://www.udemy.com/',
    description: 'Complete Data Science course covering fundamental to advanced topics. Note: Specific course URL to be provided by instructor.',
    display_order: 2,
  },
];

// CHO Web Resources
export const WEB_RESOURCES: WebResource[] = [
  {
    id: 'web1',
    title: 'Towards Data Science',
    url: 'https://towardsdatascience.com/',
    description: 'Premium data science publication platform with articles, tutorials, and best practices.',
    type: 'platform',
    display_order: 1,
  },
  {
    id: 'web2',
    title: 'W3Schools Data Science',
    url: 'https://www.w3schools.com/datascience/',
    description: 'Comprehensive tutorials and references for data science concepts and Python programming.',
    type: 'tutorial',
    display_order: 2,
  },
  {
    id: 'web3',
    title: 'Python Data Science Handbook - GitHub',
    url: 'https://github.com/jakevdp/PythonDataScienceHandbook',
    description: "Jake VanderPlas's comprehensive Python Data Science Handbook with Jupyter notebooks.",
    type: 'repository',
    display_order: 3,
  },
  {
    id: 'web4',
    title: 'Kaggle',
    url: 'https://www.kaggle.com',
    description: 'Platform for data science competitions, datasets, and collaborative notebooks.',
    type: 'platform',
    display_order: 4,
  },
];

// Course Information from CHO
export const COURSE_INFO: CourseInfo = {
  institution: 'Mohan Babu University',
  school: 'School of Computing',
  department: 'Data Science',
  course_code: '22DS102006',
  course_title: 'DATA SCIENCE',
  year_semester: 'III Year II Semester',
  contact_hours: 45,
  instructor: 'S. Bosubabu',
  academic_year: '2025-2026',
  prerequisite: 'Python Programming',
};
