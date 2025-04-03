'use client'

export const renderEllipsisText = (text: string | undefined, maxWidth = "100%") => {
  if (text == undefined) return;

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block",
        maxWidth: maxWidth,
      }}
    >
      {text}
    </div>
  );
};