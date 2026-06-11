import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";

// Floating petal component
function Petal({ delay, left, duration }: { delay: number; left: number; duration: number }) {
  return (
    <motion.div
      style={{ left: `${left}%` }}
      className="fixed top-0 pointer-events-none z-0"
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{ y: "110vh", opacity: [0, 0.6, 0.4, 0], rotate: 360 }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width="12" height="16" viewBox="0 0 12 16">
        <ellipse cx="6" cy="8" rx="4" ry="7" fill="#c9c4e8" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

// Scroll section wrapper
function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// The animated flower SVG
function Flower() {
  const [bloomed, setBloomed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBloomed(true), 400);
    return () => clearTimeout(t);
  }, []);

  const petalPositions = [
    { rotate: 0 },
    { rotate: 45 },
    { rotate: 90 },
    { rotate: 135 },
    { rotate: 180 },
    { rotate: 225 },
    { rotate: 270 },
    { rotate: 315 },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: 260, height: 320 }}>
      {/* Stem */}
      <motion.div
        className="absolute bottom-0 left-1/2"
        style={{ width: 3, originY: 1, marginLeft: -1.5 }}
        initial={{ height: 0 }}
        animate={bloomed ? { height: 140 } : { height: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <div style={{ width: 3, height: "100%", background: "linear-gradient(to top, #4a7c59, #6aaa82)", borderRadius: 2 }} />
      </motion.div>

      {/* Petals */}
      <motion.div
        className="absolute"
        style={{ top: "28%", left: "50%", x: "-50%" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={bloomed ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 }}
      >
        <div className="relative" style={{ width: 0, height: 0 }}>
          {petalPositions.map((p, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ rotate: p.rotate, originX: "50%", originY: "100%" }}
              initial={{ scaleY: 0 }}
              animate={bloomed ? { scaleY: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.0 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <svg
                width="32"
                height="75"
                viewBox="0 0 32 75"
                style={{ marginLeft: -16, marginTop: -75 }}
              >
                <ellipse
                  cx="16"
                  cy="42"
                  rx="13"
                  ry="36"
                  fill="#1a3a8f"
                  opacity={0.8 + (i % 3) * 0.07}
                  style={{ filter: "drop-shadow(0 2px 8px rgba(26,58,143,0.25))" }}
                />
                <ellipse cx="16" cy="30" rx="6" ry="16" fill="#2a4fbf" opacity="0.4" />
              </svg>
            </motion.div>
          ))}

          {/* Center stamens */}
          <motion.div
            className="absolute"
            style={{ left: -18, top: -18 }}
            initial={{ scale: 0 }}
            animate={bloomed ? { scale: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="9" fill="#0d2a6e" />
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 18 + 10 * Math.cos(rad);
                const y = 18 + 10 * Math.sin(rad);
                return (
                  <g key={i}>
                    <line x1="18" y1="18" x2={x} y2={y} stroke="#f5c518" strokeWidth="1.5" />
                    <circle cx={x} cy={y} r="2.5" fill="#f5c518" />
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Scroll arrow
function ScrollArrow() {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" stroke="#b0a0a0" strokeWidth="1" opacity="0.5" />
        <path d="M10 14l6 6 6-6" stroke="#b0a0a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

const sorryMessages = [
  {
    title: "I messed up.",
    body: "And I know it. No excuses, no buts — just me, standing here, wishing I could take it back. You deserved better, Saifa.",
  },
  {
    title: "You mean everything to me.",
    body: "The way you laugh. The way you care. The way you love quietly but deeply. I never want to be the reason that light in you dims — not even for a second.",
  },
  {
    title: "I'm truly sorry.",
    body: "From the deepest part of my heart. Not because I have to say it — but because I feel it, heavy in my chest, every moment we're not okay.",
  },
  {
    title: "I'll do better.",
    body: "You're not just my girlfriend. You're my peace, my comfort, my favorite person on this planet. And you deserve someone who shows up for you — every single time.",
  },
];

export default function Index() {
  const petals = Array.from({ length: 10 }, (_, i) => ({
    delay: i * 2.1,
    left: 5 + i * 9,
    duration: 8 + (i % 4) * 2,
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Cormorant Garamond', serif",
        background: "linear-gradient(170deg, #fce8e8 0%, #f5eaf5 40%, #e8f0f8 80%, #e8f4f0 100%)",
      }}
    >
      {/* Floating petals */}
      {petals.map((p, i) => (
        <Petal key={i} {...p} />
      ))}

      {/* ── HERO ── */}
      <section
        style={{ minHeight: "100vh" }}
        className="relative flex flex-col items-center justify-between pt-10 pb-10 px-6"
      >
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            letterSpacing: "0.3em",
            fontSize: 12,
            color: "#a08080",
            textTransform: "uppercase",
          }}
        >
          TO{" "}
          <span style={{ color: "#c9372c", fontWeight: 600 }}>SAIFA</span>{" "}
          FROM{" "}
          <span style={{ color: "#c9372c", fontWeight: 600 }}>ABDULLAH</span>
        </motion.p>

        {/* Flower */}
        <div className="flex flex-col items-center gap-2 z-10">
          <Flower />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.8 }}
            style={{
              fontSize: "clamp(42px, 8vw, 76px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#3d2a2a",
              textAlign: "center",
              lineHeight: 1.1,
              marginTop: 12,
            }}
          >
            I'm Sorry,<br />Saifa.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.4 }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 15,
              color: "#a08080",
              letterSpacing: "0.1em",
              marginTop: 8,
            }}
          >
            — with all my heart
          </motion.p>
        </div>

        {/* Scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <ScrollArrow />
        </motion.div>
      </section>

      {/* ── SORRY SECTIONS ── */}
      <div className="relative z-10" style={{ maxWidth: 640, margin: "0 auto", padding: "40px 32px 60px" }}>
        {sorryMessages.map((msg, i) => (
          <FadeSection key={i} className="mb-24">
            <div
              style={{
                borderLeft: "2px solid #e8c4c4",
                paddingLeft: 28,
              }}
            >
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#c9a0a0",
                  marginBottom: 10,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2
                style={{
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontStyle: "italic",
                  color: "#3d2a2a",
                  fontWeight: 400,
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                {msg.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 17,
                  color: "#6a5252",
                  lineHeight: 1.9,
                  fontWeight: 300,
                }}
              >
                {msg.body}
              </p>
            </div>
          </FadeSection>
        ))}

        {/* Final message */}
        <FadeSection>
          <div className="text-center" style={{ padding: "48px 0 80px" }}>
            {/* Big heart */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ marginBottom: 32 }}
            >
              <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
                <path
                  d="M40 68 C40 68 4 44 4 22 C4 10 13 2 24 2 C31 2 37 6 40 12 C43 6 49 2 56 2 C67 2 76 10 76 22 C76 44 40 68 40 68Z"
                  fill="#e8a0a0"
                  opacity="0.7"
                />
                <path
                  d="M40 58 C40 58 12 38 12 22 C12 14 18 8 26 8 C32 8 37 12 40 18 C43 12 48 8 54 8 C62 8 68 14 68 22 C68 38 40 58 40 58Z"
                  fill="#c9372c"
                  opacity="0.85"
                />
              </svg>
            </motion.div>

            <h2
              style={{
                fontSize: "clamp(32px, 6vw, 54px)",
                fontStyle: "italic",
                color: "#3d2a2a",
                fontWeight: 400,
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              Please forgive me.
            </h2>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 16,
                color: "#6a5252",
                lineHeight: 1.9,
                fontWeight: 300,
                maxWidth: 440,
                margin: "0 auto 32px",
              }}
            >
              I love you more than words on a screen can ever say.
              You are my person, and I never want to lose that.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9372c",
              }}
            >
              — Abdullah ♡
            </p>
          </div>
        </FadeSection>
      </div>
    </div>
  );
}
