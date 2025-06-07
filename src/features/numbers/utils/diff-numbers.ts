export function diffNumbers(target: string[], tried: string[]) {
  const errors: Record<number, string> = {};

  for (let i = 0; i < target.length; i++) {
    if (target[i] !== tried[i]) {
      errors[i] = tried[i] || "✕"; // Store the user's input or an empty string if not provided
    }
  }

  return errors;
}
