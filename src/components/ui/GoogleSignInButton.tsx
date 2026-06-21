import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface GoogleSignInButtonProps {
  onCredential: (idToken: string) => void;
  disabled?: boolean;
}

/**
 * Wrapper quanh <GoogleLogin /> của @react-oauth/google.
 * Trả về `credential` (= id_token) qua callback `onCredential`.
 * Backend dùng `verifyIdToken(idToken)` — đúng chuẩn.
 */
export const GoogleSignInButton = ({
  onCredential,
  disabled = false,
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
      style={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="filled_black"
        shape="rectangular"
        size="large"
        text="signin_with"
      />
    </div>
  );
};

export default GoogleSignInButton;
