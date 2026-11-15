import { getNxNScramble } from '../nxn.js';
export function get3x3Scramble({ rng, timeBudget, mode }: any): string[] {
  return getNxNScramble('3x3', rng);
}
