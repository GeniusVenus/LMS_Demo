'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import type { LearningCourse } from '@/constants/learning';

const MB_BLUE = 'rgb(20, 30, 210)';
const BTN_COLOR = 'rgb(0, 100, 217)';
const MB_LOGO =
  'https://hcm44.sapsf.com/public/ui-resource/militaryco/596;mod=9cbc98e6cbe63c0e0199213ad572ddec';

type Props = {
  course: LearningCourse;
  onClose: () => void;
};

// Primary action button — blue bg, white text
const PrimaryBtn = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    className="cursor-pointer rounded px-4 py-1.5 text-xs font-bold text-white transition-colors hover:opacity-90"
    style={{ backgroundColor: BTN_COLOR }}
    onClick={onClick}
  >
    {label}
  </button>
);

// Secondary button — outlined
const SecondaryBtn = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    className="cursor-pointer rounded border bg-white px-4 py-1.5 text-xs font-bold transition-colors hover:bg-gray-100"
    style={{ borderColor: BTN_COLOR, color: BTN_COLOR }}
    onClick={onClick}
  >
    {label}
  </button>
);

export default function CourseDetailModal({ course, onClose }: Props) {
  const router = useRouter();
  const prereqUnmet = course.status === 'prereq-unmet';
  const isNone = course.status === 'none';
  const isStart = course.status === 'start';
  const isPrereqMet = course.status === 'prereq-met';
  const isTiepTuc = !prereqUnmet && !isNone && !isStart && !isPrereqMet;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const navigate = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
      onClick={onClose}
    >
      <div
        className="w-full overflow-hidden rounded shadow-xl"
        style={{ maxWidth: '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: MB_BLUE }}
        >
          <span className="text-sm font-semibold text-white">Chi tiết</span>
          <button
            onClick={onClose}
            className="flex size-6 cursor-pointer items-center justify-center rounded hover:bg-white/20"
          >
            <X className="size-4 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="bg-white px-5 py-4">
          <div className="mb-4 flex items-start gap-3">
            <img
              src={MB_LOGO}
              alt="MB"
              className="mt-0.5 shrink-0 rounded"
              style={{ width: 40, height: 40, objectFit: 'contain' }}
            />
            <div>
              <Link
                href={`/learn/courses/${course.id}`}
                className="mb-1 block text-sm font-bold leading-snug hover:underline"
                style={{ color: BTN_COLOR }}
              >
                {course.title}
              </Link>
              <p className="text-xs text-gray-600">
                <span className="font-medium">ID:</span> {course.code}
                <span className="mx-2 text-gray-300">|</span>
                <span className="font-medium">Loại hình:</span> ONLINE
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
            <div>
              <p className="font-semibold text-gray-800">Phương thức triển khai</p>
              <p className="text-gray-600">Khóa học Online</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Được gán bởi Quản trị viên</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 border-t px-5 py-3"
          style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
        >
          {/* Case 1: prereq-unmet → primary "Xem Điều kiện" */}
          {prereqUnmet && (
            <PrimaryBtn
              label="Xem Điều kiện tham gia"
              onClick={() => navigate(`/learn/courses/${course.id}?tab=prereq`)}
            />
          )}

          {/* Case 2: tiếp tục → primary "Tiếp tục" + secondary "Chi tiết" */}
          {isTiepTuc && (
            <>
              <PrimaryBtn
                label="Tiếp tục khóa học"
                onClick={() => navigate(`/learn/courses/${course.id}`)}
              />
              <SecondaryBtn
                label="Chi tiết chương trình giảng dạy"
                onClick={() => navigate(`/learn/courses/${course.id}`)}
              />
            </>
          )}

          {/* Case 3: none → primary "Chi tiết" only */}
          {isNone && (
            <PrimaryBtn
              label="Chi tiết chương trình giảng dạy"
              onClick={() => navigate(`/learn/courses/${course.id}`)}
            />
          )}

          {/* Case 4: start → primary "Bắt đầu" only */}
          {isStart && (
            <PrimaryBtn
              label="Bắt đầu"
              onClick={() => navigate(`/learn/courses/${course.id}`)}
            />
          )}

          {/* Case 5: prereq-met → primary "Bắt đầu" only → content player */}
          {isPrereqMet && (
            <PrimaryBtn
              label="Bắt đầu"
              onClick={() => navigate(`/learn/courses/${course.id}/content`)}
            />
          )}

          <button
            onClick={onClose}
            className="cursor-pointer text-xs font-medium text-gray-600 hover:underline"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
