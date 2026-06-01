let usernameLength = 6;
let passwordLength = 7;
let userAge = 15;

let canCreateAccount = true;

if (usernameLength < 5) {
  console.log("Error: Username must be at least 5 characters.");
  canCreateAccount = false;
}

if (passwordLength < 8) {
  console.log("Error: Password must be at least 8 characters.");
  canCreateAccount = false;
}

if (userAge < 13) {
  console.log("Error: You must be at least 13 years old to create an account.");
  canCreateAccount = false;
}

if (canCreateAccount) {
  console.log("Success! Your account has been created.");
}
