export type AnimalId =
  | 'bird'
  | 'lion'
  | 'tiger'
  | 'elephant'
  | 'mouse'
  | 'cat'
  | 'dog'
  | 'cow'
  | 'horse'
  | 'donkey'
  | 'pigeon'
  | 'seagull'
  | 'whale'
  | 'dolphin'
  | 'parrot'
  | 'snake';

export type Habitat = 'farm' | 'jungle' | 'sky' | 'ocean';

export interface AnimalInfo {
  id: AnimalId;
  name: string;
  soundWord: string;
  verbalSound: string;
  habitat: Habitat;
  habitatName: string;
  funFact: string;
  soundFile: string;
  emoji: string;
  bgGradient: string;
  accentColor: string;
  cardColor: string;
  textColor: string;
}

export type GameMode = 'safari' | 'quiz' | 'soundboard';
