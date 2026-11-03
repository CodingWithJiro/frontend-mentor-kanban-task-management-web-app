export function getNormalizedDescription(description: string) {
  const isDescriptionMissing = !description || description.length === 0;
  const normalizedDescription = isDescriptionMissing ? null : description;
  return normalizedDescription;
}
