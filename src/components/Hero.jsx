export default function Hero() {
  return (
    <section id="hero" className="pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="max-w-xl space-y-6">
          {/* Welcome Line */}
          <p className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
            <span className="relative group cursor-pointer font-medium">
              Yōkoso
              <span className="absolute left-0 top-7 opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md">
                Welcome (ようこそ)
              </span>
            </span>{" "}
            — I’m Yuvraj Malik.
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight">
            Structured thinking.
            <br />
            <span className="underline decoration-neutral-400 underline-offset-4">
              Built into software.
            </span>
          </h1>

          {/* Capability Strip */}
          <p className="text-xs tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase">
            Architecture · Interaction · Full-Stack
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <a className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
              View Work
            </a>

            <a className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              Resume
            </a>
          </div>
        </div>

        {/* RIGHT (Digital Footprint Placeholder) */}
        <div className="relative flex justify-center md:justify-end">
          <div className="w-80 h-96 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 shadow-md p-6">
            {/* Replace this with your Digital Footprint component */}
          </div>
        </div>
      </div>
    </section>
  );
}
