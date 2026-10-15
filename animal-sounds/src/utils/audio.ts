import { AnimalId } from '../types';

class AudioManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private currentAudio: HTMLAudioElement | null = null;
  private volume: number = 0.9;
  private narrationEnabled: boolean = true;
  private audioContext: AudioContext | null = null;

  constructor() {
    // Pre-initialize on first user gesture
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  public preloadAll(soundFiles: string[]) {
    soundFiles.forEach((file) => {
      if (!this.audioCache.has(file)) {
        const audio = new Audio(file);
        audio.preload = 'auto';
        this.audioCache.set(file, audio);
      }
    });
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setNarrationEnabled(enabled: boolean) {
    this.narrationEnabled = enabled;
  }

  public isNarrationEnabled(): boolean {
    return this.narrationEnabled;
  }

  public stopCurrent() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public playAnimalSound(
    soundFile: string,
    onEnded?: () => void,
    onStart?: () => void
  ): HTMLAudioElement | null {
    try {
      this.stopCurrent();

      // Trigger soft haptic feedback on supported mobile devices
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(50);
        } catch {
          // Ignore
        }
      }

      let audio = this.audioCache.get(soundFile);
      if (!audio) {
        audio = new Audio(soundFile);
        this.audioCache.set(soundFile, audio);
      }

      audio.currentTime = 0;
      audio.volume = this.volume;
      this.currentAudio = audio;

      const handleEnded = () => {
        audio?.removeEventListener('ended', handleEnded);
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        if (onEnded) onEnded();
      };

      audio.addEventListener('ended', handleEnded, { once: true });

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (onStart) onStart();
          })
          .catch((err) => {
            console.warn('Audio play failed or autoplay policy prevented playback:', err);
            // Fallback synthesized chirp
            this.playSynthChirp();
            if (onEnded) {
              setTimeout(onEnded, 2000);
            }
          });
      }

      return audio;
    } catch (e) {
      console.error('Error in playAnimalSound:', e);
      if (onEnded) onEnded();
      return null;
    }
  }

  public speakNarration(text: string, onDone?: () => void) {
    if (!this.narrationEnabled || !('speechSynthesis' in window)) {
      if (onDone) onDone();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.25; // Friendly higher pitch for toddlers
      utterance.rate = 0.95; // Clear slightly slower rate for young children

      // Try finding a friendly English voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Kid') || v.name.includes('Female') || v.name.includes('Samantha'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferred) {
        utterance.voice = preferred;
      }

      utterance.onend = () => {
        if (onDone) onDone();
      };
      utterance.onerror = () => {
        if (onDone) onDone();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onDone) onDone();
    }
  }

  public playSuccessFanfare() {
    try {
      const ctx = this.getAudioContext();
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C E G C E G
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.25 * this.volume, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch {
      // AudioContext unavailable
    }
  }

  public playPop() {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore
    }
  }

  public playGentleBoing() {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.18 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Ignore
    }
  }

  private playSynthChirp() {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Ignore
    }
  }
}

export const audioManager = new AudioManager();
