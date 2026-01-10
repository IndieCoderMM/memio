/***
 * Provides methods to encode a number into a string format
 * and decode a string back into a number.
 */
export class Encoder {
  private static base = 36; // Base for encoding, can be adjusted

  static encodeId(n: number): string {
    return "#" + n.toString(Encoder.base);
  }

  static decodeId(id: string): number {
    if (!id.startsWith("#")) {
      throw new Error("Invalid ID format");
    }
    const numberPart = id.slice(1);
    return parseInt(numberPart, Encoder.base);
  }
}
