import React from 'react';
import { Logo2 } from '@/components/ui/Logo2';
import { Button } from '@/components/ui/Button';
import HomePageImage from '@/assets/HomePageImage.png';
import { useNavigate } from 'react-router-dom';

export const Home = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-tonal-a0 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <header className="self-stretch flex flex-row justify-start gap-10">
        <Logo2 />
        <span className="text-discovery-a50 h4 font-['Nadoor'] font-bold italic tracking-normal py-14">
          W.E.B.U - Web Engineering of BackKhoa University
        </span>
      </header>

      <main className="self-stretch flex flex-row">
        <div className="flex-1 flex flex-col justify-center items-start gap-4 my-12">
          <h1 className="text-neutral-a50 h1 font-extrabold font-['SFU_Futura'] tracking-normal leading-tight uppercase my-10">
            LEARN CODE BY FLASHCARD
          </h1>
          <div className="text-neutral-a50 h6 font-bold font-['SFU_Futura'] tracking-normal opacity-90 italic flex flex-col gap-5">
            <span>Get personalized learning track </span>
            <span>Remind you everyday</span>
          </div>

          <div className="w-auto my-10">
            <Button
              className="px-10 py-2.5 rounded-[20px] outline -outline-offset-1 outline-secondary-a90 h4"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Get Started →
            </Button>
          </div>

          <button
            type="button"
            className="text-neutral-a50 text-xl font-bold font-['SFU_Futura'] underline cursor-pointer hover:text-secondary-a50 transition-colors opacity-40"
          >
            About US
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={HomePageImage}
            alt="Home Page"
            className="w-full h-auto max-w-full object-contain"
          />
        </div>{' '}
      </main>

      <footer className="self-stretch flex justify-center items-center gap-32 border-t border-solid border-tonal-a20 pt-8 overflow-hidden">
        <div className="w-44 h-24 flex justify-start items-center gap-5">
          <div className="w-4 h-3 bg-neutral-a50 rounded-sm" />
          <span className="text-neutral-a50 text-xs font-normal font-['UTM_Neo_Sans_Intel'] whitespace-nowrap">
            discord.gg/webu
          </span>
        </div>

        <div className="w-44 h-24 flex justify-start items-center gap-5">
          <div className="w-5 h-4 bg-neutral-a50 rounded-sm" />
          <span className="text-neutral-a50 text-xs font-normal font-['UTM_Neo_Sans_Intel'] whitespace-nowrap">
            webu@gmail.com
          </span>
        </div>

        <div className="w-44 h-24 flex justify-start items-center gap-5">
          <div className="w-2.5 h-4 bg-neutral-a50 rounded-sm" />
          <span className="text-neutral-a50 text-xs font-normal font-['UTM_Neo_Sans_Intel'] whitespace-nowrap">
            facebook.com/webu
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
