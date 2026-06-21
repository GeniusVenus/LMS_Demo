import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl font-bold" style={{ color: '#1565c0' }}>
        404
      </p>
      <h1 className="text-xl font-semibold">Không tìm thấy trang</h1>
      <p className="text-gray-500">Trang bạn tìm không tồn tại hoặc đã được di chuyển.</p>
      <Button asChild className="mt-2">
        <Link href="/">Về trang chủ</Link>
      </Button>
    </main>
  );
}
