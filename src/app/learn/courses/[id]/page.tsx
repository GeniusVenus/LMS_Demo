import { notFound } from 'next/navigation';
import { IMPORTANT_COURSES } from '@/constants/learning';
import { getCourseDetail } from '@/constants/course-detail';
import CourseDetailClient from '@/components/features/learning/CourseDetailClient';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function CourseDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { tab } = await searchParams;
  const course = IMPORTANT_COURSES.find((c) => c.id === id);
  if (!course) notFound();
  const detail = getCourseDetail(course.id);
  const initialTab = tab === 'prereq' ? 'prereq' : tab === 'content' ? 'content' : 'detail';
  return <CourseDetailClient course={course} detail={detail} initialTab={initialTab} />;
}
