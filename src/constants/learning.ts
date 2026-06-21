export type CourseStatus = 'prereq-unmet' | 'prereq-met' | 'in-progress' | 'none' | 'start';

export type LearningCourse = {
  id: string;
  code: string;
  title: string;
  curriculum?: string;
  instructor: string | null;
  duration: string | null;
  status: CourseStatus;
  thumbnail: string;
};

export const IMPORTANT_COURSES: LearningCourse[] = [
  {
    id: '1',
    code: 'FRT_KHCN_T92025',
    title: 'Nội dung đào tạo trực tuyến Tân tuyển - FRT KHCN',
    curriculum: undefined,
    instructor: null,
    duration: null,
    status: 'prereq-unmet',
    thumbnail: '',
  },
  {
    id: 'camket',
    code: 'FRT_Camket',
    title: 'Cam kết đào tạo Chương trình tân tuyển nhân viên mới "BEING A NEW MBER - JOURNEY IN 50 HOURS"',
    curriculum: 'Chương trình đào tạo Tân tuyển',
    instructor: null,
    duration: null,
    status: 'start',
    thumbnail: '',
  },
  {
    id: '2',
    code: 'BAO_HIEM_T92024',
    title: 'Bảo hiểm',
    curriculum: 'Chương trình đào tạo nhân viên MBBank',
    instructor: 'Có giảng viên hướng dẫn',
    duration: '4 giờ 0 phút',
    status: 'none',
    thumbnail: '',
  },
  {
    id: '3',
    code: 'COMBO_TK_T82024',
    title: 'Combo: Tài khoản, App, Thẻ, Viet QR',
    curriculum: 'Chương trình đào tạo nhân viên MBBank',
    instructor: 'Có giảng viên hướng dẫn',
    duration: '4 giờ 0 phút',
    status: 'none',
    thumbnail: '',
  },
  {
    id: '4',
    code: 'HIEU_MB_T72024',
    title: 'Hiểu về MB',
    curriculum: 'Chương trình đào tạo nhân viên MBBank',
    instructor: 'Có giảng viên hướng dẫn',
    duration: '4 giờ 0 phút',
    status: 'none',
    thumbnail: '',
  },
  {
    id: '5',
    code: 'HIEU_VAITRO_T72024',
    title: 'Hiểu về vai trò',
    curriculum: 'Chương trình đào tạo nhân viên MBBank',
    instructor: 'Có giảng viên hướng dẫn',
    duration: '4 giờ 0 phút',
    status: 'none',
    thumbnail: '',
  },
  {
    id: '6',
    code: 'FRT_LLBKHCN_T62024',
    title: 'Nội dung trực tuyến FRT - LLBKHCN',
    curriculum: 'Chương trình đào tạo nhân viên MBBank',
    instructor: null,
    duration: null,
    status: 'prereq-met',
    thumbnail: '',
  },
  {
    id: '7',
    code: 'KNGT_KH_T52024',
    title: 'Kỹ năng giao tiếp khách hàng chuyên nghiệp',
    curriculum: 'Chương trình phát triển kỹ năng MBBank',
    instructor: 'Có giảng viên hướng dẫn',
    duration: '3 giờ 0 phút',
    status: 'prereq-met',
    thumbnail: '',
  },
  {
    id: '8',
    code: 'QLRR_TD_T42024',
    title: 'Quản lý rủi ro tín dụng cơ bản',
    curriculum: undefined,
    instructor: null,
    duration: null,
    status: 'prereq-unmet',
    thumbnail: '',
  },
  {
    id: '9',
    code: 'TUAN_THU_T32024',
    title: 'Tuân thủ và đạo đức nghề nghiệp',
    curriculum: 'Chương trình tuân thủ MBBank',
    instructor: 'Có giảng viên hướng dẫn',
    duration: '2 giờ 30 phút',
    status: 'none',
    thumbnail: '',
  },
  {
    id: '10',
    code: 'ATTT_BD_T22024',
    title: 'An toàn thông tin và bảo mật dữ liệu',
    curriculum: 'Chương trình an ninh mạng',
    instructor: null,
    duration: null,
    status: 'prereq-unmet',
    thumbnail: '',
  },
  {
    id: '11',
    code: 'CDSO_CNTC_T12024',
    title: 'Chuyển đổi số và công nghệ tài chính',
    curriculum: 'Chương trình Fintech MBBank',
    instructor: 'Có giảng viên hướng dẫn',
    duration: '5 giờ 0 phút',
    status: 'prereq-met',
    thumbnail: '',
  },
];

export const LEARNING_BANNER_BG =
  'https://hcm44.sapsf.com/verp/vmod_v1/ui/learning-homepage/resources_5.45.4/images/default_banner.webp';
