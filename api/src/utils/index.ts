export function splitInHalf(s: string) {
  let halfString = Math.round(s.length / 2);
  let s1 = s.slice(0, halfString);
  let s2 = s.slice(halfString, s.length);

  return [s1, s2];
}
