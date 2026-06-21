'use client';

import { useState } from 'react';

const NAV_BG = 'rgb(20, 30, 210)';

export default function PersonalizeToast() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 shadow-xl">
        <p className="text-sm text-gray-700">
          Bạn có biết rằng bạn có thể cá nhân hóa trang chủ của mình không?
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            className="rounded-md px-4 py-1.5 text-sm font-medium text-white"
            style={{ backgroundColor: NAV_BG }}
          >
            Thiết lập màn hình
          </button>
          <button
            onClick={() => setVisible(false)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Loại bỏ
          </button>
        </div>
      </div>
    </div>
  );
}
