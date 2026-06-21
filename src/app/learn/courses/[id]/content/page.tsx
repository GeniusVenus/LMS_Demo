import { notFound } from 'next/navigation';
import { IMPORTANT_COURSES } from '@/constants/learning';
import { getCourseContent } from '@/constants/course-content';
import CourseContentClient from '@/components/features/learning/CourseContentClient';

type Props = { params: Promise<{ id: string }> };

export default async function CourseContentPage({ params }: Props) {
  const { id } = await params;
  const course = IMPORTANT_COURSES.find((c) => c.id === id);
  if (!course) notFound();
  const content = getCourseContent(id);
  if (!content) notFound();
  return <CourseContentClient course={course} content={content} />;
}
