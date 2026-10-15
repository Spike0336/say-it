import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ANIMALS } from './data/animals';
import { AnimalInfo, GameMode } from './types';
import { audioManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { AnimalStage } from './components/AnimalStage';
import { ParadeNav } from './components/ParadeNav';
import { QuizMode } from './components/QuizMode';
import { SoundboardMode } from './components/SoundboardMode';
import { ParentModal } from './components/ParentModal';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [selectedHabitat, setSelectedHabitat] = useState('all');
  const [mode, setMode] = useState<GameMode>('safari');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentAnimal = ANIMALS[currentIndex] || ANIMALS[0];

  // Preload all 16 animal audio files on initial mount
  useEffect(() => {
    const soundUrls = ANIMALS.map((a) => a.soundFile);
    audioManager.preloadAll(soundUrls);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  const handleNextAnimal = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsSpeaking(false);
    setCurrentIndex((prev) => (prev + 1) % ANIMALS.length);
  }, []);

  const handlePrevAnimal = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsSpeaking(false);
    setCurrentIndex((prev) => (prev - 1 + ANIMALS.length) % ANIMALS.length);
  }, []);

  const handleRandomAnimal = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsSpeaking(false);
    let nextIdx = Math.floor(Math.random() * ANIMALS.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % ANIMALS.length;
    }
    setCurrentIndex(nextIdx);
  }, [currentIndex]);

  const handleSelectAnimal = (animal: AnimalInfo) => {
    const idx = ANIMALS.findIndex((a) => a.id === animal.id);
    if (idx !== -1) {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
      setIsSpeaking(false);
      setCurrentIndex(idx);
      // Play immediately when selected from parade
      setTimeout(() => {
        handlePlaySound(animal);
      }, 150);
    }
  };

  const handlePlaySound = (animal: AnimalInfo) => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    setIsSpeaking(true);

    // Play real animal audio file
    audioManager.playAnimalSound(
      animal.soundFile,
      () => {
        // When real sound finishes:
        setIsSpeaking(false);

        // If Auto-Advance is enabled, transition to a DIFFERENT animal as requested!
        if (autoAdvance) {
          autoAdvanceTimerRef.current = setTimeout(() => {
            handleNextAnimal();
          }, 1400);
        }
      },
      () => {
        // When sound starts, also narrate animal name if enabled
        if (narrationEnabled) {
          audioManager.speakNarration(`${animal.name}!`);
        }
      }
    );
  };

  const handleToggleMute = () => {
    if (isMuted) {
      audioManager.setVolume(volume);
      setIsMuted(false);
    } else {
      audioManager.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    if (!isMuted) {
      audioManager.setVolume(newVal);
    }
  };

  const handleToggleNarration = () => {
    const nextVal = !narrationEnabled;
    setNarrationEnabled(nextVal);
    audioManager.setNarrationEnabled(nextVal);
  };

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'safari') return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextAnimal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevAnimal();
      } else if (e.key === ' ' && !isSpeaking) {
        e.preventDefault();
        handlePlaySound(currentAnimal);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isSpeaking, currentAnimal, handleNextAnimal, handlePrevAnimal]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 via-orange-50/50 to-amber-100/60 flex flex-col justify-between selection:bg-amber-200">
      {/* Top Bar Navigation */}
      <Navbar
        mode={mode}
        onSetMode={setMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenHelp={() => setIsParentModalOpen(true)}
      />

      {/* Main Content Area based on Mode */}
      <main className="flex-1 flex flex-col items-center justify-center py-4">
        {mode === 'safari' && (
          <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
            {/* Primary Animal Stage */}
            <AnimalStage
              animal={currentAnimal}
              isSpeaking={isSpeaking}
              onPlaySound={handlePlaySound}
              onNextAnimal={handleNextAnimal}
              onPrevAnimal={handlePrevAnimal}
              onRandomAnimal={handleRandomAnimal}
              autoAdvance={autoAdvance}
              onToggleAutoAdvance={() => setAutoAdvance(!autoAdvance)}
            />

            {/* Bottom Parade of 16 Animals */}
            <ParadeNav
              animals={ANIMALS}
              currentAnimalId={currentAnimal.id}
              onSelectAnimal={handleSelectAnimal}
              selectedHabitat={selectedHabitat}
              onSelectHabitat={setSelectedHabitat}
            />
          </div>
        )}

        {mode === 'quiz' && (
          <div className="w-full animate-[fadeIn_0.3s_ease-out]">
            <QuizMode animals={ANIMALS} onPlaySound={handlePlaySound} />
          </div>
        )}

        {mode === 'soundboard' && (
          <div className="w-full animate-[fadeIn_0.3s_ease-out]">
            <SoundboardMode animals={ANIMALS} />
          </div>
        )}
      </main>

      {/* Quiet, clean Footer */}
      <footer className="w-full border-t border-amber-200/60 bg-white/60 py-3 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Animal Friends · 16 Real Animal Vocalizations &amp; Animations</span>
          <span>Tap any animal to hear its voice! 🐾</span>
        </div>
      </footer>

      {/* Parent & Sound Settings Modal */}
      <ParentModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        narrationEnabled={narrationEnabled}
        onToggleNarration={handleToggleNarration}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
}
