export class SpeedMeter {
  private buffer: number[];
  private index: number;
  private size: number;
  constructor(size: number) {
    this.size = size;
    this.buffer = new Array(size).fill(0);
    this.index = 0;
  }
  push(value: number) {
    this.buffer[this.index] = value;
    this.index = (this.index + 1) % this.size;
  }
  speed() {
    if (this.buffer.some(v => v === 0)) return
    const sum = this.buffer.reduce((a, b) => a + b, 0);
    return this.size / (sum / 1000) * 60;
  }
  clear() {
    this.buffer = new Array(this.size).fill(0);
    this.index = 0;
  }
}
