/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_INSTITUTION_NAME: string;
  readonly VITE_SCHOOL_NAME: string;
  readonly VITE_DEPARTMENT: string;
  readonly VITE_SUBJECT_CODE: string;
  readonly VITE_SUBJECT_NAME: string;
  readonly VITE_YEAR_SEMESTER: string;
  readonly VITE_CONTACT_HOURS: string;
  readonly VITE_INSTRUCTOR_NAME: string;
  readonly VITE_ACADEMIC_YEAR: string;
  readonly VITE_PREREQUISITE: string;
  readonly VITE_BATCH: string;
  readonly VITE_ENABLE_CODE_EXECUTION: string;
  readonly VITE_ENABLE_PDF_EXPORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
