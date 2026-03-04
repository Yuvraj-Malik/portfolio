import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark")),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return dark;
}

const IconEmail = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);
const IconLocation = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const IconGithub = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);
const IconLinkedIn = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const dark = useDarkMode();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const c = {
    bg: dark ? "#080808" : "#ffffff",
    heading: dark ? "#ffffff" : "#080808",
    body: dark ? "#999999" : "#666666",
    label: dark ? "#cfcfcf" : "#1d1d1d",
    divider: dark ? "#1a1a1a" : "#eeeeee",
    cardBg: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.018)",
    cardBorder: dark ? "#1e1e1e" : "#e8e8e8",
    cardHover: dark ? "#2a2a2a" : "#d0d0d0",
    inputBg: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
    inputBorder: dark ? "#282828" : "#e4e4e4",
    inputFocus: dark ? "#484848" : "#999999",
    inputText: dark ? "#eeeeee" : "#111111",
    metaText: dark ? "#484848" : "#b8b8b8",
    iconColor: dark ? "#484848" : "#bbbbbb",
    infoValue: dark ? "#cccccc" : "#222222",
    btnBg: dark ? "#ffffff" : "#111111",
    btnText: dark ? "#111111" : "#ffffff",
    mutedBtn: dark ? "#1e1e1e" : "#f0f0f0",
    mutedBtnText: dark ? "#666666" : "#888888",
    footerText: dark ? "#252525" : "#e0e0e0",
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    color: c.inputText,
    background: c.inputBg,
    border: `1px solid ${focused === field ? c.inputFocus : c.inputBorder}`,
    borderRadius: 8,
    padding: "10px 13px",
    outline: "none",
    letterSpacing: "0.02em",
    transition: "border-color 0.15s ease",
    resize: "none",
  });

  const LINKS = [
    {
      icon: <IconEmail />,
      label: "Email",
      value: "yuvraj.malik003@gmail.com",
      href: "mailto:yuvraj.malik003@gmail.com",
    },
    {
      icon: <IconGithub />,
      label: "GitHub",
      value: "github.com/Yuvraj-Malik",
      href: "https://github.com/Yuvraj-Malik",
    },
    {
      icon: <IconLinkedIn />,
      label: "LinkedIn",
      value: "linkedin.com/in/yuvraj-malik",
      href: "https://www.linkedin.com/in/yuvraj-malik-b00005303/",
    },
    {
      icon: <IconLocation />,
      label: "Location",
      value: "Patiala, Punjab, India",
      href: null,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes ct-up   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ct-drop { from { opacity:0; transform:translateY(-6px) scaleY(0.97); } to { opacity:1; transform:translateY(0) scaleY(1); } }
        .ct-a1 { animation: ct-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .ct-a2 { animation: ct-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .ct-a3 { animation: ct-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .ct-expand { animation: ct-drop 0.28s cubic-bezier(0.16,1,0.3,1) both; transform-origin: top; }
        .ct-link { transition: color 0.15s ease; }
        .ct-link:hover { color: ${dark ? "#fff" : "#000"} !important; }
        .ct-card { transition: border-color 0.15s ease; }
        .ct-input::placeholder { color: ${dark ? "#333" : "#ccc"}; }
      `}</style>

      <section
        id="contact"
        style={{
          padding: "7.5rem 3rem 4rem 3rem",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: dark
              ? "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* — label row */}
          <div
            className="ct-a1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 56,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: c.label,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              — Contact
            </span>
            <div style={{ flex: 1, height: 1, background: c.divider }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: c.label,
              }}
            >
              05
            </span>
          </div>

          {/* big heading — full width */}
          <div className="ct-a2" style={{ marginBottom: 64 }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: c.heading,
                margin: 0,
              }}
            >
              Let's build something{" "}
              <em
                style={{ fontStyle: "italic", color: dark ? "#444" : "#ccc" }}
              >
                real.
              </em>
            </h2>
          </div>

          {/* two-col: links left, CTA right */}
          <div
            className="ct-a3"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              alignItems: "start",
            }}
          >
            {/* LEFT — links + blurb */}
            <div
              style={{
                paddingRight: 64,
                borderRight: `1px solid ${c.divider}`,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: c.body,
                  lineHeight: 1.8,
                  letterSpacing: "0.02em",
                  margin: "0 0 40px 0",
                  maxWidth: 380,
                }}
              >
                Interesting challenge, a project idea, or just want to talk
                systems — I'd love to hear from you.
              </p>

              {/* link grid — 2 columns */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                {LINKS.map((item, i) => (
                  <div
                    key={i}
                    className="ct-card"
                    style={{
                      padding: "14px 16px",
                      border: `1px solid ${c.cardBorder}`,
                      borderRadius: 10,
                      background: c.cardBg,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = c.cardHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = c.cardBorder)
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ color: c.iconColor }}>{item.icon}</span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          color: c.metaText,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noreferrer"
                        className="ct-link"
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11,
                          color: c.infoValue,
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11,
                          color: c.infoValue,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Resume */}
              <a
                href="/resume.pdf"
                download
                className="ct-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  border: `1px solid ${c.cardBorder}`,
                  borderRadius: 10,
                  background: c.cardBg,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = c.cardHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = c.cardBorder)
                }
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={c.iconColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: c.infoValue,
                    letterSpacing: "0.04em",
                  }}
                >
                  Resume
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: c.metaText,
                    marginLeft: "auto",
                  }}
                >
                  ↓ PDF
                </span>
              </a>
            </div>

            {/* RIGHT — CTA + form */}
            <div style={{ paddingLeft: 64 }}>
              {/* static CTA */}
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: c.metaText,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Send a message
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 22,
                  color: c.heading,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}
              >
                Ready to start a project?
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: c.body,
                  lineHeight: 1.75,
                  letterSpacing: "0.02em",
                  marginBottom: 28,
                }}
              >
                Drop me a message and I'll get back to you within 24 hours to
                discuss your ideas.
              </p>

              {/* toggle button */}
              {!open && (
                <button
                  onClick={() => setOpen(true)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: c.btnText,
                    background: c.btnBg,
                    border: "none",
                    borderRadius: 100,
                    padding: "12px 28px",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "opacity 0.15s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Get in Touch →
                </button>
              )}

              {/* expandable form */}
              {open && (
                <div className="ct-expand">
                  {status === "success" ? (
                    <div
                      style={{
                        padding: "28px 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: dark ? "#0d2a0d" : "#edfced",
                          border: `1px solid ${dark ? "#1e4a1e" : "#a8e6a8"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          color: dark ? "#5a9e5a" : "#2a7a2a",
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        ✓
                      </div>
                      <p
                        style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: 18,
                          color: c.heading,
                          margin: 0,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Message sent.
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11,
                          color: c.body,
                          margin: 0,
                          lineHeight: 1.6,
                        }}
                      >
                        I'll get back to you within 24 hours.
                      </p>
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        <button
                          onClick={() => {
                            setStatus("idle");
                          }}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: c.btnText,
                            background: c.btnBg,
                            border: "none",
                            borderRadius: 100,
                            padding: "9px 20px",
                            letterSpacing: "0.05em",
                            cursor: "pointer",
                          }}
                        >
                          Send another
                        </button>
                        <button
                          onClick={() => {
                            setOpen(false);
                            setStatus("idle");
                          }}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: c.mutedBtnText,
                            background: c.mutedBtn,
                            border: "none",
                            borderRadius: 100,
                            padding: "9px 20px",
                            letterSpacing: "0.05em",
                            cursor: "pointer",
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 10,
                        }}
                      >
                        {[
                          {
                            key: "name",
                            label: "Name",
                            type: "text",
                            ph: "Your name",
                          },
                          {
                            key: "email",
                            label: "Email",
                            type: "email",
                            ph: "your@email.com",
                          },
                        ].map(({ key, label, type, ph }) => (
                          <div key={key}>
                            <label
                              style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 9,
                                color: c.metaText,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                display: "block",
                                marginBottom: 5,
                              }}
                            >
                              {label}
                            </label>
                            <input
                              className="ct-input"
                              type={type}
                              name={key}
                              required
                              placeholder={ph}
                              value={form[key]}
                              onChange={handleChange}
                              onFocus={() => setFocused(key)}
                              onBlur={() => setFocused(null)}
                              style={inputStyle(key)}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 9,
                            color: c.metaText,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            display: "block",
                            marginBottom: 5,
                          }}
                        >
                          Message
                        </label>
                        <textarea
                          className="ct-input"
                          name="message"
                          required
                          rows={4}
                          placeholder="What are you working on?"
                          value={form.message}
                          onChange={handleChange}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          style={{ ...inputStyle("message"), display: "block" }}
                        />
                      </div>

                      {status === "error" && (
                        <p
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: dark ? "#e07070" : "#cc3333",
                            margin: 0,
                          }}
                        >
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginTop: 2,
                        }}
                      >
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 12,
                            color: c.btnText,
                            background:
                              status === "loading"
                                ? dark
                                  ? "#333"
                                  : "#aaa"
                                : c.btnBg,
                            border: "none",
                            borderRadius: 100,
                            padding: "11px 24px",
                            letterSpacing: "0.06em",
                            cursor:
                              status === "loading" ? "not-allowed" : "pointer",
                            transition: "opacity 0.15s ease",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={(e) => {
                            if (status !== "loading")
                              e.currentTarget.style.opacity = "0.8";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                          }}
                        >
                          {status === "loading"
                            ? "Sending..."
                            : "Send Message →"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            setStatus("idle");
                          }}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: c.mutedBtnText,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            letterSpacing: "0.04em",
                            padding: "11px 0",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
