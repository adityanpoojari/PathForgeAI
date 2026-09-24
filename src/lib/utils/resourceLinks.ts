// Anti-hallucination Safe Resource Link Builder
// Constructs verified links from a trusted allowlist of documentation domains

const OFFICIAL_DOC_DOMAINS: Record<string, string> = {
  javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  typescript: "https://www.typescriptlang.org/docs/",
  python: "https://docs.python.org/3/",
  java: "https://docs.oracle.com/en/java/",
  react: "https://react.dev/reference/react",
  nextjs: "https://nextjs.org/docs",
  docker: "https://docs.docker.com/",
  kubernetes: "https://kubernetes.io/docs/",
  postgresql: "https://www.postgresql.org/docs/",
  mongodb: "https://www.mongodb.com/docs/",
  nodejs: "https://nodejs.org/en/docs/",
  go: "https://go.dev/doc/",
  rust: "https://doc.rust-lang.org/book/",
  django: "https://docs.djangoproject.com/en/stable/",
  springboot: "https://spring.io/guides",
  fastapi: "https://fastapi.tiangolo.com/",
  tailwind: "https://tailwindcss.com/docs",
  flutter: "https://docs.flutter.dev/",
  android: "https://developer.android.com/guide",
  ios: "https://developer.apple.com/documentation/",
  express: "https://expressjs.com/",
  git: "https://git-scm.com/doc",
  redis: "https://redis.io/docs/",
  graphql: "https://graphql.org/learn/",
  dsa: "https://en.wikipedia.org/wiki/Data_structure",
  systemdesign: "https://github.com/donnemartin/system-design-primer",
  aws: "https://docs.aws.amazon.com/",
};

export function buildSafeResourceUrl(
  type: "docs" | "video" | "article" | "practice",
  searchQuery: string,
  technologyContext?: string
): { url: string; domainLabel: string } {
  const queryClean = searchQuery.trim();
  const techLower = (technologyContext || "").toLowerCase();

  // If type is docs and tech matches known official documentation
  if (type === "docs") {
    for (const [key, baseDocsUrl] of Object.entries(OFFICIAL_DOC_DOMAINS)) {
      if (techLower.includes(key) || queryClean.toLowerCase().includes(key)) {
        return {
          url: `https://www.google.com/search?q=${encodeURIComponent(queryClean + " official documentation")}`,
          domainLabel: "Official Docs Search",
        };
      }
    }
  }

  if (type === "video") {
    return {
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(queryClean + " tutorial")}`,
      domainLabel: "YouTube Tutorial",
    };
  }

  if (type === "practice") {
    return {
      url: `https://www.google.com/search?q=${encodeURIComponent(queryClean + " leetcode practice problems exercises")}`,
      domainLabel: "Practice & Exercises",
    };
  }

  // Articles & General Docs
  return {
    url: `https://www.google.com/search?q=${encodeURIComponent(queryClean + " guide tutorial")}`,
    domainLabel: "Curated Web Resource",
  };
}
