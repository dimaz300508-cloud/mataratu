import React, { useState } from 'react';
import { Music2, X } from 'lucide-react';

const VIDEO_ID = '-It5L-gC6nA';
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=1&rel=0`;

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPlaying((playing) => !playing)}
        title={isPlaying ? 'Tutup pemutar musik' : 'Putar musik latar'}
        aria-label={isPlaying ? 'Tutup pemutar musik latar' : 'Putar musik latar'}
        aria-pressed={isPlaying}
        className={`p-2 rounded-lg border transition-all text-xs flex items-center justify-center cursor-pointer ${
          isPlaying
            ? 'border-amber-500/60 bg-amber-500/15 text-amber-200'
            : 'border-amber-900/40 bg-slate-900/60 text-amber-300/80 hover:text-amber-200 hover:border-amber-500/50'
        }`}
      >
        <Music2 className="w-4 h-4" />
      </button>

      {isPlaying && (
        <div className="fixed bottom-4 right-4 z-[70] w-[min(320px,calc(100vw-2rem))] rounded-xl border border-amber-500/40 bg-slate-950 p-2 shadow-2xl">
          <div className="flex items-center justify-between gap-3 px-1 pb-2">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-amber-300">Musik latar</div>
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-[10px] text-slate-300 hover:text-white"
              >
                Inspiring Cinematic Background Music For Videos
              </a>
            </div>
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              aria-label="Hentikan musik dan tutup pemutar"
              className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            key={VIDEO_ID}
            className="h-[200px] w-full rounded-lg bg-black"
            src={EMBED_URL}
            title="Inspiring Cinematic Background Music For Videos"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
};
