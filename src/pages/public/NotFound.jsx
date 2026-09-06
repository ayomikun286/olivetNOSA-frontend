import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-[80vh] bg-white text-[var(--primary-dark)]">
      <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-12">
        <div className="max-w-3xl">

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            OlivetNOSA
          </p>

          <h1 className="text-7xl font-light tracking-tight sm:text-8xl lg:text-9xl">
            404
          </h1>

          <div className="mt-8 max-w-xl">
            <h2 className="text-2xl font-medium sm:text-3xl">
              This page seems to have wandered off.
            </h2>

            <p className="mt-4 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              The page you’re looking for may have moved, changed, or no longer
              exists. Let’s get you back to somewhere familiar.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Home size={17} />
              Back Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-dark)]/15 px-6 py-3 text-sm font-medium transition hover:bg-[var(--primary-dark)] hover:text-white"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>

          </div>

        </div>
      </section>
    </main>
  );
};

export default NotFound;