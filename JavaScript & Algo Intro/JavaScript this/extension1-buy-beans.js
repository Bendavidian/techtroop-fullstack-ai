const coffeeShop = {
  beans: 40,
  money: 100,
  beanPrice: 2,

  drinkRequirements: {
    latte: 10,
    americano: 5,
    doubleShot: 15,
    frenchPress: 12
  },

  makeDrink: function (drinkType) {
    const beansNeeded = this.drinkRequirements[drinkType];
    if (beansNeeded === undefined) {
      console.log("Sorry, we don't make " + drinkType);
      return;
    }
    if (this.beans < beansNeeded) {
      console.log("Sorry, we're all out of beans!");
      return;
    }
    this.beans -= beansNeeded;
    console.log("Made a " + drinkType + "! Beans remaining: " + this.beans);
  },

  buyBeans: function (numBeans) {
    const cost = numBeans * this.beanPrice;
    console.log("Before: beans=" + this.beans + ", money=$" + this.money);
    this.money -= cost;
    this.beans += numBeans;
    console.log("Bought " + numBeans + " beans for $" + cost);
    console.log("After:  beans=" + this.beans + ", money=$" + this.money);
  }
};

coffeeShop.buyBeans(20);
