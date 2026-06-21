import { LEARNING_BANNER_BG } from '@/constants/learning';

export default function LearningBanner() {
  return (
    <div
      className="flex w-full items-stretch"
      style={{
        height: '280px',
        backgroundImage: `url('${LEARNING_BANNER_BG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="flex flex-col justify-center"
        style={{
          marginLeft: '48px',
          padding: '0 16px',
          height: '280px',
          maxWidth: '380px',
          backgroundColor: 'rgba(255, 255, 255, 0.76)',
          textAlign: 'left',
        }}
      >
        <h2
          className="mb-2 font-bold leading-snug"
          style={{ color: '#000000', fontSize: '24px' }}
        >
          Khám phá, học tập và giải phóng toàn bộ tiềm năng của bạn
        </h2>
        <p style={{ color: '#000000', fontSize: '14px' }}>
          Đạt được mục tiêu của bạn và thành thạo các kỹ năng mới. Bất cứ lúc nào, bất cứ ở đâu.
        </p>
      </div>
    </div>
  );
}
