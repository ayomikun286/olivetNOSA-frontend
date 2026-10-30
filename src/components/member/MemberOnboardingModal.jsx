import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  ReceiptText,
  Users,
  GraduationCap,
  CalendarDays,
  MapPin,
  Bell,
  ShieldCheck,
  WalletCards,
  CircleDollarSign,
  Loader2,
  Sparkles,
} from "lucide-react";

const onboardingSteps = [
  {
    title: "Welcome to your Alumni Portal",
    subtitle:
      "Your connection to the Olivet Nigerian School Alumni community.",
    icon: GraduationCap,
    content: (
      <div className="space-y-5">
        <div className="rounded-xl bg-[var(--bg-light)] border border-[var(--border)] p-4">
          <p className="text-sm text-[var(--text-muted)] mb-3">
            Your membership information
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--text-muted)]">Alumni ID</p>
              <p className="font-semibold text-[var(--primary)]">
                Your Alumni ID
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--text-muted)]">
                Graduation Year
              </p>
              <p className="font-semibold text-[var(--primary)]">
                Your graduation year
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--text-muted)]">Year Set</p>
              <p className="font-semibold text-[var(--primary)]">
                Your year set
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--text-muted)]">Chapter</p>
              <p className="font-semibold text-[var(--primary)]">
                Your chapter
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          This portal helps you manage your membership, keep track of
          contributions, make payments, and stay connected with fellow
          Olivetians.
        </p>
      </div>
    ),
  },
  {
    title: "Understand your contributions",
    subtitle: "Keep track of your financial obligations and contributions.",
    icon: CircleDollarSign,
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--secondary-light)] flex items-center justify-center">
              <WalletCards className="text-[var(--secondary)]" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--primary)]">
                Your contributions
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                View your payment summary
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Your dashboard gives you an overview of your contributions,
            amounts paid, and outstanding balances.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-light)] flex items-center justify-center">
              <ReceiptText className="text-[var(--primary)]" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--primary)]">
                My Obligations
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Know what is due
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Check assigned obligations, payment progress, due dates, and
            outstanding amounts. Where payment is available, use the
            Pay Now option to proceed.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Know about optional insurance",
    subtitle: "Understand the difference between mandatory dues and optional contributions.",
    icon: ShieldCheck,
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--secondary-light)] flex items-center justify-center">
              <ShieldCheck className="text-[var(--secondary)]" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--primary)]">
                Optional insurance
              </h4>
              <span className="text-xs font-medium text-[var(--secondary)]">
                Optional contribution
              </span>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            The portal provides an insurance contribution option for members.
            It is optional and is kept separate from your mandatory dues.
          </p>
        </div>

        <div className="rounded-lg bg-[var(--bg-light)] border border-[var(--border)] p-4">
          <p className="text-sm text-[var(--primary)] font-medium">
            Remember
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Your optional insurance contribution does not form part of your
            mandatory outstanding balance.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Track your payments",
    subtitle: "Your payment records are available whenever you need them.",
    icon: CreditCard,
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-light)] flex items-center justify-center">
              <ReceiptText className="text-[var(--primary)]" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--primary)]">
                Payment History
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Review previous transactions
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Visit your Payment History section to review your transactions
            and check the status of your payments.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--secondary-light)] flex items-center justify-center">
              <Users className="text-[var(--secondary)]" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--primary)]">
                Quick Actions
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Access useful portal shortcuts
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Use the available shortcuts on your dashboard to access
            important member services.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Stay informed and connected",
    subtitle: "Keep up with your membership and important updates.",
    icon: Bell,
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-light)] flex items-center justify-center">
              <CheckCircle2 className="text-[var(--primary)]" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--primary)]">
                Membership Status
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Monitor your membership standing
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Your membership status section helps you stay informed about
            your account standing.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--secondary-light)] flex items-center justify-center">
              <Bell className="text-[var(--secondary)]" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--primary)]">
                Notifications
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Don't miss important information
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Check your notifications for relevant account updates and
            important information from the association.
          </p>
        </div>
      </div>
    ),
  },
];

const MemberOnboardingModal = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const step = onboardingSteps[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleNext = async () => {
    setError("");

    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    try {
      setLoading(true);
      await onComplete();
    } catch (err) {
      setError(
        err?.message || "Unable to complete onboarding. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && !loading) {
      setError("");
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-5">
      <div className="w-full max-w-2xl max-h-[94vh] overflow-hidden rounded bg-[var(--bg-white)] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="relative overflow-hidden bg-[var(--primary)] px-5 py-6 sm:px-8 sm:py-7">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[25px] border-white/5" />
          <div className="absolute -right-2 -bottom-20 h-40 w-40 rounded-full border-[20px] border-white/5" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="text-[var(--secondary)]" size={24} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                OLIVET NOSA ALUMNI ASSOCIATION
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Welcome to the Portal
              </h2>
            </div>
          </div>

          <p className="relative z-10 text-sm text-white/70 mt-4 max-w-lg">
            Let's take a quick tour to help you get familiar with your
            member dashboard.
          </p>
        </div>

        {/* Progress */}
        <div className="px-5 sm:px-8 pt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[var(--primary)]">
              Getting started
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Step {currentStep + 1} of {onboardingSteps.length}
            </p>
          </div>

          <div className="flex gap-1.5">
            {onboardingSteps.map((item, index) => (
              <div
                key={item.title}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  index <= currentStep
                    ? "bg-[var(--secondary)]"
                    : "bg-[var(--border)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <div className="flex items-start gap-3 mb-5">
            <div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--bg-light)] border border-[var(--border)] flex items-center justify-center">
              <StepIcon className="text-[var(--primary)]" size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--primary)]">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {step.subtitle}
              </p>
            </div>
          </div>

          {step.content}

          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-5 py-4 sm:px-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0 || loading}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--primary)] hover:bg-[var(--bg-light)] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] disabled:opacity-70 transition"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Completing...
              </>
            ) : isLastStep ? (
              <>
                Explore My Dashboard
                <CheckCircle2 size={17} />
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberOnboardingModal;