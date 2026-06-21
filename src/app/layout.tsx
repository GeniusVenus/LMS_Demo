import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import MBNavbar from '@/components/app/MBNavbar';
import ModeToggle from '@/components/app/ModeToggle';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Trang chủ - SAP SuccessFactors',
  description: 'Trang chủ - SAP SuccessFactors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="overflow-x-hidden antialiased">
        <NextTopLoader color="#1565c0" showSpinner={false} />
        <TooltipProvider delayDuration={150}>
          <MBNavbar />
          {children}
        </TooltipProvider>
        <ModeToggle />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
