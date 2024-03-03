export function randomMode() {
  const n = Math.floor(Math.random() * 3) + 1;
  return {
    1: "quick",
    2: "regular",
    3: "slow",
  }[n];
}
