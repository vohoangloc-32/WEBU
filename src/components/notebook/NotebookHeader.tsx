import { useNavigate } from 'react-router-dom';

export const NotebookHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="h1 text-neutral-a50 leading-normal">Notebook</h1>
      <button
        onClick={() => navigate('/create-problem')}
        className="flex justify-center items-center px-10 py-3 gap-3 rounded-[10px] border border-secondary-a70 bg-tonal-a20 text-white p7 font-bold cursor-pointer hover:opacity-80 transition-opacity"
      >
        Create New Problem
      </button>
    </div>
  );
};
