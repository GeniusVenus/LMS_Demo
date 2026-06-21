import type { Metadata } from 'next';
import { LESSON_CONTENT, GENERIC_LESSON } from '@/constants/lesson-content';

type Props = { searchParams: Promise<{ lessonId?: string; title?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { title } = await searchParams;
  const lessonTitle = title ? decodeURIComponent(title) : 'Bài học';
  return { title: lessonTitle };
}

export default async function ContentPlayerPage({ searchParams }: Props) {
  const { lessonId, title } = await searchParams;
  const lessonTitle = title ? decodeURIComponent(title) : 'Bài học';
  const body = LESSON_CONTENT[lessonId ?? ''] ?? GENERIC_LESSON;

  return (
    <div className="flex min-h-screen flex-col" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 py-3"
        style={{ backgroundColor: 'rgb(12, 20, 178)', minHeight: 48 }}
      >
        <span className="text-sm font-semibold text-white">Trình phát nội dung học tập — MB LMS</span>
        <span className="text-xs text-white/60">Đóng cửa sổ này khi hoàn thành</span>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-white px-16 py-10">
        <h1 className="mb-6 text-xl font-bold text-gray-900">{lessonTitle}</h1>

        <div className="space-y-5">
          {body.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-gray-700">
              {p}
            </p>
          ))}
        </div>

        {/* Placeholder media block */}
        <div
          className="mt-10 flex items-center justify-center rounded-lg border border-gray-200"
          style={{ height: 260, backgroundColor: '#f3f4f6' }}
        >
          <div className="text-center">
            <svg
              className="mx-auto mb-3"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <p className="text-sm text-gray-400">Tài liệu / video sẽ được nhúng tại đây</p>
          </div>
        </div>
      </div>
    </div>
  );
}
