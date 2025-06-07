export function generateRandomNumber(digits: number): string[] {
  let num: string = "";

  while (num.length < digits) {
    // Generate a random digit between 0 and 999
    const digit = Math.floor(Math.random() * 1000);
    // Append the digit to the number string
    num += digit.toString();
  }

  // Ensure the number has the exact number of digits
  if (num.length > digits) {
    num = num.slice(0, digits);
  }

  return num.split("");
}
