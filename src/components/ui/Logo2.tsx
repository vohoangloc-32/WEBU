import LogoItem1 from '@/assets/logo-2-item-1.svg?react';
import LogoItem2 from '@/assets/logo-2-item-2.svg?react';

export const Logo2 = (): JSX.Element => {
  return (
    <figure
      className="relative m-0 w-36 h-28 aspect-[1.28]"
      role="img"
      aria-label="W.E.B.U logo"
    >
      <LogoItem2
        className="absolute w-[74.87%] h-[67.14%] top-[32.86%] left-[25.13%] pointer-events-none select-none text-discovery-a50"
        aria-hidden="true"
      />

      <figcaption className="absolute h-[26.09%] top-[54.35%] left-[calc(50.00%-38px)] w-27.5 flex items-center aspect-[3.78] font-['Nadoor-BoldItalic',Helvetica] font-bold italic text-discovery-a50 text-[28px] tracking-normal leading-[normal] whitespace-nowrap">
        W.E.B.U
      </figcaption>

      <div
        className="absolute h-0.5 top-[81.33%] left-[calc(50.00%-35px)] w-12.5 bg-discovery-a50 rounded-[10px] aspect-[27.54]"
        aria-hidden="true"
      />

      <LogoItem1
        className="absolute w-full h-full top-0 left-0 aspect-[1.04] pointer-events-none select-none text-discovery-a50"
        aria-hidden="true"
      />
    </figure>
  );
};

export default Logo2;
