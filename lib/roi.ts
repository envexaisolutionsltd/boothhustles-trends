export const ROI_FLIP_THRESHOLD = 30;

export function computeRoi(cost: number, resalePrice: number): number | null {
  if (!Number.isFinite(cost) || cost <= 0 || !Number.isFinite(resalePrice) || resalePrice < 0) {
    return null;
  }
  return ((resalePrice - cost) / cost) * 100;
}
