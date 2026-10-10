
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Newspaper,
  ImageOff,
  AlertCircle,
  RefreshCw,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import { getMemberArticleBySlug } from "../../services/news-eventsApi.js";

const MemberArticleDetails = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError("");
      setArticle(null);

      const response = await getMemberArticleBySlug(slug);
      const data = response.data;

      if (!data || data.type !== "article") {
        throw new Error("This article could not be found.");
      }

      setArticle(data);
    } catch (err) {
      console.error("Member article details error:", err);
      setError(err.message || "Unable to load this article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const formatDate = (date) => {
    if (!date) return "Recently published";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently published";
    }

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) return <ContentLoading />;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* BACK LINK */}
      <Link
        to="/portal/member/dashboard/articles"
        className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary) hover:gap-3"
      >
        <ArrowLeft size={17} />
        Back to Articles
      </Link>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-(--danger)/20 bg-(--danger)/5 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-(--danger)"
            />

            <div className="flex-1">
              <h1 className="font-semibold text-(--primary)">
                Unable to open article
              </h1>

              <p className="mt-1 text-sm text-(--danger)">
                {error}
              </p>

              <button
                type="button"
                onClick={loadArticle}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-(--primary)"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE */}
      {article && !error && (
        <article className="overflow-hidden rounded-xl border border-(--border) bg-(--bg-white)">
          {/* COVER IMAGE */}
          <div className="h-56 bg-(--bg-light) sm:h-80 lg:h-96">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-(--text-muted)">
                <ImageOff size={38} />
              </div>
            )}
          </div>

          <div className="mx-auto max-w-3xl px-5 py-7 sm:px-8 sm:py-10">
            {/* CATEGORY */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-(--primary-light) px-3 py-1.5 text-xs font-semibold text-(--primary)">
                <Newspaper size={14} />
                {article.category || "Article"}
              </span>

              {article.visibility === "members" && (
                <span className="rounded-full bg-(--primary) px-3 py-1.5 text-xs font-medium text-white">
                  Members only
                </span>
              )}
            </div>

            {/* TITLE */}
            <h1 className="mt-5 text-2xl font-bold leading-tight text-(--primary) sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>

            {/* METADATA */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-(--border) pb-5 text-sm text-(--secondary)">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>

              {article.createdBy && (
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} />
                  {[
                    article.createdBy.firstName,
                    article.createdBy.lastName,
                  ]
                    .filter(Boolean)
                    .join(" ") || "ONW GOSA"}
                </span>
              )}
            </div>

            {/* EXCERPT */}
            {article.excerpt && (
              <p className="mt-6 border-l-4 border-(--secondary) pl-4 text-base leading-7 text-(--secondary)">
                {article.excerpt}
              </p>
            )}

            {/* FULL CONTENT */}
            <div className="mt-7 whitespace-pre-wrap break-words text-sm leading-8 text-(--primary) sm:text-base">
              {article.content || "No article content is available."}
            </div>

            {/* FOOTER */}
            <div className="mt-10 border-t border-(--border) pt-6">
              <Link
                to="/portal/member/dashboard/articles"
                className="inline-flex items-center gap-2 rounded-lg bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <ArrowLeft size={16} />
                Back to All Articles
              </Link>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default MemberArticleDetails;
