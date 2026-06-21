'use client';

import { Search } from 'lucide-react';

const BTN_COLOR = 'rgb(0, 100, 217)';

export default function LearningSearchRow() {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="relative w-56">
        <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm Học tập"
          className="h-7 w-full rounded-full border border-gray-300 bg-white pr-3 pl-8 text-xs focus:border-blue-500 focus:outline-none"
        />
      </div>
      <button
        className="text-xs font-medium hover:underline"
        style={{ color: BTN_COLOR }}
      >
        Duyệt thư viện
      </button>
    </div>
  );
}
