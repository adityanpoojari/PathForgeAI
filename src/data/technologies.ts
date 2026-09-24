export interface TechnologyItem {
  id: string;
  name: string;
  category: string;
  description: string;
  popular: boolean;
  iconName: string;
  color: string;
  relatedGoals: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "languages", name: "Programming Languages", description: "Foundational and modern compiled & interpreted languages", icon: "Code2" },
  { id: "frontend", name: "Web Frontend", description: "Client-side libraries, frameworks, and modern CSS toolkits", icon: "Layout" },
  { id: "backend", name: "Backend & Frameworks", description: "Server architectures, APIs, enterprise and rapid microservices", icon: "Server" },
  { id: "mobile", name: "Mobile Development", description: "Cross-platform and native smartphone app development", icon: "Smartphone" },
  { id: "databases", name: "Databases & Storage", description: "Relational, document, caching, and managed cloud databases", icon: "Database" },
  { id: "ai-data", name: "Data, AI & Machine Learning", description: "Data analytics, LLMs, neural networks, and visualization", icon: "BrainCircuit" },
  { id: "devops", name: "DevOps & Cloud", description: "Containerization, infrastructure as code, CI/CD, and hyperscalers", icon: "Cloud" },
  { id: "core-cs", name: "Core Computer Science", description: "Algorithms, operating systems, networking, and system design", icon: "Cpu" },
  { id: "security-other", name: "Security, Web3 & Game Dev", description: "Cybersecurity, blockchain, game engines, and automated QA", icon: "ShieldCheck" },
];

export const CAREER_GOALS = [
  "Software Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Mobile Developer",
  "Data Analyst",
  "Data Scientist",
  "ML/AI Engineer",
  "DevOps/Cloud Engineer",
  "Cybersecurity Analyst",
  "Game Developer",
  "QA Engineer",
  "Placement/Interview Prep",
  "Custom",
] as const;

export type CareerGoal = (typeof CAREER_GOALS)[number];

export const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
export type ProficiencyLevel = (typeof PROFICIENCY_LEVELS)[number];

