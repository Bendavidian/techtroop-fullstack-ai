const findDuplicates = function (arr) {
  const seen = {}

  for (let item of arr) {
    if (seen[item]) {
      console.log("there is a duplicate:", item)
      return
    }
    seen[item] = true
  }

  console.log("no duplicates found")
}

findDuplicates([1, 2, 3, 4])
findDuplicates([1, 2, 3, 2])
findDuplicates(["a", "b", "c", "a"])

console.log("Time complexity: O(n) — each item is visited at most once, and object key lookup is O(1)")
