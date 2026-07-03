import React from 'react';

/**
 * Parses inline markdown components like **bold** and `code`
 */
export function parseInlineMarkdown(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={i} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-xs text-amber-200 border border-white/5"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}

/**
 * Strips duplicate examples and parses basic Markdown layout (Headers, Lists, Paragraphs)
 */
export function renderFormattedDescription(text: string): React.ReactNode {
  if (!text) return null;

  // 1. Automatically strip out duplicate example sections
  let cleanText = text;
  const exampleMarkers = [
    /###?\s*Examples?/i,
    /Examples?:/i,
    /Example\s*\d+/i,
    /\*\*Example\s*\d+/i,
    /Input\s*:/i,
  ];

  let earliestIndex = -1;
  for (const marker of exampleMarkers) {
    const idx = cleanText.search(marker);
    if (idx !== -1 && (earliestIndex === -1 || idx < earliestIndex)) {
      earliestIndex = idx;
    }
  }

  if (earliestIndex !== -1) {
    cleanText = cleanText.substring(0, earliestIndex).trim();
  }

  // 2. Parse basic Markdown structure (Headers, Lists, Paragraphs)
  const lines = cleanText.split('\n');

  return (
    <div className="text-neutral-300 space-y-3 leading-7">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // Headers: ### Title
        const headerMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const content = headerMatch[2];
          return (
            <h3
              key={idx}
              className={`text-white font-bold tracking-tight mt-4 mb-2 ${
                level === 1 ? 'text-lg' : level === 2 ? 'text-base' : 'text-sm'
              }`}
            >
              {parseInlineMarkdown(content)}
            </h3>
          );
        }

        // List items: - Item or * Item
        const listMatch = trimmed.match(/^[-*+]\s+(.*)$/);
        if (listMatch) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1 my-1">
              <li className="text-neutral-300">
                {parseInlineMarkdown(listMatch[1])}
              </li>
            </ul>
          );
        }

        // Plain paragraph
        return <p key={idx}>{parseInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}
