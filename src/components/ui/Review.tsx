import { Button } from '@/components/ui/Button';

export const Review = (): JSX.Element => {
  return (
    <div className="w-full bg-tonal-a20 rounded-[20px] p-6 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      <div className="flex flex-col gap-3 flex-1 min-w-0 w-full md:w-auto">
        <h2 className="text-white h2 truncate">Two Sum</h2>

        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 bg-success-a0 rounded-sm inline-flex justify-center items-center">
            <span className="text-success-a20 p8">Easy</span>
          </div>
          <div className="px-3 py-1 bg-info-a0 rounded-sm inline-flex justify-center items-center">
            <span className="text-info-a20 p8">Array</span>
          </div>
          <div className="px-3 py-1 bg-info-a0 rounded-sm inline-flex justify-center items-center">
            <span className="text-info-a20 p8">Hash Table</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-20 w-full md:w-auto justify-between md:justify-end">
        <div className="flex flex-col gap-1 text-left sm:text-right w-full sm:w-auto">
          <p className="text-neutral-50 p4 whitespace-nowrap">
            Last review: <span className="p4">3 days ago</span>
          </p>
          <p className="text-neutral-50 p4 whitespace-nowrap">
            Done: <span className="font-medium">3 times</span>
          </p>
        </div>

        <div className="">
          <Button
            className="text-neutral-a50 h3 font-medium"
            onClick={() => {}}
          >
            Review Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
