let a = 3;
let c = 0;
let b = a;

b = a;
c = a;
b = c;
a = b;

console.log("a =", a);
console.log("b =", b);
console.log("c =", c);
