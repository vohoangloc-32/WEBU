import { useNavigate } from 'react-router-dom';

interface NotebookProblemProps {
  id: string;
  dbId?: string;
  title: string;
  description: string;
  tags: string[];
  group: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const NotebookProblem = ({
  id,
  title,
  description,
  tags,
  difficulty,
  isFavorite = false,
  onToggleFavorite,
}: NotebookProblemProps) => {
  const navigate = useNavigate();

  const getDifficultyBg = () => {
    if (difficulty === 'Easy') return 'bg-success-a0';
    if (difficulty === 'Medium') return 'bg-warning-a20';
    return 'bg-danger-a0';
  };

  const getProblemSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="flex flex-col bg-primary-a0 rounded-[20px] p-5 gap-4 h-full">
      <div className="flex justify-between items-start">
        <span className="h4 text-secondary-a10">{id}.</span>

        <div
          onClick={onToggleFavorite}
          className="flex items-center gap-1 p8 text-neutral-a50 cursor-pointer hover:text-white transition-colors select-none"
        >
          <span>{isFavorite ? '★ Favorited' : '☆ Favorite'}</span>
        </div>
      </div>

      <h3 className="h4 text-neutral-a50 m-0">{title}</h3>

      <div className="bg-primary-a20 rounded-[10px] p-3 flex-1">
        <p className="p8 text-neutral-a50 line-clamp-10 m-0">{description}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <span className="h7 text-neutral-a50">Tags</span>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag, index) => (
            <span key={index} className="p9 text-neutral-a50">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end mt-auto pt-4">
        <div className="flex flex-col gap-2">
          <span className="h7 text-neutral-a50">Difficulty</span>
          <div
            className={`px-3 pt-0 pb-1 rounded-[40px] flex justify-center items-center w-fit ${getDifficultyBg()}`}
          >
            <span className="p9 font-bold text-tonal-a0">{difficulty}</span>
          </div>
        </div>
        <div
          onClick={() => navigate(`/problems/${getProblemSlug(title)}`)}
          className="flex items-center gap-1 p6 text-secondary-a10 cursor-pointer hover:text-white transition-colors"
        >
          ↗ Open
        </div>
      </div>
    </div>
  );
};
