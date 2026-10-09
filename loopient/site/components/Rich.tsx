import { Fragment } from 'react';

// A szövegkönyv [TODO: …] és [helykitöltő] részeit láthatóan jelöli, hogy élesítés előtt ne maradjanak benne.
const PLACEHOLDER = /(\[[^\]]+\])/g;

export function Rich({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER);
  if (parts.length === 1) return <>{children}</>;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <mark key={i} className="todo" title="Kitöltendő">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
