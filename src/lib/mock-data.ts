import { Category, AIModel, Prompt, User, Tag } from "./types";

// ============================================================================
// USERS
// ============================================================================
export const mockUsers: User[] = [
    {
        id: "user-1",
        username: "promptmaster",
        reputation: 890,
        createdAt: new Date("2025-11-15"),
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-2",
        username: "aiwhisperer",
        reputation: 725,
        createdAt: new Date("2025-11-20"),
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-3",
        username: "codecraft",
        reputation: 580,
        createdAt: new Date("2025-11-22"),
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-4",
        username: "creativeai",
        reputation: 445,
        createdAt: new Date("2025-12-01"),
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-5",
        username: "datagenius",
        reputation: 320,
        createdAt: new Date("2025-12-05"),
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-6",
        username: "techwriter_pro",
        reputation: 275,
        createdAt: new Date("2025-12-08"),
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-7",
        username: "devops_ninja",
        reputation: 380,
        createdAt: new Date("2025-12-03"),
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-8",
        username: "marketingmaven",
        reputation: 295,
        createdAt: new Date("2025-12-10"),
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-9",
        username: "academic_writer",
        reputation: 420,
        createdAt: new Date("2025-11-28"),
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-10",
        username: "startup_founder",
        reputation: 510,
        createdAt: new Date("2025-11-25"),
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-11",
        username: "ux_designer",
        reputation: 340,
        createdAt: new Date("2025-12-05"),
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-12",
        username: "data_scientist",
        reputation: 465,
        createdAt: new Date("2025-11-30"),
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-13",
        username: "content_creator",
        reputation: 255,
        createdAt: new Date("2025-12-12"),
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-14",
        username: "fullstack_dev",
        reputation: 395,
        createdAt: new Date("2025-12-01"),
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
    },
    {
        id: "user-15",
        username: "product_manager",
        reputation: 310,
        createdAt: new Date("2025-12-07"),
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
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
        promptCount: 12,
    },
    {
        id: "cat-2",
        name: "Writing",
        slug: "writing",
        description: "Blog posts, emails, creative fiction, copywriting, and content creation",
        icon: "Pencil",
        promptCount: 9,
    },
    {
        id: "cat-3",
        name: "Business",
        slug: "business",
        description: "Proposals, analysis, strategy, presentations, and professional documents",
        icon: "Briefcase",
        promptCount: 8,
    },
    {
        id: "cat-4",
        name: "Research",
        slug: "research",
        description: "Summarization, data analysis, literature reviews, and academic work",
        icon: "BookOpen",
        promptCount: 7,
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
        promptCount: 6,
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
        promptCount: 7,
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
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getPromptBySlug(slug: string): Prompt | undefined {
    return mockPrompts.find((p) => p.slug === slug);
}

export function getPromptsByCategory(categorySlug: string): Prompt[] {
    return mockPrompts.filter((p) => p.category.slug === categorySlug);
}

export function getPromptsByModel(modelSlug: string): Prompt[] {
    return mockPrompts.filter((p) => p.model.slug === modelSlug);
}

export function getTrendingPrompts(limit = 6): Prompt[] {
    // Simple trending algorithm: votes / age
    return [...mockPrompts]
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
    return mockPrompts.filter((p) => p.featured).slice(0, limit);
}

export function getRecentPrompts(limit = 6): Prompt[] {
    return [...mockPrompts]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit);
}

export function getTopPrompts(limit = 10): Prompt[] {
    return [...mockPrompts]
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
    return mockPrompts.filter(
        (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery) ||
            p.content.toLowerCase().includes(lowerQuery) ||
            p.tags.some((t) => t.name.toLowerCase().includes(lowerQuery))
    );
}
