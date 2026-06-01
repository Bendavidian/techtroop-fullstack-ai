const date = 3;

const kitchen = {
  owner: "Geraldine",
  hasOven: true,
  fridge: {
    price: 500,
    works: true,
    items: [
      { name: "cheese", expiryDate: 7 },
      { name: "radish", expiryDate: 2 },
      { name: "bread", expiryDate: 1 }
    ]
  }
};

const owner = kitchen.owner;
const hasOven = kitchen.hasOven;
const fridgeWorks = kitchen.fridge.works;
const repairCost = kitchen.fridge.price / 2;

const radish = kitchen.fridge.items.find(function(item) {
  return item.name === "radish";
});

const expiredDays = date - radish.expiryDate;

const expiredLine = owner + "'s " + radish.name + " expired " + expiredDays + " day ago.";

const fridgeLine = fridgeWorks
  ? "Weird, considering her fridge works."
  : "Probably because her fridge doesn't work.";

const ovenLine = hasOven
  ? "Luckily, she has an oven to cook the " + radish.name + " in."
  : "Too bad she doesn't have an oven to cook the " + radish.name + " in.";

const repairLine = "And she'll have to pay " + repairCost + " to fix the fridge.";

if (hasOven && fridgeWorks) {
  console.log(expiredLine, fridgeLine, ovenLine);
} else if (!hasOven && fridgeWorks) {
  console.log(expiredLine, fridgeLine, ovenLine);
} else if (hasOven && !fridgeWorks) {
  console.log(expiredLine, fridgeLine, ovenLine, repairLine);
} else {
  console.log(expiredLine, fridgeLine, ovenLine, repairLine);
}
