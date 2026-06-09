/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Calculates hypotenuse using Pythagorean theorem.
 * @param {number} a
 * @param {number} b
 * @returns {number} Hypotenuse
 */
function calculateHyp(a, b) {
  return Math.sqrt(a * a + b * b);
}

/**
 * Removes "BUG" strings from the array.
 * @param {string[]} code
 * @returns {string[]} Filtered array without "BUG"
 */
function removeBugs(code) {
  return code.filter(item => item !== "BUG");
}

/**
 * Filters tasks keeping only those with "HIGH" priority.
 * @param {Object[]} tasks
 * @returns {Object[]} Filtered tasks
 */
function clearLowPriority(tasks) {
  return tasks.filter(task => task.priority === "HIGH");
}

/**
 * Class representing a Picture Manager.
 */
class PictureManager {
  constructor() {
    this.pictureURLs = [];
  }

  /**
   * Adds a picture URL.
   * @param {string} picURL
   */
  addPicture(picURL) {
    this.pictureURLs.push(picURL);
  }

  /**
   * Removes a picture URL.
   * @param {string} picURL
   */
  removePicture(picURL) {
    this.pictureURLs = this.pictureURLs.filter(url => url !== picURL);
  }
}

/**
 * Class representing an Array Manipulator.
 */
class ArrayManipulator {
  /**
   * Manipulates two arrays into an object.
   * @param {string[]} arr1
   * @param {string[]} arr2
   * @returns {Object|string} Created object or error message
   */
  manipulate(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return "Arrays must be the same length";
    }
    
    const obj = {};
    for (let i = 0; i < arr1.length; i++) {
      obj[arr1[i]] = arr2[i];
    }
    return obj;
  }
}

/**
 * Helper for the spy on push test extension.
 */
const AddHelper = {
  /**
   * Adds values to an array and calls push.
   * @param {*} x
   * @param {*} y
   */
  add(x, y) {
    const stuff = [];
    stuff.push(x, y);
  }
};

module.exports = {
  add,
  calculateHyp,
  removeBugs,
  clearLowPriority,
  PictureManager,
  ArrayManipulator,
  AddHelper
};
