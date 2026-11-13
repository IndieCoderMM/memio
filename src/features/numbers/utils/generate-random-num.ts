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

const PI_DECIMAL_DIGITS =
  "14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

export function generatePiDigits(digits: number): string[] {
  return PI_DECIMAL_DIGITS.slice(0, digits).split("");
}
