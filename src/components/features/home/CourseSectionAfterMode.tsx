'use client';

import { useAppStore } from '@/store/app-store';
import ImportantLearningSection from '@/components/features/learning/ImportantLearningSection';

export default function CourseSectionAfterMode() {
  const mode = useAppStore((s) => s.mode);
  if (mode !== 'after') return null;

  return (
    <div className="mt-10">
      <ImportantLearningSection />
    </div>
  );
}
