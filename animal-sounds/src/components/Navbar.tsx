import React from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle } from 'lucide-react';
import { GameMode } from '../types';
import { audioManager } from '../utils/audio';

interface Props {
  mode: GameMode;
  onSetMode: (mode: GameMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<Props> = ({
  mode,
  onSetMode,
  isMuted,
  onToggleMute,
  onOpenHelp,
}) => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-amber-200/80 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            audioManager.playPop();
            onSetMode('safari');
          }}
          className="text-xl sm:text-2xl font-black tracking-tight text-amber-600 flex items-center gap-2 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl">🦁</span>
          <span>Animal Friends</span>
        </button>

        {/* Zone 2: Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-slate-600">
          <button
            onClick={() => {
              audioManager.playPop();
              onSetMode('safari');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              mode === 'safari'
                ? 'bg-amber-100 text-amber-900 font-extrabold'
                : 'hover:text-amber-600'
            }`}
          >
            Meet Animals
          </button>
          <button
            onClick={() => {
              audioManager.playPop();
              onSetMode('quiz');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              mode === 'quiz'
                ? 'bg-amber-100 text-amber-900 font-extrabold'
                : 'hover:text-amber-600'
            }`}
          >
            Sound Quiz
          </button>
          <button
            onClick={() => {
              audioManager.playPop();
              onSetMode('soundboard');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              mode === 'soundboard'
                ? 'bg-amber-100 text-amber-900 font-extrabold'
                : 'hover:text-amber-600'
            }`}
          >
            Soundboard
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Mute & Help) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center gap-1.5 border border-amber-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound ON'}</span>
          </button>

          <button
            onClick={onOpenHelp}
            title="Parent Info & Tips"
            aria-label="Parent Info & Tips"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
