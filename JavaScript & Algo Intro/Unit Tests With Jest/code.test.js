const {
  add,
  calculateHyp,
  removeBugs,
  clearLowPriority,
  PictureManager,
  ArrayManipulator,
  AddHelper
} = require("./code");

describe("Basic Math Functions", () => {
  test("add should return sum of a + b", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("calculateHyp should return the hypotenuse using Pythagorean theorem", () => {
    expect(calculateHyp(3, 4)).toBe(5);
  });
});

describe("Array & Object Helper Functions", () => {
  test("removeBugs should remove all BUGs and keep good code", () => {
    const codeArray = [
      "great code",
      "good code",
      "BUG",
      "async await awesome code",
      "BUG",
      "BUG",
      "general code"
    ];
    const result = removeBugs(codeArray);
    
    expect(result).not.toContain("BUG");
    expect(result).toContain("good code");
    expect(result).toHaveLength(4);
  });

  test("clearLowPriority should keep only HIGH priority tasks", () => {
    const tasks = [
      { text: "Fix bug", priority: "HIGH" },
      { text: "Clean room", priority: "LOW" },
      { text: "Write test", priority: "HIGH" },
      { text: "Read book", priority: "LOW" }
    ];
    const result = clearLowPriority(tasks);
    
    expect(result).toHaveLength(2);
    result.forEach(task => {
      expect(task.priority).toBe("HIGH");
    });
  });
});

describe("PictureManager class", () => {
  test("addPicture should add a picture URL to the pictureURLs array", () => {
    const manager = new PictureManager();
    expect(manager.pictureURLs).toHaveLength(0);
    
    manager.addPicture("some_url");
    expect(manager.pictureURLs).toHaveLength(1);
    expect(manager.pictureURLs).toContain("some_url");
  });

  test("removePicture should remove a picture URL from the pictureURLs array", () => {
    const manager = new PictureManager();
    manager.addPicture("url_one");
    manager.addPicture("url_two");
    
    manager.removePicture("url_one");
    
    expect(manager.pictureURLs).not.toContain("url_one");
    expect(manager.pictureURLs).toContain("url_two");
    expect(manager.pictureURLs).toHaveLength(1);
  });
});

describe("ArrayManipulator class", () => {
  test("manipulate should create an object from two arrays of equal length", () => {
    const manipulator = new ArrayManipulator();
    const x = ["food", "item", "location"];
    const y = ["cherry", "lightbulb", "Tazmania"];
    const expected = {
      food: "cherry",
      item: "lightbulb",
      location: "Tazmania"
    };
    
    expect(manipulator.manipulate(x, y)).toEqual(expected);
  });

  test("manipulate should return a message if arrays are not the same length", () => {
    const manipulator = new ArrayManipulator();
    const x = ["food", "item"];
    const y = ["cherry", "lightbulb", "Tazmania"];
    
    expect(manipulator.manipulate(x, y)).toBe("Arrays must be the same length");
  });
});

describe("Extension — spy on push", () => {
  test("should spy on Array.prototype.push when AddHelper.add runs", () => {
    const spy = jest.spyOn(Array.prototype, "push");
    
    try {
      AddHelper.add("foo", "bar");
      
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith("foo", "bar");
    } finally {
      spy.mockRestore();
    }
  });
});
