export const formatClock = (millis: number, showMillis = false) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const milliseconds = millis % 1000;

  const pad2 = (num: number) => String(num).padStart(2, "0");

  return showMillis
    ? `${pad2(minutes)}:${pad2(seconds)}:${pad2(Math.floor(milliseconds / 10))}`
    : `${pad2(minutes)}:${pad2(seconds)}`;
};
