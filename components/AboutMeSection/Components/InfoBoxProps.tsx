interface InfoBoxProps {
  text: string;
  className?: string;
}

const InfoBox = ({ text, className = "" }: InfoBoxProps) => {
  return (
    <span
      className={`pointer-events-none absolute z-10 inline-flex h-[18px] items-center justify-center whitespace-nowrap rounded-[3.75px] bg-[#AE9382] px-[6px] py-1 font-montserrat text-[12px] font-medium leading-[15px] text-white shadow-[-0.375px_1.125px_2.25px_rgba(0,0,0,0.1),_-1.125px_4.125px_4.125px_rgba(0,0,0,0.09),_-2.625px_9px_5.625px_rgba(0,0,0,0.05),_-4.875px_16.125px_6.75px_rgba(0,0,0,0.01)] md:h-[34px] md:rounded-[10px] md:px-[10px] md:text-[22px] md:leading-[27px] md:shadow-[-1px_3px_6px_rgba(0,0,0,0.1),_-3px_11px_11px_rgba(0,0,0,0.09)] ${className}`}
      aria-hidden
    >
      {text}
    </span>
  );
};

export default InfoBox;
