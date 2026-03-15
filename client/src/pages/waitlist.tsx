import { useState, useEffect, useRef } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgonlyyb";

function animateCount(from: number, to: number, duration: number, onTick: (n: number) => void) {
  const start = performance.now();
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    onTick(Math.floor(from + (to - from) * progress));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [inputError, setInputError] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const timer = setTimeout(() => {
      animateCount(0, 1, 800, (n) => setCount(n));
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setInputError(true);
      setTimeout(() => setInputError(false), 2000);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) {
        setStatus("success");
        animateCount(1, 2, 600, (n) => setCount(n));
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ background: "#0A0A08", color: "#F5F0E8", minHeight: "100vh", fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden", position: "relative" }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse at center, rgba(184,149,58,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -300, right: -100, width: 600, height: 600, background: "radial-gradient(ellipse at center, rgba(184,149,58,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto 1fr auto" }}>

        {/* ── HEADER ── */}
        <header style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 56px", borderBottom: "1px solid rgba(184,149,58,0.25)" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <img src="/images/logo-octopus.png" alt="Licit" style={{ width: 36, height: 36, objectFit: "contain", opacity: 0.9 }} />
            <span style={{ fontFamily: "'Josefin Sans', 'Outfit', sans-serif", fontWeight: 300, fontSize: 18, letterSpacing: "0.28em", color: "#F5F0E8", textTransform: "uppercase" }}>Licit</span>
          </a>
          <span style={{ fontFamily: "'Josefin Sans', 'Outfit', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.22em", color: "#B8953A", textTransform: "uppercase" }}>Coming to Chicago</span>
        </header>

        {/* ── LEFT PANEL ── */}
        <div style={{ gridColumn: 1, gridRow: 2, padding: "80px 56px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid rgba(184,149,58,0.25)" }}>
          <p style={{ fontFamily: "'Josefin Sans', 'Outfit', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.3em", color: "#B8953A", textTransform: "uppercase", marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#B8953A", verticalAlign: "middle", marginRight: 12, opacity: 0.7 }} />
            Coming to Chicago
          </p>

          <h1 style={{ fontSize: "clamp(48px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.01em", marginBottom: 16 }}>
            Crafted for Pleasure.<br />
            <em style={{ fontStyle: "italic", color: "#D4AE5C", fontWeight: 300 }}>Permission to enjoy.</em>
          </h1>

          <p style={{ fontSize: 18, fontWeight: 300, color: "#888880", lineHeight: 1.5, marginBottom: 44, letterSpacing: "0.02em" }}>
            The first premium clarified RTD cocktail.<br />
            Crystal clear. Impossibly smooth. No bar required.
          </p>

          <div style={{ width: 48, height: 1, background: "linear-gradient(to right, #B8953A, transparent)", marginBottom: 36 }} />

          <div style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: "rgba(245,240,232,0.75)", maxWidth: 480 }}>
            <p>A bar night costs <strong style={{ color: "#F5F0E8", fontWeight: 400 }}>$130</strong>. A Licit night costs <strong style={{ color: "#F5F0E8", fontWeight: 400 }}>$33</strong>.</p>
            <p style={{ marginTop: 20 }}>We take the classic cocktails you love and clarify them through an ancient milk-washing process that strips away everything harsh — leaving only pure, translucent flavor. Force-carbonated. Bottled at full cocktail strength. Ready the moment you are.</p>
            <p style={{ marginTop: 20 }}>Licit is launching in Chicago. Before we do, we're hosting private tasting events for the people on this list.</p>
          </div>

          {/* Price callout */}
          <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
            <div style={{ flex: 1, padding: "20px 24px", border: "1px solid rgba(184,149,58,0.25)", position: "relative", overflow: "hidden", opacity: 0.5 }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,149,58,0.05) 0%, transparent 60%)" }} />
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 9, fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888880", marginBottom: 8 }}>Bar Night</div>
              <div style={{ fontSize: 32, fontWeight: 300, color: "#F5F0E8", textDecoration: "line-through", textDecorationColor: "rgba(245,240,232,0.4)" }}>$130</div>
              <div style={{ fontSize: 12, color: "#888880", marginTop: 6, fontStyle: "italic" }}>4 cocktails + tab + Uber</div>
            </div>
            <div style={{ flex: 1, padding: "20px 24px", border: "1px solid rgba(184,149,58,0.25)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,149,58,0.05) 0%, transparent 60%)" }} />
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 9, fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888880", marginBottom: 8 }}>Licit Night</div>
              <div style={{ fontSize: 32, fontWeight: 300, color: "#D4AE5C" }}>$33</div>
              <div style={{ fontSize: 12, color: "#888880", marginTop: 6, fontStyle: "italic" }}>750mL · 4 full servings</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ gridColumn: 2, gridRow: 2, padding: "80px 56px 80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontFamily: "'Josefin Sans', 'Outfit', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.3em", color: "#B8953A", textTransform: "uppercase", marginBottom: 20 }}>Founding List</p>

          <h2 style={{ fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>
            Be the first<br />to <em style={{ fontStyle: "italic", color: "#D4AE5C" }}>taste it.</em>
          </h2>

          <p style={{ fontSize: 15, fontWeight: 300, color: "#888880", lineHeight: 1.7, marginBottom: 48, maxWidth: 380 }}>
            Founding list members are invited to exclusive private tasting events in Chicago before Licit launches to the public — plus early access when we do.
          </p>

          {/* Benefits */}
          <ul style={{ listStyle: "none", marginBottom: 48, padding: 0 }}>
            {[
              "Invitation to private Chicago tasting events — taste the full lineup before anyone else",
              "48-hour early access at launch — before we open to the public",
              "Founding member pricing — locked in for your first order",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 0", borderBottom: "1px solid rgba(184,149,58,0.12)", borderTop: i === 0 ? "1px solid rgba(184,149,58,0.12)" : undefined, fontSize: 15, fontWeight: 300, color: "rgba(245,240,232,0.85)", lineHeight: 1.5 }}>
                <svg viewBox="0 0 20 20" style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }}>
                  <circle cx="10" cy="10" r="9" fill="none" stroke="#B8953A" strokeWidth="1" />
                  <path d="M6 10.5L8.5 13L14 7.5" stroke="#B8953A" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* Form or Success */}
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: 40, border: "1px solid rgba(184,149,58,0.25)", position: "relative", overflow: "hidden", animation: "fadeUp 0.6s ease forwards" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,149,58,0.06) 0%, transparent 60%)" }} />
              <svg viewBox="0 0 48 48" fill="none" style={{ width: 48, height: 48, margin: "0 auto 20px", opacity: 0.8 }}>
                <circle cx="24" cy="24" r="23" stroke="#B8953A" strokeWidth="0.8" opacity="0.6" />
                <path d="M14 24.5L20 31L34 16" stroke="#B8953A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ fontSize: 28, fontWeight: 300, marginBottom: 12 }}>You're on the list.<br /><em style={{ fontStyle: "italic", color: "#D4AE5C" }}>Permission granted.</em></div>
              <p style={{ fontSize: 15, color: "#888880", fontWeight: 300, lineHeight: 1.7 }}>
                We'll be in touch soon with your invitation to a private Licit tasting event in Chicago.<br /><br />
                In the meantime — check your inbox for a note from us.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", marginBottom: 16 }}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  autoComplete="email"
                  style={{
                    flex: 1,
                    background: "rgba(245,240,232,0.04)",
                    border: `1px solid ${inputError ? "rgba(200,80,80,0.6)" : "rgba(184,149,58,0.25)"}`,
                    borderRight: "none",
                    padding: "16px 20px",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15,
                    fontWeight: 300,
                    color: "#F5F0E8",
                    outline: "none",
                    letterSpacing: "0.02em",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    background: "#B8953A",
                    border: "1px solid #B8953A",
                    padding: "16px 28px",
                    fontFamily: "'Josefin Sans', 'Outfit', sans-serif",
                    fontSize: 11,
                    fontWeight: 300,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#0A0A08",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.3s",
                    opacity: status === "submitting" ? 0.7 : 1,
                  }}
                >
                  {status === "submitting" ? "Joining…" : "Join the List →"}
                </button>
              </div>
              {status === "error" && (
                <p style={{ fontSize: 13, color: "rgba(200,80,80,0.9)", marginBottom: 8 }}>Something went wrong — please try again.</p>
              )}
              <p style={{ fontSize: 12, fontWeight: 300, color: "#888880", fontStyle: "italic", lineHeight: 1.6 }}>
                No spam, ever. Unsubscribe anytime. Your email is used only to send Licit updates and tasting event invitations.
              </p>
            </form>
          )}

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32, paddingTop: 32, borderTop: "1px solid rgba(184,149,58,0.25)" }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 300, color: "#D4AE5C", lineHeight: 1 }}>{count !== null ? count : "—"}</div>
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 10, fontWeight: 200, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888880", lineHeight: 1.5 }}>people on<br />the founding list</div>
            </div>
            <div style={{ width: 1, height: 40, background: "rgba(184,149,58,0.25)" }} />
            <div>
              <div style={{ fontSize: 36, fontWeight: 300, color: "#D4AE5C", lineHeight: 1 }}>8</div>
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 10, fontWeight: 200, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888880", lineHeight: 1.5 }}>cocktails<br />in the lineup</div>
            </div>
            <div style={{ width: 1, height: 40, background: "rgba(184,149,58,0.25)" }} />
            <div>
              <div style={{ fontSize: 36, fontWeight: 300, color: "#D4AE5C", lineHeight: 1 }}>0</div>
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 10, fontWeight: 200, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888880", lineHeight: 1.5 }}>artificial<br />ingredients</div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 56px", borderTop: "1px solid rgba(184,149,58,0.25)" }}>
          <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888880" }}>Licit Cocktails</span>
          <span style={{ fontSize: 13, fontWeight: 300, fontStyle: "italic", color: "#B8953A" }}>Permission to enjoy.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Instagram", "TikTok", "Contact"].map((link) => (
              <a key={link} href={link === "Contact" ? "mailto:drinklicit@gmail.com" : "#"} style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 10, fontWeight: 200, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888880", textDecoration: "none" }}>
                {link}
              </a>
            ))}
          </div>
        </footer>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder { color: rgba(245,240,232,0.3) !important; font-style: italic; }
        input:focus { border-color: rgba(184,149,58,0.6) !important; background: rgba(245,240,232,0.07) !important; }
        @media (max-width: 900px) {
          .waitlist-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
