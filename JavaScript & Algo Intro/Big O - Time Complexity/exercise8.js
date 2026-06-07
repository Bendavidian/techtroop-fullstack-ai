const numbers = [24,33,66,102,108,140,146,177,182,217,341,357,372,390,418,427,442,444,469,480,572,624,627,665,680,694,743,768,790,794,852,896,919,942,982,991,1026,1055,1086,1137,1141,1157,1167,1271,1272,1273,1301,1337,1340,1344,1388,1455,1465,1466,1509,1555,1640,1667,1667,1689,1824,1897,1928,1950,1987,2056,2059,2070,2123,2140,2198,2215,2260,2304,2383,2403,2433,2454,2472,2480,2481,2535,2543,2554,2557,2580,2630,2634,2671,2745,2792,2839,2849,2871,2873,2893,2932,2962,2984,2987]

const findIndex = function (numbers, num) {
  let left = 0
  let right = numbers.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)

    if (numbers[mid] === num) {
      return mid
    } else if (numbers[mid] < num) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}

console.log("Index of 2630:", findIndex(numbers, 2630))
console.log("Index of 9999 (missing):", findIndex(numbers, 9999))
console.log("Index of 24 (first element):", findIndex(numbers, 24))
console.log("Index of 2987 (last element):", findIndex(numbers, 2987))
console.log("Time complexity: O(log n) — binary search halves the search range on every step")
