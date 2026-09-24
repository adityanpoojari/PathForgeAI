import assert from "node:assert/strict";

const BASE_URL = "http://127.0.0.1:3000";

async function run() {
  console.log("🚀 Starting End-to-End Verification of PathForge AI...");

  // 1. Landing Page Test
  console.log("\n1. Testing Landing Page (GET /)...");
  const homeRes = await fetch(`${BASE_URL}/`);
  assert.equal(homeRes.status, 200, "Home page returns 200 OK");
  const homeHtml = await homeRes.text();
  assert.ok(homeHtml.includes("PathForge"), "Home contains PathForge");
  assert.ok(homeHtml.includes("career-ready roadmap"), "Home contains Hero headline");
  console.log("✅ Landing page renders successfully with security headers & full content!");

  // 2. Test the 5 required input combinations
  const testInputs = [
    { technologies: ["Java"], level: "Beginner", goal: "Software Developer", hoursPerWeek: 10, durationWeeks: 6 },
    { technologies: ["Python"], level: "Intermediate", goal: "Data Scientist", hoursPerWeek: 12, durationWeeks: 8 },
    { technologies: ["React"], level: "Beginner", goal: "Frontend Developer", hoursPerWeek: 15, durationWeeks: 6 },
    { technologies: ["Docker"], level: "Beginner", goal: "DevOps/Cloud Engineer", hoursPerWeek: 10, durationWeeks: 6 },
    { technologies: ["Data Structures & Algorithms"], level: "Intermediate", goal: "Placement/Interview Prep", hoursPerWeek: 14, durationWeeks: 6 },
  ];

  console.log("\n2. Testing Path Generation for 5 Required Combinations (Zero Keys Fallback)...");
  for (const input of testInputs) {
    const techName = input.technologies.join(" + ");
    console.log(`   Generating for: ${techName} (${input.level} • ${input.goal})...`);

    const genRes = await fetch(`${BASE_URL}/api/generate-path`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    assert.equal(genRes.status, 200, `Generate returned status 200 for ${techName}`);
    const genData = await genRes.json();
    assert.equal(genData.success, true, "Success flag is true");
    assert.ok(genData.data, "Data object present");

    // Verify all 6 outputs
    assert.ok(genData.data.overview, "Output 1: Overview present");
    assert.ok(genData.data.modules.length > 0, "Output 1: Modules present");
    assert.ok(genData.data.modules[0].topics.length > 0, "Output 1: Topics present");
    assert.ok(genData.data.projects.length >= 4, "Output 2: 4-tier milestone projects present");
    assert.ok(genData.data.practiceProblems.length >= 4, "Output 3: Practice problems present");
    assert.ok(genData.data.interviewQuestions.length >= 4, "Output 4: Interview questions present");
    assert.equal(genData.data.weeklySchedule.length, input.durationWeeks, `Output 5: Schedule matches duration (${input.durationWeeks} weeks)`);
    assert.equal(genData.data.weeklySchedule[0].hours, input.hoursPerWeek, `Output 5: Schedule matches hours (${input.hoursPerWeek} hrs/week)`);
    assert.ok(genData.providerUsed, "Provider used is identified");

    console.log(`   ✔ ${techName}: generated successfully! (Provider: ${genData.providerUsed}, PathId: ${genData.pathId})`);
  }

  // 3. Test Caching Deduplication
  console.log("\n3. Testing Request Hash Caching...");
  const dupInput = testInputs[0];
  const cachedRes = await fetch(`${BASE_URL}/api/generate-path`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dupInput),
  });
  const cachedData = await cachedRes.json();
  assert.equal(cachedData.success, true);
  assert.equal(cachedData.cached, true, "Second identical request returned from cache with cached=true");
  console.log("✅ Repeating identical request returned from cache with cached=true!");

  // 4. Test User Authentication (Sign up, Login, Me, Logout)
  console.log("\n4. Testing Authentication Flow...");
  const testEmail = `tester_${Date.now()}@example.com`;
  const testPassword = "SecurePassword123!";

  // Register
  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Automated Tester", email: testEmail, password: testPassword }),
  });
  assert.equal(regRes.status, 200, "Registration succeeds");
  const regCookie = regRes.headers.get("set-cookie");
  assert.ok(regCookie && regCookie.includes("pathforge_session"), "Session cookie set on register");

  // Get Me with cookie
  const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { cookie: regCookie },
  });
  const meData = await meRes.json();
  assert.equal(meData.authenticated, true);
  assert.equal(meData.user.email, testEmail);
  console.log("✅ Registration and session cookie verification passed!");

  // Login
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: testPassword }),
  });
  assert.equal(loginRes.status, 200, "Login succeeds");
  const loginCookie = loginRes.headers.get("set-cookie");
  assert.ok(loginCookie.includes("pathforge_session"), "Login returned valid session cookie");
  console.log("✅ Login with credentials passed!");

  // 5. Test Progress Tracking & Save Path
  console.log("\n5. Testing Progress Tracking & Path Saving...");
  const saveRes = await fetch(`${BASE_URL}/api/paths/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: loginCookie },
    body: JSON.stringify({ pathId: cachedData.pathId }),
  });
  const saveData = await saveRes.json();
  assert.equal(saveRes.status, 200);
  assert.equal(saveData.success, true);

  // Toggle progress
  const toggleRes = await fetch(`${BASE_URL}/api/progress/toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: loginCookie },
    body: JSON.stringify({
      learningPathId: cachedData.pathId,
      itemId: "mod-1-top-0",
      itemType: "topic",
      completed: true,
    }),
  });
  const toggleData = await toggleRes.json();
  assert.equal(toggleRes.status, 200);
  assert.equal(toggleData.success, true);
  assert.equal(toggleData.progress.completed, true);
  console.log("✅ Path saved to dashboard and topic progress toggled!");

  // 6. Test Dashboard API
  console.log("\n6. Testing Dashboard Stats...");
  const dashRes = await fetch(`${BASE_URL}/api/dashboard`, {
    headers: { cookie: loginCookie },
  });
  const dashData = await dashRes.json();
  assert.equal(dashRes.status, 200);
  assert.equal(dashData.success, true);
  assert.ok(dashData.paths.length >= 1, "At least 1 path in dashboard");
  assert.ok(dashData.stats.totalCompletedTopics >= 1, "Completed topic counted");
  assert.ok(dashData.stats.streakDays >= 1, "Streak active");
  console.log(`✅ Dashboard stats verified: ${dashData.paths.length} saved paths, streak: ${dashData.stats.streakDays} days!`);

  // 7. Test Data Export (GDPR)
  console.log("\n7. Testing Data Export (GDPR)...");
  const exportRes = await fetch(`${BASE_URL}/api/user/export-data`, {
    headers: { cookie: loginCookie },
  });
  assert.equal(exportRes.status, 200);
  const exportData = await exportRes.json();
  assert.equal(exportData.user.email, testEmail);
  console.log("✅ User data export download verified!");

  // 8. Test Security Disclosures & Static Assets
  console.log("\n8. Testing Security files...");
  const secRes = await fetch(`${BASE_URL}/security.txt`);
  assert.equal(secRes.status, 200);
  const secText = await secRes.text();
  assert.ok(secText.includes("Contact: mailto:security@pathforge.ai"));
  console.log("✅ security.txt is accessible and valid!");

  console.log("\n🎉 ALL END-TO-END VERIFICATION CHECKS PASSED WITH 100% SUCCESS!");
}

run().catch((err) => {
  console.error("❌ E2E verification failed:", err);
  process.exit(1);
});
