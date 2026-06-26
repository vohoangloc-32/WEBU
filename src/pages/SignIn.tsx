import { FormEvent, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { googleLogin, login, saveAuthToken } from '@/api/authService';
import { LinkAccountModal } from '@/components/ui/LinkAccountModal';
import { Button } from '@/components/ui/Button';
import { Sign } from '@/components/ui/Sign';

const signInFields = [
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
  },
] as const;

export const SignIn = (): JSX.Element => {
  const formId = useId();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Google OAuth state
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');

  // Link account modal state (when Google account already exists with password)
  const [linkModal, setLinkModal] = useState<{
    visible: boolean;
    email: string;
    idToken: string;
  }>({ visible: false, email: '', idToken: '' });
  const [linkLoading, setLinkLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
    setFormError('');

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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  // Google Sign-In Success Handler
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
        setLinkModal({ visible: true, email: res.email, idToken });
        return;
      }

      if (res.token) {
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

  // Confirm Link Account with Password
  const handleLinkConfirm = async (password: string) => {
    setLinkLoading(true);
    try {
      const res = await googleLogin(linkModal.idToken, password);
      if (res.token) {
        saveAuthToken(res.token);
        setLinkModal({ visible: false, email: '', idToken: '' });
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      alert(
        err instanceof Error ? err.message : 'Xác thực tài khoản thất bại.',
      );
    } finally {
      setLinkLoading(false);
    }
  };

  const handleLinkCancel = () => {
    setLinkModal({ visible: false, email: '', idToken: '' });
  };

  return (
    <>
      {linkModal.visible && (
        <LinkAccountModal
          email={linkModal.email}
          onConfirm={handleLinkConfirm}
          onCancel={handleLinkCancel}
          isLoading={linkLoading}
        />
      )}

      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
        <header className="flex justify-center items-center">
          <h1 className="text-[#e0e0e0] text-6xl [font-family:'HYWenHei-85W',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
            Sign In
          </h1>
        </header>

        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex w-full max-w-[710px] h-[172px] relative mt-[60px] flex-col items-center gap-[60px] transition-all duration-300"
        >
          <Button className="hidden" type="submit">
            Submit
          </Button>

          {signInFields.map((field) => {
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
                    value={formData[field.id]}
                    onChange={handleChange}
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

                {field.id === 'password' && (
                  <div className="absolute right-0 mt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/forget-password')}
                      className="text-neutral-neutral-a50/60 hover:text-secondary-secondary-a70 transition-colors text-sm [font-family:'HYWenHei-85W',Helvetica] underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Forget Password
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </form>

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
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-surface-tonal-tonal-a0" />
            <span className="text-neutral-neutral-a50/60 text-xs [font-family:'HYWenHei-85W',Helvetica] whitespace-nowrap">
              OR
            </span>
            <div className="flex-1 h-px bg-surface-tonal-tonal-a0" />
          </div>

          <div
            className="relative overflow-hidden flex h-14 w-full max-w-[710px] items-center justify-center gap-2.5 rounded-[10px] border border-solid border-secondary-secondary-a70 bg-surface-tonal-tonal-a20 p-2.5 shadow-[0px_4px_12px_rgba(0,0,0,0.35),0px_2px_0px_#4ca3ff] transition-all hover:brightness-110 active:brightness-95"
            style={{
              opacity: googleLoading ? 0.6 : 1,
              pointerEvents: googleLoading ? 'none' : 'auto',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

            <span className="relative w-fit [font-family:'HYWenHei-85W',Helvetica] text-2xl font-normal tracking-[0] text-secondary-secondary-a70 [text-shadow:0px_0px_8px_rgba(76,163,255,0.35)]">
              Sign In with Google
            </span>

            <div className="absolute inset-0 z-20 cursor-pointer opacity-0 scale-[3] flex items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
              />
            </div>
          </div>

          {googleError && (
            <p
              className="text-sm text-red-400 text-center [font-family:'HYWenHei-85W',Helvetica]"
              role="alert"
            >
              {googleError}
            </p>
          )}

          {googleLoading && (
            <p className="text-sm text-neutral-neutral-a50 [font-family:'HYWenHei-85W',Helvetica]">
              Đang xử lý...
            </p>
          )}
        </div>

        <Sign
          activeTab="signin"
          onActionClick={() => {
            const formElement = document.getElementById(
              formId,
            ) as HTMLFormElement | null;
            if (formElement) {
              formElement.requestSubmit();
            }
          }}
        />
      </main>
    </>
  );
};

export default SignIn;
