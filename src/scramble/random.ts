// 全库统一的半字节读取接口
export function getNibble(table: Uint8Array, index: number): number {
  return (table[index >> 1] >> ((index & 1) * 4)) & 0xF;
}

// 可注入的 PRNG (Mulberry32 实现，用于测试固定 seed)
export function createPRNG(seed: number = Date.now()): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}
