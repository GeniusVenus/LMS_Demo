export type NavItem = {
  id: string;
  label: string;
  icon: string;
  href: string | null;
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Trang chủ', icon: 'Home', href: '/' },
  { id: 'report', label: 'Báo cáo', icon: 'BarChart2', href: null },
  { id: 'forum', label: 'Diễn đàn học tập', icon: 'MessageSquare', href: null },
  { id: 'learn', label: 'Hoạt động học tập của tôi', icon: 'BookOpen', href: '/learn' },
  { id: 'profile', label: 'Hồ sơ Nhân viên', icon: 'Contact', href: null },
  { id: 'company', label: 'Thông tin công ty', icon: 'Network', href: null },
  { id: 'admin', label: 'Trung tâm Quản trị', icon: 'Wrench', href: null },
  { id: 'training', label: 'Quản trị đào tạo', icon: 'ArrowRight', href: null },
];

export const NOTIFICATION_COUNT = 11;
