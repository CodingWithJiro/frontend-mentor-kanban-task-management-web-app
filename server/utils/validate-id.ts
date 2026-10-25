export function isInvalidId(id: number) {
  return !Number.isInteger(id) || id <= 0;
}
