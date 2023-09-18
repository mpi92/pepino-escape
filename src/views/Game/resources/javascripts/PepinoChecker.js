export default class PepinoChecker {
  constructor() {
    this.start;
    this.elapsed;
    this.interrupted = false;
    this.previousTimeStamp = undefined;
  }

  check(ts) {
    if (this.start === undefined) {
      this.start = ts;
    } else {
      const diff = Math.round(ts - this.previousTimeStamp);

      if (diff > 50) {
        this.interrupted = true;
      }
    }

    this.elapsed = Math.floor((ts - this.start) / 1000);
    this.previousTimeStamp = ts;
    
    return {
      interrupted: this.interrupted,
      elapsed: this.elapsed,
    };
  }
}