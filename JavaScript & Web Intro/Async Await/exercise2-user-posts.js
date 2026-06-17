// Exercise 2 – User with Posts
//
// Demonstrates sequential async operations:
//   Step 1 — fetch user (bail out early if not found)
//   Step 2 — fetch that user's posts (only if step 1 succeeded)
//
// Key concept: await makes async code read top-to-bottom, like sync code.
//
// Requires Node 18+ for the built-in fetch API.

// ─── getUserWithPosts ─────────────────────────────────────────────────────────

async function getUserWithPosts(userId) {
  try {

    // ── Step 1: Fetch user ──────────────────────────────────────────────────
    console.log(`Fetching user ${userId}...`);

    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    // A 404 returns ok:false — we throw so the catch block handles it cleanly
    if (!userResponse.ok) {
      throw new Error(`User not found (HTTP ${userResponse.status})`);
    }

    const userData = await userResponse.json();
    console.log(`User found: ${userData.name} (${userData.email})`);

    // ── Step 2: Fetch posts for this user ───────────────────────────────────
    // This line only runs because the user fetch succeeded above.
    console.log(`Fetching posts for user ${userId}...`);

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    if (!postsResponse.ok) {
      throw new Error(`Could not fetch posts (HTTP ${postsResponse.status})`);
    }

    const posts = await postsResponse.json();
    console.log(`Found ${posts.length} posts.`);

    // ── Return combined result ──────────────────────────────────────────────
    return {
      user: {
        id:       userData.id,
        name:     userData.name,
        email:    userData.email,
        username: userData.username
      },
      posts: posts
    };

  } catch (error) {
    console.error(`Error for userId ${userId}:`, error.message);
    return null;
  }
}

// ─── Test runner ──────────────────────────────────────────────────────────────

async function runTests() {
  console.log("=== Exercise 2: User with Posts ===\n");

  const testIds = [1, 3, 999];

  for (const id of testIds) {
    console.log(`---- Testing userId: ${id} ----`);

    const result = await getUserWithPosts(id);

    if (result) {
      console.log(`Name         : ${result.user.name}`);
      console.log(`Email        : ${result.user.email}`);
      console.log(`Number of posts: ${result.posts.length}`);
      if (result.posts.length > 0) {
        console.log(`First post   : "${result.posts[0].title}"`);
      }
    } else {
      console.log("Result: null — user does not exist or request failed.");
    }

    console.log();
  }

  console.log("=== Done ===");
}

runTests();
