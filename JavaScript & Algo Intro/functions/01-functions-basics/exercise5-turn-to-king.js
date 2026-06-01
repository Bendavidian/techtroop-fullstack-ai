function increaseByNameLength(money, name) {
  return money + name.length;
}

function makeRegal(name) {
  return "His Royal Highness, " + name;
}

function turnToKing(name, money) {
  const upperName = name.toUpperCase();
  const newMoney = increaseByNameLength(money, name);
  const regalName = makeRegal(upperName);
  console.log(regalName + " has " + newMoney + " gold coins");
}

turnToKing("martin luther", 100);
