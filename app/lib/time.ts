export function calculateDate(timeNumber: number) {
  if (timeNumber <= 0) {
    // Le compte à rebours est terminé
    return {days: 0, hours: 0, minutes: 0, seconds: 0};
  }
  const days = Math.floor(timeNumber / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeNumber % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeNumber % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeNumber % (1000 * 60)) / 1000);
  return {days, hours, minutes, seconds};
}
