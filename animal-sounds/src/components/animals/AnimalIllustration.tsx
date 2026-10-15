import React from 'react';
import { AnimalId } from '../../types';

interface Props {
  animalId: AnimalId;
  isSpeaking: boolean;
  className?: string;
}

export const AnimalIllustration: React.FC<Props> = ({ animalId, isSpeaking, className = 'w-full h-full' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Dynamic Sound Wave Aura when speaking */}
      {isSpeaking && (
        <div className="absolute inset-0 rounded-full animate-ping opacity-25 bg-amber-400 pointer-events-none" />
      )}

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[420px] max-h-[420px] drop-shadow-xl transition-transform duration-300 transform-gpu overflow-visible"
      >
        {animalId === 'dog' && <DogSVG isSpeaking={isSpeaking} />}
        {animalId === 'cat' && <CatSVG isSpeaking={isSpeaking} />}
        {animalId === 'cow' && <CowSVG isSpeaking={isSpeaking} />}
        {animalId === 'horse' && <HorseSVG isSpeaking={isSpeaking} />}
        {animalId === 'donkey' && <DonkeySVG isSpeaking={isSpeaking} />}
        {animalId === 'mouse' && <MouseSVG isSpeaking={isSpeaking} />}
        {animalId === 'lion' && <LionSVG isSpeaking={isSpeaking} />}
        {animalId === 'tiger' && <TigerSVG isSpeaking={isSpeaking} />}
        {animalId === 'elephant' && <ElephantSVG isSpeaking={isSpeaking} />}
        {animalId === 'snake' && <SnakeSVG isSpeaking={isSpeaking} />}
        {animalId === 'bird' && <BirdSVG isSpeaking={isSpeaking} />}
        {animalId === 'pigeon' && <PigeonSVG isSpeaking={isSpeaking} />}
        {animalId === 'seagull' && <SeagullSVG isSpeaking={isSpeaking} />}
        {animalId === 'parrot' && <ParrotSVG isSpeaking={isSpeaking} />}
        {animalId === 'whale' && <WhaleSVG isSpeaking={isSpeaking} />}
        {animalId === 'dolphin' && <DolphinSVG isSpeaking={isSpeaking} />}
      </svg>
    </div>
  );
};

