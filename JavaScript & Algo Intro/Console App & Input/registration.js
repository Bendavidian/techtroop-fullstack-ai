const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userData = {};

rl.question("Enter your name: ", (name) => {
  userData.name = name;
  rl.question("Enter your email: ", (email) => {
    userData.email = email;
    rl.question("Enter your age: ", (age) => {
      userData.age = age;
      rl.question("Enter your favorite color: ", (color) => {
        userData.favoriteColor = color;
        rl.close();

        console.log("\nRegistration Summary:");
        console.log(`Name: ${userData.name}`);
        console.log(`Email: ${userData.email}`);
        console.log(`Age: ${userData.age}`);
        console.log(`Favorite Color: ${userData.favoriteColor}`);
      });
    });
  });
});
