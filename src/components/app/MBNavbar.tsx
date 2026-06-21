'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart2,
  MessageSquare,
  BookOpen,
  Contact,
  Network,
  Wrench,
  ArrowRight,
  ChevronDown,
  CheckSquare,
  MessageCircle,
  Bell,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NAV_ITEMS, NOTIFICATION_COUNT } from '@/constants/navigation';

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  BarChart2,
  MessageSquare,
  BookOpen,
  Contact,
  Network,
  Wrench,
  ArrowRight,
};

const MB_LOGO =
  'https://hcm44.sapsf.com/public/ui-resource/militaryco/596;mod=9cbc98e6cbe63c0e0199213ad572ddec';

const NAV_BG = 'rgb(20, 30, 210)';

export default function MBNavbar() {
  const pathname = usePathname();
  const activeItem = NAV_ITEMS.find((item) => item.href && pathname === item.href) ?? NAV_ITEMS[0];

  return (
    <header
      className="sticky top-0 z-50 flex items-center gap-3 px-12"
      style={{ backgroundColor: NAV_BG, height: 52 }}
    >
      {/* Left: logo + nav dropdown */}
      <div className="flex shrink-0 items-center gap-1">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MB_LOGO} alt="MB" className="object-contain" style={{ width: 112, height: 40 }} />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 rounded px-3 py-1.5 text-base font-bold text-white hover:bg-white/10 focus:outline-none">
              <span>{activeItem.label}</span>
              <ChevronDown className="size-4 text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={8}
            className="w-72 rounded-lg border-0 p-1 shadow-xl"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = ICON_MAP[item.icon] ?? Home;
              const isActive = item.href ? pathname === item.href : false;
              const inner = (
                <>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: '#e3f2fd' }}
                  >
                    <Icon className="size-4" style={{ color: NAV_BG }} />
                  </span>
                  <span className="flex-1 text-sm">{item.label}</span>
                </>
              );
              return item.href ? (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-2 py-2 ${isActive ? 'bg-gray-100 font-semibold' : ''}`}
                  >
                    {inner}
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  key={item.id}
                  className="flex cursor-default items-center gap-3 rounded-md px-2 py-2"
                >
                  {inner}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center: search — flex-1 with centered constrained input */}
      <div className="flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Tìm kiếm Thao tác hoặc Người dùng"
          className="h-8 w-full max-w-xl rounded-full px-5 text-sm text-white italic placeholder:text-white placeholder:italic focus:outline-none"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
      </div>

      {/* Right icons — all white */}
      <div className="flex shrink-0 items-center gap-3">
        <button className="relative flex size-8 items-center justify-center rounded-full text-white hover:bg-white/10">
          <CheckSquare className="size-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {NOTIFICATION_COUNT}
          </span>
        </button>

        <button className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/10">
          <MessageCircle className="size-5" />
        </button>

        <button className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/10">
          <Bell className="size-5" />
        </button>

        <button
          className="flex size-8 items-center justify-center rounded-full text-xs font-black hover:opacity-90"
          style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(123, 145, 168)' }}
        >
          NXH
        </button>
      </div>
    </header>
  );
}
