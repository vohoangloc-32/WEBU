import { MainNavigation } from '@/components/ui/MainNavigation';

export const Ide = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none gap-10">
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>
      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col justify-center items-center overflow-hidden select-none gap-10">
        <div className="self-stretch flex-1 flex flex-row justify-center items-center py-1 gap-10">
          <div>
            <p className="text-neutral-a50 h4 mb-10">Code Editor:</p>
            <textarea
              placeholder="Enter your code here"
              className="px-4 py-2 bg-black ide4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ide;
