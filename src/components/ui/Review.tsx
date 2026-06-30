import { Button } from '@/components/ui/Button';

interface ReviewProps {
  reviewCount: number;
  isLoading: boolean;
  onStart: () => void;
}

export const Review = ({
  reviewCount,
  isLoading,
  onStart,
}: ReviewProps): JSX.Element => {
  if (isLoading) {
    return (
      <div className="w-full bg-tonal-a20 rounded-[20px] p-6 flex flex-col items-center justify-center">
        <p className="text-white animate-pulse">Loading learning data...</p>
      </div>
    );
  }

  if (reviewCount === 0) {
    return (
      <div className="w-full bg-tonal-a20 rounded-[20px] p-6 flex flex-col items-center justify-center gap-3">
        <h2 className="text-white h2">Great! 🎉</h2>
        <p className="text-neutral-400 p4">
          You have successfully completed today's review goal.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-tonal-a20 rounded-[20px] p-6 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      <div className="flex flex-col gap-3 flex-1 min-w-0 w-full md:w-auto">
        <h2 className="text-white h2 truncate">It's time to review! 🔥</h2>

        <div className="flex flex-wrap gap-2 mt-1">
          <p className="text-neutral-300 p4">
            The FSRS system is ready.{' '}
            <span className="text-secondary-a50 font-bold">
              {reviewCount} exercise
            </span>{' '}
            needs to be reviewed to optimize your memory.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-20 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
        <div className="">
          <Button
            className="text-neutral-a50 h3 font-medium cursor-pointer"
            onClick={onStart}
          >
            Review Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
