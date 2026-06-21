import ReminderCard from '@/components/features/home/ReminderCard';
import GreetingBanner from '@/components/features/home/GreetingBanner';
import UpdatesSection from '@/components/features/home/UpdatesSection';
import CourseSectionAfterMode from '@/components/features/home/CourseSectionAfterMode';

export default function HomePage() {
  return (
    <main className="mx-auto px-12 py-5" style={{ maxWidth: '1536px' }}>
      <ReminderCard />
      <GreetingBanner />
      <UpdatesSection />
      <CourseSectionAfterMode />
      <div className="mt-4 flex justify-center">
        <button
          className="rounded-lg border px-6 py-2 text-sm font-bold"
          style={{
            borderColor: 'rgb(0, 100, 217)',
            color: 'rgb(0, 100, 217)',
            backgroundColor: '#ffffff',
          }}
        >
          Cá nhân hóa trải nghiệm trang chủ của bạn
        </button>
      </div>
    </main>
  );
}
