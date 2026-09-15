import React, { useState } from "react";
import {
    CircleHelp,
    Mail,
    CreditCard,
    UserRound,
    ShieldCheck,
    ChevronDown,
    MessageCircle,
} from "lucide-react";

const faqs = [
    {
        question: "How do I update my profile information?",
        answer:
            "Your profile information is managed by the association. If any of your details are incorrect, please contact the administrator for assistance.",
    },
    {
        question: "Why is my account still pending?",
        answer:
            "After verifying your email address, your account may need to be reviewed and approved by an administrator before you can access all member features.",
    },
    {
        question: "How do I pay my obligation?",
        answer:
            "You can make payments from the My Obligations section when payment is available for your assigned obligation.",
    },
    {
        question: "What should I do if my payment fails?",
        answer:
            "Please try the payment again. If you were charged but your payment is not reflected in your account, contact the administrator with your payment reference.",
    },
    {
        question: "I forgot my password. What should I do?",
        answer:
            "Use the Forgot Password option on the login page to reset your password using your registered email address.",
    },
];

const HelpSupport = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq((current) =>
            current === index ? null : index
        );
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
                        Get help with your account, membership and payments.
                    </p>
                </div>

                {/* SUPPORT OPTIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

                    {/* CONTACT ADMIN */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                            <Mail size={20} />
                        </div>

                        <h2 className="text-sm font-semibold text-(--primary) mt-5">
                            Contact Admin
                        </h2>

                        <p className="text-sm text-(--secondary) mt-1 leading-relaxed">
                            Need help with your account or membership?
                            Contact the association administrator.
                        </p>

                        <a
                            href="mailto:admin@olivetbhsnosa.org"
                            className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-(--primary) hover:underline"
                        >
                            Send an email
                            <MessageCircle size={14} />
                        </a>
                    </div>

                    {/* PAYMENT HELP */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                            <CreditCard size={20} />
                        </div>

                        <h2 className="text-sm font-semibold text-(--primary) mt-5">
                            Payment Help
                        </h2>

                        <p className="text-sm text-(--secondary) mt-1 leading-relaxed">
                            Having an issue with an obligation payment?
                            Contact the administrator for assistance.
                        </p>

                        <p className="text-xs text-(--text-muted) mt-4">
                            Include your payment reference when reporting
                            a payment issue.
                        </p>
                    </div>

                    {/* ACCOUNT HELP */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                            <UserRound size={20} />
                        </div>

                        <h2 className="text-sm font-semibold text-(--primary) mt-5">
                            Account Help
                        </h2>

                        <p className="text-sm text-(--secondary) mt-1 leading-relaxed">
                            Having trouble accessing your account or
                            completing verification?
                        </p>

                        <p className="text-xs text-(--text-muted) mt-4">
                            Contact the administrator if the issue persists.
                        </p>
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
                                                isOpen
                                                    ? "rotate-180"
                                                    : ""
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