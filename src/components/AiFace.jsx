import { useRef, useState, useEffect } from "react";

export default function AiFace() {
  const ref = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [winkSide, setWinkSide] = useState(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  const winkTimeout = useRef(null);
  const reopenTimeout = useRef(null);

  // Cursor tracking only
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const angle = Math.atan2(dy, dx);
      const radius = 2;

      setPupil({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleEnter = (e) => {
    setHovered(true);

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const side = e.clientX < cx ? "left" : "right";

    // Delay before wink
    winkTimeout.current = setTimeout(() => {
      setWinkSide(side);

      // Slower confident reopen
      reopenTimeout.current = setTimeout(() => {
        setWinkSide(null);
      }, 650);
    }, 200);
  };

  const handleLeave = () => {
    setHovered(false);
    setWinkSide(null);
    setPupil({ x: 0, y: 0 });

    // Clear pending timers
    clearTimeout(winkTimeout.current);
    clearTimeout(reopenTimeout.current);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative w-14 h-10 flex items-center justify-center cursor-pointer select-none"
    >
      <div className="flex gap-3 items-center relative">
        {/* LEFT EYE */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          {winkSide === "left" ? (
            <svg width="16" height="12" viewBox="0 0 16 12">
              <path
                d="M2 6 Q8 10 14 6"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <div className="relative w-4 h-4 rounded-full bg-gradient-to-b from-white to-neutral-300 shadow-inner flex items-center justify-center">
              <div
                className="w-2 h-2 bg-black rounded-full transition-transform duration-75"
                style={{
                  transform: `translate(${pupil.x}px, ${pupil.y}px)`,
                }}
              />
              <div className="absolute top-[3px] left-[4px] w-[3px] h-[3px] bg-white rounded-full opacity-80" />
            </div>
          )}
        </div>

        {/* RIGHT EYE */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          {winkSide === "right" ? (
            <svg width="16" height="12" viewBox="0 0 16 12">
              <path
                d="M2 6 Q8 10 14 6"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <div className="relative w-4 h-4 rounded-full bg-gradient-to-b from-white to-neutral-300 shadow-inner flex items-center justify-center">
              <div
                className="w-2 h-2 bg-black rounded-full transition-transform duration-75"
                style={{
                  transform: `translate(${pupil.x}px, ${pupil.y}px)`,
                }}
              />
              <div className="absolute top-[3px] left-[4px] w-[3px] h-[3px] bg-white rounded-full opacity-80" />
            </div>
          )}
        </div>
      </div>

      {/* Smirk */}
      <div
        className={`absolute bottom-[-3px] transition-all duration-300 ${
          hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <svg width="28" height="14" viewBox="0 0 28 14">
          <path
            d="M4 6 Q14 14 24 5"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
