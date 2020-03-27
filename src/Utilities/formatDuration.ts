const formatDuration = duration => {
  let sec_num = parseInt(duration, 10);
  let minutes: number | string = Math.floor(sec_num / 60);
  let seconds: number | string = sec_num - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

export default formatDuration;
