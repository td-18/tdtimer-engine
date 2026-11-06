export type Event = '3x3' | '2x2' | '4x4' | '5x5' | '6x6' | '7x7' | 'pyram' | 'skewb' | 'sq1' | 'mega' | 'clock';

export interface ScrambleOptions {
  timeBudget?: number;      // 默认 20ms
  mode?: 'random' | 'state';
  rng?: () => number;       // 默认 Math.random 或注入的 PRNG
  useWorker?: boolean;
}

export interface ScrambleResult {
  moves: string[];
  text: string;
  meta: {
    event: Event;
    mode: string;
    length: number;
    elapsedMs: number;
  };
}
