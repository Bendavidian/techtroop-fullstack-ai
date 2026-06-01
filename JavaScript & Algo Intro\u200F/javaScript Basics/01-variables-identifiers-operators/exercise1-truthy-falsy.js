const expr1 = (5 > 2) && false;
console.log("1. (5 > 2) && false =>", Boolean(expr1));

const expr2 = !("knife" === "sword");
console.log('2. !("knife" === "sword") =>', Boolean(expr2));

const expr3 = (1 < 2) || (-1 > -1) || !false;
console.log("3. (1 < 2) || (-1 > -1) || !false =>", Boolean(expr3));

const expr4 = "";
console.log('4. "" =>', Boolean(expr4));

const expr5 = (31 % 5) == "1";
console.log('5. (31 % 5) == "1" =>', Boolean(expr5));

const expr6 = !!true;
console.log("6. !!true =>", Boolean(expr6));

const expr7 = "5th Avenue" !== "5th Avenue";
console.log('7. "5th Avenue" !== "5th Avenue" =>', Boolean(expr7));

const expr8 = 52 !== "52";
console.log('8. 52 !== "52" =>', Boolean(expr8));

const expr9 = (undefined || null);
console.log("9. (undefined || null) =>", Boolean(expr9));
