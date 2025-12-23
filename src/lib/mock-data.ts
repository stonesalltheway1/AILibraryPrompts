import { Category, AIModel, Prompt, User, Tag } from "./types";
import { getExtendedPrompts } from "./prompt-library";

// ============================================================================
// USERS (with realistic profiles)
// ============================================================================
export const mockUsers: User[] = [
    {
        id: "user-1",
        username: "promptmaster",
        reputation: 890,
        createdAt: new Date("2025-11-15"),
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        bio: "Senior prompt engineer with 5+ years in NLP. I specialize in crafting prompts that get results on the first try. Former AI researcher at Stanford.",
        website: "https://promptmaster.dev",
        twitter: "promptmaster_ai",
        github: "promptmaster",
        specialty: ["Prompt Engineering", "NLP", "Claude"],
    },
    {
        id: "user-2",
        username: "aiwhisperer",
        reputation: 725,
        createdAt: new Date("2025-11-20"),
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        bio: "Creative writer turned AI enthusiast. I help people unlock the storytelling potential of LLMs. Published author and content strategist.",
        twitter: "aiwhisperer",
        specialty: ["Creative Writing", "Storytelling", "GPT-5"],
    },
    {
        id: "user-3",
        username: "codecraft",
        reputation: 580,
        createdAt: new Date("2025-11-22"),
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        bio: "Full-stack developer obsessed with using AI to write better code. My prompts focus on clean, maintainable, production-ready output.",
        github: "codecraftdev",
        specialty: ["Coding", "TypeScript", "React"],
    },
    {
        id: "user-4",
        username: "creativeai",
        reputation: 445,
        createdAt: new Date("2025-12-01"),
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        bio: "Digital artist exploring the intersection of human creativity and AI. I create prompts for stunning Midjourney and DALL-E generations.",
        website: "https://creativeai.art",
        twitter: "creativeai_art",
        specialty: ["Image Generation", "Creative", "Art Direction"],
    },
    {
        id: "user-5",
        username: "datagenius",
        reputation: 320,
        createdAt: new Date("2025-12-05"),
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        bio: "Data scientist by day, prompt engineer by passion. I specialize in getting AI to help with complex analysis and research tasks.",
        github: "datagenius42",
        specialty: ["Data Analysis", "Research", "Python"],
    },
    {
        id: "user-6",
        username: "techwriter_pro",
        reputation: 275,
        createdAt: new Date("2025-12-08"),
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
        bio: "Technical writer with 10 years experience. My prompts help you write clear documentation, API guides, and user manuals.",
        website: "https://techwriterpro.com",
        specialty: ["Documentation", "Technical Writing", "APIs"],
    },
    {
        id: "user-7",
        username: "devops_ninja",
        reputation: 380,
        createdAt: new Date("2025-12-03"),
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
        bio: "DevOps engineer automating everything. I create prompts for infrastructure, CI/CD pipelines, and cloud architecture.",
        github: "devops-ninja",
        specialty: ["DevOps", "AWS", "Docker"],
    },
    {
        id: "user-8",
        username: "marketingmaven",
        reputation: 295,
        createdAt: new Date("2025-12-10"),
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        bio: "Marketing director who discovered the power of AI for content creation. Sharing prompts that convert browsers into buyers.",
        twitter: "marketingmaven_",
        specialty: ["Marketing", "Copywriting", "SEO"],
    },
    {
        id: "user-9",
        username: "academic_writer",
        reputation: 420,
        createdAt: new Date("2025-11-28"),
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
        bio: "PhD researcher helping academics use AI ethically. My prompts focus on literature reviews, research synthesis, and academic writing.",
        specialty: ["Academic Writing", "Research", "Education"],
    },
    {
        id: "user-10",
        username: "startup_founder",
        reputation: 510,
        createdAt: new Date("2025-11-25"),
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
        bio: "3x founder using AI to build faster. Sharing the exact prompts I use for business plans, pitch decks, and market analysis.",
        twitter: "startup_ai_guy",
        website: "https://aiforstartups.io",
        specialty: ["Business", "Startups", "Strategy"],
    },
    {
        id: "user-11",
        username: "ux_designer",
        reputation: 340,
        createdAt: new Date("2025-12-05"),
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        bio: "UX designer leveraging AI for faster prototyping. Creating prompts for user research, personas, and design briefs.",
        website: "https://uxwith.ai",
        specialty: ["UX Design", "User Research", "Figma"],
    },
    {
        id: "user-12",
        username: "data_scientist",
        reputation: 465,
        createdAt: new Date("2025-11-30"),
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        bio: "ML engineer at a Fortune 500. I create prompts for data cleaning, analysis automation, and model documentation.",
        github: "ds_engineer",
        specialty: ["Machine Learning", "Data Science", "Python"],
    },
    {
        id: "user-13",
        username: "content_creator",
        reputation: 255,
        createdAt: new Date("2025-12-12"),
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
        bio: "YouTube creator with 500K subs. Using AI to scale content production without losing authenticity. Happy to share what works!",
        twitter: "content_ai_tips",
        specialty: ["Content Creation", "YouTube", "Social Media"],
    },
    {
        id: "user-14",
        username: "fullstack_dev",
        reputation: 395,
        createdAt: new Date("2025-12-01"),
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
        bio: "Building web apps for 8 years. AI has 10x'd my productivity. Sharing prompts for Next.js, React, and TypeScript development.",
        github: "fullstackpro",
        specialty: ["Next.js", "React", "Full Stack"],
    },
    {
        id: "user-15",
        username: "product_manager",
        reputation: 310,
        createdAt: new Date("2025-12-07"),
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        bio: "PM at a Series B startup. I use AI to speed up PRDs, user stories, and competitive analysis. Less docs, more shipping.",
        specialty: ["Product Management", "PRDs", "User Stories"],
    },
];


// ============================================================================
// CATEGORIES
// ============================================================================
export const mockCategories: Category[] = [
    {
        id: "cat-1",
        name: "Coding",
        slug: "coding",
        description: "Prompts for debugging, code generation, refactoring, and software development",
        icon: "Code2",
        promptCount: 20,
    },
    {
        id: "cat-2",
        name: "Writing",
        slug: "writing",
        description: "Blog posts, emails, creative fiction, copywriting, and content creation",
        icon: "Pencil",
        promptCount: 12,
    },
    {
        id: "cat-3",
        name: "Business",
        slug: "business",
        description: "Proposals, analysis, strategy, presentations, and professional documents",
        icon: "Briefcase",
        promptCount: 15,
    },
    {
        id: "cat-4",
        name: "Research",
        slug: "research",
        description: "Summarization, data analysis, literature reviews, and academic work",
        icon: "BookOpen",
        promptCount: 10,
    },
    {
        id: "cat-5",
        name: "Creative",
        slug: "creative",
        description: "Image generation prompts, story ideas, artistic concepts, and brainstorming",
        icon: "Palette",
        promptCount: 10,
    },
    {
        id: "cat-6",
        name: "Productivity",
        slug: "productivity",
        description: "Task management, planning, organization, and workflow optimization",
        icon: "Target",
        promptCount: 10,
    },
    {
        id: "cat-7",
        name: "Education",
        slug: "education",
        description: "Lesson plans, explanations, tutoring, and learning assistance",
        icon: "GraduationCap",
        promptCount: 8,
    },
    {
        id: "cat-8",
        name: "Marketing",
        slug: "marketing",
        description: "Ad copy, SEO, social media, campaigns, and brand strategy",
        icon: "Megaphone",
        promptCount: 13,
    },
];

// ============================================================================
// AI MODELS
// ============================================================================
export const mockModels: AIModel[] = [
    // OpenAI
    { id: "model-1", name: "GPT-5", slug: "gpt-5", vendor: "openai", promptCount: 8 },
    { id: "model-2", name: "GPT-5.1", slug: "gpt-5-1", vendor: "openai", promptCount: 5 },
    { id: "model-3", name: "GPT-5.2", slug: "gpt-5-2", vendor: "openai", promptCount: 7 },
    { id: "model-4", name: "o3", slug: "o3", vendor: "openai", promptCount: 4 },
    { id: "model-5", name: "o4-mini", slug: "o4-mini", vendor: "openai", promptCount: 3 },

    // Anthropic
    { id: "model-6", name: "Claude Opus 4", slug: "claude-opus-4", vendor: "anthropic", promptCount: 6 },
    { id: "model-7", name: "Claude Sonnet 4.5", slug: "claude-sonnet-4-5", vendor: "anthropic", promptCount: 12 },
    { id: "model-8", name: "Claude Haiku 4.5", slug: "claude-haiku-4-5", vendor: "anthropic", promptCount: 4 },

    // Google
    { id: "model-9", name: "Gemini 3 Pro", slug: "gemini-3-pro", vendor: "google", promptCount: 5 },
    { id: "model-10", name: "Gemini 3 Flash", slug: "gemini-3-flash", vendor: "google", promptCount: 4 },
    { id: "model-11", name: "Gemini 3 Deep Think", slug: "gemini-3-deep-think", vendor: "google", promptCount: 3 },

    // xAI
    { id: "model-12", name: "Grok 3", slug: "grok-3", vendor: "xai", promptCount: 2 },
    { id: "model-13", name: "Grok 4", slug: "grok-4", vendor: "xai", promptCount: 4 },
    { id: "model-14", name: "Grok 4 Heavy", slug: "grok-4-heavy", vendor: "xai", promptCount: 2 },

    // Meta
    { id: "model-15", name: "Llama 4", slug: "llama-4", vendor: "meta", promptCount: 3 },

    // Mistral
    { id: "model-16", name: "Mistral Large 3", slug: "mistral-large-3", vendor: "mistral", promptCount: 2 },
];

