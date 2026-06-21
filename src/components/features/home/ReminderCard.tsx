'use client';

import { BellDot } from 'lucide-react';

const PAGE_BG = '#eef2fb';

export default function ReminderCard() {
  return (
    <div className="mb-6 flex justify-center">
      <div
        className="flex w-44 flex-col items-center gap-2 rounded-xl px-4 py-4"
        style={{ backgroundColor: PAGE_BG }}
      >
        <div className="flex size-12 items-center justify-center rounded-full">
          <BellDot className="size-6" style={{ color: 'rgb(20, 30, 210)' }} />
        </div>
        <p className="text-center text-xs font-medium text-gray-700">Thông báo nhắc</p>
      </div>
    </div>
  );
}
