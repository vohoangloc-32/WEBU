import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

type Language = 'javascript' | 'python' | 'cpp' | 'java';

interface CodeTemplates {
  [problemId: string]: {
    [lang in Language]: string;
  };
}

const TEMPLATES: CodeTemplates = {
  'two-sum': {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
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
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
    cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
  },
  'add-two-numbers': {
    javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  // Write your code here
  let dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;
  
  while (l1 !== null || l2 !== null || carry !== 0) {
    let sum = carry;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
  }
  return dummy.next;
}`,
    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        dummy = ListNode(0)
        curr = dummy
        carry = 0
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            total = val1 + val2 + carry
            carry = total // 10
            curr.next = ListNode(total % 10)
            curr = curr.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return dummy.next`,
    cpp: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your code here
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int val1 = l1 ? l1->val : 0;
            int val2 = l2 ? l2->val : 0;
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
            l1 = l1 ? l1->next : nullptr;
            l2 = l2 ? l2->next : nullptr;
        }
        return dummy->next;
    }
};`,
    java: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your code here
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        return dummy.next;
    }
}`,
  },
  'longest-palindromic-substring': {
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  // Write your code here
  if (!s || s.length < 1) return "";
  let start = 0, end = 0;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
  
  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(i, i);
    let len2 = expandAroundCenter(i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
}`,
    python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Write your code here
        if not s:
            return ""
        start, end = 0, 0
        def expand(left, right):
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return right - left - 1
        for i in range(len(s)):
            len1 = expand(i, i)
            len2 = expand(i, i + 1)
            length = max(len1, len2)
            if length > end - start:
                start = i - (length - 1) // 2
                end = i + length // 2
        return s[start:end + 1]`,
    cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Write your code here
        if (s.empty()) return "";
        int start = 0, end = 0;
        auto expand = [&](int left, int right) {
            while (left >= 0 && right < s.length() && s[left] == s[right]) {
                left--;
                right++;
            }
            return right - left - 1;
        };
        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(i, i);
            int len2 = expand(i, i + 1);
            int len = max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substr(start, end - start + 1);
    }
};`,
    java: `class Solution {
    public String longestPalindrome(String s) {
        // Write your code here
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`,
  },
};

export const CodeEditorSection = (): JSX.Element => {
  const { problemId = 'two-sum' } = useParams<{ problemId: string }>();
  const [lang, setLang] = useState<Language>('javascript');
  const [code, setCode] = useState('');

  // Console panel state
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [runState, setRunState] = useState<
    'idle' | 'running' | 'success' | 'submitted' | 'wrong'
  >('idle');
  const [consoleLog, setConsoleLog] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Update code template based on problemId and selected language
  useEffect(() => {
    const templates = TEMPLATES[problemId] || TEMPLATES['two-sum'];
    setCode(templates[lang]);
    setRunState('idle');
    setConsoleLog('');
  }, [problemId, lang]);

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const getLanguageLabel = (l: Language) => {
    switch (l) {
      case 'javascript':
        return 'JavaScript (ES6)';
      case 'python':
        return 'Python 3';
      case 'cpp':
        return 'C++20';
      case 'java':
        return 'Java 17';
    }
  };

  const lines = code.split('\n');

  // Trigger Mock Code Execution
  const handleRunCode = () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleLog('Compiling and running code against sample tests...');

    setTimeout(() => {
      setRunState('success');
      let resultText = '';
      if (problemId === 'two-sum') {
        resultText = `⚡ Test Case 1: nums = [2,7,11,15], target = 9
✔ Output: [0,1]
✔ Expected: [0,1]
✔ Status: Passed (0.01ms)

⚡ Test Case 2: nums = [3,2,4], target = 6
✔ Output: [1,2]
✔ Expected: [1,2]
✔ Status: Passed (0.01ms)

🎉 All sample tests passed successfully!`;
      } else if (problemId === 'add-two-numbers') {
        resultText = `⚡ Test Case 1: l1 = [2,4,3], l2 = [5,6,4]
✔ Output: [7,0,8]
✔ Expected: [7,0,8]
✔ Status: Passed (0.02ms)

🎉 Sample test passed successfully!`;
      } else {
        resultText = `⚡ Test Case 1: s = "babad"
✔ Output: "bab"
✔ Expected: "bab" or "aba"
✔ Status: Passed (0.05ms)

🎉 Sample test passed successfully!`;
      }
      setConsoleLog(resultText);
    }, 1200);
  };

  // Trigger Mock Full Submission
  const handleSubmitCode = () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleLog('Running full suite of 52 hidden test cases...');

    setTimeout(() => {
      setRunState('submitted');
      setConsoleLog(`🏆 Submission Accepted!
🎉 Status: Solved
✔ 52/52 test cases passed.
🚀 Runtime: 64 ms (Beats 94.2% of submissions)
💾 Memory: 42.4 MB (Beats 88.5% of submissions)

Great job! You have earned +100 XP and saved notes to your personalized tutor profile.`);
    }, 2000);
  };

  return (
    <div
      className="absolute top-0 left-0 w-[717px] h-[1319px] bg-[#0d131f] border-l border-tonal-a20 flex flex-col select-none"
      data-id="code-editor-section"
    >
      {/* Editor Header: Lang and Reset */}
      <div className="h-[60px] border-b border-tonal-a20 bg-[#0d131f] flex items-center justify-between px-6">
        <div className="relative">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-tonal-a20 text-white font-semibold py-1.5 px-3 rounded-lg border border-tonal-a30 text-sm focus:border-secondary-a70 outline-none cursor-pointer"
          >
            <option value="javascript">{getLanguageLabel('javascript')}</option>
            <option value="python">{getLanguageLabel('python')}</option>
            <option value="cpp">{getLanguageLabel('cpp')}</option>
            <option value="java">{getLanguageLabel('java')}</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            const templates = TEMPLATES[problemId] || TEMPLATES['two-sum'];
            setCode(templates[lang]);
          }}
          className="text-neutral-a400 hover:text-white flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
          title="Reset Code Boilerplate"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12"
            />
          </svg>
          Reset Code
        </button>
      </div>

      {/* Editor Text Area and Line Numbers */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-sm leading-relaxed p-4 bg-[#0a0e17]">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          className="w-12 text-neutral-a600 text-right pr-3 select-none overflow-hidden text-sm pt-2"
          style={{ lineHeight: '24px' }}
        >
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 bg-transparent text-[#e2e8f0] resize-none outline-none border-none overflow-y-auto font-mono text-sm leading-relaxed pt-2 pl-1 whitespace-pre pr-2 selection:bg-secondary-a90/30 select-text"
          style={{
            lineHeight: '24px',
            fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          }}
          spellCheck="false"
          placeholder="// Type your code here..."
        />
      </div>

      {/* Console Drawer Panel */}
      <div
        className={`bg-[#070b12] border-t border-tonal-a20 transition-all duration-300 flex flex-col z-10 ${
          isConsoleOpen ? 'h-[400px]' : 'h-11'
        }`}
      >
        {/* Console Drawer Header */}
        <div
          className="h-11 border-b border-tonal-a20/60 px-6 flex items-center justify-between cursor-pointer hover:bg-tonal-a10/40"
          onClick={() => setIsConsoleOpen(!isConsoleOpen)}
        >
          <span className="text-neutral-a300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            Console Output
            {runState === 'running' && (
              <span className="w-2 h-2 rounded-full bg-secondary-a70 animate-ping" />
            )}
          </span>
          <button
            type="button"
            className="text-neutral-a400 hover:text-white cursor-pointer"
          >
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${isConsoleOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Console content */}
        {isConsoleOpen && (
          <div className="flex-1 p-6 overflow-y-auto font-mono text-xs leading-relaxed text-neutral-a200 bg-[#070b12]">
            {runState === 'running' ? (
              <div className="flex items-center gap-3">
                <svg
                  className="animate-spin h-5 w-5 text-secondary-a70"
                  xmlns="http://www.w3.org/2000/svg"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-neutral-a300 font-bold">
                  {consoleLog}
                </span>
              </div>
            ) : runState === 'success' || runState === 'submitted' ? (
              <pre className="whitespace-pre-wrap">{consoleLog}</pre>
            ) : (
              <div className="text-neutral-a500 italic">
                Press "Run Code" to compile and run sample test cases, or
                "Submit" to test hidden cases.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Actions Bottom Bar */}
      <div className="h-[70px] bg-[#0d131f] border-t border-tonal-a20 px-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsConsoleOpen(!isConsoleOpen)}
          className="text-neutral-a300 hover:text-white px-3 py-2 rounded-lg hover:bg-tonal-a20 text-sm font-bold transition-all cursor-pointer"
        >
          Console
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRunCode}
            disabled={runState === 'running'}
            className="h-10 px-5 bg-tonal-a20 border border-tonal-a30 hover:border-secondary-a70 hover:bg-tonal-a30 text-white font-bold rounded-lg transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Run Code
          </button>
          <button
            type="button"
            onClick={handleSubmitCode}
            disabled={runState === 'running'}
            className="h-10 px-6 bg-success-a0 text-tonal-a0 hover:bg-success-a10 font-bold rounded-lg transition-all text-sm cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorSection;
