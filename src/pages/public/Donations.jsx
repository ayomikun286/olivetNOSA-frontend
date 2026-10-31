
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    HeartHandshake,
    GraduationCap,
    Landmark,
    UsersRound,
    ShieldCheck,
    Heart,
    CheckCircle2,
    LoaderCircle,
    LockKeyhole,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";

// Connect this to the donation service you already created.
import { initializeDonation } from "../../services/authService.js";

const donationAmounts = [5000, 10000, 25000, 50000];

export default function Donation() {
    const [amount, setAmount] = useState("");
    const [customAmount, setCustomAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const selectedAmount = amount === "custom"
        ? Number(customAmount)
        : Number(amount);

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }).format(Number(value || 0));

    const handleDonation = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!Number.isSafeInteger(selectedAmount) || selectedAmount < 100) {
            setError("Please enter a valid donation amount of at least ₦100.");
            return;
        }

        if (!isAnonymous && !donorName.trim()) {
            setError("Please enter your name or choose anonymous donation.");
            return;
        }

        try {
            setLoading(true);

            const result = await initializeDonation({
                donorName: isAnonymous ? "Anonymous" : donorName.trim(),
                email: email.trim(),
                amount: selectedAmount,
                message: message.trim(),
                isAnonymous,
            });

            if (!result?.authorizationUrl) {
                throw new Error("Unable to initialize your donation. Please try again.");
            }

            window.location.href = result.authorizationUrl;
        } catch (error) {
            console.error("Donation initialization error:", error);

            setError(
                error.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-[var(--primary-dark)] overflow-x-hidden mt-10 md:mt-15">
            <PageTitle title="Make a Donation | OlivetNOSA" />

            <header>
                <Navbar />
            </header>

            {/* HERO */}
            <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-[var(--primary-dark)]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/olivetNOSA-10.jpg')",
                    }}
                />

                <div className="absolute inset-0 bg-[var(--primary-dark)]/75" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/80 to-transparent" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            <span className="h-px w-10 bg-[var(--secondary)]" />
                            Giving Back to Our Heritage
                        </div>

                        <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                            Together, We Build
                            <span className="block text-[var(--secondary)]">
                                a Lasting Legacy.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                            Your generosity helps strengthen our alumni
                            community, support meaningful initiatives and
                            create opportunities for future generations.
                        </p>

                        <a
                            href="#donation-form"
                            className="mt-10 inline-flex items-center gap-3 bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:bg-white"
                        >
                            Make a Donation
                            <ArrowUpRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

             {/* DONATION FORM */}
            <section
                id="donation-form"
                className="bg-white py-20 lg:py-28"
            >
                <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-16">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            Make Your Contribution
                        </p>

                        <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                            Every gift makes a difference.
                        </h2>

                        <p className="mt-7 text-base leading-8 text-[var(--text-muted)]">
                            Choose an amount that works for you and make
                            your contribution securely through our payment
                            platform.
                        </p>

                        <div className="mt-10 space-y-6 border-t border-black/10 pt-8">
                            <div className="flex items-start gap-4">
                                <ShieldCheck
                                    size={22}
                                    className="shrink-0 text-[var(--secondary)]"
                                />
                                <div>
                                    <h3 className="font-semibold text-[var(--primary-dark)]">
                                        Secure payment
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                        Payments are processed securely
                                        through Paystack.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Heart
                                    size={22}
                                    className="shrink-0 text-[var(--secondary)]"
                                />
                                <div>
                                    <h3 className="font-semibold text-[var(--primary-dark)]">
                                        Every contribution counts
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                        Your support helps us continue
                                        building a connected Olivetian
                                        community.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleDonation}
                        className="border border-black/10 bg-white p-6 shadow-sm sm:p-9"
                    >
                        <h3 className="text-2xl font-semibold text-[var(--primary-dark)]">
                            Donation Details
                        </h3>

                        <p className="mt-2 text-sm text-[var(--text-muted)]">
                            Complete the details below to continue.
                        </p>

                        {error && (
                            <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                       
                       {/* AMOUNT */}
<div className="mt-8">
    <label className="text-sm font-semibold text-[var(--primary-dark)]">
        Enter donation amount
    </label>

    <div className="mt-4">
        <div className="flex items-center border border-black/15 focus-within:border-[var(--primary)]">
            <span className="border-r border-black/10 px-4 py-3 text-[var(--text-muted)]">
                ₦
            </span>

            <input
                type="number"
                min="100"
                step="1"
                value={customAmount}
                onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount("custom");
                }}
                placeholder="Enter amount in Naira"
                className="w-full px-4 py-3 outline-none"
                required
            />
        </div>

        <p className="mt-2 text-xs text-[var(--text-muted)]">
            Minimum donation amount is ₦100.
        </p>
    </div>
