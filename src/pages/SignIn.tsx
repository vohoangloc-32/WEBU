import { FormEvent, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password) {
      alert('Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }
    if (!email.includes('@')) {
      alert('Email không hợp lệ!');
      return;
    }
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
      <header className="flex justify-center items-center">
        <h1 className="text-[#e0e0e0] text-6xl h0 tracking-[0] leading-[normal] whitespace-nowrap">
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
                  className="peer absolute inset-0 z-10 h-full w-full rounded-[10px] px-6 pt-[18px] pb-2 p6 text-neutral-neutral-a50 caret-secondary-secondary-a70 bg-transparent border-0 outline-none"
                />
                <label
                  htmlFor={inputId}
                  className="absolute top-[19px] left-6 p7 text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0"
                >
                  {field.label}
                </label>
              </div>

              {field.id === 'password' && (
                <div className="absolute right-0 mt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/forget-password')}
                    className="text-neutral-neutral-a50/60 hover:text-secondary-secondary-a70 transition-colors p8 underline cursor-pointer bg-transparent border-none p-0"
                  >
                    Forget Password
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </form>

      <Sign activeTab="signin" />
    </main>
  );
};

export default SignIn;
