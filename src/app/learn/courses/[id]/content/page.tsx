import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IMPORTANT_COURSES } from '@/constants/learning';
import { getCourseContent } from '@/constants/course-content';
import CourseContentClient from '@/components/features/learning/CourseContentClient';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = IMPORTANT_COURSES.find((c) => c.id === id);
  return {
    title: course ? `Nội dung trực tuyến – ${course.title}` : 'Nội dung trực tuyến',
  };
}

export default async function CourseContentPage({ params }: Props) {
  const { id } = await params;
  const course = IMPORTANT_COURSES.find((c) => c.id === id);
  if (!course) notFound();
  const content = getCourseContent(id);
  if (!content) notFound();
  return <CourseContentClient course={course} content={content} />;
}
