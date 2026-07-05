import React, { useState, useEffect, useCallback } from 'react';
import { FlashcardQuestion } from '../../api/statsService';
import apiClient from '../../api/apiClient';

interface QuizModalProps {
  cardId: string;
  cardTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

type QuizState = 'loading' | 'quiz' | 'done' | 'error';

export const QuizModal: React.FC<QuizModalProps> = ({
  cardId,
  cardTitle,
  isOpen,
  onClose,
}) => {
  const [state, setState] = useState<QuizState>('loading');
  const [questions, setQuestions] = useState<FlashcardQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const loadQuiz = useCallback(async () => {
    if (!isOpen || !cardId) return;
    setState('loading');
    setCurrentIdx(0);
    setSelectedOption(null);
    setAnswers([]);
    setShowExplanation(false);
    try {
      const res = await apiClient.get(`/flashcards/${cardId}/quiz`);
      const quiz = res.data as { questions: FlashcardQuestion[] };
      setQuestions(quiz.questions);
      setAnswers(new Array(quiz.questions.length).fill(null));
      setState('quiz');
    } catch (err) {
      console.error('Failed to load quiz:', err);
      setState('error');
    }
  }, [cardId, isOpen]);

  useEffect(() => {
    if (isOpen) loadQuiz();
  }, [isOpen, loadQuiz]);

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setState('done');
    }
  };

  const correctCount = answers.filter(
    (a, i) => questions[i] && a === questions[i].correct_index,
  ).length;

  const getScoreMessage = () => {
    const ratio = correctCount / questions.length;
    if (ratio === 1)
      return {
        emoji: '🏆',
        text: 'Hoàn hảo! Bạn đã nắm vững bài này.',
        color: 'text-emerald-400',
      };
    if (ratio >= 0.75)
      return {
        emoji: '🎉',
        text: 'Rất tốt! Kiến thức vững chắc.',
        color: 'text-blue-400',
      };
    if (ratio >= 0.5)
      return {
        emoji: '📚',
        text: 'Ổn định. Nên ôn lại một lần nữa.',
        color: 'text-yellow-400',
      };
    return {
      emoji: '💪',
      text: 'Cần ôn thêm. Đừng bỏ cuộc!',
      color: 'text-red-400',
    };
  };

  if (!isOpen) return null;

  const current = questions[currentIdx];
  const progress = ((currentIdx + 1) / Math.max(questions.length, 1)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0d1526] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm">
              🧠
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                Knowledge Check
              </p>
              <p className="text-neutral-500 text-xs truncate max-w-[220px]">
                {cardTitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {state === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="relative">
                <svg
                  className="animate-spin h-10 w-10 text-violet-500/30"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
              <p className="text-neutral-400 text-sm">
                AI đang tạo câu hỏi ôn tập...
              </p>
              <p className="text-neutral-600 text-xs">
                Lần đầu có thể mất 5–10 giây
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="text-4xl">😢</div>
              <p className="text-neutral-400 text-sm text-center">
                Không thể tải quiz. Vui lòng thử lại sau.
              </p>
              <button
                type="button"
                onClick={loadQuiz}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors cursor-pointer"
              >
                Thử lại
              </button>
            </div>
          )}

          {state === 'quiz' && current && (
            <>
              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-neutral-500 text-xs flex-shrink-0">
                  {currentIdx + 1}/{questions.length}
                </span>
              </div>

              {/* Question */}
              <p className="text-white text-sm font-medium leading-relaxed mb-4">
                {current.question}
              </p>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {current.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = i === current.correct_index;
                  const answered = selectedOption !== null;

                  let cls =
                    'border border-white/10 bg-white/[0.04] text-neutral-300';
                  if (answered) {
                    if (isCorrect)
                      cls =
                        'border-emerald-500/60 bg-emerald-500/10 text-emerald-300';
                    else if (isSelected)
                      cls = 'border-red-500/60 bg-red-500/10 text-red-300';
                    else
                      cls =
                        'border-white/[0.05] bg-white/[0.02] text-neutral-600';
                  } else {
                    cls =
                      'border-white/10 bg-white/[0.04] text-neutral-300 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer';
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-150 flex items-start gap-3 ${cls}`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt.text}</span>
                      {answered && isCorrect && (
                        <span className="ml-auto flex-shrink-0 text-emerald-400">
                          ✓
                        </span>
                      )}
                      {answered && isSelected && !isCorrect && (
                        <span className="ml-auto flex-shrink-0 text-red-400">
                          ✗
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 leading-relaxed mb-4">
                  <span className="font-semibold text-blue-400">
                    💡 Giải thích:{' '}
                  </span>
                  {current.explanation}
                </div>
              )}

              {/* Next button */}
              {selectedOption !== null && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer"
                >
                  {currentIdx < questions.length - 1
                    ? 'Câu tiếp theo →'
                    : 'Xem kết quả'}
                </button>
              )}
            </>
          )}

          {state === 'done' && (
            <div className="flex flex-col items-center py-6 gap-4">
              {(() => {
                const msg = getScoreMessage();
                return (
                  <>
                    <div className="text-5xl">{msg.emoji}</div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${msg.color}`}>
                        {correctCount}/{questions.length}
                      </p>
                      <p className="text-neutral-400 text-sm mt-1">
                        {msg.text}
                      </p>
                    </div>

                    {/* Per-question result */}
                    <div className="w-full space-y-1.5">
                      {questions.map((q, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${
                            answers[i] === q.correct_index
                              ? 'bg-emerald-500/10 border border-emerald-500/20'
                              : 'bg-red-500/10 border border-red-500/20'
                          }`}
                        >
                          <span
                            className={
                              answers[i] === q.correct_index
                                ? 'text-emerald-400'
                                : 'text-red-400'
                            }
                          >
                            {answers[i] === q.correct_index ? '✓' : '✗'}
                          </span>
                          <span className="text-neutral-300 truncate flex-1">
                            {q.question}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-2.5 bg-white/[0.08] hover:bg-white/[0.12] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer mt-2"
                    >
                      Đóng
                    </button>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
