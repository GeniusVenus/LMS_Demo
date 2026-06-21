export type PrerequisiteCourse = {
  title: string;
  type: string;
  libraryStatus: string;
};

export type ChapterItem = {
  id: string;
  label: string;
  indent: number; // 0 = section heading, 1 = sub-item, 2 = leaf
};

export type CourseChapter = {
  id: string;
  title: string;
  items: ChapterItem[];
};

export type CourseDetailData = {
  courseId: string;
  courseType: string;
  prereqStatus: 'unmet' | 'met' | 'none';
  price: string;
  version: string;
  versionDate: string;
  assignedBy: string;
  assignedDate: string;
  prerequisites: PrerequisiteCourse[];
  chapters: CourseChapter[];
};

const COURSE_DETAILS: Record<string, CourseDetailData> = {
  '1': {
    courseId: '1',
    courseType: 'Khoá học không có giảng viên hướng dẫn',
    prereqStatus: 'unmet',
    price: 'Miễn phí',
    version: 'Phiên bản 1',
    versionDate: '05/09/2025',
    assignedBy: 'Quản trị viên',
    assignedDate: '20/06/2026',
    prerequisites: [
      {
        title: 'Cam kết CTĐT "Being a new MBer - Journey in 50 hours" 2026',
        type: 'Khoá học không có giảng viên hướng dẫn',
        libraryStatus: 'Không có trong thư viện của bạn',
      },
    ],
    chapters: [
      {
        id: 'ch1',
        title: 'CHẶNG 1: HIỂU VỀ MB',
        items: [
          { id: 'i1', label: '1. Hiểu về MB:', indent: 0 },
          { id: 'i1-1', label: '1.1. Văn hóa MB', indent: 1 },
          { id: 'i1-1-1', label: 'Chương 1', indent: 2 },
          { id: 'i1-1-2', label: 'Chương 2', indent: 2 },
          { id: 'i1-1-3', label: 'Chương 3', indent: 2 },
          { id: 'i1-1-4', label: 'Key takeaway MB', indent: 2 },
          { id: 'i1-2', label: '1.2. Năng lực chiến lược', indent: 1 },
          { id: 'i1-2-1', label: '1.2.1. Năng lực chiến lược Cấp độ 1', indent: 2 },
          { id: 'i1-2-2', label: '1.2.2. Năng lực chiến lược Cấp độ 2', indent: 2 },
          { id: 'i1-3', label: '1.3. 6 giá trị cốt lõi', indent: 1 },
          { id: 'i1-3-1', label: '6 giá trị cốt lõi', indent: 2 },
          { id: 'i1-4', label: '2. Cây sản phẩm tại MB:', indent: 0 },
          { id: 'i1-4-1', label: '2.1. Sản phẩm huy động vốn', indent: 1 },
          { id: 'i1-4-2', label: '2.2. Sản phẩm tín dụng', indent: 1 },
          { id: 'i1-4-3', label: '2.3. Sản phẩm dịch vụ', indent: 1 },
        ],
      },
      {
        id: 'ch2',
        title: 'CHẶNG 2: HIỂU VỀ VAI TRÒ',
        items: [
          { id: 'i2-1', label: '1. Hiểu về vai trò và trách nhiệm:', indent: 0 },
          { id: 'i2-1-1', label: '1.1. Mô tả công việc', indent: 1 },
          { id: 'i2-1-2', label: '1.2. KPI và chỉ tiêu', indent: 1 },
          { id: 'i2-2', label: '2. Quy trình và quy định:', indent: 0 },
          { id: 'i2-2-1', label: '2.1. Quy trình bán hàng', indent: 1 },
          { id: 'i2-2-2', label: '2.2. Quy định tuân thủ', indent: 1 },
          { id: 'i2-2-3', label: '2.3. Đạo đức nghề nghiệp', indent: 1 },
        ],
      },
      {
        id: 'ch3',
        title: 'CHẶNG 3: HIỂU VÀ BIẾT CÁCH THỰC HIỆN CÁC CÔNG VIỆC CHÍNH TẠI VỊ TRÍ CHỨC DANH',
        items: [
          { id: 'i3-1', label: '1. Kỹ năng chuyên môn:', indent: 0 },
          { id: 'i3-1-1', label: '1.1. Kỹ năng tư vấn khách hàng', indent: 1 },
          { id: 'i3-1-2', label: '1.2. Kỹ năng phân tích nhu cầu', indent: 1 },
          { id: 'i3-1-3', label: '1.3. Kỹ năng đàm phán', indent: 1 },
          { id: 'i3-2', label: '2. Thực hành nghiệp vụ:', indent: 0 },
          { id: 'i3-2-1', label: '2.1. Case study thực tế', indent: 1 },
          { id: 'i3-2-2', label: '2.2. Bài tập tình huống', indent: 1 },
          { id: 'i3-2-3', label: '2.3. Kiểm tra đánh giá', indent: 1 },
        ],
      },
    ],
  },
};

export function getCourseDetail(courseId: string): CourseDetailData {
  return (
    COURSE_DETAILS[courseId] ?? {
      courseId,
      courseType: 'Khoá học Online',
      prereqStatus: 'none',
      price: 'Miễn phí',
      version: 'Phiên bản 1',
      versionDate: '01/01/2025',
      assignedBy: 'Quản trị viên',
      assignedDate: '20/06/2026',
      prerequisites: [],
      chapters: [],
    }
  );
}