// ============================================================================
// TAGS
// ============================================================================
export const mockTags: Tag[] = [
    { id: "tag-1", name: "Python", slug: "python" },
    { id: "tag-2", name: "JavaScript", slug: "javascript" },
    { id: "tag-3", name: "Debugging", slug: "debugging" },
    { id: "tag-4", name: "Refactoring", slug: "refactoring" },
    { id: "tag-5", name: "API", slug: "api" },
    { id: "tag-6", name: "Blog", slug: "blog" },
    { id: "tag-7", name: "Email", slug: "email" },
    { id: "tag-8", name: "SEO", slug: "seo" },
    { id: "tag-9", name: "Social Media", slug: "social-media" },
    { id: "tag-10", name: "Data Analysis", slug: "data-analysis" },
    { id: "tag-11", name: "Summary", slug: "summary" },
    { id: "tag-12", name: "Creative Writing", slug: "creative-writing" },
    { id: "tag-13", name: "Code Review", slug: "code-review" },
    { id: "tag-14", name: "SQL", slug: "sql" },
    { id: "tag-15", name: "React", slug: "react" },
    { id: "tag-16", name: "Communication", slug: "communication" },
    { id: "tag-17", name: "Problem Solving", slug: "problem-solving" },
    { id: "tag-18", name: "Reasoning", slug: "reasoning" },
    { id: "tag-19", name: "Analysis", slug: "analysis" },
    { id: "tag-20", name: "Planning", slug: "planning" },
];

