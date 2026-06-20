import { Button } from '@/components/ui/Button';

export const Review = (): JSX.Element => {
  return (
    <div className="w-full h-40 relative bg-tonal-a20 rounded-[20px] overflow-hidden">
      <div className="w-14 h-10 p-2.5" />
      <div
        data-property-1="Default"
        className="w-56 h-20 p-2.5  absolute bg-clr-secondary-a90 rounded-[100px] inline-flex justify-center items-center gap-2.5"
      >
        <Button className="justify-start text-clr-neutral-a50 h3">
          Review Now
        </Button>
      </div>
      <div className="w-full h-24  overflow-hidden">
        <div className="w-64 h-24  absolute">
          <div className=" top-0 absolute justify-start text-white text-3xl font-normal font-['HYWenHei']">
            Two Sum
          </div>
          <div className="w-72 h-16  absolute overflow-hidden">
            <div
              data-property-1="Default"
              className="w-14 h-6 p-1 absolute bg-success-a0 rounded-sm inline-flex justify-center items-center gap-1"
            >
              <div className="justify-start text-clr-success-a0 p8">Easy</div>
            </div>
            <div
              data-property-1="Default"
              className="w-14 h-6 p-1 bg-clr-info-a0 rounded-sm inline-flex justify-center items-center gap-1"
            >
              <div className="justify-start text-clr-info-a20 p8">Array</div>
            </div>
            <div
              data-property-1="Default"
              className="w-24 p-1 bg-clr-info-a0 rounded-sm inline-flex justify-center items-center gap-1"
            >
              <div className="justify-start text-clr-info-a20 p8">
                Hash Table
              </div>
            </div>
          </div>
        </div>
        <div className="w-96 h-4 text-right justify-start text-neutral-50 h5">
          Last review: 3 days ago
        </div>
        <div className="w-96 h-4 text-right justify-start text-neutral-50 h5">
          Done: 3 times
        </div>
      </div>
    </div>
  );
};

export default Review;
