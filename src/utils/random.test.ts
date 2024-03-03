import { randomMode } from "./random";

describe("randomMode()", () => {
  test("should return quick, regular or slow", () => {
    const mode = randomMode();
    expect(["quick", "regular", "slow"]).toContain(mode);
  });
});
