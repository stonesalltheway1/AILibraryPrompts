import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 py-12">
            <SignUp
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-dark-800 border border-dark-700/50 shadow-xl",
                        headerTitle: "text-dark-50",
                        headerSubtitle: "text-dark-400",
                        socialButtonsBlockButton: "bg-dark-700 border-dark-600 text-dark-100 hover:bg-dark-600",
                        socialButtonsBlockButtonText: "text-dark-100",
                        dividerLine: "bg-dark-700",
                        dividerText: "text-dark-500",
                        formFieldLabel: "text-dark-300",
                        formFieldInput: "bg-dark-700 border-dark-600 text-dark-100",
                        formButtonPrimary: "bg-primary-500 hover:bg-primary-600",
                        footerActionLink: "text-primary-400 hover:text-primary-300",
                        identityPreview: "bg-dark-700 border-dark-600",
                        identityPreviewText: "text-dark-100",
                        identityPreviewEditButton: "text-primary-400",
                    },
                }}
            />
        </div>
    );
}
