import type { Metadata } from 'next';
import LearningHeader from '@/components/features/learning/LearningHeader';
import LearningSearchRow from '@/components/features/learning/LearningSearchRow';
import LearningBanner from '@/components/features/learning/LearningBanner';
import RequiredLearningSection from '@/components/features/learning/RequiredLearningSection';
import ImportantLearningSection from '@/components/features/learning/ImportantLearningSection';

export const metadata: Metadata = {
  title: 'Học tập - SAP SuccessFactors',
};

export default function LearnPage() {
  return (
    <>
      <div className="px-12 pt-5 pb-3">
        <LearningHeader />
        <LearningSearchRow />
      </div>
      <LearningBanner />
      <div className="px-12 pb-8 pt-5">
        <RequiredLearningSection />
        <ImportantLearningSection />
      </div>
    </>
  );
}