export const TECHNOLOGIES: TechnologyItem[] = [
  // Programming Languages
  { id: "java", name: "Java", category: "languages", description: "Enterprise-grade object-oriented language for high-scale backends & Android", popular: true, iconName: "Coffee", color: "#f89820", relatedGoals: ["Software Developer", "Backend Developer", "Placement/Interview Prep"] },
  { id: "python", name: "Python", category: "languages", description: "Versatile, high-level language dominating AI, Data Science, and rapid web dev", popular: true, iconName: "FileCode2", color: "#3776ab", relatedGoals: ["Data Scientist", "ML/AI Engineer", "Backend Developer", "Software Developer"] },
  { id: "javascript", name: "JavaScript", category: "languages", description: "The omnipresent language powering modern web applications and Node.js runtimes", popular: true, iconName: "FileCode", color: "#f7df1e", relatedGoals: ["Frontend Developer", "Full-Stack Developer", "Software Developer"] },
  { id: "typescript", name: "TypeScript", category: "languages", description: "Type-safe JavaScript superset providing scalable enterprise codebases", popular: true, iconName: "FileCode2", color: "#3178c6", relatedGoals: ["Full-Stack Developer", "Frontend Developer", "Backend Developer"] },
  { id: "c", name: "C", category: "languages", description: "Low-level procedural language mastering memory management and hardware architecture", popular: false, iconName: "Terminal", color: "#a8b9cc", relatedGoals: ["Software Developer", "Core CS", "Placement/Interview Prep"] },
  { id: "cpp", name: "C++", category: "languages", description: "High-performance systems programming with OOP, templates, and gaming dominance", popular: true, iconName: "Terminal", color: "#00599c", relatedGoals: ["Software Developer", "Game Developer", "Placement/Interview Prep"] },
  { id: "csharp", name: "C#", category: "languages", description: "Modern Microsoft language for .NET backends, enterprise apps, and Unity games", popular: true, iconName: "Hash", color: "#239120", relatedGoals: ["Software Developer", "Backend Developer", "Game Developer"] },
  { id: "go", name: "Go (Golang)", category: "languages", description: "Google's lightweight, concurrent language powering modern cloud infrastructure", popular: true, iconName: "Zap", color: "#00add8", relatedGoals: ["Backend Developer", "DevOps/Cloud Engineer"] },
  { id: "rust", name: "Rust", category: "languages", description: "Memory-safe systems language with zero-cost abstractions and fearless concurrency", popular: true, iconName: "Flame", color: "#dea584", relatedGoals: ["Software Developer", "Backend Developer", "Cybersecurity Analyst"] },
  { id: "kotlin", name: "Kotlin", category: "languages", description: "Modern concise JVM language endorsed by Google as premier choice for Android", popular: true, iconName: "Smartphone", color: "#7f52ff", relatedGoals: ["Mobile Developer", "Backend Developer"] },
  { id: "swift", name: "Swift", category: "languages", description: "Apple's powerful, intuitive language for iOS, macOS, watchOS, and visionOS", popular: true, iconName: "Apple", color: "#f05138", relatedGoals: ["Mobile Developer"] },
  { id: "php", name: "PHP", category: "languages", description: "Web veteran powering millions of websites, WordPress, and modern Laravel backends", popular: false, iconName: "Globe", color: "#777bb4", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "ruby", name: "Ruby", category: "languages", description: "Human-centric, elegant scripting language famous for Ruby on Rails productivity", popular: false, iconName: "Gem", color: "#cc342d", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "dart", name: "Dart", category: "languages", description: "Client-optimized language tailored for high-speed multi-platform UI with Flutter", popular: false, iconName: "Smartphone", color: "#0175c2", relatedGoals: ["Mobile Developer", "Frontend Developer"] },
  { id: "r", name: "R", category: "languages", description: "Statistical computing environment for advanced analytics and academic bioinformatics", popular: false, iconName: "BarChart3", color: "#276dc3", relatedGoals: ["Data Analyst", "Data Scientist"] },
  { id: "scala", name: "Scala", category: "languages", description: "Functional & OOP hybrid powering Apache Spark big data clusters", popular: false, iconName: "Boxes", color: "#dc322f", relatedGoals: ["Data Scientist", "Backend Developer"] },
  { id: "matlab", name: "MATLAB", category: "languages", description: "Matrix manipulation and algorithmic simulation for engineering and signal processing", popular: false, iconName: "Binary", color: "#e16723", relatedGoals: ["Data Analyst", "Software Developer"] },
  { id: "bash", name: "Bash / Shell Scripting", category: "languages", description: "Linux command line automation, cron orchestrations, and pipeline scripting", popular: true, iconName: "Terminal", color: "#4eaa25", relatedGoals: ["DevOps/Cloud Engineer", "Backend Developer"] },
  { id: "sql", name: "SQL", category: "languages", description: "Universal standard language for querying, transforming, and managing relational data", popular: true, iconName: "Database", color: "#336791", relatedGoals: ["Data Analyst", "Backend Developer", "Software Developer"] },
  { id: "solidity", name: "Solidity", category: "languages", description: "Contract-oriented language for Ethereum smart contracts and decentralized applications", popular: false, iconName: "Coins", color: "#363636", relatedGoals: ["Software Developer", "Cybersecurity Analyst"] },

  // Web Frontend
  { id: "html-css", name: "HTML / CSS", category: "frontend", description: "The foundational markup and styling pillars of the World Wide Web", popular: true, iconName: "Layout", color: "#e34f26", relatedGoals: ["Frontend Developer", "Full-Stack Developer"] },
  { id: "react", name: "React", category: "frontend", description: "The industry-standard declarative component UI library by Meta", popular: true, iconName: "Atom", color: "#61dafb", relatedGoals: ["Frontend Developer", "Full-Stack Developer"] },
  { id: "nextjs", name: "Next.js", category: "frontend", description: "The premier full-stack React framework featuring App Router, SSR, and edge rendering", popular: true, iconName: "ArrowUpRight", color: "#000000", relatedGoals: ["Full-Stack Developer", "Frontend Developer"] },
  { id: "angular", name: "Angular", category: "frontend", description: "Google's comprehensive enterprise framework with two-way binding and dependency injection", popular: true, iconName: "Shield", color: "#dd0031", relatedGoals: ["Frontend Developer", "Software Developer"] },
  { id: "vue", name: "Vue.js", category: "frontend", description: "Progressive, approachable frontend framework with reactive state and single-file components", popular: true, iconName: "Layers", color: "#4fc08d", relatedGoals: ["Frontend Developer", "Full-Stack Developer"] },
  { id: "svelte", name: "Svelte / SvelteKit", category: "frontend", description: "Zero-runtime compiler transforming declarative code into surgically tiny JS", popular: false, iconName: "Sparkles", color: "#ff3e00", relatedGoals: ["Frontend Developer"] },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", description: "Utility-first CSS framework delivering rapid, maintainable design systems", popular: true, iconName: "Palette", color: "#06b6d4", relatedGoals: ["Frontend Developer", "Full-Stack Developer"] },

  // Backend and Frameworks
  { id: "nodejs", name: "Node.js", category: "backend", description: "Event-driven asynchronous JavaScript runtime for high-throughput server backends", popular: true, iconName: "Server", color: "#339933", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "express", name: "Express.js", category: "backend", description: "Minimalist, unopinionated web framework for Node.js RESTful APIs and middleware", popular: true, iconName: "Cpu", color: "#000000", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "spring-boot", name: "Spring Boot", category: "backend", description: "Enterprise Java titan for microservices, secure transaction management, and scale", popular: true, iconName: "Leaf", color: "#6db33f", relatedGoals: ["Backend Developer", "Software Developer"] },
  { id: "django", name: "Django", category: "backend", description: "Batteries-included Python framework with built-in ORM, admin panel, and auth", popular: true, iconName: "Boxes", color: "#092e20", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "flask", name: "Flask", category: "backend", description: "Lightweight WSGI Python microframework ideal for microservices and AI model APIs", popular: false, iconName: "FlaskConical", color: "#000000", relatedGoals: ["Backend Developer", "ML/AI Engineer"] },
  { id: "fastapi", name: "FastAPI", category: "backend", description: "Ultra-fast Python async framework with automatic OpenAPI docs and Pydantic validation", popular: true, iconName: "Zap", color: "#009688", relatedGoals: ["Backend Developer", "ML/AI Engineer"] },
  { id: "dotnet", name: ".NET Core", category: "backend", description: "High-performance cross-platform developer platform by Microsoft for cloud APIs", popular: true, iconName: "Layers", color: "#512bd4", relatedGoals: ["Software Developer", "Backend Developer"] },
  { id: "laravel", name: "Laravel", category: "backend", description: "The web artisan's PHP framework offering elegant syntax, Eloquent ORM, and queues", popular: true, iconName: "Flame", color: "#ff2d20", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "rails", name: "Ruby on Rails", category: "backend", description: "Convention-over-configuration powerhouse for shipping web MVPs at lighting speed", popular: false, iconName: "Train", color: "#cc0000", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "graphql", name: "GraphQL", category: "backend", description: "Declarative query language for client-driven API fetching without over-fetching", popular: true, iconName: "Share2", color: "#e10098", relatedGoals: ["Backend Developer", "Full-Stack Developer"] },
  { id: "rest-api", name: "REST API Design", category: "backend", description: "Architectural principles, idempotency, HTTP status semantics, and API versioning", popular: true, iconName: "Network", color: "#0284c7", relatedGoals: ["Backend Developer", "Software Developer"] },

  // Mobile
  { id: "android", name: "Android (Kotlin)", category: "mobile", description: "Native Android app engineering using Jetpack Compose, Coroutines, and MVVM", popular: true, iconName: "Smartphone", color: "#3ddc84", relatedGoals: ["Mobile Developer", "Software Developer"] },
  { id: "ios", name: "iOS (Swift)", category: "mobile", description: "Native Apple ecosystem engineering with SwiftUI, UIKit, and CoreData", popular: true, iconName: "Apple", color: "#000000", relatedGoals: ["Mobile Developer"] },
  { id: "flutter", name: "Flutter", category: "mobile", description: "Google's UI toolkit for compiling natively beautiful mobile, web, and desktop apps", popular: true, iconName: "Smartphone", color: "#02569b", relatedGoals: ["Mobile Developer", "Frontend Developer"] },
  { id: "react-native", name: "React Native", category: "mobile", description: "Build native mobile experiences for iOS and Android using familiar React syntax", popular: true, iconName: "Atom", color: "#61dafb", relatedGoals: ["Mobile Developer", "Full-Stack Developer"] },

  // Databases
  { id: "mysql", name: "MySQL", category: "databases", description: "World's most popular open-source relational database powering web applications", popular: true, iconName: "Database", color: "#4479a1", relatedGoals: ["Backend Developer", "Software Developer"] },
  { id: "postgresql", name: "PostgreSQL", category: "databases", description: "Advanced open-source relational database with robust JSON support and extensions", popular: true, iconName: "Database", color: "#336791", relatedGoals: ["Backend Developer", "Full-Stack Developer", "Data Scientist"] },
  { id: "mongodb", name: "MongoDB", category: "databases", description: "Flexible document-based NoSQL database for rapid schema evolution and JSON storage", popular: true, iconName: "Database", color: "#47a248", relatedGoals: ["Full-Stack Developer", "Backend Developer"] },
  { id: "redis", name: "Redis", category: "databases", description: "Blazing in-memory data store for caching, message brokers, and session storage", popular: true, iconName: "Zap", color: "#dc382d", relatedGoals: ["Backend Developer", "DevOps/Cloud Engineer"] },
  { id: "firebase", name: "Firebase", category: "databases", description: "Google's Backend-as-a-Service providing real-time NoSQL, auth, and cloud functions", popular: true, iconName: "Flame", color: "#ffca28", relatedGoals: ["Frontend Developer", "Mobile Developer"] },

  // Data, AI and ML
  { id: "pandas-numpy", name: "Data Analysis (Pandas & NumPy)", category: "ai-data", description: "Python foundational libraries for high-performance array computing and data wrangling", popular: true, iconName: "BarChart", color: "#150458", relatedGoals: ["Data Analyst", "Data Scientist"] },
  { id: "data-science", name: "Data Science", category: "ai-data", description: "Hypothesis testing, exploratory data analysis, feature engineering, and statistical modeling", popular: true, iconName: "Activity", color: "#2563eb", relatedGoals: ["Data Scientist", "Data Analyst"] },
  { id: "machine-learning", name: "Machine Learning (Scikit-Learn)", category: "ai-data", description: "Supervised and unsupervised learning, regression, classification, and ensemble trees", popular: true, iconName: "BrainCircuit", color: "#f7931e", relatedGoals: ["ML/AI Engineer", "Data Scientist"] },
  { id: "deep-learning", name: "Deep Learning (PyTorch / TF)", category: "ai-data", description: "Artificial neural networks, backpropagation, CNNs, RNNs, and GPU training acceleration", popular: true, iconName: "Cpu", color: "#ee4c2c", relatedGoals: ["ML/AI Engineer"] },
  { id: "nlp", name: "Natural Language Processing (NLP)", category: "ai-data", description: "Tokenization, text classification, embeddings, Transformer models, and semantic search", popular: true, iconName: "MessageSquare", color: "#7c3aed", relatedGoals: ["ML/AI Engineer", "Data Scientist"] },
  { id: "generative-ai", name: "Generative AI & LLMs", category: "ai-data", description: "Prompt engineering, RAG pipelines, LangChain/LlamaIndex, fine-tuning, and AI agents", popular: true, iconName: "Sparkles", color: "#10b981", relatedGoals: ["ML/AI Engineer", "Software Developer"] },
  { id: "power-bi", name: "Power BI", category: "ai-data", description: "Microsoft's business analytics tool for dynamic dashboards and DAX data modeling", popular: false, iconName: "BarChart3", color: "#f2c811", relatedGoals: ["Data Analyst"] },
  { id: "tableau", name: "Tableau", category: "ai-data", description: "Interactive data visualization software transforming complex data into executive dashboards", popular: false, iconName: "PieChart", color: "#e97627", relatedGoals: ["Data Analyst"] },

  // DevOps & Cloud
  { id: "git", name: "Git & GitHub", category: "devops", description: "Distributed version control, branching strategies, code reviews, and GitOps workflows", popular: true, iconName: "GitBranch", color: "#f05032", relatedGoals: ["Software Developer", "DevOps/Cloud Engineer", "Full-Stack Developer"] },
  { id: "docker", name: "Docker", category: "devops", description: "Container virtualization packaging code and dependencies for consistent environments", popular: true, iconName: "Box", color: "#2496ed", relatedGoals: ["DevOps/Cloud Engineer", "Backend Developer", "Software Developer"] },
  { id: "kubernetes", name: "Kubernetes (K8s)", category: "devops", description: "Automated container orchestration, autoscaling, ingress control, and service meshes", popular: true, iconName: "Ship", color: "#326ce5", relatedGoals: ["DevOps/Cloud Engineer"] },
  { id: "linux", name: "Linux Administration", category: "devops", description: "Permissions, systemd, networking, process management, and POSIX server operations", popular: true, iconName: "Terminal", color: "#fcc624", relatedGoals: ["DevOps/Cloud Engineer", "Cybersecurity Analyst", "Backend Developer"] },
  { id: "aws", name: "AWS (Amazon Web Services)", category: "devops", description: "Cloud computing infrastructure: EC2, S3, Lambda, IAM, VPC, and ECS architectures", popular: true, iconName: "Cloud", color: "#ff9900", relatedGoals: ["DevOps/Cloud Engineer", "Backend Developer"] },
  { id: "azure", name: "Microsoft Azure", category: "devops", description: "Enterprise cloud services, Azure App Services, Entra ID, and cloud DevOps solutions", popular: false, iconName: "CloudSun", color: "#0078d4", relatedGoals: ["DevOps/Cloud Engineer"] },
  { id: "gcp", name: "Google Cloud (GCP)", category: "devops", description: "Google infrastructure, BigQuery analytics, Cloud Run, and Vertex AI systems", popular: false, iconName: "CloudRain", color: "#4285f4", relatedGoals: ["DevOps/Cloud Engineer", "Data Scientist"] },
  { id: "cicd", name: "CI/CD Pipelines", category: "devops", description: "Continuous integration & continuous delivery with GitHub Actions, GitLab, and Jenkins", popular: true, iconName: "Repeat", color: "#2088ff", relatedGoals: ["DevOps/Cloud Engineer", "Software Developer"] },
  { id: "terraform", name: "Terraform (IaC)", category: "devops", description: "Declarative infrastructure-as-code for provisioning multi-cloud resources reproducibly", popular: true, iconName: "FileSpreadsheet", color: "#844fba", relatedGoals: ["DevOps/Cloud Engineer"] },

  // Core Computer Science
  { id: "dsa", name: "Data Structures & Algorithms", category: "core-cs", description: "Arrays, trees, graphs, dynamic programming, sorting, and asymptotic Big-O complexity", popular: true, iconName: "Binary", color: "#ec4899", relatedGoals: ["Placement/Interview Prep", "Software Developer"] },
  { id: "system-design", name: "System Design", category: "core-cs", description: "Designing high-scale, distributed, resilient architectures, caching, and sharding", popular: true, iconName: "Network", color: "#8b5cf6", relatedGoals: ["Software Developer", "Backend Developer", "Placement/Interview Prep"] },
  { id: "operating-systems", name: "Operating Systems", category: "core-cs", description: "Concurrency, scheduling, memory paging, deadlocks, and kernel/user space mechanics", popular: false, iconName: "Cpu", color: "#64748b", relatedGoals: ["Software Developer", "Placement/Interview Prep"] },
  { id: "computer-networks", name: "Computer Networks", category: "core-cs", description: "OSI model, TCP/IP, UDP, DNS, TLS/SSL, HTTP/2, HTTP/3, and socket programming", popular: false, iconName: "Wifi", color: "#0ea5e9", relatedGoals: ["Software Developer", "Cybersecurity Analyst", "DevOps/Cloud Engineer"] },
  { id: "dbms", name: "Database Management Systems (DBMS)", category: "core-cs", description: "ACID properties, indexing strategies (B-Trees), transaction isolation, and normalization", popular: false, iconName: "HardDrive", color: "#14b8a6", relatedGoals: ["Software Developer", "Backend Developer"] },
  { id: "oop", name: "Object-Oriented Programming (OOP)", category: "core-cs", description: "Encapsulation, inheritance, polymorphism, abstraction, and SOLID design principles", popular: true, iconName: "Boxes", color: "#f59e0b", relatedGoals: ["Software Developer", "Placement/Interview Prep"] },

  // Security and Other
  { id: "cybersecurity", name: "Cybersecurity Basics", category: "security-other", description: "Threat vectors, cryptography, identity governance, and OWASP Top 10 vulnerabilities", popular: true, iconName: "Shield", color: "#ef4444", relatedGoals: ["Cybersecurity Analyst", "Software Developer"] },
  { id: "ethical-hacking", name: "Ethical Hacking & Pen Testing", category: "security-other", description: "Reconnaissance, network scanning, vulnerability assessment, and defensive remediation", popular: false, iconName: "Lock", color: "#b91c1c", relatedGoals: ["Cybersecurity Analyst"] },
  { id: "blockchain", name: "Blockchain Fundamentals", category: "security-other", description: "Distributed ledgers, consensus algorithms (PoW/PoS), cryptographic hashing, and Web3", popular: false, iconName: "Coins", color: "#eab308", relatedGoals: ["Software Developer"] },
  { id: "game-dev", name: "Game Dev (Unity / Unreal)", category: "security-other", description: "Game loops, physics engines, shaders, 3D asset pipelines, and player mechanics", popular: false, iconName: "Gamepad2", color: "#6366f1", relatedGoals: ["Game Developer"] },
  { id: "embedded-iot", name: "Embedded Systems & IoT", category: "security-other", description: "Microcontrollers (Arduino/ESP32), sensors, real-time operating systems, and MQTT", popular: false, iconName: "Radio", color: "#10b981", relatedGoals: ["Software Developer"] },
  { id: "software-testing", name: "Software Testing & QA", category: "security-other", description: "Unit testing, integration testing, E2E testing (Playwright/Cypress), and TDD/BDD", popular: true, iconName: "CheckCircle2", color: "#06b6d4", relatedGoals: ["QA Engineer", "Software Developer"] },
];
