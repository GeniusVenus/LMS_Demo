'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronRight,
  Maximize2,
  Minimize2,
  Menu,
  FileText,
  CheckSquare,
  ShieldCheck,
} from 'lucide-react';
import type { LearningCourse } from '@/constants/learning';
import type { CourseContent, ContentItem } from '@/constants/course-content';
import { LESSON_CONTENT, GENERIC_LESSON } from '@/constants/lesson-content';
import { useAppStore } from '@/store/app-store';

const HEADER_DARK = 'rgb(12, 20, 178)';
const BTN_BLUE = 'rgb(0, 70, 180)';
const NAVBAR_H = 56;
const BAR_H = 44;
const SIDEBAR_W = 360;

export default function CourseContentClient({
  course,
  content,
}: {
  course: LearningCourse;
  content: CourseContent;
}) {
  const mode = useAppStore((s) => s.mode);
  const isAfter = mode === 'after';

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chapterOpen, setChapterOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    content.chapters.forEach((ch) => { init[ch.id] = true; });
    return init;
  });
  const [activeLesson, setActiveLesson] = useState(content.firstLessonId);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [launched, setLaunched] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const lessonBody = LESSON_CONTENT[activeLesson] ?? GENERIC_LESSON;

  const activeItem = content.chapters
    .flatMap((ch) => ch.items)
    .find((it) => it.id === activeLesson);

  useEffect(() => {
    setLaunched(false);
  }, [activeLesson]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      contentRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const launchContent = useCallback(() => {
    setLaunched(true);
    const title = encodeURIComponent(activeItem?.label ?? content.firstLessonLabel);
    window.open(
      `/learn/content-player?lessonId=${activeLesson}&title=${title}`,
      '_blank',
      'popup,width=1280,height=820,noopener,noreferrer',
    );
  }, [activeLesson, activeItem, content.firstLessonLabel]);

  const renderSidebarItem = (item: ContentItem, isLastInChapter: boolean, isLastChapter: boolean) => {
    const isActive = item.id === activeLesson;
    const isClickable = item.type === 'lesson' && !item.locked;
    const showBorder = !(isLastInChapter && isLastChapter);
    // After mode: indent hierarchy (base 16px + 12px per level)
    const paddingLeft = isAfter ? 16 + item.indent * 12 : 16;

    return (
      <div
        key={item.id}
        className={`flex items-center gap-2 py-2.5 text-sm transition-colors ${isClickable ? 'cursor-pointer hover:opacity-90' : ''}`}
        style={{
          paddingLeft,
          paddingRight: 16,
          backgroundColor: isActive ? '#dbeafe' : '#f3f4f6',
          borderLeft: isActive ? `3px solid ${BTN_BLUE}` : '3px solid transparent',
          borderBottom: showBorder ? '1px solid #e5e7eb' : 'none',
          color: item.locked
            ? '#b0b8c8'
            : item.type === 'section'
              ? '#6b7280'
              : isActive
                ? BTN_BLUE
                : '#374151',
          fontWeight: isActive ? 600 : 400,
        }}
        onClick={() => isClickable && setActiveLesson(item.id)}
      >
        {item.type === 'lesson' && !item.locked &&
          (item.done ? (
            <CheckSquare className="size-3.5 shrink-0" style={{ color: BTN_BLUE }} />
          ) : (
            <FileText className="size-3.5 shrink-0 text-gray-400" />
          ))}
        <span className="leading-tight">{item.label}</span>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* ── Breadcrumb + course title ── */}
      <div className="px-12 pt-5 pb-4">
        <div className="mb-2 flex items-center gap-1 text-sm">
          <Link href="/learn" className="hover:underline" style={{ color: BTN_BLUE }}>
            Hoạt động học tập
          </Link>
          <span className="text-gray-400">/</span>
          <span className="cursor-pointer hover:underline" style={{ color: BTN_BLUE }}>
            {content.title}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Nội dung trực tuyến</span>
        </div>
        <h1 className="mb-1 text-2xl font-bold text-gray-900">{content.title}</h1>
        <p className="text-sm text-gray-500">{content.code}</p>
      </div>

      {/* ── Fullscreen zone: action bar + two-panel body ── */}
      <div ref={contentRef} className="flex flex-1 flex-col bg-white">

      {/* ── Two-column action bar ── */}
      <div
        className="flex px-12"
        style={{
          backgroundColor: HEADER_DARK,
          minHeight: BAR_H,
          // sticky only when not in fullscreen; inside fullscreen the wrapper fills the screen
          position: isFullscreen ? 'relative' : 'sticky',
          top: isFullscreen ? undefined : NAVBAR_H,
          zIndex: 10,
        }}
      >
        {/* Sidebar column header */}
        <div className="flex shrink-0 items-center gap-3" style={{ width: SIDEBAR_W, borderRight: '1px solid rgba(255,255,255,0.25)' }}>
          <button
            className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-white"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu className="size-4" />
            Nội dung
          </button>
          <button
            className="cursor-pointer text-xs text-white/70 hover:text-white"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? 'Ẩn' : 'Hiện'}
          </button>
        </div>

        {/* Content column header: lesson title left, buttons right */}
        <div className="flex flex-1 items-center justify-between pl-8">
          <span className="text-sm font-semibold text-white">
            {activeItem?.label ?? content.firstLessonLabel}
          </span>
          <div className="flex items-center gap-3">
            <button className="flex cursor-pointer items-center gap-1.5 rounded border border-white/40 px-3 py-1 text-xs font-bold text-white hover:bg-white/10">
              <ShieldCheck className="size-3.5" />
              Xác thực hoàn tất
            </button>
            <button
              className="flex cursor-pointer items-center justify-center rounded p-1 hover:bg-white/20"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            >
              {isFullscreen ? (
                <Minimize2 className="size-4 text-white" />
              ) : (
                <Maximize2 className="size-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Two-panel body ── */}
      <div className="flex flex-1 px-12">

        {/* Sidebar — sticky, independent scroll, preview-table style */}
        {sidebarOpen && (
          <aside
            className="shrink-0 overflow-y-auto"
            style={{
              width: SIDEBAR_W,
              position: 'sticky',
              top: NAVBAR_H + BAR_H,
              maxHeight: `calc(100vh - ${NAVBAR_H + BAR_H}px)`,
              alignSelf: 'flex-start',
              borderRight: '1px solid #d1d5db',
            }}
          >
            {/* Bordered table container */}
            <div className="overflow-hidden border border-gray-300 m-3 rounded">
              {content.chapters.map((chapter, chIdx) => {
                const isLastChapter = chIdx === content.chapters.length - 1;
                return (
                  <div key={chapter.id}>
                    {/* Chapter header — white bg, same as preview */}
                    <button
                      className="flex w-full cursor-pointer items-center gap-2 bg-white px-4 py-2.5 text-left"
                      style={{ borderBottom: '1px solid #d1d5db' }}
                      onClick={() =>
                        setChapterOpen((prev) => ({ ...prev, [chapter.id]: !prev[chapter.id] }))
                      }
                    >
                      {chapterOpen[chapter.id] ? (
                        <ChevronDown className="size-3.5 shrink-0 text-gray-600" />
                      ) : (
                        <ChevronRight className="size-3.5 shrink-0 text-gray-600" />
                      )}
                      <span className="text-xs font-semibold text-gray-900">
                        {chapter.title} ({chapter.count})
                      </span>
                    </button>

                    {/* Item rows — gray bg, no indent */}
                    {chapterOpen[chapter.id] &&
                      chapter.items.map((item, idx) =>
                        renderSidebarItem(
                          item,
                          idx === chapter.items.length - 1,
                          isLastChapter,
                        )
                      )}
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* ── Content panel ── */}
        <main className="flex flex-1 flex-col pl-8 py-8 overflow-y-auto">
          {isAfter ? (
            /* After mode: inline lesson content */
            activeItem?.locked ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-gray-400">Nội dung chưa được mở khóa.</p>
              </div>
            ) : (
              <div className="w-full">
                <h2 className="mb-5 text-base font-bold text-gray-900">
                  {activeItem?.label ?? content.firstLessonLabel}
                </h2>
                <div className="space-y-4">
                  {lessonBody.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-gray-700">{p}</p>
                  ))}
                </div>
                {/* Placeholder media block */}
                <div
                  className="mt-8 flex items-center justify-center rounded-lg border border-gray-200"
                  style={{ height: 200, backgroundColor: '#f3f4f6' }}
                >
                  <p className="text-sm text-gray-400">Tài liệu / video sẽ được nhúng tại đây</p>
                </div>
              </div>
            )
          ) : (
            /* Before mode: centered launch / done */
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              {!launched ? (
                <>
                  <p className="text-sm text-gray-500">
                    Nội dung này sẽ được hiển thị trong cửa sổ mới.
                  </p>
                  <button
                    onClick={launchContent}
                    className="cursor-pointer px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#4a9fe0', borderRadius: 8 }}
                  >
                    Khởi chạy nội dung
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <CheckSquare className="size-16 text-gray-300" />
                  <p className="text-sm font-medium text-gray-500">Đã Hoàn thành</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      </div>{/* end fullscreen zone */}
    </div>
  );
}
