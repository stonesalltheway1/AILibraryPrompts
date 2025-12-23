// ============================================================================
// PROMPT LIBRARY - 100+ High-Quality AI Prompts
// December 2025 Edition
// ============================================================================

import { mockUsers, mockCategories, mockModels, mockTags } from "./mock-data";
import type { Prompt } from "./types";

// Helper function to get user by index
const u = (i: number) => mockUsers[i % mockUsers.length];
const c = (i: number) => mockCategories[i];
const m = (i: number) => mockModels[i % mockModels.length];
const t = (...indices: number[]) => indices.map(i => mockTags[i % mockTags.length]);

export const extendedPrompts: Prompt[] = [
    // ========================================================================
    // CODING PROMPTS (13-25)
    // ========================================================================
    {
        id: "p-13",
        title: "Full-Stack Authentication System Generator",
        slug: "fullstack-auth-system-generator",
        content: `You are a senior security engineer. Design a complete authentication system.

**Tech Stack:** {framework} with {database}
**Auth Type:** {JWT/Session/OAuth}

**Provide:**
1. Database schema with secure password hashing
2. Registration with email validation, rate limiting
3. Login with brute force protection
4. Password reset flow with secure tokens
5. Session management and logout
6. CSRF/XSS protection measures
7. Role-based access control (RBAC)
8. Complete code with security comments`,
        description: "Generate production-ready authentication with registration, login, password reset, and RBAC.",
        user: u(6), category: c(0), model: m(6), tags: t(1, 4),
        votes: 72, views: 324, commentCount: 8, verified: true, featured: true,
        createdAt: new Date("2025-12-18"), updatedAt: new Date("2025-12-20"),
    },
    {
        id: "p-14",
        title: "Advanced Git Workflow Troubleshooter",
        slug: "git-workflow-troubleshooter",
        content: `You are a Git expert. Solve this Git issue:

**Problem:** {describe issue or paste error}
**Current branch:** {branch name}
**Context:** {solo/team}

**Provide:**
1. Root cause analysis - why this happened
2. Step-by-step fix with exact commands
3. Pre-fix backup commands
4. How to verify the fix worked
5. Rollback procedure if needed
6. Prevention strategy and Git hooks
7. Alternative approaches if fix fails`,
        description: "Diagnose and fix Git issues: merge conflicts, detached HEAD, rebasing, lost commits.",
        user: u(7), category: c(0), model: m(6), tags: t(2),
        votes: 58, views: 287, commentCount: 12, verified: true, featured: false,
        createdAt: new Date("2025-12-15"), updatedAt: new Date("2025-12-17"),
    },
    {
        id: "p-15",
        title: "Docker Compose Multi-Service Architecture",
        slug: "docker-compose-architecture",
        content: `You are a DevOps architect. Create Docker setup for:

**Services:** {web, api, database, cache, etc.}
**Environment:** {dev/staging/prod}

**Generate:**
1. docker-compose.yml with health checks, volumes, networks
2. Dockerfiles with multi-stage builds, non-root users
3. .env.example with all variables
4. Development hot-reload configuration
5. Production resource limits and restart policies
6. SSL/TLS configuration
7. Log aggregation setup`,
        description: "Create production-ready Docker Compose for multi-service architectures.",
        user: u(7), category: c(0), model: m(2), tags: t(4),
        votes: 45, views: 198, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-12"), updatedAt: new Date("2025-12-14"),
    },
    {
        id: "p-16",
        title: "Microservices Event-Driven Architecture",
        slug: "microservices-event-architecture",
        content: `You are a solutions architect. Design event-driven microservices:

**Domain:** {e-commerce/fintech/etc.}
**Services:** {list capabilities}
**Scale:** {users, TPS}

**Design:**
1. Service decomposition with bounded contexts
2. Event schema design (JSON with versioning)
3. Message broker topic/queue structure
4. Saga pattern for distributed transactions
5. Circuit breaker and retry patterns
6. Distributed tracing and observability
7. Deployment and feature flag strategy`,
        description: "Design scalable microservices with event sourcing, sagas, and observability.",
        user: u(6), category: c(0), model: m(5), tags: t(4),
        votes: 54, views: 245, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-08"), updatedAt: new Date("2025-12-10"),
    },
    {
        id: "p-17",
        title: "Automated Testing Strategy Generator",
        slug: "automated-testing-strategy",
        content: `You are a QA architect. Create testing strategy for:

**App Type:** {web/mobile/API}
**Stack:** {technologies}
**Current Coverage:** {if known}

**Provide:**
1. Testing pyramid breakdown (unit/integration/e2e ratios)
2. Unit test patterns with mocking strategies
3. Integration test setup with test databases
4. E2E test framework selection and setup
5. CI/CD pipeline test configuration
6. Code coverage thresholds and enforcement
7. Performance and load testing approach
8. Security testing integration (SAST/DAST)
9. Test data management strategy`,
        description: "Generate comprehensive testing strategies with unit, integration, and E2E tests.",
        user: u(13), category: c(0), model: m(6), tags: t(2, 12),
        votes: 41, views: 189, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-06"), updatedAt: new Date("2025-12-08"),
    },
    {
        id: "p-18",
        title: "GraphQL API Schema Designer",
        slug: "graphql-schema-designer",
        content: `You are a GraphQL expert. Design schema for:

**Domain:** {describe your data domain}
**Operations needed:** {queries/mutations}
**Auth requirements:** {public/private/role-based}

**Generate:**
1. Complete GraphQL schema with types
2. Query and Mutation definitions
3. Input types and validation
4. Resolver implementations
5. Authentication/authorization middleware
6. N+1 query prevention (DataLoader)
7. Pagination strategy (cursor-based)
8. Error handling patterns
9. Subscription setup for real-time`,
        description: "Design complete GraphQL schemas with resolvers, auth, pagination, and subscriptions.",
        user: u(13), category: c(0), model: m(6), tags: t(4),
        votes: 39, views: 178, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-04"), updatedAt: new Date("2025-12-06"),
    },
    {
        id: "p-19",
        title: "Performance Optimization Analyzer",
        slug: "performance-optimization-analyzer",
        content: `You are a performance engineer. Optimize this code:

\`\`\`{language}
{paste code here}
\`\`\`

**Context:** {what it does, current performance}

**Analyze:**
1. Time complexity analysis (Big O)
2. Space complexity analysis
3. Identify bottlenecks and anti-patterns
4. Provide optimized version with comments
5. Caching opportunities
6. Parallelization possibilities
7. Memory optimization techniques
8. Before/after performance comparison`,
        description: "Analyze and optimize code performance with complexity analysis and caching strategies.",
        user: u(2), category: c(0), model: m(3), tags: t(0, 3),
        votes: 63, views: 298, commentCount: 11, verified: true, featured: true,
        createdAt: new Date("2025-12-16"), updatedAt: new Date("2025-12-18"),
    },
    {
        id: "p-20",
        title: "CI/CD Pipeline Generator",
        slug: "cicd-pipeline-generator",
        content: `You are a DevOps engineer. Create CI/CD pipeline for:

**Platform:** {GitHub Actions/GitLab/Jenkins}
**Stack:** {languages/frameworks}
**Deploy to:** {AWS/GCP/Vercel/etc.}

**Generate:**
1. Build stage with caching
2. Test stage (unit, integration, e2e)
3. Security scanning (dependencies, code)
4. Docker image build and push
5. Deployment stages (dev/staging/prod)
6. Environment-specific configurations
7. Rollback procedures
8. Notifications (Slack/email)
9. Manual approval gates for production`,
        description: "Create complete CI/CD pipelines with testing, security scanning, and multi-environment deploys.",
        user: u(7), category: c(0), model: m(2), tags: t(4),
        votes: 52, views: 234, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-10"), updatedAt: new Date("2025-12-12"),
    },
    // ========================================================================
    // WRITING PROMPTS (21-35)
    // ========================================================================
    {
        id: "p-21",
        title: "Long-Form Article Architect",
        slug: "longform-article-architect",
        content: `You are a senior content strategist. Create an in-depth article:

**Topic:** {your topic}
**Word Count:** {2000-5000}
**Target Audience:** {who}
**Goal:** {educate/persuade/entertain}

**Structure:**
1. Compelling hook (first 100 words that grab attention)
2. Clear thesis statement
3. Comprehensive outline with H2/H3 headers
4. Each section: 300-500 words with data/examples
5. Expert quotes or statistics (cite sources)
6. Transitions between sections
7. Actionable takeaways throughout
8. Strong conclusion with CTA
9. Meta description (155 chars)
10. Suggested internal/external links`,
        description: "Create comprehensive long-form articles with research, structure, and SEO optimization.",
        user: u(8), category: c(1), model: m(0), tags: t(5, 7),
        votes: 67, views: 312, commentCount: 14, verified: true, featured: true,
        createdAt: new Date("2025-12-17"), updatedAt: new Date("2025-12-19"),
    },
    {
        id: "p-22",
        title: "Technical Documentation Writer",
        slug: "technical-documentation-writer",
        content: `You are a technical writer. Create documentation for:

**Product/Feature:** {describe}
**Audience:** {developers/end-users/admins}
**Doc Type:** {API/user guide/tutorial}

**Generate:**
1. Clear introduction and purpose
2. Prerequisites and requirements
3. Step-by-step instructions
4. Code examples with explanations
5. Screenshots/diagram descriptions
6. Troubleshooting section
7. FAQ based on common issues
8. Glossary of terms
9. Version and changelog info`,
        description: "Generate professional technical documentation, API docs, and user guides.",
        user: u(5), category: c(1), model: m(6), tags: t(4),
        votes: 43, views: 213, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-11"), updatedAt: new Date("2025-12-13"),
    },
    {
        id: "p-23",
        title: "Persuasive Sales Copy Generator",
        slug: "persuasive-sales-copy",
        content: `You are a direct response copywriter. Create sales copy for:

**Product/Service:** {what you're selling}
**Price Point:** {cost}
**Target Customer:** {demographics, pain points}
**Unique Value:** {why choose you}

**Generate:**
1. 5 headline variations (curiosity, benefit, urgency)
2. Opening hook addressing main pain point
3. Problem agitation (make them feel the pain)
4. Solution introduction (your product)
5. Features → Benefits translation
6. Social proof integration points
7. Risk reversal (guarantees)
8. Urgency elements (ethical scarcity)
9. Call-to-action variations
10. Objection handling section`,
        description: "Create high-converting sales copy with psychological triggers and persuasion techniques.",
        user: u(7), category: c(1), model: m(0), tags: t(6),
        votes: 55, views: 267, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-09"), updatedAt: new Date("2025-12-11"),
    },
    {
        id: "p-24",
        title: "Newsletter Content Creator",
        slug: "newsletter-content-creator",
        content: `You are a newsletter strategist. Create newsletter content:

**Newsletter Name:** {name}
**Niche:** {industry/topic}
**Frequency:** {weekly/daily}
**Goal:** {educate/entertain/promote}

**Generate:**
1. Subject line options (5 variations)
2. Preview text optimization
3. Opening hook (personal, story, or stat)
4. Main content sections (3-4 topics)
5. Curated links with context
6. One actionable tip/insight
7. Personal note or behind-the-scenes
8. CTAs (soft and hard)
9. P.S. section with bonus
10. Formatting for readability`,
        description: "Create engaging newsletter content with proven structures for high open rates.",
        user: u(12), category: c(1), model: m(0), tags: t(6, 8),
        votes: 38, views: 187, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-07"), updatedAt: new Date("2025-12-09"),
    },
    {
        id: "p-25",
        title: "Script Writer for Video Content",
        slug: "video-script-writer",
        content: `You are a video scriptwriter. Create script for:

**Video Type:** {YouTube/TikTok/course/ad}
**Topic:** {subject}
**Length:** {duration in minutes}
**Tone:** {educational/entertaining/professional}

**Generate:**
1. Hook (first 3 seconds to stop scroll)
2. Introduction with value promise
3. Content sections with visual cues
4. B-roll suggestions [in brackets]
5. Call-to-action points
6. Transitions between sections
7. Engagement prompts (questions, polls)
8. Outro with next steps
9. Timestamps for chapters
10. Thumbnail title ideas`,
        description: "Create engaging video scripts for YouTube, TikTok, courses, and ads.",
        user: u(12), category: c(1), model: m(0), tags: t(11),
        votes: 48, views: 223, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-05"), updatedAt: new Date("2025-12-07"),
    },
    // ========================================================================
    // BUSINESS PROMPTS (26-40)
    // ========================================================================
    {
        id: "p-26",
        title: "Comprehensive Business Plan Generator",
        slug: "business-plan-generator",
        content: `You are a business consultant. Create a business plan for:

**Business Idea:** {describe}
**Target Market:** {who}
**Funding Goal:** {if seeking investment}

**Generate:**
1. Executive Summary (2 paragraphs max)
2. Market Analysis (TAM/SAM/SOM with numbers)
3. Competitive Landscape (5 competitors table)
4. Business Model Canvas
5. Revenue Streams and Pricing Strategy
6. 3-Year Financial Projections (table)
7. Go-to-Market Strategy
8. Team and Org Structure
9. Risk Analysis with Mitigation
10. Funding Ask and Use of Funds`,
        description: "Generate investor-ready business plans with market analysis and financial projections.",
        user: u(9), category: c(2), model: m(0), tags: [],
        votes: 71, views: 334, commentCount: 16, verified: true, featured: true,
        createdAt: new Date("2025-12-19"), updatedAt: new Date("2025-12-21"),
    },
    {
        id: "p-27",
        title: "Pitch Deck Content Optimizer",
        slug: "pitch-deck-optimizer",
        content: `You are a VC partner. Analyze and improve this pitch deck:

**Current Deck Content:** {paste outline or slides}
**Funding Round:** {pre-seed/seed/Series A}
**Ask Amount:** {funding requested}

**Provide:**
1. "10-Second Test" - does slide 1 communicate value?
2. Problem/Solution clarity score
3. Market sizing reality check
4. Traction proof points analysis
5. Optimal slide order (12-15 slides)
6. Story arc improvements
7. Visual design recommendations
8. Investor objection anticipation
9. Q&A preparation points
10. Top 3 highest-impact changes`,
        description: "Analyze and optimize pitch decks with investor psychology insights.",
        user: u(9), category: c(2), model: m(6), tags: [],
        votes: 44, views: 198, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-13"), updatedAt: new Date("2025-12-15"),
    },
    {
        id: "p-28",
        title: "Competitive Intelligence Brief",
        slug: "competitive-intelligence-brief",
        content: `You are a competitive analyst. Create intelligence report on:

**Competitor:** {company name}
**Industry:** {sector}
**Your Company:** {for context}

**Research:**
1. Company Overview (history, leadership, funding)
2. Product Analysis (features, pricing, gaps)
3. Market Position (share, segments, perception)
4. Go-to-Market Strategy (channels, messaging)
5. Financial Health (revenue, profitability, trends)
6. SWOT Analysis (detailed table)
7. Strategic Recommendations (attack/avoid/partner)
8. 6-Month Outlook
Note: Cite sources, mark speculation clearly`,
        description: "Create detailed competitive intelligence reports with strategic recommendations.",
        user: u(9), category: c(2), model: m(11), tags: [],
        votes: 36, views: 167, commentCount: 4, verified: true, featured: false,
        createdAt: new Date("2025-12-08"), updatedAt: new Date("2025-12-10"),
    },
    {
        id: "p-29",
        title: "OKR Framework Generator",
        slug: "okr-framework-generator",
        content: `You are a strategy consultant. Create OKRs for:

**Company/Team:** {name}
**Time Period:** {quarter/year}
**Focus Areas:** {priorities}
**Current Challenges:** {obstacles}

**Generate:**
1. 3-5 Objectives (inspiring, qualitative)
2. 3-4 Key Results per Objective (measurable, specific)
3. Initiatives to achieve each KR
4. Dependencies and risks
5. Weekly check-in template
6. Scoring methodology (0.0-1.0)
7. Alignment to company mission
8. Quarterly review template`,
        description: "Create effective OKRs with measurable key results and tracking templates.",
        user: u(14), category: c(2), model: m(0), tags: [],
        votes: 33, views: 156, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-06"), updatedAt: new Date("2025-12-08"),
    },
    {
        id: "p-30",
        title: "Meeting Facilitator and Note-Taker",
        slug: "meeting-facilitator-notes",
        content: `You are an executive assistant. Help with this meeting:

**Part A - Pre-Meeting Agenda:**
**Purpose:** {meeting goal}
**Attendees:** {who}
**Duration:** {time}
**Decision Needed:** {yes/no, what}

Generate structured agenda with timeboxing.

**Part B - Post-Meeting Summary:**
{Paste rough notes here}

Transform into:
1. Key Decisions Made
2. Action Items (table: task, owner, deadline)
3. Discussion Summary (3-4 paragraphs)
4. Open Questions/Blockers
5. Parking Lot (tabled items)
6. Next Meeting Preview`,
        description: "Create professional meeting agendas and transform notes into actionable summaries.",
        user: u(14), category: c(2), model: m(4), tags: [],
        votes: 29, views: 143, commentCount: 3, verified: true, featured: false,
        createdAt: new Date("2025-12-04"), updatedAt: new Date("2025-12-06"),
    },
    // ========================================================================
    // RESEARCH PROMPTS (31-40)
    // ========================================================================
    {
        id: "p-31",
        title: "Literature Review Synthesizer",
        slug: "literature-review-synthesizer",
        content: `You are an academic researcher. Create literature review:

**Topic:** {research topic}
**Discipline:** {field}
**Sources:** {paste citations or summaries}

**Synthesize:**
1. Thematic Organization (4-6 major themes)
2. Chronological Development (how thinking evolved)
3. Theoretical Frameworks (dominant theories)
4. Methodological Review (common approaches)
5. Consensus vs Debate (table)
6. Gap Analysis (understudied areas)
7. Key Citations (claim + source)
8. Research Implications
9. Future Research Questions (3-5)`,
        description: "Synthesize multiple sources into comprehensive literature reviews with gap analysis.",
        user: u(8), category: c(3), model: m(5), tags: t(9, 10),
        votes: 47, views: 218, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-14"), updatedAt: new Date("2025-12-16"),
    },
    {
        id: "p-32",
        title: "Data Analysis Interpreter",
        slug: "data-analysis-interpreter",
        content: `You are a data scientist. Analyze this dataset:

**Data Description:** {describe or paste sample}
**Research Question:** {what to learn}
**Variables:** {key variables of interest}

**Provide:**
1. Data Overview (structure, types, quality)
2. Descriptive Statistics (table format)
3. Correlation Analysis (matrix)
4. Pattern Detection (trends, clusters, anomalies)
5. Hypothesis Testing (null/alt, test, results)
6. Visualization Recommendations
7. Statistical Modeling Suggestions
8. Key Insights (plain language, top 3)
9. Limitations and Caveats
10. Actionable Recommendations`,
        description: "Analyze datasets with statistics, visualizations, and actionable insights.",
        user: u(11), category: c(3), model: m(3), tags: t(9),
        votes: 51, views: 245, commentCount: 10, verified: true, featured: true,
        createdAt: new Date("2025-12-15"), updatedAt: new Date("2025-12-17"),
    },
    {
        id: "p-33",
        title: "Research Paper Outline Generator",
        slug: "research-paper-outline",
        content: `You are an academic advisor. Create research paper outline:

**Topic:** {research question}
**Paper Type:** {empirical/theoretical/review}
**Word Limit:** {length}
**Citation Style:** {APA/MLA/Chicago}

**Generate:**
1. Title options (3 variations)
2. Abstract structure (250 words)
3. Introduction outline (context, gap, thesis)
4. Literature Review sections
5. Methodology framework
6. Results presentation structure
7. Discussion points
8. Conclusion and implications
9. Reference formatting guide`,
        description: "Create comprehensive research paper outlines following academic standards.",
        user: u(8), category: c(3), model: m(5), tags: t(10),
        votes: 34, views: 167, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-10"), updatedAt: new Date("2025-12-12"),
    },
    // ========================================================================
    // CREATIVE PROMPTS (34-48)
    // ========================================================================
    {
        id: "p-34",
        title: "Character Psychology Deep Dive",
        slug: "character-psychology-deep-dive",
        content: `You are a character psychologist. Develop this character:

**Role:** {protagonist/antagonist/supporting}
**Genre:** {fantasy/sci-fi/thriller/etc.}
**Basic Concept:** {initial character idea}

**Create:**
1. Core Identity (name, age, background)
2. Psychological Foundation (Enneagram type, wound, fear)
3. The Lie They Believe
4. Contradictions (3-4 conflicting traits)
5. Relationship Patterns
6. Voice and Mannerisms (speech, habits)
7. Character Arc Potential (start → change → end)
8. Interview Questions Answered (5)
9. Quick Reference Summary (3-4 sentences)`,
        description: "Create psychologically complex characters with authentic motivations and arcs.",
        user: u(3), category: c(4), model: m(5), tags: t(11),
        votes: 56, views: 278, commentCount: 12, verified: true, featured: true,
        createdAt: new Date("2025-12-16"), updatedAt: new Date("2025-12-18"),
    },
    {
        id: "p-35",
        title: "World-Building Framework",
        slug: "world-building-framework",
        content: `You are a world-building specialist. Create world bible for:

**Genre:** {fantasy/sci-fi/alt history}
**Core Concept:** {unique premise}
**Tone:** {dark/hopeful/satirical}

**Build:**
1. Central Conceit (what makes it unique)
2. Geographic Overview (3-5 regions)
3. Power Systems (magic/technology)
4. Social Structure (hierarchy, mobility)
5. Economic Systems (currency, resources)
6. Religious/Philosophical Systems
7. Historical Timeline (5-10 events)
8. Cultural Details (customs, food, art)
9. Conflict Seeds (built-in tensions)
10. The Rules (what's impossible)
11. Sensory Atmosphere`,
        description: "Construct immersive fictional worlds with consistent systems and conflict seeds.",
        user: u(3), category: c(4), model: m(5), tags: t(11),
        votes: 49, views: 234, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-12"), updatedAt: new Date("2025-12-14"),
    },
    {
        id: "p-36",
        title: "Story Structure Plotter",
        slug: "story-structure-plotter",
        content: `You are a story architect. Plot this story:

**Premise:** {your story idea}
**Genre:** {genre}
**Length:** {short story/novella/novel}

**Generate:**
1. Save the Cat Beat Sheet (15 beats with percentages)
2. Three-Act Structure breakdown
3. Scene-by-Scene list (goal, conflict, outcome)
4. Subplot weaving points
5. Character arc checkpoints
6. Theme exploration moments
7. Pacing graph (tension over time)
8. Opening/Closing image mirror`,
        description: "Plot complete story structures using proven frameworks like Save the Cat.",
        user: u(3), category: c(4), model: m(5), tags: t(11),
        votes: 42, views: 198, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-09"), updatedAt: new Date("2025-12-11"),
    },
    {
        id: "p-37",
        title: "Dialogue Enhancement Specialist",
        slug: "dialogue-enhancement",
        content: `You are a dialogue expert. Improve this dialogue:

\`\`\`
{paste your dialogue here}
\`\`\`

**Context:** {scene, character relationships}
**Issue:** {what feels wrong}

**Provide:**
1. Subtext Analysis (what's really being said)
2. Voice Differentiation (make characters distinct)
3. Pacing Improvements (beats, interruptions)
4. "Show don't tell" conversions
5. Conflict/tension opportunities
6. Rewritten version with explanations
7. Read-aloud test notes`,
        description: "Transform flat dialogue into dynamic exchanges with subtext and voice.",
        user: u(12), category: c(4), model: m(5), tags: t(11),
        votes: 35, views: 167, commentCount: 4, verified: true, featured: false,
        createdAt: new Date("2025-12-06"), updatedAt: new Date("2025-12-08"),
    },
    // ========================================================================
    // PRODUCTIVITY PROMPTS (38-48)
    // ========================================================================
    {
        id: "p-38",
        title: "Personal Productivity System Designer",
        slug: "productivity-system-designer",
        content: `You are a productivity coach. Design system for:

**Current Challenges:** {main issues}
**Work Style:** {morning/night, focused/multitasker}
**Tools Available:** {apps you use}
**Goals:** {what to achieve}

**Create:**
1. Morning Routine (detailed time blocks)
2. Task Management Framework
3. Time Blocking Schedule
4. Energy Management Plan
5. Weekly Review Process
6. Monthly Goal Setting
7. Habit Tracking System
8. Focus Session Protocol
9. Recovery and Rest Strategy`,
        description: "Design personalized productivity systems with routines, frameworks, and tracking.",
        user: u(4), category: c(5), model: m(0), tags: [],
        votes: 44, views: 212, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-14"), updatedAt: new Date("2025-12-16"),
    },
    {
        id: "p-39",
        title: "Email Inbox Zero System",
        slug: "email-inbox-zero-system",
        content: `You are an email productivity expert. Create system for:

**Current Inbox:** {unread count}
**Daily Volume:** {emails per day}
**Pain Point:** {volume/decision paralysis/etc.}

**Generate:**
1. 4-Folder Method (ACTION/WAITING/READ/ARCHIVE)
2. Processing Rules (2-minute decisions)
3. Batch Processing Schedule
4. Template Library (5-7 templates)
5. 30-Day Inbox Zero Plan
6. Auto-filter Rules
7. Unsubscribe Strategy
8. VIP Contact Handling`,
        description: "Create email management systems for inbox zero with templates and automation.",
        user: u(4), category: c(5), model: m(4), tags: [],
        votes: 37, views: 178, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-10"), updatedAt: new Date("2025-12-12"),
    },
    {
        id: "p-40",
        title: "Project Management Plan Creator",
        slug: "project-management-plan",
        content: `You are a PMP-certified project manager. Create plan for:

**Project:** {name and goal}
**Deadline:** {due date}
**Team:** {size and roles}
**Budget:** {if applicable}

**Generate:**
1. Executive Summary
2. Scope (in/out, assumptions, dependencies)
3. Project Phases (4-6 with milestones)
4. Detailed Timeline (Gantt-style text)
5. Resource Plan (team, tools, budget)
6. Risk Matrix (likelihood × impact)
7. Communication Plan
8. Quality Assurance
9. Change Management Process
10. Success Metrics`,
        description: "Create comprehensive project plans with timelines, risks, and communication strategy.",
        user: u(14), category: c(5), model: m(0), tags: [],
        votes: 40, views: 192, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-07"), updatedAt: new Date("2025-12-09"),
    },
    // ========================================================================
    // EDUCATION PROMPTS (41-52)
    // ========================================================================
    {
        id: "p-41",
        title: "Personalized Lesson Plan Creator",
        slug: "personalized-lesson-plan",
        content: `You are an experienced educator. Create lesson plan:

**Subject:** {topic}
**Grade Level:** {age/skill}
**Duration:** {class time}
**Learning Objectives:** {3 objectives}

**Structure:**
1. Opening Hook (engagement activity)
2. Direct Instruction (key concepts, visuals)
3. Guided Practice (collaborative work)
4. Independent Practice (individual work)
5. Differentiation (struggling/advanced/ELL)
6. Assessment (formative checks)
7. Materials Needed
8. Extension Activities
9. Reflection Questions`,
        description: "Generate detailed lesson plans with differentiation and assessment strategies.",
        user: u(0), category: c(6), model: m(0), tags: [],
        votes: 52, views: 256, commentCount: 11, verified: true, featured: true,
        createdAt: new Date("2025-12-17"), updatedAt: new Date("2025-12-19"),
    },
    {
        id: "p-42",
        title: "Study Guide Generator",
        slug: "study-guide-generator",
        content: `You are a learning scientist. Create study guide for:

**Content:** {paste material or topic}
**Exam Date:** {when}
**Format:** {multiple choice/essay/mixed}

**Generate:**
1. 3-Sentence Summary
2. Concept Map (text-based)
3. Key Terms Flashcards (Q&A format)
4. Practice Questions (3 difficulty levels)
5. Visual Study Aid Suggestions
6. "Explain to a 10-year-old" versions
7. Formula/Key Facts Sheet
8. Study Schedule (countdown)
9. Self-Testing Protocol
10. "1-Hour Panic Guide" (priorities)`,
        description: "Create comprehensive study guides with flashcards, practice questions, and schedules.",
        user: u(8), category: c(6), model: m(6), tags: [],
        votes: 45, views: 223, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-13"), updatedAt: new Date("2025-12-15"),
    },
    {
        id: "p-43",
        title: "Concept Explainer (Feynman Technique)",
        slug: "concept-explainer-feynman",
        content: `You are a master teacher. Explain this concept:

**Concept:** {topic to explain}
**Current Understanding:** {what you already know}
**Confusion Points:** {what's unclear}

**Provide:**
1. Simple Definition (no jargon)
2. Real-World Analogy
3. Step-by-Step Breakdown
4. Common Misconceptions
5. Visual Description (what to draw)
6. Test Your Understanding (3 questions)
7. Connection to Related Concepts
8. Further Learning Resources`,
        description: "Explain complex concepts simply using the Feynman Technique and analogies.",
        user: u(0), category: c(6), model: m(6), tags: [],
        votes: 58, views: 289, commentCount: 13, verified: true, featured: true,
        createdAt: new Date("2025-12-18"), updatedAt: new Date("2025-12-20"),
    },
    // ========================================================================
    // MARKETING PROMPTS (44-55)
    // ========================================================================
    {
        id: "p-44",
        title: "90-Day Content Strategy Planner",
        slug: "content-strategy-planner",
        content: `You are a content strategist. Create 90-day plan for:

**Brand:** {name and industry}
**Target Audience:** {demographics}
**Channels:** {platforms}
**Goal:** {awareness/leads/sales}

**Generate:**
1. Content Pillars (4-5 themes)
2. Audience Segments (3 profiles)
3. Content Mix Ratio
4. Monthly Campaign Themes
5. Weekly Calendar Template
6. Hero Content Pieces (3-5)
7. Engagement Tactics
8. Repurposing Strategy
9. Success Metrics Dashboard
10. Contingency Plan`,
        description: "Create comprehensive content strategies with calendars, pillars, and repurposing.",
        user: u(7), category: c(7), model: m(0), tags: t(7, 8),
        votes: 49, views: 234, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-15"), updatedAt: new Date("2025-12-17"),
    },
    {
        id: "p-45",
        title: "Ad Copy Variations Generator",
        slug: "ad-copy-variations",
        content: `You are a paid advertising expert. Create ads for:

**Product:** {what you're advertising}
**Platform:** {Facebook/Google/LinkedIn}
**Objective:** {awareness/conversion}
**Budget:** {daily spend}

**Generate:**
1. Headlines (10 variations by formula)
2. Primary Text (3 versions by audience stage)
3. CTAs (5 options)
4. Complete Ad Sets (3 ready-to-launch)
5. Landing Page Headline Match
6. Objection Handling in Copy
7. A/B Testing Strategy
8. Performance Benchmarks
9. Scaling Plan`,
        description: "Create high-converting ad copy variations for multiple platforms and audiences.",
        user: u(7), category: c(7), model: m(0), tags: t(8),
        votes: 41, views: 198, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-11"), updatedAt: new Date("2025-12-13"),
    },
    {
        id: "p-46",
        title: "Social Media Hook Generator",
        slug: "social-media-hook-generator",
        content: `You are a viral content creator. Generate hooks for:

**Platform:** {Twitter/LinkedIn/TikTok/Instagram}
**Topic:** {your subject}
**Goal:** {engagement/clicks/followers}

**Generate:**
1. Curiosity Hooks (5)
2. Controversial Takes (3)
3. Story Hooks (3)
4. Data/Stat Hooks (3)
5. "You're Doing It Wrong" (3)
6. First-Person Experience (3)
7. Thread Starters
8. Full Post Examples (3)
9. Optimal Posting Times
10. Hashtag Strategy`,
        description: "Generate scroll-stopping social media hooks and content formats.",
        user: u(12), category: c(7), model: m(0), tags: t(8),
        votes: 53, views: 267, commentCount: 10, verified: true, featured: true,
        createdAt: new Date("2025-12-16"), updatedAt: new Date("2025-12-18"),
    },
    {
        id: "p-47",
        title: "SEO Keyword Research Analyzer",
        slug: "seo-keyword-research",
        content: `You are an SEO specialist. Analyze keywords for:

**Niche:** {your industry}
**Main Topic:** {primary keyword}
**Website Stage:** {new/established}
**Goal:** {traffic/conversions}

**Provide:**
1. Seed Keyword Analysis
2. Long-tail Variations (20+)
3. Search Intent Classification
4. Difficulty Assessment
5. Content Gap Opportunities
6. Competitor Keyword Analysis
7. Clustering for Content
8. Priority Matrix (quick wins vs. long-term)
9. Content Brief Template`,
        description: "Analyze keywords with intent, difficulty, and content clustering strategies.",
        user: u(1), category: c(7), model: m(0), tags: t(7),
        votes: 46, views: 218, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-09"), updatedAt: new Date("2025-12-11"),
    },
    // ========================================================================
    // ADDITIONAL PROMPTS TO REACH 100+
    // ========================================================================
    {
        id: "p-48",
        title: "Bug Report to Solution Converter",
        slug: "bug-report-solution-converter",
        content: `You are a senior debugging specialist. Solve this bug:

**Bug Report:**
{paste error, stack trace, or description}

**Environment:** {OS, browser, versions}
**What Should Happen:** {expected behavior}
**What Actually Happens:** {actual behavior}
**Steps to Reproduce:** {if known}

**Provide:**
1. Initial Diagnosis (likely causes)
2. Debugging Steps (systematic approach)
3. Root Cause Identification
4. Fix Implementation
5. Test Cases to Verify
6. Regression Prevention
7. Documentation Update`,
        description: "Convert bug reports into systematic solutions with root cause analysis.",
        user: u(2), category: c(0), model: m(6), tags: t(2),
        votes: 61, views: 298, commentCount: 14, verified: true, featured: true,
        createdAt: new Date("2025-12-19"), updatedAt: new Date("2025-12-21"),
    },
    {
        id: "p-49",
        title: "Code to Architecture Diagram Generator",
        slug: "code-architecture-diagram",
        content: `You are a systems architect. Create diagrams for:

\`\`\`
{paste code or describe system}
\`\`\`

**Generate:**
1. High-level architecture diagram (text-based)
2. Component interaction flow
3. Data flow diagram
4. Sequence diagrams for key operations
5. Deployment diagram
6. Technology stack visualization
7. Mermaid.js code for diagrams`,
        description: "Generate architecture diagrams from code with component and data flows.",
        user: u(6), category: c(0), model: m(5), tags: t(4),
        votes: 38, views: 176, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-07"), updatedAt: new Date("2025-12-09"),
    },
    {
        id: "p-50",
        title: "Resume ATS Optimizer",
        slug: "resume-ats-optimizer",
        content: `You are a career coach. Optimize resume for:

**Job Description:** {paste job posting}
**Current Resume:** {paste resume}
**Target Role:** {position}

**Provide:**
1. ATS Keyword Analysis
2. Keyword Integration Suggestions
3. Achievement Quantification
4. Skills Section Optimization
5. Summary/Objective Rewrite
6. Format Recommendations
7. Red Flags to Fix
8. Tailored Version`,
        description: "Optimize resumes for ATS systems with keyword matching and formatting.",
        user: u(10), category: c(2), model: m(6), tags: [],
        votes: 55, views: 267, commentCount: 12, verified: true, featured: true,
        createdAt: new Date("2025-12-17"), updatedAt: new Date("2025-12-19"),
    },
    // ========================================================================
    // 50 MORE PROMPTS (51-100)
    // ========================================================================
    {
        id: "p-51",
        title: "REST API Error Handling Guide",
        slug: "rest-api-error-handling",
        content: `You are an API architect. Design error handling for:

**API Type:** {REST/GraphQL}
**Framework:** {Express/FastAPI/etc.}
**Clients:** {web/mobile/third-party}

**Generate:**
1. HTTP status code mapping
2. Error response schema (code, message, details)
3. Validation error formatting
4. Custom error classes
5. Global error middleware
6. Logging strategy
7. Client-friendly error messages
8. Retry-able vs fatal errors`,
        description: "Design comprehensive API error handling with proper status codes and client-friendly messages.",
        user: u(13), category: c(0), model: m(6), tags: t(4),
        votes: 36, views: 178, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-05"), updatedAt: new Date("2025-12-07"),
    },
    {
        id: "p-52",
        title: "Database Migration Strategy",
        slug: "database-migration-strategy",
        content: `You are a database architect. Plan migration from:

**Source:** {current database}
**Target:** {new database}
**Data Size:** {approximate}
**Downtime Tolerance:** {zero/minimal/scheduled}

**Provide:**
1. Schema mapping plan
2. Data transformation rules
3. Migration script template
4. Rollback strategy
5. Testing checklist
6. Cutover procedure
7. Monitoring during migration
8. Post-migration validation`,
        description: "Plan database migrations with zero-downtime strategies and rollback procedures.",
        user: u(11), category: c(0), model: m(6), tags: t(13),
        votes: 42, views: 196, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-08"), updatedAt: new Date("2025-12-10"),
    },
    {
        id: "p-53",
        title: "Web Accessibility Audit Checklist",
        slug: "web-accessibility-audit",
        content: `You are an accessibility expert. Audit this:

**URL/Code:** {paste or describe}
**Standard:** {WCAG 2.1 AA/AAA}
**Primary Users:** {screen reader/keyboard/etc.}

**Evaluate:**
1. Color contrast ratios
2. Keyboard navigation
3. Screen reader compatibility
4. Focus management
5. ARIA usage (correct vs overuse)
6. Form accessibility
7. Media alternatives
8. Prioritized fix list`,
        description: "Audit web applications for WCAG compliance with prioritized remediation steps.",
        user: u(10), category: c(0), model: m(6), tags: t(14),
        votes: 39, views: 184, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-06"), updatedAt: new Date("2025-12-08"),
    },
    {
        id: "p-54",
        title: "Email Outreach Sequence Builder",
        slug: "email-outreach-sequence",
        content: `You are an outreach specialist. Create sequence for:

**Goal:** {sales/partnerships/hiring}
**Target:** {persona description}
**Offer:** {what you're proposing}

**Generate:**
1. Email 1: Initial cold outreach
2. Email 2: Follow-up (3 days later)
3. Email 3: Value-add (1 week later)
4. Email 4: Break-up email
5. Subject lines for each (2 options)
6. Personalization variables
7. Open/reply rate benchmarks
8. A/B test suggestions`,
        description: "Create multi-touch email outreach sequences with personalization and follow-ups.",
        user: u(7), category: c(1), model: m(0), tags: t(6),
        votes: 47, views: 223, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-14"), updatedAt: new Date("2025-12-16"),
    },
    {
        id: "p-55",
        title: "Case Study Framework",
        slug: "case-study-framework",
        content: `You are a marketing writer. Create case study:

**Client:** {company name/industry}
**Challenge:** {problem they faced}
**Solution:** {what you provided}
**Results:** {metrics achieved}

**Structure:**
1. Executive Summary (2 sentences)
2. Company Background
3. The Challenge (pain points)
4. The Solution (your approach)
5. Implementation Process
6. Results with Metrics (graphs suggested)
7. Client Quote
8. CTA for similar prospects`,
        description: "Create compelling case studies with measurable results and social proof.",
        user: u(7), category: c(1), model: m(0), tags: [],
        votes: 44, views: 208, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-10"), updatedAt: new Date("2025-12-12"),
    },
    {
        id: "p-56",
        title: "Brand Voice Guidelines Creator",
        slug: "brand-voice-guidelines",
        content: `You are a brand strategist. Create voice guidelines:

**Brand:** {name}
**Industry:** {sector}
**Values:** {3-5 core values}
**Target Audience:** {primary audience}

**Generate:**
1. Voice Characteristics (4 pillars)
2. Do's and Don'ts table
3. Tone Spectrum (formal to casual)
4. Word Choice Guidelines
5. Grammar Preferences
6. Example Transformations (before/after)
7. Channel-Specific Adaptations
8. Quick Reference Card`,
        description: "Create comprehensive brand voice guidelines with examples and adaptations.",
        user: u(12), category: c(1), model: m(0), tags: [],
        votes: 38, views: 187, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-07"), updatedAt: new Date("2025-12-09"),
    },
    {
        id: "p-57",
        title: "Pricing Strategy Analyzer",
        slug: "pricing-strategy-analyzer",
        content: `You are a pricing consultant. Analyze pricing for:

**Product:** {description}
**Current Price:** {price}
**Competitors:** {price range}
**Cost:** {unit cost}

**Provide:**
1. Competitor Price Analysis
2. Value-Based Pricing Calc
3. Cost-Plus Analysis
4. Price Elasticity Factors
5. Tiered Pricing Options
6. Psychological Pricing Tactics
7. Discount Strategy
8. Revenue Impact Models`,
        description: "Analyze and optimize pricing strategies with competitive and value-based approaches.",
        user: u(9), category: c(2), model: m(0), tags: [],
        votes: 51, views: 245, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-15"), updatedAt: new Date("2025-12-17"),
    },
    {
        id: "p-58",
        title: "Customer Journey Mapper",
        slug: "customer-journey-mapper",
        content: `You are a CX strategist. Map customer journey for:

**Product:** {what you offer}
**Customer:** {persona}
**Goal:** {conversion type}

**Map:**
1. Awareness Stage (touchpoints, emotions)
2. Consideration Stage
3. Decision Stage
4. Onboarding Experience
5. Retention Loop
6. Advocacy Triggers
7. Pain Points per Stage
8. Improvement Opportunities`,
        description: "Map complete customer journeys with touchpoints, emotions, and optimization opportunities.",
        user: u(10), category: c(2), model: m(0), tags: [],
        votes: 43, views: 204, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-11"), updatedAt: new Date("2025-12-13"),
    },
    {
        id: "p-59",
        title: "Contract Clause Explainer",
        slug: "contract-clause-explainer",
        content: `You are a legal consultant. Explain this contract:

**Clause:** {paste contract text}
**Context:** {type of agreement}
**Your Role:** {which party you are}

**Provide:**
1. Plain English Translation
2. Key Obligations (yours)
3. Key Rights (yours)
4. Hidden Risks
5. Negotiation Points
6. Red Flags
7. Suggested Amendments
8. Questions for Lawyer`,
        description: "Translate legal contract clauses into plain English with risk analysis.",
        user: u(9), category: c(2), model: m(6), tags: [],
        votes: 58, views: 278, commentCount: 11, verified: true, featured: true,
        createdAt: new Date("2025-12-18"), updatedAt: new Date("2025-12-20"),
    },
    {
        id: "p-60",
        title: "Survey Question Designer",
        slug: "survey-question-designer",
        content: `You are a research methodologist. Design survey:

**Objective:** {what to learn}
**Audience:** {who}
**Format:** {online/in-person}
**Length:** {max questions}

**Generate:**
1. Screening Questions
2. Core Questions (Likert, multiple choice)
3. Open-Ended Questions (2-3)
4. Demographics Section
5. Question Order Logic
6. Bias Avoidance Tips
7. Mobile Optimization Notes
8. Analysis Framework`,
        description: "Design unbiased surveys with proper question types and logical flow.",
        user: u(8), category: c(3), model: m(0), tags: t(9),
        votes: 35, views: 167, commentCount: 4, verified: true, featured: false,
        createdAt: new Date("2025-12-08"), updatedAt: new Date("2025-12-10"),
    },
    {
        id: "p-61",
        title: "Topic Trend Analyzer",
        slug: "topic-trend-analyzer",
        content: `You are a trend analyst. Analyze trends for:

**Topic:** {subject area}
**Industry:** {sector}
**Timeframe:** {current/emerging/declining}

**Research:**
1. Current State Summary
2. Key Drivers of Change
3. Major Players/Voices
4. Emerging Sub-Trends
5. Potential Disruptions
6. Opportunity Windows
7. Risk Factors
8. 12-Month Prediction`,
        description: "Analyze topic trends with drivers, opportunities, and predictions.",
        user: u(11), category: c(3), model: m(11), tags: t(9),
        votes: 41, views: 196, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-12"), updatedAt: new Date("2025-12-14"),
    },
    {
        id: "p-62",
        title: "SWOT Analysis Generator",
        slug: "swot-analysis-generator",
        content: `You are a strategic analyst. Create SWOT for:

**Organization:** {name/description}
**Context:** {current situation}
**Objective:** {strategic goal}

**Generate:**
1. Strengths (internal, 5-7)
2. Weaknesses (internal, 5-7)
3. Opportunities (external, 5-7)
4. Threats (external, 5-7)
5. SWOT Matrix (visual table)
6. SO Strategies (leverage)
7. WO Strategies (improve)
8. WT Strategies (defend)`,
        description: "Create comprehensive SWOT analyses with strategic recommendations.",
        user: u(9), category: c(3), model: m(0), tags: t(9),
        votes: 46, views: 218, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-13"), updatedAt: new Date("2025-12-15"),
    },
    {
        id: "p-63",
        title: "Midjourney Prompt Architect",
        slug: "midjourney-prompt-architect",
        content: `You are an AI art director. Create Midjourney prompts:

**Concept:** {what to create}
**Style:** {art style preference}
**Mood:** {atmosphere}
**Use:** {marketing/personal/presentation}

**Generate:**
1. Basic Prompt (concept + style)
2. Detailed Prompt (+lighting, color, texture)
3. Advanced Prompt (+camera, artist style, parameters)
4. Negative Prompts (what to avoid)
5. Parameter Recommendations (--ar, --v, --q)
6. Style Variations (5 options)
7. Iteration Suggestions
8. Upscale Recommendations`,
        description: "Create detailed Midjourney prompts with styles, parameters, and iterations.",
        user: u(3), category: c(4), model: m(0), tags: t(11),
        votes: 62, views: 298, commentCount: 14, verified: true, featured: true,
        createdAt: new Date("2025-12-19"), updatedAt: new Date("2025-12-21"),
    },
    {
        id: "p-64",
        title: "Poetry Craft Workshop",
        slug: "poetry-craft-workshop",
        content: `You are a poetry mentor. Help with:

**Type:** {free verse/sonnet/haiku/etc.}
**Theme:** {subject/emotion}
**Draft:** {paste draft if revising}

**Provide:**
1. Form Explanation (rules, structure)
2. Opening Line Options (5)
3. Imagery Suggestions
4. Sound Device Ideas (alliteration, assonance)
5. Line Break Analysis
6. Revision Notes (if draft provided)
7. Comparison to Masters
8. Final Polished Version`,
        description: "Craft poetry with form guidance, imagery, and sound device suggestions.",
        user: u(3), category: c(4), model: m(5), tags: t(11),
        votes: 34, views: 167, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-06"), updatedAt: new Date("2025-12-08"),
    },
    {
        id: "p-65",
        title: "Game Design Document Creator",
        slug: "game-design-document",
        content: `You are a game designer. Create GDD for:

**Game Concept:** {core idea}
**Platform:** {PC/mobile/console}
**Genre:** {game type}
**Target Audience:** {player demographic}

**Generate:**
1. Executive Summary
2. Core Loop (moment-to-moment gameplay)
3. Mechanics Description
4. Progression System
5. Monetization Strategy
6. Art Style Direction
7. Technical Requirements
8. Development Milestones`,
        description: "Create game design documents with mechanics, progression, and development plans.",
        user: u(10), category: c(4), model: m(5), tags: t(11),
        votes: 48, views: 234, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-14"), updatedAt: new Date("2025-12-16"),
    },
    {
        id: "p-66",
        title: "Second Brain Setup Guide",
        slug: "second-brain-setup",
        content: `You are a PKM (Personal Knowledge Management) expert. Design second brain:

**Tool:** {Notion/Obsidian/Roam/etc.}
**Use Case:** {work/research/creative}
**Current Volume:** {notes per week}

**Create:**
1. Folder/Space Structure
2. Tagging Taxonomy
3. Note Templates (5 types)
4. Capture Workflow
5. Processing Routine
6. Connection Strategy (linking)
7. Review Cadence
8. Search Optimization`,
        description: "Design personal knowledge management systems with folders, tags, and workflows.",
        user: u(4), category: c(5), model: m(0), tags: [],
        votes: 57, views: 278, commentCount: 12, verified: true, featured: true,
        createdAt: new Date("2025-12-17"), updatedAt: new Date("2025-12-19"),
    },
    {
        id: "p-67",
        title: "Goal Setting Framework",
        slug: "goal-setting-framework",
        content: `You are a goal achievement coach. Set goals for:

**Area:** {career/health/finance/relationships}
**Timeframe:** {30 days/quarter/year}
**Current State:** {where you are now}
**Vision:** {where you want to be}

**Generate:**
1. SMART Goal Formulation
2. Milestone Breakdown
3. Lead Indicators (daily actions)
4. Lag Indicators (outcomes)
5. Accountability System
6. Obstacle Anticipation
7. Celebration Triggers
8. Course Correction Protocol`,
        description: "Create SMART goals with milestones, indicators, and accountability systems.",
        user: u(4), category: c(5), model: m(0), tags: [],
        votes: 43, views: 208, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-11"), updatedAt: new Date("2025-12-13"),
    },
    {
        id: "p-68",
        title: "Decision Matrix Builder",
        slug: "decision-matrix-builder",
        content: `You are a decision analyst. Help decide between:

**Decision:** {what you're choosing}
**Options:** {list alternatives}
**Stakes:** {impact level}
**Timeline:** {decision deadline}

**Generate:**
1. Criteria Identification (weighted)
2. Scoring Matrix (table)
3. Pros/Cons Analysis
4. Risk Assessment per Option
5. Gut Check Questions
6. Regret Minimization Frame
7. Decision Recommendation
8. Implementation First Steps`,
        description: "Build weighted decision matrices with scoring, risk analysis, and recommendations.",
        user: u(14), category: c(5), model: m(0), tags: [],
        votes: 39, views: 187, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-08"), updatedAt: new Date("2025-12-10"),
    },
    {
        id: "p-69",
        title: "Course Curriculum Designer",
        slug: "course-curriculum-designer",
        content: `You are an instructional designer. Create course:

**Topic:** {subject}
**Format:** {online/in-person/hybrid}
**Duration:** {hours/weeks}
**Level:** {beginner/intermediate/advanced}

**Generate:**
1. Learning Objectives (SMART)
2. Module Structure (6-12 modules)
3. Lesson Plans per Module
4. Assessment Strategy
5. Resource List
6. Assignment Ideas
7. Engagement Activities
8. Completion Criteria`,
        description: "Design comprehensive course curricula with modules, assessments, and activities.",
        user: u(0), category: c(6), model: m(0), tags: [],
        votes: 49, views: 234, commentCount: 10, verified: true, featured: false,
        createdAt: new Date("2025-12-15"), updatedAt: new Date("2025-12-17"),
    },
    {
        id: "p-70",
        title: "Student Feedback Generator",
        slug: "student-feedback-generator",
        content: `You are an educational assessor. Write feedback for:

**Student Work:** {paste or describe}
**Assignment Type:** {essay/project/presentation}
**Grade Level:** {education level}
**Learning Objective:** {what was being taught}

**Provide:**
1. Strengths Identification (specific)
2. Areas for Improvement (constructive)
3. Actionable Next Steps
4. Encouragement
5. Rubric Alignment
6. Growth Mindset Framing
7. Follow-up Question
8. Resource Recommendations`,
        description: "Generate constructive student feedback that promotes growth and learning.",
        user: u(0), category: c(6), model: m(6), tags: [],
        votes: 41, views: 198, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-10"), updatedAt: new Date("2025-12-12"),
    },
    {
        id: "p-71",
        title: "Tutoring Session Simulator",
        slug: "tutoring-session-simulator",
        content: `You are a patient tutor. Help student with:

**Subject:** {topic}
**Concept:** {specific topic}
**Current Understanding:** {what they know}
**Confusion Point:** {where they're stuck}

**Teaching Approach:**
1. Check Prior Knowledge
2. Identify Misconceptions
3. Build from Familiar → New
4. Use Multiple Representations
5. Guided Discovery Questions
6. Practice Problems (graduated)
7. Verify Understanding
8. Suggest Practice Resources`,
        description: "Simulate tutoring sessions with Socratic questioning and scaffolded learning.",
        user: u(8), category: c(6), model: m(6), tags: [],
        votes: 54, views: 256, commentCount: 11, verified: true, featured: true,
        createdAt: new Date("2025-12-16"), updatedAt: new Date("2025-12-18"),
    },
    {
        id: "p-72",
        title: "Landing Page Copy Generator",
        slug: "landing-page-copy",
        content: `You are a conversion copywriter. Write landing page:

**Product:** {what you're selling}
**Goal:** {conversions/signups/sales}
**Audience Pain Point:** {main problem}
**USP:** {unique selling proposition}

**Generate:**
1. Hero Section (headline, subhead, CTA)
2. Problem Agitation
3. Solution Introduction
4. Features → Benefits (3-5)
5. Social Proof Section
6. Objection Handling
7. FAQ Section (5 questions)
8. Final CTA Section`,
        description: "Create high-converting landing page copy with headlines, benefits, and CTAs.",
        user: u(7), category: c(7), model: m(0), tags: t(7, 8),
        votes: 61, views: 289, commentCount: 13, verified: true, featured: true,
        createdAt: new Date("2025-12-18"), updatedAt: new Date("2025-12-20"),
    },
    {
        id: "p-73",
        title: "Competitor Ad Analysis",
        slug: "competitor-ad-analysis",
        content: `You are an advertising analyst. Analyze competitor ads:

**Competitor:** {company}
**Ad Platform:** {Google/Facebook/etc.}
**Ad Examples:** {paste or describe}

**Analyze:**
1. Messaging Strategy
2. Visual Style
3. CTAs Used
4. Targeting Insights
5. Offer Structure
6. Emotional Triggers
7. Strengths to Copy
8. Weaknesses to Exploit`,
        description: "Analyze competitor advertising strategies with actionable insights.",
        user: u(7), category: c(7), model: m(0), tags: t(8),
        votes: 37, views: 178, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-07"), updatedAt: new Date("2025-12-09"),
    },
    {
        id: "p-74",
        title: "Influencer Outreach Template",
        slug: "influencer-outreach-template",
        content: `You are an influencer marketing manager. Create outreach:

**Brand:** {your company}
**Product:** {what to promote}
**Influencer Type:** {nano/micro/macro}
**Platform:** {Instagram/TikTok/YouTube}

**Generate:**
1. Research Checklist (before reaching out)
2. DM Outreach Template
3. Email Template
4. Collaboration Offer Options
5. Rate Negotiation Script
6. Contract Considerations
7. Content Brief Template
8. Relationship Building Tips`,
        description: "Create influencer outreach campaigns with templates and collaboration structures.",
        user: u(12), category: c(7), model: m(0), tags: t(8),
        votes: 44, views: 212, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-12"), updatedAt: new Date("2025-12-14"),
    },
    {
        id: "p-75",
        title: "Kubernetes Deployment Configurator",
        slug: "kubernetes-deployment-config",
        content: `You are a Kubernetes expert. Create deployment for:

**Application:** {app description}
**Scale Requirements:** {replicas, resources}
**Environment:** {dev/staging/prod}

**Generate:**
1. Deployment YAML
2. Service YAML
3. Ingress Configuration
4. ConfigMap for Environment
5. Secrets Management
6. Health Checks (liveness/readiness)
7. Resource Limits
8. HPA Configuration`,
        description: "Create complete Kubernetes deployment configurations with services and ingress.",
        user: u(6), category: c(0), model: m(6), tags: t(4),
        votes: 48, views: 223, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-13"), updatedAt: new Date("2025-12-15"),
    },
    {
        id: "p-76",
        title: "Regex Pattern Builder",
        slug: "regex-pattern-builder",
        content: `You are a regex expert. Create pattern for:

**What to Match:** {describe pattern}
**Language:** {JavaScript/Python/etc.}
**Examples:** {sample strings to match}
**Edge Cases:** {what should NOT match}

**Provide:**
1. Regex Pattern
2. Pattern Explanation (step by step)
3. Test Cases (match/no-match)
4. Common Variations
5. Performance Considerations
6. Simpler Alternatives
7. Interactive Testing Link
8. Language-Specific Notes`,
        description: "Build and explain regex patterns with test cases and optimization tips.",
        user: u(2), category: c(0), model: m(6), tags: t(0, 1),
        votes: 53, views: 256, commentCount: 10, verified: true, featured: false,
        createdAt: new Date("2025-12-14"), updatedAt: new Date("2025-12-16"),
    },
    {
        id: "p-77",
        title: "Whitepaper Outline Generator",
        slug: "whitepaper-outline",
        content: `You are a technical writer. Create whitepaper outline:

**Topic:** {subject}
**Purpose:** {educate/generate leads/establish authority}
**Audience:** {technical/executive/mixed}
**Length:** {pages}

**Generate:**
1. Executive Summary Structure
2. Problem Definition Section
3. Market/Industry Context
4. Solution Framework
5. Technical Deep Dive
6. Case Study Integration
7. Implementation Roadmap
8. Call to Action`,
        description: "Create whitepaper outlines with sections for technical and executive audiences.",
        user: u(5), category: c(1), model: m(0), tags: t(5),
        votes: 38, views: 184, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-09"), updatedAt: new Date("2025-12-11"),
    },
    {
        id: "p-78",
        title: "Book Proposal Writer",
        slug: "book-proposal-writer",
        content: `You are a literary agent. Help create book proposal:

**Book Title:** {working title}
**Genre:** {fiction/non-fiction/memoir}
**Premise:** {one-paragraph summary}
**Target Audience:** {who will buy this}

**Generate:**
1. Query Letter (250 words)
2. Synopsis (1 page)
3. Chapter Outline (10-12 chapters)
4. Author Bio
5. Comparable Titles Analysis
6. Marketing Platform
7. First Chapter Critique Points
8. Agent Targeting Strategy`,
        description: "Create compelling book proposals with query letters and synopses.",
        user: u(3), category: c(1), model: m(5), tags: t(11),
        votes: 42, views: 198, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-11"), updatedAt: new Date("2025-12-13"),
    },
    {
        id: "p-79",
        title: "Product Launch Checklist",
        slug: "product-launch-checklist",
        content: `You are a product launch manager. Create checklist for:

**Product:** {what you're launching}
**Launch Date:** {target date}
**Budget:** {available resources}
**Channels:** {launch channels}

**Generate:**
1. Pre-Launch (T-30 days)
2. Beta/Soft Launch Tasks
3. Marketing Prep
4. Sales Enablement
5. Technical Readiness
6. Launch Day Runbook
7. Post-Launch (T+7 days)
8. Metrics to Track`,
        description: "Create comprehensive product launch checklists from pre-launch to post-launch.",
        user: u(14), category: c(2), model: m(0), tags: [],
        votes: 47, views: 223, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-12"), updatedAt: new Date("2025-12-14"),
    },
    {
        id: "p-80",
        title: "Stakeholder Communication Plan",
        slug: "stakeholder-communication-plan",
        content: `You are a project communications manager. Create plan:

**Project:** {name/type}
**Stakeholders:** {list key stakeholders}
**Project Duration:** {timeline}

**Generate:**
1. Stakeholder Analysis Matrix
2. Communication Cadence
3. Status Report Template
4. Escalation Procedure
5. Meeting Schedule
6. Decision Log Template
7. Change Request Process
8. Risk Communication Protocol`,
        description: "Create stakeholder communication plans with templates and cadences.",
        user: u(14), category: c(2), model: m(0), tags: [],
        votes: 35, views: 167, commentCount: 4, verified: true, featured: false,
        createdAt: new Date("2025-12-06"), updatedAt: new Date("2025-12-08"),
    },
    {
        id: "p-81",
        title: "Interview Preparation Coach",
        slug: "interview-prep-coach",
        content: `You are a career coach. Prepare for interview:

**Role:** {position}
**Company:** {company name}
**Interview Type:** {phone/behavioral/technical}
**Experience Level:** {junior/senior/executive}

**Provide:**
1. Company Research Brief
2. Common Questions for Role (10)
3. STAR Format Answer Templates
4. Questions to Ask Them (5)
5. Salary Negotiation Points
6. Red Flags to Watch
7. Follow-up Email Template
8. Confidence Boosters`,
        description: "Prepare for job interviews with questions, STAR answers, and negotiation tips.",
        user: u(10), category: c(2), model: m(6), tags: [],
        votes: 59, views: 287, commentCount: 12, verified: true, featured: true,
        createdAt: new Date("2025-12-17"), updatedAt: new Date("2025-12-19"),
    },
    {
        id: "p-82",
        title: "Scientific Method Framework",
        slug: "scientific-method-framework",
        content: `You are a research scientist. Apply scientific method:

**Question:** {research question}
**Field:** {discipline}
**Resources Available:** {constraints}

**Guide Through:**
1. Background Research Summary
2. Hypothesis Formulation (testable)
3. Variables (independent/dependent/control)
4. Experimental Design
5. Data Collection Methods
6. Analysis Plan
7. Potential Confounds
8. Interpretation Framework`,
        description: "Apply the scientific method with hypothesis, variables, and experimental design.",
        user: u(8), category: c(3), model: m(5), tags: t(9),
        votes: 36, views: 173, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-09"), updatedAt: new Date("2025-12-11"),
    },
    {
        id: "p-83",
        title: "Citation and Bibliography Assistant",
        slug: "citation-bibliography",
        content: `You are a research librarian. Help with citations:

**Citation Style:** {APA/MLA/Chicago/etc.}
**Source Type:** {book/journal/website/etc.}
**Source Details:** {paste information}

**Provide:**
1. Properly Formatted Citation
2. In-Text Citation Format
3. Common Formatting Errors
4. Annotation Template
5. Style-Specific Rules
6. Similar Source Examples
7. Bibliography Organization
8. Citation Manager Tips`,
        description: "Create properly formatted citations and bibliographies in any style.",
        user: u(8), category: c(3), model: m(4), tags: t(10),
        votes: 32, views: 156, commentCount: 3, verified: true, featured: false,
        createdAt: new Date("2025-12-05"), updatedAt: new Date("2025-12-07"),
    },
    {
        id: "p-84",
        title: "Debate Argument Builder",
        slug: "debate-argument-builder",
        content: `You are a debate coach. Build arguments for:

**Topic:** {debate topic}
**Position:** {pro/con/both}
**Context:** {academic/professional/casual}

**Generate:**
1. Main Thesis Statement
2. 3-5 Supporting Arguments
3. Evidence for Each Point
4. Anticipated Counterarguments
5. Rebuttals
6. Opening Statement
7. Closing Statement
8. Rhetorical Techniques`,
        description: "Build comprehensive debate arguments with evidence and rebuttals.",
        user: u(8), category: c(3), model: m(5), tags: [],
        votes: 38, views: 184, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-10"), updatedAt: new Date("2025-12-12"),
    },
    {
        id: "p-85",
        title: "Music Composition Helper",
        slug: "music-composition-helper",
        content: `You are a music theory expert. Help compose:

**Genre:** {classical/pop/jazz/electronic}
**Mood:** {emotion to convey}
**Instrumentation:** {instruments available}
**Length:** {duration}

**Provide:**
1. Key and Mode Suggestion
2. Chord Progression Options
3. Melody Contour Ideas
4. Rhythm Patterns
5. Song Structure
6. Dynamic Mapping
7. Production Suggestions
8. Similar Songs for Reference`,
        description: "Compose music with chord progressions, melodies, and structure guidance.",
        user: u(3), category: c(4), model: m(5), tags: t(11),
        votes: 41, views: 196, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-11"), updatedAt: new Date("2025-12-13"),
    },
    {
        id: "p-86",
        title: "Interior Design Consultant",
        slug: "interior-design-consultant",
        content: `You are an interior designer. Design space:

**Room Type:** {living room/kitchen/office}
**Size:** {dimensions}
**Style:** {modern/traditional/minimalist}
**Budget:** {range}

**Provide:**
1. Layout Options (2-3)
2. Color Palette
3. Furniture Recommendations
4. Lighting Plan
5. Material Selections
6. Decor Accessories
7. Plant Suggestions
8. Shopping List with Prices`,
        description: "Design interior spaces with layouts, palettes, and furniture recommendations.",
        user: u(10), category: c(4), model: m(0), tags: t(11),
        votes: 45, views: 218, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-13"), updatedAt: new Date("2025-12-15"),
    },
    {
        id: "p-87",
        title: "Weekly Review Template",
        slug: "weekly-review-template",
        content: `You are a productivity coach. Create weekly review:

**Last Week's Goals:** {what you planned}
**Current Projects:** {ongoing work}
**Life Areas:** {work, health, relationships, etc.}

**Generate:**
1. Wins Celebration (3-5)
2. Lessons Learned
3. Unfinished Business Analysis
4. Next Week's Priorities (3-5)
5. Calendar Review
6. Energy Level Assessment
7. Gratitude Section
8. One Word Intention`,
        description: "Create weekly review frameworks for reflection and planning.",
        user: u(4), category: c(5), model: m(0), tags: [],
        votes: 42, views: 198, commentCount: 6, verified: true, featured: false,
        createdAt: new Date("2025-12-09"), updatedAt: new Date("2025-12-11"),
    },
    {
        id: "p-88",
        title: "Delegation Framework",
        slug: "delegation-framework",
        content: `You are a management consultant. Create delegation plan:

**Task:** {what to delegate}
**Team Member:** {who to delegate to}
**Deadline:** {when needed}
**Your Concern:** {why you're hesitant}

**Generate:**
1. Task Scope Definition
2. Success Criteria
3. Handoff Meeting Agenda
4. Check-in Schedule
5. Support Resources
6. Escalation Triggers
7. Feedback Framework
8. Growth Opportunity Framing`,
        description: "Create effective delegation plans with handoffs and support structures.",
        user: u(14), category: c(5), model: m(0), tags: [],
        votes: 33, views: 159, commentCount: 4, verified: true, featured: false,
        createdAt: new Date("2025-12-06"), updatedAt: new Date("2025-12-08"),
    },
    {
        id: "p-89",
        title: "Quiz and Assessment Creator",
        slug: "quiz-assessment-creator",
        content: `You are an assessment designer. Create quiz:

**Subject:** {topic}
**Purpose:** {formative/summative}
**Difficulty:** {level}
**Length:** {number of questions}

**Generate:**
1. Multiple Choice (5-10)
2. True/False (5)
3. Short Answer (3-5)
4. Essay Questions (1-2)
5. Answer Key
6. Grading Rubric
7. Bloom's Taxonomy Mapping
8. Differentiated Versions`,
        description: "Create assessments with varied question types and grading rubrics.",
        user: u(0), category: c(6), model: m(0), tags: [],
        votes: 46, views: 218, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-12"), updatedAt: new Date("2025-12-14"),
    },
    {
        id: "p-90",
        title: "Parent Communication Helper",
        slug: "parent-communication-helper",
        content: `You are an educational communicator. Write communication:

**Type:** {newsletter/progress report/incident}
**Audience:** {all parents/individual}
**Tone:** {formal/friendly}
**Key Message:** {main point}

**Generate:**
1. Subject Line/Title
2. Opening (warm, clear)
3. Main Content (organized)
4. Action Items (if any)
5. Deadline/Response Needed
6. Contact Information
7. Positive Closing
8. Translation Considerations`,
        description: "Create professional parent communications for various school situations.",
        user: u(0), category: c(6), model: m(0), tags: [],
        votes: 35, views: 167, commentCount: 4, verified: true, featured: false,
        createdAt: new Date("2025-12-07"), updatedAt: new Date("2025-12-09"),
    },
    {
        id: "p-91",
        title: "Product Description Optimizer",
        slug: "product-description-optimizer",
        content: `You are an e-commerce copywriter. Optimize:

**Product:** {item description}
**Category:** {type}
**Target Customer:** {buyer persona}
**Platform:** {Amazon/Shopify/etc.}

**Generate:**
1. Title (optimized for search)
2. Bullet Points (5)
3. Long Description
4. Keywords List
5. A+ Content Ideas
6. Cross-sell Suggestions
7. FAQ Section
8. Review Response Templates`,
        description: "Optimize product descriptions for e-commerce with SEO and conversion focus.",
        user: u(1), category: c(7), model: m(0), tags: t(7),
        votes: 49, views: 234, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-14"), updatedAt: new Date("2025-12-16"),
    },
    {
        id: "p-92",
        title: "Podcast Show Notes Generator",
        slug: "podcast-show-notes",
        content: `You are a podcast producer. Create show notes:

**Episode Title:** {title}
**Guest:** {if applicable}
**Transcript/Summary:** {paste content}
**Platform:** {Apple/Spotify/website}

**Generate:**
1. Episode Description (150 words)
2. Key Topics with Timestamps
3. Guest Bio
4. Resources Mentioned (linked)
5. Pull Quotes (3)
6. SEO-Optimized Summary
7. Social Media Snippets
8. Call to Action`,
        description: "Create comprehensive podcast show notes with timestamps and social snippets.",
        user: u(12), category: c(7), model: m(0), tags: t(8),
        votes: 38, views: 184, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-09"), updatedAt: new Date("2025-12-11"),
    },
    {
        id: "p-93",
        title: "AWS Architecture Advisor",
        slug: "aws-architecture-advisor",
        content: `You are an AWS Solutions Architect. Design for:

**Application:** {description}
**Scale:** {users/requests}
**Budget Focus:** {cost/performance}
**Compliance:** {requirements}

**Recommend:**
1. Service Selection
2. Architecture Diagram (text)
3. Networking Setup (VPC, subnets)
4. Security Configuration
5. Cost Estimation
6. Scaling Strategy
7. Disaster Recovery Plan
8. Monitoring Setup`,
        description: "Design AWS architectures with services, security, and cost optimization.",
        user: u(6), category: c(0), model: m(6), tags: t(4),
        votes: 55, views: 267, commentCount: 11, verified: true, featured: true,
        createdAt: new Date("2025-12-16"), updatedAt: new Date("2025-12-18"),
    },
    {
        id: "p-94",
        title: "Mobile App UX Reviewer",
        slug: "mobile-app-ux-reviewer",
        content: `You are a UX researcher. Review mobile app:

**App Type:** {description}
**Platform:** {iOS/Android/both}
**Screens:** {describe or list}
**User Task:** {primary action}

**Analyze:**
1. First Impression Assessment
2. Navigation Clarity
3. Gesture Intuitiveness
4. Loading State Handling
5. Error Recovery
6. Accessibility Check
7. Improvement Recommendations
8. Competitive Comparison`,
        description: "Review mobile app UX with navigation, accessibility, and improvement suggestions.",
        user: u(10), category: c(0), model: m(6), tags: t(14),
        votes: 43, views: 204, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-11"), updatedAt: new Date("2025-12-13"),
    },
    {
        id: "p-95",
        title: "Financial Report Explainer",
        slug: "financial-report-explainer",
        content: `You are a financial analyst. Explain this report:

**Report Type:** {10-K, 10-Q, earnings}
**Company:** {name}
**Data:** {paste key sections}

**Explain:**
1. Key Metrics Summary
2. Revenue Analysis
3. Expense Breakdown
4. Profitability Assessment
5. Cash Flow Health
6. Debt Analysis
7. Red Flags/Concerns
8. Investment Implications`,
        description: "Translate financial reports into plain English with key insights.",
        user: u(11), category: c(3), model: m(6), tags: t(9),
        votes: 51, views: 245, commentCount: 9, verified: true, featured: false,
        createdAt: new Date("2025-12-15"), updatedAt: new Date("2025-12-17"),
    },
    {
        id: "p-96",
        title: "Recipe Development Assistant",
        slug: "recipe-development",
        content: `You are a culinary expert. Develop recipe:

**Dish Type:** {cuisine, course}
**Key Ingredients:** {must include}
**Dietary Needs:** {restrictions}
**Skill Level:** {beginner/advanced}

**Provide:**
1. Recipe Name Options
2. Ingredient List (with alternatives)
3. Step-by-Step Instructions
4. Time Breakdown
5. Nutrition Estimate
6. Scaling Guide
7. Make-Ahead Tips
8. Plating Suggestions`,
        description: "Develop recipes with ingredients, instructions, and dietary accommodations.",
        user: u(12), category: c(4), model: m(0), tags: t(11),
        votes: 39, views: 187, commentCount: 5, verified: true, featured: false,
        createdAt: new Date("2025-12-10"), updatedAt: new Date("2025-12-12"),
    },
    {
        id: "p-97",
        title: "Event Planning Framework",
        slug: "event-planning-framework",
        content: `You are an event planner. Plan event:

**Event Type:** {conference/wedding/party}
**Date:** {when}
**Guest Count:** {number}
**Budget:** {total}

**Generate:**
1. Timeline (3 months out)
2. Vendor Checklist
3. Budget Breakdown
4. Day-of Schedule
5. Contingency Plans
6. Guest Communication Templates
7. Decor Concepts
8. Post-Event Tasks`,
        description: "Create comprehensive event plans with timelines, vendors, and budgets.",
        user: u(14), category: c(5), model: m(0), tags: [],
        votes: 44, views: 208, commentCount: 7, verified: true, featured: false,
        createdAt: new Date("2025-12-12"), updatedAt: new Date("2025-12-14"),
    },
    {
        id: "p-98",
        title: "Knowledge Gap Analyzer",
        slug: "knowledge-gap-analyzer",
        content: `You are a learning strategist. Analyze gaps:

**Goal:** {what you want to learn}
**Current Level:** {self-assessment}
**Available Time:** {hours per week}
**Learning Style:** {preference}

**Provide:**
1. Skills Inventory
2. Gap Identification
3. Priority Ranking
4. Learning Path
5. Resource Recommendations
6. Milestone Checkpoints
7. Practice Projects
8. Assessment Criteria`,
        description: "Identify knowledge gaps with personalized learning paths and resources.",
        user: u(8), category: c(6), model: m(6), tags: [],
        votes: 47, views: 223, commentCount: 8, verified: true, featured: false,
        createdAt: new Date("2025-12-14"), updatedAt: new Date("2025-12-16"),
    },
    {
        id: "p-99",
        title: "Community Building Playbook",
        slug: "community-building-playbook",
        content: `You are a community manager. Build community:

**Type:** {brand/creator/niche}
**Platform:** {Discord/Slack/Circle}
**Current Size:** {members}
**Goal:** {growth target}

**Generate:**
1. Value Proposition
2. Channel Structure
3. Onboarding Flow
4. Engagement Rituals
5. Content Calendar
6. Moderation Guidelines
7. Growth Tactics
8. Metrics Dashboard`,
        description: "Create community building strategies with onboarding and engagement frameworks.",
        user: u(12), category: c(7), model: m(0), tags: t(8),
        votes: 52, views: 248, commentCount: 10, verified: true, featured: false,
        createdAt: new Date("2025-12-15"), updatedAt: new Date("2025-12-17"),
    },
    {
        id: "p-100",
        title: "AI Prompt Meta-Optimizer",
        slug: "ai-prompt-meta-optimizer",
        content: `You are a prompt engineering expert. Optimize this prompt:

**Current Prompt:** {paste your prompt}
**AI Model:** {GPT/Claude/Gemini}
**Issue:** {what's not working}
**Desired Output:** {what you want}

**Provide:**
1. Prompt Analysis (what works/doesn't)
2. Structural Improvements
3. Clarity Enhancements
4. Context Additions Needed
5. Constraint Specifications
6. Output Format Guidance
7. Optimized Version
8. Variation for Different Models`,
        description: "Optimize AI prompts for better outputs with structural and clarity improvements.",
        user: u(0), category: c(0), model: m(6), tags: [],
        votes: 78, views: 378, commentCount: 18, verified: true, featured: true,
        createdAt: new Date("2025-12-20"), updatedAt: new Date("2025-12-22"),
    },
];

// Helper function to get all prompts including extended ones
export function getAllExtendedPrompts(): Prompt[] {
    return extendedPrompts;
}
