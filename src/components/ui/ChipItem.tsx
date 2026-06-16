interface ChipItemProps {
  label: string;
  onRemove: () => void;
}

const ChipItem = ({ label, onRemove }: ChipItemProps) => {
  return (
    <div className="flex items-center px-3 py-1 gap-2 bg-[#8CB6FF] text-black p5 rounded-full ">
      <span>{label}</span>
      <button onClick={onRemove}>×</button>
    </div>
  );
};

export default ChipItem;
