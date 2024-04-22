const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const formatNumber = (number) => `0${number}`.slice(-2);
    if (hours > 0) {
      return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
        seconds
      )}`;
    } else {
      return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }
  };
  export default formatTime;