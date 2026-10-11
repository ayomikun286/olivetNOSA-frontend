
import React, { useCallback, useEffect, useState } from "react";
import {
    CircleHelp,
    Mail,
    CreditCard,
    UserRound,
    ShieldCheck,
    ChevronDown,
    MessageCircle,
    FileText,
    Download,
    LockKeyhole,
    Plus,
    Send,
    X,
    Clock3,
    RefreshCw,
    LifeBuoy,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

import {
    createSupportTicket,
    getMySupportTickets,
    getSupportTicketById,
    replyToSupportTicket,
} from "../../services/supportService";

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
        question: "How do I become a financial member?",
        answer:
            "To become a financial member of ONW GOSA, you must meet the association's applicable financial obligations. Open My Obligations from your member dashboard to view your assigned dues and levies, then make payments using the available payment options. Your payments must be verified before your financial status is updated. If you have completed your payments but your status has not changed, contact the association administrator for assistance.",
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

const categories = [
    { value: "account", label: "Account" },
    { value: "membership", label: "Membership" },
    { value: "payment", label: "Payment" },
    { value: "verification", label: "Email verification" },
    { value: "technical", label: "Technical issue" },
    { value: "other", label: "Other" },
];

const statusConfig = {
    open: {
        label: "Open",
        className: "bg-blue-50 text-blue-700",
    },
    in_progress: {
        label: "In progress",
        className: "bg-amber-50 text-amber-700",
    },
    resolved: {
        label: "Resolved",
        className: "bg-emerald-50 text-emerald-700",
    },
    closed: {
        label: "Closed",
        className: "bg-gray-100 text-gray-600",
    },
};

const formatDate = (value) => {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const getCategoryLabel = (value) =>
    categories.find((category) => category.value === value)?.label || value;

const getErrorMessage = (error) =>
    error?.message || "Something went wrong. Please try again.";

const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig.open;

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
        >
            {config.label}
        </span>
    );
};

