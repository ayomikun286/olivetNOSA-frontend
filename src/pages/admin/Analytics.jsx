
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Eye,
    Users,
    MousePointerClick,
    FileBarChart,
    RefreshCw,
    Loader2,
    Globe,
    ExternalLink,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
    getAnalyticsDashboard,
} from "../../services/analytics.service.js";

const Analytics = () => {
    // ========================================
    // DATE HELPERS
    // ========================================

    const getLocalDateString = (date) => {
        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const getDateRange = (days) => {
        const end = new Date();

        const start = new Date();

        start.setDate(
            start.getDate() - (days - 1)
        );

        return {
            startDate: getLocalDateString(start),
            endDate: getLocalDateString(end),
        };
    };

    // ========================================
    // STATE
    // ========================================

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState("");

    const [alert, setAlert] = useState(null);

    // ========================================
    // DATE FILTERS
    // ========================================

    const [range, setRange] = useState("30");

    const initialRange = getDateRange(30);

    const [customStartDate, setCustomStartDate] =
        useState(initialRange.startDate);

    const [customEndDate, setCustomEndDate] =
        useState(initialRange.endDate);

    const [appliedDates, setAppliedDates] =
        useState(initialRange);

    // ========================================
    // ALERT
    // ========================================

    const showAlert = (type, message) => {
        setAlert({
            type,
            message,
        });
    };

    // ========================================
    // LOAD ANALYTICS
    // ========================================

    const loadAnalytics = useCallback(async (
        dates = appliedDates,
        isRefresh = false
    ) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response =
                await getAnalyticsDashboard(dates);

            setAnalytics(
                response?.data || null
            );

        } catch (error) {
            console.error(
                "Load website analytics error:",
                error
            );

            setError(
                error.message ||
                "Failed to load website analytics."
            );

        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [appliedDates]);

    useEffect(() => {
        loadAnalytics(appliedDates);
    }, [appliedDates, loadAnalytics]);

    // ========================================
    // DATE RANGE PRESETS
    // ========================================

    const handleRangeChange = (value) => {
        setRange(value);

        if (value === "custom") {
            return;
        }

        const dates = getDateRange(
            Number(value)
        );

        setAppliedDates(dates);

        setCustomStartDate(dates.startDate);
        setCustomEndDate(dates.endDate);
    };

    // ========================================
    // CUSTOM DATE RANGE
    // ========================================

    const handleApplyCustomRange = () => {
        if (!customStartDate || !customEndDate) {
            showAlert(
                "error",
                "Please select both start and end dates."
            );

            return;
        }

        if (customStartDate > customEndDate) {
            showAlert(
                "error",
                "Start date cannot be after end date."
            );

            return;
        }

        setAppliedDates({
            startDate: customStartDate,
            endDate: customEndDate,
        });
    };

    // ========================================
    // REFRESH
    // ========================================

    const handleRefresh = () => {
        loadAnalytics(appliedDates, true);
    };

    // ========================================
    // DATA
    // ========================================

    const overview = analytics?.overview || {};

    const topPages = analytics?.topPages || [];

    const topClicks = analytics?.topClicks || [];

    const dailyVisitors = useMemo(() => {
        return [
            ...(analytics?.dailyVisitors || []),
        ].sort((a, b) =>
            a.date.localeCompare(b.date)
        );
    }, [analytics]);

    // ========================================
    // STATISTICS
    // ========================================

    const stats = useMemo(() => {
        const mostViewedPage = topPages[0] || null;

        return {
            totalPageViews: Number(
                overview.totalPageViews || 0
            ),

            uniqueVisitors: Number(
                overview.uniqueVisitors || 0
            ),

            totalClicks: Number(
                overview.totalClicks || 0
            ),

            mostViewedPage,
        };
    }, [overview, topPages]);

    // ========================================
    // FORMATTERS
    // ========================================

    const formatNumber = (value) => {
        return Number(
            value || 0
        ).toLocaleString();
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(
            `${date}T00:00:00`
        ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
        });
    };

    const formatPagePath = (path) => {
        if (!path || path === "/") {
            return "Home";
        }

        return path
            .split("/")
            .filter(Boolean)
            .map((part) =>
                part
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) =>
                        char.toUpperCase()
                    )
            )
            .join(" / ");
    };

    const formatEventType = (type) => {
        if (type === "button_click") {
            return "Button";
        }

        if (type === "link_click") {
            return "Link";
        }

        return type || "—";
    };

    // ========================================
    // CHART
    // ========================================

    const maxPageViews = Math.max(
        1,
        ...dailyVisitors.map(
            (item) => Number(item.pageViews || 0)
        )
    );

    const chartData = dailyVisitors.slice(-14);

    // ========================================
    // LOADING
    // ========================================

    if (loading && !analytics) {
        return (
            <div className="p-4">
                <div className="
                    min-h-[300px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-3
                ">
                    <Loader2
                        size={28}
                        className="animate-spin text-(--primary)"
                    />

                    <p className="text-xs text-(--secondary)">
                        Loading website analytics...
                    </p>
                </div>
            </div>
        );
    }

    // ========================================
    // RETURN
    // ========================================

    return (
        <div className="p-4">
            <div className="space-y-5">

                {/* ALERT */}

                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                {/* HEADER */}

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-3
                ">
                    <div>
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Website Analytics
                        </h1>

                        <p className="text-sm text-(--secondary) mt-1">
                            Monitor public website traffic,
                            visitor activity and engagement.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            h-9
                            px-4
                            rounded
                            border
                            border-(--border)
                            text-xs
                            font-semibold
                            text-(--primary)
                            hover:bg-(--bg-soft)
                            disabled:opacity-50
                        "
                    >
                        {refreshing ? (
                            <Loader2
                                size={14}
                                className="animate-spin"
                            />
                        ) : (
                            <RefreshCw size={14} />
                        )}

                        Refresh
                    </button>
                </div>

                {/* ERROR */}

                {error && (
                    <div className="
                        bg-(--danger-light)
                        border
                        border-(--danger)
                        rounded
                        px-4
                        py-3
                        flex
                        items-center
                        justify-between
                        gap-3
                    ">
                        <p className="text-xs text-(--danger)">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => loadAnalytics(appliedDates)}
                            className="
                                text-xs
                                font-semibold
                                text-(--danger)
                                hover:underline
                            "
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* DATE FILTER */}

                <div className="
                    bg-(--bg-white)
                    border
                    border-(--border)
                    rounded
                    p-4
                ">
                    <div className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-4
                    ">
                        <div>
                            <h2 className="text-sm font-semibold text-(--primary)">
                                Traffic Overview
                            </h2>

                            <p className="text-xs text-(--secondary) mt-1">
                                Select a period to view website activity.
                            </p>
                        </div>

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            gap-2
                        ">
                            <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-1
                                p-1
                                rounded
                                bg-(--bg-light)
                                border
                                border-(--border)
                            ">
                                {[
                                    { label: "7 Days", value: "7" },
                                    { label: "30 Days", value: "30" },
                                    { label: "90 Days", value: "90" },
                                    { label: "Custom", value: "custom" },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() =>
                                            handleRangeChange(item.value)
                                        }
                                        className={`
                                            px-3
                                            py-2
                                            rounded
                                            text-[11px]
                                            font-semibold
                                            transition-colors
                                            ${range === item.value
                                                ? "bg-(--primary) text-white"
                                                : "text-(--secondary) hover:text-(--primary)"
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CUSTOM DATES */}

                    {range === "custom" && (
                        <div className="
                            mt-4
                            pt-4
                            border-t
                            border-(--border)
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-end
                            gap-3
                        ">
                            <div className="flex-1">
                                <label className="
                                    block
                                    text-[11px]
                                    font-medium
                                    text-(--secondary)
                                    mb-1.5
                                ">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={customStartDate}
                                    max={customEndDate || undefined}
                                    onChange={(e) =>
                                        setCustomStartDate(e.target.value)
                                    }
                                    className="
                                        w-full
                                        h-9
                                        px-3
                                        rounded
                                        border
                                        border-(--border)
                                        bg-(--bg-white)
                                        text-xs
                                        text-(--primary)
                                        outline-none
                                        focus:border-(--primary)
                                    "
                                />
                            </div>

                            <div className="flex-1">
                                <label className="
                                    block
                                    text-[11px]
                                    font-medium
                                    text-(--secondary)
                                    mb-1.5
                                ">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    value={customEndDate}
                                    min={customStartDate || undefined}
                                    max={getLocalDateString(new Date())}
                                    onChange={(e) =>
                                        setCustomEndDate(e.target.value)
                                    }
                                    className="
                                        w-full
                                        h-9
                                        px-3
                                        rounded
                                        border
                                        border-(--border)
                                        bg-(--bg-white)
                                        text-xs
                                        text-(--primary)
                                        outline-none
                                        focus:border-(--primary)
                                    "
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleApplyCustomRange}
                                className="
                                    h-9
                                    px-5
                                    rounded
                                    bg-(--primary)
                                    text-white
                                    text-xs
                                    font-semibold
                                    hover:bg-(--primary-dark)
                                "
                            >
                                Apply Filter
                            </button>
                        </div>
                    )}

                    <p className="text-[10px] text-(--text-muted) mt-3">
                        Showing {formatDate(appliedDates.startDate)}
                        {" — "}
                        {formatDate(appliedDates.endDate)}
                    </p>
                </div>

                {/* OVERVIEW CARDS */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-3
                ">
                    <AdminStatCard
                        icon={Eye}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Traffic"
                        label="Total Page Views"
                        value={formatNumber(stats.totalPageViews)}
                        description="Total public page views"
                    />

                    <AdminStatCard
                        icon={Users}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Audience"
                        label="Unique Visitors"
                        value={formatNumber(stats.uniqueVisitors)}
                        description="Distinct visitors in this period"
                    />

                    <AdminStatCard
                        icon={MousePointerClick}
                        iconBg="bg-(--warning-light)"
                        iconClass="text-(--warning)"
                        badge="Engagement"
                        label="Total Clicks"
                        value={formatNumber(stats.totalClicks)}
                        description="Tracked button and link clicks"
                    />

                    <AdminStatCard
                        icon={Globe}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Top Page"
                        label="Most Viewed Page"
                        value={
                            stats.mostViewedPage
                                ? formatPagePath(
                                    stats.mostViewedPage.pagePath
                                )
                                : "—"
                        }
                        description={
                            stats.mostViewedPage
                                ? `${formatNumber(
                                    stats.mostViewedPage.views
                                )} page views`
                                : "No page activity yet"
                        }
                    />
                </div>

                {/* DAILY TRAFFIC CHART */}

                <div className="
                    bg-(--bg-white)
                    border
                    border-(--border)
                    rounded
                    overflow-hidden
                ">
                    <div className="
                        px-5
                        py-4
                        border-b
                        border-(--border)
                    ">
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Daily Website Traffic
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Page views recorded each day.
                        </p>
                    </div>

                    <div className="p-5">
                        {chartData.length > 0 ? (
                            <>
                                <div className="
                                    flex
                                    items-end
                                    gap-2
                                    h-48
                                    overflow-x-auto
                                    pb-2
                                ">
                                    {chartData.map((item) => {
                                        const height = Math.max(
                                            4,
                                            (Number(item.pageViews || 0) /
                                                maxPageViews) * 100
                                        );

                                        return (
                                            <div
                                                key={item.date}
                                                title={`${item.date}: ${formatNumber(item.pageViews)} views, ${formatNumber(item.uniqueVisitors)} visitors`}
                                                className="
                                                    min-w-[28px]
                                                    flex-1
                                                    h-full
                                                    flex
                                                    flex-col
                                                    items-center
                                                    justify-end
                                                    gap-2
                                                "
                                            >
                                                <span className="
                                                    text-[9px]
                                                    font-medium
                                                    text-(--secondary)
                                                ">
                                                    {formatNumber(item.pageViews)}
                                                </span>

                                                <div className="
                                                    w-full
                                                    max-w-[42px]
                                                    flex
                                                    items-end
                                                    justify-center
                                                    flex-1
                                                ">
                                                    <div
                                                        className="
                                                            w-full
                                                            rounded-t
                                                            bg-(--primary)
                                                            min-h-[3px]
                                                            transition-all
                                                        "
                                                        style={{
                                                            height: `${height}%`,
                                                        }}
                                                    />
                                                </div>

                                                <span className="
                                                    text-[9px]
                                                    text-(--text-muted)
                                                    whitespace-nowrap
                                                ">
                                                    {formatDate(item.date)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    mt-4
                                    pt-3
                                    border-t
                                    border-(--border)
                                ">
                                    <span className="
                                        w-2.5
                                        h-2.5
                                        rounded-sm
                                        bg-(--primary)
                                    " />

                                    <span className="text-[10px] text-(--secondary)">
                                        Page views
                                    </span>
                                </div>
                            </>
                        ) : (
                            <EmptyState message="No daily traffic data available for this period." />
                        )}
                    </div>
                </div>

                {/* TOP PAGES */}

                <div className="
                    bg-(--bg-white)
                    border
                    border-(--border)
                    rounded
                    overflow-hidden
                ">
                    <div className="
                        px-5
                        py-4
                        border-b
                        border-(--border)
                    ">
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Most Visited Pages
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Public pages ranked by total views.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-(--bg-light) border-b border-(--border)">
                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Page
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Path
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Page Views
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Unique Visitors
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {topPages.length > 0 ? (
                                    topPages.map((page, index) => (
                                        <tr
                                            key={page.pagePath}
                                            className="
                                                border-b
                                                border-(--border)
                                                last:border-b-0
                                                hover:bg-(--bg-light)/50
                                            "
                                        >
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="
                                                        w-6
                                                        h-6
                                                        rounded
                                                        bg-(--primary-light)
                                                        text-(--primary)
                                                        text-[10px]
                                                        font-semibold
                                                        flex
                                                        items-center
                                                        justify-center
                                                    ">
                                                        {index + 1}
                                                    </span>

                                                    <span className="text-xs font-semibold text-(--primary)">
                                                        {formatPagePath(page.pagePath)}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-3">
                                                <span className="text-xs text-(--secondary)">
                                                    {page.pagePath}
                                                </span>
                                            </td>

                                            <td className="px-5 py-3">
                                                <span className="text-xs font-semibold text-(--primary)">
                                                    {formatNumber(page.views)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-3">
                                                <span className="text-xs text-(--secondary)">
                                                    {formatNumber(page.uniqueVisitors)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            <EmptyState message="No page views recorded yet." />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TOP CLICKS */}

                <div className="
                    bg-(--bg-white)
                    border
                    border-(--border)
                    rounded
                    overflow-hidden
                ">
                    <div className="
                        px-5
                        py-4
                        border-b
                        border-(--border)
                    ">
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Click Activity
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Buttons and links visitors interact with.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-(--bg-light) border-b border-(--border)">
                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Element
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Type
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Destination
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Clicks
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {topClicks.length > 0 ? (
                                    topClicks.map((click, index) => (
                                        <tr
                                            key={`${click.elementLabel}-${click.targetPath}-${index}`}
                                            className="
                                                border-b
                                                border-(--border)
                                                last:border-b-0
                                                hover:bg-(--bg-light)/50
                                            "
                                        >
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-semibold text-(--primary)">
                                                    {click.elementLabel || "Unnamed element"}
                                                </span>
                                            </td>

                                            <td className="px-5 py-3">
                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    px-2
                                                    py-1
                                                    rounded
                                                    text-[10px]
                                                    font-medium
                                                    bg-(--primary-light)
                                                    text-(--primary)
                                                ">
                                                    {formatEventType(click.eventType)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-3">
                                                <span className="text-xs text-(--secondary) inline-flex items-center gap-1">
                                                    {click.targetPath || "—"}

                                                    {click.targetPath && (
                                                        <ExternalLink size={11} />
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-5 py-3">
                                                <span className="text-xs font-semibold text-(--primary)">
                                                    {formatNumber(click.clicks)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            <EmptyState message="No button or link clicks recorded yet." />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MONTHLY TRAFFIC */}

                <div className="
                    bg-(--bg-white)
                    border
                    border-(--border)
                    rounded
                    overflow-hidden
                ">
                    <div className="
                        px-5
                        py-4
                        border-b
                        border-(--border)
                    ">
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Monthly Traffic
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Monthly page views and unique visitors.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-(--bg-light) border-b border-(--border)">
                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Month
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Page Views
                                    </th>

                                    <th className="px-5 py-3 text-[10px] font-semibold text-(--secondary)">
                                        Unique Visitors
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {(analytics?.monthlyVisitors || []).length > 0 ? (
                                    [...analytics.monthlyVisitors]
                                        .sort((a, b) =>
                                            a.month.localeCompare(b.month)
                                        )
                                        .map((item) => (
                                            <tr
                                                key={item.month}
                                                className="
                                                    border-b
                                                    border-(--border)
                                                    last:border-b-0
                                                "
                                            >
                                                <td className="px-5 py-3 text-xs font-semibold text-(--primary)">
                                                    {new Date(
                                                        `${item.month}-01T00:00:00`
                                                    ).toLocaleDateString("en-US", {
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </td>

                                                <td className="px-5 py-3 text-xs text-(--primary)">
                                                    {formatNumber(item.pageViews)}
                                                </td>

                                                <td className="px-5 py-3 text-xs text-(--secondary)">
                                                    {formatNumber(item.uniqueVisitors)}
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            <EmptyState message="No monthly traffic data available." />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FOOTER NOTE */}

                <div className="
                    flex
                    items-start
                    gap-2
                    px-1
                ">
                    <FileBarChart
                        size={14}
                        className="text-(--text-muted) mt-0.5 shrink-0"
                    />

                    <p className="text-[10px] text-(--text-muted) leading-5">
                        Analytics shown here are based on tracked public
                        website activity within the selected date range.
                        Unique visitor counts are based on the visitor
                        identifiers recorded by the tracking system.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Analytics;

// ========================================
// EMPTY STATE
// ========================================

const EmptyState = ({ message }) => {
    return (
        <div className="
            px-5
            py-8
            text-center
        ">
            <p className="text-xs text-(--text-muted)">
                {message}
            </p>
        </div>
    );
};
