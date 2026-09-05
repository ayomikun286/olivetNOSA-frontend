import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    ArrowDown,
    ArrowUpRight,
    ArrowRight,
    UsersRound,
    HeartHandshake,
    GraduationCap,
    Network,
    Landmark,
} from "lucide-react";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";

export default function Home() {
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
        }, 5000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <main className="min-h-screen bg-white text-[var(--primary-dark)] overflow-x-hidden mt-0 md:mt-15">
            {/* =========================================================
                NAVBAR
            ========================================================== */}
            <header>
                <Navbar />
            </header>

            {/* =========================================================
                HERO
            ========================================================== */}
            <section className="relative flex min-h-[94vh] items-end overflow-hidden bg-[var(--primary-dark)]">
                {/* Background slideshow */}
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <div
                            key={image}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ${
                                index === currentImage
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            style={{
                                backgroundImage: `url("${image}")`,
                                transform:
                                    index === currentImage
                                        ? "scale(1.04)"
                                        : "scale(1)",
                                transition:
                                    "opacity 1800ms ease-in-out, transform 7000ms ease-out",
                            }}
                        />
                    ))}
                </div>

                {/* Dark image treatment */}
                <div className="absolute inset-0 bg-[var(--primary-dark)]/55" />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/35 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/35 via-transparent to-transparent" />

                {/* Hero content */}
                <div className="relative z-10 w-full px-6 pb-14 pt-40 sm:px-10 lg:px-16 lg:pb-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-5xl">
                            {/* Eyebrow */}
                            <div
                                data-aos="fade-up"
                                className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--secondary-light)]"
                            >
                                <span className="h-px w-10 bg-[var(--secondary)]" />

                                National Old Students' Association
                            </div>

                            {/* Main heading */}
                            <h1
                                data-aos="fade-up"
                                data-aos-delay="100"
                                 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
                            >
                                A connection that began at Olivet
                                <span className="block text-[var(--secondary)]">
                                    continues across generations.
                                </span>
                            </h1>

                            {/* Supporting content */}
                            <div
                                data-aos="fade-up"
                                data-aos-delay="200"
                                className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
                            >
                                <p className="max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                                    OlivetNOSA brings together former students
                                    of Olivet Baptist High School, keeping
                                    friendships, memories and a shared sense
                                    of belonging alive across generations.
                                </p>

                                <Link
                                    to="/about-nosa"
                                    className="
                                        group
                                        inline-flex
                                        w-fit
                                        items-center
                                        gap-3
                                        border-b
                                        border-[var(--secondary)]
                                        pb-2
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:gap-5
                                    "
                                >
                                    Discover OlivetNOSA
                                    <ArrowUpRight size={17} />
                                </Link>
                            </div>
                        </div>

                        {/* Hero footer */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="
                                mt-20
                                flex
                                flex-col
                                gap-3
                                border-t
                                border-white/20
                                pt-5
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                                Olivet Baptist High School · Olivet Heights
                            </p>

                            <p className="text-sm italic text-white/50">
                                Cum Christo Progredere
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scroll */}
                <a
                    href="#who-we-are"
                    className="
                        absolute
                        bottom-7
                        left-1/2
                        z-20
                        hidden
                        -translate-x-1/2
                        items-center
                        gap-3
                        text-white/45
                        md:flex
                    "
                >
                    <span className="text-[9px] font-medium uppercase tracking-[0.3em]">
                        Explore
                    </span>

                    <ArrowDown size={14} />
                </a>
            </section>

            {/* =========================================================
                WHO WE ARE
            ========================================================== */}
            <section
                id="who-we-are"
                className="bg-white py-24 sm:py-32 lg:py-40"
            >
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                        {/* Label */}
                        <div data-aos="fade-right">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Who We Are
                            </p>

                            <div className="mt-6 h-px w-16 bg-[var(--secondary)]" />

                            <p className="mt-7 max-w-xs text-sm leading-7 text-[var(--text-muted)]">
                                An association built around the shared
                                experience of being an Olivetian.
                            </p>
                        </div>

                        {/* Content */}
                        <div data-aos="fade-up" data-aos-delay="100">
                            <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                                One school brought us together.
                                <span className="block text-[var(--primary)]">
                                    NOSA keeps us connected.
                                </span>
                            </h2>

                            <div className="mt-10 grid gap-8 md:grid-cols-2">
                                <p className="text-base leading-8 text-[var(--text-muted)]">
                                    The National Old Students' Association of
                                    Olivet Baptist High School brings together
                                    former students across year sets, chapters
                                    and generations.
                                </p>

                                <p className="text-base leading-8 text-[var(--text-muted)]">
                                    Through shared memories, relationships and
                                    collective responsibility, Olivetians
                                    continue to contribute to one another and
                                    to the future of the Olivet community.
                                </p>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                                <Link
                                    to="/about-nosa"
                                    className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                                >
                                    About OlivetNOSA

                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/olivetians"
                                    className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                                >
                                    Meet the Olivetians

                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHERE IT BEGAN
            ========================================================== */}
            <section className="bg-[var(--background-soft)] py-24 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
                        {/* Image */}
                        <div
                            data-aos="fade-right"
                            className="relative overflow-hidden"
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src="/images/olivetNOSA-2.jpg"
                                    alt="Olivet Baptist High School heritage"
                                    className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                                />
                            </div>

                            <div className="mt-5 flex items-start justify-between border-t border-black/10 pt-4">
                                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                                    Olivet Archives
                                </p>

                                <p className="max-w-xs text-right text-sm leading-6 text-[var(--text-muted)]">
                                    A history carried forward by generations
                                    of Olivetians.
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div
                                data-aos="fade-left"
                                className="flex items-center gap-3"
                            >
                                <span className="h-px w-10 bg-[var(--secondary)]" />

                                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Where It Began
                                </span>
                            </div>

                            <p
                                data-aos="fade-left"
                                data-aos-delay="100"
                                className="mt-7 text-6xl font-medium tracking-[-0.05em] text-[var(--primary)] sm:text-7xl lg:text-8xl"
                            >
                                1945
                            </p>

                            <h2
                                data-aos="fade-left"
                                data-aos-delay="150"
                                className="mt-2 max-w-xl text-3xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-4xl lg:text-5xl"
                            >
                                The beginning of the Olivet story.
                            </h2>

                            <p
                                data-aos="fade-left"
                                data-aos-delay="220"
                                className="mt-7 max-w-xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
                            >
                                From its early beginnings at Olivet Heights,
                                the school has grown through generations of
                                students whose experiences, friendships and
                                achievements form an important part of its
                                history.
                            </p>

                            <div
                                data-aos="fade-left"
                                data-aos-delay="280"
                                className="mt-9 border-l-2 border-[var(--secondary)] pl-5"
                            >
                                <p className="text-sm font-semibold text-[var(--primary-dark)]">
                                    January 29, 1945
                                </p>

                                <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                    The First Assembly
                                </p>
                            </div>

                            <Link
                                to="/about-school"
                                data-aos="fade-left"
                                data-aos-delay="320"
                                className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                            >
                                Explore the school history

                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]/20 transition group-hover:bg-[var(--primary)] group-hover:text-white">
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                VISION / MISSION
            ========================================================== */}
            <section className="bg-white py-24 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                        <div data-aos="fade-right">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Our Direction
                            </p>

                            <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                                A shared purpose across generations.
                            </h2>
                        </div>

                        <div data-aos="fade-left">
                            <p className="max-w-3xl text-xl leading-9 text-[var(--primary-dark)] sm:text-2xl">
                                NOSA exists to keep the Olivetian community
                                connected, to honour where we came from and to
                                help shape where we are going.
                            </p>

                            <div className="mt-14 border-t border-black/10">
                                {/* Vision */}
                                <div className="grid gap-6 border-b border-black/10 py-9 md:grid-cols-[auto_0.3fr_1fr] md:items-start">
                                    <UsersRound
                                        size={23}
                                        strokeWidth={1.5}
                                        className="text-[var(--secondary)]"
                                    />

                                    <h3 className="text-xl font-semibold text-[var(--primary-dark)]">
                                        A connected community
                                    </h3>

                                    <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                                        Building a united community of
                                        Olivetians who remain connected across
                                        year sets, chapters, generations and
                                        wherever life takes them.
                                    </p>
                                </div>

                                {/* Heritage */}
                                <div className="grid gap-6 border-b border-black/10 py-9 md:grid-cols-[auto_0.3fr_1fr] md:items-start">
                                    <Landmark
                                        size={23}
                                        strokeWidth={1.5}
                                        className="text-[var(--secondary)]"
                                    />

                                    <h3 className="text-xl font-semibold text-[var(--primary-dark)]">
                                        A heritage preserved
                                    </h3>

                                    <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                                        Protecting the memories, relationships
                                        and traditions that have helped shape
                                        the Olivetian story.
                                    </p>
                                </div>

                                {/* Giving back */}
                                <div className="grid gap-6 py-9 md:grid-cols-[auto_0.3fr_1fr] md:items-start">
                                    <HeartHandshake
                                        size={23}
                                        strokeWidth={1.5}
                                        className="text-[var(--secondary)]"
                                    />

                                    <h3 className="text-xl font-semibold text-[var(--primary-dark)]">
                                        A community that gives back
                                    </h3>

                                    <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                                        Creating opportunities for Olivetians
                                        to contribute their time, experience
                                        and resources to the wider community.
                                    </p>
                                </div>
                            </div>

                            <p className="mt-7 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                                Draft statements — subject to official NOSA
                                approval
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                OLIVETNOSA TODAY
            ========================================================== */}
            <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                        {/* Intro */}
                        <div data-aos="fade-right">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                OlivetNOSA Today
                            </p>

                            <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                                An association shaped by its people.
                            </h2>

                            <p className="mt-7 max-w-md leading-8 text-white/55">
                                The association provides the structure through
                                which Olivetians can remain connected,
                                participate and contribute to the community.
                            </p>

                            <Link
                                to="/about-nosa"
                                className="group mt-9 inline-flex items-center gap-3 border-b border-[var(--secondary)] pb-2 text-sm font-semibold text-white"
                            >
                                Learn more about NOSA
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>

                        {/* Structure */}
                        <div
                            data-aos="fade-left"
                            className="divide-y divide-white/15 border-y border-white/15"
                        >
                            {/* Chapters */}
                            <Link
                                to="/leaders-chapters"
                                className="group grid gap-5 py-9 sm:grid-cols-[auto_0.3fr_1fr] sm:items-start"
                            >
                                <Network
                                    size={23}
                                    strokeWidth={1.5}
                                    className="text-[var(--secondary)]"
                                />

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    Local
                                </p>

                                <div>
                                    <h3 className="text-2xl font-medium">
                                        Chapters
                                    </h3>

                                    <p className="mt-3 max-w-xl leading-7 text-white/50">
                                        Local communities through which
                                        Olivetians can stay connected and take
                                        part in the life of NOSA.
                                    </p>

                                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
                                        Explore chapters
                                        <ArrowRight
                                            size={14}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </span>
                                </div>
                            </Link>

                            {/* Year sets */}
                            <Link
                                to="/leaders-chapters"
                                className="group grid gap-5 py-9 sm:grid-cols-[auto_0.3fr_1fr] sm:items-start"
                            >
                                <GraduationCap
                                    size={23}
                                    strokeWidth={1.5}
                                    className="text-[var(--secondary)]"
                                />

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    Generations
                                </p>

                                <div>
                                    <h3 className="text-2xl font-medium">
                                        Year Sets
                                    </h3>

                                    <p className="mt-3 max-w-xl leading-7 text-white/50">
                                        Reconnect with classmates and preserve
                                        the relationships formed during your
                                        time at Olivet.
                                    </p>

                                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
                                        Find your year set
                                        <ArrowRight
                                            size={14}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </span>
                                </div>
                            </Link>

                            {/* Leadership */}
                            <Link
                                to="/leaders-chapters"
                                className="group grid gap-5 py-9 sm:grid-cols-[auto_0.3fr_1fr] sm:items-start"
                            >
                                <Landmark
                                    size={23}
                                    strokeWidth={1.5}
                                    className="text-[var(--secondary)]"
                                />

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    Service
                                </p>

                                <div>
                                    <h3 className="text-2xl font-medium">
                                        Leadership
                                    </h3>

                                    <p className="mt-3 max-w-xl leading-7 text-white/50">
                                        Meet the people entrusted with guiding
                                        the association and serving its
                                        members.
                                    </p>

                                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
                                        Meet the leadership
                                        <ArrowRight
                                            size={14}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                THE OLIVETIAN COMMUNITY
            ========================================================== */}
            <section className="bg-white py-24 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24">
                        {/* Image */}
                        <div
                            data-aos="fade-right"
                            className="relative overflow-hidden"
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src="/images/olivetNOSA-10.jpg"
                                    alt="Olivetian community"
                                    className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                                />
                            </div>

                            <div className="mt-5 flex items-start justify-between border-t border-black/10 pt-4">
                                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                                    The Olivetian Community
                                </p>

                                <p className="max-w-xs text-right text-sm leading-6 text-[var(--text-muted)]">
                                    Connected by where we began.
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div data-aos="fade-left">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Olivetians
                            </p>

                            <div className="mt-6 h-px w-16 bg-[var(--secondary)]" />

                            <h2 className="mt-7 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl">
                                Wherever life has taken you,
                                <span className="block text-[var(--primary)]">
                                    your Olivetian connection remains.
                                </span>
                            </h2>

                            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
                                The alumni community brings together people
                                whose paths began in the same place. NOSA
                                provides a way to reconnect, participate and
                                remain part of something that continues beyond
                                the school years.
                            </p>

                            <div className="mt-10 border-t border-black/10">
                                <Link
                                    to="/olivetians"
                                    className="group flex items-center justify-between border-b border-black/10 py-6"
                                >
                                    <div className="flex items-center gap-5">
                                        <UsersRound
                                            size={22}
                                            strokeWidth={1.5}
                                            className="text-[var(--primary)]"
                                        />

                                        <div>
                                            <h3 className="font-semibold text-[var(--primary-dark)]">
                                                Meet the Olivetian community
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                                Discover the wider network of
                                                Olivetians.
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight
                                        size={18}
                                        className="text-[var(--primary)] transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/portal/register"
                                    className="group flex items-center justify-between py-6"
                                >
                                    <div className="flex items-center gap-5">
                                        <HeartHandshake
                                            size={22}
                                            strokeWidth={1.5}
                                            className="text-[var(--primary)]"
                                        />

                                        <div>
                                            <h3 className="font-semibold text-[var(--primary-dark)]">
                                                Become part of NOSA
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                                                Join the community and stay
                                                connected.
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight
                                        size={18}
                                        className="text-[var(--primary)] transition-transform group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                NEWS & EVENTS
            ========================================================== */}
            <section className="bg-[var(--background-soft)] py-24 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                        {/* Intro */}
                        <div data-aos="fade-right">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                News & Events
                            </p>

                            <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl">
                                Life across the Olivet community.
                            </h2>

                            <p className="mt-7 max-w-md text-base leading-8 text-[var(--text-muted)]">
                                Keep up with announcements, community stories,
                                reunions and moments taking place across
                                Olivet and NOSA.
                            </p>

                            <Link
                                to="/news"
                                className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                            >
                                View all news
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>

                        {/* Featured story */}
                        <div data-aos="fade-left">
                            <article className="group overflow-hidden border-t border-black/10">
                                <div className="grid gap-8 py-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src="/images/olivetNOSA-3.jpg"
                                            alt="Olivet community"
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                            Olivet News
                                        </p>

                                        <h3 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.025em] text-[var(--primary-dark)] sm:text-3xl">
                                            Stories and updates from the
                                            Olivetian community.
                                        </h3>

                                        <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
                                            The latest announcements, community
                                            stories and updates will appear
                                            here as they are published.
                                        </p>

                                        <Link
                                            to="/news"
                                            className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                                        >
                                            Read the latest
                                            <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </article>

                            {/* Event row */}
                            <div className="border-y border-black/10">
                                <Link
                                    to="/events"
                                    className="group flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-5">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--primary)]/15 text-[var(--primary)]">
                                            <UsersRound
                                                size={20}
                                                strokeWidth={1.5}
                                            />
                                        </span>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                                Upcoming
                                            </p>

                                            <h3 className="mt-1 text-lg font-semibold text-[var(--primary-dark)]">
                                                Events & gatherings
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm font-semibold text-[var(--primary)]">
                                        Explore events
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FROM THE ARCHIVES
            ========================================================== */}
            <section className="bg-white py-24 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <p
                                data-aos="fade-right"
                                className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]"
                            >
                                From the Archives
                            </p>

                            <h2
                                data-aos="fade-up"
                                className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--primary-dark)] sm:text-5xl lg:text-6xl"
                            >
                                Remembering the people,
                                <span className="block text-[var(--primary)]">
                                    places and moments.
                                </span>
                            </h2>

                            <p
                                data-aos="fade-up"
                                data-aos-delay="120"
                                className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg"
                            >
                                Photographs and memories preserve the story of
                                Olivet for those who lived it and those who
                                will carry it forward.
                            </p>
                        </div>

                        <Link
                            to="/gallery"
                            data-aos="fade-left"
                            className="group inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)]"
                        >
                            Explore the gallery

                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]/20 transition group-hover:bg-[var(--primary)] group-hover:text-white">
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </span>
                        </Link>
                    </div>

                    {/* Archive gallery */}
                    <div className="mt-16 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
                        {/* Main image */}
                        <div
                            data-aos="fade-up"
                            className="group relative min-h-[400px] overflow-hidden lg:col-span-7 lg:row-span-2 lg:min-h-[620px]"
                        >
                            <img
                                src="/images/olivetNOSA-2.jpg"
                                alt="Olivet archives"
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/80 via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    The Olivetian Story
                                </p>

                                <h3 className="mt-3 text-2xl font-medium text-white sm:text-3xl">
                                    Generations on the Heights
                                </h3>

                                <p className="mt-2 max-w-lg text-sm leading-6 text-white/60">
                                    Moments from the people and places that
                                    continue to shape the Olivetian story.
                                </p>
                            </div>
                        </div>

                        {/* Image 2 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="group relative min-h-[280px] overflow-hidden lg:col-span-5"
                        >
                            <img
                                src="/images/olivetNOSA-3.jpg"
                                alt="Olivet heritage"
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                            />

                            <div className="absolute inset-0 bg-[var(--primary-dark)]/15 transition group-hover:bg-[var(--primary-dark)]/30" />

                            <div className="absolute bottom-5 left-5">
                                <span className="bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
                                    Heritage
                                </span>
                            </div>
                        </div>

                        {/* Image 3 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="group relative min-h-[280px] overflow-hidden lg:col-span-5"
                        >
                            <img
                                src="/images/olivetNOSA-11.jpg"
                                alt="Olivetian community"
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                            />

                            <div className="absolute inset-0 bg-[var(--primary-dark)]/15 transition group-hover:bg-[var(--primary-dark)]/30" />

                            <div className="absolute bottom-5 left-5">
                                <span className="bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
                                    Community
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FINAL CTA
            ========================================================== */}
            <section className="bg-[var(--secondary-light)] py-24 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div
                        data-aos="fade-up"
                        className="border-t border-[var(--primary)]/10 pt-14"
                    >
                        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    The Olivetian Community
                                </p>

                                <h2 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--primary-dark)] sm:text-6xl lg:text-7xl">
                                    Your Olivet story
                                    <span className="block text-[var(--primary)]">
                                        is part of ours.
                                    </span>
                                </h2>

                                <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                                    Reconnect with fellow Olivetians, become
                                    part of the association and continue
                                    contributing to the community that
                                    connects us all.
                                </p>
                            </div>

                            <Link
                                to="/portal/register"
                                className="
                                    group
                                    inline-flex
                                    w-fit
                                    shrink-0
                                    items-center
                                    gap-3
                                    bg-[var(--primary-dark)]
                                    px-7
                                    py-4
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[var(--primary)]
                                "
                            >
                                Become a Member

                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>

                        <div className="mt-16 flex flex-col justify-between gap-5 border-t border-[var(--primary)]/10 pt-6 sm:flex-row sm:items-center">
                            <p className="text-sm text-[var(--text-muted)]">
                                National Old Students' Association
                            </p>

                            <p className="text-sm font-medium italic text-[var(--secondary)]">
                                Cum Christo Progredere
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FOOTER
            ========================================================== */}
            <Footer />
        </main>
    );
}