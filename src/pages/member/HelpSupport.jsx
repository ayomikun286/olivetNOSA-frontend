import React, { useState } from "react";
import {
    CircleHelp,
    Mail,
    CreditCard,
    UserRound,
    ShieldCheck,
    ChevronDown,
    MessageCircle,
    FileText,
    CheckCircle2,
    Download,
    LockKeyhole,
} from "lucide-react";

const faqs = [
    {
        question: "How do I complete my account?",
        answer:
            "After signing in, open your profile or the Complete Your Account section from your dashboard. Fill in the remaining personal and membership information requested, then save your changes. Keeping your account information complete helps the association maintain accurate member records.",
    },
    {
        question: "How do I pay an obligation?",
        answer:
            "Open My Obligations from your member dashboard. Select an available obligation and choose the payment option shown. You will be redirected to the payment gateway to complete your payment securely. Your payment status will be updated after the transaction is verified.",
    },
    {
        question: "How do I get my payment receipt?",
        answer:
            "After a successful payment has been verified, open your payment history or the relevant payment record. Select the receipt option to view your official payment receipt. You can then download or print the receipt as a PDF for your records.",
    },
    {
        question: "Why can't I pay an obligation?",
        answer:
            "Only active obligations that are currently available for payment can be paid. An obligation may also be unavailable if it has already been fully paid or if there is no outstanding amount remaining.",
    },
    {
        question: "What should I do if my payment failed?",
        answer:
            "First, check your payment history to confirm whether the transaction was recorded. If you were charged but the payment is still pending or has not been reflected, contact the administrator and provide your payment reference.",
    },
    {
        question: "Why is my account still pending?",
        answer:
            "After creating your account, you must verify your email address. Your account may then require administrator approval before full member access is granted. If you have already completed verification and your account remains pending, please contact the administrator.",
    },
    {
        question: "I forgot my password. What should I do?",
        answer:
            "Use the Forgot Password option on the login page. Enter your registered email address and follow the password reset instructions sent to your email.",
    },
];

const HelpSupport = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq((current) => (current === index ? null : index));
    };

    return (
        <div className="p-4">
            <div className="space-y-5">

                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Help & Support
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        Learn how to manage your account, make payments and
                        access your payment receipts.
                    </p>
                </div>

                {/* QUICK GUIDES */}
                <div>
                    <div className="mb-3">
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Member Guides
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-1">
                            Quick steps for using the member portal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                        {/* COMPLETE ACCOUNT */}
                        <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <UserRound size={20} />
                            </div>

                            <h3 className="text-sm font-semibold text-(--primary) mt-5">
                                Complete Your Account
                            </h3>

                            <p className="text-sm text-(--secondary) mt-2 leading-relaxed">
                                Add the remaining information to keep your
                                member profile complete and up to date.
                            </p>
                        </div>

                        {/* MAKE PAYMENT */}
                        <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <CreditCard size={20} />
                            </div>

                            <h3 className="text-sm font-semibold text-(--primary) mt-5">
                                Make a Payment
                            </h3>

                            <p className="text-sm text-(--secondary) mt-2 leading-relaxed">
                                Open My Obligations, select an available
                                obligation and complete the payment securely.
                            </p>
                        </div>

                        {/* PAYMENT RECEIPT */}
                        <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <FileText size={20} />
                            </div>

                            <h3 className="text-sm font-semibold text-(--primary) mt-5">
                                Get Your Receipt
                            </h3>

                            <p className="text-sm text-(--secondary) mt-2 leading-relaxed">
                                Open a completed payment to view your official
                                receipt and download it as a PDF.
                            </p>
                        </div>

                        {/* ACCOUNT ACCESS */}
                        <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <LockKeyhole size={20} />
                            </div>

                            <h3 className="text-sm font-semibold text-(--primary) mt-5">
                                Account Access
                            </h3>

                            <p className="text-sm text-(--secondary) mt-2 leading-relaxed">
                                Verify your email, wait for approval, or reset
                                your password if you cannot sign in.
                            </p>
                        </div>

                    </div>
                </div>

                {/* PAYMENT RECEIPT GUIDE */}
                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                    <div className="p-5 border-b border-(--border)">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <Download size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-(--primary)">
                                    Getting Your Payment Receipt
                                </h2>

                                <p className="text-sm text-(--secondary) mt-1">
                                    Keep a PDF copy of your verified payments
                                    for your records.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="flex gap-3">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center text-xs font-semibold">
                                    1
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Open your payment history
                                    </h3>

                                    <p className="text-xs text-(--secondary) mt-1 leading-relaxed">
                                        Find the payment you want to retrieve
                                        from your payment records.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center text-xs font-semibold">
                                    2
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Open the receipt
                                    </h3>

                                    <p className="text-xs text-(--secondary) mt-1 leading-relaxed">
                                        Select the completed payment to view
                                        its official receipt.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center text-xs font-semibold">
                                    3
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Download as PDF
                                    </h3>

                                    <p className="text-xs text-(--secondary) mt-1 leading-relaxed">
                                        Use the download or print option to
                                        save a PDF copy of your receipt.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    <div className="p-5 border-b border-(--border)">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <CircleHelp size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-(--primary)">
                                    Frequently Asked Questions
                                </h2>

                                <p className="text-sm text-(--secondary) mt-1">
                                    Quick answers to common member questions.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-(--border)">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div key={faq.question}>
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-(--bg-light) transition"
                                    >
                                        <span className="text-sm font-medium text-(--primary)">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={17}
                                            className={`shrink-0 text-(--secondary) transition-transform ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5">
                                            <p className="text-sm text-(--secondary) leading-relaxed max-w-3xl">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CONTACT ADMIN */}
                <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <Mail size={20} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Still need help?
                                </h2>

                                <p className="text-sm text-(--secondary) mt-1 leading-relaxed">
                                    Contact the association administrator if
                                    you need assistance with your account or
                                    payment.
                                </p>
                            </div>
                        </div>

                        <a
                            href="mailto:admin@olivetbhsnosa.org"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90 transition"
                        >
                            Contact Admin
                            <MessageCircle size={15} />
                        </a>

                    </div>
                </div>

                {/* SECURITY NOTICE */}
                <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                            <ShieldCheck size={20} />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-(--primary)">
                                Keep your account secure
                            </h2>

                            <p className="text-sm text-(--secondary) mt-1 leading-relaxed">
                                Never share your password or verification
                                codes with anyone. The association will never
                                ask you to disclose your password.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HelpSupport;