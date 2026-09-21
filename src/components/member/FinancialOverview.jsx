import React from 'react'

const FinancialOverview = ({ outstanding }) => {
    return (
        <div className="space-y-3">

            <div>
                <h2 className="text-lg font-semibold text-(--text-primary)">
                    Your contributions
                </h2>

                <p className="text-sm text-(--text-secondary)">
                    Keep track of your membership obligations and payments.
                </p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                {/* MAIN BALANCE */}
                <div className="lg:col-span-1 rounded bg-(--primary) text-white p-5 relative overflow-hidden">

                    <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/5" />
                    <div className="absolute -right-3 -bottom-10 w-24 h-24 rounded-full bg-(--secondary)/10" />

                    <div className="relative">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                    <WalletCards size={18} />
                                </div>

                                <span className="text-sm text-white/75">
                                    Outstanding balance
                                </span>
                            </div>

                            {outstanding > 0 && (
                                <span className="text-xs bg-(--secondary) text-end w-fit text-(--primary) p-1 rounded font-semibold">
                                    Action needed
                                </span>
                            )}
                        </div>

                        <h3 className="text-3xl font-bold mt-7">
                            {formatCurrency(outstanding)}
                        </h3>

                        <p className="text-sm text-white/65 mt-1">
                            remaining from {formatCurrency(totalObligation)}
                        </p>

                        <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full bg-(--secondary) rounded-full transition-all"
                                style={{
                                    width: totalObligation
                                        ? `${Math.min((amountPaid / totalObligation) * 100, 100)}%`
                                        : "0%",
                                }}
                            />
                        </div>

                        <div className="flex justify-between text-xs mt-2 text-white/60">
                            <span>{formatCurrency(amountPaid)} paid</span>
                            <span>
                                {totalObligation
                                    ? Math.round((amountPaid / totalObligation) * 100)
                                    : 0}
                                %
                            </span>
                        </div>

                    </div>
                </div>


                {/* PAID */}
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
                        {formatCurrency(amountPaid)}
                    </h3>

                    <p className="text-xs text-(--text-muted) mt-2">
                        Across {obligations.length} obligation
                        {obligations.length !== 1 ? "s" : ""}
                    </p>

                </div>


                {/* NEXT DUE */}
                <div className="rounded bg-(--bg-white) border border-(--border) p-5">

                    <div className="flex items-center justify-between">

                        <div className="w-10 h-10 rounded-lg bg-(--secondary-light) text-(--secondary) flex items-center justify-center">
                            <Calendar size={20} />
                        </div>

                        {unpaidObligations.length > 0 && (
                            <span className="text-xs text-(--warning)">
                                Upcoming
                            </span>
                        )}

                    </div>

                    <p className="text-sm text-(--text-secondary) mt-5">
                        Next due date
                    </p>

                    <h3 className="text-xl font-bold text-(--text-primary) mt-1">
                        {nextDueDate ? formatDate(nextDueDate) : "All settled"}
                    </h3>

                    <p className="text-xs text-(--text-muted) mt-2">
                        {unpaidObligations.length
                            ? `${unpaidObligations.length} outstanding obligation${unpaidObligations.length > 1 ? "s" : ""
                            }`
                            : "You're all caught up"}
                    </p>

                </div>

            </div>
        </div>
    )
}

export default FinancialOverview