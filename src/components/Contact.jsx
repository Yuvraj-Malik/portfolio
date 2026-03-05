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

const IconEmail = () => (
  <svg
    width="13"
    height="13"
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
const IconLocation = () => (
  <svg
    width="13"
    height="13"
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
const IconPhone = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17l.19-.08z" />
  </svg>
);

const LINKS = [
  {
    icon: <IconEmail />,
    label: "Email",
    value: "yuvraj.malik003@gmail.com",
    href: "mailto:yuvraj.malik003@gmail.com",
  },
  {
    icon: <IconLocation />,
    label: "Location",
    value: "Patiala, Punjab, India",
    href: null,
  },
  {
    icon: <IconPhone />,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
];

export default function Contact() {
  const dark = useDarkMode();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const c = {
    heading: dark ? "#ffffff" : "#080808",
    body: dark ? "#888888" : "#666666",
    label: dark ? "#cfcfcf" : "#1d1d1d",
    divider: dark ? "#1a1a1a" : "#eeeeee",
    cardBg: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.015)",
    cardBorder: dark ? "#1e1e1e" : "#e8e8e8",
    cardHover: dark ? "#2a2a2a" : "#d4d4d4",
    inputBg: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
    inputBorder: dark ? "#282828" : "#e4e4e4",
    inputFocus: dark ? "#505050" : "#888888",
    inputText: dark ? "#eeeeee" : "#111111",
    metaText: dark ? "#444444" : "#bbbbbb",
    iconColor: dark ? "#444444" : "#c0c0c0",
    infoValue: dark ? "#cccccc" : "#222222",
    btnBg: dark ? "#ffffff" : "#111111",
    btnText: dark ? "#111111" : "#ffffff",
    footerText: dark ? "#282828" : "#e0e0e0",
    trustText: dark ? "#3a3a3a" : "#d0d0d0",
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
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputBase = (field) => ({
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
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    boxShadow:
      focused === field
        ? `0 0 0 3px ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`
        : "none",
    resize: "none",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes ct-up   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ct-drop { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .ct-a1 { animation: ct-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .ct-a2 { animation: ct-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.13s both; }
        .ct-a3 { animation: ct-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.22s both; }
        .ct-form { animation: ct-drop 0.25s cubic-bezier(0.16,1,0.3,1) both; }
        .ct-card {
          transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
        }
        .ct-card:hover {
          transform: translateY(-1px);
          box-shadow: ${dark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.06)"};
        }
        .ct-link { transition: color 0.15s ease; text-decoration: none; }
        .ct-link:hover { color: ${dark ? "#ffffff" : "#000000"} !important; }
        .ct-input::placeholder { color: ${dark ? "#333333" : "#c8c8c8"}; }
      `}</style>

      <section
        id="contact"
        style={{
          padding: "7.5rem 3rem 5rem 3rem",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
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
              marginBottom: 36,
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

          {/* headline */}
          <div className="ct-a2" style={{ marginBottom: 60 }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: c.heading,
                margin: "0 0 14px 0",
              }}
            >
              Let's build something{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: dark ? "#404040" : "#cccccc",
                }}
              >
                real.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: c.body,
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                margin: 0,
                maxWidth: 420,
              }}
            >
              Interesting challenge, a project idea, or just want to talk
              systems — I'd love to hear from you.
            </p>
          </div>

          {/* two-col */}
          <div
            className="ct-a3"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              alignItems: "start",
            }}
          >
            {/* LEFT */}
            <div
              style={{
                paddingRight: 60,
                borderRight: `1px solid ${c.divider}`,
              }}
            >
              {/* 2×2 contact cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                {LINKS.map((item, i) => (
                  <div
                    key={i}
                    className="ct-card"
                    style={{
                      padding: "20px 20px",
                      border: `1px solid ${c.cardBorder}`,
                      borderRadius: 10,
                      background: c.cardBg,
                      cursor: item.href ? "pointer" : "default",
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
                        gap: 6,
                        marginBottom: 5,
                      }}
                    >
                      <span style={{ color: c.iconColor }}>{item.icon}</span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9.5,
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
                          fontSize: 12,
                          color: c.infoValue,
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

              {/* Resume card */}
              <a
                href="/resume.pdf"
                download
                className="ct-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 20px",
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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                </div>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: c.metaText,
                    letterSpacing: "0.04em",
                  }}
                >
                  Download PDF →
                </span>
              </a>
            </div>

            {/* RIGHT */}
            <div style={{ paddingLeft: 60 }}>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: c.metaText,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Send a message
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 21,
                  color: c.heading,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}
              >
                Tell me about your idea.
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: c.body,
                  lineHeight: 1.75,
                  letterSpacing: "0.02em",
                  marginBottom: 24,
                  maxWidth: 340,
                }}
              >
                Drop a message and I'll get back within 24 hours to dig into the
                details.
              </p>

              {/* CTA button — hidden once form opens */}
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
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Get in Touch →
                </button>
              )}

              {/* Expandable form */}
              {open && (
                <div className="ct-form">
                  {status === "success" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        paddingTop: 4,
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
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 15,
                          color: dark ? "#5a9e5a" : "#2a7a2a",
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
                          lineHeight: 1.65,
                        }}
                      >
                        I'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        style={{
                          alignSelf: "flex-start",
                          marginTop: 6,
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 10,
                          color: c.metaText,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          padding: 0,
                          textDecoration: "underline",
                        }}
                      >
                        Send another
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 11,
                      }}
                    >
                      {/* Row 1 — Name + Email */}
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
                            required: true,
                          },
                          {
                            key: "email",
                            label: "Email",
                            type: "email",
                            ph: "your@email.com",
                            required: true,
                          },
                        ].map(({ key, label, type, ph, required }) => (
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
                              required={required}
                              placeholder={ph}
                              value={form[key]}
                              onChange={handleChange}
                              onFocus={() => setFocused(key)}
                              onBlur={() => setFocused(null)}
                              style={inputBase(key)}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Row 2 — Phone (optional, full width) */}
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
                          Phone{" "}
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 9,
                              color: dark ? "#333" : "#ccc",
                              letterSpacing: "0.06em",
                              textTransform: "lowercase",
                            }}
                          >
                            (optional)
                          </span>
                        </label>
                        <input
                          className="ct-input"
                          type="tel"
                          name="phone"
                          pattern="[0-9+\-\s]{10,15}"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocused("phone")}
                          onBlur={() => setFocused(null)}
                          style={inputBase("phone")}
                        />
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
                          placeholder="Tell me about your idea, project, or challenge."
                          value={form.message}
                          onChange={handleChange}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          style={{ ...inputBase("message"), display: "block" }}
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

                      {/* submit row */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
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
                            alignSelf: "flex-start",
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
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            color: c.metaText,
                            letterSpacing: "0.04em",
                          }}
                        >
                          All messages go directly to my inbox.
                        </span>
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
