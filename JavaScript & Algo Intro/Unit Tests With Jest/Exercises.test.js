const Exercises = require("./Exercises");

describe("Exercise 1 — isEven", () => {
  test("isEven should return true for an even number", () => {
    const exercises = new Exercises();
    expect(exercises.isEven(4)).toBeTruthy();
  });

  test("isEven should return false for an odd number", () => {
    const exercises = new Exercises();
    expect(exercises.isEven(5)).toBeFalsy();
  });

  test("isEven should return true for zero", () => {
    const exercises = new Exercises();
    expect(exercises.isEven(0)).toBeTruthy();
  });
});

describe("Exercise 2 — removeAtLeastOne", () => {
  test("removeAtLeastOne should remove at least one item", () => {
    const exercises = new Exercises();
    const originalArray = [1, 2, 3, 4, 5];
    const originalLength = originalArray.length;
    
    // Pass a copy so we can track change in length or verify the return value
    const result = exercises.removeAtLeastOne([...originalArray]);
    
    expect(result.length).toBeLessThan(originalLength);
  });

  test("removeAtLeastOne should return an array", () => {
    const exercises = new Exercises();
    const result = exercises.removeAtLeastOne([1, 2, 3, 4, 5]);
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Exercise 3 — simplify", () => {
  test("simplify should remove punctuation and return Hello world", () => {
    const exercises = new Exercises();
    const result = exercises.simplify("Hello, world!");
    expect(result).toBe("Hello world");
  });

  test("simplify should remove forbidden symbols and handle contraction sentences", () => {
    const exercises = new Exercises();
    const result = exercises.simplify("Don't stop. Keep going!");
    expect(result).toBe("Dont stop Keep going");
    
    const forbidden = ["!", "#", ".", ",", "'"];
    forbidden.forEach(sym => {
      expect(result).not.toContain(sym);
    });
  });
});

describe("Exercise 4 — validate", () => {
  test("more trues than falses: validate([true, true, false]) should return true", () => {
    const exercises = new Exercises();
    expect(exercises.validate([true, true, false])).toBe(true);
  });

  test("more falses than trues: validate([true, false, false]) should return false", () => {
    const exercises = new Exercises();
    expect(exercises.validate([true, false, false])).toBe(false);
  });

  test("equal number of true and false: validate([true, false]) should return false", () => {
    const exercises = new Exercises();
    expect(exercises.validate([true, false])).toBe(false);
  });

  test("no booleans: validate(['hello', 1, null]) should return error object", () => {
    const exercises = new Exercises();
    expect(exercises.validate(["hello", 1, null])).toEqual({
      error: "Need at least one boolean"
    });
  });

  test("empty array: validate([]) should return error object", () => {
    const exercises = new Exercises();
    expect(exercises.validate([])).toEqual({
      error: "Need at least one boolean"
    });
  });

  test("mixed values: validate([true, 'hello', false, true, 100]) should return true", () => {
    const exercises = new Exercises();
    expect(exercises.validate([true, "hello", false, true, 100])).toBe(true);
  });
});
