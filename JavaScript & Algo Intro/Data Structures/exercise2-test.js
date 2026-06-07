const UniqueArray = require("./unique-array");

const ua = new UniqueArray();

ua.add(42);
ua.add("hello");
ua.add(42);
console.log("after adding 42, 'hello', 42 again:");
ua.showAll();

ua.add({ x: 3 });
ua.add({ x: 3 });
console.log("after adding {x:3} twice:");
ua.showAll();

ua.add({ x: 3, y: 10 });
console.log("after adding {x:3, y:10}:");
ua.showAll();

ua.add([1, 2, 3]);
ua.add([1, 2, 3]);
console.log("after adding [1,2,3] twice:");
ua.showAll();

console.log(ua.exists({ x: 3 }));
console.log(ua.exists({ x: 99 }));
console.log(ua.exists([1, 2, 3]));
console.log(ua.exists([9, 9, 9]));
console.log(ua.exists(42));
console.log(ua.exists("hello"));

console.log(ua.get(999));
console.log(ua.get(-1));
