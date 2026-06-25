import { useState, useEffect, useRef, useCallback } from 'react';
import { ideApi } from '../api/ideService';
import {
  Language,
  BoilerplateCode,
  RunCodeResult,
  SubmitResult,
  TestCaseResult,
} from '../types/ide';

interface CodeEditorSectionProps {
  cardId: string;
  boilerplateCodes: BoilerplateCode;
}

const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: 'JavaScript',
  python: 'Python 3',
  cpp: 'C++20',
  java: 'Java 17',
  typescript: 'TypeScript',
};

type RunState = 'idle' | 'running' | 'success' | 'submitted' | 'error';

// ── Console formatters ──────────────────────────────────────────────────────
const formatRunResult = (result: RunCodeResult): string => {
  if (result.results.length === 0) return '⚠️  No test cases to run.';
  const lines: string[] = [];
  result.results.forEach((tc: TestCaseResult, idx: number) => {
    lines.push(`── Test Case ${idx + 1} ──────────────────`);
    lines.push(`Input:    ${tc.input}`);
    lines.push(`Expected: ${tc.expected_output}`);
    lines.push(`Output:   ${tc.actual_output ?? 'N/A'}`);
    if (tc.error) lines.push(`Error:    ${tc.error}`);
    lines.push(
      `${tc.passed ? '✅  Passed' : '❌  Failed'}${tc.execution_time ? `  ·  ${tc.execution_time}s` : ''}`,
    );
    lines.push('');
  });
  const passCount = result.results.filter((r) => r.passed).length;
  lines.push(
    result.all_passed
      ? '🎉  All test cases passed!'
      : `📊  ${passCount}/${result.results.length} test cases passed.`,
  );
  return lines.join('\n');
};

const formatSubmitResult = (result: SubmitResult): string => {
  const lines: string[] = [];
  lines.push(result.passed ? '🏆  Accepted!' : `❌  ${result.status}`);
  lines.push(`📊  ${result.passed_tests}/${result.total_tests} tests passed`);
  if (result.execution_time != null)
    lines.push(`⏱   Runtime: ${result.execution_time} ms`);
  if (result.memory_used != null)
    lines.push(`💾  Memory: ${(result.memory_used / 1024).toFixed(1)} MB`);
  if (result.error_details) {
    lines.push('');
    lines.push('🔴  Error:');
    lines.push(result.error_details);
  }
  if (!result.passed && result.results.length > 0) {
    lines.push('');
    lines.push('── Failed Cases ─────────────────────');
    result.results
      .filter((tc) => !tc.passed)
      .slice(0, 3)
      .forEach((tc, i) => {
        lines.push(`\nTest ${i + 1}:`);
        lines.push(`  Input:    ${tc.input}`);
        lines.push(`  Expected: ${tc.expected_output}`);
        lines.push(`  Got:      ${tc.actual_output ?? 'N/A'}`);
        if (tc.error) lines.push(`  Error: ${tc.error}`);
      });
  }
  return lines.join('\n');
};

// ── Component ───────────────────────────────────────────────────────────────
export const CodeEditorSection = ({
  cardId,
  boilerplateCodes,
}: CodeEditorSectionProps): JSX.Element => {
  const [lang, setLang] = useState<Language>('javascript');
  const [code, setCode] = useState('');
  const [consolePct, setConsolePct] = useState(30); // % height of console panel
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [runState, setRunState] = useState<RunState>('idle');
  const [consoleLog, setConsoleLog] = useState('');
  const [consoleTitle, setConsoleTitle] = useState('Console');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // ── Boilerplate ──────────────────────────────────────────────────────────
  const getTemplate = useCallback(
    (l: Language) =>
      (boilerplateCodes[l] as string | undefined) ??
      boilerplateCodes.javascript ??
      boilerplateCodes.python ??
      '// Write your code here',
    [boilerplateCodes],
  );

  useEffect(() => {
    setCode(getTemplate(lang));
    setRunState('idle');
    setConsoleLog('');
  }, [lang, getTemplate]);

  useEffect(() => {
    setCode(getTemplate(lang));
    setRunState('idle');
    setConsoleLog('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  // ── Sync line numbers scroll ─────────────────────────────────────────────
  const handleEditorScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // ── Vertical console resize ──────────────────────────────────────────────
  const onConsoleDividerMouseDown = () => {
    isDragging.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const fromBottom = rect.bottom - e.clientY;
    const newPct = (fromBottom / rect.height) * 100;
    setConsolePct(Math.min(60, Math.max(15, newPct)));
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const lines = code.split('\n');

  // ── Run / Submit ─────────────────────────────────────────────────────────
  const handleRunCode = async () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleTitle('Running...');
    setConsoleLog('Compiling and running against sample test cases...');
    try {
      const result = await ideApi.runCode(cardId, code, lang);
      setRunState('success');
      setConsoleTitle('Run Result');
      setConsoleLog(formatRunResult(result));
    } catch (err) {
      setRunState('error');
      setConsoleTitle('Error');
      setConsoleLog(
        `❌  ${err instanceof Error ? err.message : 'Runtime error.'}`,
      );
    }
  };

  const handleSubmitCode = async () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleTitle('Submitting...');
    setConsoleLog('Running full suite of test cases...');
    try {
      const result = await ideApi.submitCode(cardId, code, lang);
      setRunState(result.passed ? 'submitted' : 'error');
      setConsoleTitle(result.passed ? '✅  Accepted' : `❌  ${result.status}`);
      setConsoleLog(formatSubmitResult(result));
    } catch (err) {
      setRunState('error');
      setConsoleTitle('Error');
      setConsoleLog(
        `❌  ${err instanceof Error ? err.message : 'Submission failed. Please log in and try again.'}`,
      );
    }
  };

  const statusColor =
    runState === 'submitted'
      ? 'text-emerald-400'
      : runState === 'error'
        ? 'text-red-400'
        : runState === 'success'
          ? 'text-secondary-a30'
          : 'text-neutral-400';

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#0a0f1a] flex flex-col rounded-xl border border-white/[0.07] overflow-hidden"
    >
      {/* ── Editor toolbar ── */}
      <div className="flex-shrink-0 h-11 flex items-center justify-between px-4 border-b border-white/[0.07] bg-[#111827]">
        {/* Language selector */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          className="text-white text-xs font-semibold py-1 px-2.5 rounded-md border border-white/10 focus:border-secondary-a70 outline-none cursor-pointer transition-colors"
          style={{ backgroundColor: '#1e2535', color: '#ffffff' }}
        >
          {(Object.entries(LANGUAGE_LABELS) as [Language, string][])
            .filter(([l]) => boilerplateCodes[l])
            .map(([l, label]) => (
              <option
                key={l}
                value={l}
                style={{ backgroundColor: '#1e2535', color: '#ffffff' }}
              >
                {label}
              </option>
            ))}
        </select>

        {/* Reset button */}
        <button
          type="button"
          onClick={() => setCode(getTemplate(lang))}
          className="text-neutral-500 hover:text-white flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer"
          title="Reset to boilerplate"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12"
            />
          </svg>
          Reset
        </button>
      </div>

      {/* ── Editor area (grows, shrinks if console open) ── */}
      <div
        className="flex-1 min-h-0 flex overflow-hidden"
        style={isConsoleOpen ? { flex: `0 0 ${100 - consolePct}%` } : undefined}
      >
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="flex-shrink-0 w-12 overflow-hidden bg-[#0a0f1a] text-neutral-600 text-right pr-3 pt-4 select-none text-xs"
          style={{
            lineHeight: '1.6rem',
            fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          }}
        >
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleEditorScroll}
          className="flex-1 min-w-0 bg-transparent text-[#e2e8f0] resize-none outline-none border-none overflow-auto pt-4 pl-1 pr-4 text-xs selection:bg-secondary-a90/30 select-text"
          style={{
            lineHeight: '1.6rem',
            fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          }}
          spellCheck={false}
          placeholder="// Write your code here..."
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              const { selectionStart, selectionEnd } = e.currentTarget;
              const newCode =
                code.substring(0, selectionStart) +
                '  ' +
                code.substring(selectionEnd);
              setCode(newCode);
              requestAnimationFrame(() => {
                if (textareaRef.current) {
                  textareaRef.current.selectionStart =
                    textareaRef.current.selectionEnd = selectionStart + 2;
                }
              });
            }
          }}
        />
      </div>

      {/* ── Console section ── */}
      {isConsoleOpen && (
        <>
          {/* Resize handle */}
          <div
            onMouseDown={onConsoleDividerMouseDown}
            className="flex-shrink-0 h-1.5 flex items-center justify-center cursor-row-resize group bg-transparent hover:bg-white/5 transition-colors"
          >
            <div className="w-12 h-0.5 rounded-full bg-white/10 group-hover:bg-secondary-a70 transition-colors" />
          </div>

          {/* Console panel */}
          <div
            className="flex-shrink-0 flex flex-col border-t border-white/[0.07] bg-[#070b12] overflow-hidden"
            style={{ height: `${consolePct}%` }}
          >
            {/* Console header */}
            <div className="flex-shrink-0 h-9 px-4 flex items-center justify-between border-b border-white/[0.05]">
              <span
                className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${statusColor}`}
              >
                {consoleTitle}
                {runState === 'running' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-a70 animate-ping" />
                )}
              </span>
              <button
                type="button"
                onClick={() => setIsConsoleOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                title="Close console"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Console body */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed scrollbar-thin">
              {runState === 'running' ? (
                <div className="flex items-center gap-3 text-neutral-400">
                  <svg
                    className="animate-spin h-4 w-4 text-secondary-a70"
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
                  <span>{consoleLog}</span>
                </div>
              ) : runState !== 'idle' ? (
                <pre
                  className={`whitespace-pre-wrap ${runState === 'error' ? 'text-red-400' : 'text-neutral-200'}`}
                >
                  {consoleLog}
                </pre>
              ) : (
                <p className="text-neutral-600 italic">
                  Press "Run Code" to test with sample cases, or "Submit" to run
                  hidden tests.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Bottom action bar ── */}
      <div className="flex-shrink-0 h-14 bg-[#111827] border-t border-white/[0.07] px-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsConsoleOpen((v) => !v)}
          className="text-neutral-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isConsoleOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
          Console
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="btn-run-code"
            onClick={handleRunCode}
            disabled={runState === 'running'}
            className="h-9 px-5 bg-white/[0.06] border border-white/10 hover:border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-all text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Run
          </button>
          <button
            type="button"
            id="btn-submit-code"
            onClick={handleSubmitCode}
            disabled={runState === 'running'}
            className="h-9 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all text-sm cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorSection;
