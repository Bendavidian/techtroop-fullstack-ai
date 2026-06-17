// Exercise 3 – Dashboard (parallel fetches with Promise.all)
//
// Demonstrates parallel async operations:
//   All three endpoints are requested at the same time using Promise.all.
//   Total wait time = the slowest single request, NOT the sum of all three.
//
// Requires Node 18+ for the built-in fetch API.

// ─── createDashboard ──────────────────────────────────────────────────────────

async function createDashboard() {
  try {
    console.log("Fetching users, posts and comments in parallel...");

    // Start all three requests at the same moment.
    // Promise.all resolves when every promise in the array has resolved,
    // or rejects immediately if any one of them rejects.
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/comments")
    ]);

    // Check every response before parsing bodies
    if (!usersRes.ok)    throw new Error(`Users fetch failed (${usersRes.status})`);
    if (!postsRes.ok)    throw new Error(`Posts fetch failed (${postsRes.status})`);
    if (!commentsRes.ok) throw new Error(`Comments fetch failed (${commentsRes.status})`);

    // Parse all three bodies in parallel too
    const [users, posts, comments] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
      commentsRes.json()
    ]);

    console.log(
      `Received: ${users.length} users, ${posts.length} posts, ${comments.length} comments`
    );

    // ── Build a postCount map: { userId → number of posts } ────────────────
    const postCountByUser = {};
    users.forEach(function (user) {
      postCountByUser[user.id] = 0;
    });
    posts.forEach(function (post) {
      postCountByUser[post.userId] = (postCountByUser[post.userId] || 0) + 1;
    });

    // ── Build a commentCount map: { userId → number of comments on their posts } ─
    // First map each post id to its author's userId
    const userIdByPost = {};
    posts.forEach(function (post) {
      userIdByPost[post.id] = post.userId;
    });

    const commentCountByUser = {};
    users.forEach(function (user) {
      commentCountByUser[user.id] = 0;
    });
    comments.forEach(function (comment) {
      const authorId = userIdByPost[comment.postId];
      if (authorId !== undefined) {
        commentCountByUser[authorId] = (commentCountByUser[authorId] || 0) + 1;
      }
    });

    // ── Summary numbers ─────────────────────────────────────────────────────
    const totalUsers    = users.length;
    const totalPosts    = posts.length;
    const totalComments = comments.length;
    const avgPostsPerUser    = parseFloat((totalPosts    / totalUsers).toFixed(2));
    const avgCommentsPerPost = parseFloat((totalComments / totalPosts).toFixed(2));

    // ── Top 3 users by post count ───────────────────────────────────────────
    const topUsers = users
      .map(function (user) {
        return {
          name:         user.name,
          postCount:    postCountByUser[user.id]    || 0,
          commentCount: commentCountByUser[user.id] || 0
        };
      })
      .sort(function (a, b) { return b.postCount - a.postCount; })
      .slice(0, 3);

    // ── 5 most recent posts (highest IDs) ──────────────────────────────────
    const recentPosts = posts
      .slice()                                          // don't mutate original
      .sort(function (a, b) { return b.id - a.id; })
      .slice(0, 5)
      .map(function (post) {
        return { id: post.id, title: post.title, userId: post.userId };
      });

    return {
      summary: {
        totalUsers,
        totalPosts,
        totalComments,
        avgPostsPerUser,
        avgCommentsPerPost
      },
      topUsers,
      recentPosts
    };

  } catch (error) {
    console.error("Dashboard error:", error.message);
    return null;
  }
}

// ─── Test runner ──────────────────────────────────────────────────────────────

async function runTests() {
  console.log("=== Exercise 3: Dashboard ===\n");

  const dashboard = await createDashboard();

  if (!dashboard) {
    console.log("Dashboard could not be created.");
    return;
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log("\n── Summary ──────────────────────────────────");
  console.log("Total users          :", dashboard.summary.totalUsers);
  console.log("Total posts          :", dashboard.summary.totalPosts);
  console.log("Total comments       :", dashboard.summary.totalComments);
  console.log("Avg posts / user     :", dashboard.summary.avgPostsPerUser);
  console.log("Avg comments / post  :", dashboard.summary.avgCommentsPerPost);

  // ── Top users ─────────────────────────────────────────────────────────────
  console.log("\n── Top 3 Users by Post Count ────────────────");
  dashboard.topUsers.forEach(function (user, i) {
    console.log(
      `${i + 1}. ${user.name} — ${user.postCount} posts, ${user.commentCount} comments`
    );
  });

  // ── Recent posts ──────────────────────────────────────────────────────────
  console.log("\n── 5 Most Recent Posts (by ID) ──────────────");
  dashboard.recentPosts.forEach(function (post) {
    console.log(`[${post.id}] (user ${post.userId}) "${post.title}"`);
  });

  console.log("\n=== Done ===");
}

runTests();