// ==========================================
// 1. DOG (Barking mouth open + vigorous tail wagging)
// ==========================================
const DogSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.4s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Wagging Tail */}
    <g
      className={`origin-[100px_230px] ${
        isSpeaking
          ? 'animate-[wiggle_0.15s_ease-in-out_infinite]'
          : 'animate-[wiggle_1.5s_ease-in-out_infinite]'
      }`}
    >
      <path
        d="M100 230 C 60 210, 40 160, 65 140 C 75 130, 85 145, 80 170 C 78 185, 100 215, 115 220 Z"
        fill="#C27835"
      />
      <circle cx="65" cy="140" r="14" fill="#E6A868" />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="240" rx="90" ry="70" fill="#D98A3C" />
    <ellipse cx="190" cy="250" rx="60" ry="45" fill="#F8C488" />

    {/* Paws */}
    <ellipse cx="140" cy="305" rx="22" ry="14" fill="#C27835" />
    <ellipse cx="240" cy="305" rx="22" ry="14" fill="#C27835" />
    <circle cx="132" cy="307" r="4" fill="#8C4E13" />
    <circle cx="140" cy="308" r="4" fill="#8C4E13" />
    <circle cx="148" cy="307" r="4" fill="#8C4E13" />
    <circle cx="232" cy="307" r="4" fill="#8C4E13" />
    <circle cx="240" cy="308" r="4" fill="#8C4E13" />
    <circle cx="248" cy="307" r="4" fill="#8C4E13" />

    {/* Red Collar & Golden Tag */}
    <path d="M160 175 Q 200 195 240 175" stroke="#E11D48" strokeWidth="12" strokeLinecap="round" />
    <circle cx="200" cy="195" r="9" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />

    {/* Floppy Left Ear */}
    <path
      d="M140 100 C 110 80, 100 130, 120 170 C 128 185, 145 170, 142 140 Z"
      fill="#A85F20"
      className={isSpeaking ? 'origin-[140px_100px] animate-[wiggle_0.25s_ease-in-out_infinite]' : ''}
    />
    {/* Floppy Right Ear */}
    <path
      d="M260 100 C 290 80, 300 130, 280 170 C 272 185, 255 170, 258 140 Z"
      fill="#A85F20"
      className={isSpeaking ? 'origin-[260px_100px] animate-[wiggle_0.25s_ease-in-out_infinite_reverse]' : ''}
    />

    {/* Dog Head */}
    <circle cx="200" cy="125" r="58" fill="#D98A3C" />
    {/* Spot over left eye */}
    <ellipse cx="180" cy="115" rx="20" ry="24" fill="#C27835" />

    {/* Eyes */}
    <circle cx="178" cy="116" r="11" fill="#1E293B" />
    <circle cx="175" cy="112" r="4" fill="#FFFFFF" />
    <circle cx="222" cy="116" r="11" fill="#1E293B" />
    <circle cx="219" cy="112" r="4" fill="#FFFFFF" />

    {/* Snout */}
    <ellipse cx="200" cy="142" rx="28" ry="18" fill="#FDE68A" />
    <polygon points="193,134 207,134 200,144" fill="#1E293B" />

    {/* MOUTH & TONGUE: Articulated for barking */}
    {isSpeaking ? (
      <g className="origin-[200px_145px] animate-[barkMouth_0.2s_ease-in-out_infinite]">
        {/* Open Mouth cavity */}
        <ellipse cx="200" cy="154" rx="16" ry="14" fill="#881337" />
        {/* Tongue panting */}
        <path
          d="M192 153 C 192 170, 208 170, 208 153 Z"
          fill="#FB7185"
          className="animate-[pulse_0.2s_ease-in-out_infinite]"
        />
        {/* Little white teeth */}
        <polygon points="193,144 197,144 195,148" fill="#FFFFFF" />
        <polygon points="203,144 207,144 205,148" fill="#FFFFFF" />
      </g>
    ) : (
      /* Happy closed puppy smile */
      <path d="M192 147 Q 200 155 208 147" stroke="#8C4E13" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 2. CAT (Meowing open mouth + swishing tail + ears)
// ==========================================
const CatSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Tail */}
    <g
      className={`origin-[100px_230px] ${
        isSpeaking ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <path
        d="M105 240 C 70 230, 45 170, 70 135 C 80 120, 95 130, 85 150 C 75 175, 95 210, 115 230 Z"
        fill="#F97316"
      />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="245" rx="85" ry="65" fill="#FB923C" />
    <ellipse cx="190" cy="255" rx="55" ry="45" fill="#FFEDD5" />

    {/* Paws */}
    <ellipse cx="145" cy="305" rx="20" ry="12" fill="#EA580C" />
    <ellipse cx="235" cy="305" rx="20" ry="12" fill="#EA580C" />

    {/* Ears */}
    <polygon
      points="135,120 160,50 185,100"
      fill="#FB923C"
      className={isSpeaking ? 'origin-[160px_90px] animate-[wiggle_0.25s_ease-in-out_infinite]' : ''}
    />
    <polygon points="145,110 160,65 175,98" fill="#F472B6" />

    <polygon
      points="215,100 240,50 265,120"
      fill="#FB923C"
      className={isSpeaking ? 'origin-[240px_90px] animate-[wiggle_0.25s_ease-in-out_infinite_reverse]' : ''}
    />
    <polygon points="225,98 240,65 255,110" fill="#F472B6" />

    {/* Head */}
    <circle cx="200" cy="130" r="54" fill="#FB923C" />

    {/* Big Anime Eyes */}
    <ellipse cx="178" cy="120" rx="13" ry="14" fill="#10B981" />
    <ellipse cx="178" cy="120" rx="6" ry="12" fill="#064E3B" />
    <circle cx="175" cy="115" r="4" fill="#FFFFFF" />

    <ellipse cx="222" cy="120" rx="13" ry="14" fill="#10B981" />
    <ellipse cx="222" cy="120" rx="6" ry="12" fill="#064E3B" />
    <circle cx="219" cy="115" r="4" fill="#FFFFFF" />

    {/* Cute Pink Nose */}
    <polygon points="196,134 204,134 200,140" fill="#F43F5E" />

    {/* Whiskers */}
    <g className={isSpeaking ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : ''}>
      <line x1="140" y1="134" x2="185" y2="138" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="135" y1="144" x2="185" y2="142" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="215" y1="138" x2="260" y2="134" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="215" y1="142" x2="265" y2="144" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Mouth */}
    {isSpeaking ? (
      <g className="origin-[200px_140px] animate-[barkMouth_0.25s_ease-in-out_infinite]">
        <ellipse cx="200" cy="150" rx="14" ry="12" fill="#9F1239" />
        <ellipse cx="200" cy="154" rx="8" ry="6" fill="#FDA4AF" />
        <polygon points="193,142 196,142 194.5,145" fill="#FFFFFF" />
        <polygon points="204,142 207,142 205.5,145" fill="#FFFFFF" />
      </g>
    ) : (
      <path d="M194 140 Q 200 146 206 140" stroke="#7C2D12" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 3. COW (Mooing wide open jaw + pink tongue + tail)
// ==========================================
const CowSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.6s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Tail with Tuft */}
    <g
      className={`origin-[95px_220px] ${
        isSpeaking ? 'animate-[wiggle_0.4s_ease-in-out_infinite]' : 'animate-[wiggle_2.5s_ease-in-out_infinite]'
      }`}
    >
      <path d="M95 220 Q 60 250 70 290" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" />
      <ellipse cx="70" cy="295" rx="12" ry="8" fill="#1E293B" transform="rotate(30 70 295)" />
    </g>

    {/* Cow Body with Spots */}
    <ellipse cx="190" cy="235" rx="95" ry="75" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
    <path d="M130 190 Q 150 230 135 270 Q 110 250 130 190 Z" fill="#1E293B" />
    <path d="M220 200 Q 250 210 260 250 Q 230 260 220 200 Z" fill="#1E293B" />

    {/* Hooves */}
    <rect x="135" y="295" width="30" height="20" rx="6" fill="#475569" />
    <rect x="215" y="295" width="30" height="20" rx="6" fill="#475569" />

    {/* Cow Horns */}
    <path d="M145 95 Q 130 65 140 50 Q 155 70 155 90" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
    <path d="M255 95 Q 270 65 260 50 Q 245 70 245 90" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />

    {/* Ears */}
    <ellipse
      cx="130"
      cy="105"
      rx="24"
      ry="12"
      fill="#FFFFFF"
      stroke="#CBD5E1"
      strokeWidth="2"
      transform="rotate(-20 130 105)"
      className={isSpeaking ? 'origin-[145px_105px] animate-[wiggle_0.3s_ease-in-out_infinite]' : ''}
    />
    <ellipse
      cx="270"
      cy="105"
      rx="24"
      ry="12"
      fill="#FFFFFF"
      stroke="#CBD5E1"
      strokeWidth="2"
      transform="rotate(20 270 105)"
      className={isSpeaking ? 'origin-[255px_105px] animate-[wiggle_0.3s_ease-in-out_infinite_reverse]' : ''}
    />

    {/* Head */}
    <ellipse cx="200" cy="115" rx="55" ry="45" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    {/* Black patch over right eye */}
    <path d="M205 85 Q 245 85 245 125 Q 215 130 205 85 Z" fill="#1E293B" />

    {/* Eyes */}
    <circle cx="170" cy="110" r="10" fill="#1E293B" />
    <circle cx="168" cy="107" r="3.5" fill="#FFFFFF" />
    <circle cx="230" cy="110" r="10" fill="#1E293B" />
    <circle cx="228" cy="107" r="3.5" fill="#FFFFFF" />

    {/* Big Pink Snout & Mooo Mouth */}
    <ellipse cx="200" cy="148" rx="44" ry="26" fill="#FDA4AF" />
    <circle cx="185" cy="142" r="5" fill="#9F1239" />
    <circle cx="215" cy="142" r="5" fill="#9F1239" />

    {isSpeaking ? (
      <g className="origin-[200px_150px] animate-[barkMouth_0.4s_ease-in-out_infinite]">
        {/* Open Cow Mouth */}
        <ellipse cx="200" cy="160" rx="20" ry="14" fill="#881337" />
        {/* Big Cow Tongue */}
        <path d="M190 158 C 190 178, 210 178, 210 158 Z" fill="#FB7185" />
      </g>
    ) : (
      <path d="M188 155 Q 200 162 212 155" stroke="#9F1239" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 4. HORSE (Neighing open mouth + bouncing mane & tail)
// ==========================================
const HorseSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.4s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Tail */}
    <g
      className={`origin-[100px_220px] ${
        isSpeaking ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <path d="M98 220 Q 60 250 75 305" stroke="#451A03" strokeWidth="16" fill="none" strokeLinecap="round" />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="235" rx="90" ry="68" fill="#92400E" />

    {/* Hooves */}
    <rect x="140" y="295" width="28" height="22" rx="4" fill="#1C1917" />
    <rect x="215" y="295" width="28" height="22" rx="4" fill="#1C1917" />

    {/* Neck */}
    <path d="M165 170 L 195 90 L 235 95 L 225 180 Z" fill="#92400E" />

    {/* Flowing Mane */}
    <path
      d="M190 85 Q 170 120 160 170 Q 155 140 175 100 Z"
      fill="#451A03"
      className={isSpeaking ? 'origin-[180px_100px] animate-[wiggle_0.2s_ease-in-out_infinite]' : ''}
    />

    {/* Ears */}
    <polygon points="190,80 200,45 208,80" fill="#78350F" />
    <polygon points="220,80 228,48 235,82" fill="#78350F" />

    {/* Horse Head */}
    <ellipse cx="225" cy="105" rx="35" ry="26" fill="#92400E" transform="rotate(25 225 105)" />
    {/* White forehead star blaze */}
    <polygon points="215,85 220,95 212,98 218,105 210,105" fill="#FFFFFF" />

    {/* Eye */}
    <circle cx="218" cy="98" r="9" fill="#1C1917" />
    <circle cx="216" cy="95" r="3" fill="#FFFFFF" />

    {/* Muzzle */}
    <ellipse cx="245" cy="125" rx="20" ry="16" fill="#B45309" />
    <circle cx="248" cy="120" r="4" fill="#451A03" />

    {/* Neighing Mouth */}
    {isSpeaking ? (
      <g className="origin-[240px_125px] animate-[barkMouth_0.25s_ease-in-out_infinite]">
        <ellipse cx="248" cy="134" rx="14" ry="12" fill="#881337" />
        {/* Teeth */}
        <rect x="240" y="126" width="16" height="4" rx="2" fill="#FFFFFF" />
        <ellipse cx="248" cy="138" rx="8" ry="4" fill="#FDA4AF" />
      </g>
    ) : (
      <path d="M240 130 Q 248 135 254 128" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 5. DONKEY (Braying open mouth + huge floppy ears)
// ==========================================
const DonkeySVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.4s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Tail */}
    <g className={isSpeaking ? 'origin-[95px_225px] animate-[wiggle_0.2s_ease-in-out_infinite]' : ''}>
      <path d="M95 225 Q 70 255 78 295" stroke="#64748B" strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="78" cy="300" r="10" fill="#334155" />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="235" rx="88" ry="66" fill="#94A3B8" />
    <ellipse cx="190" cy="245" rx="55" ry="45" fill="#E2E8F0" />

    {/* Hooves */}
    <rect x="140" y="295" width="28" height="20" rx="4" fill="#334155" />
    <rect x="215" y="295" width="28" height="20" rx="4" fill="#334155" />

    {/* GIANT FLOPPY EARS: Characteristic for Donkey */}
    <g
      className={`origin-[155px_85px] ${
        isSpeaking ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <ellipse cx="140" cy="40" rx="14" ry="48" fill="#64748B" transform="rotate(-25 140 40)" />
      <ellipse cx="140" cy="40" rx="8" ry="36" fill="#FBCFE8" transform="rotate(-25 140 40)" />
    </g>

    <g
      className={`origin-[225px_85px] ${
        isSpeaking
          ? 'animate-[wiggle_0.2s_ease-in-out_infinite_reverse]'
          : 'animate-[wiggle_2s_ease-in-out_infinite_reverse]'
      }`}
    >
      <ellipse cx="240" cy="40" rx="14" ry="48" fill="#64748B" transform="rotate(25 240 40)" />
      <ellipse cx="240" cy="40" rx="8" ry="36" fill="#FBCFE8" transform="rotate(25 240 40)" />
    </g>

    {/* Head */}
    <circle cx="200" cy="115" r="48" fill="#94A3B8" />

    {/* Eyes */}
    <circle cx="178" cy="105" r="9" fill="#1E293B" />
    <circle cx="176" cy="102" r="3" fill="#FFFFFF" />
    <circle cx="222" cy="105" r="9" fill="#1E293B" />
    <circle cx="220" cy="102" r="3" fill="#FFFFFF" />

    {/* Big Light Grey Muzzle */}
    <ellipse cx="200" cy="140" rx="34" ry="24" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
    <circle cx="186" cy="132" r="4" fill="#475569" />
    <circle cx="214" cy="132" r="4" fill="#475569" />

    {/* Hee-Haw Braying Open Mouth */}
    {isSpeaking ? (
      <g className="origin-[200px_140px] animate-[barkMouth_0.3s_ease-in-out_infinite]">
        <ellipse cx="200" cy="150" rx="18" ry="15" fill="#881337" />
        <rect x="190" y="140" width="20" height="4" rx="2" fill="#FFFFFF" />
        <ellipse cx="200" cy="155" rx="10" ry="6" fill="#FDA4AF" />
      </g>
    ) : (
      <path d="M190 146 Q 200 152 210 146" stroke="#475569" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 6. MOUSE (Squeaking nibbling mouth + twitching round ears & curly tail)
// ==========================================
const MouseSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.25s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Long Curly Tail */}
    <g
      className={`origin-[120px_250px] ${
        isSpeaking ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <path d="M120 250 C 70 260, 40 210, 60 170 C 75 140, 110 160, 90 180" stroke="#F472B6" strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>

    {/* Body */}
    <ellipse cx="200" cy="245" rx="70" ry="55" fill="#94A3B8" />
    <ellipse cx="200" cy="255" rx="45" ry="38" fill="#F1F5F9" />

    {/* Tiny Pink Paws */}
    <ellipse cx="170" cy="295" rx="14" ry="8" fill="#F472B6" />
    <ellipse cx="230" cy="295" rx="14" ry="8" fill="#F472B6" />

    {/* Giant Round Mouse Ears */}
    <circle
      cx="140"
      cy="100"
      r="38"
      fill="#94A3B8"
      className={isSpeaking ? 'origin-[140px_100px] animate-[wiggle_0.15s_ease-in-out_infinite]' : ''}
    />
    <circle cx="140" cy="100" r="26" fill="#FBCFE8" />

    <circle
      cx="260"
      cy="100"
      r="38"
      fill="#94A3B8"
      className={isSpeaking ? 'origin-[260px_100px] animate-[wiggle_0.15s_ease-in-out_infinite_reverse]' : ''}
    />
    <circle cx="260" cy="100" r="26" fill="#FBCFE8" />

    {/* Head */}
    <circle cx="200" cy="140" r="46" fill="#94A3B8" />

    {/* Eyes */}
    <circle cx="180" cy="130" r="8" fill="#0F172A" />
    <circle cx="178" cy="128" r="2.5" fill="#FFFFFF" />
    <circle cx="220" cy="130" r="8" fill="#0F172A" />
    <circle cx="218" cy="128" r="2.5" fill="#FFFFFF" />

    {/* Whiskers */}
    <g className={isSpeaking ? 'animate-[wiggle_0.15s_ease-in-out_infinite]' : ''}>
      <line x1="140" y1="150" x2="185" y2="155" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <line x1="138" y1="160" x2="185" y2="160" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <line x1="215" y1="155" x2="260" y2="150" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <line x1="215" y1="160" x2="262" y2="160" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Pink Button Nose */}
    <circle cx="200" cy="150" r="6" fill="#F43F5E" />

    {/* Squeaking Mouth */}
    {isSpeaking ? (
      <g className="origin-[200px_155px] animate-[barkMouth_0.15s_ease-in-out_infinite]">
        <ellipse cx="200" cy="162" rx="10" ry="8" fill="#9F1239" />
        {/* Tiny front teeth */}
        <rect x="197" y="156" width="6" height="5" rx="1" fill="#FFFFFF" />
      </g>
    ) : (
      <path d="M195 158 Q 200 163 205 158" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 7. LION (Majestic mane + roaring wide jaw with fangs)
// ==========================================
const LionSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Lion Tail */}
    <g
      className={`origin-[90px_240px] ${
        isSpeaking ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <path d="M95 240 Q 55 250 60 200" stroke="#D97706" strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="195" r="14" fill="#92400E" />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="245" rx="90" ry="68" fill="#F59E0B" />
    <ellipse cx="190" cy="255" rx="60" ry="46" fill="#FDE68A" />

    {/* Big Paws */}
    <ellipse cx="140" cy="305" rx="24" ry="14" fill="#D97706" />
    <ellipse cx="240" cy="305" rx="24" ry="14" fill="#D97706" />

    {/* Glorious Fluffy Mane (Shivers when roaring!) */}
    <g
      className={
        isSpeaking ? 'origin-[200px_130px] animate-[wiggle_0.2s_ease-in-out_infinite]' : ''
      }
    >
      <circle cx="200" cy="130" r="82" fill="#B45309" />
      <circle cx="140" cy="90" r="30" fill="#92400E" />
      <circle cx="260" cy="90" r="30" fill="#92400E" />
      <circle cx="130" cy="150" r="30" fill="#92400E" />
      <circle cx="270" cy="150" r="30" fill="#92400E" />
      <circle cx="200" cy="65" r="30" fill="#92400E" />
    </g>

    {/* Ears */}
    <circle cx="150" cy="80" r="16" fill="#F59E0B" />
    <circle cx="150" cy="80" r="10" fill="#FDE68A" />
    <circle cx="250" cy="80" r="16" fill="#F59E0B" />
    <circle cx="250" cy="80" r="10" fill="#FDE68A" />

    {/* Head */}
    <circle cx="200" cy="135" r="52" fill="#FBBF24" />

    {/* Eyes */}
    <circle cx="178" cy="120" r="10" fill="#78350F" />
    <circle cx="176" cy="117" r="3.5" fill="#FFFFFF" />
    <circle cx="222" cy="120" r="10" fill="#78350F" />
    <circle cx="220" cy="117" r="3.5" fill="#FFFFFF" />

    {/* Snout */}
    <ellipse cx="200" cy="148" rx="26" ry="16" fill="#FEF3C7" />
    <polygon points="193,138 207,138 200,146" fill="#78350F" />

    {/* Roaring Jaw with Fangs */}
    {isSpeaking ? (
      <g className="origin-[200px_150px] animate-[barkMouth_0.25s_ease-in-out_infinite]">
        <ellipse cx="200" cy="162" rx="20" ry="16" fill="#881337" />
        {/* Top Fangs */}
        <polygon points="188,150 193,150 190.5,158" fill="#FFFFFF" />
        <polygon points="207,150 212,150 209.5,158" fill="#FFFFFF" />
        {/* Red Tongue */}
        <ellipse cx="200" cy="168" rx="11" ry="7" fill="#FB7185" />
      </g>
    ) : (
      <path d="M190 152 Q 200 160 210 152" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 8. TIGER (Stripes + roaring mouth + tail)
// ==========================================
const TigerSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Striped Tail */}
    <g
      className={`origin-[95px_240px] ${
        isSpeaking ? 'animate-[wiggle_0.25s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <path d="M95 240 Q 55 250 65 185" stroke="#EA580C" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M80 235 L 75 245" stroke="#18181B" strokeWidth="4" />
      <path d="M68 215 L 63 223" stroke="#18181B" strokeWidth="4" />
      <circle cx="65" cy="185" r="8" fill="#18181B" />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="245" rx="90" ry="68" fill="#F97316" />
    <ellipse cx="190" cy="255" rx="55" ry="45" fill="#FFEDD5" />
    {/* Body Stripes */}
    <path d="M150 195 L 165 215" stroke="#18181B" strokeWidth="5" strokeLinecap="round" />
    <path d="M220 195 L 205 215" stroke="#18181B" strokeWidth="5" strokeLinecap="round" />
    <path d="M135 240 L 155 245" stroke="#18181B" strokeWidth="5" strokeLinecap="round" />
    <path d="M245 240 L 225 245" stroke="#18181B" strokeWidth="5" strokeLinecap="round" />

    {/* Paws */}
    <ellipse cx="140" cy="305" rx="22" ry="14" fill="#EA580C" />
    <ellipse cx="240" cy="305" rx="22" ry="14" fill="#EA580C" />

    {/* Ears */}
    <polygon points="135,110 155,55 180,95" fill="#EA580C" />
    <polygon points="145,100 155,70 170,95" fill="#FFEDD5" />
    <polygon points="220,95 245,55 265,110" fill="#EA580C" />
    <polygon points="230,95 245,70 255,100" fill="#FFEDD5" />

    {/* Head */}
    <circle cx="200" cy="130" r="54" fill="#F97316" />

    {/* Head Stripes */}
    <polygon points="196,80 204,80 200,98" fill="#18181B" />
    <path d="M165 95 L 180 102" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
    <path d="M235 95 L 220 102" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
    <path d="M155 125 L 170 128" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
    <path d="M245 125 L 230 128" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />

    {/* Tiger Eyes */}
    <ellipse cx="178" cy="120" rx="10" ry="11" fill="#FACC15" />
    <circle cx="178" cy="120" r="6" fill="#18181B" />
    <circle cx="176" cy="117" r="2.5" fill="#FFFFFF" />

    <ellipse cx="222" cy="120" rx="10" ry="11" fill="#FACC15" />
    <circle cx="222" cy="120" r="6" fill="#18181B" />
    <circle cx="220" cy="117" r="2.5" fill="#FFFFFF" />

    {/* Snout */}
    <ellipse cx="200" cy="144" rx="26" ry="16" fill="#FFEDD5" />
    <polygon points="193,135 207,135 200,143" fill="#18181B" />

    {/* Roaring Tiger Mouth */}
    {isSpeaking ? (
      <g className="origin-[200px_145px] animate-[barkMouth_0.25s_ease-in-out_infinite]">
        <ellipse cx="200" cy="158" rx="18" ry="15" fill="#881337" />
        <polygon points="188,146 193,146 190.5,154" fill="#FFFFFF" />
        <polygon points="207,146 212,146 209.5,154" fill="#FFFFFF" />
        <ellipse cx="200" cy="164" rx="10" ry="6" fill="#FB7185" />
      </g>
    ) : (
      <path d="M190 148 Q 200 156 210 148" stroke="#18181B" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 9. ELEPHANT (Flapping big ears + swinging trunk blasting trumpets)
// ==========================================
const ElephantSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.6s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Body */}
    <ellipse cx="200" cy="245" rx="98" ry="75" fill="#64748B" />
    <ellipse cx="200" cy="255" rx="65" ry="50" fill="#94A3B8" />

    {/* Big Sturdy Legs */}
    <rect x="140" y="295" width="34" height="25" rx="6" fill="#475569" />
    <rect x="226" y="295" width="34" height="25" rx="6" fill="#475569" />
    {/* Toenails */}
    <circle cx="148" cy="316" r="4" fill="#CBD5E1" />
    <circle cx="157" cy="316" r="4" fill="#CBD5E1" />
    <circle cx="166" cy="316" r="4" fill="#CBD5E1" />
    <circle cx="234" cy="316" r="4" fill="#CBD5E1" />
    <circle cx="243" cy="316" r="4" fill="#CBD5E1" />
    <circle cx="252" cy="316" r="4" fill="#CBD5E1" />

    {/* FLAPPING BIG EARS: Left & Right */}
    <g
      className={`origin-[130px_110px] ${
        isSpeaking ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <ellipse cx="110" cy="115" rx="42" ry="55" fill="#64748B" />
      <ellipse cx="115" cy="115" rx="26" ry="38" fill="#FBCFE8" />
    </g>

    <g
      className={`origin-[270px_110px] ${
        isSpeaking
          ? 'animate-[wiggle_0.3s_ease-in-out_infinite_reverse]'
          : 'animate-[wiggle_2s_ease-in-out_infinite_reverse]'
      }`}
    >
      <ellipse cx="290" cy="115" rx="42" ry="55" fill="#64748B" />
      <ellipse cx="285" cy="115" rx="26" ry="38" fill="#FBCFE8" />
    </g>

    {/* Head */}
    <circle cx="200" cy="125" r="54" fill="#64748B" />

    {/* Eyes */}
    <circle cx="175" cy="112" r="9" fill="#0F172A" />
    <circle cx="173" cy="109" r="3" fill="#FFFFFF" />
    <circle cx="225" cy="112" r="9" fill="#0F172A" />
    <circle cx="223" cy="109" r="3" fill="#FFFFFF" />

    {/* Tusks */}
    <path d="M170 148 Q 155 170 145 170 Q 165 158 175 145" fill="#F8FAFC" />
    <path d="M230 148 Q 245 170 255 170 Q 235 158 225 145" fill="#F8FAFC" />

    {/* TRUNK: Curls up and trumpets when speaking! */}
    {isSpeaking ? (
      <g className="origin-[200px_135px] animate-[trunkTrumpet_0.35s_ease-in-out_infinite]">
        <path
          d="M192 135 C 190 165, 175 190, 195 205 C 220 215, 235 180, 218 155 C 210 145, 208 135, 208 135 Z"
          fill="#475569"
        />
        {/* Trumpet blast puff / sound circles */}
        <circle cx="226" cy="148" r="8" fill="#FACC15" className="animate-ping" />
        <circle cx="236" cy="142" r="5" fill="#F59E0B" />
        <circle cx="244" cy="135" r="3" fill="#EF4444" />
      </g>
    ) : (
      <path
        d="M192 135 C 190 170, 185 195, 200 215 C 205 220, 215 218, 212 210 C 200 190, 205 165, 208 135 Z"
        fill="#475569"
      />
    )}
  </g>
);

// ==========================================
// 10. SNAKE (Mouth opens with fangs + forked tongue flicking in/out)
// ==========================================
const SnakeSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.4s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Coiled Sinuous Body */}
    <path
      d="M100 280 C 130 250, 180 310, 240 270 C 290 230, 230 190, 180 210 C 140 230, 120 280, 160 300 C 220 320, 310 280, 280 220"
      stroke="#16A34A"
      strokeWidth="28"
      fill="none"
      strokeLinecap="round"
      className={isSpeaking ? 'origin-[200px_250px] animate-[wiggle_0.4s_ease-in-out_infinite]' : ''}
    />
    <path
      d="M100 280 C 130 250, 180 310, 240 270 C 290 230, 230 190, 180 210 C 140 230, 120 280, 160 300 C 220 320, 310 280, 280 220"
      stroke="#86EFAC"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="6 12"
    />

    {/* Snake Rearing Neck & Head */}
    <path d="M190 215 Q 215 170 210 130" stroke="#16A34A" strokeWidth="26" fill="none" strokeLinecap="round" />

    {/* Snake Head */}
    <ellipse cx="215" cy="120" rx="36" ry="24" fill="#22C55E" transform="rotate(-10 215 120)" />

    {/* Eyes */}
    <circle cx="210" cy="110" r="9" fill="#FACC15" />
    <line x1="210" y1="103" x2="210" y2="117" stroke="#0F172A" strokeWidth="3" />
    <circle cx="208" cy="107" r="2" fill="#FFFFFF" />

    {/* SNAKE MOUTH & FLICKERING FORKED TONGUE */}
    {isSpeaking ? (
      <g>
        {/* Open Snake Jaws */}
        <path d="M225 118 L 246 112 L 235 126 Z" fill="#9F1239" />
        {/* Tiny Sharp Fangs */}
        <polygon points="230,113 234,113 232,118" fill="#FFFFFF" />
        {/* Forked Red Tongue flicking rapidly in and out */}
        <g className="origin-[235px_120px] animate-[tongueFlick_0.15s_ease-in-out_infinite]">
          <path d="M235 120 L 265 120 L 275 113 M 265 120 L 275 127" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      </g>
    ) : (
      <path d="M225 122 Q 235 125 245 120" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 11. BIRD (Robin - chirping beak open + flapping wings)
// ==========================================
const BirdSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.35s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Tail Feathers */}
    <g
      className={`origin-[120px_230px] ${
        isSpeaking ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <polygon points="120,230 60,240 70,260 130,240" fill="#0284C7" />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="220" rx="70" ry="60" fill="#0EA5E9" />
    {/* Red/Orange Robin Breast */}
    <ellipse cx="210" cy="225" rx="45" ry="45" fill="#F97316" />

    {/* Little Bird Feet */}
    <line x1="170" y1="275" x2="165" y2="305" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    <line x1="165" y1="305" x2="155" y2="310" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    <line x1="205" y1="275" x2="205" y2="305" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    <line x1="205" y1="305" x2="195" y2="310" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />

    {/* WINGS: Flapping up and down when chirping! */}
    <g
      className={`origin-[150px_210px] ${
        isSpeaking
          ? 'animate-[wingFlap_0.15s_ease-in-out_infinite]'
          : 'animate-[wiggle_3s_ease-in-out_infinite]'
      }`}
    >
      <ellipse cx="160" cy="210" rx="42" ry="26" fill="#0369A1" transform="rotate(-15 160 210)" />
      <path d="M130 210 Q 155 230 185 210" stroke="#38BDF8" strokeWidth="3" fill="none" />
    </g>

    {/* Head */}
    <circle cx="230" cy="140" r="42" fill="#0EA5E9" />
    <circle cx="242" cy="145" r="28" fill="#F97316" />

    {/* Big Eye */}
    <circle cx="238" cy="132" r="9" fill="#0F172A" />
    <circle cx="235" cy="129" r="3" fill="#FFFFFF" />

    {/* OPENING CHIRPING BEAK */}
    {isSpeaking ? (
      <g className="origin-[265px_140px] animate-[barkMouth_0.2s_ease-in-out_infinite]">
        <polygon points="265,130 305,124 270,140" fill="#FBBF24" />
        <polygon points="265,142 300,154 270,148" fill="#F59E0B" />
        {/* Pink mouth inside */}
        <polygon points="266,134 285,138 266,144" fill="#E11D48" />
      </g>
    ) : (
      <polygon points="265,132 295,140 265,148" fill="#FBBF24" />
    )}
  </g>
);

// ==========================================
// 12. PIGEON (Bobbing head + opening beak + puffed chest)
// ==========================================
const PigeonSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.35s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Tail */}
    <polygon points="120,230 65,260 80,275 135,245" fill="#475569" />

    {/* Body */}
    <ellipse cx="190" cy="225" rx="72" ry="62" fill="#64748B" />
    {/* Iridescent Green/Purple Puffed Chest */}
    <ellipse cx="215" cy="220" rx="45" ry="45" fill="#818CF8" />
    <ellipse cx="225" cy="220" rx="35" ry="38" fill="#34D399" opacity="0.4" />

    {/* Feet */}
    <line x1="170" y1="280" x2="165" y2="305" stroke="#FB7185" strokeWidth="4" strokeLinecap="round" />
    <line x1="205" y1="280" x2="205" y2="305" stroke="#FB7185" strokeWidth="4" strokeLinecap="round" />

    {/* Wing */}
    <ellipse
      cx="160"
      cy="215"
      rx="45" ry="26"
      fill="#475569"
      transform="rotate(-15 160 215)"
      className={isSpeaking ? 'origin-[160px_215px] animate-[wingFlap_0.2s_ease-in-out_infinite]' : ''}
    />
    <path d="M135 220 Q 160 235 185 220" stroke="#94A3B8" strokeWidth="3" fill="none" />

    {/* Pigeon Head (Bobs forward & back rhythmically!) */}
    <g
      className={`origin-[200px_160px] ${
        isSpeaking ? 'animate-[pigeonBob_0.25s_ease-in-out_infinite]' : ''
      }`}
    >
      <circle cx="230" cy="135" r="38" fill="#64748B" />
      {/* Iridescent neck patch */}
      <circle cx="230" cy="145" r="22" fill="#A855F7" opacity="0.5" />

      {/* Pigeon Eye with orange ring */}
      <circle cx="235" cy="128" r="9" fill="#EA580C" />
      <circle cx="235" cy="128" r="5" fill="#0F172A" />
      <circle cx="233" cy="126" r="2" fill="#FFFFFF" />

      {/* Beak with white cere cere lump */}
      <ellipse cx="260" cy="132" rx="5" ry="3" fill="#FFFFFF" />
      {isSpeaking ? (
        <g className="origin-[262px_136px] animate-[barkMouth_0.25s_ease-in-out_infinite]">
          <polygon points="262,132 292,128 266,138" fill="#CBD5E1" />
          <polygon points="262,139 288,148 266,144" fill="#94A3B8" />
          <polygon points="264,135 278,138 264,141" fill="#E11D48" />
        </g>
      ) : (
        <polygon points="262,132 288,137 262,143" fill="#CBD5E1" />
      )}
    </g>
  </g>
);

// ==========================================
// 13. SEAGULL (Head back + opening long yellow beak + wings)
// ==========================================
const SeagullSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.4s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Tail */}
    <polygon points="120,230 60,250 70,270 130,245" fill="#CBD5E1" />

    {/* Body */}
    <ellipse cx="190" cy="225" rx="74" ry="60" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

    {/* Feet */}
    <line x1="170" y1="280" x2="165" y2="305" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    <line x1="205" y1="280" x2="205" y2="305" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    <polygon points="155,308 175,308 165,302" fill="#F59E0B" />
    <polygon points="195,308 215,308 205,302" fill="#F59E0B" />

    {/* Grey & Black Wing */}
    <g
      className={`origin-[150px_210px] ${
        isSpeaking ? 'animate-[wingFlap_0.2s_ease-in-out_infinite]' : ''
      }`}
    >
      <ellipse cx="155" cy="210" rx="48" ry="28" fill="#94A3B8" transform="rotate(-15 155 210)" />
      <polygon points="110,210 130,235 150,215" fill="#1E293B" />
    </g>

    {/* Seagull Head: Tilts back when laughing/squawking! */}
    <g className={isSpeaking ? 'origin-[210px_160px] animate-[wiggle_0.25s_ease-in-out_infinite]' : ''}>
      <circle cx="230" cy="130" r="40" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

      {/* Eye with yellow ring */}
      <circle cx="235" cy="122" r="7" fill="#FDE047" />
      <circle cx="235" cy="122" r="4" fill="#0F172A" />
      <circle cx="233" cy="120" r="1.5" fill="#FFFFFF" />

      {/* Long Yellow Beak with classic Red Spot */}
      {isSpeaking ? (
        <g className="origin-[265px_130px] animate-[barkMouth_0.2s_ease-in-out_infinite]">
          <polygon points="265,120 315,108 272,132" fill="#FBBF24" />
          <polygon points="265,134 310,150 272,142" fill="#F59E0B" />
          {/* Red Spot near tip */}
          <circle cx="295" cy="142" r="4" fill="#DC2626" />
          <polygon points="268,126 295,134 268,138" fill="#E11D48" />
        </g>
      ) : (
        <g>
          <polygon points="265,124 310,132 265,140" fill="#FBBF24" />
          <circle cx="295" cy="135" r="3.5" fill="#DC2626" />
        </g>
      )}
    </g>
  </g>
);

// ==========================================
// 14. PARROT (Colorful wings flapping + hooked beak snapping)
// ==========================================
const ParrotSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.35s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Long Rainbow Tail */}
    <g
      className={`origin-[120px_240px] ${
        isSpeaking ? 'animate-[wiggle_0.25s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <polygon points="120,240 40,290 60,315 130,260" fill="#0284C7" />
      <polygon points="125,245 50,305 70,325 135,265" fill="#EF4444" />
      <polygon points="130,250 65,320 80,335 140,270" fill="#EAB308" />
    </g>

    {/* Body */}
    <ellipse cx="190" cy="225" rx="70" ry="62" fill="#EF4444" />
    <ellipse cx="205" cy="235" rx="45" ry="45" fill="#FACC15" />

    {/* Feet */}
    <line x1="170" y1="280" x2="165" y2="305" stroke="#71717A" strokeWidth="4" strokeLinecap="round" />
    <line x1="205" y1="280" x2="205" y2="305" stroke="#71717A" strokeWidth="4" strokeLinecap="round" />

    {/* Rainbow Wings: Flaps up and down when talking! */}
    <g
      className={`origin-[145px_205px] ${
        isSpeaking ? 'animate-[wingFlap_0.18s_ease-in-out_infinite]' : ''
      }`}
    >
      <ellipse cx="150" cy="205" rx="46" ry="28" fill="#16A34A" transform="rotate(-15 150 205)" />
      <path d="M125 210 Q 150 230 175 210" stroke="#0284C7" strokeWidth="4" fill="none" />
      <path d="M130 220 Q 155 240 180 220" stroke="#EAB308" strokeWidth="4" fill="none" />
    </g>

    {/* Parrot Head with Feather Crest */}
    <circle cx="225" cy="135" r="42" fill="#EF4444" />
    {/* Crest feathers on top */}
    <path
      d="M210 95 Q 220 70 235 65 Q 230 85 225 95"
      fill="#EAB308"
      className={isSpeaking ? 'origin-[220px_90px] animate-[wiggle_0.2s_ease-in-out_infinite]' : ''}
    />
    <path d="M225 95 Q 235 75 250 72 Q 242 88 238 98" fill="#0284C7" />

    {/* White Eye Patch & Eye */}
    <ellipse cx="230" cy="128" rx="16" ry="14" fill="#F8FAFC" />
    <circle cx="232" cy="128" r="7" fill="#0F172A" />
    <circle cx="230" cy="126" r="2.5" fill="#FFFFFF" />

    {/* Big Hooked Parrot Beak */}
    {isSpeaking ? (
      <g className="origin-[255px_135px] animate-[barkMouth_0.2s_ease-in-out_infinite]">
        <path d="M255 120 C 275 120, 295 130, 285 150 C 278 152, 260 138, 255 134 Z" fill="#F59E0B" />
        <path d="M256 138 C 265 142, 275 152, 268 156 C 260 156, 256 145, 256 138 Z" fill="#334155" />
        {/* Pink tongue */}
        <circle cx="266" cy="142" r="4" fill="#F43F5E" />
      </g>
    ) : (
      <path d="M255 120 C 275 120, 290 130, 282 150 C 275 152, 260 135, 255 130 Z" fill="#F59E0B" />
    )}
  </g>
);

// ==========================================
// 15. WHALE (Open smiling mouth + blowhole water fountain spout + flukes)
// ==========================================
const WhaleSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.6s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* ANIMATED WATER SPOUT FROM BLOWHOLE */}
    {isSpeaking && (
      <g className="origin-[190px_100px] animate-[spoutSpray_0.5s_ease-in-out_infinite]">
        {/* Fountain columns */}
        <path d="M190 110 Q 180 60 160 40" stroke="#38BDF8" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M192 110 Q 192 45 192 25" stroke="#38BDF8" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M194 110 Q 204 60 224 40" stroke="#38BDF8" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Spray droplets */}
        <circle cx="155" cy="35" r="6" fill="#7DD3FC" className="animate-ping" />
        <circle cx="192" cy="20" r="7" fill="#BAE6FD" />
        <circle cx="230" cy="35" r="6" fill="#7DD3FC" className="animate-ping" />
      </g>
    )}

    {/* Tail & Flukes (Waves up & down!) */}
    <g
      className={`origin-[90px_200px] ${
        isSpeaking ? 'animate-[wiggle_0.35s_ease-in-out_infinite]' : 'animate-[wiggle_2.5s_ease-in-out_infinite]'
      }`}
    >
      <path d="M120 200 C 80 190, 50 170, 45 145 C 55 165, 80 180, 100 185 Z" fill="#1D4ED8" />
      <path d="M120 200 C 80 210, 50 230, 45 255 C 55 235, 80 220, 100 215 Z" fill="#1D4ED8" />
    </g>

    {/* Massive Blue Whale Body */}
    <path
      d="M100 200 C 100 140, 170 110, 260 120 C 330 130, 360 180, 340 230 C 310 280, 180 270, 100 200 Z"
      fill="#2563EB"
    />

    {/* Grooved White/Cyan Belly */}
    <path
      d="M140 220 C 180 260, 280 265, 330 225 C 290 260, 190 250, 140 220 Z"
      fill="#E0F2FE"
    />
    <path d="M180 238 Q 230 250 290 236" stroke="#93C5FD" strokeWidth="3" fill="none" />
    <path d="M195 246 Q 240 256 280 245" stroke="#93C5FD" strokeWidth="3" fill="none" />

    {/* Flipper Fin */}
    <path
      d="M200 220 C 190 255, 175 270, 160 275 C 170 255, 185 240, 195 220 Z"
      fill="#1E40AF"
      className={isSpeaking ? 'origin-[200px_220px] animate-[wiggle_0.3s_ease-in-out_infinite]' : ''}
    />

    {/* Friendly Big Whale Eye */}
    <circle cx="285" cy="165" r="10" fill="#0F172A" />
    <circle cx="282" cy="162" r="3.5" fill="#FFFFFF" />

    {/* Cheerful Pink Blush */}
    <circle cx="270" cy="180" r="12" fill="#F472B6" opacity="0.4" />

    {/* MOUTH: Wide Open Smile singing deep whale song */}
    {isSpeaking ? (
      <g className="origin-[290px_190px] animate-[barkMouth_0.4s_ease-in-out_infinite]">
        <path d="M245 190 Q 295 225 340 185 Q 295 210 245 190 Z" fill="#881337" />
        <ellipse cx="295" cy="205" rx="20" ry="10" fill="#FB7185" />
      </g>
    ) : (
      <path d="M250 190 Q 295 215 335 185" stroke="#1E40AF" strokeWidth="4.5" fill="none" strokeLinecap="round" />
    )}
  </g>
);

// ==========================================
// 16. DOLPHIN (Leaping arc + clicking snout + splash)
// ==========================================
const DolphinSVG: React.FC<{ isSpeaking: boolean }> = ({ isSpeaking }) => (
  <g className={isSpeaking ? 'animate-[bounce_0.4s_ease-in-out_infinite]' : 'animate-[bounce_3s_ease-in-out_infinite]'}>
    {/* Water Splash Ripples at bottom */}
    <g className="opacity-80">
      <ellipse cx="200" cy="305" rx="80" ry="15" fill="#BAE6FD" />
      <ellipse cx="200" cy="305" rx="60" ry="10" fill="#7DD3FC" />
      {isSpeaking && (
        <g className="animate-ping">
          <circle cx="150" cy="295" r="6" fill="#38BDF8" />
          <circle cx="250" cy="295" r="6" fill="#38BDF8" />
        </g>
      )}
    </g>

    {/* Tail Flukes */}
    <g
      className={`origin-[95px_245px] ${
        isSpeaking ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : 'animate-[wiggle_2s_ease-in-out_infinite]'
      }`}
    >
      <path d="M95 245 C 75 240, 50 220, 48 200 C 60 215, 80 230, 95 235 Z" fill="#0284C7" />
      <path d="M95 245 C 75 255, 50 275, 48 295 C 60 280, 80 265, 95 260 Z" fill="#0284C7" />
    </g>

    {/* Dorsal Fin */}
    <path d="M190 120 C 180 85, 205 90, 220 115 Z" fill="#0284C7" />

    {/* Sleek Leaping Dolphin Body */}
    <path
      d="M95 245 C 100 180, 160 120, 250 125 C 290 128, 320 150, 310 180 C 290 225, 170 270, 95 245 Z"
      fill="#0EA5E9"
    />

    {/* White Belly */}
    <path
      d="M120 240 C 160 230, 230 200, 280 180 C 250 220, 170 250, 120 240 Z"
      fill="#F0F9FF"
    />

    {/* Flippers */}
    <path
      d="M210 190 C 220 225, 205 245, 195 245 C 195 230, 202 210, 210 190 Z"
      fill="#0284C7"
      className={isSpeaking ? 'origin-[210px_190px] animate-[wiggle_0.25s_ease-in-out_infinite]' : ''}
    />

    {/* Friendly Eye */}
    <circle cx="275" cy="155" r="8" fill="#0F172A" />
    <circle cx="273" cy="152" r="2.5" fill="#FFFFFF" />

    {/* Snout & Clicking Mouth */}
    {isSpeaking ? (
      <g className="origin-[295px_165px] animate-[barkMouth_0.2s_ease-in-out_infinite]">
        <path d="M295 160 L 335 158 L 305 168 Z" fill="#0284C7" />
        <path d="M295 170 L 328 178 L 305 174 Z" fill="#0284C7" />
        {/* Pink open mouth */}
        <polygon points="296,163 318,168 296,172" fill="#F43F5E" />
      </g>
    ) : (
      <path d="M290 160 C 315 160, 328 165, 325 170 C 310 172, 290 172, 285 168 Z" fill="#0284C7" />
    )}
  </g>
);
