export function splitInHalf(s: string): [string, string] {
  const middle = Math.round(s.length / 2);
  const s1 = s.slice(0, middle);
  const s2 = s.slice(middle, s.length);
  return [s1, s2];
}
