
import React, { useEffect, useMemo, useState } from "react";
import {
  Newspaper,
  Search,
  ArrowRight,
  ImageOff,
  AlertCircle,
  RefreshCw,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import { getMemberArticles } from "../../services/news-eventsApi.js";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMemberArticles();
      setArticles(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Member articles error:", err);
      setError(err.message || "Unable to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles
      .filter((article) => {
        if (!query) return true;

        return [
          article.title,
          article.excerpt,
          article.category,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt || b.createdAt) -
          new Date(a.publishedAt || a.createdAt)
      );
  }, [articles, search]);

  const formatDate = (date) => {
    if (!date) return "Recently published";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently published";
    }

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <ContentLoading />;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <header>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--primary-light) text-(--primary)">
            <Newspaper size={22} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-(--primary)">
              Articles
            </h1>
            <p className="mt-1 text-sm text-(--secondary)">
              Insights, knowledge and stories from the GOSA community.
            </p>
          </div>
        </div>
      </header>

      {/* SEARCH */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles by title or category..."
          aria-label="Search articles"
          className="w-full rounded border border-(--border) bg-(--bg-white) py-3 pl-11 pr-4 text-sm text-(--primary) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded border border-(--danger)/20 bg-(--danger)/5 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-(--danger)"
            />

            <div className="flex-1">
              <p className="text-sm text-(--danger)">{error}</p>

              <button
                type="button"
                onClick={loadArticles}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-(--primary)"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE COUNT */}
      {!error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-(--secondary)">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"}
            {search.trim() ? " found" : " available"}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs font-medium text-(--primary) hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* ARTICLES GRID */}
      {!error && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article._id}
              className="group flex h-full flex-col overflow-hidden rounded border border-(--border) bg-(--bg-white) transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden bg-(--bg-light)">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-(--text-muted)">
                    <ImageOff size={30} />
                  </div>
                )}

                {article.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-(--primary) shadow-sm">
                    {article.category}
                  </span>
                )}

                {article.visibility === "members" && (
                  <span className="absolute right-3 top-3 rounded-full bg-(--primary) px-3 py-1 text-xs font-medium text-white">
                    Members
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2 text-xs text-(--text-muted)">
                  <CalendarDays size={14} />
                  <span>
                    {formatDate(article.publishedAt || article.createdAt)}
                  </span>
                </div>

                <h2 className="text-base font-semibold leading-6 text-(--primary)">
                  {article.title}
                </h2>

                <p className="mt-2 flex-1 text-sm leading-6 text-(--secondary)">
                  {article.excerpt ||
                    "Read this article for more insights and information."}
                </p>

                <Link
                  to={`/portal/member/dashboard/articles/${encodeURIComponent(article.slug)}`}
                  className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-(--primary) transition-all hover:gap-3"
                >
                  Read Article
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!error && filteredArticles.length === 0 && (
        <div className="rounded border border-(--border) bg-(--bg-white) px-5 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
            <Newspaper size={25} />
          </div>

          <h2 className="mt-4 font-semibold text-(--primary)">
            {search.trim() ? "No matching articles" : "No articles published yet"}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--secondary)">
            {search.trim()
              ? "Try another search term or clear your search."
              : "Published articles will appear here when they become available."}
          </p>

          {search.trim() && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-4 text-sm font-semibold text-(--primary) hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Articles;
