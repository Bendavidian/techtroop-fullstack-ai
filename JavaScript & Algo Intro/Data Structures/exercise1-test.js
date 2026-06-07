const UniqueArray = require("./unique-array");

const uniqueStuff = new UniqueArray();

uniqueStuff.add("toy");
uniqueStuff.showAll();

uniqueStuff.add("toy");
uniqueStuff.showAll();

console.log(uniqueStuff.exists("toy"));

uniqueStuff.add("poster");
uniqueStuff.add("hydrogen");

console.log(uniqueStuff.get(2));
