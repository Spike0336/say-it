import React, { useState } from 'react';
import { Volume2, Music, Sparkles } from 'lucide-react';
import { AnimalInfo } from '../types';
import { audioManager } from '../utils/audio';
import { AnimalIllustration } from './animals/AnimalIllustration';

interface Props {
  animals: AnimalInfo[];
}

export const SoundboardMode: React.FC<Props> = ({ animals }) => {
  const [activeAnimalId, setActiveAnimalId] = useState<string | null>(null);

  const handleTileClick = (animal: AnimalInfo) => {
    setActiveAnimalId(animal.id);
    audioManager.playAnimalSound(animal.soundFile, () => {
      setActiveAnimalId((curr) => (curr === animal.id ? null : curr));
    });
  };

  const handleChoirWave = () => {
    audioManager.playSuccessFanfare();
    // Play 4 animals in a cheerful staggered sequence
    const choirSample = [animals[0], animals[1], animals[2], animals[6]];
    choirSample.forEach((animal, idx) => {
      setTimeout(() => {
        audioManager.playAnimalSound(animal.soundFile);
        setActiveAnimalId(animal.id);
        setTimeout(() => setActiveAnimalId(null), 1200);
      }, idx * 600);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Soundboard Header */}
      <div className="w-full flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <Music className="w-6 h-6 text-amber-500" />
            <span>Animal Soundboard &amp; Choir</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Tap any animal tile to hear its real noise and watch it sing!
          </p>
        </div>

        <button
          onClick={handleChoirWave}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl text-xs font-black shadow-md hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Animal Choir 🎶</span>
        </button>
      </div>

      {/* 4x4 Grid of Animated Sound Tiles */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {animals.map((animal) => {
          const isPlaying = activeAnimalId === animal.id;
          return (
            <button
              key={animal.id}
              onClick={() => handleTileClick(animal)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-3xl border-3 transition-all duration-200 transform active:scale-95 focus-visible:outline-4 focus-visible:outline-amber-500 shadow-sm ${
                isPlaying
                  ? 'bg-amber-100 border-amber-500 shadow-lg scale-105 ring-4 ring-amber-200/60'
                  : 'bg-white hover:bg-amber-50/40 border-slate-200 hover:border-amber-300'
              }`}
            >
              {/* Animated Animal Mini Preview */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <AnimalIllustration animalId={animal.id} isSpeaking={isPlaying} />
              </div>

              {/* Animal Name */}
              <span className="text-base font-black text-slate-800 mt-2">
                {animal.name}
              </span>

              {/* Sound Word Badge */}
              <span
                className={`text-[11px] font-extrabold mt-1 px-2.5 py-0.5 rounded-full ${
                  isPlaying
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {animal.soundWord}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
