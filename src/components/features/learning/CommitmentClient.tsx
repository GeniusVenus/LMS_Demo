'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Maximize2, AlertTriangle, Clock } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

const BTN_BLUE = 'rgb(0, 70, 180)';
const HEADER_DARK = '#1a237e';

type Phase = 'info' | 'quiz' | 'success';
type ModalKind = 'warning' | 'confirm-submit' | 'completed' | null;

function useCountdown(running: boolean) {
  const [secs, setSecs] = useState(30 * 60);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);
  const mm = Math.floor(secs / 60).toString().padStart(2, '0');
  const ss = (secs % 60).toString().padStart(2, '0');
  return `00:${mm}:${ss}`;
}

export default function CommitmentClient() {
  const router = useRouter();
  const { mode, setCommitmentDone } = useAppStore();
  const isAfter = mode === 'after';

  const [phase, setPhase] = useState<Phase>('info');
  const [modal, setModal] = useState<ModalKind>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const timer = useCountdown(phase === 'quiz');

  const handleConfirmSubmit = () => {
    setCommitmentDone();
    setPhase('success');
    setModal(null);
  };

  const handleStart = () => {
    if (isAfter) {
      // After mode: skip warning modal, go straight to quiz
      setPhase('quiz');
    } else {
      setModal('warning');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb + title */}
      <div className="px-12 pt-5">
        <div className="mb-2 flex items-center gap-1 text-sm">
          <Link href="/learn" className="hover:underline" style={{ color: BTN_BLUE }}>
            Hoạt động học tập
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Cam kết đào tạo</span>
        </div>
        <h1 className="mb-1 text-2xl font-bold text-gray-900">
          Cam kết đào tạo Chương trình tân tuyển nhân viên mới &ldquo;BEING A NEW MBER - JOURNEY IN
          50 HOURS&rdquo;
        </h1>
        <p className="mb-4 text-sm text-gray-500">FRT_Camket</p>
      </div>

      {/* Blue action bar */}
      <div
        className="flex items-center justify-between px-12 py-2.5"
        style={{ backgroundColor: HEADER_DARK }}
      >
        <span className="text-sm font-semibold text-white">Cam kết đào tạo FRT 117</span>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-bold text-white transition-all hover:bg-white/10"
            style={{
              borderColor: 'rgba(255,255,255,0.4)',
              opacity: phase === 'success' ? 1 : 0.45,
              cursor: phase === 'success' ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (phase !== 'success') return;
              if (isAfter) {
                router.push('/learn/courses/1');
              } else {
                setModal('completed');
              }
            }}
          >
            <ShieldCheck className="size-3.5" />
            Xác thực hoàn tất
          </button>
          <Maximize2 className="size-4 cursor-pointer text-white/60 hover:text-white" />
        </div>
      </div>

      {/* Content area */}
      <div className="min-h-[60vh]" style={{ backgroundColor: '#f3f4f6' }}>
        {/* Phase: info */}
        {phase === 'info' && (
          <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
            <div className="max-w-lg text-center">
              <p className="mb-4 text-sm leading-relaxed text-gray-700">
                Các câu hỏi trong Bài thi được sắp xếp theo thứ tự và bạn phải trả lời từng câu hỏi
                theo một trình tự nhất định. Hãy xem xét câu trả lời một cách cẩn thận; một khi
                chuyển sang câu hỏi tiếp theo, bạn sẽ không thể trở lại câu hỏi trước.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-gray-700">
                Đây là khóa học có giá trị 10 triệu đồng. Học viên cần thực hiện ký cam kết online
                bằng cách xác nhận câu trả lời trong bài kiểm tra sau đây
              </p>
              <p className="mb-8 text-sm leading-relaxed text-gray-700">
                Bài kiểm tra này có quy định thời gian. Bạn có 00:30:00 (giờ:phút:giây) để hoàn
                thành bài kiểm tra. Thời gian của bạn sẽ bắt đầu sau khi bạn nhấp vào nút bắt đầu.
              </p>
              <button
                className="cursor-pointer rounded px-8 py-2 text-sm font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: BTN_BLUE }}
                onClick={handleStart}
              >
                Bắt đầu
              </button>
            </div>
          </div>
        )}

        {/* Phase: quiz */}
        {phase === 'quiz' && (
          <div>
            {/* Progress + timer strip */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-12 py-2.5">
              <div className="flex flex-1 items-center gap-4 pr-8">
                <span className="shrink-0 text-xs text-gray-600">
                  0 / 1 câu hỏi đã được trả lời
                </span>
                <div className="h-1.5 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: selected !== null ? '100%' : '0%', backgroundColor: BTN_BLUE }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Clock className="size-3.5" />
                <span className="font-mono">{timer}</span>
              </div>
            </div>

            {/* Question card */}
            <div className="flex justify-center px-4 py-8">
              <div className="w-full max-w-2xl bg-white p-8 shadow-sm">
                <p className="mb-2 text-sm font-bold text-gray-900">Câu hỏi 1</p>
                <p className="mb-5 text-sm leading-relaxed text-gray-700">
                  Anh/Chị vui lòng đọc kỹ thông tin trong Bản cam kết và tích chọn Đồng ý để xác
                  nhận tham gia Chương trình:
                </p>

                {/* Document placeholder */}
                <div
                  className="mb-6 flex items-center justify-center rounded border border-gray-200"
                  style={{ height: 180, backgroundColor: '#fafafa' }}
                >
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-14 w-11 flex-col justify-center gap-1 rounded border border-gray-300 bg-white px-2 shadow-sm">
                      <div className="h-0.5 rounded bg-gray-300" />
                      <div className="h-0.5 rounded bg-gray-300" />
                      <div className="h-0.5 w-2/3 rounded bg-gray-300" />
                    </div>
                    <p className="text-xs text-gray-400">Bản cam kết</p>
                  </div>
                </div>

                {/* Radio options */}
                <div className="space-y-4">
                  {[
                    'Tôi đồng ý xác nhận tham dự chương trình và tuân thủ các yêu cầu cam kết trên',
                    'Tôi không thể tham dự chương trình (Anh/Chị vui lòng chuyển thông tin đầu mối đào tạo Đơn vị do tôi đề xuất đầu mới dungntt.ap@mbbank.com.vn, lưu ý có cc Lãnh đạo Đơn vị)',
                  ].map((opt, i) => (
                    <label key={i} className="flex cursor-pointer items-start gap-3">
                      <input
                        type="radio"
                        name="q1"
                        checked={selected === i}
                        onChange={() => setSelected(i)}
                        className="mt-0.5 cursor-pointer"
                        style={{ accentColor: BTN_BLUE }}
                      />
                      <span className="text-sm leading-relaxed text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-end px-12 pb-8">
              <button
                className="rounded px-6 py-2 text-sm font-semibold text-white transition-opacity"
                style={{
                  backgroundColor: selected !== null ? BTN_BLUE : '#9ca3af',
                  cursor: selected !== null ? 'pointer' : 'default',
                }}
                disabled={selected === null}
                onClick={() => selected !== null && setModal('confirm-submit')}
              >
                Gửi bài kiểm tra
              </button>
            </div>
          </div>
        )}

        {/* Phase: success */}
        {phase === 'success' && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <p className="mb-5 text-sm text-gray-700">
                Chúc mừng anh/chị đã hoàn thành cam kết đào tạo, vui lòng hoàn thành các nội dung
                tiếp theo
              </p>
              {isAfter ? (
                /* After mode: "Hoàn tất" button directly below congratulation */
                <button
                  className="cursor-pointer rounded px-8 py-2 text-sm font-semibold text-white hover:opacity-90"
                  style={{ backgroundColor: BTN_BLUE }}
                  onClick={() => router.push('/learn/courses/1')}
                >
                  Hoàn tất
                </button>
              ) : (
                <button
                  className="cursor-pointer rounded px-6 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: '#9ca3af' }}
                >
                  Thử lại
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal: warning (Before mode only) */}
      {modal === 'warning' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
          <div className="w-full max-w-sm rounded bg-white p-6 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="size-5 shrink-0 text-amber-500" />
              <h2 className="font-bold text-gray-900">CẢNH BÁO</h2>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-gray-700">
              Nếu bạn thoát hoặc làm mới trang trước khi gửi đánh giá, điều này có thể dẫn đến việc
              không hoàn tất hoặc thử bị thất bại.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="cursor-pointer rounded border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setModal(null)}
              >
                Hủy
              </button>
              <button
                className="cursor-pointer rounded px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: BTN_BLUE }}
                onClick={() => {
                  setModal(null);
                  setPhase('quiz');
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: confirm submit */}
      {modal === 'confirm-submit' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
          <div className="w-full max-w-sm rounded bg-white p-6 shadow-xl">
            <h2 className="mb-3 font-bold text-gray-900">Xác nhận gửi bài kiểm tra</h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-700">
              Sau khi bạn gửi bài kiểm tra này, bạn sẽ không được phép thay đổi trả lời của bạn và
              bài kiểm tra sẽ được chấm điểm. Bạn có muốn tiếp tục không?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="cursor-pointer rounded border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setModal(null)}
              >
                Không
              </button>
              <button
                className="cursor-pointer rounded px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: BTN_BLUE }}
                onClick={handleConfirmSubmit}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: completed (Before mode only) */}
      {modal === 'completed' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl">
            <div
              className="flex items-center justify-center py-3"
              style={{ backgroundColor: BTN_BLUE }}
            >
              <span className="text-sm font-semibold text-white">Đã Hoàn thành</span>
            </div>
            <div className="flex flex-col items-center px-6 py-8 text-center">
              <div
                className="mb-4"
                style={
                  {
                    '--sapContent_Illustrative_Color2': '#5b8fd9',
                    '--sapContent_Illustrative_Color3': '#2d6db4',
                    '--sapContent_Illustrative_Color7': '#ebf4fb',
                    '--sapContent_Illustrative_Color8': '#c5e2f5',
                    '--sapContent_Illustrative_Color12': '#0e8a6e',
                    '--sapContent_Illustrative_Color13': '#7cc4b8',
                    '--sapContent_Illustrative_Color14': '#0f6ab5',
                    '--sapContent_Illustrative_Color18': '#ccd6e0',
                    '--sapContent_Illustrative_Color19': '#aab8c8',
                  } as React.CSSProperties
                }
              >
                <svg width="120" height="120" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="cmask0" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
                    <circle cx="64" cy="64" r="64" fill="var(--sapContent_Illustrative_Color7)" />
                  </mask>
                  <g mask="url(#cmask0)">
                    <path d="M181.139 -59.3584H-65.9228C-67.5332 -59.36 -69.1281 -59.022 -70.6163 -58.3636C-72.1045 -57.7053 -73.4569 -56.7396 -74.5962 -55.5218C-75.7354 -54.3039 -76.6392 -52.8577 -77.2558 -51.2659C-77.8724 -49.6741 -78.1898 -47.9679 -78.1898 -46.2447V109.145C-78.1898 112.627 -76.8974 115.965 -74.5969 118.427C-72.2964 120.888 -69.1762 122.271 -65.9228 122.271H181.139C184.392 122.271 187.512 120.888 189.813 118.427C192.113 115.965 193.406 112.627 193.406 109.145V-46.2447C193.406 -49.6741 193.088 -51.2659 192.472 -51.2659C191.855 -52.8577 190.951 -54.3039 189.812 -55.5218C188.673 -56.7396 187.32 -57.7053 185.832 -58.3636C184.344 -59.022 182.749 -59.36 181.139 -59.3584Z" fill="var(--sapContent_Illustrative_Color7)" />
                    <rect x="-51.0303" y="99.3552" width="73.5398" height="11.0336" rx="3.39494" fill="var(--sapContent_Illustrative_Color19)" />
                    <rect x="16.2508" y="99.3552" width="162.726" height="11.0336" rx="3.39494" fill="var(--sapContent_Illustrative_Color18)" />
                    <rect width="37.5566" height="5.72897" rx="2.54621" transform="matrix(-1 0 0 1 61.1355 93.3743)" fill="var(--sapContent_Illustrative_Color14)" />
                    <path d="M51.5679 97.5023L49.041 93.3743H139.431V97.0792C139.431 97.346 139.386 97.6101 139.296 97.8564C139.207 98.1027 139.077 98.3264 138.912 98.5145C138.748 98.7026 138.552 98.8514 138.338 98.9524C138.123 99.0535 137.893 99.1047 137.661 99.1032H54.2539C53.7272 99.1045 53.2079 98.9597 52.7403 98.681C52.2727 98.4022 51.8705 97.9979 51.5679 97.5023Z" fill="var(--sapContent_Illustrative_Color13)" />
                    <path d="M100.762 35.4488H14.1676C13.8618 35.4403 13.558 35.5017 13.2799 35.6283C13.0019 35.7549 12.7571 35.9433 12.5645 36.1788C12.372 36.4143 12.2368 36.6905 12.1696 36.9862C12.1024 37.2818 12.1049 37.5888 12.177 37.8833L23.703 91.7769C23.8007 92.2282 24.0516 92.6327 24.4138 92.9232C24.7759 93.2137 25.2276 93.3726 25.6937 93.3736H111.293C111.596 93.381 111.896 93.3199 112.172 93.195C112.447 93.07 112.69 92.8845 112.882 92.6526C113.074 92.4207 113.21 92.1485 113.279 91.8567C113.349 91.5649 113.351 91.2612 113.284 90.9687L102.753 37.0849C102.673 36.6221 102.428 36.2029 102.063 35.903C101.698 35.603 101.237 35.4419 100.762 35.4488Z" fill="var(--sapContent_Illustrative_Color2)" />
                    <path d="M96.819 43.948C96.5186 42.3415 95.1162 41.177 93.4819 41.177H70.6981C68.6603 41.177 67.0816 42.9597 67.3281 44.9825L70.3786 70.0203C70.5862 71.7238 72.0324 73.0046 73.7486 73.0046H98.163C100.288 73.0046 101.891 71.0745 101.5 68.9857L96.819 43.948Z" fill="var(--sapContent_Illustrative_Color13)" />
                    <path d="M24.7282 47.5732L67.9222 47.7224L84.0441 47.7821C84.518 47.7752 84.9788 47.9378 85.3435 48.2405C85.7081 48.5432 85.9527 48.9661 86.0332 49.4332L90.4989 72.8468L92.8858 85.3891C92.9507 85.6836 92.9478 85.989 92.8774 86.2822C92.8069 86.5754 92.6708 86.8487 92.4792 87.0815C92.2875 87.3144 92.0455 87.5005 91.7713 87.6261C91.4972 87.7516 91.1981 87.8132 90.8967 87.8061H31.3819C30.9083 87.8004 30.4513 87.6308 30.0886 87.3262C29.7259 87.0215 29.4801 86.6006 29.3928 86.1351L22.7391 49.9803C22.6854 49.6876 22.6964 49.3867 22.7713 49.0987C22.8462 48.8107 22.9833 48.5426 23.1728 48.3132C23.3624 48.0839 23.5999 47.8988 23.8686 47.7709C24.1373 47.6431 24.4307 47.5756 24.7282 47.5732Z" fill="var(--sapContent_Illustrative_Color8)" />
                    <path d="M56.8944 50.7269C49.7411 53.6814 44.2446 59.7112 44.8912 67.0885C45.5379 74.4658 52.0763 80.4956 59.4449 80.4956C66.8136 80.4956 72.3022 74.4618 71.6595 67.0885C71.0169 59.7152 64.4625 53.6814 57.1018 53.6814C55.1248 53.6516 53.1637 54.0384 51.3437 54.8171C49.5237 55.5957 47.8917 56.7469 46.5494 58.1974C45.2156 59.6756 44.2065 61.4179 43.5875 63.3116C42.9679 65.2054 42.7571 67.1942 42.9611 69.162C43.7156 77.7669 51.3158 84.7563 59.9139 84.7563C61.892 84.7241 63.854 84.3352 65.674 83.5566C67.494 82.7779 69.126 81.6267 70.4683 80.1762C71.8021 78.6981 72.8112 76.9557 73.4302 75.062C74.0487 73.1669 74.2595 71.1781 74.0555 69.2103C73.3129 61.6536 66.8808 55.0066 59.4449 53.6814C58.6128 53.5396 57.7553 53.6483 56.8944 50.7269Z" fill="var(--sapContent_Illustrative_Color3)" />
                    <path d="M57.1018 53.6814C49.7411 53.6814 44.2446 59.7112 44.8912 67.0885C45.5379 74.4658 52.0763 80.4956 59.4449 80.4956C66.8136 80.4956 72.3022 74.4618 71.6595 67.0885C71.0169 59.7152 64.4625 53.6814 57.1018 53.6814ZM64.2869 64.0016L56.9581 72.0467C56.8373 72.1736 56.6921 72.2746 56.5312 72.3436C56.3703 72.4126 56.1971 72.4482 56.0221 72.4482C55.847 72.4482 55.6738 72.4126 55.5129 72.3436C55.352 72.2746 55.2068 72.1736 55.086 72.0467L52.1761 69.3676C52.0084 69.1985 51.9062 68.9749 51.8882 68.7368C51.8701 68.4988 51.9375 68.2622 52.0784 68.0695C52.2193 67.8769 52.4241 67.7413 52.6558 67.688C52.8876 67.6346 53.1307 67.6672 53.3403 67.7797L55.7766 69.2317L62.2511 62.1263C62.3719 61.9994 62.5171 61.8984 62.678 61.8294C62.8389 61.7603 63.0121 61.7247 63.1872 61.7247C63.3622 61.7247 63.5354 61.7603 63.6963 61.8294C63.8572 61.8984 64.0024 61.9994 64.1232 62.1263C64.3914 62.4101 64.5394 62.787 64.5369 63.1783C64.5344 63.5696 64.3817 63.9445 64.1098 64.2248L64.2869 64.0016Z" fill="var(--sapContent_Illustrative_Color12)" />
                  </g>
                </svg>
              </div>
              <h2 className="mb-1 text-lg font-bold text-gray-900">Chúc mừng!</h2>
              <p className="mb-4 text-sm text-gray-500">Chúc mừng bạn đã hoàn thành khóa học.</p>
              <button className="mb-5 cursor-pointer rounded border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Đề xuất cho người khác
              </button>
              <div className="mt-4 flex w-full justify-end gap-2">
                <button
                  className="cursor-pointer rounded px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90"
                  style={{ backgroundColor: BTN_BLUE }}
                  onClick={() => router.push('/learn')}
                >
                  Truy cập học tập của tôi
                </button>
                <button className="cursor-pointer rounded border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  In chứng chỉ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