// ============================================================================
// PROMPTS
// ============================================================================
export const mockPrompts: Prompt[] = [
    {
        id: "prompt-1",
        title: "Ultimate Python Debugging Assistant",
        slug: "ultimate-python-debugging-assistant",
        content: `You are an expert Python debugger with 20 years of experience. When I share an error message or buggy code, provide:

1. **Root Cause Analysis**: Explain exactly why the error occurred in simple terms
2. **Step-by-Step Fix**: Provide the corrected code with inline comments explaining each change
3. **Prevention Tips**: Suggest best practices to avoid this error in the future
4. **Edge Cases**: Identify any potential edge cases I should test

Format your response with clear headers and use code blocks with syntax highlighting.

Error/Code to debug:
{paste your error message or code here}`,
        description: "A comprehensive debugging prompt that helps identify, fix, and prevent Python errors with detailed explanations.",
        user: mockUsers[0],
        category: mockCategories[0],
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[0], mockTags[2], mockTags[12]],
        votes: 87,
        views: 453,
        commentCount: 34,
        verified: true,
        featured: true,
        createdAt: new Date("2025-12-15"),
        updatedAt: new Date("2024-12-01"),
    },
    {
        id: "prompt-2",
        title: "Blog Post Writer with SEO Optimization",
        slug: "blog-post-writer-seo-optimization",
        content: `Act as a professional content writer and SEO specialist. Create a comprehensive blog post on the following topic:

**Topic**: {your topic}
**Target Keyword**: {main keyword}
**Word Count**: {desired length}
**Tone**: {professional/casual/conversational}

Your blog post should include:
- An attention-grabbing headline with the target keyword
- A compelling introduction with a hook
- Well-structured H2 and H3 subheadings
- Naturally integrated keywords (no keyword stuffing)
- Bullet points and numbered lists for readability
- A strong conclusion with a call-to-action
- Meta description (155 characters max)

Ensure the content is original, engaging, and provides genuine value to readers.`,
        description: "Generate SEO-optimized blog posts with proper structure, keywords, and engaging content.",
        user: mockUsers[1],
        category: mockCategories[1],
        model: mockModels[0], // GPT-5
        tags: [mockTags[5], mockTags[7]],
        votes: 64,
        views: 392,
        commentCount: 28,
        verified: true,
        featured: true,
        createdAt: new Date("2025-12-20"),
        updatedAt: new Date("2025-12-25"),
    },
    {
        id: "prompt-3",
        title: "React Component Generator with TypeScript",
        slug: "react-component-generator-typescript",
        content: `You are a senior React developer specializing in TypeScript and modern best practices. Generate a production-ready React component based on the following requirements:

**Component Name**: {ComponentName}
**Purpose**: {brief description}
**Props needed**: {list the props}
**State requirements**: {what state is needed}
**Styling approach**: {Tailwind/CSS Modules/Styled Components}

Please provide:
1. The complete TypeScript component with proper typing
2. Props interface definition
3. Appropriate hooks (useState, useEffect, useMemo, useCallback as needed)
4. Error boundaries if applicable
5. Loading and error states
6. Accessibility attributes (ARIA labels, keyboard navigation)
7. JSDoc comments for the component and its props
8. Example usage

Follow React 19 patterns and best practices.`,
        description: "Generate production-ready React TypeScript components with proper typing, hooks, and accessibility.",
        user: mockUsers[2],
        category: mockCategories[0],
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[1], mockTags[14]],
        votes: 52,
        views: 285,
        commentCount: 19,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-18"),
        updatedAt: new Date("2025-12-22"),
    },
    {
        id: "prompt-4",
        title: "Executive Business Email Composer",
        slug: "executive-business-email-composer",
        content: `You are an executive communication specialist with expertise in corporate correspondence. Compose a professional business email with the following details:

**Purpose**: {announce/request/follow-up/proposal/etc.}
**Recipient**: {their role and relationship to you}
**Key Message**: {main point to convey}
**Tone**: {formal/semi-formal/friendly professional}
**Urgency**: {high/medium/low}

Structure the email with:
- Subject line that prompts action
- Appropriate greeting based on relationship
- Clear and concise opening statement
- Supporting details in logical order
- Specific call-to-action
- Professional closing
- Signature block

Additional requirements:
- Keep paragraphs short (2-3 sentences max)
- Use bullet points for multiple items
- Include a deadline if applicable
- Proofread for grammar and clarity`,
        description: "Craft professional business emails with the right tone, structure, and call-to-action.",
        user: mockUsers[3],
        category: mockCategories[2],
        model: mockModels[0], // GPT-5
        tags: [mockTags[6]],
        votes: 41,
        views: 218,
        commentCount: 12,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-10"),
        updatedAt: new Date("2025-12-15"),
    },
    {
        id: "prompt-5",
        title: "Data Analysis Report Generator",
        slug: "data-analysis-report-generator",
        content: `You are a senior data analyst with expertise in statistical analysis and data visualization. Analyze the following dataset and create a comprehensive report:

**Dataset Description**: {describe your data}
**Analysis Goals**: {what insights are you looking for}
**Audience**: {who will read this report}

Provide:
1. **Executive Summary** (3-4 sentences)
2. **Key Findings** (top 5-7 insights)
3. **Methodology** (analysis approach used)
4. **Detailed Analysis**:
   - Descriptive statistics
   - Trend analysis
   - Correlations
   - Anomalies detected
5. **Visualizations** (describe recommended charts)
6. **Recommendations** (actionable next steps)
7. **Limitations** (caveats to consider)

Format with clear headers and use tables where appropriate. Include the formulas or methods used for calculations.`,
        description: "Transform raw data into insightful analysis reports with statistics, findings, and recommendations.",
        user: mockUsers[4],
        category: mockCategories[3],
        model: mockModels[8], // Gemini 3 Pro
        tags: [mockTags[9], mockTags[10]],
        votes: 38,
        views: 197,
        commentCount: 15,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-12"),
        updatedAt: new Date("2025-12-18"),
    },
    {
        id: "prompt-6",
        title: "Social Media Content Calendar Creator",
        slug: "social-media-content-calendar-creator",
        content: `You are a social media strategist with expertise across all major platforms. Create a 30-day content calendar for:

**Brand/Business**: {name and industry}
**Target Audience**: {demographics and interests}
**Primary Platforms**: {Instagram/Twitter/LinkedIn/TikTok/etc.}
**Goals**: {awareness/engagement/conversions/etc.}
**Brand Voice**: {professional/playful/inspirational/etc.}

For each day, provide:
- Platform(s) to post on
- Content type (image, video, carousel, story, etc.)
- Post caption with hashtags
- Best time to post
- Engagement strategy (questions, CTAs, etc.)

Include:
- Mix of content pillars (educational, entertaining, promotional, behind-the-scenes)
- Relevant trending topics or holidays
- User-generated content opportunities
- Engagement prompts and community building posts

Format as a structured table with dates and details.`,
        description: "Generate a complete 30-day social media content calendar with captions, hashtags, and timing.",
        user: mockUsers[1],
        category: mockCategories[7],
        model: mockModels[0], // GPT-5
        tags: [mockTags[8]],
        votes: 45,
        views: 263,
        commentCount: 22,
        verified: true,
        featured: true,
        createdAt: new Date("2025-12-08"),
        updatedAt: new Date("2025-12-14"),
    },
    {
        id: "prompt-7",
        title: "SQL Query Optimizer and Explainer",
        slug: "sql-query-optimizer-explainer",
        content: `You are a database performance expert with deep knowledge of SQL optimization. Analyze and optimize the following SQL query:

\`\`\`sql
{paste your SQL query here}
\`\`\`

**Database**: {PostgreSQL/MySQL/SQL Server/Oracle}
**Table sizes**: {approximate row counts}
**Current execution time**: {if known}

Provide:
1. **Query Analysis**: Explain what the query does in plain English
2. **Performance Issues**: Identify bottlenecks and anti-patterns
3. **Optimized Query**: Rewritten query with improvements
4. **Explanation**: Why each optimization helps
5. **Index Recommendations**: What indexes would improve performance
6. **Execution Plan Tips**: How to read and interpret the execution plan
7. **Alternative Approaches**: Other ways to achieve the same result

Format with clear sections and use code blocks for SQL examples.`,
        description: "Analyze, explain, and optimize SQL queries with detailed performance recommendations.",
        user: mockUsers[2],
        category: mockCategories[0],
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[13]],
        votes: 37,
        views: 234,
        commentCount: 18,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-05"),
        updatedAt: new Date("2025-12-10"),
    },
    {
        id: "prompt-8",
        title: "Creative Story Starter Generator",
        slug: "creative-story-starter-generator",
        content: `You are a creative writing mentor with expertise in compelling narratives. Generate an engaging story starter based on:

**Genre**: {fantasy/sci-fi/thriller/romance/mystery/etc.}
**Setting**: {time period and location}
**Main Character**: {brief description}
**Mood**: {dark/hopeful/mysterious/adventurous/etc.}
**Length**: {flash fiction/short story/novel opening}

Create:
1. **Opening Hook** (first 2-3 sentences that grab attention)
2. **Scene Setting** (vivid sensory description)
3. **Character Introduction** (through action, not exposition)
4. **Inciting Incident Hint** (what's about to change)
5. **Voice Sample** (1-2 paragraphs in the story's voice)

Also provide:
- 3 possible directions the story could take
- Key themes to explore
- Potential plot twists
- Character arc suggestions

Make the opening impossible to put down.`,
        description: "Generate compelling story openers with hooks, vivid settings, and narrative direction.",
        user: mockUsers[3],
        category: mockCategories[4],
        model: mockModels[5], // Claude Opus 4
        tags: [mockTags[11]],
        votes: 46,
        views: 245,
        commentCount: 25,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-03"),
        updatedAt: new Date("2025-12-08"),
    },
    {
        id: "prompt-9",
        title: "Lesson Plan Creator for Any Subject",
        slug: "lesson-plan-creator-any-subject",
        content: `You are an experienced educator with expertise in instructional design. Create a comprehensive lesson plan for:

**Subject**: {topic to teach}
**Grade Level/Audience**: {age or skill level}
**Duration**: {class time available}
**Learning Objectives**: {what students should be able to do after}
**Prior Knowledge**: {what students already know}

Structure the lesson with:

1. **Opening Hook** (5 min)
   - Engaging activity or question to capture interest
   
2. **Direct Instruction** (10-15 min)
   - Key concepts explained clearly
   - Visual aids or examples needed
   
3. **Guided Practice** (10-15 min)
   - Structured activity with support
   - Check for understanding questions
   
4. **Independent Practice** (10-15 min)
   - Individual or group activity
   - Differentiation for various levels
   
5. **Closing/Assessment** (5 min)
   - Exit ticket or summary
   - Preview of next lesson

Include:
- Materials needed
- Common misconceptions to address
- Extension activities for advanced learners
- Accommodations for struggling students`,
        description: "Generate detailed, pedagogically-sound lesson plans for any subject and grade level.",
        user: mockUsers[0],
        category: mockCategories[6],
        model: mockModels[0], // GPT-5
        tags: [],
        votes: 35,
        views: 189,
        commentCount: 14,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-01"),
        updatedAt: new Date("2025-12-05"),
    },
    {
        id: "prompt-10",
        title: "API Documentation Writer",
        slug: "api-documentation-writer",
        content: `You are a technical writer specializing in API documentation. Create comprehensive documentation for the following API endpoint:

**Endpoint**: {method and path}
**Purpose**: {what does this endpoint do}
**Authentication**: {type of auth required}

Generate documentation including:

## Overview
Brief description of the endpoint's purpose and use cases.

## Request
- **URL**: Full path with parameter placeholders
- **Method**: HTTP method
- **Headers**: Required headers with examples
- **Path Parameters**: Name, type, required, description
- **Query Parameters**: Name, type, required, default, description  
- **Request Body**: JSON schema with examples

## Response
- **Success Response**: Status code, body schema, example
- **Error Responses**: Common error codes with explanations

## Code Examples
Provide examples in:
- cURL
- JavaScript (fetch)
- Python (requests)

## Notes
- Rate limiting information
- Pagination details if applicable
- Common pitfalls and tips

Format in clear Markdown with proper code blocks.`,
        description: "Generate professional API documentation with examples, schemas, and code snippets.",
        user: mockUsers[2],
        category: mockCategories[0],
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[4]],
        votes: 29,
        views: 167,
        commentCount: 11,
        verified: true,
        featured: false,
        createdAt: new Date("2025-11-28"),
        updatedAt: new Date("2025-12-02"),
    },
    {
        id: "prompt-11",
        title: "Productivity System Designer",
        slug: "productivity-system-designer",
        content: `You are a productivity coach who has helped thousands of professionals optimize their workflows. Design a personalized productivity system based on:

**Current Challenges**: {main productivity issues}
**Work Style**: {morning person/night owl, focused/multitasker}
**Tools Available**: {apps and tools you use}
**Goals**: {what you want to achieve}
**Time Available**: {hours per day for focused work}

Create a system including:

1. **Morning Routine** (detailed time blocks)
2. **Task Management Framework**
   - How to capture tasks
   - Prioritization method
   - Daily/weekly planning ritual
3. **Time Blocking Schedule**
   - Deep work blocks
   - Shallow work times
   - Buffer time
4. **Energy Management**
   - Peak performance times
   - Break schedules
   - Recovery activities
5. **Weekly Review Process**
   - What to review
   - Questions to ask
   - Adjustment strategies

Provide specific, actionable steps that can be implemented immediately.`,
        description: "Design a complete personalized productivity system with routines, frameworks, and schedules.",
        user: mockUsers[4],
        category: mockCategories[5],
        model: mockModels[0], // GPT-5
        tags: [],
        votes: 31,
        views: 198,
        commentCount: 16,
        verified: true,
        featured: false,
        createdAt: new Date("2025-11-25"),
        updatedAt: new Date("2025-11-30"),
    },
    {
        id: "prompt-12",
        title: "Code Refactoring Expert",
        slug: "code-refactoring-expert",
        content: `You are a software architect with expertise in clean code principles and design patterns. Refactor the following code to improve its quality:

\`\`\`
{paste your code here}
\`\`\`

**Language**: {programming language}
**Main Issues**: {what you want to improve}
**Constraints**: {any limitations to consider}

Provide:

1. **Code Smells Identified**
   - List each issue found
   - Explain why it's problematic

2. **Refactored Code**
   - Complete, working code
   - Inline comments explaining changes

3. **Design Patterns Applied**
   - Which patterns were used
   - Why they're appropriate here

4. **SOLID Principles**
   - How each principle was applied
   - Specific improvements made

5. **Testing Considerations**
   - How refactoring improves testability
   - Suggested test cases

6. **Performance Impact**
   - Any performance implications
   - Before/after complexity analysis

Follow clean code principles and modern best practices.`,
        description: "Transform messy code into clean, maintainable code with design patterns and SOLID principles.",
        user: mockUsers[0],
        category: mockCategories[0],
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[3], mockTags[12]],
        votes: 48,
        views: 263,
        commentCount: 21,
        verified: true,
        featured: true,
        createdAt: new Date("2025-11-22"),
        updatedAt: new Date("2025-11-28"),
    },
    {
        id: "prompt-13",
        title: "Clarifying Questions Expert",
        slug: "clarifying-questions-expert",
        content: `Before providing any solution or answer, I want you to act as an expert consultant who asks clarifying questions.

**Task:** {describe what you need help with}

**Instructions:**
1. Do NOT provide an immediate answer or solution
2. Ask 3-5 specific clarifying questions to understand:
   - The context and constraints
   - The desired outcome and success criteria
   - Any specific requirements or preferences
   - Potential edge cases or special scenarios
3. Wait for my answers before proceeding
4. Only when you're 95% confident you understand the full picture, provide your complete solution

**Response Format:**
Start with: "To give you the most accurate and helpful response, I need to understand a few things first:"

Then list your clarifying questions numbered 1-5.

This approach prevents misunderstandings and ensures the solution actually addresses your specific needs.`,
        description: "Get AI to ask clarifying questions first before providing solutions, ensuring more accurate and tailored responses.",
        user: mockUsers[0], // promptmaster
        category: mockCategories[5], // Productivity
        model: mockModels[0], // GPT-5
        tags: [mockTags[15]],
        votes: 92,
        views: 487,
        commentCount: 38,
        verified: true,
        featured: true,
        createdAt: new Date("2025-12-01"),
        updatedAt: new Date("2025-12-20"),
    },
    {
        id: "prompt-14",
        title: "Chain-of-Thought Problem Solver",
        slug: "chain-of-thought-problem-solver",
        content: `You are an expert problem solver who thinks step-by-step before providing solutions.

**Problem/Question:** {describe your problem or question}

**Required Approach:**

1. **Understanding Phase:**
   - Restate the problem in your own words
   - Identify the core challenge
   - List known constraints and requirements

2. **Analysis Phase:**
   - Break down the problem into smaller components
   - Consider multiple approaches (list at least 3)
   - Identify pros and cons of each approach

3. **Reasoning Phase:**
   - Think through the logic step-by-step
   - Show your work (calculations, deductions, etc.)
   - Explain why you're choosing specific approaches

4. **Solution Phase:**
   - Provide the complete solution
   - Explain how each step addresses the problem
   - Include validation or testing considerations

5. **Verification Phase:**
   - Double-check the solution for edge cases
   - Identify potential issues or limitations
   - Suggest improvements if applicable

Use this structured thinking process for complex problems, debugging, strategic decisions, or when accuracy is critical.`,
        description: "Force AI to show step-by-step reasoning before conclusions for better problem-solving accuracy.",
        user: mockUsers[4], // datagenius
        category: mockCategories[5], // Productivity
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [],
        votes: 78,
        views: 412,
        commentCount: 29,
        verified: true,
        featured: true,
        createdAt: new Date("2025-12-03"),
        updatedAt: new Date("2025-12-19"),
    },
    {
        id: "prompt-15",
        title: "Context-Aware AI Assistant Setup",
        slug: "context-aware-ai-assistant-setup",
        content: `I want you to act as my personal AI assistant with full context awareness. Save this information for ALL our future interactions in this conversation:

**About Me:**
- Role: {your job title/role}
- Industry: {your industry}
- Key Responsibilities: {list 3-5 main responsibilities}
- Technical Level: {beginner/intermediate/expert}
- Preferred Tools: {list tools you use}

**Communication Preferences:**
- Tone: {professional/casual/technical/friendly}
- Detail Level: {concise/balanced/comprehensive}
- Format: {bullet points/paragraphs/mixed}
- Technical Depth: {explain like I'm 5/assume expertise/somewhere in between}

**Current Focus:**
- Main Project: {what you're working on}
- Goals: {what you want to achieve}
- Challenges: {problems you're facing}
- Timeline: {relevant deadlines}

**Instructions for ALL Future Responses:**
1. Remember this context and reference it when relevant
2. Tailor explanations to my technical level
3. Use my preferred communication style
4. Align suggestions with my goals and tools
5. Consider my timeline and constraints
6. If context is unclear, ask before assuming

Acknowledge this by summarizing what you've learned about me and how you'll adjust your responses.

After setup, every question I ask should be answered with this context in mind.`,
        description: "Set up persistent context so AI remembers your background, preferences, and goals throughout the conversation.",
        user: mockUsers[9], // startup_founder
        category: mockCategories[5], // Productivity
        model: mockModels[0], // GPT-5
        tags: [],
        votes: 105,
        views: 548,
        commentCount: 42,
        verified: true,
        featured: true,
        createdAt: new Date("2025-11-28"),
        updatedAt: new Date("2025-12-21"),
    },
    {
        id: "prompt-16",
        title: "Red Team Strategy Analyst",
        slug: "red-team-strategy-analyst",
        content: `Act as a critical red team analyst. Your job is to find weaknesses, risks, and potential failures in ideas or plans.

**Idea/Plan to Analyze:**
{describe your idea, business plan, strategy, or proposal}

**Red Team Analysis Framework:**

1. **Assumption Challenge:**
   - What assumptions is this idea based on?
   - Which assumptions are most likely to be wrong?
   - What happens if key assumptions fail?

2. **Failure Mode Analysis:**
   - What are the top 5 ways this could fail?
   - What are the second-order effects of each failure?
   - Which failure modes are most likely? Most damaging?

3. **Competitive Response:**
   - How would competitors respond to this?
   - What countermoves would hurt this strategy?
   - What advantages do competitors have?

4. **Resource Reality Check:**
   - What resources does this really require?
   - Where are the resource bottlenecks?
   - What's being underestimated?

5. **Devil's Advocate Questions:**
   - Why might smart people disagree with this?
   - What contrarian viewpoint has merit?
   - What are we not seeing?

6. **Risk Mitigation:**
   - How can identified risks be mitigated?
   - What early warning signals should we monitor?
   - What's the contingency plan?

Be brutally honest. The goal is to strengthen the idea by exposing weaknesses before they become problems.`,
        description: "Get AI to critically analyze your ideas and find weaknesses before you invest time and resources.",
        user: mockUsers[9], // startup_founder
        category: mockCategories[2], // Business
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[6]],
        votes: 83,
        views: 394,
        commentCount: 31,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-05"),
        updatedAt: new Date("2025-12-18"),
    },
    {
        id: "prompt-17",
        title: "Technical Documentation Generator Pro",
        slug: "technical-documentation-generator-pro",
        content: `You are a senior technical writer specializing in developer documentation. Create comprehensive, clear technical documentation.

**Code/System to Document:**
\`\`\`
{paste your code, API, or system description}
\`\`\`

**Documentation Requirements:**

**1. Overview Section:**
- What it does (2-3 sentences)
- Who should use it
- Key benefits
- When to use vs alternatives

**2. Quick Start Guide:**
- Installation/setup (step-by-step)
- Minimal working example
- Expected output
- Common first-time issues

**3. Detailed Usage:**
- All available options/parameters
- Parameter types and validation rules
- Return values and types
- Code examples for each major use case

**4. Advanced Usage:**
- Complex scenarios with examples
- Performance considerations
- Best practices and patterns
- Integration with other tools/systems

**5. API Reference (if applicable):**
- Method signatures
- Request/response formats
- Error codes and handling
- Rate limits or constraints

**6. Troubleshooting Guide:**
- Common errors and solutions
- Debug mode instructions
- Where to get help

**7. Examples Gallery:**
- 5+ real-world usage examples
- Different complexity levels
- Commented code explaining why, not just what

Use clear headings, code syntax highlighting, tables where appropriate, and maintain consistent formatting. Target audience: {specify: beginners/intermediate/expert developers}.`,
        description: "Generate professional technical documentation with examples, troubleshooting, and best practices.",
        user: mockUsers[5], // techwriter_pro
        category: mockCategories[0], // Coding
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[4]],
        votes: 67,
        views: 312,
        commentCount: 24,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-07"),
        updatedAt: new Date("2025-12-17"),
    },
    {
        id: "prompt-18",
        title: "Email Response Strategist",
        slug: "email-response-strategist",
        content: `You are an expert in professional communication and email strategy. Help me craft the perfect email response.

**Email Context:**

**1. Original Email:**
{paste the email you received}

**2. My Situation:**
- What I want to achieve: {your goal}
- Relationship with sender: {boss/colleague/client/vendor/other}
- Urgency: {high/medium/low}
- Tone needed: {formal/friendly/assertive/diplomatic}

**3. Constraints:**
- Must address: {specific points to cover}
- Must avoid: {topics or phrases to avoid}
- Deadline consideration: {any time pressure}

**Your Task:**

1. **Analysis:**
   - What is the sender really asking for?
   - What's the subtext or emotional tone?
   - What response do they expect?
   - What are the politics or sensitivities?

2. **Strategy Recommendation:**
   - Best approach for this situation
   - What to emphasize
   - What to downplay or defer
   - Optimal email length and structure

3. **Draft Response Options:**
   Provide 2 versions:
   - **Version A (Direct):** Clear and straightforward
   - **Version B (Diplomatic):** More nuanced and careful

   For each version include:
   - Subject line (if needed)
   - Complete email body
   - Closing and signature suggestion

4. **Send Checklist:**
   - Key points covered? ✓/✗
   - Tone appropriate? ✓/✗
   - Attachments mentioned if needed? ✓/✗
   - Follow-up action clear? ✓/✗
   - Timing considerations? ✓/✗

5. **Alternative Considerations:**
   - Should this be a meeting instead?
   - Should you call first?
   - Should you loop in others?

Help me send an email that gets results while maintaining relationships.`,
        description: "Strategic email response drafting with tone analysis, multiple versions, and communication best practices.",
        user: mockUsers[7], // marketingmaven
        category: mockCategories[1], // Writing
        model: mockModels[0], // GPT-5
        tags: [],
        votes: 71,
        views: 358,
        commentCount: 27,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-09"),
        updatedAt: new Date("2025-12-20"),
    },
    {
        id: "prompt-19",
        title: "Code Review Checklist Generator",
        slug: "code-review-checklist-generator",
        content: `You are a senior software engineer conducting a thorough code review. Analyze the code systematically.

**Code to Review:**
\`\`\`{language}
{paste code here}
\`\`\`

**Project Context:**
- Language/Framework: {specify}
- Purpose: {what this code does}
- Team size: {solo/small/large}
- Production criticality: {low/medium/high}

**Comprehensive Review Checklist:**

**1. Functionality ⚙️**
- Does it work as intended?
- Edge cases handled?
- Error scenarios covered?
- Input validation present?

**2. Code Quality 📝**
- Readable and self-documenting?
- Appropriate naming conventions?
- Functions/methods single-purpose?
- Comments where needed (not obvious)?
- Consistent code style?

**3. Performance 🚀**
- Algorithm efficiency (time complexity)?
- Memory usage optimized?
- Unnecessary loops or operations?
- Database queries optimized?
- Caching opportunities?

**4. Security 🔒**
- Input sanitization?
- SQL injection vulnerabilities?
- XSS prevention?
- Authentication/authorization checks?
- Sensitive data handling?
- Dependencies with known vulnerabilities?

**5. Testing 🧪**
- Unit test coverage needed?
- Integration test scenarios?
- Mock strategies appropriate?
- Test edge cases?

**6. Maintainability 🔧**
- DRY principle followed?
- SOLID principles respected?
- Design patterns appropriate?
- Dependencies minimized?
- Future extension easy?

**7. Documentation 📚**
- Function/method documentation?
- Complex logic explained?
- API documentation if applicable?
- README updates needed?

**Review Output Format:**

✅ **What's Good:**
- Highlight strong points
- Well-implemented features

⚠️ **Issues Found:**
Priority levels: 🔴 Critical | 🟡 Moderate | 🟢 Minor

For each issue:
- Location (file:line)
- Description
- Impact
- Suggested fix with code example

📋 **Summary:**
- Overall assessment
- Must-fix before merge
- Nice-to-have improvements
- Estimated effort to address

💡 **Learning Opportunities:**
- Teach, don't just critique
- Explain WHY changes matter
- Share best practices`,
        description: "Systematic code review with security, performance, and best practices analysis plus actionable feedback.",
        user: mockUsers[2], // codecraft
        category: mockCategories[0], // Coding
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[12]],
        votes: 89,
        views: 431,
        commentCount: 35,
        verified: true,
        featured: true,
        createdAt: new Date("2025-12-02"),
        updatedAt: new Date("2025-12-19"),
    },
    {
        id: "prompt-20",
        title: "Research Paper Synthesizer",
        slug: "research-paper-synthesizer",
        content: `You are an academic research specialist who synthesizes complex research into actionable insights.

**Research Papers/Articles:**
{paste titles, abstracts, or full papers - up to 5 papers}

**Research Question:**
{what are you trying to understand or prove?}

**Synthesis Framework:**

**1. Unified Summary (Executive Overview):**
- What is the collective finding across all papers?
- What's the strongest evidence?
- What's the level of consensus vs. debate?
- Bottom line in 2-3 sentences

**2. Key Findings Matrix:**
Create a comparison table:
| Paper | Main Claim | Methodology | Sample Size | Key Finding | Limitations |
|-------|------------|-------------|-------------|-------------|-------------|

**3. Common Themes:**
- What patterns emerge across papers?
- What do most researchers agree on?
- What variables consistently matter?

**4. Contradictions & Debates:**
- Where do findings conflict?
- What explains the differences?
- Which position has stronger evidence?

**5. Methodology Analysis:**
- Which studies have strongest methodology?
- What are common methodological weaknesses?
- How does this affect confidence in findings?

**6. Practical Implications:**
- So what? Why does this matter?
- How can findings be applied?
- What actions do results suggest?

**7. Research Gaps:**
- What questions remain unanswered?
- What should be studied next?
- What limitations need addressing?

**8. Citation Recommendations:**
- Which papers are must-cites for {your purpose}?
- What's the strongest supporting evidence for {your hypothesis}?

**9. Strength of Evidence Assessment:**
Rate overall evidence quality: ⭐⭐⭐⭐⭐
- Study design quality
- Sample sizes and diversity
- Replication and consistency
- Real-world applicability

**Output Requirements:**
- Use academic language but stay accessible
- Cite papers as [Author, Year]
- Highlight limitations and caveats
- Separate correlation from causation
- Note when sample size is insufficient
- Flag potential conflicts of interest

Help me understand the research landscape and make evidence-based decisions.`,
        description: "Synthesize multiple research papers into unified findings with methodology analysis and practical implications.",
        user: mockUsers[8], // academic_writer
        category: mockCategories[3], // Research
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[9]],
        votes: 74,
        views: 367,
        commentCount: 28,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-04"),
        updatedAt: new Date("2025-12-16"),
    },
    {
        id: "prompt-21",
        title: "Meeting Agenda Optimizer",
        slug: "meeting-agenda-optimizer",
        content: `You are a productivity expert specializing in effective meetings. Create an optimized meeting agenda.

**Meeting Details:**
- Purpose: {what you want to achieve}
- Duration: {time available}
- Attendees: {roles/number of people}
- Meeting Type: {decision-making/brainstorm/status update/problem-solving}

**Current Agenda (if any):**
{paste existing agenda or topics to cover}

**Optimization Framework:**

**1. Meeting Necessity Check:**
- Could this be an email instead?
- Is everyone's attendance necessary?
- Is timing optimal for all?

**2. Optimized Agenda Structure:**

**Pre-Meeting (sent 24-48h before):**
- Meeting objective (1 sentence)
- Expected outcomes
- Pre-read materials
- Questions to consider in advance
- What attendees should prepare

**Meeting Flow:**

[0-5 min] **Quick Wins**
- Review objectives and success criteria
- Set ground rules
- Timekeeper and note-taker assigned

[5-X min] **Main Content Blocks**
For each topic provide:
- Topic name
- Time allocation
- Owner/presenter
- Discussion vs. decision vs. info-sharing
- Desired outcome

**Topic Ordering Strategy:**
1. Quick decisions first (build momentum)
2. Most critical items in middle (peak attention)
3. Generative/creative last (when people are loose)

[Final 5 min] **Closing**
- Decisions recap
- Action items with owners and deadlines
- Next steps
- Next meeting date (if needed)

**3. Engagement Tactics:**
- Ice breaker (if needed)
- How to ensure all voices heard
- Parking lot for off-topic items
- Breaks (if >1 hour)

**4. Success Metrics:**
- How will we know this meeting was successful?
- What should change after this meeting?

**5. Meeting Alternatives Considered:**
For any topic, note if it could be:
- ⚡ Email update
- 💬 Slack discussion
- 📊 Shared document
- 🎯 1-on-1 instead

**6. Action Item Template:**
| Action | Owner | Deadline | Dependencies | Status |
|--------|-------|----------|--------------|--------|

**7. Follow-up Plan:**
- When notes will be sent (within 2h recommended)
- How decisions will be tracked
- When to check progress on action items

Make this meeting so effective that people actually want to attend.`,
        description: "Transform meetings into productive sessions with optimized agendas, time management, and clear outcomes.",
        user: mockUsers[14], // product_manager
        category: mockCategories[5], // Productivity
        model: mockModels[0], // GPT-5
        tags: [],
        votes: 81,
        views: 398,
        commentCount: 32,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-06"),
        updatedAt: new Date("2025-12-18"),
    },
    {
        id: "prompt-22",
        title: "Competitor Analysis Deep Dive",
        slug: "competitor-analysis-deep-dive",
        content: `You are a competitive intelligence analyst. Conduct a comprehensive competitor analysis.

**My Business:**
- Product/Service: {what you offer}
- Target Market: {who you serve}
- Key Value Proposition: {what makes you different}

**Competitor to Analyze:**
- Name: {competitor name}
- Website: {URL if available}
- What you know: {any existing information}

**Comprehensive Analysis Framework:**

**1. Company Overview:**
- Year founded and funding history
- Team size and key leadership
- Geographic presence
- Business model
- Revenue estimates (if public)

**2. Product/Service Analysis:**
- Core offerings breakdown
- Feature comparison matrix vs. our product
- Pricing strategy and tiers
- Technology stack (if known)
- Recent product updates

**3. Market Position:**
- Target customer segments
- Market share estimates
- Brand positioning
- Unique value propositions
- Strengths and weaknesses

**4. Go-to-Market Strategy:**
- Sales approach (direct/indirect/PLG)
- Marketing channels used
- Content strategy and messaging
- Partnership ecosystem
- Customer acquisition tactics

**5. Digital Footprint Analysis:**
- Website UX and messaging
- SEO strategy and ranking keywords
- Social media presence and engagement
- Review sites and ratings
- App store presence (if applicable)

**6. Customer Insights:**
- What customers love (from reviews)
- Common complaints and pain points
- Feature requests from users
- Customer testimonials themes
- Case studies and use cases

**7. SWOT Analysis:**

**Strengths:**
- What they do exceptionally well
- Competitive advantages
- Resources and capabilities

**Weaknesses:**
- Gaps in product or service
- Negative customer feedback patterns
- Operational limitations

**Opportunities (for us):**
- Gaps we can exploit
- Market segments they ignore
- Features they lack

**Threats (to us):**
- Where they're stronger
- Their potential next moves
- Partnership advantages

**8. Strategic Recommendations:**

**Differentiation Opportunities:**
- How to position against them
- Features to emphasize
- Market segments to target

**Competitive Response:**
- If they price cut, we should...
- If they add feature X, we should...
- If they partner with Y, we should...

**Watch List:**
- Metrics to monitor monthly
- Signals of strategic shifts
- Early warning indicators

**9. Battle Card Summary:**
*One-page competitive brief for sales team*

**When Prospect Says:** | **We Respond:** |
|---------------------|-----------------|
| "Competitor has X" | "True, but we..." |

**10. Intelligence Gaps:**
- What we don't know but should
- How to gather this information
- Priority of each intelligence need

Be objective. Acknowledge where competitors are strong. The goal is strategic advantage, not wishful thinking.`,
        description: "Systematic competitor analysis with SWOT, customer insights, and strategic recommendations for positioning.",
        user: mockUsers[9], // startup_founder
        category: mockCategories[2], // Business
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[6]],
        votes: 76,
        views: 341,
        commentCount: 25,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-08"),
        updatedAt: new Date("2025-12-17"),
    },
    {
        id: "prompt-23",
        title: "Content Repurposing Machine",
        slug: "content-repurposing-machine",
        content: `You are a content strategist who maximizes ROI by repurposing single pieces of content across multiple platforms.

**Original Content:**
{paste your blog post, article, video transcript, presentation, etc.}

**Content Type:** {blog/video/podcast/presentation/research}

**Repurposing Strategy:**

**1. Content Analysis:**
- Main topic and key messages
- 5 most important insights
- Quotable moments
- Data points or statistics
- Stories or examples
- Unique angles or hot takes

**2. Platform-Specific Adaptations:**

**Twitter/X Thread (10-15 tweets):**
- Hook tweet
- Main thread with insights
- Call-to-action
- Engaging format with emojis and line breaks

**LinkedIn Post:**
- Professional tone adaptation
- Industry-relevant angle
- Personal story or insight
- Optimal length (1300-1500 chars)

**Instagram Caption:**
- Visual description
- Casual, engaging tone
- Hashtag strategy (15-20 relevant tags)
- Story-first approach

**TikTok/Reels Script:**
- Hook (first 3 seconds)
- Main points in 30-60 sec format
- Trending audio suggestions
- On-screen text suggestions

**Email Newsletter Section:**
- Compelling subject line
- Email-friendly formatting
- Personal tone
- Clear CTA

**YouTube Short/Clip:**
- 60-second script
- Retention hooks every 15 seconds
- B-roll suggestions
- Title and description

**3. Visual Content Ideas:**
- 5 infographic concepts from data
- Quote cards (3-5 with background suggestions)
- Carousel post outline (8-10 slides)
- Thumbnail concepts

**4. SEO Content Derivatives:**
- 3 blog post spin-offs
- FAQ schema from common questions
- "Ultimate Guide" outline expansion
- Listicle versions

**5. Content Cluster Strategy:**
- Hub content (main piece)
- 5-7 spoke content ideas
- Internal linking structure
- Topic cluster map

**6. Engagement Tactics:**
- Poll questions for each platform
- Discussion starters
- Challenges or exercises
- Debate prompts

**7. Scheduling Strategy:**

| Platform | Format | Post Time | Frequency |
|----------|--------|-----------|-----------|
| Twitter | Thread | {suggested} | {frequency} |

**8. Metrics to Track:**
- Engagement rate
- Reach
- Shares/saves
- Click-through rate
- Conversions

**9. Content Calendar:**
Week 1: {platform and format}
Week 2: {platform and format}
Week 3: {platform and format}
Week 4: {platform and format}

**10. Amplification Checklist:**
- Tag relevant accounts
- Use trending hashtags
- Cross-promote on platforms
- Engage with comments
- Share in communities/groups

Turn 1 piece of content into 30+ social posts and drive 10x more engagement from the same effort.`,
        description: "Repurpose one piece of content into 30+ platform-specific posts with captions, hooks, and scheduling strategy.",
        user: mockUsers[12], // content_creator
        category: mockCategories[7], // Marketing
        model: mockModels[0], // GPT-5
        tags: [mockTags[8]],
        votes: 94,
        views: 476,
        commentCount: 39,
        verified: true,
        featured: true,
        createdAt: new Date("2025-11-30"),
        updatedAt: new Date("2025-12-20"),
    },
    {
        id: "prompt-24",
        title: "System Architecture Designer",
        slug: "system-architecture-designer",
        content: `You are a senior software architect designing scalable systems. Create comprehensive system architecture.

**System Requirements:**

**Functional Requirements:**
- What the system must do: {list core features}
- User types: {who will use it}
- Scale: {expected users/traffic}

**Non-Functional Requirements:**
- Performance: {response time, throughput needs}
- Scalability: {growth expectations}
- Security: {compliance, data sensitivity}
- Availability: {uptime requirements}
- Budget: {constraints}

**Current State:**
- Existing systems: {what you have}
- Tech stack: {current technologies}
- Team expertise: {what team knows}

**Architecture Design Framework:**

**1. High-Level Architecture:**

Create system diagram including:
- Client layer (web/mobile/APIs)
- Application layer (services/microservices)
- Data layer (databases, caches, queues)
- Infrastructure layer (cloud, CDN, load balancers)

Use text-based diagram:
\`\`\`
[Client] --> [Load Balancer] --> [API Gateway]
                                      |
            +-------------------------+-------------------------+
            |                         |                         |
        [Service A]               [Service B]               [Service C]
            |                         |                         |
        [Database A]              [Cache]                  [Queue]
\`\`\`

**2. Component Breakdown:**

For each major component:
- **Purpose:** What it does
- **Technology Choice:** Recommended tech and why
- **Scaling Strategy:** How to scale this component
- **Data Flow:** How data moves through it
- **Failure Handling:** What happens if it fails

**3. Data Architecture:**

- **Data Models:** Key entities and relationships
- **Database Choice:** SQL vs NoSQL justification
- **Sharding Strategy:** If needed
- **Caching Layer:** What to cache and where
- **Data Consistency:** Consistency model chosen

**4. API Design:**

- **API Style:** REST/GraphQL/gRPC and why
- **Versioning Strategy:** How to handle changes
- **Authentication:** Method and implementation
- **Rate Limiting:** Strategy and limits
- **Key Endpoints:** Main API contracts

**5. Scalability Plan:**

**Vertical Scaling:**
- When to upgrade instances
- Resource limits

**Horizontal Scaling:**
- Stateless design approach
- Load balancing strategy
- Session management
- Database read replicas

**Scaling Triggers:**
- CPU > 70%: {action}
- Memory > 80%: {action}
- Response time > X: {action}

**6. Security Architecture:**

- **Authentication & Authorization:** Implementation
- **Data Encryption:** At rest and in transit
- **API Security:** Keys, OAuth, rate limiting
- **Network Security:** VPC, firewalls, DDoS protection
- **Compliance:** GDPR, SOC2, etc.

**7. Reliability & Resilience:**

- **Redundancy:** Multi-AZ, failover
- **Circuit Breakers:** Prevent cascade failures
- **Retry Logic:** Exponential backoff
- **Health Checks:** Monitoring points
- **Disaster Recovery:** Backup and restore plan

**8. Monitoring & Observability:**

- **Metrics to Track:** CPU, memory, latency, errors
- **Logging Strategy:** What to log and where
- **Alerting Rules:** When to notify on-call
- **Dashboards:** Key visualizations needed
- **Distributed Tracing:** Request flow tracking

**9. Technology Stack Recommendations:**

| Layer | Technology | Justification | Alternatives Considered |
|-------|------------|---------------|------------------------|
| Frontend | {tech} | {why} | {other options} |
| Backend | {tech} | {why} | {other options} |
| Database | {tech} | {why} | {other options} |

**10. Implementation Phases:**

**Phase 1 (MVP - Month 1-2):**
- Core features
- Basic infrastructure
- Minimal viable scale

**Phase 2 (Growth - Month 3-4):**
- Additional features
- Performance optimization
- Monitoring improvements

**Phase 3 (Scale - Month 5-6):**
- Advanced features
- Full scaling implementation
- Security hardening

**11. Cost Estimation:**

- Infrastructure costs: \${estimate}/month
- Scaling costs at 10x: \${estimate}/month
- Cost optimization opportunities

**12. Risks & Mitigations:**

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| {risk} | High/Med/Low | High/Med/Low | {how to address} |

**13. Decision Log:**

Major architectural decisions with rationale:
- **Decision:** Chose microservices over monolith
- **Context:** {situation}
- **Rationale:** {reasoning}
- **Consequences:** {trade-offs}

Design architecture that's scalable, maintainable, and aligned with business goals.`,
        description: "Complete system architecture design with diagrams, technology choices, scaling strategy, and implementation phases.",
        user: mockUsers[13], // fullstack_dev
        category: mockCategories[0], // Coding
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [],
        votes: 85,
        views: 419,
        commentCount: 33,
        verified: true,
        featured: true,
        createdAt: new Date("2025-12-01"),
        updatedAt: new Date("2025-12-19"),
    },
    {
        id: "prompt-25",
        title: "User Interview Script Generator",
        slug: "user-interview-script-generator",
        content: `You are a UX researcher creating effective user interview guides. Design questions that uncover real insights.

**Research Context:**

**Product/Feature:**
{what you're researching}

**Research Goals:**
{what you want to learn}

**User Segment:**
{who you're interviewing}

**Interview Type:**
{discovery/usability/validation/feedback}

**Interview Script Framework:**

**Pre-Interview Setup (5 min):**

**Environment Check:**
- "Are you in a quiet place where we can talk for {X} minutes?"
- "Can I record this session for note-taking? The recording is only for internal use and won't be shared."
- "Any questions before we start?"

**Set Expectations:**
- Duration: {time}
- Purpose: {brief explanation}
- No wrong answers - we want honest feedback
- You can skip any question

**Part 1: Warm-Up Questions (5-7 min):**
*Build rapport, understand context*

- Tell me about your role/day-to-day
- Walk me through a typical {day/workflow/task}
- What tools do you currently use for {task}?
- What's working well? What's frustrating?

**Part 2: Past Behavior (10-15 min):**
*Understand actual behavior, not aspirational*

**Ask about specific recent examples:**
- "Tell me about the last time you {did X task}"
- "Walk me through exactly what you did, step by step"
- "What were you thinking at each step?"
- "What made that hard/easy?"
- "What would have made it better?"

**Follow-up Probes:**
- "Can you show me what that looked like?"
- "Why did you do it that way?"
- "What alternatives did you consider?"
- "How often does that happen?"

**Part 3: Pain Points Deep Dive (10-15 min):**

- "What's the most frustrating part of {task}?"
- "Why is that frustrating?"
- "What have you tried to solve this?"
- "How much time does this cost you?"
- "If you had a magic wand, what would you change?"

**The Five Whys Technique:**
For each pain point:
- Why is that a problem?
- And why does that matter?
- Why is that important to you?
- What impact does that have?
- And why does that affect you?

**Part 4: Solution Testing (if applicable) (10-15 min):**

**Show prototype/concept:**
- "What do you think this does?"
- "How would you use this?"
- "Walk me through completing {task}"
- "What's confusing?"
- "What would you change?"
- "Would you use this? Why/why not?"
- "What's missing?"

**Part 5: Prioritization & Context (5-10 min):**

- "If you could only fix one thing, what would it be?"
- "How does this compare to other problems you face?"
- "What would make you switch to a new solution?"
- "What would convince your team/boss to adopt this?"
- "How much would you pay for a solution to {problem}?"

**Part 6: Wrap-Up (3-5 min):**

- "What haven't I asked that I should have?"
- "Is there anything else you'd like to share?"
- "Do you know others who might be interested in talking?"
- "Can I follow up if we have more questions?"

**Thank you + next steps**

**Interviewer Reminders:**

✅ **DO:**
- Ask open-ended questions
- Use silence (wait 5 seconds after they finish)
- Ask for specific examples
- Dig into "why"
- Take notes on exact words they use
- Ask for clarification
- Follow interesting tangents

❌ **DON'T:**
- Lead the witness ("Don't you think...")
- Ask yes/no questions
- Pitch your solution
- Interrupt
- Explain too much upfront
- Ask about hypothetical future behavior
- Make them feel wrong

**Note-Taking Template:**

**Interview ID:** #{number}
**Date:** {date}
**Duration:** {time}
**Participant:** {anonymous ID}

**Key Quotes:**
- "{verbatim quotes}"

**Pain Points:**
1. {pain} - Severity: High/Med/Low - Frequency: Daily/Weekly/Monthly

**Feature Reactions:**
- Feature X: {reaction} - Would use: Yes/Maybe/No

**Insights:**
- {surprising learnings}

**Follow-up Items:**
- {things to investigate further}

**After Interview:**

1. Send thank you email within 24h
2. Synthesize notes within 48h
3. Share key insights with team
4. Update research repository
5. Identify patterns across interviews

Get insights that actually drive product decisions, not just confirm assumptions.`,
        description: "Comprehensive user interview script with psychology-based questions that uncover real needs and behaviors.",
        user: mockUsers[10], // ux_designer
        category: mockCategories[3], // Research
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [],
        votes: 69,
        views: 328,
        commentCount: 22,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-10"),
        updatedAt: new Date("2025-12-19"),
    },
    {
        id: "prompt-26",
        title: "Learning Path Creator",
        slug: "learning-path-creator",
        content: `You are a learning strategist who creates personalized, efficient learning paths for any skill.

**Learning Goal:**
{what skill do you want to learn?}

**Current Level:**
{complete beginner / some exposure / intermediate / advanced in related area}

**Time Available:**
{hours per week}

**Learning Style Preference:**
{video / reading / hands-on / mixed}

**Target Deadline:**
{when do you need this skill?}

**Motivation/Use Case:**
{why are you learning this? what will you use it for?}

**Personalized Learning Path:**

**1. Skill Assessment:**

**Current State:**
- What you already know
- Transferable skills from other areas
- Knowledge gaps to fill

**Target State:**
- Specific competency level needed
- Key capabilities required
- Success criteria (how to know you've learned it)

**2. Learning Roadmap:**

**Foundation Phase (Week 1-{X}):**
*Essential concepts you must understand*

- Core Concept 1: {concept}
  - Why it matters: {context}
  - Resources: {specific courses, articles, videos}
  - Practice: {hands-on exercise}
  - Milestone: {how to test understanding}

- Core Concept 2...

**Skill-Building Phase (Week {X}-{Y}):**
*Practical application and deeper knowledge*

- Skill 1: {skill}
  - Build project: {specific project idea}
  - Resources: {tutorials, docs}
  - Common mistakes: {what to avoid}
  - Checkpoint: {what you should be able to do}

**Advanced Phase (Week {Y}-{Z}):**
*Mastery and real-world application*

- Advanced Topic 1
- Capstone project
- Portfolio piece

**3. Curated Resources:**

**Primary Learning Sources:**
1. {Resource name} - {why this one} - {time investment}
2. {Resource name} - {why this one} - {time investment}

**Supplementary:**
- Documentation: {official docs to bookmark}
- Practice platforms: {where to practice}
- Communities: {where to ask questions}
- Newsletters/blogs: {stay current}

**4. Weekly Study Plan:**

**Template:**
- Monday: {activity} - {time} - {resource}
- Tuesday: {activity} - {time} - {resource}
- Wednesday: {activity} - {time} - {resource}
- Thursday: Review + practice
- Friday: Build something
- Weekend: Capstone project work

**5. Project-Based Learning:**

**Beginner Projects:**
1. {Project name} - Teaches: {concepts} - Time: {estimate}
2. {Project name} - Teaches: {concepts} - Time: {estimate}

**Intermediate Projects:**
1. {More complex project}

**Advanced/Portfolio Project:**
{Comprehensive project that demonstrates mastery}

**6. Learning Strategies:**

**For Video Learners:**
- Speed: Watch at 1.5-2x
- Active: Code along, don't just watch
- Review: Make notes, revisit confusing parts

**For Reading Learners:**
- Technique: SQ3R (Survey, Question, Read, Recite, Review)
- Retention: Explain concepts in your own words
- Application: Build examples as you read

**For Hands-On Learners:**
- Approach: Tutorial hell escape plan
- Method: Build, break, fix, understand why
- Progression: Smaller projects → bigger projects

**7. Spaced Repetition Plan:**

**Day 1:** Learn new concept
**Day 3:** Quick review (5 min)
**Week 1:** Practice application
**Week 2:** Teach it to someone or write about it
**Month 1:** Use in real project

**8. Common Pitfalls to Avoid:**

❌ **Tutorial Hell:** Watching tutorials forever without building
  ✅ Instead: Build projects, look up help as needed

❌ **Perfectionism:** Trying to learn everything before starting
  ✅ Instead: Learn just enough, then build

❌ **No Structure:** Random learning without progression
  ✅ Instead: Follow this path sequentially

❌ **Passive Learning:** Just reading/watching
  ✅ Instead: Type every code example, modify it, break it

**9. Progress Tracking:**

**Week 1 Milestone:** {specific achievement}
- Can you: {skill check}
- Build: {simple project}

**Week 4 Milestone:** {achievement}
**Week 8 Milestone:** {achievement}
**Final Milestone:** {mastery indicator}

**Self-Assessment Checklist:**
□ Can explain {concept} to a beginner
□ Built {X} projects from scratch
□ Solved {Y} real problems
□ Comfortable reading documentation
□ Can debug issues independently
□ Know where to find help

**10. Study Techniques for Retention:**

**Active Recall:**
- Close the tutorial, build from memory
- Explain concepts out loud
- Write code without references

**Feynman Technique:**
- Teach the concept to a rubber duck
- If you can't explain it simply, you don't understand it

**Practice Spacing:**
- Don't cram
- 1 hour/day > 7 hours on Sunday
- Sleep between learning sessions

**11. Troubleshooting Learning Blocks:**

**If stuck on concept:**
- Find 3 different explanations
- Build simplest possible example
- Ask in community with specific question

**If losing motivation:**
- Build something fun, not just tutorials
- Share progress publicly
- Join a learning cohort or find accountability partner

**If overwhelmed:**
- Break into smaller chunks
- Master one thing before adding more
- It's okay to slow down

**12. Graduation Criteria:**

You've mastered this skill when you can:
✅ Build {specific thing} from scratch
✅ Debug errors without googling every time
✅ Explain core concepts to others
✅ Choose right approach for different scenarios
✅ Read and understand documentation
✅ Contributing to real projects

**Next Steps After Mastery:**
- Advanced specialization: {topic}
- Related skills to stack: {skills}
- How to stay current: {resources}

Learn efficiently. Skip the fluff. Build real things. Ship your first project by week {X}.`,
        description: "Personalized learning roadmap with curated resources, projects, time estimates, and strategies to avoid tutorial hell.",
        user: mockUsers[8], // academic_writer
        category: mockCategories[6], // Education
        model: mockModels[0], // GPT-5
        tags: [],
        votes: 97,
        views: 512,
        commentCount: 41,
        verified: true,
        featured: true,
        createdAt: new Date("2025-11-29"),
        updatedAt: new Date("2025-12-21"),
    },
    {
        id: "prompt-27",
        title: "SQL Query Optimizer & Explainer",
        slug: "sql-query-optimizer-explainer",
        content: `You are a database performance expert. Analyze, optimize, and explain SQL queries.

**SQL Query to Optimize:**
\`\`\`sql
{paste your SQL query here}
\`\`\`

**Database Context:**
- Database Type: {PostgreSQL/MySQL/SQL Server/Oracle/etc.}
- Table Sizes: {rough row counts}
- Query Purpose: {what this query does}
- Current Performance: {if known: execution time, issues}
- Indexes: {existing indexes if known}

**Comprehensive Analysis:**

**1. Query Explanation:**

**Plain English:**
Explain what this query does in simple terms a non-technical person could understand.

**Step-by-Step Breakdown:**
For each clause, explain:
- What it does
- Why it's needed
- How it affects results

**Data Flow:**
1. First, the database...
2. Then it...
3. Finally it...

**2. Performance Analysis:**

**Execution Plan:**
- Expected table scan type (full scan/index scan)
- Join strategy used
- Estimated rows processed at each step
- Expensive operations (sorts, temp tables, etc.)

**Bottlenecks Identified:**
🔴 Critical Issues:
- {issue} - Impact: {description} - Fix Priority: High

🟡 Moderate Issues:
- {issue} - Impact: {description} - Fix Priority: Medium

🟢 Minor Optimizations:
- {issue} - Impact: {description} - Fix Priority: Low

**3. Optimized Query:**

\`\`\`sql
-- OPTIMIZED VERSION
-- Changes made: {list of optimizations applied}

{optimized SQL query}
\`\`\`

**Optimization Techniques Applied:**
1. {technique} - Why: {reason} - Expected improvement: {estimate}
2. {technique} - Why: {reason} - Expected improvement: {estimate}

**4. Index Recommendations:**

**Create These Indexes:**
\`\`\`sql
-- Index 1: For {purpose}
CREATE INDEX idx_{name} ON {table}({columns})
  {INCLUDE} ({columns}) -- if needed
  {WHERE clause} -- for partial index if applicable
;

-- Rationale: {why this helps}
-- Estimated improvement: {%}
\`\`\`

**5. Query Variations:**

**Alternative Approach 1: {description}**
\`\`\`sql
{alternative query}
\`\`\`
Pros: {benefits}
Cons: {trade-offs}
When to use: {scenarios}

**Alternative Approach 2: {description}**
\`\`\`sql
{another alternative}
\`\`\`

**6. Best Practices Applied:**

✅ Use specific columns instead of SELECT *
✅ Filter early (WHERE before JOIN when possible)
✅ Use appropriate JOIN types
✅ Avoid subqueries in SELECT clause
✅ Use EXISTS instead of IN for large datasets
✅ Limit result set early
✅ Use UNION ALL instead of UNION when possible
✅ Avoid functions on indexed columns in WHERE
✅ Use covering indexes
✅ Consider denormalization for frequently joined tables

**7. Common Anti-Patterns to Avoid:**

❌ **SELECT * FROM large_table**
  ✅ Select only needed columns

❌ **WHERE function(column) = value**
  ✅ WHERE column = inverse_function(value)

❌ **OR in WHERE clause**
  ✅ Use UNION or IN() instead

❌ **NOT IN with NULLs**
  ✅ Use NOT EXISTS or LEFT JOIN WHERE NULL

❌ **Implicit type conversions**
  ✅ Explicit CAST

**8. Testing & Validation:**

**Before Optimization:**
\`\`\`sql
EXPLAIN ANALYZE {original query}
\`\`\`

**After Optimization:**
\`\`\`sql
EXPLAIN ANALYZE {optimized query}
\`\`\`

**Metrics to Compare:**
- Execution time: {before} → {after}
- Rows scanned: {before} → {after}
- Index usage: {before} → {after}
- Temp table usage: {before} → {after}

**9. Edge Cases & Considerations:**

- What happens with empty tables?
- NULL handling correct?
- Duplicate prevention needed?
- Transaction isolation level impact?
- Concurrent query performance?

**10. Monitoring Recommendations:**

**Add Slow Query Logging:**
\`\`\`sql
-- Log queries slower than 1 second
SET slow_query_log_file = '/var/log/mysql/slow.log';
SET long_query_time = 1;
SET log_slow_queries = 1;
\`\`\`

**Query Performance Metrics to Track:**
- Average execution time
- 95th percentile latency
- Query frequency
- Index hit rate
- Lock wait time

**11. Documentation:**

\`\`\`sql
/*
Query Purpose: {what this does}
Performance: {expected time}
Indexes Required: {list}
Maintenance Notes: {important info}
Last Optimized: {date}
*/
{final query}
\`\`\`

Make queries fast, maintainable, and explainable to anyone on the team.`,
        description: "Deep SQL analysis with performance bottlenecks, optimized query, index recommendations, and execution plan explanation.",
        user: mockUsers[11], // data_scientist
        category: mockCategories[0], // Coding
        model: mockModels[6], // Claude Sonnet 4.5
        tags: [mockTags[13]],
        votes: 73,
        views: 356,
        commentCount: 26,
        verified: true,
        featured: false,
        createdAt: new Date("2025-12-11"),
        updatedAt: new Date("2025-12-18"),
    },
    {
        id: "prompt-28",
        title: "Product Launch Checklist Generator",
        slug: "product-launch-checklist-generator",
        content: `You are a product launch specialist. Create a comprehensive pre-launch checklist to ensure nothing is forgotten.

**Product Details:**
- Product: {name and brief description}
- Launch Type: {MVP/major feature/new product/redesign}
- Target Audience: {who it's for}
- Launch Date: {when}
- Team Size: {people involved}

**Comprehensive Launch Checklist:**

**8 Weeks Before Launch:**

**Product Readiness:**
□ Core features complete and tested
□ Performance benchmarks met ({specify targets})
□ Security audit completed
□ Accessibility standards met (WCAG 2.1 AA)
□ Mobile responsiveness verified
□ Browser compatibility tested (Chrome, Firefox, Safari, Edge)
□ API documentation complete
□ Error handling and edge cases covered
□ Load testing completed (expected traffic + 30%)
□ Backup and rollback plan prepared

**Technical Infrastructure:**
□ Production environment configured
□ SSL certificates installed
□ CDN configured
□ Database backups automated
□ Monitoring tools set up (uptime, errors, performance)
□ Analytics tracking implemented
□ A/B testing framework ready (if needed)
□ Feature flags in place
□ Staging environment mirrors production
□ DNS propagation started

**6 Weeks Before Launch:**

**Content & Messaging:**
□ Value proposition clearly defined
□ Product positioning statement finalized
□ Key messages for different segments documented
□ Elevator pitch (30-second version) ready
□ FAQ page created (minimum 20 questions)
□ Press release drafted
□ Launch blog post written
□ Demo video scripted and filmed
□ Screenshots and assets prepared (2400x1600 minimum)
□ Customer testimonials gathered (if applicable)

**Marketing Assets:**
□ Landing page designed and developed
□ Email sequences written (pre-launch, launch, post-launch)
□ Social media calendar for 2 weeks (all platforms)
□ Paid ad creative and copy ready
□ Product Hunt submission prepared
□ Reddit/community launch posts drafted
□ Influencer/partner outreach list created
□ Press kit assembled (logo, screenshots, description)

**4 Weeks Before Launch:**

**Legal & Compliance:**
□ Terms of Service updated
□ Privacy Policy compliant with regulations (GDPR, CCPA)
□ Cookie consent banner implemented
□ Data processing agreements signed (if applicable)
□ Trademark search completed
□ Domain ownership verified
□ Backup email domain configured
□ DMCA agent registered (if needed)

**Support Readiness:**
□ Help center articles written (minimum 15 articles)
□ Support ticket system tested
□ Chatbot or live chat configured
□ Support team trained on new features
□ Canned responses prepared for common questions
□ Escalation process documented
□ Support hours and SLAs defined
□ Onboarding flow user-tested
□ Tutorial videos created

**2 Weeks Before Launch:**

**Beta Testing:**
□ Beta users recruited (target: {number})
□ Beta feedback collected and analyzed
□ Critical bugs from beta fixed
□ Beta tester testimonials gathered
□ Product refined based on feedback
□ Final UAT (User Acceptance Testing) completed

**Pre-Launch Marketing:**
□ Email list warmed up (send 2-3 value emails first)
□ Waitlist created and promoted
□ Teaser content posted on social media
□ Product Hunt page set up (ship date scheduled)
□ Press outreach sent (embargo details if applicable)
□ Partnership announcements coordinated
□ Early access or beta program closed
□ Launch day influencer posts scheduled

**1 Week Before Launch:**

**Final Testing:**
□ Full regression testing completed
□ Payment processing tested (if applicable)
□ Email deliverability tested
□ Mobile app submitted to stores (if applicable)
□ Signup/onboarding flow tested end-to-end
□ All CTAs work correctly
□ Analytics events firing properly
□ Social share buttons functional
□ Forms submitting correctly
□ 404 and error pages designed

**Team Preparation:**
□ Launch day responsibilities assigned
□ Communication channels set up (Slack, etc.)
□ War room scheduled (if needed)
□ Customer support shifts planned
□ Backup contacts identified
□ Celebration plan made! 🎉

**24 Hours Before Launch:**

**Final Checks:**
□ Code freeze implemented
□ Staging environment final check
□ Database migration rehearsed
□ Rollback procedure documented and tested
□ On-call schedule confirmed
□ Server capacity verified
□ Rate limiting configured
□ DDoS protection active
□ Backup systems tested

**Marketing Activation:**
□ Email blast scheduled
□ Social media posts scheduled
□ Paid ads set to activate
□ Product Hunt launch time confirmed
□ Press release ready to send
□ Affiliate links generated
□ Discount codes created (if applicable)
□ Announcement banner ready for website

**Launch Day:**

**Morning (Before Launch):**
□ Final team sync call
□ All systems green check
□ Support team online and ready
□ Coffee acquired ☕
□ Deep breath taken

**Launch Moment:**
□ Deploy to production
□ Monitor error rates for 15 minutes
□ Smoke test critical user flows
□ Send launch email blast
□ Publish social media announcements
□ Submit to Product Hunt
□ Send press release
□ Update website with announcement banner
□ Notify waitlist
□ Post in relevant communities (Reddit, forums, etc.)

**First 4 Hours:**
□ Monitor server performance
□ Respond to social media mentions
□ Answer support tickets < 1 hour response time
□ Track signups and conversions
□ Fix any critical bugs immediately
□ Engage with Product Hunt comments
□ Thank early adopters publicly
□ Monitor analytics dashboard

**First 24 Hours:**
□ Publish launch day recap (quick stats)
□ Thank partners and supporters
□ Respond to all feedback
□ Address any issues that arose
□ Collect user testimonials
□ Monitor media coverage
□ Start A/B tests (if planned)

**Week 1 Post-Launch:**

**Optimization:**
□ Analyze analytics data
□ Review support tickets for patterns
□ Fix non-critical bugs
□ Optimize conversion funnel
□ Adjust messaging based on feedback
□ Iterate on onboarding based on drop-off points

**Communication:**
□ Send thank you email to supporters
□ Publish case studies or success stories
□ Share metrics (if comfortable)
□ Respond to all reviews and feedback
□ Plan follow-up marketing campaigns

**Team Review:**
□ Post-mortem meeting (what went well/wrong)
□ Document lessons learned
□ Celebrate wins with team 🎊
□ Plan next iteration/features
□ Update roadmap based on feedback

**Ongoing (Weeks 2-4):**
□ Weekly metrics review
□ Continue content marketing
□ Nurture early users
□ Gather detailed feedback
□ Plan first major update
□ Monitor churn and retention
□ Build referral program (if applicable)

**Launch Day Emergency Kit:**

**If Site Goes Down:**
1. Activate status page
2. Post on social media
3. Send email to active users
4. Implement rollback if needed
5. Fix and redeploy ASAP

**If Critical Bug Found:**
1. Assess impact
2. Hot-fix if < 100 users affected
3. Rollback if > 100 users affected
4. Communicate transparently

**If Overwhelming Traffic:**
1. Monitor servers
2. Activate auto-scaling
3. Implement rate limiting
4. Add caching layers
5. Graceful degradation of non-critical features

**Success Metrics to Track:**

**Day 1:**
- Signups: {target}
- Conversions: {target}
- Social mentions: {target}
- Product Hunt ranking: {target}
- Error rate: < {threshold}

**Week 1:**
- Active users: {target}
- Feature adoption: {target}%
- Support tickets: trend
- NPS score: {target}

**Month 1:**
- Revenue (if applicable): \${target}
- Retention: {target}%
- Churn: < {threshold}%
- User satisfaction: {target}/5

Launch successfully. Nothing forgotten. Ship with confidence.`,
        description: "Comprehensive product launch checklist covering 8 weeks pre-launch to 1 month post-launch with emergency protocols.",
        user: mockUsers[14], // product_manager
        category: mockCategories[2], // Business
        model: mockModels[0], // GPT-5
        tags: [],
        votes: 88,
        views: 445,
        commentCount: 36,
        verified: true,
        featured: true,
        createdAt: new Date("2025-11-27"),
        updatedAt: new Date("2025-12-20"),
    },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Cached combined prompts for performance
