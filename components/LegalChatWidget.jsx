"use client";

import { useState, useRef, useEffect } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// TODO: Reemplaza este placeholder con tu enlace real de reservas cuando lo tengas
const CALENDAR_URL = "https://calendly.com/lunalegallab/30min";

const CONSULTATION_PRICE = "XX"; // ← reemplazar con el precio real
const CONSULTATION_PHONE = "+34 601 349 061";

// ─── TYPES ────────────────────────────────────────────────────────────────────
// message: { role: "user" | "assistant", content: string, showOptions?: boolean }

export default function LegalChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | chatting | options
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Bienvenido a Luna Legal Lab. Soy el asistente virtual del Dr. Eduardo R. Luna Álvarez.\n\n¿Cuál es su consulta o problema legal? Cuénteme su situación y le orientaré.",
        },
      ]);
      setPhase("chatting");
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      const raw = data.content?.map((b) => b.text || "").join("") || "";
      const showOptions = raw.includes("[MOSTRAR_OPCIONES]");
      const content = raw.replace("[MOSTRAR_OPCIONES]", "").trim();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content, showOptions },
      ]);
      if (showOptions) setPhase("options");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo sentimos, ha habido un error de conexión. Puede contactarnos directamente en eduardo@lunalegallab.com o al +34 601 349 061.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleContinueChat = () => {
    setPhase("chatting");
    setMessages((prev) =>
      prev.map((m) => ({ ...m, showOptions: false }))
    );
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente legal"}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "#1a1a1a",
          color: "#c8a96e",
          cursor: "pointer",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          fontSize: "22px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 32px rgba(200,169,110,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
        }}
      >
        {isOpen ? "✕" : "⚖"}
      </button>

      {/* ── Chat panel ── */}
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "28px",
          zIndex: 9998,
          width: "380px",
          maxWidth: "calc(100vw - 40px)",
          maxHeight: "600px",
          background: "#faf8f4",
          borderRadius: "16px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.22)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "transform 0.25s cubic-bezier(.4,0,.2,1), opacity 0.2s",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#1a1a1a",
            color: "#faf8f4",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#c8a96e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            ⚖
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.02em" }}>
              Luna Legal Lab
            </div>
            <div style={{ fontSize: "11px", color: "#c8a96e", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Asistente jurídico virtual
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {messages.map((msg, i) => (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background: msg.role === "user" ? "#1a1a1a" : "#fff",
                    color: msg.role === "user" ? "#faf8f4" : "#1a1a1a",
                    fontSize: "13.5px",
                    lineHeight: "1.6",
                    boxShadow:
                      msg.role === "user"
                        ? "none"
                        : "0 1px 6px rgba(0,0,0,0.08)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
              </div>

              {/* Options after assistant message */}
              {msg.showOptions && (
                <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      textAlign: "center",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                    }}
                  >
                    ¿Cómo desea continuar?
                  </div>

                  {/* Option 1: Appointment */}
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      background: "#1a1a1a",
                      color: "#c8a96e",
                      borderRadius: "10px",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "600",
                      textAlign: "center",
                      letterSpacing: "0.02em",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#2d2d2d")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
                  >
                    📅 Solicitar cita con el Dr. Luna
                  </a>

                  {/* Option 2: Phone consultation */}
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "#fff",
                      border: "1.5px solid #e8e0d0",
                      borderRadius: "10px",
                      fontSize: "13px",
                      color: "#1a1a1a",
                      lineHeight: "1.5",
                    }}
                  >
                    <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                      📞 Consulta telefónica urgente
                    </div>
                    <div style={{ color: "#666", fontSize: "12px" }}>
                      {CONSULTATION_PRICE !== "XX"
                        ? `${CONSULTATION_PRICE} € · `
                        : ""}
                      Llame al{" "}
                      <a
                        href={`tel:${CONSULTATION_PHONE.replace(/\s/g, "")}`}
                        style={{ color: "#c8a96e", fontWeight: "700", textDecoration: "none" }}
                      >
                        {CONSULTATION_PHONE}
                      </a>
                    </div>
                  </div>

                  {/* Option 3: Continue chat */}
                  <button
                    onClick={handleContinueChat}
                    style={{
                      padding: "10px 16px",
                      background: "transparent",
                      border: "1.5px solid #ddd",
                      borderRadius: "10px",
                      fontSize: "12px",
                      color: "#888",
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Tengo otra pregunta
                  </button>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  padding: "10px 14px",
                  background: "#fff",
                  borderRadius: "16px 16px 16px 4px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#c8a96e",
                      display: "inline-block",
                      animation: `pulse 1s ${delay}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        {phase !== "options" && (
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid #ede8de",
              display: "flex",
              gap: "8px",
              flexShrink: 0,
              background: "#faf8f4",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Describa su consulta…"
              rows={1}
              style={{
                flex: 1,
                resize: "none",
                border: "1.5px solid #ddd",
                borderRadius: "10px",
                padding: "9px 12px",
                fontSize: "13px",
                fontFamily: "inherit",
                background: "#fff",
                color: "#1a1a1a",
                outline: "none",
                lineHeight: "1.5",
                maxHeight: "100px",
                overflowY: "auto",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                border: "none",
                background: input.trim() && !loading ? "#1a1a1a" : "#e0dbd0",
                color: input.trim() && !loading ? "#c8a96e" : "#aaa",
                cursor: input.trim() && !loading ? "pointer" : "default",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
                alignSelf: "flex-end",
              }}
              aria-label="Enviar mensaje"
            >
              ↑
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div
          style={{
            padding: "8px 14px",
            background: "#f0ece2",
            fontSize: "10px",
            color: "#999",
            textAlign: "center",
            flexShrink: 0,
            letterSpacing: "0.02em",
          }}
        >
          Orientación general. No constituye asesoramiento legal vinculante.
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </>
  );
}
