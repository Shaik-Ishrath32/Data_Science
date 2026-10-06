import { motion } from 'framer-motion';
import { BookOpen, Target, Users, Clock, GraduationCap, Award } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import {
  COURSE_INFO,
  COURSE_MODULES,
  COURSE_OUTCOMES,
  type CourseModule,
  type CourseOutcome,
} from '../types/courseTypes';

export default function CourseOverviewPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-50 mb-2">
          Course Overview
        </h1>
        <p className="text-dark-400">
          Complete information about {COURSE_INFO.course_title}
        </p>
      </div>

      {/* Course Information Card */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary-600/10 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-dark-50 mb-1">
              {COURSE_INFO.course_title}
            </h2>
            <p className="text-primary-400 font-semibold">
              {COURSE_INFO.course_code}
            </p>
          </div>
          <Badge variant="info">{COURSE_INFO.year_semester}</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-dark-700 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-4 w-4 text-dark-300" />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide mb-1">
                  Institution
                </p>
                <p className="text-dark-50 font-medium">
                  {COURSE_INFO.institution}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-dark-700 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-4 w-4 text-dark-300" />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide mb-1">
                  School & Department
                </p>
                <p className="text-dark-50 font-medium">
                  {COURSE_INFO.school}
                </p>
                <p className="text-dark-300 text-sm">{COURSE_INFO.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-dark-700 flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-dark-300" />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide mb-1">
                  Instructor
                </p>
                <p className="text-dark-50 font-medium">
                  {COURSE_INFO.instructor}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-dark-700 flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-dark-300" />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide mb-1">
                  Contact Hours
                </p>
                <p className="text-dark-50 font-medium">
                  {COURSE_INFO.contact_hours} hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-dark-700 flex items-center justify-center flex-shrink-0">
                <Award className="h-4 w-4 text-dark-300" />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide mb-1">
                  Academic Year
                </p>
                <p className="text-dark-50 font-medium">
                  {COURSE_INFO.academic_year}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-dark-700 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-4 w-4 text-dark-300" />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide mb-1">
                  Prerequisite
                </p>
                <p className="text-dark-50 font-medium">
                  {COURSE_INFO.prerequisite}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Course Outcomes */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-success" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark-50">Course Outcomes</h2>
            <p className="text-sm text-dark-400">
              Expected learning outcomes upon course completion
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {COURSE_OUTCOMES.map((outcome: CourseOutcome, index) => (
            <motion.div
              key={outcome.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-success font-bold text-lg">
                      CO{outcome.outcome_number}
                    </span>
                  </div>
                  <p className="text-dark-200 leading-relaxed flex-1">
                    {outcome.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Course Modules */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark-50">Course Modules</h2>
            <p className="text-sm text-dark-400">
              Comprehensive curriculum structure
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {COURSE_MODULES.map((module: CourseModule, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-600/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 font-bold text-lg">
                      {module.module_number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark-50 mb-2">
                      MODULE {module.module_number}: {module.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <Badge
                          key={topicIndex}
                          variant="default"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
