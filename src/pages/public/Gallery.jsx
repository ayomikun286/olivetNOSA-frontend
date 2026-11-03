
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";
import { getPublicWebsiteContent } from "../../services/authService.js";

import {
  ArrowRight,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = [
  "Heritage",
  "Olivet",
  "Community",
  "People",
  "Students",
  "Campus",
];

// Normalize the API URL to avoid accidentally getting /api/api/...
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

export default function Gallery() {
  // Gallery navigation
  const [albums, setAlbums] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);


  // Album and featured photographs
  const [albumImages, setAlbumImages] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSource, setSelectedImageSource] = useState("album");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // Loading and errors
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [error, setError] = useState("");

  // CMS content
  const [pageContent, setPageContent] = useState({});

  // =====================================================
  // INITIALIZATION
  // =====================================================

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });

    window.scrollTo(0, 0);
  }, []);

  // =====================================================
  // LOAD CMS CONTENT
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    const loadPageContent = async () => {
      try {
        const result = await getPublicWebsiteContent("gallery");

        if (isMounted && result?.success && result?.page?.content) {
          setPageContent(result.page.content);
        }
      } catch (error) {
        console.warn(
          "Unable to load published Gallery content. Using defaults.",
          error.message
        );
      }
    };

    loadPageContent();

    return () => {
      isMounted = false;
    };
  }, []);

  // =====================================================
  // LOAD PUBLISHED ALBUMS
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    const fetchAlbums = async () => {
      try {
        setLoadingAlbums(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/gallery/albums`
        );

        if (!response.ok) {
          throw new Error("Failed to load gallery albums.");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to load gallery albums."
          );
        }

        if (isMounted) {
          setAlbums(result.data || []);
        }
      } catch (err) {
        console.error("Gallery albums error:", err);

        if (isMounted) {
          setError("We couldn't load the gallery. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoadingAlbums(false);
        }
      }
    };

    fetchAlbums();

    return () => {
      isMounted = false;
    };
  }, []);


  // =====================================================
  // LOAD FEATURED PHOTOGRAPHS
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedImages = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/gallery/featured`
        );

        if (!response.ok) {
          throw new Error("Failed to load featured photographs.");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to load featured photographs."
          );
        }

        if (isMounted) {
          setFeaturedImages(result.data || []);
        }
      } catch (err) {
        console.error("Featured photographs error:", err);

        if (isMounted) {
          setFeaturedImages([]);
        }
      }
    };

    fetchFeaturedImages();

    return () => {
      isMounted = false;
    };
  }, []);

  // =====================================================
  // LOAD PHOTOGRAPHS FOR A SELECTED ALBUM
  // =====================================================

  const fetchAlbumImages = async (albumId, page = 1) => {
    try {
      setLoadingImages(true);
      setError("");
      setSelectedImage(null);

      const response = await fetch(
        `${API_BASE_URL}/api/gallery/albums/${albumId}/images?page=${page}&limit=24`
      );

      if (!response.ok) {
        throw new Error("Failed to load album photographs.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Failed to load album photographs."
        );
      }

      setAlbumImages(result.data.images || []);
      setPagination(result.data.pagination);
      setCurrentPage(result.data.pagination.page);
    } catch (err) {
      console.error("Album photographs error:", err);

      setAlbumImages([]);
      setPagination(null);
      setError(
        "We couldn't load these photographs. Please try again."
      );
    } finally {
      setLoadingImages(false);
    }
  };

  // =====================================================
  // NAVIGATION HANDLERS
  // =====================================================

  const openCategory = (category) => {
    setActiveCategory(category);
    setSelectedAlbum(null);
    setSelectedImage(null);
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToCategories = () => {
    setActiveCategory(null);
    setSelectedAlbum(null);
    setSelectedImage(null);
    setAlbumImages([]);
    setPagination(null);
    setCurrentPage(1);
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(null);
    setAlbumImages([]);
    setPagination(null);
    setCurrentPage(1);
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchAlbumImages(album._id, 1);
  };

  const backToAlbums = () => {
    setSelectedAlbum(null);
    setSelectedImage(null);
    setAlbumImages([]);
    setPagination(null);
    setCurrentPage(1);
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changePage = (page) => {
    if (
      !selectedAlbum ||
      loadingImages ||
      page < 1 ||
      page > (pagination?.totalPages || 1)
    ) {
      return;
    }

    fetchAlbumImages(selectedAlbum._id, page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =====================================================
  // ALBUM FILTERING
  // =====================================================

  const categoryAlbums = activeCategory
    ? albums.filter((album) => album.category === activeCategory)
    : [];


  // =====================================================
  // FEATURED IMAGE HANDLER
  // =====================================================

  const openFeaturedImage = (image) => {
    setSelectedImageSource("featured");
    setSelectedImage(image);
  };

  // =====================================================
  // LIGHTBOX NAVIGATION
  // =====================================================

  const currentImages =
    selectedImageSource === "featured"
      ? featuredImages
      : albumImages;

  const currentIndex = selectedImage
    ? currentImages.findIndex(
      (image) => image._id === selectedImage._id
    )
    : -1;

  const showPrevious = () => {
    if (currentIndex === -1 || currentImages.length < 2) return;

    const previousIndex =
      currentIndex === 0
        ? currentImages.length - 1
        : currentIndex - 1;

    setSelectedImage(currentImages[previousIndex]);
  };

  const showNext = () => {
    if (currentIndex === -1 || currentImages.length < 2) return;

    const nextIndex =
      currentIndex === currentImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(currentImages[nextIndex]);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="mt-0 overflow-x-hidden bg-white text-[var(--primary-dark)] md:mt-15">
      <PageTitle
        title={`${pageContent.pageTitle || "Gallery"} | NOSA`}
      />

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[90vh] overflow-hidden bg-[var(--primary-dark)] md:min-h-screen">
        <img
          src={pageContent.heroImage || "/images/olivetNOSA-2.jpg"}
          alt="Olivetians"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[var(--primary-dark)]/60" />

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/75 to-[var(--primary-dark)]/15" />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />

        <div className="absolute inset-x-0 bottom-0 border-t border-white/10" />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-5 pb-8 sm:px-8 md:min-h-screen lg:px-12 lg:pb-10">
          <div data-aos="fade-up" className="max-w-5xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--secondary)]" />

              <div className="flex items-center gap-3 text-white/70">
                <Camera size={15} strokeWidth={1.8} />

                <span className="text-xs font-semibold uppercase tracking-[0.28em]">
                  Gallery
                </span>
              </div>
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Moments that
              <span className="block text-[var(--secondary)]">
                remain.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              {pageContent.intro ||
                "More than photographs. A collection of people, places and memories that continue to tell the Olivetian story."}
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mt-16 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-white/15 text-sm text-white/70">
                ↓
              </span>

              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                Explore the archive
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Heritage · People · Community
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="bg-white py-24 sm:py-32 lg:py-30">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-20 lg:px-12">
          <div data-aos="fade-up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              The Archive
            </p>

            <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              More than photographs.
              <span className="block text-[var(--primary)]">
                These are memories.
              </span>
            </h2>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              Every photograph carries a piece of the Olivetian
              experience — the school, the friendships, the
              gatherings and the generations that continue to
              make Olivet what it is today.
            </p>

            <div className="mt-8 h-px w-20 bg-[var(--secondary)]" />
          </div>
        </div>
      </section>


      {/* =====================================================
    FEATURED MEMORIES
====================================================== */}

      {featuredImages.length > 0 && (
        <section className="bg-[var(--primary-dark)] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

            <div
              className="mb-12 max-w-2xl"
              data-aos="fade-up"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Selected Memories
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                A Glimpse of Our Memories.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/60">
                Every photograph tells a story. Explore some of the
                memorable moments, reunions, and experiences that
                celebrate the Olivetian spirit.
              </p>
            </div>

            <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredImages.map((item, index) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => openFeaturedImage(item)}
                  className={`group relative overflow-hidden bg-black text-left ${index === 0
                      ? "sm:col-span-2 sm:row-span-2"
                      : index === 3
                        ? "sm:row-span-2"
                        : ""
                    }`}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 70}
                >
                  <img
                    src={item.image}
                    alt={item.album?.title || "Olivetian memory"}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                      {item.album?.category || "NOSA Memories"}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                      {item.album?.title || "A Moment to Remember"}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/65 opacity-0 transition group-hover:opacity-100">
                      View photograph
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          CATEGORY / ALBUM / PHOTOGRAPH ARCHIVE
      ====================================================== */}

      <section className="border-y border-black/10 bg-white py-20 sm:py-28 lg:py-26">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* CATEGORY VIEW */}

          {!activeCategory && !selectedAlbum && (
            <>
              <div
                className="mb-12 border-b border-black/10 pb-7"
                data-aos="fade-up"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  Explore the archive
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                  Browse by category.
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                  Explore photographs and memories arranged into
                  collections from across the Olivetian community.
                </p>
              </div>

              {loadingAlbums ? (
                <p className="py-12 text-center text-sm text-[var(--text-muted)]">
                  Loading gallery categories...
                </p>
              ) : error ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-red-600">{error}</p>

                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-5 text-sm font-semibold underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category, index) => {
                    const count = albums.filter(
                      (album) => album.category === category
                    ).length;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => openCategory(category)}
                        className="group border border-black/10 p-7 text-left transition hover:border-[var(--secondary)] hover:bg-[var(--primary-dark)] hover:text-white"
                        data-aos="fade-up"
                        data-aos-delay={(index % 3) * 70}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                            Collection
                          </span>

                          <ArrowRight
                            size={20}
                            className="transition group-hover:translate-x-1"
                          />
                        </div>

                        <h3 className="mt-10 text-2xl font-semibold">
                          {category}
                        </h3>

                        <p className="mt-3 text-sm opacity-60">
                          {count} {count === 1 ? "album" : "albums"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ALBUM VIEW */}

          {activeCategory && !selectedAlbum && (
            <>
              <button
                type="button"
                onClick={backToCategories}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--primary-dark)]"
              >
                <ChevronLeft size={18} />
                All categories
              </button>

              <div className="mb-12 border-b border-black/10 pb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  {activeCategory}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                  Explore the albums.
                </h2>

                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {categoryAlbums.length}{" "}
                  {categoryAlbums.length === 1 ? "album" : "albums"} in this
                  collection.
                </p>
              </div>

              {loadingAlbums ? (
                <p className="py-12 text-center text-sm text-[var(--text-muted)]">
                  Loading albums...
                </p>
              ) : error ? (
                <p className="py-12 text-center text-sm text-red-600">
                  {error}
                </p>
              ) : categoryAlbums.length === 0 ? (
                <p className="py-12 text-center text-sm text-[var(--text-muted)]">
                  No published albums in this category yet.
                </p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryAlbums.map((album, index) => (
                    <button
                      key={album._id}
                      type="button"
                      onClick={() => openAlbum(album)}
                      className="group overflow-hidden border border-black/10 text-left transition hover:border-[var(--secondary)]"
                      data-aos="fade-up"
                      data-aos-delay={(index % 3) * 70}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--primary-dark)]">
                        {album.coverImage?.image ? (
                          <img
                            src={album.coverImage.image}
                            alt={album.coverImage.title || album.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-white/40">
                            <Camera size={40} />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/60 to-transparent" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
                            {album.category}
                          </span>

                          <span className="text-xs text-[var(--text-muted)]">
                            {album.year}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-semibold">
                          {album.title}
                        </h3>

                        {album.description && (
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">
                            {album.description}
                          </p>
                        )}

                        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                          <span className="text-xs text-[var(--text-muted)]">
                            {album.imageCount ?? 0} photographs
                          </span>

                          <span className="inline-flex items-center gap-2 text-xs font-semibold">
                            View album
                            <ArrowRight size={15} />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* PHOTOGRAPH VIEW */}

          {selectedAlbum && (
            <>
              <button
                type="button"
                onClick={backToAlbums}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--primary-dark)]"
              >
                <ChevronLeft size={18} />
                Back to {activeCategory} albums
              </button>

              <div className="mb-12 flex flex-col gap-4 border-b border-black/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                    {selectedAlbum.category} · {selectedAlbum.year}
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                    {selectedAlbum.title}
                  </h2>

                  {selectedAlbum.description && (
                    <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                      {selectedAlbum.description}
                    </p>
                  )}
                </div>

                {pagination && (
                  <span className="text-sm text-[var(--text-muted)]">
                    {pagination.total} photographs
                  </span>
                )}
              </div>

              {loadingImages ? (
                <p className="py-12 text-center text-sm text-[var(--text-muted)]">
                  Loading photographs...
                </p>
              ) : error ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-red-600">{error}</p>

                  <button
                    type="button"
                    onClick={() =>
                      fetchAlbumImages(selectedAlbum._id, currentPage)
                    }
                    className="mt-5 text-sm font-semibold underline"
                  >
                    Try again
                  </button>
                </div>
              ) : albumImages.length === 0 ? (
                <p className="py-12 text-center text-sm text-[var(--text-muted)]">
                  No photographs in this album yet.
                </p>
              ) : (
                <>
                  {/* PHOTOGRAPH GRID */}

                  <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {albumImages.map((item, index) => {
                      const sizeClass =
                        item.size === "large"
                          ? "sm:col-span-2 sm:row-span-2"
                          : item.size === "tall"
                            ? "sm:row-span-2"
                            : "row-span-1";

                      return (
                        <button
                          key={item._id}
                          type="button"
                          onClick={() => {
                            setSelectedImageSource("album");
                            setSelectedImage(item);
                          }}
                          className={`group relative overflow-hidden bg-[var(--primary-dark)] text-left ${sizeClass}`}
                          data-aos="fade-up"
                          data-aos-delay={(index % 4) * 70}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/90 via-[var(--primary-dark)]/10 to-transparent opacity-75 transition duration-500 group-hover:opacity-100" />

                          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                            <h3 className="text-xl font-semibold tracking-tight text-white">
                              {selectedAlbum?.title}
                            </h3>

                            <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/65 opacity-0 transition duration-300 group-hover:opacity-100">
                              View photograph
                              <ArrowRight size={14} />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* PAGINATION */}

                  {pagination && pagination.totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-5">
                      <button
                        type="button"
                        disabled={
                          !pagination.hasPreviousPage || loadingImages
                        }
                        onClick={() => changePage(currentPage - 1)}
                        className="flex h-11 w-11 items-center justify-center border border-black/10 transition hover:border-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <span className="text-sm text-[var(--text-muted)]">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>

                      <button
                        type="button"
                        disabled={!pagination.hasNextPage || loadingImages}
                        onClick={() => changePage(currentPage + 1)}
                        className="flex h-11 w-11 items-center justify-center border border-black/10 transition hover:border-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Next page"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          HERITAGE STORY
      ====================================================== */}

      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            <div
              className="relative min-h-[420px] overflow-hidden sm:min-h-[560px]"
              data-aos="fade-right"
            >
              <img
                src="/images/olivetNOSA-am.jpg"
                alt="Olivet heritage"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-[var(--primary-dark)]/15" />

              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--primary-dark)]/70 to-transparent" />
            </div>

            <div data-aos="fade-left" data-aos-delay="100">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--secondary)]" />

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                  Heritage
                </p>
              </div>

              <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.7rem]">
                A school remembered through generations.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                From the earliest days of Olivet to the community
                that exists today, its story lives in the memories
                of those who passed through its gates.
              </p>

              <p className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                The photographs may capture a moment, but the
                memories behind them continue to connect
                generations of Olivetians.
              </p>

              <Link
                to="/about-school#history"
                className="mt-9 inline-flex items-center gap-3 border-b border-[var(--secondary)] pb-2 text-sm font-semibold text-white transition hover:gap-4"
              >
                Explore Olivet History
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMUNITY CTA
      ====================================================== */}

      <section className="bg-white py-24 sm:py-32 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div data-aos="fade-up">
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[var(--secondary)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                Keep The Story Going
              </p>

              <span className="h-px w-10 bg-[var(--secondary)]" />
            </div>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Your Olivetian memories matter.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              The archive grows with every generation. Stay
              connected, reconnect with fellow Olivetians and be
              part of the continuing story.
            </p>

            <Link
              to="/olivetians"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[var(--primary-dark)] px-6 py-3.5 text-sm font-semibold text-white transition hover:gap-4"
            >
              Meet the Olivetian Community
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          LIGHTBOX
      ====================================================== */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          {/* CLOSE */}

          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          {/* PREVIOUS */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            disabled={albumImages.length < 2}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-30 sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* IMAGE */}

          <div
            className="relative flex max-h-[90vh] max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[78vh] max-w-full object-contain shadow-2xl"
            />

            <div className="mt-5 text-center text-white">
  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
    {selectedImageSource === "featured"
      ? selectedImage.album?.category
      : selectedAlbum?.category}
  </p>

  <h3 className="mt-2 text-xl font-semibold">
    {selectedImageSource === "featured"
      ? selectedImage.album?.title
      : selectedAlbum?.title}
  </h3>

  <p className="mt-2 text-xs text-white/45">
    {currentIndex + 1} / {currentImages.length}
  </p>
</div>
          </div>

          {/* NEXT */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            disabled={albumImages.length < 2}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-30 sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
