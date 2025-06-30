export function generateRandomBinary(digits: number): string[] {
  let num: string = "";

  for (let i = 0; i < digits; i++) {
    num += Math.floor(Math.random() * 2).toString(); // Generate a random binary digit (0 or 1)
  }

  return num.split(""); // Split the string into an array of characters
}
