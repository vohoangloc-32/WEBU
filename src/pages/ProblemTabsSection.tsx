import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface Submission {
  id: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
  language: string;
  runtime: string;
  memory: string;
  time: string;
  code: string;
}

export const ProblemTabsSection = (): JSX.Element => {
  const { problemId = 'two-sum' } = useParams<{ problemId: string }>();
  const [activeTab, setActiveTab] = useState<'desc' | 'ai' | 'subs'>('desc');

  // AI Tutor state
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'two-sum': [
      {
        sender: 'ai',
        text: 'Xin chào! Mình là AI Tutor. Để giải bài Two Sum tối ưu nhất O(n), bạn nên sử dụng Hash Map để lưu giá trị đã duyệt qua kèm index. Bằng cách này, khi duyệt qua số hiện tại, bạn chỉ cần kiểm tra xem `target - nums[i]` đã có trong Hash Map chưa. Bạn có cần hướng dẫn chi tiết hơn không?',
        timestamp: '9:00 AM',
      },
    ],
    'add-two-numbers': [
      {
        sender: 'ai',
        text: 'Chào bạn! Bài Add Two Numbers yêu cầu cộng hai số biểu diễn dưới dạng Linked List ngược. Điểm mấu chốt là bạn cần lặp qua cả hai danh sách liên kết, tính tổng các node tương ứng cộng với biến nhớ (carry). Nhớ xử lý trường hợp khi duyệt hết các node nhưng biến nhớ vẫn còn khác 0 nhé!',
        timestamp: '9:05 AM',
      },
    ],
    'longest-palindromic-substring': [
      {
        sender: 'ai',
        text: 'Chào bạn! Để tìm chuỗi đối xứng dài nhất, cách tối ưu không gian là mở rộng từ tâm (Expand Around Center). Có 2n - 1 tâm (bao gồm cả tâm đơn lẻ và tâm giữa hai ký tự). Độ phức tạp thời gian là O(n^2) và bộ nhớ là O(1). Hãy hỏi mình nếu bạn muốn xem mã giả (pseudocode) nhé!',
        timestamp: '9:10 AM',
      },
    ],
  });

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Submissions data
  const submissionsData: Record<string, Submission[]> = {
    'two-sum': [
      {
        id: 'SUB-9821',
        status: 'Accepted',
        language: 'JavaScript',
        runtime: '72 ms',
        memory: '42.1 MB',
        time: '3 hours ago',
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      },
      {
        id: 'SUB-9120',
        status: 'Wrong Answer',
        language: 'JavaScript',
        runtime: 'N/A',
        memory: 'N/A',
        time: 'Yesterday',
        code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}`,
      },
    ],
    'add-two-numbers': [
      {
        id: 'SUB-4122',
        status: 'Time Limit Exceeded',
        language: 'Python',
        runtime: 'N/A',
        memory: 'N/A',
        time: '2 days ago',
        code: `class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        # infinite loop mock
        while l1:
            pass`,
      },
    ],
    'longest-palindromic-substring': [],
  };

  const currentMessages = useMemo(() => {
    return (
      messages[problemId] || [
        {
          sender: 'ai',
          text: 'Chào bạn! Mình có thể giúp gì cho bạn trong việc giải bài tập này?',
          timestamp: 'Just now',
        },
      ]
    );
  }, [messages, problemId]);

  const currentSubmissions = submissionsData[problemId] || [];

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputVal,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [problemId]: [...(prev[problemId] || []), userMsg],
    }));
    setInputVal('');
    setIsTyping(true);

    // AI Mock Response
    setTimeout(() => {
      let aiText =
        'Cảm ơn câu hỏi của bạn. Mình khuyên bạn nên kiểm tra lại các điều kiện biên và cấu trúc vòng lặp.';
      if (
        inputVal.toLowerCase().includes('gợi ý') ||
        inputVal.toLowerCase().includes('hint')
      ) {
        if (problemId === 'two-sum') {
          aiText =
            'Gợi ý: Hãy khởi tạo một Map rỗng. Khi duyệt qua `nums[i]`, lấy `target - nums[i]`. Nếu Map đã lưu giá trị này, hãy lấy index của nó ra và trả về kết quả `[map.get(complement), i]`.';
        } else if (problemId === 'add-two-numbers') {
          aiText =
            'Gợi ý: Sử dụng một nút giả (dummy node) làm đầu danh sách kết quả. Khai báo biến `carry = 0`. Lặp đến khi cả hai list đều null và `carry == 0`.';
        } else {
          aiText =
            'Gợi ý: Lặp qua từng ký tự trong chuỗi, gọi hàm kiểm tra tính đối xứng bằng cách mở rộng sang hai bên từ vị trí hiện tại (cho cả chuỗi đối xứng lẻ và chẵn).';
        }
      } else if (
        inputVal.toLowerCase().includes('mã') ||
        inputVal.toLowerCase().includes('code') ||
        inputVal.toLowerCase().includes('giải')
      ) {
        aiText =
          'Mình khuyên bạn nên thử tự suy nghĩ thuật toán trước nhé! Gợi ý: Hãy phân tích các ví dụ Input/Output để tìm ra quy luật, hoặc hỏi mình các bước cụ thể hơn thay vì xin trực tiếp mã nguồn.';
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [problemId]: [...(prev[problemId] || []), aiMsg],
      }));
      setIsTyping(false);
    }, 1500);
  };

  // Render problem details
  const renderProblemDetails = () => {
    switch (problemId) {
      case 'longest-palindromic-substring':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-white h3 font-bold">
                5. Longest Palindromic Substring
              </h1>
              <span className="px-2.5 py-0.5 bg-danger-a0/20 text-danger-a0 text-xs font-bold rounded">
                Hard
              </span>
            </div>
            <p className="text-neutral-a100 p6 leading-relaxed">
              Given a string{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                s
              </code>
              , return the longest palindromic substring in{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                s
              </code>
              . A substring is a contiguous sequence of characters within the
              string.
            </p>

            {/* Example 1 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 1:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> s = "babad"{'\n'}
                <strong>Output:</strong> "bab"{'\n'}
                <strong>Explanation:</strong> "aba" is also a valid answer.
              </pre>
            </div>

            {/* Example 2 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 2:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> s = "cbbd"{'\n'}
                <strong>Output:</strong> "bb"
              </pre>
            </div>

            {/* Constraints */}
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold text-sm">Constraints:</span>
              <ul className="list-disc pl-5 text-neutral-a300 p7 flex flex-col gap-1.5">
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    1 &lt;= s.length &lt;= 1000
                  </code>
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    s
                  </code>{' '}
                  consists of only digits and English letters.
                </li>
              </ul>
            </div>
          </div>
        );

      case 'add-two-numbers':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-white h3 font-bold">2. Add Two Numbers</h1>
              <span className="px-2.5 py-0.5 bg-warning-a0/20 text-warning-a0 text-xs font-bold rounded">
                Medium
              </span>
            </div>
            <p className="text-neutral-a100 p6 leading-relaxed">
              You are given two non-empty linked lists representing two
              non-negative integers. The digits are stored in reverse order, and
              each of their nodes contains a single digit. Add the two numbers
              and return the sum as a linked list.
              {'\n'}
              {'\n'}
              You may assume the two numbers do not contain any leading zero,
              except the number 0 itself.
            </p>

            {/* Example 1 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 1:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]{'\n'}
                <strong>Output:</strong> [7,0,8]{'\n'}
                <strong>Explanation:</strong> 342 + 465 = 807.
              </pre>
            </div>

            {/* Example 2 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 2:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto">
                <strong>Input:</strong> l1 = [0], l2 = [0]{'\n'}
                <strong>Output:</strong> [0]
              </pre>
            </div>

            {/* Constraints */}
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold text-sm">Constraints:</span>
              <ul className="list-disc pl-5 text-neutral-a300 p7 flex flex-col gap-1.5">
                <li>
                  The number of nodes in each linked list is in the range{' '}
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    [1, 100]
                  </code>
                  .
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    0 &lt;= Node.val &lt;= 9
                  </code>
                </li>
                <li>
                  It is guaranteed that the list represents a number that does
                  not have leading zeros.
                </li>
              </ul>
            </div>
          </div>
        );

      case 'two-sum':
      default:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-white h3 font-bold">1. Two Sum</h1>
              <span className="px-2.5 py-0.5 bg-success-a0/20 text-success-a0 text-xs font-bold rounded">
                Easy
              </span>
            </div>
            <p className="text-neutral-a100 p6 leading-relaxed">
              Given an array of integers{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                nums
              </code>{' '}
              and an integer{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                target
              </code>
              , return indices of the two numbers such that they add up to{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                target
              </code>
              .{'\n'}
              {'\n'}
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
              {'\n'}
              {'\n'}
              You can return the answer in any order.
            </p>

            {/* Example 1 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 1:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> nums = [2,7,11,15], target = 9{'\n'}
                <strong>Output:</strong> [0,1]{'\n'}
                <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we
                return [0, 1].
              </pre>
            </div>

            {/* Example 2 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 2:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto">
                <strong>Input:</strong> nums = [3,2,4], target = 6{'\n'}
                <strong>Output:</strong> [1,2]
              </pre>
            </div>

            {/* Example 3 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 3:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto">
                <strong>Input:</strong> nums = [3,3], target = 6{'\n'}
                <strong>Output:</strong> [0,1]
              </pre>
            </div>

            {/* Constraints */}
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold text-sm">Constraints:</span>
              <ul className="list-disc pl-5 text-neutral-a300 p7 flex flex-col gap-1.5">
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    2 &lt;= nums.length &lt;= 10^4
                  </code>
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    -10^9 &lt;= nums[i] &lt;= 10^9
                  </code>
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    -10^9 &lt;= target &lt;= 10^9
                  </code>
                </li>
                <li>Only one valid answer exists.</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-[723px] h-[1319px] bg-tonal-a10 border-r border-tonal-a20 flex flex-col select-none"
      data-id="problem-tabs-section"
    >
      {/* Tabs Header */}
      <div className="h-[60px] border-b border-tonal-a20 flex px-6 items-center gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('desc')}
          className={`h-full text-base font-bold flex items-center border-b-4 px-2 transition-all duration-200 cursor-pointer ${
            activeTab === 'desc'
              ? 'text-secondary-a30 border-secondary-a50'
              : 'text-neutral-a400 border-transparent hover:text-neutral-a100'
          }`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`h-full text-base font-bold flex items-center border-b-4 px-2 transition-all duration-200 cursor-pointer gap-2 ${
            activeTab === 'ai'
              ? 'text-secondary-a30 border-secondary-a50'
              : 'text-neutral-a400 border-transparent hover:text-neutral-a100'
          }`}
        >
          <span>AI Tutor</span>
          <span className="w-2 h-2 rounded-full bg-success-a0 animate-pulse" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('subs')}
          className={`h-full text-base font-bold flex items-center border-b-4 px-2 transition-all duration-200 cursor-pointer ${
            activeTab === 'subs'
              ? 'text-secondary-a30 border-secondary-a50'
              : 'text-neutral-a400 border-transparent hover:text-neutral-a100'
          }`}
        >
          Submissions
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === 'desc' && renderProblemDetails()}

        {activeTab === 'ai' && (
          <div className="flex flex-col h-full gap-4">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 max-h-[1050px] pr-2">
              {currentMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col w-fit max-w-[85%] rounded-2xl px-4 py-3 border ${
                    msg.sender === 'user'
                      ? 'self-end bg-secondary-a90 text-white border-secondary-a70 rounded-tr-none'
                      : 'self-start bg-tonal-a20 text-neutral-a50 border-tonal-a30 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  <span className="text-[10px] text-neutral-a400 self-end mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="self-start bg-tonal-a20 text-neutral-a50 border border-tonal-a30 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-neutral-a300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-neutral-a300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-neutral-a300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Field */}
            <form
              onSubmit={handleSendMessage}
              className="flex gap-2 items-center bg-tonal-a20 border border-tonal-a30 rounded-xl p-2 mt-auto"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask AI Tutor: 'gợi ý thuật toán'..."
                className="flex-1 bg-transparent text-white placeholder-neutral-a400 border-none outline-none py-2 px-3 text-sm"
              />
              <button
                type="submit"
                className="p-2 bg-secondary-a90 hover:bg-secondary-a70 text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Send"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9-7-9-7v14z"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'subs' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-white h5 font-bold mb-2">Submission History</h2>
            {currentSubmissions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {currentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 bg-tonal-a20 border border-tonal-a30 rounded-xl flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                            sub.status === 'Accepted'
                              ? 'bg-success-a0/20 text-success-a0'
                              : 'bg-danger-a0/20 text-danger-a0'
                          }`}
                        >
                          {sub.status}
                        </span>
                        <span className="text-neutral-a300 text-sm">
                          {sub.language}
                        </span>
                      </div>
                      <span className="text-neutral-a400 text-xs">
                        {sub.time}
                      </span>
                    </div>

                    <div className="flex gap-6 text-sm text-neutral-a300">
                      <div>
                        Runtime:{' '}
                        <strong className="text-white">{sub.runtime}</strong>
                      </div>
                      <div>
                        Memory:{' '}
                        <strong className="text-white">{sub.memory}</strong>
                      </div>
                    </div>

                    <details className="mt-1 cursor-pointer">
                      <summary className="text-secondary-a50 hover:text-secondary-a70 text-xs font-bold transition-colors select-none">
                        View Code Submission
                      </summary>
                      <pre className="mt-3 p-3 bg-[#0a0e15] border border-tonal-a30 rounded-lg text-xs text-neutral-a200 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                        <code>{sub.code}</code>
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-a400 text-sm">
                No submissions yet. Write code and hit Submit to run tests!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemTabsSection;
