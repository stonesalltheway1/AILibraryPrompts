import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Library Prompts - Discover AI Prompts That Actually Work";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

/**
 * Default OpenGraph image for social sharing
 * This image is used when a page doesn't have a specific OG image
 */
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                {/* Background pattern */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: "radial-gradient(circle at 25% 25%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "48px",
                    }}
                >
                    {/* Logo / Brand */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            marginBottom: "32px",
                        }}
                    >
                        <div
                            style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}>AI</span>
                        </div>
                        <span
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#f8fafc",
                            }}
                        >
                            AI Library Prompts
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        style={{
                            fontSize: "64px",
                            fontWeight: "800",
                            color: "#f8fafc",
                            lineHeight: "1.1",
                            marginBottom: "24px",
                            maxWidth: "900px",
                        }}
                    >
                        Discover AI Prompts That{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            Actually Work
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontSize: "24px",
                            color: "#94a3b8",
                            maxWidth: "700px",
                        }}
                    >
                        The largest community-driven collection of prompts for ChatGPT, Claude, Gemini, and more
                    </p>

                    {/* Stats */}
                    <div
                        style={{
                            display: "flex",
                            gap: "48px",
                            marginTop: "48px",
                        }}
                    >
                        {[
                            { value: "67+", label: "Prompts" },
                            { value: "483+", label: "Users" },
                            { value: "2.8K+", label: "Votes" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "36px",
                                        fontWeight: "bold",
                                        color: "#a855f7",
                                    }}
                                >
                                    {stat.value}
                                </span>
                                <span style={{ fontSize: "18px", color: "#64748b" }}>
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer URL */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "32px",
                        fontSize: "20px",
                        color: "#64748b",
                    }}
                >
                    ailibraryprompts.com
                </div>
            </div>
        ),
        { ...size }
    );
}
