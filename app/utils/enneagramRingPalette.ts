/**
 * @description 九型环 A→I 与 `InfoEnneagramPanel` 弧段一致：`stroke` 供 SVG，`uiHex` 供列表/徽章等 CSS（渐变段取主色）。
 */
export const ENNEAGRAM_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"] as const;
export type EnneagramLetter = (typeof ENNEAGRAM_LETTERS)[number];

const ENNEAGRAM_LETTER_SET = new Set<string>(ENNEAGRAM_LETTERS);

export interface EnneagramRingSegmentStyle {
  stroke: string;
  uiHex: string;
  opacity: number;
}

const RING_STYLES: Record<EnneagramLetter, EnneagramRingSegmentStyle> = {
  A: { stroke: "url(#enneagram-grad-1)", uiHex: "#7858f6", opacity: 1 },
  B: { stroke: "#ff86c3", uiHex: "#ff86c3", opacity: 0.9 },
  C: { stroke: "url(#enneagram-grad-2)", uiHex: "#50e1f9", opacity: 1 },
  D: { stroke: "#7858f6", uiHex: "#7858f6", opacity: 1 },
  E: { stroke: "#50e1f9", uiHex: "#50e1f9", opacity: 1 },
  F: { stroke: "#b2a1ff", uiHex: "#b2a1ff", opacity: 1 },
  G: { stroke: "#ff73b7", uiHex: "#ff73b7", opacity: 0.8 },
  H: { stroke: "url(#enneagram-grad-1)", uiHex: "#7858f6", opacity: 1 },
  I: { stroke: "#54e3fc", uiHex: "#54e3fc", opacity: 1 },
};

export function getEnneagramRingSegmentStyle(letter: EnneagramLetter): EnneagramRingSegmentStyle {
  return RING_STYLES[letter];
}

/**
 * @description 按题库字母取与环图一致的代表色（用于 Ranking 徽章、百分比等）。
 */
export function getEnneagramUiHexForLetter(letter: string): string {
  const up = letter.trim().toUpperCase();
  if (!ENNEAGRAM_LETTER_SET.has(up)) {
    return "#a5a5ff";
  }
  return RING_STYLES[up as EnneagramLetter].uiHex;
}
