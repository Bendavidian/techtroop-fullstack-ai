class Exercises {
  /**
   * Exercise 1 - Checks if a number is even.
   * @param {number} n
   * @returns {boolean} True if even, false otherwise
   */
  isEven(n) {
    return n % 2 == 0 ? true : false;
  }

  /**
   * Exercise 2 - Removes at least one item from the array randomly.
   * @param {Array} arr
   * @returns {Array} Modified array
   */
  removeAtLeastOne(arr) {
    let numItemsToRemove = Math.floor(Math.random() * (arr.length - 1)) + 1;
    arr.splice(0, numItemsToRemove);
    return arr;
  }

  /**
   * Exercise 3 - Simplifies a string by removing specific punctuation/symbols.
   * @param {string} str
   * @returns {string} Simplified string
   */
  simplify(str) {
    let symbols = ["!", "#", ".", ",", "'"];
    return str.split("").filter(c => symbols.indexOf(c) == -1).join("");
  }

  /**
   * Exercise 4 - Validates an array of booleans.
   * @param {Array} arr
   * @returns {boolean|Object} True if more true values than false, false otherwise, or error object
   */
  validate(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return { error: "Need at least one boolean" };
    }

    let trueCount = 0;
    let falseCount = 0;
    let hasBoolean = false;

    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] === "boolean") {
        hasBoolean = true;
        if (arr[i] === true) {
          trueCount++;
        } else {
          falseCount++;
        }
      }
    }

    if (!hasBoolean) {
      return { error: "Need at least one boolean" };
    }

    return trueCount > falseCount;
  }
}

module.exports = Exercises;
