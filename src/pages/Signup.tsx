import { FormEvent, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { googleLogin, login, register, saveAuthToken } from '@/api/authService';
import { LinkAccountModal } from '@/components/ui/LinkAccountModal';

type FormField = {
  id: 'email' | 'username' | 'password' | 'confirmPassword';
  label: string;
  type: 'email' | 'text' | 'password';
  autoComplete: string;
};

const signUpFields: FormField[] = [
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { id: 'username', label: 'Username', type: 'text', autoComplete: 'username' },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'new-password',
  },
  {
    id: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    autoComplete: 'new-password',
  },
];

const signInFields: FormField[] = [
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
  },
];

export const PcSignup = (): JSX.Element => {
  const formId = useId();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Loading / error state cho form thường
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Google OAuth state
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');

  // Branch B: link account modal state
  const [linkModal, setLinkModal] = useState<{
    visible: boolean;
    email: string;
    idToken: string;
  }>({ visible: false, email: '', idToken: '' });
  const [linkLoading, setLinkLoading] = useState(false);

  // ─── Form Submit (register / login thường) ────────────────────────────
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = formData;
    setFormError('');

    if (activeTab === 'signup') {
      if (!email.trim() || !username.trim() || !password || !confirmPassword) {
        setFormError('Vui lòng nhập đầy đủ tất cả các trường!');
        return;
      }
      if (!email.includes('@')) {
        setFormError('Email không hợp lệ!');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Mật khẩu xác nhận không khớp!');
        return;
      }

      setIsLoading(true);
      try {
        await register(username, email, password);
        navigate('/survey');
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Đăng ký thất bại. Vui lòng thử lại.';
        setFormError(msg);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!email.trim() || !password) {
        setFormError('Vui lòng nhập đầy đủ Email và Mật khẩu!');
        return;
      }
      if (!email.includes('@')) {
        setFormError('Email không hợp lệ!');
        return;
      }

      setIsLoading(true);
      try {
        const res = await login(email, password);
        saveAuthToken(res.token);
        navigate('/dashboard');
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Email hoặc mật khẩu không chính xác.';
        setFormError(msg);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ─── Google Sign-In ────────────────────────────────────────────────────
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    const idToken = credentialResponse.credential;
    if (!idToken) return;

    setGoogleError('');
    setGoogleLoading(true);
    try {
      const res = await googleLogin(idToken);

      if (res.requirePassword && res.email) {
        // Branch B: tài khoản email đã tồn tại → hiện modal
        setLinkModal({ visible: true, email: res.email, idToken });
        return;
      }

      if (res.token) {
        // Branch A hoặc C: đăng nhập thành công
        saveAuthToken(res.token);
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Đăng nhập Google thất bại.';
      setGoogleError(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setGoogleError('Đăng nhập Google thất bại. Vui lòng thử lại.');
  };

  // ─── Link Account (Branch B confirm) ──────────────────────────────────
  const handleLinkConfirm = async (password: string) => {
    setLinkLoading(true);
    try {
      const res = await googleLogin(linkModal.idToken, password);
      if (res.token) {
        saveAuthToken(res.token);
        setLinkModal({ visible: false, email: '', idToken: '' });
        navigate('/dashboard');
      }
    } finally {
      setLinkLoading(false);
    }
  };

  const handleLinkCancel = () => {
    setLinkModal({ visible: false, email: '', idToken: '' });
  };

  // ─── Tab click ─────────────────────────────────────────────────────────
  const handleTabClick = (tab: 'signup' | 'signin') => {
    if (activeTab === tab) {
      const formElement = document.getElementById(
        formId,
      ) as HTMLFormElement | null;
      if (formElement) {
        formElement.requestSubmit();
      }
    } else {
      setActiveTab(tab);
      setFormError('');
      setGoogleError('');
    }
  };

  const fields = activeTab === 'signup' ? signUpFields : signInFields;

  return (
    <>
      {/* Branch B modal */}
      {linkModal.visible && (
        <LinkAccountModal
          email={linkModal.email}
          onConfirm={handleLinkConfirm}
          onCancel={handleLinkCancel}
          isLoading={linkLoading}
        />
      )}

      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
        {/* Title */}
        <header className="flex justify-center items-center">
          <h1 className="text-[#e0e0e0] text-6xl [font-family:'HYWenHei-85W',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
            {activeTab === 'signup' ? 'Sign Up' : 'Sign In'}
          </h1>
        </header>

        {/* Form */}
        <form
          id={formId}
          onSubmit={handleSubmit}
          className={`flex w-full max-w-[710px] relative mt-[60px] flex-col items-center gap-[60px] transition-all duration-300 ${
            activeTab === 'signup' ? 'h-[404px]' : 'h-[172px]'
          }`}
        >
          <button type="submit" className="hidden" />

          {fields.map((field) => {
            const inputId = `${formId}-${field.id}`;

            return (
              <div key={field.id} className="relative self-stretch w-full">
                <div className="relative w-full h-14 bg-surface-tonal-tonal-a10 rounded-[10px] overflow-hidden border border-solid border-surface-tonal-tonal-a0 shadow-[1px_4px_4px_#0c24ac]">
                  <input
                    id={inputId}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    aria-label={field.label}
                    placeholder=" "
                    value={formData[field.id as keyof typeof formData]}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        [field.id]: event.target.value,
                      }))
                    }
                    disabled={isLoading}
                    className="peer absolute inset-0 z-10 h-full w-full rounded-[10px] px-6 pt-[18px] pb-2 text-base [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 caret-secondary-secondary-a70 bg-transparent border-0 outline-none disabled:opacity-50"
                  />
                  <label
                    htmlFor={inputId}
                    className="absolute top-[19px] left-6 [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0"
                  >
                    {field.label}
                  </label>
                </div>

                {activeTab === 'signin' && field.id === 'password' && (
                  <div className="absolute right-0 mt-2">
                    <a
                      href="#forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/forget-password');
                      }}
                      className="text-neutral-neutral-a50/60 hover:text-secondary-secondary-a70 transition-colors text-sm [font-family:'HYWenHei-85W',Helvetica] underline cursor-pointer"
                    >
                      Forget Password
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </form>

        {/* Form error */}
        {formError && (
          <p
            className="mt-4 text-sm text-red-400 text-center [font-family:'HYWenHei-85W',Helvetica]"
            role="alert"
          >
            {formError}
          </p>
        )}

        {/* Divider + Google button */}
        <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-[710px]">
          {/* Divider */}
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-surface-tonal-tonal-a0" />
            <span className="text-neutral-neutral-a50/60 text-xs [font-family:'HYWenHei-85W',Helvetica] whitespace-nowrap">
              hoặc tiếp tục với
            </span>
            <div className="flex-1 h-px bg-surface-tonal-tonal-a0" />
          </div>

          {/* Google button */}
          <div
            style={{
              opacity: googleLoading ? 0.6 : 1,
              pointerEvents: googleLoading ? 'none' : 'auto',
              transition: 'opacity 0.2s',
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              theme="filled_black"
              shape="rectangular"
              size="large"
              text={activeTab === 'signup' ? 'signup_with' : 'signin_with'}
            />
          </div>

          {/* Google error */}
          {googleError && (
            <p
              className="text-sm text-red-400 text-center [font-family:'HYWenHei-85W',Helvetica]"
              role="alert"
            >
              {googleError}
            </p>
          )}

          {/* Loading indicator */}
          {googleLoading && (
            <p className="text-sm text-neutral-neutral-a50 [font-family:'HYWenHei-85W',Helvetica]">
              Đang xử lý...
            </p>
          )}
        </div>

        {/* Tab bar */}
        <nav
          aria-label="Authentication pages"
          className="inline-flex w-full max-w-[377px] h-16 relative mt-10 items-center justify-between p-1.5 rounded-full bg-surface-tonal-tonal-a10 border border-solid border-surface-tonal-tonal-a0"
        >
          <button
            id="btn-signup"
            type="button"
            onClick={() => handleTabClick('signup')}
            className={`flex-1 h-full inline-flex items-center justify-center relative rounded-full cursor-pointer transition-all duration-300 border-0 ${
              activeTab === 'signup'
                ? 'bg-secondary-secondary-a90 text-secondary-secondary-a30 shadow-md'
                : 'bg-transparent text-neutral-neutral-a50 hover:text-white'
            }`}
          >
            <span className="relative w-fit [font-family:'HYWenHei-85W',Helvetica] font-normal text-2xl tracking-[0] leading-[normal] text-inherit">
              Sign Up
            </span>
          </button>

          <button
            id="btn-signin"
            type="button"
            onClick={() => handleTabClick('signin')}
            className={`flex-1 h-full inline-flex items-center justify-center relative rounded-full cursor-pointer transition-all duration-300 border-0 ${
              activeTab === 'signin'
                ? 'bg-secondary-secondary-a90 text-secondary-secondary-a30 shadow-md'
                : 'bg-transparent text-neutral-neutral-a50 hover:text-white'
            }`}
          >
            <span className="relative w-fit text-neutral-neutral-a50 text-2xl [font-family:'HYWenHei-85W',Helvetica] font-normal tracking-[0] leading-[normal] text-inherit">
              Sign In
            </span>
          </button>
        </nav>
      </main>
    </>
  );
};

export default PcSignup;
