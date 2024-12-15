export const dirs = ["-1;0;0","1;0;0","0;-1;0","0;1;0","0;0;-1","0;0;1"];

export function getPosSum(p1: string, p2: string) {
    const [x1,y1,z1] = getXYZ(p1);
    const [x2,y2,z2] = getXYZ(p2);
    return `${x2+x1};${y2+y1};${z2+z1}`;
}

export function getPosDiff(p1: string, p2: string) {
    const [x1,y1,z1] = getXYZ(p1);
    const [x2,y2,z2] = getXYZ(p2);
    return `${x2-x1};${y2-y1};${z2-z1}`;
}

export function getXYZ(p: string) {
    return p.split(";").map(Number);
}

export function stringifyPath(path: string[]) {
    return path.join("-");
}