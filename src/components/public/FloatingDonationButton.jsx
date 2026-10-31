
import { HeartHandshake, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FloatingDonationButton = () => {
  const { pathname } = useLocation();

  // Keep it off member, admin, and authentication pages.
  const hiddenRoutes = [
    "/portal",
    "/admin",
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
    "/reset-password",
  ];

  const shouldHide = hiddenRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (shouldHide) return null;

  return (
    <Link
      to="/donation"
      aria-label="Support NOSA through donations"
      className="
       fixed bottom-24 right-6 z-40
        flex items-center gap-2.5
        rounded-full
        bg-[#C9A227] text-[#0B294D]
        px-5 py-3
        shadow-lg shadow-black/20
        transition-all duration-300
        hover:-translate-y-1 hover:bg-[#d9b43b]
        hover:shadow-xl
        active:scale-95
        max-sm:bottom-20 max-sm:right-4
        max-sm:px-4 max-sm:py-3
      "
    >
      <HeartHandshake size={21} strokeWidth={2.2} />

      <span className="text-sm font-bold tracking-wide">
        Support NOSA
      </span>

      <ArrowUpRight
        size={17}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </Link>
  );
};

export default FloatingDonationButton;
