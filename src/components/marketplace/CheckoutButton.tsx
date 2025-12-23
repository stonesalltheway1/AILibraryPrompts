"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface CheckoutButtonProps {
    productId: string;
    productTitle: string;
    price: number;
    currency?: string;
    onSuccess?: (details: PurchaseDetails) => void;
    onError?: (error: Error) => void;
    className?: string;
}

interface PurchaseDetails {
    orderId: string;
    productId: string;
    amount: string;
    payerEmail: string;
    payerName: string;
}

export function CheckoutButton({
    productId,
    productTitle,
    price,
    currency = "USD",
    onSuccess,
    onError,
    className = "",
}: CheckoutButtonProps) {
    const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
        return (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                PayPal not configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to environment.
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className={`flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 ${className}`}>
                <CheckCircle className="w-5 h-5" />
                <span>Purchase successful! Check your purchases.</span>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className={`p-4 rounded-lg bg-red-500/10 border border-red-500/30 ${className}`}>
                <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Payment failed</span>
                </div>
                <p className="text-sm text-red-400/70">{errorMessage}</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm text-red-400 underline hover:no-underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className={className}>
            <PayPalScriptProvider
                options={{
                    clientId,
                    currency,
                    intent: "capture",
                }}
            >
                {status === "processing" && (
                    <div className="flex items-center justify-center gap-2 p-4 text-dark-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing payment...</span>
                    </div>
                )}

                <div className={status === "processing" ? "hidden" : ""}>
                    <PayPalButtons
                        style={{
                            layout: "vertical",
                            color: "gold",
                            shape: "rect",
                            label: "pay",
                            height: 45,
                        }}
                        createOrder={async () => {
                            try {
                                const response = await fetch("/api/paypal/create-order", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        productId,
                                        title: productTitle,
                                        price,
                                        currency,
                                    }),
                                });

                                const data = await response.json();

                                if (!response.ok) {
                                    throw new Error(data.error || "Failed to create order");
                                }

                                return data.id;
                            } catch (error) {
                                console.error("Create order error:", error);
                                setErrorMessage(error instanceof Error ? error.message : "Failed to create order");
                                setStatus("error");
                                throw error;
                            }
                        }}
                        onApprove={async (data) => {
                            setStatus("processing");

                            try {
                                const response = await fetch("/api/paypal/capture-order", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ orderId: data.orderID }),
                                });

                                const captureData = await response.json();

                                if (!response.ok) {
                                    throw new Error(captureData.error || "Failed to capture payment");
                                }

                                setStatus("success");

                                onSuccess?.({
                                    orderId: captureData.orderId,
                                    productId: captureData.productId,
                                    amount: captureData.amount,
                                    payerEmail: captureData.payer.email,
                                    payerName: captureData.payer.name,
                                });
                            } catch (error) {
                                console.error("Capture error:", error);
                                setErrorMessage(error instanceof Error ? error.message : "Payment capture failed");
                                setStatus("error");
                                onError?.(error instanceof Error ? error : new Error("Payment failed"));
                            }
                        }}
                        onError={(err) => {
                            console.error("PayPal error:", err);
                            setErrorMessage("PayPal encountered an error. Please try again.");
                            setStatus("error");
                            onError?.(new Error("PayPal error"));
                        }}
                        onCancel={() => {
                            // User cancelled, stay in idle
                            setStatus("idle");
                        }}
                    />
                </div>
            </PayPalScriptProvider>
        </div>
    );
}
