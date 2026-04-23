import React from 'react';

interface VideoEmbedProps {
  embedCode: string;
  title?: string;
}

export default function VideoEmbed({ embedCode, title }: VideoEmbedProps) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-zen">
      {/* 古典画框装饰 */}
      <div className="absolute inset-0 pointer-events-none border-4 border-zen-tan/30 rounded-xl z-10"></div>
      <div
        dangerouslySetInnerHTML={{ __html: embedCode }}
        className="w-full"
      />
    </div>
  );
}
