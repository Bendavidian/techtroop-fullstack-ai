const coffeeShop = {
  beans: 40,
  money: 0,

  drinkRequirements: {
    latte:       { beanRequirement: 10, price: 5 },
    americano:   { beanRequirement: 5,  price: 3 },
    doubleShot:  { beanRequirement: 15, price: 7 },
    frenchPress: { beanRequirement: 12, price: 6 }
  },

  makeDrink: function (drinkType) {
    const drink = this.drinkRequirements[drinkType];
    if (drink === undefined) {
      console.log("Sorry, we don't make " + drinkType);
      return;
    }
    if (this.beans < drink.beanRequirement) {
      console.log("Sorry, we're all out of beans!");
      return;
    }
    this.beans -= drink.beanRequirement;
    console.log("Made a " + drinkType + "! Beans remaining: " + this.beans);
  },

  buyDrink: function (drinkType) {
    const drink = this.drinkRequirements[drinkType];
    if (drink === undefined) {
      console.log("Sorry, we don't make " + drinkType);
      return;
    }
    this.money += drink.price;
    this.makeDrink(drinkType);
  }
};

coffeeShop.buyDrink("latte");
coffeeShop.buyDrink("americano");
coffeeShop.buyDrink("filtered");
coffeeShop.buyDrink("doubleShot");
coffeeShop.buyDrink("frenchPress");

console.log("Final beans: " + coffeeShop.beans);
console.log("Final money: $" + coffeeShop.money);
