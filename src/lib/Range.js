/**
 * Helper that maps a value from [start, end] to [0, 1].
 * @param {number} value
 * @param {number} start
 * @param {number} end
 */

export const range = (value, start, end) =>
  Math.min(1, Math.max(0, (value - start) / (end - start)))
