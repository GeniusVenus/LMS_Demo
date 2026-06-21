'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/app-store';

export default function ModeToggle() {
  const router = useRouter();
  const { mode, switchMode, reset } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleSwitch = () => {
    switchMode();
    router.push('/');
  };

  const handleReset = () => {
    reset();
    router.push('/');
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg transition-opacity hover:opacity-90"
        style={{ backgroundColor: mode === 'after' ? 'rgb(0,70,180)' : '#374151' }}
        title="Mở Demo mode"
      >
        <span className="size-1.5 rounded-full bg-white/70" />
        Demo
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 overflow-hidden rounded-xl shadow-lg"
      style={{ border: '1px solid #d1d5db', backgroundColor: '#fff', minWidth: 180 }}
    >
      {/* Header: mode badge + collapse button */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ backgroundColor: mode === 'after' ? 'rgb(0,70,180)' : '#374151' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white">Demo mode</span>
          <span
            className="rounded px-2 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#fff',
            }}
          >
            {mode === 'before' ? 'Before' : 'After'}
          </span>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="ml-2 flex size-5 cursor-pointer items-center justify-center rounded text-white/70 hover:bg-white/20 hover:text-white"
          title="Ẩn"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-1 p-2">
        <button
          onClick={handleSwitch}
          className="cursor-pointer rounded px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: mode === 'after' ? '#374151' : 'rgb(0,70,180)' }}
        >
          {mode === 'before' ? 'Chuyển sang After →' : '← Chuyển sang Before'}
        </button>
        <button
          onClick={handleReset}
          className="cursor-pointer rounded border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}
