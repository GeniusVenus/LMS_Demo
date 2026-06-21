'use client';

import { useAppStore } from '@/store/app-store';
import UpdatesSection from './UpdatesSection';
import ImportantLearningSection from '@/components/features/learning/ImportantLearningSection';

export default function HomeContentSections() {
  const mode = useAppStore((s) => s.mode);

  if (mode === 'after') {
    return (
      <>
        <div className="mb-10">
          <ImportantLearningSection />
        </div>
        <UpdatesSection />
      </>
    );
  }

  return <UpdatesSection />;
}
