import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Video, Globe } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import {
  VIDEO_LECTURES,
  WEB_RESOURCES,
  TEXTBOOKS,
  REFERENCE_BOOKS,
  type VideoLecture,
  type WebResource,
  type Textbook,
} from '../types/courseTypes';

export default function ResourcesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-50 mb-2">
          Learning Resources
        </h1>
        <p className="text-dark-400">
          Additional learning materials from the Course Hand Out
        </p>
      </div>

      {/* Video Lectures Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
            <Video className="h-5 w-5 text-error" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark-50">Video Lectures</h2>
            <p className="text-sm text-dark-400">
              Comprehensive video courses and tutorials
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {VIDEO_LECTURES.map((video: VideoLecture, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <Badge
                    variant="error"
                    className="uppercase text-xs font-semibold"
                  >
                    {video.platform}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-dark-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-50 mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-dark-400 mb-4 line-clamp-3">
                  {video.description}
                </p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Open Course
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Web Resources Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center">
            <Globe className="h-5 w-5 text-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark-50">Web Resources</h2>
            <p className="text-sm text-dark-400">
              Online platforms, tutorials, and documentation
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {WEB_RESOURCES.map((resource: WebResource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card hover className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary-400" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-dark-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-50 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-dark-400 mb-4 line-clamp-3">
                  {resource.description}
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Textbooks Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-success" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark-50">Textbooks</h2>
            <p className="text-sm text-dark-400">
              Prescribed textbooks for the course
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {TEXTBOOKS.map((book: Textbook, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-16 rounded bg-success/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark-50 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-dark-300 mb-2">
                      {book.authors.join(', ')}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-dark-400">
                      <span>{book.publisher}</span>
                      {book.edition && <span>•</span>}
                      {book.edition && <span>{book.edition}</span>}
                      {book.year && <span>•</span>}
                      {book.year && <span>{book.year}</span>}
                    </div>
                  </div>
                  <Badge variant="success">Textbook</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reference Books Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark-50">Reference Books</h2>
            <p className="text-sm text-dark-400">
              Additional reference materials for deeper understanding
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {REFERENCE_BOOKS.map((book: Textbook, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-16 rounded bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark-50 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-dark-300 mb-2">
                      {book.authors.join(', ')}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-dark-400">
                      <span>{book.publisher}</span>
                      {book.edition && <span>•</span>}
                      {book.edition && <span>{book.edition}</span>}
                      {book.year && <span>•</span>}
                      {book.year && <span>{book.year}</span>}
                    </div>
                  </div>
                  <Badge variant="warning">Reference</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
