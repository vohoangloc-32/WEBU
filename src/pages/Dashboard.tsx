import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Suggest } from '@/components/dashboard/Suggest';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Review } from '@/components/ui/Review';
import { GenerateProblem } from '@/components/dashboard/GenerateProblem';
import { problemApi } from '@/api/problemService';

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string, imageFile: File | null) => {
    if (!prompt.trim() && !imageFile) return;

    setAiError(null);
    setIsProcessing(true);

    try {
      const aiProblem = await problemApi.generateFromAi(prompt, imageFile);

      navigate('/create-problem', {
        state: { aiProblem },
      });
    } catch (err) {
      console.error('Lỗi gọi AI đọc đề bài:', err);
      setAiError(
        'Không thể đọc đề bài từ ảnh hoặc prompt. Vui lòng thử lại hoặc nhập tay.',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>
      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none gap-10">
        <div className="w-full h-40 relative bg-tonal-a20 rounded-[20px] overflow-hidden px-20 py-5 flex flex-col justify-between items-stretch gap-10">
          <Review />
        </div>
        <div>
          <h1 className="h1 text-center">
            What problem do you want to solve today?
          </h1>
          <div className="w-full flex justify-center items-center mt-5">
            <GenerateProblem
              onGenerate={handleGenerate}
              isProcessing={isProcessing}
            />
          </div>
          {aiError && (
            <p className="text-danger-a10 text-center mt-3 p7">{aiError}</p>
          )}
        </div>
        <div className="self-stretch flex-1 flex flex-row justify-center items-center py-1 gap-10">
          <div></div>
        </div>
        <div className="self-stretch flex-1 flex flex-row justify-center items-center py-1 gap-10">
          <div>
            <Suggest
              onExpandClick={() => {
                navigate('/problem');
              }}
              onReviewClick={() => {
                const cardId = '0';
                navigate(cardId ? '' : '/ide');
              }}
              title={'Suggested Problems'}
            />
          </div>
          <div>
            <Suggest
              onExpandClick={() => {
                navigate('/notebook');
              }}
              onReviewClick={() => {}}
              title="Your Notebook"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
