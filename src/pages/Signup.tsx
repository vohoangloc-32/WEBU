import { FormEvent, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FormField = {
  id: 'email' | 'username' | 'password' | 'confirmPassword';
  label: string;
  type: 'email' | 'text' | 'password';
  autoComplete: string;
};

const signUpFields: FormField[] = [
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
  },
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    autoComplete: 'username',
  },
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
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
  },
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (activeTab === 'signup') {
      if (!email.trim() || !username.trim() || !password || !confirmPassword) {
        alert('Vui lòng nhập đầy đủ tất cả các trường!');
        return;
      }
      if (!email.includes('@')) {
        alert('Email không hợp lệ!');
        return;
      }
      if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
      }
      console.log('Sign Up successful, redirecting to survey...');
      navigate('/survey');
    } else {
      if (!email.trim() || !password) {
        alert('Vui lòng nhập đầy đủ Email và Mật khẩu!');
        return;
      }
      if (!email.includes('@')) {
        alert('Email không hợp lệ!');
        return;
      }
      console.log('Sign In successful, redirecting...');
      navigate('/dashboard');
    }
  };

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
    }
  };

  const fields = activeTab === 'signup' ? signUpFields : signInFields;

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
      {/* Title Header - Centered horizontally */}
      <header className="flex justify-center items-center">
        <h1 className="text-[#e0e0e0] text-6xl [font-family:'HYWenHei-85W',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
          {activeTab === 'signup' ? 'Sign Up' : 'Sign In'}
        </h1>
      </header>

      {/* Form Container - Centered horizontally with max-width */}
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={`flex w-full max-w-[710px] relative mt-[60px] flex-col items-center gap-[60px] transition-all duration-300 ${
          activeTab === 'signup' ? 'h-[404px]' : 'h-[172px]'
        }`}
      >
        {/* Hidden submit button to allow Enter key submission */}
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
                  className="peer absolute inset-0 z-10 h-full w-full rounded-[10px] px-6 pt-[18px] pb-2 text-base [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 caret-secondary-secondary-a70 bg-transparent border-0 outline-none"
                />
                <label
                  htmlFor={inputId}
                  className="absolute top-[19px] left-6 [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0"
                >
                  {field.label}
                </label>
              </div>

              {/* Conditionally render Forget Password link on the right under Password field in Sign In form */}
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

      {/* Navigation Tab Bar - Centered horizontally with max-width, styled like a slider */}
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
  );
};

export default PcSignup;
