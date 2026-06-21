'use client';

import { Info, ChevronDown } from 'lucide-react';

const MB_BLUE = 'rgb(20, 30, 210)';
const BTN_COLOR = 'rgb(0, 100, 217)';

export default function LearningHeader() {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h1 className="font-bold text-gray-900" style={{ fontSize: '20px' }}>
        Học tập
      </h1>
      <div className="flex items-center gap-1.5">
        <button
          className="flex size-6 items-center justify-center rounded-full hover:bg-blue-50"
          style={{ color: MB_BLUE }}
        >
          <Info className="size-4" />
        </button>
        <button
          className="rounded border px-3 py-0.5 text-xs font-bold hover:opacity-90"
          style={{ borderColor: BTN_COLOR, color: BTN_COLOR, backgroundColor: '#ffffff' }}
        >
          Quản trị Đào tạo
        </button>
        <button
          className="flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium hover:bg-gray-50"
          style={{ borderColor: '#d1d5db', color: '#374151' }}
        >
          <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="2" width="14" height="2" rx="1" />
            <rect x="1" y="7" width="14" height="2" rx="1" />
            <rect x="1" y="12" width="14" height="2" rx="1" />
          </svg>
          <ChevronDown className="size-3" />
        </button>
      </div>
    </div>
  );
}
