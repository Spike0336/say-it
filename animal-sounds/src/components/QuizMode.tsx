import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, Trophy, Star } from 'lucide-react';
import { AnimalInfo } from '../types';
import { audioManager } from '../utils/audio';
import { AnimalIllustration } from './animals/AnimalIllustration';

interface Props {
  animals: AnimalInfo[];
  onPlaySound: (animal: AnimalInfo) => void;
}

export const QuizMode: React.FC<Props> = ({ animals, onPlaySound }) => {
  const [targetAnimal, setTargetAnimal] = useState<AnimalInfo>(animals[0]);
  const [options, setOptions] = useState<AnimalInfo[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [stars, setStars] = useState(0);
  const [round, setRound] = useState(1);
  const [speakingAnimal, setSpeakingAnimal] = useState<string | null>(null);

  // Setup new round
  const startNewRound = () => {
    setIsAnswered(false);
    setSelectedAnimalId(null);
    setIsCorrect(null);
    setSpeakingAnimal(null);

    // Pick 1 random target animal
    const target = animals[Math.floor(Math.random() * animals.length)];
    setTargetAnimal(target);

    // Pick 2 random distractor animals
    const distractors = animals
      .filter((a) => a.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const roundOptions = [target, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(roundOptions);

    // Play target animal sound after brief delay
    setTimeout(() => {
      audioManager.playAnimalSound(target.soundFile);
    }, 400);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleHearAgain = () => {
    audioManager.playAnimalSound(targetAnimal.soundFile);
  };

  const handleCardClick = (animal: AnimalInfo) => {
    if (isAnswered && isCorrect) return;

    setSelectedAnimalId(animal.id);

    if (animal.id === targetAnimal.id) {
      // Correct!
      setIsCorrect(true);
      setIsAnswered(true);
      setStars((s) => s + 1);
      setSpeakingAnimal(animal.id);

      audioManager.playSuccessFanfare();
      audioManager.playAnimalSound(animal.soundFile, () => {
        setSpeakingAnimal(null);
      });

      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
        });
      } catch {
        // Safe fallback
      }

      // Auto-progress after 3 seconds
      setTimeout(() => {
        setRound((r) => r + 1);
        startNewRound();
      }, 3200);
    } else {
      // Gentle encouragement
      setIsCorrect(false);
      audioManager.playGentleBoing();
      audioManager.speakNarration(`That is a ${animal.name}. Can you find the animal that makes this sound?`);
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedAnimalId(null);
      }, 1400);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Quiz Header & Star Count */}
      <div className="w-full flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-amber-500">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-black text-slate-800">Round {round}</span>
        </div>

        {/* Stars Earned */}
        <div className="flex items-center gap-1 bg-amber-100/80 px-3 py-1.5 rounded-full border border-amber-300">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span className="text-xs font-black text-amber-900 font-mono">{stars} Stars</span>
        </div>
      </div>

      {/* Main Listen Prompt Box */}
      <div className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-8 text-center text-white shadow-xl flex flex-col items-center mb-6">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm mb-2">
          Who makes this sound? 🎶
        </h2>
        <p className="text-amber-100 text-sm sm:text-base font-bold mb-4">
          Listen carefully and tap the matching animal!
        </p>

        {/* Big Replay Sound Button */}
        <button
          onClick={handleHearAgain}
          className="px-6 py-3.5 bg-white text-amber-900 rounded-2xl font-black text-base sm:text-lg shadow-lg hover:bg-amber-50 active:scale-95 transition-all flex items-center gap-3 animate-[pulse_2s_ease-in-out_infinite]"
        >
          <Volume2 className="w-6 h-6 text-amber-500 animate-bounce" />
          <span>Listen Again 🔊</span>
        </button>

        {/* Victory Celebration Message */}
        {isAnswered && isCorrect && (
          <div className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-full font-black text-lg sm:text-xl shadow-md animate-bounce flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Yay! You found the {targetAnimal.name}! ⭐</span>
          </div>
        )}
      </div>

      {/* 3 Large Choice Cards for Toddler Touch */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {options.map((animal) => {
          const isSelected = selectedAnimalId === animal.id;
          const isWinning = isAnswered && animal.id === targetAnimal.id;
          const isWrong = isSelected && isCorrect === false;

          return (
            <button
              key={animal.id}
              onClick={() => handleCardClick(animal)}
              disabled={isAnswered && isCorrect === true}
              className={`relative flex flex-col items-center justify-center p-6 rounded-3xl border-4 transition-all duration-300 transform active:scale-95 focus-visible:outline-4 focus-visible:outline-amber-500 shadow-md ${
                isWinning
                  ? 'bg-emerald-100 border-emerald-500 scale-105 shadow-xl ring-4 ring-emerald-300'
                  : isWrong
                  ? 'bg-rose-100 border-rose-400 animate-[shake_0.4s_ease-in-out]'
                  : 'bg-white hover:bg-amber-50/60 border-slate-200/90 hover:border-amber-400'
              }`}
            >
              {/* Winning badge */}
              {isWinning && (
                <div className="absolute -top-3 bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                  Correct! ✨
                </div>
              )}

              {/* Animal Illustration Preview */}
              <div className="w-36 h-36 flex items-center justify-center my-2">
                <AnimalIllustration
                  animalId={animal.id}
                  isSpeaking={speakingAnimal === animal.id}
                />
              </div>

              {/* Animal Name */}
              <span className="text-2xl font-black text-slate-800 tracking-tight mt-2">
                {animal.name}
              </span>

              {/* Hint sound word */}
              <span className="text-xs font-extrabold text-amber-600 mt-1">
                {animal.soundWord}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skip / Next Round Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={startNewRound}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Another Sound</span>
        </button>
      </div>
    </div>
  );
};
