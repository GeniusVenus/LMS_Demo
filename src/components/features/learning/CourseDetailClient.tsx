'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { LearningCourse } from '@/constants/learning';
import type { CourseDetailData } from '@/constants/course-detail';
import { useAppStore } from '@/store/app-store';

const BTN_COLOR = 'rgb(0, 70, 180)';
const MB_BLUE = 'rgb(20, 30, 210)';

type Tab = 'detail' | 'prereq' | 'content';

const TABS: { key: Tab; label: string }[] = [
  { key: 'detail', label: 'Chi tiết khóa học' },
  { key: 'prereq', label: 'Điều kiện tham gia' },
  { key: 'content', label: 'Nội dung trực tuyến' },
];

export default function CourseDetailClient({
  course,
  detail,
  initialTab = 'detail',
}: {
  course: LearningCourse;
  detail: CourseDetailData;
  initialTab?: Tab;
}) {
  const router = useRouter();
  const { mode, commitmentDone } = useAppStore();
  const isAfter = mode === 'after';

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [chapterOpen, setChapterOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    detail.chapters.forEach((ch) => {
      init[ch.id] = true;
    });
    return init;
  });

  // In After mode, dynamically derive prereq status from Zustand state
  const effectivePrereqStatus = isAfter
    ? commitmentDone ? 'met' : 'unmet'
    : detail.prereqStatus;
  const prereqUnmet = effectivePrereqStatus === 'unmet';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="px-12 pt-5 pb-0">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-1 text-sm">
          <Link href="/learn" className="hover:underline" style={{ color: BTN_COLOR }}>
            Hoạt động học tập
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{course.title}</span>
        </div>

        {/* Title + Actions */}
        <div className="mb-5 flex items-center justify-between gap-8">
          <h1
            className="leading-snug font-bold text-gray-900"
            style={{ fontSize: 32, maxWidth: 820 }}
          >
            {course.title}
          </h1>
          <div className="flex shrink-0 items-center gap-4">
            {isAfter ? (
              /* After mode: always clickable, text + color signals prereq status */
              <button
                className="cursor-pointer rounded px-3 py-1 text-xs font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: MB_BLUE }}
                onClick={() =>
                  prereqUnmet
                    ? router.push('/learn/courses/camket')
                    : router.push(`/learn/courses/${course.id}/content`)
                }
              >
                {prereqUnmet ? 'Xem điều kiện tiên quyết' : 'Bắt đầu'}
              </button>
            ) : (
              /* Before mode: disabled when prereq unmet */
              <button
                className="rounded px-3 py-1 text-xs font-semibold text-white"
                style={{
                  backgroundColor: prereqUnmet ? '#9ca3af' : MB_BLUE,
                  cursor: prereqUnmet ? 'default' : 'pointer',
                }}
                disabled={prereqUnmet}
              >
                Bắt đầu
              </button>
            )}
            <button className="cursor-pointer text-xs hover:underline" style={{ color: BTN_COLOR }}>
              Đề xuất cho người khác
            </button>
            <button className="cursor-pointer text-xs hover:underline" style={{ color: BTN_COLOR }}>
              Đánh dấu trang
            </button>
          </div>
        </div>

        {/* Course info card */}
        <div className="mb-5 flex items-start gap-4" style={{ display: 'inline-flex' }}>
          <img
            src="/assets/logoavaitem.jpg"
            alt={course.title}
            style={{
              width: 158,
              height: 158,
              objectFit: 'cover',
              borderRadius: 4,
              flexShrink: 0,
              border: '1px solid #e5e7eb',
            }}
          />
          <div className="py-1">
            <p className="mb-2 font-semibold text-gray-800" style={{ fontSize: 16 }}>
              Thông tin Khoá học
            </p>
            <p className="mb-1 text-sm text-gray-700">
              <span className="font-medium">Loại hình:</span> {detail.courseType}
            </p>
            <p className="mb-2 text-sm text-gray-700">
              <span className="font-medium">Điều kiện tham gia:</span>{' '}
              {prereqUnmet ? (
                <>
                  Chưa hoàn thành{' '}
                  <button
                    className="cursor-pointer hover:underline"
                    style={{ color: BTN_COLOR }}
                    onClick={() => setActiveTab('prereq')}
                  >
                    Xem
                  </button>
                </>
              ) : detail.prereqStatus === 'met' ? (
                'Hoàn thành'
              ) : (
                'Không yêu cầu'
              )}
            </p>
            <p className="text-sm font-bold text-gray-900">{detail.price}</p>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="flex"
          style={{
            borderBottom: '1.5px solid #d1d5db',
            marginLeft: '-48px',
            marginRight: '-48px',
            paddingLeft: '48px',
          }}
        >
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="mr-6 cursor-pointer pb-2.5 text-sm font-bold transition-colors"
              style={{
                color: activeTab === key ? MB_BLUE : '#6b7280',
                borderBottom:
                  activeTab === key ? `3px solid ${MB_BLUE}` : '3px solid transparent',
                marginBottom: '-2px',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-12 py-5">
        {/* Chi tiết khóa học */}
        {activeTab === 'detail' && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <ChevronDown className="size-4 text-gray-600" />
              <span className="font-semibold text-gray-900">Thông tin Khoá học</span>
            </div>
            <div className="grid grid-cols-4 gap-8">
              <div>
                <p className="mb-1 text-xs text-gray-500">ID Khoá Học:</p>
                <p className="text-sm font-medium text-gray-900">{course.code}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">Phiên bản:</p>
                <p className="text-sm font-medium text-gray-900">
                  {detail.version}, {detail.versionDate}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">Được gán bởi:</p>
                <p className="text-sm font-medium text-gray-900">{detail.assignedBy}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">Được gán vào:</p>
                <p className="text-sm font-medium text-gray-900">{detail.assignedDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Điều kiện tham gia */}
        {activeTab === 'prereq' && (
          <div>
            {detail.prerequisites.length > 0 ? (
              <>
                <p className="mb-4 text-sm font-bold text-gray-900">
                  Hoàn tất tất cả khoá học dưới đây để đáp ứng yêu cầu tiên quyết cho khoá học này.
                </p>
                <div className="overflow-hidden rounded border border-gray-200">
                  {detail.prerequisites.map((prereq, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between p-3"
                      style={{
                        borderBottom:
                          i < detail.prerequisites.length - 1 ? '1px solid #f3f4f6' : 'none',
                      }}
                    >
                      <div>
                        {isAfter ? (
                          <button
                            className="cursor-pointer text-left text-sm font-medium hover:underline"
                            style={{ color: BTN_COLOR }}
                            onClick={() => router.push('/learn/courses/camket')}
                          >
                            {prereq.title}
                          </button>
                        ) : (
                          <p className="text-sm font-medium text-gray-900">{prereq.title}</p>
                        )}
                        <p className="mt-0.5 text-xs text-gray-500">{prereq.type}</p>
                      </div>
                      <p className="ml-8 shrink-0 text-xs text-gray-500">{prereq.libraryStatus}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">Khoá học này không có điều kiện tiên quyết.</p>
            )}
          </div>
        )}

        {/* Nội dung trực tuyến */}
        {activeTab === 'content' && (
          <div>
            {detail.chapters.length === 0 ? (
              <p className="text-sm text-gray-500">Chưa có nội dung trực tuyến cho khoá học này.</p>
            ) : (
              <div className="overflow-hidden rounded border border-gray-300">
                {/* Header row */}
                <div
                  className="border-b border-gray-300 px-4 py-2.5"
                  style={{ backgroundColor: '#f3f4f6' }}
                >
                  <p className="text-base font-bold text-gray-800">Xem trước nội dung</p>
                </div>

                {detail.chapters.map((chapter, chIdx) => (
                  <div key={chapter.id}>
                    {/* Chapter title row — white bg, black text */}
                    <button
                      className="flex w-full cursor-pointer items-center gap-2 border-b border-gray-300 bg-white px-4 py-2.5 text-left"
                      onClick={() =>
                        setChapterOpen((prev) => ({ ...prev, [chapter.id]: !prev[chapter.id] }))
                      }
                    >
                      {chapterOpen[chapter.id] ? (
                        <ChevronDown className="size-4 shrink-0 text-gray-600" />
                      ) : (
                        <ChevronRight className="size-4 shrink-0 text-gray-600" />
                      )}
                      <span className="text-sm text-gray-900">{chapter.title}</span>
                    </button>

                    {/* Items — gray bg rows, flat indent */}
                    {chapterOpen[chapter.id] &&
                      chapter.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="py-2.5 text-sm text-gray-700"
                          style={{
                            backgroundColor: '#f3f4f6',
                            borderBottom:
                              idx < chapter.items.length - 1 || chIdx < detail.chapters.length - 1
                                ? '1px solid #e5e7eb'
                                : 'none',
                            paddingLeft: isAfter ? 16 + item.indent * 12 : 16,
                            paddingRight: 16,
                          }}
                        >
                          {item.label}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
