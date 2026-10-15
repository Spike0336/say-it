import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, ArrowRight, ArrowLeft, Shuffle, RotateCcw, Heart } from 'lucide-react';
import { AnimalInfo } from '../types';
import { AnimalIllustration } from './animals/AnimalIllustration';
import { audioManager } from '../utils/audio';

interface Props {
  animal: AnimalInfo;
  isSpeaking: boolean;
  onPlaySound: (animal: AnimalInfo) => void;
  onNextAnimal: () => void;
  onPrevAnimal: () => void;
  onRandomAnimal: () => void;
  autoAdvance: boolean;
  onToggleAutoAdvance: () => void;
}

export const AnimalStage: React.FC<Props> = ({
  animal,
  isSpeaking,
  onPlaySound,
  onNextAnimal,
  onPrevAnimal,
  onRandomAnimal,
  autoAdvance,
  onToggleAutoAdvance,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  // Trigger burst of stars/confetti when animal speaks
  useEffect(() => {
    if (isSpeaking) {
      try {
        confetti({
          particleCount: 28,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EC4899', '#10B981', '#3B82F6', '#8B5CF6'],
          disableForReducedMotion: true,
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isSpeaking]);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Spawn a gentle floating heart / star particle at click coordinates
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newHeart = { id: Date.now() + Math.random(), x, y };
      setFloatingHearts((prev) => [...prev.slice(-8), newHeart]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1200);
    }

    setClickCount((c) => c + 1);
    onPlaySound(animal);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-2 flex flex-col items-center">
      {/* Upper Status & Habitat Indicator */}
      <div className="w-full flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{animal.emoji}</span>
          <span className="text-sm font-bold tracking-wide uppercase text-slate-700 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/80 shadow-xs">
            {animal.habitatName}
          </span>
        </div>

        {/* Auto-Advance Pill Indicator */}
        <button
          onClick={onToggleAutoAdvance}
          title="Toggle Auto-Next after animal speaks"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            autoAdvance
              ? 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600'
              : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{autoAdvance ? 'Auto-Next: ON' : 'Auto-Next: OFF'}</span>
        </button>
      </div>

      {/* Main Interactive Stage Box */}
      <div
        ref={stageRef}
        onClick={handleStageClick}
        role="button"
        tabIndex={0}
        aria-label={`Click to hear ${animal.name} make its real animal sound and see it animate`}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onPlaySound(animal);
          }
        }}
        className={`relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 transform active:scale-[0.98] focus-visible:outline-4 focus-visible:outline-amber-500 overflow-hidden shadow-xl border-4 ${
          isSpeaking ? 'border-amber-400 ring-8 ring-amber-200/60 scale-[1.01]' : 'border-white/90'
        } bg-gradient-to-b ${animal.bgGradient}`}
      >
        {/* Background Environment Scenery Details */}
        <StageScenery habitat={animal.habitat} isSpeaking={isSpeaking} />

        {/* Floating Tap Prompt / Speech Bubble */}
        <div className="relative z-20 flex flex-col items-center">
          {isSpeaking ? (
            <div className="animate-[bounce_0.35s_ease-in-out_infinite] bg-amber-400 text-amber-950 font-black text-2xl sm:text-4xl px-6 py-2.5 rounded-full shadow-lg border-3 border-amber-500 flex items-center gap-3">
              <Volume2 className="w-7 h-7 sm:w-9 sm:h-9 animate-pulse" />
              <span>{animal.soundWord}</span>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-xs text-slate-800 font-extrabold text-base sm:text-xl px-5 py-2 rounded-full shadow-md border-2 border-slate-200 flex items-center gap-2.5 animate-[pulse_2.5s_ease-in-out_infinite]">
              <span className="text-xl">👉</span>
              <span>Tap the {animal.name}!</span>
              <Volume2 className="w-5 h-5 text-amber-500" />
            </div>
          )}

          {/* Animal Big Name */}
          <h2 className={`mt-2 font-black tracking-tight text-3xl sm:text-5xl ${animal.textColor} drop-shadow-xs`}>
            {animal.name}
          </h2>
        </div>

        {/* Centered Animated Animal */}
        <div className="relative z-10 w-full h-[240px] sm:h-[320px] md:h-[360px] flex items-center justify-center my-1 sm:my-2">
          <AnimalIllustration animalId={animal.id} isSpeaking={isSpeaking} />

          {/* Floating Tap Hearts/Stars */}
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              style={{ left: heart.x, top: heart.y }}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-[ping_0.8s_ease-out_forwards] text-amber-400"
            >
              <Heart className="w-8 h-8 fill-amber-400 text-amber-500" />
            </div>
          ))}
        </div>

        {/* Fun Fact Footer Callout */}
        <div className="relative z-20 mt-auto pt-2 flex justify-center">
          <div className="bg-white/85 backdrop-blur-xs text-slate-700 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-slate-200/90 shadow-xs max-w-lg text-center">
            {animal.funFact}
          </div>
        </div>
      </div>

      {/* Toddler Big Action Buttons */}
      <div className="w-full mt-4 flex items-center justify-between gap-3">
        {/* Previous Animal Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            audioManager.playPop();
            onPrevAnimal();
          }}
          className="flex-1 max-w-[140px] py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-extrabold text-sm sm:text-base shadow-md hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Center Repeat Sound Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlaySound(animal);
          }}
          className={`flex-1 py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 ${
            isSpeaking ? 'bg-amber-600 scale-[1.02]' : 'bg-amber-500 hover:bg-amber-600'
          }`}
        >
          <Volume2 className="w-6 h-6 animate-pulse" />
          <span>{isSpeaking ? 'Speaking!' : `Hear ${animal.name}`}</span>
        </button>

        {/* Random / Surprise Animal Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            audioManager.playPop();
            onRandomAnimal();
          }}
          title="Surprise me with a random animal"
          className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 text-purple-600 shadow-md hover:bg-purple-50 active:scale-95 transition-all flex items-center justify-center"
        >
          <Shuffle className="w-5 h-5" />
        </button>

        {/* Next Animal Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            audioManager.playPop();
            onNextAnimal();
          }}
          className="flex-1 max-w-[160px] py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Next</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Subtle Vector Environmental Scenery tailored to habitat
const StageScenery: React.FC<{ habitat: string; isSpeaking: boolean }> = ({ habitat, isSpeaking }) => {
  if (habitat === 'farm') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        {/* Sunny Clouds */}
        <div className="absolute top-4 left-6 w-20 h-8 bg-white/70 rounded-full blur-[1px]" />
        <div className="absolute top-10 right-10 w-28 h-10 bg-white/70 rounded-full blur-[1px]" />
        {/* Sun */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-amber-300/50 rounded-full blur-md" />
        {/* Rolling Hills & Barn silhouette */}
        <div className="absolute -bottom-10 -left-10 -right-10 h-32 bg-emerald-200/50 rounded-[50%]" />
        <div className="absolute -bottom-16 left-1/3 -right-20 h-36 bg-emerald-300/40 rounded-[50%]" />
      </div>
    );
  }

  if (habitat === 'jungle') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        {/* Warm Golden Sun */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-amber-300/40 rounded-full blur-md" />
        {/* Tropical Leaves silhouettes */}
        <div className="absolute top-0 right-4 w-24 h-24 border-t-8 border-r-8 border-emerald-400/40 rounded-tr-full" />
        <div className="absolute top-12 -right-2 w-32 h-32 border-t-8 border-r-8 border-emerald-500/30 rounded-tr-full" />
        {/* Savanna ground */}
        <div className="absolute -bottom-10 -left-10 -right-10 h-28 bg-amber-200/50 rounded-[50%]" />
      </div>
    );
  }

  if (habitat === 'ocean') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
        {/* Rising Ocean Bubbles */}
        <div className="absolute bottom-16 left-8 w-4 h-4 bg-sky-200/60 rounded-full animate-bounce" />
        <div className="absolute bottom-28 left-16 w-6 h-6 bg-sky-200/60 rounded-full animate-ping" />
        <div className="absolute bottom-20 right-12 w-5 h-5 bg-sky-200/60 rounded-full animate-bounce" />
        {/* Gentle Ocean Waves */}
        <div className="absolute -bottom-8 -left-10 -right-10 h-24 bg-sky-300/40 rounded-[50%]" />
        <div className="absolute -bottom-14 left-1/4 -right-14 h-32 bg-blue-400/30 rounded-[50%]" />
      </div>
    );
  }

  // Sky habitat
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      <div className="absolute -top-10 -left-10 w-36 h-36 bg-amber-200/50 rounded-full blur-md" />
      <div className="absolute top-12 left-10 w-32 h-12 bg-white/80 rounded-full blur-[1px]" />
      <div className="absolute top-20 right-8 w-40 h-14 bg-white/80 rounded-full blur-[1px]" />
      {/* Rainbow Arc */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full border-8 border-rose-300/30 border-b-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border-8 border-amber-300/30 border-b-transparent" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border-8 border-emerald-300/30 border-b-transparent" />
    </div>
  );
};
