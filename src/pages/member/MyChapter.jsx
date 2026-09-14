import React, { useEffect, useState } from "react";
import {
    Users,
    Wallet,
    CircleDollarSign,
    AlertCircle,
    CalendarDays,
    UserRound,
    ArrowUpRight,
    MapPin,
    CheckCircle2,
} from "lucide-react";

import { getChapterObligation } from "../../services/chapterService.js";
import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const MyChapter = () => {
    const { user } = useAuth();

    const [chapterData, setChapterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getChapterObligation();

                console.log(data);

                setChapterData(data);
            } catch (err) {
                console.error("Fetch chapter error:", err);

                setError(
                    err.message || "Failed to load chapter information."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchChapter();
    }, []);

    // ========================================
    // DATA
    // ========================================

    const chapter = chapterData?.chapter || user?.chapter;
    const summary = chapterData?.summary;
    const members = chapterData?.members || [];
    const recentActivity = chapterData?.recentActivity || [];

    const totalDue = Number(summary?.totalDue || 0);
    const amountPaid = Number(summary?.amountPaid || 0);
    const outstanding = Number(summary?.outstanding || 0);
    const memberCount = Number(summary?.memberCount || 0);

    const contributionProgress =
        totalDue > 0
            ? Math.min((amountPaid / totalDue) * 100, 100)
            : 0;

    // ========================================
    // HELPERS
    // ========================================

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <PageTitle title="My Chapter | OlivetNOSA" />

            <div className="p-4">
                <div className="space-y-4">

                    {/* ========================================
                        PAGE INTRO
                    ======================================== */}

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-(--secondary)">
                                Leadership
                            </p>

                            <h1 className="text-xl md:text-2xl font-semibold text-(--text-primary) mt-1">
                                My Chapter
                            </h1>

                            <p className="text-sm text-(--text-secondary) mt-1">
                                Manage your chapter membership and official contributions.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <MapPin size={19} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-(--text-primary)">
                                    {chapter?.name || "Chapter"}
                                </p>

                                <p className="text-xs text-(--text-muted) mt-0.5">
                                    {chapter?.code || "—"}
                                    {chapter?.country
                                        ? ` • ${chapter.country}`
                                        : ""}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* ========================================
                        ERROR
                    ======================================== */}

                    {error && (
                        <div className="border border-(--danger)/20 bg-(--danger)/5 rounded-md px-4 py-3">

                            <div className="flex items-center gap-2">

                                <AlertCircle
                                    size={16}
                                    className="text-(--danger)"
                                />

                                <p className="text-sm text-(--danger)">
                                    {error}
                                </p>

                            </div>

                        </div>
                    )}

                    {/* ========================================
                        FINANCIAL OVERVIEW
                    ======================================== */}

                    <div className="space-y-3">

                        <div>
                            <h2 className="text-lg font-semibold text-(--text-primary)">
                                Chapter Contributions
                            </h2>

                            <p className="text-sm text-(--text-secondary)">
                                Track your chapter's financial responsibility.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">

                            {/* ========================================
                                MAIN BALANCE
                            ======================================== */}

                            <div className="lg:col-span-2 rounded bg-(--primary) text-white p-5 relative overflow-hidden">

                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/5" />

                                <div className="absolute -right-3 -bottom-10 w-24 h-24 rounded-full bg-(--secondary)/10" />

                                <div className="relative">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-2">

                                            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                                <Wallet size={18} />
                                            </div>

                                            <span className="text-sm text-white/75">
                                                Outstanding balance
                                            </span>

                                        </div>

                                        {!loading && outstanding > 0 && (
                                            <span className="text-xs bg-(--secondary) text-(--primary) px-2 py-1 rounded font-semibold">
                                                Action needed
                                            </span>
                                        )}

                                    </div>

                                    <h3 className="text-3xl font-bold mt-7">
                                        {loading
                                            ? "—"
                                            : formatCurrency(outstanding)}
                                    </h3>

                                    <p className="text-sm text-white/65 mt-1">
                                        remaining from{" "}
                                        {loading
                                            ? "—"
                                            : formatCurrency(totalDue)}
                                    </p>

                                    <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">

                                        <div
                                            className="h-full bg-(--secondary) rounded-full transition-all duration-500"
                                            style={{
                                                width: loading
                                                    ? "0%"
                                                    : `${contributionProgress}%`,
                                            }}
                                        />

                                    </div>

                                    <div className="flex justify-between text-xs mt-2 text-white/60">

                                        <span>
                                            {loading
                                                ? "—"
                                                : `${formatCurrency(amountPaid)} paid`}
                                        </span>

                                        <span>
                                            {loading
                                                ? "—"
                                                : `${Math.round(
                                                    contributionProgress
                                                )}%`}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* ========================================
                                AMOUNT PAID
                            ======================================== */}

                            <div className="rounded bg-(--bg-white) border border-(--border) p-5">

                                <div className="flex items-center justify-between">

                                    <div className="w-10 h-10 rounded-lg bg-green-50 text-(--success) flex items-center justify-center">
                                        <CheckCircle2 size={20} />
                                    </div>

                                    <span className="text-xs text-(--text-muted)">
                                        Total
                                    </span>

                                </div>

                                <p className="text-sm text-(--text-secondary) mt-5">
                                    Amount paid
                                </p>

                                <h3 className="text-2xl font-bold text-(--text-primary) mt-1">
                                    {loading
                                        ? "—"
                                        : formatCurrency(amountPaid)}
                                </h3>

                                <p className="text-xs text-(--text-muted) mt-2">
                                    Official chapter payments
                                </p>

                            </div>

                            {/* ========================================
                                MEMBERS
                            ======================================== */}

                            <div className="rounded bg-(--bg-white) border border-(--border) p-5">

                                <div className="flex items-center justify-between">

                                    <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <Users size={20} />
                                    </div>

                                    <span className="text-xs text-(--text-muted)">
                                        Active
                                    </span>

                                </div>

                                <p className="text-sm text-(--text-secondary) mt-5">
                                    Chapter members
                                </p>

                                <h3 className="text-2xl font-bold text-(--text-primary) mt-1">
                                    {loading ? "—" : memberCount}
                                </h3>

                                <p className="text-xs text-(--text-muted) mt-2">
                                    Members assigned to this chapter
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ========================================
                        MEMBERS + PAYMENT
                    ======================================== */}

                    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4">

                        {/* ========================================
                            CHAPTER MEMBERS
                        ======================================== */}

                        <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-(--border)">

                                <div>

                                    <h2 className="font-semibold text-(--text-primary)">
                                        Chapter Members
                                    </h2>

                                    <p className="text-sm text-(--text-secondary) mt-1">
                                        Active members assigned to your chapter.
                                    </p>

                                </div>

                                <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                                    <Users size={15} />

                                    {memberCount} member
                                    {memberCount !== 1 ? "s" : ""}
                                </div>

                            </div>

                            {loading ? (

                                <div className="p-8 text-center text-sm text-(--text-secondary)">
                                    Loading members...
                                </div>

                            ) : members.length === 0 ? (

                                <div className="p-10 text-center">

                                    <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <Users size={22} />
                                    </div>

                                    <h3 className="font-semibold mt-4 text-(--text-primary)">
                                        No members found
                                    </h3>

                                    <p className="text-sm text-(--text-secondary) mt-1 max-w-sm mx-auto">
                                        No active members are currently assigned
                                        to this chapter.
                                    </p>

                                </div>

                            ) : (

                                <div className="divide-y divide-(--border) max-h-[430px] overflow-y-auto scrollbar-hide">

                                    {members.slice(0, 5).map((member) => (

                                        <div
                                            key={member._id}
                                            className="p-5 hover:bg-(--bg-light)/50 transition"
                                        >

                                            <div className="flex items-center justify-between gap-4">

                                                <div className="flex items-center gap-3.5 min-w-0">

                                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                        <UserRound size={18} />
                                                    </div>

                                                    <div className="min-w-0">

                                                        <h3 className="text-sm font-semibold text-(--text-primary) truncate">
                                                            {member.firstName}{" "}
                                                            {member.middleName
                                                                ? `${member.middleName} `
                                                                : ""}
                                                            {member.lastName}
                                                        </h3>

                                                        <p className="text-xs text-(--text-secondary) mt-1">
                                                            {member.alumniId || "No Alumni ID"}
                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="text-right shrink-0">

                                                    <p className="text-xs font-semibold text-(--text-primary)">
                                                        {member.yearSet?.name || "—"}
                                                    </p>

                                                    <p className="text-xs text-(--text-muted) mt-1">
                                                        Class of{" "}
                                                        {member.graduationYear || "—"}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                            {members.length > 5 && (

                                <div className="border-t border-(--border) p-4 text-center">

                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--primary) hover:text-(--secondary) transition"
                                    >
                                        View all members
                                        <ArrowUpRight size={14} />
                                    </button>

                                </div>

                            )}

                        </section>

                        {/* ========================================
                            CHAPTER PAYMENT
                        ======================================== */}

                        <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                            <div className="p-5 border-b border-(--border)">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-lg bg-(--secondary-light) text-(--secondary) flex items-center justify-center">
                                        <Wallet size={19} />
                                    </div>

                                    <div>

                                        <h2 className="font-semibold text-(--text-primary)">
                                            Chapter Payment
                                        </h2>

                                        <p className="text-xs text-(--text-secondary) mt-1">
                                            Official contribution
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="p-5">

                                <p className="text-xs text-(--text-secondary)">
                                    Outstanding
                                </p>

                                <h3 className="text-2xl font-bold text-(--text-primary) mt-1">
                                    {loading
                                        ? "—"
                                        : formatCurrency(outstanding)}
                                </h3>

                                <div className="mt-5 space-y-3">

                                    <div className="flex items-center justify-between text-xs">

                                        <span className="text-(--text-muted)">
                                            Paid
                                        </span>

                                        <span className="font-semibold text-(--text-primary)">
                                            {loading
                                                ? "—"
                                                : formatCurrency(amountPaid)}
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between text-xs">

                                        <span className="text-(--text-muted)">
                                            Total due
                                        </span>

                                        <span className="font-semibold text-(--text-primary)">
                                            {loading
                                                ? "—"
                                                : formatCurrency(totalDue)}
                                        </span>

                                    </div>

                                </div>

                                <p className="text-xs text-(--text-muted) leading-relaxed mt-5">
                                    Collect contributions from your chapter
                                    members and make the official payment
                                    through the portal.
                                </p>

                                <button
                                    type="button"
                                    disabled={loading || outstanding <= 0}
                                    className="
                                        mt-5 w-full
                                        inline-flex items-center justify-center gap-2
                                        bg-(--primary)
                                        text-white
                                        px-4 py-2.5
                                        rounded-(--radius-sm)
                                        text-xs font-semibold
                                        hover:bg-(--primary-dark)
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                        transition-all
                                    "
                                >
                                    Make Chapter Payment
                                    <ArrowUpRight size={14} />
                                </button>

                            </div>

                        </section>

                    </div>

                    {/* ========================================
                        RECENT ACTIVITY
                    ======================================== */}

                    <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                        <div className="p-5 border-b border-(--border)">

                            <div className="flex items-center gap-2">

                                <CircleDollarSign
                                    size={17}
                                    className="text-(--primary)"
                                />

                                <h2 className="font-semibold text-(--text-primary)">
                                    Recent Activity
                                </h2>

                            </div>

                            <p className="text-sm text-(--text-secondary) mt-1">
                                Recent financial activity from your chapter.
                            </p>

                        </div>

                        {recentActivity.length > 0 ? (

                            <div className="divide-y divide-(--border)">

                                {recentActivity.map((activity, index) => (

                                    <div
                                        key={activity._id || index}
                                        className="p-5"
                                    >
                                        {/* Payment activity will appear here */}
                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="p-8 text-center">

                                <CalendarDays
                                    size={22}
                                    className="mx-auto text-(--text-muted)"
                                />

                                <p className="mt-3 text-sm font-medium text-(--text-primary)">
                                    No recent activity
                                </p>

                                <p className="mt-1 text-xs text-(--text-secondary)">
                                    Transactions and updates will appear here.
                                </p>

                            </div>

                        )}

                    </section>

                </div>
            </div>
        </>
    );
};

export default MyChapter;