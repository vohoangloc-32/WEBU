import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface GoogleSignInButtonProps {
  onCredential: (idToken: string) => void;
  disabled?: boolean;
  text?: string;
}

/**
 * Custom Google Sign-In Button with overlay
 * Wrapper quanh <GoogleLogin /> của @react-oauth/google.
 * Trả về `credential` (= id_token) qua callback `onCredential`.
 * Backend dùng `verifyIdToken(idToken)` — đúng chuẩn.
 */
export const GoogleSignInButton = ({
  onCredential,
  disabled = false,
  text = 'Sign In with Google',
}: GoogleSignInButtonProps): JSX.Element => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      console.error(
        '[GoogleSignInButton] Không nhận được credential từ Google',
      );
      return;
    }
    onCredential(idToken);
  };

  const handleError = () => {
    console.error('[GoogleSignInButton] Google sign-in thất bại');
  };

  return (
    <div
      className="relative overflow-hidden flex h-14 w-full max-w-[500px] items-center justify-center gap-2.5 rounded-[10px] border border-solid border-secondary-secondary-a70 bg-surface-tonal-tonal-a20 p-2.5 shadow-[0px_4px_12px_rgba(0,0,0,0.35),0px_2px_0px_#4ca3ff] transition-all hover:brightness-110 active:brightness-95"
      style={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      {/* Google Icon */}
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

      {/* Button Text */}
      <span className="relative w-fit [font-family:'HYWenHei-85W',Helvetica] text-2xl font-normal tracking-[0] text-secondary-secondary-a70 [text-shadow:0px_0px_8px_rgba(76,163,255,0.35)]">
        {text}
      </span>

      {/* Invisible GoogleLogin overlay (scaled up to cover the 710px width) */}
      <div className="absolute inset-0 z-20 cursor-pointer opacity-0 scale-[3] flex items-center justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false}
        />
      </div>
    </div>
  );
};

export default GoogleSignInButton;