</div>

                        {/* DONOR DETAILS */}
                        <div className="mt-8 space-y-5">
                            <div>
                                <label className="text-sm font-semibold text-[var(--primary-dark)]">
                                    Your name
                                </label>

                                <input
                                    type="text"
                                    value={donorName}
                                    onChange={(e) =>
                                        setDonorName(e.target.value)
                                    }
                                    placeholder="Enter your name"
                                    disabled={isAnonymous}
                                    maxLength={120}
                                    className="mt-2 w-full border border-black/15 px-4 py-3 outline-none transition focus:border-[var(--primary)] disabled:bg-gray-100"
                                    required={!isAnonymous}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-[var(--primary-dark)]">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    maxLength={254}
                                    className="mt-2 w-full border border-black/15 px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-[var(--primary-dark)]">
                                    Message (optional)
                                </label>

                                <textarea
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    rows={4}
                                    maxLength={500}
                                    placeholder="Leave a message with your contribution..."
                                    className="mt-2 w-full resize-y border border-black/15 px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                                />
                            </div>
                        </div>

                        {/* ANONYMOUS OPTION */}
                        <label className="mt-6 flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) =>
                                    setIsAnonymous(e.target.checked)
                                }
                                className="mt-1 h-4 w-4 accent-[var(--primary)]"
                            />

                            <span>
                                <span className="block text-sm font-semibold text-[var(--primary-dark)]">
                                    Make my donation anonymous
                                </span>
                                <span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">
                                    Your name will not be displayed publicly.
                                </span>
                            </span>
                        </label>

                        {/* TOTAL */}
                        <div className="mt-8 border-t border-black/10 pt-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[var(--text-muted)]">
                                    Donation amount
                                </span>

                                <span className="text-xl font-bold text-[var(--primary-dark)]">
                                    {formatCurrency(selectedAmount)}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-7 flex w-full items-center justify-center gap-3 bg-[var(--primary-dark)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Preparing donation...
                                </>
                            ) : (
                                <>
                                    Donate {selectedAmount >= 100
                                        ? formatCurrency(selectedAmount)
                                        : "Now"}
                                    <ArrowUpRight size={18} />
                                </>
                            )}
                        </button>

                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
                            <LockKeyhole size={13} />
                            Secure checkout powered by Paystack
                        </div>
                    </form>
                </div>
            </section>

            {/* INTRODUCTION */}
            <section className="bg-white py-20 lg:py-28">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-16">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            The Power of Giving
                        </p>

                        <div className="mt-6 h-px w-16 bg-[var(--secondary)]" />

                        <h2 className="mt-7 text-4xl font-medium leading-tight tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                            Our shared heritage deserves our collective support.
                        </h2>
                    </div>

                    <div>
                        <p className="text-lg leading-9 text-[var(--text-muted)]">
                            Olivet has been part of the story of many
                            generations. As Olivetians, we have an opportunity
                            to give back to the community and institution that
                            helped shape our journeys.
                        </p>

                        <p className="mt-6 text-base leading-8 text-[var(--text-muted)]">
                            Every contribution, regardless of size, represents
                            a commitment to fellowship, service and the
                            continued development of our shared heritage.
                        </p>
                    </div>
                </div>
            </section>

            {/* AREAS OF IMPACT */}
            <section className="bg-[var(--background-soft)] py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            Your Contribution
                        </p>

                        <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                            Giving towards a stronger Olivet community.
                        </h2>

                        <p className="mt-5 leading-8 text-[var(--text-muted)]">
                            Your support can help advance initiatives that
                            benefit the school, its alumni and future
                            generations.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: GraduationCap,
                                title: "Education & Mentorship",
                                description:
                                    "Encouraging learning, guidance and opportunities for students and younger generations.",
                            },
                            {
                                icon: Landmark,
                                title: "School Development",
                                description:
                                    "Supporting initiatives that contribute to the improvement and development of our alma mater.",
                            },
                            {
                                icon: UsersRound,
                                title: "Alumni Community",
                                description:
                                    "Strengthening fellowship, engagement and meaningful community initiatives.",
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="bg-white border border-black/5 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center bg-[var(--primary-light)] text-[var(--primary)]">
                                        <Icon size={25} strokeWidth={1.5} />
                                    </div>

                                    <h3 className="mt-7 text-xl font-semibold text-[var(--primary-dark)]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

           

            {/* FINAL CTA */}
            <section className="bg-[var(--primary-dark)] py-20 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center sm:px-10 lg:px-16">
                    <HeartHandshake
                        size={38}
                        className="mx-auto text-[var(--secondary)]"
                        strokeWidth={1.5}
                    />

                    <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-medium leading-tight sm:text-5xl">
                        Our story continues through what we give back.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/60 sm:text-base">
                        Thank you for being part of the Olivetian community
                        and for supporting its future.
                    </p>

                    <Link
                        to="/"
                        className="mt-9 inline-flex items-center gap-3 border border-white/25 px-6 py-3 text-sm font-semibold transition hover:border-[var(--secondary)] hover:bg-white/10"
                    >
                        Return to homepage
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
