import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding PathForge AI database...");

  // 1. Create Demo User
  const passwordHash = await bcrypt.hash("Password123!", 12);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@pathforge.ai" },
    update: {},
    create: {
      email: "demo@pathforge.ai",
      name: "Demo Explorer",
      passwordHash: passwordHash,
      role: "USER",
      emailVerified: new Date(),
    },
  });
  console.log(`👤 Created Demo User: ${demoUser.email} (Password: Password123!)`);

  // 2. Load Java Roadmap template
  const javaRoadmapPath = path.join(process.cwd(), "src", "data", "roadmaps", "java.json");
  if (fs.existsSync(javaRoadmapPath)) {
    const javaContent = JSON.parse(fs.readFileSync(javaRoadmapPath, "utf-8"));
    const javaHash = crypto
      .createHash("sha256")
      .update("java:beginner:software developer:10:6")
      .digest("hex");

    const javaPath = await prisma.learningPath.upsert({
      where: { requestHash: javaHash },
      update: {},
      create: {
        userId: demoUser.id,
        title: "Java Mastery: From Syntax to Spring Boot",
        technologies: "Java",
        level: "Beginner",
        goal: "Software Developer",
        hoursPerWeek: 10,
        weeks: 6,
        requestHash: javaHash,
        contentJson: JSON.stringify(javaContent),
        visibility: "public",
        shareId: "demo-java-path",
      },
    });
    console.log(`📚 Pre-seeded Java Learning Path: ${javaPath.title} (ID: ${javaPath.id})`);
  }

  // 3. Load Python Roadmap template
  const pythonRoadmapPath = path.join(process.cwd(), "src", "data", "roadmaps", "python.json");
  if (fs.existsSync(pythonRoadmapPath)) {
    const pythonContent = JSON.parse(fs.readFileSync(pythonRoadmapPath, "utf-8"));
    const pythonHash = crypto
      .createHash("sha256")
      .update("python:intermediate:data scientist:12:6")
      .digest("hex");

    const pythonPath = await prisma.learningPath.upsert({
      where: { requestHash: pythonHash },
      update: {},
      create: {
        userId: demoUser.id,
        title: "Python Data Science & Production ML",
        technologies: "Python",
        level: "Intermediate",
        goal: "Data Scientist",
        hoursPerWeek: 12,
        weeks: 6,
        requestHash: pythonHash,
        contentJson: JSON.stringify(pythonContent),
        visibility: "public",
        shareId: "demo-python-path",
      },
    });
    console.log(`📚 Pre-seeded Python Learning Path: ${pythonPath.title} (ID: ${pythonPath.id})`);
  }

  // 4. Log Seed Audit
  await prisma.auditLog.create({
    data: {
      userId: demoUser.id,
      event: "SYSTEM_SEEDED",
      ipAddress: "127.0.0.1",
      userAgent: "PathForge Seeder/1.0",
      metadataJson: JSON.stringify({ message: "Initial database seed populated successfully" }),
    },
  });

  console.log("✅ Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
