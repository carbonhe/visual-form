export function limitedNumber(num: number, min: number, max: number) {
  if (num > max) {
    num = max;
  }
  if (num < min) {
    num = min;
  }
  return num;
}
