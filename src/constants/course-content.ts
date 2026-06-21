export type ContentItemType = 'section' | 'lesson';

export type ContentItem = {
  id: string;
  label: string;
  type: ContentItemType;
  indent: number;
  locked?: boolean;
  done?: boolean;
};

export type ContentChapter = {
  id: string;
  title: string;
  count: number;
  items: ContentItem[];
};

export type CourseContent = {
  courseId: string;
  title: string;
  code: string;
  chapters: ContentChapter[];
  firstLessonId: string;
  firstLessonLabel: string;
};

const CONTENT_DATA: Record<string, CourseContent> = {
  '1': {
    courseId: '1',
    title: 'Nội dung đào tạo trực tuyến Tân tuyển - FRT KHCN',
    code: 'FRT_KHCN_Online',
    firstLessonId: 'l1-1-1',
    firstLessonLabel: '1.1.1. Tóm tắt bài học văn hóa MB',
    chapters: [
      {
        id: 'ch1',
        title: 'I. CHẶNG 1: HIỂU VỀ TỔ CHỨC',
        count: 33,
        items: [
          { id: 's1', label: '1. Hiểu về MB', type: 'section', indent: 0 },
          { id: 's1-1', label: '1.1 Về MB', type: 'section', indent: 1 },
          { id: 'l1-1-1', label: '1.1.1. Tóm tắt bài học văn hóa MB', type: 'lesson', indent: 2, done: true },
          { id: 'l1-1-2', label: '1.1.2. Văn hóa MB', type: 'lesson', indent: 2 },
          { id: 'l1-1-3', label: '1.1.3. Key Takeaways Văn hóa MB', type: 'lesson', indent: 2 },
          { id: 's1-2', label: '1.2. Năng lực chiến lược', type: 'section', indent: 1, locked: true },
          { id: 'l1-2-1', label: '1.2.1. Năng lực chiến lược Cấp độ 1', type: 'lesson', indent: 2, locked: true },
          { id: 'l1-2-2', label: '1.2.2. Năng lực chiến lược Cấp độ 2', type: 'lesson', indent: 2, locked: true },
          { id: 's1-3', label: '1.3. 6 giá trị cốt lõi', type: 'section', indent: 1, locked: true },
          { id: 'l1-3-1', label: '6 giá trị cốt lõi', type: 'lesson', indent: 2, locked: true },
          { id: 's2', label: '2. Cây sản phẩm tại MB', type: 'section', indent: 0 },
          { id: 'l2-1', label: 'Cây sản phẩm, dịch vụ MB', type: 'lesson', indent: 1 },
          { id: 's3', label: '3. Các ứng dụng hỗ trợ công việc tại MB (Outlook, MS Teams)', type: 'section', indent: 0, locked: true },
          { id: 'l3-1', label: '3.1. Micorosoft Teams', type: 'lesson', indent: 1, locked: true },
        ],
      },
      {
        id: 'ch2',
        title: 'II. CHẶNG 2: HIỂU VỀ VAI TRÒ',
        count: 15,
        items: [
          { id: 's4', label: '1. Hiểu về vai trò và trách nhiệm', type: 'section', indent: 0, locked: true },
          { id: 'l4-1', label: '1.1. Mô tả công việc', type: 'lesson', indent: 1, locked: true },
          { id: 'l4-2', label: '1.2. KPI và chỉ tiêu', type: 'lesson', indent: 1, locked: true },
          { id: 's5', label: '2. Quy trình và quy định', type: 'section', indent: 0, locked: true },
          { id: 'l5-1', label: '2.1. Quy trình bán hàng', type: 'lesson', indent: 1, locked: true },
          { id: 'l5-2', label: '2.2. Quy định tuân thủ', type: 'lesson', indent: 1, locked: true },
        ],
      },
      {
        id: 'ch3',
        title: 'III. CHẶNG 3: HIỂU VÀ BIẾT CÁCH THỰC HIỆN CÁC CÔNG VIỆC CHÍNH TẠI VỊ TRÍ CHỨC DANH',
        count: 12,
        items: [
          { id: 's6', label: '1. Kỹ năng chuyên môn', type: 'section', indent: 0, locked: true },
          { id: 'l6-1', label: '1.1. Kỹ năng tư vấn khách hàng', type: 'lesson', indent: 1, locked: true },
          { id: 'l6-2', label: '1.2. Kỹ năng phân tích nhu cầu', type: 'lesson', indent: 1, locked: true },
          { id: 'l6-3', label: '1.3. Kỹ năng đàm phán', type: 'lesson', indent: 1, locked: true },
          { id: 's7', label: '2. Thực hành nghiệp vụ', type: 'section', indent: 0, locked: true },
          { id: 'l7-1', label: '2.1. Case study thực tế', type: 'lesson', indent: 1, locked: true },
          { id: 'l7-2', label: '2.2. Bài tập tình huống', type: 'lesson', indent: 1, locked: true },
          { id: 'l7-3', label: '2.3. Kiểm tra đánh giá', type: 'lesson', indent: 1, locked: true },
        ],
      },
    ],
  },
};

export function getCourseContent(courseId: string): CourseContent | null {
  return CONTENT_DATA[courseId] ?? null;
}
