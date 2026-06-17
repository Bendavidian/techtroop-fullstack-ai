// Exercise 1 – Get User by ID
//
// Converts a Promise-chain into async/await.
// Demonstrates: async function, await, try/catch, response.ok check.
//
// Requires Node 18+ for the built-in fetch API.

// ─── Original Promise-chain version (kept as reference) ───────────────────────
/*
function getUserById(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error('User not found');
      return response.json();
    })
    .then(user => {
      console.log(`Found user: ${user.name} (${user.email})`);
      return user;
    })
    .catch(error => {
      console.error('Error fetching user:', error.message);
      return null;
    });
}
*/

// ─── async/await version ──────────────────────────────────────────────────────

async function getUserById(userId) {
  try {
    // await pauses here until the HTTP response headers arrive
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    // response.ok is true for 2xx status codes.
    // A 404 does NOT throw automatically — we must check manually.
    if (!response.ok) {
      throw new Error("User not found");
    }

    // await pauses again while the body is read and parsed as JSON
    const user = await response.json();

    console.log(`Found user: ${user.name} (${user.email})`);
    return user;

  } catch (error) {
    // Catches both network failures and our manual throw above
    console.error("Error fetching user:", error.message);
    return null;
  }
}

// ─── Test runner ──────────────────────────────────────────────────────────────
// Wrapped in its own async function so we can use await at the top level.

async function runTests() {
  console.log("=== Exercise 1: Get User by ID ===\n");

  const testIds = [1, 5, 10, 999];

  for (const id of testIds) {
    console.log(`-- Testing userId: ${id} --`);
    const result = await getUserById(id);
    if (result === null) {
      console.log("Result: null (user not found or request failed)");
    }
    console.log();
  }

  console.log("=== Done ===");
}

runTests();