let _allPrompts: Prompt[] | null = null;

// Get all prompts from both sources (original + extended)
export function getAllCombinedPrompts(): Prompt[] {
    if (!_allPrompts) {
        _allPrompts = [...mockPrompts, ...getExtendedPrompts()];
    }
    return _allPrompts;
}

export function getPromptBySlug(slug: string): Prompt | undefined {
    return getAllCombinedPrompts().find((p) => p.slug === slug);
}

export function getPromptsByCategory(categorySlug: string): Prompt[] {
    return getAllCombinedPrompts().filter((p) => p.category.slug === categorySlug);
}

export function getPromptsByModel(modelSlug: string): Prompt[] {
    return getAllCombinedPrompts().filter((p) => p.model.slug === modelSlug);
}

export function getTrendingPrompts(limit = 6): Prompt[] {
    // Simple trending algorithm: votes / age
    return [...getAllCombinedPrompts()]
        .sort((a, b) => {
            const ageA = (Date.now() - a.createdAt.getTime()) / (1000 * 60 * 60);
            const ageB = (Date.now() - b.createdAt.getTime()) / (1000 * 60 * 60);
            const scoreA = a.votes / Math.pow(ageA + 2, 1.5);
            const scoreB = b.votes / Math.pow(ageB + 2, 1.5);
            return scoreB - scoreA;
        })
        .slice(0, limit);
}

export function getFeaturedPrompts(limit = 3): Prompt[] {
    return getAllCombinedPrompts().filter((p) => p.featured).slice(0, limit);
}

export function getRecentPrompts(limit = 6): Prompt[] {
    return [...getAllCombinedPrompts()]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit);
}

export function getTopPrompts(limit = 10): Prompt[] {
    return [...getAllCombinedPrompts()]
        .sort((a, b) => b.votes - a.votes)
        .slice(0, limit);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    return mockCategories.find((c) => c.slug === slug);
}

export function getModelBySlug(slug: string): AIModel | undefined {
    return mockModels.find((m) => m.slug === slug);
}

export function getTopContributors(limit = 10): User[] {
    return [...mockUsers]
        .sort((a, b) => b.reputation - a.reputation)
        .slice(0, limit);
}

export function searchPrompts(query: string): Prompt[] {
    const lowerQuery = query.toLowerCase();
    return getAllCombinedPrompts().filter(
        (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery) ||
            p.content.toLowerCase().includes(lowerQuery) ||
            p.tags.some((t) => t.name.toLowerCase().includes(lowerQuery))
    );
}
