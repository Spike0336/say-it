import React from 'react';
import { AnimalInfo, Habitat } from '../types';
import { HABITAT_LABELS } from '../data/animals';
import { audioManager } from '../utils/audio';

interface Props {
  animals: AnimalInfo[];
  currentAnimalId: string;
  onSelectAnimal: (animal: AnimalInfo) => void;
  selectedHabitat: string;
  onSelectHabitat: (habitat: string) => void;
}

export const ParadeNav: React.FC<Props> = ({
  animals,
  currentAnimalId,
  onSelectAnimal,
  selectedHabitat,
  onSelectHabitat,
}) => {
  const filteredAnimals =
    selectedHabitat === 'all'
      ? animals
      : animals.filter((a) => a.habitat === selectedHabitat);

  const habitatKeys = ['all', 'farm', 'jungle', 'sky', 'ocean'];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-6">
      {/* Habitat Filter Segmented Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
          Pick an Animal ({filteredAnimals.length})
        </h3>

        {/* Habitat Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {habitatKeys.map((key) => {
            const item = HABITAT_LABELS[key];
            const isActive = selectedHabitat === key;
            return (
              <button
                key={key}
                onClick={() => {
                  audioManager.playPop();
                  onSelectHabitat(key);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/80'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animal Cards Grid / Carousel */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
        {filteredAnimals.map((animal) => {
          const isSelected = animal.id === currentAnimalId;
          return (
            <button
              key={animal.id}
              onClick={() => {
                audioManager.playPop();
                onSelectAnimal(animal);
              }}
              className={`group relative flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all duration-200 border-2 text-center active:scale-95 focus-visible:outline-3 focus-visible:outline-amber-500 ${
                isSelected
                  ? 'bg-amber-100/90 border-amber-500 shadow-md scale-105'
                  : 'bg-white hover:bg-amber-50/50 border-slate-200/90 hover:border-amber-300 shadow-xs'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-1.5 -right-1 text-xs">⭐</span>
              )}
              <span className="text-2xl sm:text-3xl mb-1 transition-transform group-hover:scale-110">
                {animal.emoji}
              </span>
              <span className="text-xs font-black tracking-tight text-slate-800 line-clamp-1">
                {animal.name}
              </span>
              <span className="text-[10px] font-bold text-amber-600 line-clamp-1 opacity-80 group-hover:opacity-100">
                {animal.soundWord.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
