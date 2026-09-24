import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";

function computeRequestHash(params) {
  const normalizedTech = [...params.technologies]
    .map((t) => t.trim().toLowerCase())
    .sort()
    .join(",");
  const normalizedLevel = params.level.trim().toLowerCase();
  const normalizedGoal = params.goal.trim().toLowerCase();
  const rawKey = `${normalizedTech}:${normalizedLevel}:${normalizedGoal}:${params.hoursPerWeek}:${params.durationWeeks}`;
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

function buildSafeResourceUrl(type, searchQuery, technologyContext) {
  const queryClean = searchQuery.trim();
  if (type === "docs") {
    return {
      url: `https://www.google.com/search?q=${encodeURIComponent(queryClean + " official documentation")}`,
      domainLabel: "Official Docs Search",
    };
  }
  if (type === "video") {
    return {
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(queryClean + " tutorial")}`,
      domainLabel: "YouTube Tutorial",
    };
  }
  return {
    url: `https://www.google.com/search?q=${encodeURIComponent(queryClean + " guide tutorial")}`,
    domainLabel: "Curated Web Resource",
  };
}

test("Cache hash is deterministic regardless of tech order", () => {
  const hashA = computeRequestHash({
    technologies: ["React", "TypeScript", "Tailwind"],
    level: "Beginner",
    goal: "Frontend Developer",
    hoursPerWeek: 10,
    durationWeeks: 8,
  });

  const hashB = computeRequestHash({
    technologies: ["Tailwind", "React", "TypeScript"],
    level: "beginner ",
    goal: "frontend developer",
    hoursPerWeek: 10,
    durationWeeks: 8,
  });

  assert.equal(hashA, hashB, "Hashes should match regardless of technology array order or casing");
});

test("Safe resource links never use invented domains", () => {
  const docLink = buildSafeResourceUrl("docs", "Java HashMap Collections", "Java");
  assert.ok(docLink.url.startsWith("https://www.google.com/search?q="));
  assert.ok(docLink.url.includes("official%20documentation"));

  const vidLink = buildSafeResourceUrl("video", "Python NumPy tutorial", "Python");
  assert.ok(vidLink.url.startsWith("https://www.youtube.com/results?search_query="));
});
