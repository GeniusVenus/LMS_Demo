'use client';

import { useState } from 'react';
import { UPDATE_CARDS } from '@/constants/home-updates';

const TABS = [
  { id: 'all', label: 'Tất cả (5)' },
  { id: 'library', label: 'Thư viện học tập (4)' },
  { id: 'more', label: 'Xem thêm' },
];

const NAV_BG = 'rgb(20, 30, 210)';
const BTN_COLOR = 'rgb(0, 100, 217)';

export default function UpdatesSection() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="mb-4 mt-12">
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold" style={{ color: NAV_BG }}>
          Thông tin cập nhật
        </h3>
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-lg border px-3 py-1 text-xs font-bold transition-opacity hover:opacity-80"
              style={
                activeTab === tab.id
                  ? { borderColor: BTN_COLOR, color: '#ffffff', backgroundColor: BTN_COLOR }
                  : { borderColor: BTN_COLOR, color: BTN_COLOR, backgroundColor: '#ffffff' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 cards — image 136×136 left, title top-aligned right */}
      <div className="grid grid-cols-4 gap-3">
        {UPDATE_CARDS.map((card) => (
          <div
            key={card.id}
            className="group flex cursor-pointer overflow-hidden border border-gray-200 bg-white transition-shadow hover:shadow-md"
            style={{ borderRadius: 16 }}
          >
            {/* Image — 136×136 */}
            <div
              className="shrink-0 overflow-hidden bg-gray-200"
              style={{ width: 136, height: 136 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>

            {/* Title — top-aligned */}
            <div className="flex flex-1 items-start px-3 pt-3">
              <p className="text-sm leading-snug font-semibold text-gray-900">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
