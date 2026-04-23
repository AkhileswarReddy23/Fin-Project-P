export function calcEMI(P: number, annualRate: number, tenureYears: number): number {
    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;
    const EMI = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return Number(EMI.toFixed(0));
}