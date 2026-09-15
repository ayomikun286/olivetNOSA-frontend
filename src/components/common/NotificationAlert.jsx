import React from "react";
import {
    Bell,
    CreditCard,
    FileText,
    Megaphone,
    ShieldCheck,
    Settings,
    X,
    ArrowUpRight,
} from "lucide-react";

const NotificationAlert = ({
    notification,
    onClose,
    onClick,
}) => {
    if (!notification) return null;

    const getIcon = () => {
        switch (notification.type) {
            case "payment":
                return <CreditCard size={18} />;
            case "obligation":
                return <FileText size={18} />;
            case "announcement":
                return <Megaphone size={18} />;
            case "account":
                return <ShieldCheck size={18} />;
            case "system":
                return <Settings size={18} />;
            default:
                return <Bell size={18} />;
        }
    };

    return (
        <div className="fixed top-5 right-5 z-[100] w-[360px] max-w-[calc(100vw-2rem)]">
            <div className="bg-(--bg-white) border border-(--border) rounded shadow-xl overflow-hidden">
                <div className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                            {getIcon()}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                                <h4 className="text-sm font-semibold text-(--primary)">
                                    {notification.title}
                                </h4>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-(--text-muted) hover:text-(--primary) transition"
                                    aria-label="Close notification"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <p className="text-xs text-(--text-muted) mt-1 leading-5">
                                {notification.message}
                            </p>

                            {notification.link && (
                                <button
                                    type="button"
                                    onClick={onClick}
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-(--primary) mt-3 hover:underline"
                                >
                                    View details
                                    <ArrowUpRight size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationAlert;