import { useState, useEffect, useRef, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { editor as MonacoEditorNS } from 'monaco-editor';
import { ideApi } from '../api/ideService';
import {
  Language,
  BoilerplateCode,
  RunCodeResult,
  SubmitResult,
  TestCaseResult,
} from '../types/ide';
import { QuizModal } from '../components/quiz/QuizModal';

interface CodeEditorSectionProps {
  cardId: string;
  boilerplateCodes: BoilerplateCode;
  onSubmissionDone?: (isPassed: boolean) => void;
  cardTitle?: string;
}

const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: 'JavaScript',
  python: 'Python 3',
  cpp: 'C++20',
  java: 'Java 17',
  typescript: 'TypeScript',
};

// Monaco language ID mapping
const MONACO_LANG: Record<Language, string> = {
  javascript: 'javascript',
  python: 'python',
  cpp: 'cpp',
  java: 'java',
  typescript: 'typescript',
};

const FONT_SIZES = [12, 14, 16, 18];

type RunState = 'idle' | 'running' | 'success' | 'submitted' | 'error';

// ── Console formatters ───────────────────────────────────────────────────────
const formatRunResult = (
  result: RunCodeResult,
): { text: string; items: TestCaseResult[] } => {
  if (result.results.length === 0)
    return { text: '⚠️  No test cases to run.', items: [] };
  const passCount = result.results.filter((r) => r.passed).length;
  const summary = result.all_passed
    ? '🎉  All test cases passed!'
    : `📊  ${passCount}/${result.results.length} passed`;
  return { text: summary, items: result.results };
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

// ── Component ────────────────────────────────────────────────────────────────
export const CodeEditorSection = ({
  cardId,
  boilerplateCodes,
  onSubmissionDone,
  cardTitle = 'Bài tập',
}: CodeEditorSectionProps): JSX.Element => {
  const [lang, setLang] = useState<Language>('javascript');
  const [code, setCode] = useState('');
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [consolePct, setConsolePct] = useState(35);
  const [runState, setRunState] = useState<RunState>('idle');
  const [consoleLog, setConsoleLog] = useState('');
  const [consoleTitle, setConsoleTitle] = useState('Console');
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [activeResultTab, setActiveResultTab] = useState<'output' | 'cases'>(
    'output',
  );
  const [fontSize, setFontSize] = useState(14);
  const [fontSizeIdx, setFontSizeIdx] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const editorRef = useRef<MonacoEditorNS.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Boilerplate ────────────────────────────────────────────────────────────
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
    setTestResults([]);
    setIsConsoleOpen(false);
  }, [lang, getTemplate]);

  useEffect(() => {
    setCode(getTemplate(lang));
    setRunState('idle');
    setConsoleLog('');
    setTestResults([]);
    setIsConsoleOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  // ── Elapsed timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (runState === 'running') {
      setElapsedSec(0);
      timerRef.current = setInterval(() => {
        setElapsedSec((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [runState]);

  // ── Monaco mount ───────────────────────────────────────────────────────────
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Custom dark theme to match the UI
    monaco.editor.defineTheme('webu-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7a99', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7c8dff' },
        { token: 'string', foreground: '7dd3a8' },
        { token: 'number', foreground: 'f0a070' },
        { token: 'type', foreground: '65d9ef' },
        { token: 'function', foreground: 'dcdcaa' },
      ],
      colors: {
        'editor.background': '#0a0f1a',
        'editor.foreground': '#e2e8f0',
        'editorLineNumber.foreground': '#3a4560',
        'editorLineNumber.activeForeground': '#6b7a99',
        'editor.selectionBackground': '#3b4f7033',
        'editor.lineHighlightBackground': '#131d2e',
        'editorCursor.foreground': '#7c8dff',
        'editor.inactiveSelectionBackground': '#2a3548',
        'scrollbarSlider.background': '#1e2c44',
        'scrollbarSlider.hoverBackground': '#2a3d5a',
        'editorIndentGuide.background1': '#1e2840',
        'editorBracketMatch.background': '#3b4f7066',
        'editorBracketMatch.border': '#7c8dff',
      },
    });
    monaco.editor.setTheme('webu-dark');

    // Keyboard shortcut: Ctrl+Enter = Run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      void handleRunCode();
    });
    // Ctrl+Shift+Enter = Submit
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      () => {
        void handleSubmitCode();
      },
    );
  };

  // ── Console drag resize ────────────────────────────────────────────────────
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
    setConsolePct(Math.min(65, Math.max(20, newPct)));
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

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleRunCode = async () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleTitle('Running...');
    setConsoleLog('Compiling and running against sample test cases...');
    setTestResults([]);
    setActiveResultTab('output');
    try {
      const result = await ideApi.runCode(cardId, code, lang);
      setRunState('success');
      setConsoleTitle('Run Result');
      const { text, items } = formatRunResult(result);
      setConsoleLog(text);
      setTestResults(items);
      if (items.length > 0) setActiveResultTab('cases');
    } catch (err) {
      setRunState('error');
      setConsoleTitle('Error');
      setConsoleLog(
        `❌  ${err instanceof Error ? err.message : 'Runtime error. Please try again.'}`,
      );
    }
  };

  const handleSubmitCode = async () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleTitle('Submitting...');
    setConsoleLog('Running full suite of test cases...');
    setTestResults([]);
    setActiveResultTab('output');
    try {
      const result = await ideApi.submitCode(cardId, code, lang);
      setRunState(result.passed ? 'submitted' : 'error');
      setConsoleTitle(result.passed ? '✅  Accepted' : `❌  ${result.status}`);
      setConsoleLog(formatSubmitResult(result));
      setTestResults(result.results);
      if (onSubmissionDone) {
        onSubmissionDone(result.passed);
      }
      // Hiển thị quiz khi submit passed
      if (result.passed) {
        setTimeout(() => {
          setShowQuiz(true);
        }, 1200); // delay nhỏ để user thấy kết quả trước
      }
    } catch (err) {
      setRunState('error');
      setConsoleTitle('Error');
      setConsoleLog(
        `❌  ${err instanceof Error ? err.message : 'Submission failed. Please log in and try again.'}`,
      );
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
    }
  };

  const handleFormatCode = () => {
    if (editorRef.current) {
      void editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const handleFontSize = () => {
    const next = (fontSizeIdx + 1) % FONT_SIZES.length;
    setFontSizeIdx(next);
    setFontSize(FONT_SIZES[next]);
    editorRef.current?.updateOptions({ fontSize: FONT_SIZES[next] });
  };

  const handleFullscreen = () => {
    setIsFullscreen((f) => !f);
  };

  // ── Status color ──────────────────────────────────────────────────────────
  const statusColor =
    runState === 'submitted'
      ? 'text-emerald-400'
      : runState === 'error'
        ? 'text-red-400'
        : runState === 'success'
          ? 'text-blue-400'
          : 'text-neutral-400';

  const wrapperClass = isFullscreen
    ? 'fixed inset-0 z-50 flex flex-col bg-[#0a0f1a]'
    : 'w-full h-full bg-[#0a0f1a] flex flex-col rounded-xl border border-white/[0.07] overflow-hidden';

  return (
    <div ref={containerRef} className={wrapperClass}>
      {/* ── Editor toolbar ─────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 h-11 flex items-center justify-between px-3 border-b border-white/[0.07] bg-[#111827]">
        {/* Left: language selector */}
        <div className="flex items-center gap-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="text-white text-xs font-semibold py-1 px-2.5 rounded-md border border-white/10 focus:border-blue-500/60 outline-none cursor-pointer transition-colors"
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
        </div>

        {/* Right: editor controls */}
        <div className="flex items-center gap-0.5">
          {/* Font size */}
          <button
            type="button"
            onClick={handleFontSize}
            className="h-7 px-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors text-xs font-mono cursor-pointer"
            title={`Font size: ${fontSize}px (click to cycle)`}
          >
            {fontSize}px
          </button>

          {/* Format */}
          <button
            type="button"
            onClick={handleFormatCode}
            className="h-7 px-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
            title="Format code (Alt+Shift+F)"
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="h-7 px-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <svg
                className="w-3.5 h-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={() => {
              setCode(getTemplate(lang));
              editorRef.current?.setValue(getTemplate(lang));
            }}
            className="h-7 px-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
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
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={handleFullscreen}
            className="h-7 px-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
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
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            ) : (
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Monaco Editor ──────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Editor
          language={MONACO_LANG[lang]}
          value={code}
          onChange={(val) => setCode(val ?? '')}
          onMount={handleEditorMount}
          theme="webu-dark"
          options={{
            fontSize,
            fontFamily:
              "'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace",
            fontLigatures: true,
            lineHeight: 1.7,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            renderWhitespace: 'selection',
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoIndent: 'full',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
              useShadows: false,
            },
            lineNumbersMinChars: 3,
            renderLineHighlight: 'line',
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {/* ── Console panel (slide-up overlay) ──────────────────────────────── */}
      {isConsoleOpen && (
        <>
          {/* Resize handle */}
          <div
            onMouseDown={onConsoleDividerMouseDown}
            className="flex-shrink-0 h-2 flex items-center justify-center cursor-row-resize group bg-transparent hover:bg-white/5 transition-colors z-10"
          >
            <div className="w-16 h-0.5 rounded-full bg-white/10 group-hover:bg-blue-500/60 transition-colors" />
          </div>

          {/* Console panel */}
          <div
            className="flex-shrink-0 flex flex-col border-t border-white/[0.07] bg-[#070c14]"
            style={{ height: `${consolePct}%` }}
          >
            {/* Console header */}
            <div className="flex-shrink-0 h-9 px-3 flex items-center justify-between border-b border-white/[0.05]">
              {/* Tabs */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveResultTab('output')}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeResultTab === 'output'
                      ? 'bg-white/10 text-white'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <span
                    className={`flex items-center gap-1.5 uppercase tracking-wider ${statusColor}`}
                  >
                    {consoleTitle}
                    {runState === 'running' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    )}
                  </span>
                </button>

                {testResults.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveResultTab('cases')}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      activeResultTab === 'cases'
                        ? 'bg-white/10 text-white'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Test Cases ({testResults.filter((r) => r.passed).length}/
                    {testResults.length})
                  </button>
                )}
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() => setIsConsoleOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors cursor-pointer h-6 w-6 flex items-center justify-center rounded hover:bg-white/10"
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
            <div className="flex-1 min-h-0 overflow-y-auto">
              {/* Running state */}
              {runState === 'running' && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-400">
                  <div className="relative">
                    <svg
                      className="animate-spin h-8 w-8 text-blue-500/30"
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
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-blue-400">
                        {elapsedSec}s
                      </span>
                    </div>
                  </div>
                  <span className="text-xs">{consoleLog}</span>
                </div>
              )}

              {/* Output tab */}
              {runState !== 'running' && activeResultTab === 'output' && (
                <pre
                  className={`px-4 py-3 font-mono text-xs leading-relaxed whitespace-pre-wrap h-full ${
                    runState === 'error' ? 'text-red-400' : 'text-neutral-200'
                  }`}
                >
                  {consoleLog || (
                    <span className="text-neutral-600 italic">
                      Press "Run" to test with sample cases, or "Submit" to run
                      all hidden tests.
                    </span>
                  )}
                </pre>
              )}

              {/* Test cases tab */}
              {runState !== 'running' &&
                activeResultTab === 'cases' &&
                testResults.length > 0 && (
                  <div className="px-3 py-3 space-y-2">
                    {testResults.map((tc, idx) => (
                      <details
                        key={idx}
                        className={`rounded-lg border overflow-hidden ${
                          tc.passed
                            ? 'border-emerald-500/30 bg-emerald-500/5'
                            : 'border-red-500/30 bg-red-500/5'
                        }`}
                        open={!tc.passed}
                      >
                        <summary className="flex items-center justify-between px-3 py-2 cursor-pointer select-none list-none">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                tc.passed
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-red-500 text-white'
                              }`}
                            >
                              {tc.passed ? '✓' : '✗'}
                            </span>
                            <span
                              className={`text-xs font-semibold ${tc.passed ? 'text-emerald-400' : 'text-red-400'}`}
                            >
                              Case {idx + 1}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {tc.execution_time && (
                              <span className="text-neutral-600 text-[10px]">
                                {tc.execution_time}s
                              </span>
                            )}
                            <svg
                              className="w-3 h-3 text-neutral-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </summary>
                        <div className="px-3 pb-3 space-y-2 font-mono text-xs">
                          <div>
                            <span className="text-neutral-500">Input: </span>
                            <code className="text-neutral-300">{tc.input}</code>
                          </div>
                          <div>
                            <span className="text-neutral-500">Expected: </span>
                            <code className="text-emerald-400">
                              {tc.expected_output}
                            </code>
                          </div>
                          <div>
                            <span className="text-neutral-500">Got: </span>
                            <code
                              className={
                                tc.passed ? 'text-emerald-400' : 'text-red-400'
                              }
                            >
                              {tc.actual_output ?? 'N/A'}
                            </code>
                          </div>
                          {tc.error && (
                            <div className="mt-1 p-2 bg-red-500/10 rounded border border-red-500/20">
                              <span className="text-neutral-500">Error: </span>
                              <code className="text-red-400 whitespace-pre-wrap">
                                {tc.error}
                              </code>
                            </div>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </>
      )}

      {/* ── Bottom action bar ─────────────────────────────────────────────── */}
      <div className="flex-shrink-0 h-12 bg-[#0e1521] border-t border-white/[0.07] px-3 flex items-center justify-between">
        {/* Console toggle */}
        <button
          type="button"
          onClick={() => setIsConsoleOpen((v) => !v)}
          className="text-neutral-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 h-8 px-2 rounded hover:bg-white/5"
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
          {/* Status dot */}
          {runState !== 'idle' && (
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                runState === 'running'
                  ? 'bg-blue-400 animate-pulse'
                  : runState === 'submitted'
                    ? 'bg-emerald-400'
                    : runState === 'error'
                      ? 'bg-red-400'
                      : 'bg-blue-400'
              }`}
            />
          )}
        </button>

        {/* Keyboard hint + buttons */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-700 text-[10px] hidden md:block">
            ⌘↵ Run · ⌘⇧↵ Submit
          </span>
          <button
            type="button"
            id="btn-run-code"
            onClick={() => void handleRunCode()}
            disabled={runState === 'running'}
            className="h-8 px-4 bg-white/[0.06] border border-white/10 hover:border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-all text-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {runState === 'running' ? (
              <svg
                className="animate-spin h-3.5 w-3.5"
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
            ) : (
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
                  d="M5 3l14 9-14 9V3z"
                />
              </svg>
            )}
            Run
          </button>
          <button
            type="button"
            id="btn-submit-code"
            onClick={() => void handleSubmitCode()}
            disabled={runState === 'running'}
            className="h-8 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all text-xs cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Submit
          </button>
        </div>
      </div>

      {/* ── Flashcard Quiz Modal ─────────────────────────────────────────── */}
      <QuizModal
        cardId={cardId}
        cardTitle={cardTitle}
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      />
    </div>
  );
};

export default CodeEditorSection;
