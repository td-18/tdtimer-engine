import { Event, ScrambleOptions, ScrambleResult } from './types.js';
import { render } from './render.js';
import { getNxNScramble } from './nxn.js';
import { get3x3Scramble } from './three/scramble.js';
import { get2x2Scramble } from './two/scramble.js';
import { getPyramScramble } from './pyram.js';
import { getSkewbScramble } from './skewb.js';
import { getSq1Scramble } from './sq1.js';
import { getMegaScramble } from './mega.js';
import { getClockScramble } from './clock.js';

/**
 * 生成魔方打乱（WCA 规则兼容的随机状态打乱，非官方 TNoodle）
 * 纯函数，不产生任何副作用
 */
export function generateScramble(event: Event, options: ScrambleOptions = {}): ScrambleResult {
  const startTime = performance.now();
  const rng = options.rng || Math.random;
  const timeBudget = options.timeBudget ?? 20;
  const mode = options.mode || 'random';
  let moves: string[] = [];
  let actualMode = mode;

  try {
    switch (event) {
      case '3x3':
        moves = get3x3Scramble({ rng, timeBudget, mode });
        break;
      case '2x2':
        moves = get2x2Scramble({ rng });
        break;
      case 'pyram':
        moves = getPyramScramble({ rng });
        break;
      case 'skewb':
        moves = getSkewbScramble({ rng });
        break;
      case 'sq1':
        moves = getSq1Scramble({ rng });
        break;
      case 'mega':
        moves = getMegaScramble({ rng, mode });
        break;
      case 'clock':
        moves = getClockScramble({ rng });
        break;
      default:
        // 4x4 到 7x7 使用 NxN 随机步 + 拒绝采样
        moves = getNxNScramble(event, rng);
        break;
    }
  } catch (err) {
    // 内部任何异常吞掉，降级为纯随机步
    actualMode = 'fallback-random';
    if (['4x4', '5x5', '6x6', '7x7'].includes(event)) {
      moves = getNxNScramble(event, rng);
    } else {
      moves = ['R', 'U', 'R\'', 'U\''];
    }
  }

  const elapsedMs = performance.now() - startTime;

  return {
    moves,
    text: render(moves),
    meta: { event, mode: actualMode, length: moves.length, elapsedMs }
  };
}

export * from './types.js';
