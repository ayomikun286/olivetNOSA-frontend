import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    ChevronDown,
    Menu,
    X,
    Play,
    Sparkles,
} from "lucide-react";

import {
    UsersRound,
    Link2,
    HeartHandshake,
} from "lucide-react";

// import olivetGate from "../../assets/images/hero/olivetNOSA-5";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
export default function Home({}) {


    const heroImages = [
        "/images/olivetNOSA-4.jpg",
        "/images/olivetNOSA-2.jpg",
        "/images/olivetNOSA-10.jpg",
        "/images/olivetNOSA.jpg.jpg",
        "/images/olivetNOSA-3.jpg",
        "/images/olivetNOSA-6.jpg",

    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);


    return (
        <main className="min-h-screen bg-white">

            {/* =========================
                    HERO
            ========================== */}
            <section className="relative min-h-screen overflow-hidden bg-[var(--primary-dark)]">



                {/* =========================
                        DYNAMIC BACKGROUND
                ========================== */}
                <div className="absolute inset-0">

                    {heroImages.map((image, index) => (
                        <div
                            key={image}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${index === currentImage
                                ? "opacity-100"
                                : "opacity-0"
                                }`}
                            style={{
                                backgroundImage: `url("${image}")`,
                                transform:
                                    index === currentImage
                                        ? "scale(1.05)"
                                        : "scale(1)",
                                transition:
                                    "opacity 1500ms ease-in-out, transform 7000ms ease-out",
                            }}
                        />
                    ))}

                </div>


                <div className="absolute inset-0 bg-[var(--primary-dark)]/40" />


                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/85 via-[var(--primary-dark)]/55 to-transparent" />

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />


                {/* =========================
                                    NAVBAR
                            ========================== */}


                <header className="fixed left-0 right-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12">
                    <Navbar  />
                </header>



                {/* =========================
                                    HERO CONTENT
                            ========================== */}
                <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-32 sm:px-8 lg:px-12">

                    <div className="grid w-full items-end gap-16 lg:grid-cols-[1fr_320px]">

                        {/* Main Content */}
                        <div className="max-w-4xl">

                            {/* Heritage Badge */}
                            <div data-aos="fade-right" data-aos-delay="150" className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 px-4 py-2 backdrop-blur-md">

                                <Sparkles
                                    size={14}
                                    className="text-[var(--secondary)]"
                                />

                                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)] sm:text-xs">
                                    Established 1945 · Olivet Heights
                                </span>

                            </div>

                            {/* Heading */}
                            <h1 data-aos="fade-up" className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">

                                A Legacy of
                                <span className="block text-[var(--secondary)]">
                                    Excellence.
                                </span>

                                <span className="block">
                                    A Future of Possibility.
                                </span>

                            </h1>

                            {/* Description */}
                            <p
                                data-aos="fade-up"
                                data-aos-delay="150"

                                className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">

                                For more than eight decades, Olivet Baptist High School
                                has shaped generations through education, character,
                                leadership and service.

                            </p>

                            {/* Actions */}
                            <div data-aos="fade-up" data-aos-delay="100" className="mt-9 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/about-school"
                                    className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-dark)] shadow-xl transition hover:translate-y-[-2px] hover:shadow-2xl"
                                >
                                    Discover Our Story

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/about-nosa"
                                    className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                                        <Play size={12} fill="currentColor" />
                                    </span>

                                    Explore NOSA
                                </Link>

                            </div>

                        </div>

                        {/* =========================
                HERITAGE CARD
            ========================== */}
                        <div className="hidden lg:block">

                            <div data-aos="fade-up" className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                                <div className="mb-8 flex items-center justify-between">

                                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
                                        Our Journey
                                    </span>

                                    <span className="h-2 w-2 rounded-full bg-[var(--secondary)] shadow-[0_0_12px_var(--secondary)]" />

                                </div>

                                <div className="flex items-end gap-4">

                                    <div>
                                        <p className="text-5xl font-semibold tracking-tight text-white">
                                            1945
                                        </p>

                                        <p className="mt-1 text-xs text-white/50">
                                            The beginning
                                        </p>
                                    </div>

                                    <div className="mb-3 h-px flex-1 bg-gradient-to-r from-[var(--secondary)]/70 to-white/10" />

                                    <div className="text-right">
                                        <p className="text-3xl font-semibold text-[var(--secondary)]">
                                            80+
                                        </p>

                                        <p className="mt-1 text-xs text-white/50">
                                            Years of legacy
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-6 border-t border-white/10 pt-5">

                                    <p className="text-sm leading-6 text-white/60">
                                        Generations of Olivetians. One enduring spirit.
                                    </p>

                                </div>

                            </div>

                            {/* Motto */}
                            <div data-aos="fade-up" data-aos-delay="150" className="mt-5 px-2">

                                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--secondary)]">
                                    Our Motto
                                </p>

                                <p className="mt-2 font-serif text-xl italic text-white/80">
                                    “Cum Christo Progredere”
                                </p>

                                <p className="mt-1 text-xs text-white/40">
                                    Forward with Christ
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================
            SCROLL INDICATOR
        ========================== */}
                <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-white/40 md:flex">

                    <div className="h-8 w-px bg-white/20" />

                    <span className="text-[9px] font-medium uppercase tracking-[0.3em]">
                        Scroll to explore
                    </span>

                </div>

            </section>






            {/* =========================
                    LEGACY INTRO
                ========================== */}
            <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

                    <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* =========================
          LEFT — INTRO
      ========================== */}
                        <div>

                            <div className="mb-6 flex items-center gap-3">

                                <span data-aos="fade-right" data-aos-delay="150" className="h-px w-10 bg-[var(--secondary)]" />

                                <span data-aos="fade-in" className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Eight Decades of Purpose
                                </span>

                            </div>

                            <h2 data-aos="fade-right" data-aos-delay="100" className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">

                                More than a school.
                                <span className="block text-[var(--primary)]">
                                    A legacy that lives on.
                                </span>

                            </h2>

                            <p data-aos="fade-up" className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">

                                Since 1945, Olivet Baptist High School has stood as a place
                                where education meets character, leadership and service.
                                Generations of students have passed through Olivet Heights,
                                carrying its values into communities and institutions across
                                Nigeria and beyond.

                            </p>

                            <div className="mt-9">

                                <Link
                                    to="/about-school"
                                    data-aos="fade-right" data-aos-delay="150"
                                    className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                                >

                                    Discover our history

                                    <span data-aos="fade-left" data-aos-delay="150" className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--primary)]/20 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">

                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />

                                    </span>

                                </Link>

                            </div>

                        </div>


                        {/* =========================
          RIGHT — TIMELINE CARD
      ========================== */}
                        <div className="relative">

                            {/* Decorative number */}
                            <div className="absolute -right-4 -top-16 select-none text-[9rem] font-semibold leading-none tracking-[-0.08em] text-[var(--primary)]/[0.04] sm:text-[12rem]">
                                80
                            </div>

                            <div data-aos="fade-left" className="relative rounded-3xl border border-slate-200 bg-[var(--background-soft)] p-7 sm:p-9">

                                <div className="flex items-center justify-between">

                                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                                        Our Journey
                                    </span>

                                    <span className="rounded-full bg-[var(--secondary-light)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--primary-dark)]">
                                        Since 1945
                                    </span>

                                </div>


                                {/* Timeline */}
                                <div className="mt-10 space-y-8">

                                    {/* 1945 */}
                                    <div data-aos="fade-up" data-aos-delay="150" className="flex gap-5">

                                        <div className="flex flex-col items-center">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary-dark)] text-xs font-bold text-white">
                                                45
                                            </div>

                                            <div className="mt-2 h-full w-px bg-slate-200" />

                                        </div>

                                        <div className="pb-5">

                                            <p className="text-2xl font-semibold text-[var(--primary-dark)]">
                                                1945
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                                The beginning of the Olivet story in Oyo.
                                            </p>

                                        </div>

                                    </div>


                                    {/* 1976 */}
                                    <div data-aos="fade-up" data-aos-delay="300" className="flex gap-5">

                                        <div className="flex flex-col items-center">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--secondary)] bg-white text-xs font-bold text-[var(--secondary)]">
                                                76
                                            </div>

                                            <div className="mt-2 h-full w-px bg-slate-200" />

                                        </div>

                                        <div className="pb-5">

                                            <p className="text-2xl font-semibold text-[var(--primary-dark)]">
                                                1976
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                                The National Old Students Association was established,
                                                strengthening the bond between generations of Olivetians.
                                            </p>

                                        </div>

                                    </div>


                                    {/* Today */}
                                    <div data-aos="fade-up" data-aos-delay="450" className="flex gap-5">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-bold text-[var(--primary-dark)]">
                                            →
                                        </div>

                                        <div>

                                            <p className="text-2xl font-semibold text-[var(--primary-dark)]">
                                                Today
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                                A growing community committed to preserving the legacy
                                                and building the future.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>




            {/* =========================
    OUR STORY SECTION
========================= */}
            <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

                    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

                        {/* =========================
          IMAGE
      ========================== */}
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            className="relative"
                        >
                            {/* Decorative background */}
                            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-3xl bg-[var(--primary-light)]" />

                            {/* Image container */}
                            <div style={{ backgroundImage: `url("/images/olivetNOSA-10.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }} className="relative flex justify-center items-center aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--background-soft)] shadow-xl">

                              

                                {/* Image overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/30 via-transparent to-transparent" />
                            </div>

                            {/* Year badge */}
                            <div
                                data-aos="fade-up"
                                data-aos-delay="350"
                                className="absolute -bottom-5 right-6 rounded-2xl border border-white/70 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-md sm:right-8"
                            >
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Established
                                </p>

                                <p className="mt-1 text-3xl font-bold tracking-tight text-[var(--primary-dark)]">
                                    1945
                                </p>
                            </div>
                        </div>


                        {/* =========================
          CONTENT
      ========================== */}
                        <div>

                            {/* Section label */}
                            <div
                                data-aos="fade-left"
                                data-aos-delay="100"
                                className="mb-6 flex items-center gap-3"
                            >
                                <span className="h-px w-10 bg-[var(--secondary)]" />

                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Our Story
                                </span>
                            </div>


                            {/* Heading */}
                            <h2
                                data-aos="fade-left"
                                data-aos-delay="150"
                                className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl"
                            >
                                A tradition of
                                <span className="block text-[var(--primary)]">
                                    excellence since 1945.
                                </span>
                            </h2>


                            {/* Paragraph */}
                            <p
                                data-aos="fade-left"
                                data-aos-delay="250"
                                className="mt-7 max-w-xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
                            >
                                For generations, Olivet Baptist High School has been a place
                                where education goes beyond the classroom. From its beginnings
                                in Oyo to the generations of Olivetians it has shaped, the
                                school continues to stand for knowledge, character, leadership
                                and service.
                            </p>


                            {/* Stats */}
                            <div className="mt-9 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">

                                {/* Stat 1 */}
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    className="rounded-2xl border border-slate-200 bg-[var(--background-soft)] p-5"
                                >
                                    <p className="text-2xl font-bold text-[var(--primary)]">
                                        1945
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Founded
                                    </p>
                                </div>


                                {/* Stat 2 */}
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                    className="rounded-2xl border border-slate-200 bg-[var(--background-soft)] p-5"
                                >
                                    <p className="text-2xl font-bold text-[var(--primary)]">
                                        80+
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Years of legacy
                                    </p>
                                </div>


                                {/* Stat 3 */}
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="500"
                                    className="rounded-2xl border border-slate-200 bg-[var(--background-soft)] p-5"
                                >
                                    <p className="text-2xl font-bold text-[var(--primary)]">
                                        NOSA
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Alumni community
                                    </p>
                                </div>

                            </div>


                            {/* Button */}
                            <div
                                data-aos="fade-up"
                                data-aos-delay="550"
                                className="mt-9"
                            >
                                <Link
                                    to="/about-school"
                                    className="group inline-flex items-center gap-3 text-sm font-semibold text-(--primary)"
                                >
                                    Discover our history

                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-(--primary)/20 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </span>
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </section>



            {/* =========================
                                NOSA_SECTION
                            ========================= */}
            <section style={{ backgroundImage: `url("/images/olivetNOSA-10.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }} className="relative overflow-hidden bg-(--primary-dark) py-24 sm:py-28 lg:py-32">

                {/* Decorative Elements */}
                <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[var(--primary)]/30 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--secondary)]/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

                    {/* =========================
                            INTRO
                        ========================== */}
                    <div className="max-w-3xl">

                        <div
                            data-aos="fade-right"
                            className="mb-6 flex items-center gap-3"
                        >
                            <span className="h-px w-10 bg-[var(--secondary)]" />

                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Our Community
                            </span>
                        </div>

                        <h2
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
                        >
                            One Olivet.
                            <span className="block text-[var(--secondary)]">
                                One community.
                            </span>
                            <span className="block">
                                Generations connected.
                            </span>
                        </h2>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg"
                        >
                            NOSA brings together generations of Olivetians with a shared
                            commitment to preserving the school's heritage, supporting
                            its development and creating opportunities for the generations
                            that follow.
                        </p>

                    </div>


                    {/* =========================
        PURPOSE CARDS
    ========================== */}
                    <div className="mt-16 grid gap-5 md:grid-cols-3">

                        {/* Card 1 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--secondary)]/30 hover:bg-white/[0.09]"
                        >

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                                <span className="text-xl font-bold">
                                    01
                                </span>
                            </div>

                            <h3 className="mt-7 text-xl font-semibold text-white">
                                Preserve the Legacy
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-white/50">
                                Keeping the history, traditions and values of Olivet
                                alive for generations to come.
                            </p>

                        </div>


                        {/* Card 2 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--secondary)]/30 hover:bg-white/[0.09]"
                        >

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                                <span className="text-xl font-bold">
                                    02
                                </span>
                            </div>

                            <h3 className="mt-7 text-xl font-semibold text-white">
                                Build the Future
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-white/50">
                                Supporting initiatives that strengthen education,
                                infrastructure and opportunities for today's students.
                            </p>

                        </div>


                        {/* Card 3 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--secondary)]/30 hover:bg-white/[0.09]"
                        >

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                                <span className="text-xl font-bold">
                                    03
                                </span>
                            </div>

                            <h3 className="mt-7 text-xl font-semibold text-white">
                                Connect Olivetians
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-white/50">
                                Creating a stronger network where old students can
                                reconnect, collaborate and give back.
                            </p>

                        </div>

                    </div>


                    {/* =========================
        CTA
    ========================== */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="350"
                        className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white bg-white p-7 sm:flex-row sm:items-center sm:p-8"
                    >

                        <div>
                            <p className="text-lg font-semibold text-[var(--primary-dark)]">
                                Be part of the Olivet story.
                            </p>

                            <p className="mt-1 text-smtext-[var(--primary-dark)]">
                                Connect with fellow Olivetians and support the next generation.
                            </p>
                        </div>

                        <Link
                            to="/about-nosa"
                            className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-dark)] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Discover NOSA

                            <ArrowRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                    </div>

                </div>
            </section>



            {/* =========================
                                                  OLIVETIANS SECTION
                                             ========================= */}
            <section className="relative overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    {/* Section Header */}
                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <div
                                data-aos="fade-right"
                                className="mb-6 flex items-center gap-3"
                            >
                                <span className="h-px w-10 bg-[var(--secondary)]" />

                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    The Olivetian Community
                                </span>
                            </div>

                            <h2
                                data-aos="fade-up"
                                data-aos-delay="100"
                                className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl"
                            >
                                The people who
                                <span className="block text-[var(--primary)]">
                                    carry the legacy.
                                </span>
                            </h2>

                            <p
                                data-aos="fade-up"
                                data-aos-delay="200"
                                className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
                            >
                                From different generations and different walks of life, Olivetians
                                remain connected by the values, friendships and memories formed on
                                the Heights.
                            </p>
                        </div>

                        <div data-aos="fade-left" data-aos-delay="200">
                            <Link
                                to="/olivetians"
                                className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                            >
                                Explore the Olivetian community

                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]/20 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Community Cards */}
                    <div className="mt-16 grid gap-5 md:grid-cols-3">
                        {/* Card 1 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--primary-light)] blur-2xl transition-all duration-500 group-hover:scale-150" />

                            <div className="relative">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
                                    <UsersRound size={24} strokeWidth={1.8} />
                                </div>

                                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--primary-dark)]">
                                    Generations
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                                    Connect with Olivetians across generations and rediscover the
                                    friendships and relationships that began on the Heights.
                                </p>

                                <div className="mt-8 h-px w-full bg-slate-100" />

                                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    1945 — Today
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--secondary-light)] blur-2xl transition-all duration-500 group-hover:scale-150" />

                            <div className="relative">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--secondary-light)] text-[var(--secondary)]">
                                    <Link2 size={24} strokeWidth={1.8} />
                                </div>

                                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--primary-dark)]">
                                    Connections
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                                    Build meaningful connections, collaborate professionally and stay
                                    involved with the wider Olivetian network.
                                </p>

                                <div className="mt-8 h-px w-full bg-slate-100" />

                                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    Connect · Collaborate
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--primary-light)] blur-2xl transition-all duration-500 group-hover:scale-150" />

                            <div className="relative">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
                                    <HeartHandshake size={24} strokeWidth={1.8} />
                                </div>

                                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--primary-dark)]">
                                    Give Back
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                                    Support the school, contribute to meaningful initiatives and help
                                    create better opportunities for the generations coming after us.
                                </p>

                                <div className="mt-8 h-px w-full bg-slate-100" />

                                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    Legacy · Impact
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Community CTA */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="350"
                        className="relative mt-6 overflow-hidden rounded-[2rem] bg-[var(--primary)] px-7 py-10 sm:px-10 lg:px-12"
                    >
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

                        <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Stay Connected
                                </p>

                                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                    Your Olivet story is part of our story.
                                </h3>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                                    Join the community, update your profile and stay connected with
                                    fellow Olivetians around the world.
                                </p>
                            </div>

                            <Link
                                to="/portal/login"
                                className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-dark)] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Enter Member Portal

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>



            {/* =========================
    NEWS & EVENTS SECTION
========================= */}
            <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

                    {/* Section Header */}
                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <div
                                data-aos="fade-right"
                                className="mb-6 flex items-center gap-3"
                            >
                                <span className="h-px w-10 bg-[var(--secondary)]" />

                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Latest from Olivet
                                </span>
                            </div>

                            <h2
                                data-aos="fade-up"
                                data-aos-delay="100"
                                className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl"
                            >
                                Stories, moments &
                                <span className="block text-[var(--primary)]">
                                    what’s happening.
                                </span>
                            </h2>

                            <p
                                data-aos="fade-up"
                                data-aos-delay="200"
                                className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
                            >
                                Stay connected with the latest stories, announcements and events
                                from Olivet Baptist High School and the wider Olivetian community.
                            </p>
                        </div>

                        <div data-aos="fade-left" data-aos-delay="200">
                            <Link
                                to="/news"
                                className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                            >
                                View all news & events

                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]/20 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Editorial Layout */}
                    <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">

                        {/* =========================
          FEATURED STORY
      ========================= */}
                        <article
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/9] overflow-hidden bg-[var(--primary-light)]">
                                {/* Replace this placeholder with the actual image */}
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-[var(--primary)]">
                                            <span className="text-2xl font-bold">O</span>
                                        </div>

                                        <p className="mt-4 text-sm font-medium text-slate-400">
                                            Featured story image
                                        </p>

                                        <p className="mt-1 text-xs text-slate-300">
                                            Image placeholder
                                        </p>
                                    </div>
                                </div>

                                {/* Image overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                                {/* Featured label */}
                                <div className="absolute left-5 top-5">
                                    <span className="rounded-full bg-[var(--secondary)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
                                        Featured
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-7 sm:p-9">
                                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
                                    <span className="text-[var(--secondary)]">
                                        Olivet News
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                                    <span className="text-slate-400">
                                        2026
                                    </span>
                                </div>

                                <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[var(--primary-dark)] transition-colors duration-300 group-hover:text-[var(--primary)] sm:text-3xl">
                                    Celebrating the legacy and future of the Olivetian community
                                </h3>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                                    Discover the latest developments, stories and moments that
                                    continue to shape the Olivet Baptist High School community.
                                </p>

                                <Link
                                    to="/news"
                                    className="group/link mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                                >
                                    Read story

                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                                    />
                                </Link>
                            </div>
                        </article>

                        {/* =========================
          SUPPORTING STORIES
      ========================= */}
                        <div className="grid gap-6">

                            {/* News Card */}
                            <article
                                data-aos="fade-left"
                                data-aos-delay="200"
                                className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--background-soft)] transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:flex-row lg:flex-col"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--primary-light)] sm:w-[40%] sm:shrink-0 lg:w-full">
                                    <div className="flex h-full items-center justify-center">
                                        <div className="text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 text-[var(--primary)]">
                                                <span className="font-bold">O</span>
                                            </div>

                                            <p className="mt-3 text-xs text-slate-400">
                                                News image
                                            </p>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-[var(--primary-dark)]/10 transition-colors duration-500 group-hover:bg-[var(--primary-dark)]/20" />
                                </div>

                                <div className="p-6 sm:p-7">
                                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
                                        <span className="text-[var(--secondary)]">
                                            News
                                        </span>

                                        <span className="h-1 w-1 rounded-full bg-slate-300" />

                                        <span className="text-slate-400">
                                            Latest
                                        </span>
                                    </div>

                                    <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-[var(--primary-dark)] transition-colors duration-300 group-hover:text-[var(--primary)]">
                                        News and updates from the Heights
                                    </h3>

                                    <Link
                                        to="/news"
                                        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)]"
                                    >
                                        Read more

                                        <ArrowRight
                                            size={14}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </article>

                            {/* Event Card */}
                            <article
                                data-aos="fade-left"
                                data-aos-delay="300"
                                className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--primary-dark)] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:flex-row lg:flex-col"
                            >
                                {/* Event Image / Visual */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--primary)] sm:w-[40%] sm:shrink-0 lg:w-full">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]" />

                                    <div className="relative flex h-full items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                                Upcoming
                                            </p>

                                            <p className="mt-2 text-5xl font-bold tracking-tight text-white">
                                                01
                                            </p>

                                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">
                                                Event
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-7">
                                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
                                        <span className="text-[var(--secondary)]">
                                            Events
                                        </span>

                                        <span className="h-1 w-1 rounded-full bg-white/20" />

                                        <span className="text-white/35">
                                            Upcoming
                                        </span>
                                    </div>

                                    <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-white">
                                        Upcoming Olivetian events
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-white/45">
                                        Discover upcoming gatherings, activities and moments to connect
                                        with the Olivetian community.
                                    </p>

                                    <Link
                                        to="/events"
                                        className="group/link mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--secondary)]"
                                    >
                                        Explore events

                                        <ArrowRight
                                            size={14}
                                            className="transition-transform duration-300 group-hover/link:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </article>

                        </div>
                    </div>
                </div>
            </section>





{/* =========================
    GALLERY SECTION
========================= */}
<section className="relative overflow-hidden bg-[var(--background-soft)] py-24 sm:py-28 lg:py-32">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

    {/* Header */}
    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <div
          data-aos="fade-right"
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            From the Archives
          </span>
        </div>

        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl"
        >
          Moments that
          <span className="block text-[var(--primary)]">
            tell our story.
          </span>
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
        >
          A glimpse into the people, places and moments that have shaped
          generations of Olivetians.
        </p>
      </div>

      <div data-aos="fade-left" data-aos-delay="200">
        <Link
          to="/gallery"
          className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
        >
          Explore the full gallery

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]/20 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </div>
    </div>

    {/* Gallery Grid */}
    <div className="mt-16 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">

      {/* Large Image */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        style={{backgroundImage:"url('/images/olivetNOSA-2.jpg')", backgroundPosition:"center", backgroundSize:"cover"}}
        className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--primary-light)] lg:col-span-7 lg:row-span-2 lg:min-h-[620px]"
      >
       
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/70 via-transparent to-transparent" />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            The Olivetian Story
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Generations on the Heights
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/60">
            Moments from the people and places that continue to define
            the Olivetian experience.
          </p>
        </div>

        {/* Hover icon */}
        <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
          <ArrowRight
            size={17}
            className="-rotate-45"
          />
        </div>
      </div>

      {/* Image 2 */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        style={{backgroundImage:"url('/images/olivetNOSA-3.jpg')", backgroundPosition:"center", backgroundSize:"cover"}}
        className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--secondary-light)] lg:col-span-5"
      >
       

        <div className="absolute inset-0 bg-[var(--primary-dark)]/10 transition-all duration-500 group-hover:bg-[var(--primary-dark)]/30" />

        <div className="absolute bottom-5 left-5">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
            Heritage
          </span>
        </div>
      </div>

      {/* Image 3 */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        style={{backgroundImage:"url('/images/olivetNOSA-11.jpg')", backgroundPosition:"center", backgroundSize:"cover"}}
        className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--primary-light)] lg:col-span-5"
      >
        

        <div className="absolute inset-0 bg-[var(--primary-dark)]/10 transition-all duration-500 group-hover:bg-[var(--primary-dark)]/30" />

        <div className="absolute bottom-5 left-5">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
            Community
          </span>
        </div>
      </div>

    </div>

    {/* Bottom CTA */}
    <div
      data-aos="fade-up"
      data-aos-delay="350"
      className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:flex-row sm:items-center sm:p-8"
    >
      <div>
        <p className="text-lg font-semibold text-[var(--primary-dark)]">
          Every photograph holds a piece of history.
        </p>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Explore more memories from across the Olivetian community.
        </p>
      </div>

      <Link
        to="/gallery"
        className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-xl"
      >
        View Gallery

        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>

  </div>
</section>



{/* =========================
    FINAL CTA SECTION
========================= */}
<section className="relative overflow-hidden bg-[var(--primary-dark)] py-24 sm:py-28 lg:py-32">
  {/* Decorative background */}
  <div className="pointer-events-none absolute -left-40 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-[var(--primary)]/30 blur-3xl" />

  <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[var(--secondary)]/10 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
    <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">

      {/* Main Message */}
      <div>
        <div
          data-aos="fade-right"
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[var(--secondary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
            Continue the Legacy
          </span>
        </div>

        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl"
        >
          The story began
          <span className="block text-[var(--secondary)]">
            in 1945.
          </span>

          <span className="block text-white/80">
            It continues with you.
          </span>
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg"
        >
          Whether you are reconnecting with old classmates, discovering the
          Olivetian community or looking for a way to give back, there is a
          place for you in the story.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-dark)] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Join NOSA

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/portal/login"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10"
          >
            Member Portal
          </Link>
        </div>
      </div>

      {/* Legacy Card */}
      <div
        data-aos="fade-left"
        data-aos-delay="200"
        className="relative"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md sm:p-10">

          {/* Decorative circle */}
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-[var(--secondary)]/10" />

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Our Motto
            </p>

            <div className="mt-7">
              <p className="font-serif text-3xl italic leading-tight text-white sm:text-4xl">
                “Cum Christo
                <span className="block text-white/60">
                  Progredere”
                </span>
              </p>

              <p className="mt-4 text-sm text-white/40">
                Forward with Christ
              </p>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-5xl font-bold tracking-tight text-white">
                  1945
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/35">
                  Established
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold text-[var(--secondary)]">
                  80+
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/35">
                  Years of legacy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Small accent */}
        <div className="absolute -bottom-3 left-8 h-6 w-20 rounded-full bg-[var(--secondary)]/20 blur-xl" />
      </div>

    </div>
  </div>
</section>








            <Footer />

        </main>
    );
}