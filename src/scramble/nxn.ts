const FACES = ['U', 'D', 'L', 'R', 'F', 'B'];
const SUFFIXES = ['', '2', "'"];
const AXES: Record<string, string> = { U: 'y', D: 'y', L: 'x', R: 'x', F: 'z', B: 'z' };

export function getNxNScramble(event: string, rng: () => number): string[] {
  const size = parseInt(event[0]);
  const length = size === 4 ? 40 : size === 5 ? 60 : size === 6 ? 80 : 100;
  const moves: string[] = [];
  let lastFace = '';
  let lastAxis = '';

  while (moves.length < length) {
    const face = FACES[Math.floor(rng() * FACES.length)];
    
    // 冗余剪枝：同面不连续，同轴不连续
    if (face === lastFace || AXES[face] === lastAxis) continue;
    
    const suffix = SUFFIXES[Math.floor(rng() * SUFFIXES.length)];
    const isWide = size > 3 ? (rng() > 0.5) : false; // 4x4以上加入宽层
    
    let move = face;
    if (isWide) {
      const depth = Math.floor(rng() * (size / 2 - 1)) + 2;
      move = `${depth}${face}w`;
    }
    
    moves.push(move + suffix);
    lastFace = face;
    lastAxis = AXES[face];
  }
  return moves;
}
