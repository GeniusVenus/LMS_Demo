'use client';

import { useRouter } from 'next/navigation';
import { MoreHorizontal, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { LearningCourse } from '@/constants/learning';
import { useAppStore } from '@/store/app-store';

type Props = { course: LearningCourse; onClick?: () => void; actionUrl?: string };

const BTN_COLOR = 'rgb(0, 100, 217)';
const RED = '#c62828';
const btnStyle = { borderColor: BTN_COLOR, color: BTN_COLOR };
const redBtnStyle = { backgroundColor: RED, borderColor: RED, color: '#fff' };

export default function LearningCourseCard({ course, onClick, actionUrl }: Props) {
  const router = useRouter();
  const mode = useAppStore((s) => s.mode);
  const isAfter = mode === 'after';

  const prereqUnmet = course.status === 'prereq-unmet';
  const prereqMet = course.status === 'prereq-met';
  const isStart = course.status === 'start';
  const hasActionBtn = course.status !== 'none';

  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-black"
      style={{ flexBasis: 'calc((100% - 60px) / 6)', flexShrink: 0, height: '186px' }}
      onClick={onClick}
    >
      <div className="flex flex-1 flex-col p-3">
        {/* Title + menu */}
        <div className="mb-2 flex items-start justify-between gap-1">
          <p className="line-clamp-2 flex-1 text-sm font-semibold leading-tight text-gray-900 group-hover:underline group-has-[button:hover]:no-underline">
            {course.title}
          </p>
          <button
            className="shrink-0 cursor-pointer rounded p-0.5 hover:bg-gray-100"
            style={{ color: 'rgb(20, 30, 210)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Curriculum chip */}
        {course.curriculum && (
          <div className="mb-2">
            <span
              className="inline-block max-w-full truncate rounded px-2 py-0.5 text-xs"
              style={{ backgroundColor: '#e8f0fe', color: '#1a56db' }}
            >
              Chương trình giảng dạy: {course.curriculum}
            </span>
          </div>
        )}

        {/* Instructor */}
        <p className="mb-2 text-xs text-gray-500">
          {course.instructor
            ? `${course.instructor}${course.duration ? ` • ${course.duration}` : ''}`
            : 'Khóa học không có giảng viên hướng dẫn'}
        </p>

        {/* Prereq status */}
        {prereqUnmet && (
          <div className="mb-2 flex items-center gap-1 text-xs font-medium" style={{ color: '#d32f2f' }}>
            <AlertCircle className="size-3.5 shrink-0" />
            <span>Điều kiện tiên quyết chưa đáp ứng</span>
          </div>
        )}
        {prereqMet && (
          <div className="mb-2 flex items-center gap-1 text-xs font-medium" style={{ color: '#388e3c' }}>
            <CheckCircle2 className="size-3.5 shrink-0" />
            <span>Điều kiện tiên quyết hoàn tất</span>
          </div>
        )}

        {/* Action button */}
        {hasActionBtn && (
          <div className="mt-auto flex justify-end pt-1">
            {prereqUnmet ? (
              isAfter ? (
                /* After mode: red "Xem điều kiện tiên quyết" → go to commitment page */
                <button
                  className="cursor-pointer rounded-lg border px-3 py-1 text-xs font-bold transition-opacity hover:opacity-90"
                  style={btnStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/learn/courses/${course.id}?tab=prereq`);
                  }}
                >
                  Xem điều kiện tiên quyết
                </button>
              ) : (
                /* Before mode: blue "Xem Điều kiện tham gia" */
                <button
                  className="cursor-pointer rounded-lg border bg-white px-3 py-1 text-xs font-bold transition-colors hover:bg-gray-200"
                  style={btnStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/learn/courses/${course.id}?tab=prereq`);
                  }}
                >
                  Xem Điều kiện tham gia
                </button>
              )
            ) : isStart ? (
              <button
                className="cursor-pointer rounded-lg border bg-white px-3 py-1 text-xs font-bold transition-colors hover:bg-gray-200"
                style={btnStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(actionUrl ?? `/learn/courses/${course.id}`);
                }}
              >
                Bắt đầu
              </button>
            ) : prereqMet ? (
              <button
                className="cursor-pointer rounded-lg border bg-white px-3 py-1 text-xs font-bold transition-colors hover:bg-gray-200"
                style={btnStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(actionUrl ?? `/learn/courses/${course.id}/content`);
                }}
              >
                Bắt đầu
              </button>
            ) : (
              <button
                className="cursor-pointer rounded-lg border bg-white px-3 py-1 text-xs font-bold transition-colors hover:bg-gray-200"
                style={btnStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(actionUrl ?? `/learn/courses/${course.id}/content`);
                }}
              >
                Tiếp tục khóa học
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
