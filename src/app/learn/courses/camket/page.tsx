import type { Metadata } from 'next';
import CommitmentClient from '@/components/features/learning/CommitmentClient';

export const metadata: Metadata = {
  title: 'Bản cam kết học tập',
  description: 'Hoàn thành bản cam kết học tập để mở khóa chương trình đào tạo.',
};

export default function CommitmentPage() {
  return <CommitmentClient />;
}
