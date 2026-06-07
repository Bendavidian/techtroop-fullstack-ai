var firstPiece  = { id: 101, name: "Ofri" };
var secondPiece = { country: "Israel" };

var passport = { ...firstPiece, ...secondPiece };

console.log(passport); // { id: 101, name: "Ofri", country: "Israel" }
