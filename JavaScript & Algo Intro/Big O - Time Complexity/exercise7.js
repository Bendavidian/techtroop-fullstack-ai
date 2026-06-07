const employees = {
  ax01: { name: "Ray",    age: 28, salary: 1300 },
  qs84: { name: "Lucius", age: 31, salary: 840 },
  bg33: { name: "Taylor", age: 18, salary: 2700 }
}

const findEmployeeSalary = function (employeeID) {
  if (!employees[employeeID]) {
    return -1
  }
  return employees[employeeID].salary
}

console.log("ax01 salary:", findEmployeeSalary("ax01"))
console.log("qs84 salary:", findEmployeeSalary("qs84"))
console.log("bg33 salary:", findEmployeeSalary("bg33"))
console.log("missingID salary:", findEmployeeSalary("missingID"))
console.log("Time complexity: O(1) — accessing an object by key is constant time regardless of how many employees exist")
