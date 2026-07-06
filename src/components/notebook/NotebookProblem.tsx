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
  isCustom?: boolean;
  isSuggested?: boolean;
  isInteracted?: boolean;
  onDelete?: () => void;
}

export const NotebookProblem = ({
  id,
  title,
  description,
  tags,
  difficulty,
  isFavorite = false,
  onToggleFavorite,
  isCustom = false,
  isSuggested = false,
  isInteracted = false,
  onDelete,
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

  let cardBg = 'bg-tonal-a20 border-tonal-a30';
  let descBg = 'bg-tonal-a30';
  if (isCustom) {
    cardBg = 'bg-primary-a0 border-primary-a10/30';
    descBg = 'bg-primary-a20';
  } else if (isSuggested) {
    cardBg = 'bg-warning-a10/10 border-warning-a10/30';
    descBg = 'bg-warning-a10/20';
  } else if (isInteracted) {
    cardBg = 'bg-success-a10/10 border-success-a10/30';
    descBg = 'bg-success-a10/20';
  }

  return (
    <div
      className={`flex flex-col rounded-[20px] p-5 gap-4 h-full border ${cardBg}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="h4 text-secondary-a10">{id}.</span>
          {isCustom && (
            <span className="px-2 py-0.5 rounded-md bg-secondary-a10 text-tonal-a0 p9 font-bold">
              Của Bạn
            </span>
          )}
          {isSuggested && !isCustom && (
            <span className="px-2 py-0.5 rounded-md bg-warning-a10 text-tonal-a0 p9 font-bold">
              Suggested
            </span>
          )}
          {isInteracted && !isSuggested && !isCustom && (
            <span className="px-2 py-0.5 rounded-md bg-success-a10 text-tonal-a0 p9 font-bold">
              Đã Làm
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div
            onClick={onToggleFavorite}
            className="flex items-center gap-1 p8 text-neutral-a50 cursor-pointer hover:text-white transition-colors select-none"
          >
            <span>{isFavorite ? '★ Favorited' : '☆ Favorite'}</span>
          </div>

          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="flex items-center gap-1 p8 text-red-400 hover:text-red-300 transition-colors select-none cursor-pointer border-none bg-transparent"
              title="Xóa bài tập này"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      </div>

      <h3 className="h4 text-neutral-a50 m-0">{title}</h3>

      <div className={`rounded-[10px] p-3 flex-1 ${descBg}`}>
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
