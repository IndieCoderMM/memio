export function encodeId(n: number): string {
  return "#" + n.toString(36);
}

export function decodeId(id: string): number {
  if (!id.startsWith("#")) {
    throw new Error("Invalid ID format");
  }
  const numberPart = id.slice(1);
  return parseInt(numberPart, 36);
}
