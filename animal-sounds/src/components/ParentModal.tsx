import React from 'react';
import { X, Volume2, Sparkles, Heart, Baby } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  narrationEnabled: boolean;
  onToggleNarration: () => void;
  volume: number;
  onVolumeChange: (val: number) => void;
}

export const ParentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  narrationEnabled,
  onToggleNarration,
  volume,
  onVolumeChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Parent &amp; Teacher Guide
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Designed specially for toddlers &amp; early learners (ages 2-4)
            </p>
          </div>
        </div>

        {/* Learning Features */}
        <div className="space-y-4 mb-6">
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80">
            <h4 className="text-sm font-extrabold text-amber-900 mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>How Toddlers Play</span>
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Toddlers can tap the big animal illustration to hear authentic animal sounds and see their mouths open and tails wag! When clicked, the game automatically introduces the next animal in the parade so your child stays engaged and learns all 16 animals.
            </p>
          </div>

          {/* Sound Controls */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Audio &amp; Voice Settings
            </h4>

            {/* Volume Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Sound Effects Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Friendly Voice Narration Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-800">Spoken Animal Names</p>
                <p className="text-[11px] text-slate-500">Speak the name aloud for auditory learning</p>
              </div>
              <button
                onClick={onToggleNarration}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  narrationEnabled ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    narrationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-md transition-colors"
        >
          Got It, Let&apos;s Play! 🐾
        </button>
      </div>
    </div>
  );
};
