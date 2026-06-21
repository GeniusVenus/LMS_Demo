'use client';

import { Pencil } from 'lucide-react';
import { GREETING_NAME, GREETING_BG } from '@/constants/home-updates';

const BTN_COLOR = 'rgb(0, 100, 217)';

const btnStyle = {
  borderColor: BTN_COLOR,
  color: BTN_COLOR,
  backgroundColor: '#ffffff',
};

export default function GreetingBanner() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Buổi sáng tốt lành' : hour < 18 ? 'Buổi chiều tốt lành' : 'Buổi tối tốt lành';

  return (
    <div
      className="relative mb-4 overflow-hidden rounded-xl"
      style={{
        backgroundImage: `url('${GREETING_BG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '260px',
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-between px-8 py-6">
        {/* Title */}
        <h2 className="text-xl font-bold drop-shadow-sm" style={{ color: 'rgb(20, 30, 210)' }}>
          {greeting}, {GREETING_NAME}
        </h2>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border px-4 py-1 text-sm font-bold hover:opacity-90"
            style={btnStyle}
          >
            Quản trị Đào tạo
          </button>
          <button
            className="rounded-lg border px-4 py-1 text-sm font-bold hover:opacity-90"
            style={btnStyle}
          >
            Sách
          </button>
          <button
            className="flex size-8 items-center justify-center rounded-lg border font-bold hover:opacity-90"
            style={btnStyle}
          >
            <Pencil className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
