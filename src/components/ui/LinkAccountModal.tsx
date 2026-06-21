import { FormEvent, useState } from 'react';

interface LinkAccountModalProps {
  email: string;
  onConfirm: (password: string) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * Modal hiện khi backend trả requirePassword: true (Branch B).
 * User nhập mật khẩu tài khoản hiện có để link với Google.
 */
export const LinkAccountModal = ({
  email,
  onConfirm,
  onCancel,
  isLoading = false,
}: LinkAccountModalProps): JSX.Element => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }
    setError('');
    try {
      await onConfirm(password);
    } catch {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="link-account-title"
    >
      {/* Card */}
      <div
        className="relative w-full max-w-[440px] mx-4 rounded-2xl border border-surface-tonal-tonal-a0 shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d1b2e 0%, #0a1222 100%)',
          boxShadow: '0 0 60px rgba(59,130,246,0.15)',
        }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-surface-tonal-tonal-a0">
          <div className="flex items-center gap-3 mb-3">
            {/* Google icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <h2
              id="link-account-title"
              className="text-white text-lg font-semibold [font-family:'HYWenHei-85W',Helvetica]"
            >
              Liên kết tài khoản Google
            </h2>
          </div>
          <p className="text-neutral-neutral-a50 text-sm leading-relaxed">
            Email{' '}
            <span className="text-secondary-secondary-a70 font-medium">
              {email}
            </span>{' '}
            đã có tài khoản trong hệ thống.
            <br />
            Nhập mật khẩu để liên kết với Google và đăng nhập ngay.
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5">
          <div className="relative">
            <div className="relative h-14 bg-surface-tonal-tonal-a10 rounded-[10px] border border-surface-tonal-tonal-a0 shadow-[1px_4px_4px_#0c24ac] overflow-hidden">
              <input
                id="link-account-password"
                type="password"
                autoComplete="current-password"
                aria-label="Mật khẩu"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                maxLength={128}
                className="peer absolute inset-0 z-10 h-full w-full rounded-[10px] px-6 pt-[18px] pb-2 text-base [font-family:'HYWenHei-85W',Helvetica] text-neutral-neutral-a50 caret-secondary-secondary-a70 bg-transparent border-0 outline-none disabled:opacity-50"
              />
              <label
                htmlFor="link-account-password"
                className="absolute top-[19px] left-6 [font-family:'HYWenHei-85W',Helvetica] text-neutral-neutral-a50 text-base pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0"
              >
                Mật khẩu
              </label>
            </div>
            {error && (
              <p className="mt-1.5 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 h-11 rounded-full border border-surface-tonal-tonal-a0 text-neutral-neutral-a50 [font-family:'HYWenHei-85W',Helvetica] text-sm hover:text-white hover:border-white transition-colors disabled:opacity-40 cursor-pointer"
            >
              Huỷ
            </button>
            <button
              type="submit"
              id="btn-link-account-confirm"
              disabled={isLoading || !password}
              className="flex-1 h-11 rounded-full bg-secondary-secondary-a90 text-secondary-secondary-a30 [font-family:'HYWenHei-85W',Helvetica] text-sm font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                'Xác nhận & Liên kết'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkAccountModal;
