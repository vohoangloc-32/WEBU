import ChipItem from './ChipItem';
interface ChipBoardProps {
  tags: string[];
  onRemove: (tag: string) => void;
}

const ChipBoard = ({ tags, onRemove }: ChipBoardProps) => {
  if (tags.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2 bg-secondary-a10 px-2 py-2">
      {tags.map((tag) => (
        <ChipItem key={tag} label={tag} onRemove={() => onRemove(tag)} />
      ))}
    </div>
  );
};

export default ChipBoard;
