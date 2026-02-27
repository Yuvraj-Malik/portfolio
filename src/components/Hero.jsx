export default function Hero() {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8 max-w-xl">
          <div className="inline-flex items-center px-4 py-1.5 text-xs font-medium tracking-wide rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300">
            Systems Architecture • AI • Full-Stack
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight">
            Where Systems Thinking
            <br />
            Becomes Working Software
          </h1>

          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Hi, I’m Yuvraj Malik. I build things that start as ideas and end up
            as working systems. Most of my work lives at the intersection of AI,
            interaction, and full-stack engineering.
          </p>

          <div className="flex gap-4 pt-4">
            <a className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
              View Work
            </a>

            <a className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              Resume
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center md:justify-end">
          <div className="w-80 h-96 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 shadow-lg flex items-end p-6">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Let’s build beyond the blueprint.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
