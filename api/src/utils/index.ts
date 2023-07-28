export function splitInHalf (c: string){

    let halfString = Math.round(c.length / 2);
    let s1 = c.slice(0, halfString);
    let s2 = c.slice(halfString, c.length);

    return [s1, s2];
}