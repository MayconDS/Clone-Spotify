export const formatTime = (time: number) => {
  let seconds: number | string = Math.floor(time / 1000);
  let minutes: number | string = Math.floor(seconds / 60);
  seconds = seconds % 60;

  minutes = minutes.toString();

  if (seconds < 10) {
    seconds = seconds.toString();
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};
