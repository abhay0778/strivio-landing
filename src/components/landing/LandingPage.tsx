import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { ArrowRight, Menu, X, ArrowDown } from "lucide-react";

const ICON_STROKE = 1.5;

/* ---------- Custom Cursor ---------- */
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 250, mass: 0.4 });
  const sy = useSpring(y, { damping: 25, stiffness: 250, mass: 0.4 });
  const [variant, setVariant] = useState<"" | "hover-link" | "hover-btn">("");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const btn = t.closest("[data-cursor='btn']");
      const link = t.closest("a, [data-cursor='link']");
      if (btn) setVariant("hover-btn");
      else if (link) setVariant("hover-link");
      else setVariant("");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) return null;

  return <motion.div className={`cursor-dot ${variant}`} style={{ x: sx, y: sy }} />;
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", id: "story" },
    { label: "Mission", id: "mission" },
    { label: "Contact", id: "contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #1e1e1e" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2" data-cursor="link">
            <span className="text-[18px] font-bold tracking-[0.25em] text-white">STRIVIO TECH</span>
            <span className="block h-1.5 w-1.5 bg-[#f5c518]" />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-[12px] uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:text-[#f5c518]"
                data-cursor="link"
              >
                {l.label}
              </button>
            ))}
            <a
              href="mailto:hello@striviotech.in"
              className="rounded border border-[#f5c518] px-4 py-2 text-[12px] uppercase tracking-[0.15em] text-[#f5c518] transition-colors duration-200 hover:bg-[#f5c518] hover:text-black"
              data-cursor="btn"
            >
              hello@striviotech.in
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
            aria-label="Open menu"
            data-cursor="link"
          >
            <Menu strokeWidth={ICON_STROKE} size={24} />
          </button>
        </div>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 text-white"
            aria-label="Close menu"
          >
            <X strokeWidth={ICON_STROKE} size={28} />
          </button>
          <div className="flex flex-col items-center gap-10">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-[40px] uppercase tracking-[0.1em] font-semibold text-white transition-colors duration-200 hover:text-[#f5c518]"
              >
                {l.label}
              </button>
            ))}
            <a
              href="mailto:hello@striviotech.in"
              className="mt-4 text-[16px] uppercase tracking-[0.15em] text-[#f5c518]"
            >
              hello@striviotech.in
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-10 rounded-full border border-[#2e2e2e] bg-[#111000] px-4 py-1.5"
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#888888]">
          BENGALURU, INDIA · EST. 2025
        </span>
      </motion.div>

      <h1 className="text-center font-bold text-white" style={{ letterSpacing: "-0.03em", lineHeight: 0.95 }}>
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[48px] md:text-[96px]"
          >
            We build software
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[48px] md:text-[96px]"
          >
            that matters.
          </motion.span>
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mt-8 max-w-[480px] text-center text-[18px] text-[#888888]"
      >
        We build SaaS products that solve real problems across industries.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <button
          onClick={() => scrollTo("mission")}
          className="inline-flex items-center gap-2 rounded bg-[#f5c518] px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] font-semibold text-black transition-transform duration-200 hover:scale-[1.02]"
          data-cursor="btn"
        >
          Our Mission <ArrowRight strokeWidth={ICON_STROKE} size={14} />
        </button>
        <button
          onClick={() => scrollTo("contact")}
          className="rounded border border-[#333] px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:border-[#f5c518] hover:text-[#f5c518]"
          data-cursor="btn"
        >
          Get in Touch
        </button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px w-full bg-[#1e1e1e]" />
        <div className="flex flex-col items-center gap-2 py-5">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#444444]">SCROLL TO EXPLORE</span>
          <div className="bounce-slow text-[#444444]">
            <ArrowDown strokeWidth={ICON_STROKE} size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = ["SAAS","TECHNOLOGY","INDIA","ENTERPRISE","EDUCATION","HEALTHCARE","LOGISTICS","BENGALURU","REAL PROBLEMS","FOCUSED SOFTWARE","SCALE"];
  const renderRow = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-10 px-5">
      {items.map((t, i) => (
        <div key={i} className="flex items-center gap-10">
          <span className="text-[13px] uppercase tracking-[0.3em] text-[#444444]">{t}</span>
          <span className="text-[10px] text-[#f5c518]">◆</span>
        </div>
      ))}
    </div>
  );
  return (
    <section className="overflow-hidden border-y border-[#1e1e1e] bg-[#0a0900] py-5">
      <div className="marquee-track flex">
        {renderRow("a")}
        {renderRow("b")}
      </div>
    </section>
  );
}

/* ---------- Reveal helper ---------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Mission ---------- */
function Mission() {
  const values = [
    { title: "Focused", body: "We build one thing at a time and do it exceptionally well." },
    { title: "Grounded", body: "Every product starts with a real problem, not an idea." },
    { title: "Scalable", body: "Built for India first. Designed to grow beyond." },
  ];
  return (
    <section id="mission" className="bg-black px-6 py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-center text-[10px] uppercase tracking-[0.4em] text-[#f5c518]">OUR MISSION</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-[800px] text-center font-bold text-white text-[28px] md:text-[48px]" style={{ lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            We exist to build focused SaaS products that solve real industry problems, from education to enterprise.
          </h2>
        </Reveal>

        <div className="mt-24 grid gap-12 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={0.1 * i}>
              <div>
                <div className="h-0.5 w-10 bg-[#f5c518]" />
                <h3 className="mt-6 text-[18px] font-semibold text-white">{v.title}</h3>
                <p className="mt-3 text-[14px] text-[#888888]" style={{ lineHeight: 1.6 }}>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stat with count up ---------- */
function CountStat({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to]);
  const display = to >= 1000 ? Math.round(val).toString() : Math.round(val).toString().padStart(2, "0");
  return <span ref={ref}>{display}{suffix}</span>;
}

function Numbers() {
  const stats = [
    { kind: "count" as const, value: 1, label: "Product in Development" },
    { kind: "count" as const, value: 2026, label: "Year of Launch" },
    { kind: "text" as const, value: "IND", label: "Made in India" },
    { kind: "text" as const, value: "∞", label: "Problems to Solve" },
  ];
  return (
    <section className="border-y border-[#1e1e1e] bg-black px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className={`px-6 py-4 ${i > 0 ? "md:border-l border-[#1e1e1e]" : ""} ${i === 2 ? "md:border-l border-[#1e1e1e]" : ""}`}>
              <div className="text-[56px] font-extrabold text-white" style={{ letterSpacing: "-0.04em", lineHeight: 1 }}>
                {s.kind === "count" ? <CountStat to={s.value as number} /> : (s.value as string)}
              </div>
              <div className="mt-2 text-[13px] tracking-[0.08em] text-[#888888]">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
function Products() {
  return (
    <section className="bg-[#0a0900] px-6 py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#f5c518]">WHAT WE BUILD</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-extrabold text-white text-[48px] md:text-[72px]" style={{ letterSpacing: "-0.03em", lineHeight: 1 }}>
            Products
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="mt-16 grid gap-10 rounded-2xl border border-[#1e1e1e] bg-[#111000] p-8 transition-colors duration-[400ms] hover:border-[rgba(245,197,24,0.3)] md:grid-cols-2 md:p-[60px]"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5c518]">001 — COMING SOON</p>
              <h3 className="mt-6 text-[28px] md:text-[36px] font-bold text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Something is being built.
              </h3>
              <p className="mt-6 text-[16px] text-[#888888]" style={{ lineHeight: 1.7 }}>
                Something focused. Something real. Details when it is ready.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-8 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-[#f5c518] transition-opacity hover:opacity-80"
                data-cursor="link"
              >
                Stay Updated <ArrowRight strokeWidth={ICON_STROKE} size={14} />
              </button>
            </div>

            <div className="flex items-center justify-center scene min-h-[260px]">
              <div className="cube">
                <div className="face f1" />
                <div className="face f2" />
                <div className="face f3" />
                <div className="face f4" />
                <div className="face f5" />
                <div className="face f6" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Story ---------- */
function Story() {
  return (
    <section id="story" className="bg-black px-6 py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#f5c518]">OUR STORY</p>
          <h2 className="mt-6 font-extrabold text-white text-[32px] md:text-[48px]" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Started in a robotics lab. Building software for the real world.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="space-y-6 text-[16px] text-[#888888]" style={{ lineHeight: 1.8 }}>
            <p>Strivio Tech is a SaaS company building focused software products that solve high friction problems across industries in India and beyond.</p>
            <p>We don't build everything. We identify one real problem in an industry, build the most focused solution possible, and scale it before moving to the next.</p>
            <p>Our approach is simple — find where existing software fails real people, build what actually works, and keep it that way.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Manifesto ---------- */
function Manifesto() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0900] px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(245,197,24,0.06), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[800px] text-center">
        <Reveal>
          <p className="font-bold text-white text-[22px] md:text-[36px]" style={{ lineHeight: 1.3 }}>
            Great software doesn't try to do everything. It does one thing so well that switching becomes unthinkable. That's what we build.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-[13px] uppercase tracking-[0.2em] text-[#444444]">— Strivio Tech, 2025</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const items = [
    { label: "GENERAL", value: "hello@striviotech.in", href: "mailto:hello@striviotech.in" },
    { label: "PARTNERSHIPS", value: "sponsor@striviotech.in", href: "mailto:sponsor@striviotech.in" },
    { label: "INSTAGRAM", value: "@strivio.tech", href: "https://instagram.com/strivio.tech" },
  ];
  return (
    <section id="contact" className="bg-black px-6 py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#f5c518]">GET IN TOUCH</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-extrabold text-white text-[56px] md:text-[96px]" style={{ letterSpacing: "-0.04em", lineHeight: 1 }}>
            Let's talk.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.08}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#444444]">{it.label}</p>
                <a
                  href={it.href}
                  className="mt-3 block text-[16px] text-white transition-colors duration-200 hover:text-[#f5c518]"
                  data-cursor="link"
                >
                  {it.value}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] bg-black px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="text-[12px] uppercase tracking-[0.25em] text-[#444444]">STRIVIO TECH</span>
        <span className="text-[12px] text-[#444444]">© 2025 Strivio Tech. All rights reserved.</span>
        <span className="text-[12px] text-[#444444]">Bengaluru, India</span>
      </div>
    </footer>
  );
}

/* ---------- Intro Sweep ---------- */
function IntroSweep() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <div className="intro-sweep h-full w-full bg-[#f5c518]" />
    </div>
  );
}

/* ---------- Page ---------- */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <IntroSweep />
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <Mission />
      <Numbers />
      <Products />
      <Story />
      <Manifesto />
      <Contact />
      <Footer />
    </main>
  );
}
