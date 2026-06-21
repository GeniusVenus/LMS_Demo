'use client';

import { useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMPORTANT_COURSES, type LearningCourse } from '@/constants/learning';
import { useAppStore } from '@/store/app-store';
import LearningCourseCard from './LearningCourseCard';
import CourseDetailModal from './CourseDetailModal';

const MB_BLUE = 'rgb(20, 30, 210)';
const BTN_COLOR = 'rgb(0, 100, 217)';

export default function ImportantLearningSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<LearningCourse | null>(null);
  const commitmentDone = useAppStore((s) => s.commitmentDone);

  const effectiveCourses = useMemo(
    () =>
      IMPORTANT_COURSES
        .filter((c) => !(c.id === 'camket' && commitmentDone))
        .map((c) =>
          c.id === '1' && commitmentDone ? { ...c, status: 'prereq-met' as const } : c,
        ),
    [commitmentDone],
  );

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: -(el.clientWidth + 12), behavior: 'smooth' });
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth + 12, behavior: 'smooth' });
  };

  return (
    <>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold" style={{ color: MB_BLUE, fontSize: '20px' }}>
            Học tập quan trọng
          </h3>
          <button className="cursor-pointer text-sm font-medium hover:underline" style={{ color: BTN_COLOR }}>
            Xem tất cả ({IMPORTANT_COURSES.length})
          </button>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-hidden pb-2"
            onScroll={updateScrollState}
          >
            {effectiveCourses.map((course) => (
              <LearningCourseCard
                key={course.id}
                course={course}
                onClick={() => setSelectedCourse(course)}
                actionUrl={
                  course.id === '1' && commitmentDone
                    ? '/learn/courses/1/content'
                    : undefined
                }
              />
            ))}
          </div>

          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 -left-3 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg"
              style={{ border: '1px solid #e0e0e0' }}
            >
              <ChevronLeft className="size-5 text-gray-600" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 -right-3 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg"
              style={{ border: '1px solid #e0e0e0' }}
            >
              <ChevronRight className="size-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}
