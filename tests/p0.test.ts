import { describe, it, expect } from 'vitest';
import { generateScramble } from '../src/scramble/index.js';
import { createPRNG } from '../src/scramble/random.js';

describe('P0 核心接口测试', () => {
  it('3x3 应该返回正确的接口格式', () => {
    const res = generateScramble('3x3');
    expect(res).toHaveProperty('moves');
    expect(res).toHaveProperty('text');
    expect(Array.isArray(res.moves)).toBe(true);
    expect(res.moves.length).toBeGreaterThan(0);
    expect(res.text).toBe(res.moves.join(' '));
  });

  it('注入固定种子应产生确定的结果', () => {
    const rng1 = createPRNG(12345);
    const rng2 = createPRNG(12345);
    const res1 = generateScramble('4x4', { rng: rng1 });
    const res2 = generateScramble('4x4', { rng: rng2 });
    expect(res1.moves).toEqual(res2.moves);
  });
});