const HelpSupport = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [ticketsError, setTicketsError] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [creatingTicket, setCreatingTicket] = useState(false);
    const [createError, setCreateError] = useState("");
    const [createSuccess, setCreateSuccess] = useState("");

    const [category, setCategory] = useState("account");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loadingTicketDetails, setLoadingTicketDetails] = useState(false);
    const [ticketDetailsError, setTicketDetailsError] = useState("");

    const [replyMessage, setReplyMessage] = useState("");
    const [sendingReply, setSendingReply] = useState(false);
    const [replyError, setReplyError] = useState("");

    const toggleFaq = (index) => {
        setOpenFaq((current) => (current === index ? null : index));
    };

    const loadTickets = useCallback(async () => {
        setLoadingTickets(true);
        setTicketsError("");

        try {
            const result = await getMySupportTickets();
            setTickets(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            setTicketsError(getErrorMessage(error));
        } finally {
            setLoadingTickets(false);
        }
    }, []);

    useEffect(() => {
        loadTickets();
    }, [loadTickets]);

    const handleCreateTicket = async (event) => {
        event.preventDefault();

        setCreateError("");
        setCreateSuccess("");

        const trimmedSubject = subject.trim();
        const trimmedMessage = message.trim();

        if (!trimmedSubject || !trimmedMessage) {
            setCreateError("Please enter a subject and describe your issue.");
            return;
        }

        setCreatingTicket(true);

        try {
            const result = await createSupportTicket({
                category,
                subject: trimmedSubject,
                message: trimmedMessage,
            });

            setCreateSuccess(
                result.data?.ticketNumber
                    ? `Your request ${result.data.ticketNumber} has been submitted.`
                    : "Your support request has been submitted."
            );

            setSubject("");
            setMessage("");
            setCategory("account");

            await loadTickets();

            // Keep the success message visible briefly before closing.
            window.setTimeout(() => {
                setShowCreateModal(false);
                setCreateSuccess("");
            }, 1200);
        } catch (error) {
            setCreateError(getErrorMessage(error));
        } finally {
            setCreatingTicket(false);
        }
    };

    const openTicket = async (ticketId) => {
        setSelectedTicket(null);
        setTicketDetailsError("");
        setReplyError("");
        setReplyMessage("");
        setLoadingTicketDetails(true);

        try {
            const result = await getSupportTicketById(ticketId);
            setSelectedTicket(result.data);
        } catch (error) {
            setTicketDetailsError(getErrorMessage(error));
        } finally {
            setLoadingTicketDetails(false);
        }
    };

    const handleReply = async (event) => {
        event.preventDefault();

        if (!selectedTicket?._id || !replyMessage.trim()) return;

        setSendingReply(true);
        setReplyError("");

        try {
            const result = await replyToSupportTicket(
                selectedTicket._id,
                replyMessage.trim()
            );

            setSelectedTicket(result.data);
            setReplyMessage("");

            await loadTickets();
        } catch (error) {
            setReplyError(getErrorMessage(error));
        } finally {
            setSendingReply(false);
        }
    };

    const closeTicketDetails = () => {
        setSelectedTicket(null);
        setTicketDetailsError("");
        setReplyError("");
        setReplyMessage("");
    };

    return (
        <div className="p-4">
            <div className="space-y-5">
                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Help & Support
                    </h1>

                    <p className="mt-1 text-sm text-(--secondary)">
                        Learn how to manage your account, make payments and
                        access your payment receipts.
                    </p>
                </div>

                {/* MEMBER SUPPORT TICKETS */}
                <section className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="flex flex-col gap-4 border-b border-(--border) p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <LifeBuoy size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-(--primary)">
                                    My Support Requests
                                </h2>

                                <p className="mt-1 text-sm text-(--secondary)">
                                    Submit an issue and follow up with the
                                    association support team.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setCreateError("");
                                setCreateSuccess("");
                                setShowCreateModal(true);
                            }}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            <Plus size={17} />
                            New Support Request
                        </button>
                    </div>

                    <div className="p-5">
                        {loadingTickets ? (
                            <div className="flex items-center justify-center gap-2 py-8 text-sm text-(--secondary)">
                                <RefreshCw size={17} className="animate-spin" />
                                Loading your support requests...
                            </div>
                        ) : ticketsError ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                <div className="flex items-start gap-2 text-sm text-red-700">
                                    <AlertCircle
                                        size={18}
                                        className="mt-0.5 shrink-0"
                                    />
                                    <p>{ticketsError}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={loadTickets}
                                    className="mt-3 text-sm font-semibold text-red-700 underline"
                                >
                                    Try again
                                </button>
                            </div>
                        ) : tickets.length === 0 ? (
                            <div className="py-8 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
                                    <MessageCircle size={22} />
                                </div>

                                <h3 className="mt-3 text-sm font-semibold text-(--primary)">
                                    No support requests yet
                                </h3>

                                <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-(--secondary)">
                                    If you need help with your account,
                                    membership, payments or another issue,
                                    submit a support request here.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCreateError("");
                                        setCreateSuccess("");
                                        setShowCreateModal(true);
                                    }}
                                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--bg-light)"
                                >
                                    <Plus size={16} />
                                    Create your first request
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {tickets.map((ticket) => (
                                    <button
                                        type="button"
                                        key={ticket._id}
                                        onClick={() => openTicket(ticket._id)}
                                        className="w-full rounded-lg border border-(--border) p-4 text-left transition hover:border-(--primary) hover:bg-(--bg-light)"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-xs font-semibold text-(--primary)">
                                                        {ticket.ticketNumber ||
                                                            "Support request"}
                                                    </span>

                                                    <StatusBadge
                                                        status={ticket.status}
                                                    />
                                                </div>

                                                <h3 className="mt-2 break-words text-sm font-semibold text-(--primary)">
                                                    {ticket.subject}
                                                </h3>

                                                <p className="mt-1 text-xs text-(--secondary)">
                                                    {getCategoryLabel(
                                                        ticket.category
                                                    )}
                                                </p>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-1.5 text-xs text-(--secondary)">
                                                <Clock3 size={14} />
                                                {formatDate(
                                                    ticket.lastMessageAt ||
                                                        ticket.updatedAt
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between border-t border-(--border) pt-3">
                                            <span className="text-xs text-(--secondary)">
                                                View conversation
                                            </span>

                                            <span className="text-sm font-medium text-(--primary)">
                                                Open →
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* QUICK GUIDES */}
                <div>
                    <div className="mb-3">
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Member Guides
                        </h2>

                        <p className="mt-1 text-xs text-(--text-muted)">
                            Quick steps for using the member portal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <UserRound size={20} />
                            </div>

                            <h3 className="mt-5 text-sm font-semibold text-(--primary)">
                                Complete Your Account
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-(--secondary)">
                                Add the remaining information to keep your
                                member profile complete and up to date.
                            </p>
                        </div>

                        <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <CreditCard size={20} />
                            </div>

                            <h3 className="mt-5 text-sm font-semibold text-(--primary)">
                                Make a Payment
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-(--secondary)">
                                Open My Obligations, select an available
                                obligation and complete the payment securely.
                            </p>
                        </div>

                        <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <FileText size={20} />
                            </div>

                            <h3 className="mt-5 text-sm font-semibold text-(--primary)">
                                Get Your Receipt
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-(--secondary)">
                                Open a completed payment to view your official
                                receipt and download it as a PDF.
                            </p>
                        </div>

                        <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <LockKeyhole size={20} />
                            </div>

                            <h3 className="mt-5 text-sm font-semibold text-(--primary)">
                                Account Access
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-(--secondary)">
                                Verify your email, wait for approval, or reset
                                your password if you cannot sign in.
                            </p>
                        </div>
                    </div>
                </div>

                {/* PAYMENT RECEIPT GUIDE */}
                <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="border-b border-(--border) p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <Download size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-(--primary)">
                                    Getting Your Payment Receipt
                                </h2>

                                <p className="mt-1 text-sm text-(--secondary)">
                                    Keep a PDF copy of your verified payments
                                    for your records.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                {
                                    title: "Open your payment history",
                                    description:
                                        "Find the payment you want to retrieve from your payment records.",
                                },
                                {
                                    title: "Open the receipt",
                                    description:
                                        "Select the completed payment to view its official receipt.",
                                },
                                {
                                    title: "Download as PDF",
                                    description:
                                        "Use the download or print option to save a PDF copy of your receipt.",
                                },
                            ].map((step, index) => (
                                <div
                                    key={step.title}
                                    className="flex gap-3"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--primary-light) text-xs font-semibold text-(--primary)">
                                        {index + 1}
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-(--primary)">
                                            {step.title}
                                        </h3>

                                        <p className="mt-1 text-xs leading-relaxed text-(--secondary)">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="border-b border-(--border) p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <CircleHelp size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-(--primary)">
                                    Frequently Asked Questions
                                </h2>

                                <p className="mt-1 text-sm text-(--secondary)">
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
                                        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-(--bg-light)"
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
                                            <p className="max-w-3xl text-sm leading-relaxed text-(--secondary)">
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
                <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <Mail size={20} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Still need help?
                                </h2>

                                <p className="mt-1 text-sm leading-relaxed text-(--secondary)">
                                    Contact the association administrator if
                                    you need assistance with your account or
                                    payment.
                                </p>
                            </div>
                        </div>

                        <a
                            href="mailto:admin@olivetbhsnosa.org"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                        >
                            Contact Admin
                            <MessageCircle size={15} />
                        </a>
                    </div>
                </div>

                {/* SECURITY NOTICE */}
                <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                            <ShieldCheck size={20} />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-(--primary)">
                                Keep your account secure
                            </h2>

                            <p className="mt-1 text-sm leading-relaxed text-(--secondary)">
                                Never share your password or verification
                                codes with anyone. The association will never
                                ask you to disclose your password.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CREATE SUPPORT REQUEST MODAL */}
            {showCreateModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget && !creatingTicket) {
                            setShowCreateModal(false);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-support-title"
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-(--border) bg-(--bg-white) shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-(--border) p-5">
                            <div>
                                <h2
                                    id="create-support-title"
                                    className="text-lg font-semibold text-(--primary)"
                                >
                                    New Support Request
                                </h2>

                                <p className="mt-1 text-sm text-(--secondary)">
                                    Tell us what you need help with.
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={creatingTicket}
                                onClick={() => setShowCreateModal(false)}
                                aria-label="Close form"
                                className="rounded-lg p-2 text-(--secondary) transition hover:bg-(--bg-light) disabled:opacity-50"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleCreateTicket}
                            className="space-y-4 p-5"
                        >
                            {createError && (
                                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    <AlertCircle
                                        size={17}
                                        className="mt-0.5 shrink-0"
                                    />
                                    <p>{createError}</p>
                                </div>
                            )}

                            {createSuccess && (
                                <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                                    <CheckCircle2
                                        size={17}
                                        className="mt-0.5 shrink-0"
                                    />
                                    <p>{createSuccess}</p>
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="support-category"
                                    className="mb-1.5 block text-sm font-medium text-(--primary)"
                                >
                                    Category
                                </label>

                                <select
                                    id="support-category"
                                    value={category}
                                    onChange={(event) =>
                                        setCategory(event.target.value)
                                    }
                                    required
                                    disabled={creatingTicket}
                                    className="w-full rounded-lg border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    {categories.map((item) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="support-subject"
                                    className="mb-1.5 block text-sm font-medium text-(--primary)"
                                >
                                    Subject
                                </label>

                                <input
                                    id="support-subject"
                                    type="text"
                                    value={subject}
                                    onChange={(event) =>
                                        setSubject(event.target.value)
                                    }
                                    maxLength={150}
                                    required
                                    disabled={creatingTicket}
                                    placeholder="Briefly describe your issue"
                                    className="w-full rounded-lg border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
                                />

                                <p className="mt-1 text-right text-xs text-(--text-muted)">
                                    {subject.length}/150
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="support-message"
                                    className="mb-1.5 block text-sm font-medium text-(--primary)"
                                >
                                    Describe your issue
                                </label>

                                <textarea
                                    id="support-message"
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    maxLength={3000}
                                    required
                                    disabled={creatingTicket}
                                    rows={5}
                                    placeholder="Explain what happened and what assistance you need..."
                                    className="w-full resize-y rounded-lg border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm leading-relaxed text-(--primary) outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
                                />

                                <p className="mt-1 text-right text-xs text-(--text-muted)">
                                    {message.length}/3000
                                </p>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    disabled={creatingTicket}
                                    onClick={() =>
                                        setShowCreateModal(false)
                                    }
                                    className="rounded-lg border border-(--border) px-4 py-2.5 text-sm font-medium text-(--primary) transition hover:bg-(--bg-light) disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={creatingTicket || !subject.trim() || !message.trim()}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {creatingTicket ? (
                                        <>
                                            <RefreshCw
                                                size={16}
                                                className="animate-spin"
                                            />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            Submit Request
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* TICKET DETAILS AND CONVERSATION MODAL */}
            {(selectedTicket || loadingTicketDetails || ticketDetailsError) && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget &&
                            !sendingReply
                        ) {
                            closeTicketDetails();
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="support-conversation-title"
                        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-(--border) bg-(--bg-white) shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-(--border) p-5">
                            <div className="min-w-0">
                                <h2
                                    id="support-conversation-title"
                                    className="text-lg font-semibold text-(--primary)"
                                >
                                    Support Conversation
                                </h2>

                                {selectedTicket && (
                                    <p className="mt-1 break-words text-sm text-(--secondary)">
                                        {selectedTicket.ticketNumber} ·{" "}
                                        {selectedTicket.subject}
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                disabled={sendingReply}
                                onClick={closeTicketDetails}
                                aria-label="Close conversation"
                                className="rounded-lg p-2 text-(--secondary) transition hover:bg-(--bg-light) disabled:opacity-50"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto p-5">
                            {loadingTicketDetails ? (
                                <div className="flex items-center justify-center gap-2 py-12 text-sm text-(--secondary)">
                                    <RefreshCw
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Loading conversation...
                                </div>
                            ) : ticketDetailsError ? (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                    <p className="text-sm text-red-700">
                                        {ticketDetailsError}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={closeTicketDetails}
                                        className="mt-3 text-sm font-semibold text-red-700 underline"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : selectedTicket ? (
                                <div className="space-y-5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <StatusBadge
                                            status={selectedTicket.status}
                                        />

                                        <span className="text-xs text-(--secondary)">
                                            {getCategoryLabel(
                                                selectedTicket.category
                                            )}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {(selectedTicket.messages || []).map(
                                            (item, index) => {
                                                const isMember =
                                                    item.senderRole === "member";

                                                const senderName =
                                                    typeof item.sender ===
                                                    "object"
                                                        ? [
                                                              item.sender
                                                                  ?.firstName,
                                                              item.sender
                                                                  ?.lastName,
                                                          ]
                                                              .filter(Boolean)
                                                              .join(" ")
                                                        : "";

                                                return (
                                                    <div
                                                        key={
                                                            item._id ||
                                                            `${item.createdAt}-${index}`
                                                        }
                                                        className={`flex ${
                                                            isMember
                                                                ? "justify-end"
                                                                : "justify-start"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`max-w-[90%] rounded-xl border p-4 sm:max-w-[80%] ${
                                                                isMember
                                                                    ? "border-(--primary) bg-(--primary) text-white"
                                                                    : "border-(--border) bg-(--bg-light) text-(--primary)"
                                                            }`}
                                                        >
                                                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                                                <span
                                                                    className={`text-xs font-semibold ${
                                                                        isMember
                                                                            ? "text-white"
                                                                            : "text-(--primary)"
                                                                    }`}
                                                                >
                                                                    {isMember
                                                                        ? "You"
                                                                        : senderName ||
                                                                          item.senderRole ||
                                                                          "Support team"}
                                                                </span>

                                                                <span
                                                                    className={`text-[11px] ${
                                                                        isMember
                                                                            ? "text-white/80"
                                                                            : "text-(--secondary)"
                                                                    }`}
                                                                >
                                                                    {formatDate(
                                                                        item.createdAt
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                                                                {item.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>

                                    {["resolved", "closed"].includes(
                                        selectedTicket.status
                                    ) && (
                                        <div className="rounded-lg border border-(--border) bg-(--bg-light) p-4">
                                            <p className="text-sm text-(--secondary)">
                                                {selectedTicket.status ===
                                                "closed"
                                                    ? "This support request is closed and can no longer receive replies."
                                                    : "This request has been resolved. If you still need help, contact the support team to reopen it."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>

                        {selectedTicket &&
                            !loadingTicketDetails &&
                            !ticketDetailsError &&
                            !["resolved", "closed"].includes(
                                selectedTicket.status
                            ) && (
                                <form
                                    onSubmit={handleReply}
                                    className="border-t border-(--border) p-4 sm:p-5"
                                >
                                    {replyError && (
                                        <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                            <AlertCircle
                                                size={17}
                                                className="mt-0.5 shrink-0"
                                            />
                                            <p>{replyError}</p>
                                        </div>
                                    )}

                                    <label
                                        htmlFor="support-reply"
                                        className="mb-2 block text-sm font-medium text-(--primary)"
                                    >
                                        Your reply
                                    </label>

                                    <textarea
                                        id="support-reply"
                                        value={replyMessage}
                                        onChange={(event) =>
                                            setReplyMessage(event.target.value)
                                        }
                                        maxLength={3000}
                                        rows={3}
                                        required
                                        disabled={sendingReply}
                                        placeholder="Write your message..."
                                        className="w-full resize-y rounded-lg border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm leading-relaxed text-(--primary) outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
                                    />

                                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <span className="text-xs text-(--text-muted)">
                                            {replyMessage.length}/3000
                                        </span>

                                        <button
                                            type="submit"
                                            disabled={
                                                sendingReply ||
                                                !replyMessage.trim()
                                            }
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {sendingReply ? (
                                                <>
                                                    <RefreshCw
                                                        size={16}
                                                        className="animate-spin"
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                    Send Reply
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpSupport;
