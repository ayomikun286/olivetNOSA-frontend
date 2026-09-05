import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";

import {
  ArrowRight,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const galleryImages = [
  {
    id: 1,
    image: "/images/olivetNOSA-2.jpg",
    title: "The Olivetian Journey",
    category: "Olivet",
    size: "large",
  },
  {
    id: 2,
    image: "/images/olivetNOSA-6.jpg",
    title: "Olivetians Together",
    category: "Community",
    size: "normal",
  },
  {
    id: 3,
    image: "/images/olivetNOSA-am.jpg",
    title: "Where It Began",
    category: "Heritage",
    size: "normal",
  },
  {
    id: 4,
    image: "/images/olivetsNOSA__ -olaojo.webp",
    title: "Leadership & Service",
    category: "People",
    size: "normal",
  },
  {
    id: 5,
    image: "/images/olivetNOSA-student.jpg",
    title: "The Next Generation",
    category: "Students",
    size: "tall",
  },
  {
    id: 6,
    image: "/images/olivetNOSA-building.jpg",
    title: "Olivet Heights",
    category: "Campus",
    size: "normal",
  },
  {
    id: 7,
    image: "/images/olivetNOSA.jpg",
    title: "A Living Legacy",
    category: "Heritage",
    size: "large",
  },
  {
    id: 8,
    image: "/images/olivet-school.jpg",
    title: "Olivet Baptist High School",
    category: "Campus",
    size: "normal",
  },
];

const categories = [
  "All",
  "Heritage",
  "Olivet",
  "Community",
  "People",
  "Students",
  "Campus",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });

    window.scrollTo(0, 0);
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (image) => image.category === activeCategory
        );

  const currentIndex = selectedImage
    ? filteredImages.findIndex(
        (image) => image.id === selectedImage.id
      )
    : -1;

  const showPrevious = () => {
    if (currentIndex === -1) return;

    const previousIndex =
      currentIndex === 0
        ? filteredImages.length - 1
        : currentIndex - 1;

    setSelectedImage(filteredImages[previousIndex]);
  };

  const showNext = () => {
    if (currentIndex === -1) return;

    const nextIndex =
      currentIndex === filteredImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <main className="mt-0 bg-white text-[var(--primary-dark)] md:mt-15">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[var(--primary-dark)] md:min-h-screen">
        <img
          src="/images/olivetNOSA-2.jpg"
          alt="Olivetians"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-[var(--primary-dark)]/60" />

        {/* Editorial gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-dark)]/75 to-[var(--primary-dark)]/15" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />

        {/* Bottom border */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10" />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-5 pb-8 sm:px-8 md:min-h-screen lg:px-12 lg:pb-10">
          <div
            data-aos="fade-up"
            className="max-w-5xl"
          >
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--secondary)]" />

              <div className="flex items-center gap-3 text-white/70">
                <Camera size={15} strokeWidth={1.8} />

                <span className="text-xs font-semibold uppercase tracking-[0.28em]">
                  Gallery
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Moments that
              <span className="block text-[var(--secondary)]">
                remain.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              More than photographs. A collection of people,
              places and memories that continue to tell the
              Olivetian story.
            </p>
          </div>

          {/* Bottom information */}
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
      <section className="bg-white py-24 sm:py-32 lg:py-40">
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

          <div
            data-aos="fade-up"
            data-aos-delay="100"
          >
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
          CATEGORY NAVIGATION
      ====================================================== */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-8 lg:px-12">
          <div className="flex min-w-max items-center">
            {categories.map((category, index) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-5 py-5 text-sm font-semibold transition first:pl-0 sm:px-6 ${
                    isActive
                      ? "text-[var(--primary-dark)]"
                      : "text-[var(--text-muted)] hover:text-[var(--primary-dark)]"
                  }`}
                >
                  {category}

                  {isActive && (
                    <span className="absolute inset-x-5 bottom-0 h-0.5 bg-[var(--secondary)] first:left-0 sm:inset-x-6" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          GALLERY ARCHIVE
      ====================================================== */}
      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Section heading */}
          <div
            className="mb-12 flex flex-col gap-4 border-b border-black/10 pb-7 sm:flex-row sm:items-end sm:justify-between"
            data-aos="fade-up"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                Moments
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                The Olivetian archive.
              </h2>
            </div>

            <span className="text-sm text-[var(--text-muted)]">
              {filteredImages.length}{" "}
              {filteredImages.length === 1
                ? "photograph"
                : "photographs"}
            </span>
          </div>

          {/* Masonry gallery */}
          <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredImages.map((item, index) => {
              const sizeClass =
                item.size === "large"
                  ? "sm:col-span-2 sm:row-span-2"
                  : item.size === "tall"
                    ? "sm:row-span-2"
                    : "row-span-1";

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className={`group relative overflow-hidden bg-[var(--primary-dark)] text-left ${sizeClass}`}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 70}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/90 via-[var(--primary-dark)]/10 to-transparent opacity-75 transition duration-500 group-hover:opacity-100" />

                  {/* Image content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                      {item.category}
                    </p>

                    <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {item.title}
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
        </div>
      </section>

      {/* =====================================================
          HERITAGE STORY
      ====================================================== */}
      <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            {/* Image */}
            <div
              className="relative min-h-[420px] overflow-hidden sm:min-h-[560px]"
              data-aos="fade-right"
            >
              <img
                src="/images/olivetNOSA-am.jpg"
                alt="Olivet heritage"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-[var(--primary-dark)]/15" />

              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--primary-dark)]/70 to-transparent" />
            </div>

            {/* Content */}
            <div
              data-aos="fade-left"
              data-aos-delay="100"
            >
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
      <section className="bg-white py-24 sm:py-32 lg:py-40">
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
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
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
                {selectedImage.category}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {selectedImage.title}
              </h3>

              <p className="mt-2 text-xs text-white/45">
                {currentIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-8"
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