import React from 'react';
import { Logo2 } from '../components/ui/Logo2';
import { Button } from '../components/ui/Button';

export const Home = (): JSX.Element => {
  return (
    <div className="w-full max-w-[1440px] min-h-screen mx-auto px-28 py-20 bg-tonal-a0 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <header className="self-stretch flex justify-start items-center">
        <Logo2 />
      </header>

      <main className="self-stretch flex flex-col justify-center items-center text-center gap-10 my-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-neutral-a50 text-6xl font-extrabold font-['SFU_Futura'] tracking-normal leading-tight uppercase">
            LEARN CODE BY FLASHCARD
          </h1>
          <p className="text-neutral-a50 text-4xl font-bold font-['SFU_Futura'] tracking-normal opacity-90">
            Get personalized learning track
          </p>
        </div>

        <div className="text-neutral-a50 text-4xl font-bold font-['SFU_Futura'] opacity-70 italic flex flex-col gap-2">
          <span>Remind you everyday</span>
        </div>

        <div className="w-[280px]">
          <Button
            className="px-10 py-2.5 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-secondary-a90"
            onClick={() => console.log('Get Started Clicked!')}
          >
            Get Started →
          </Button>
        </div>

        <button
          type="button"
          className="text-neutral-a50 text-xl font-bold font-['SFU_Futura'] underline cursor-pointer hover:text-secondary-a50 transition-colors"
        >
          About US
        </button>
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
