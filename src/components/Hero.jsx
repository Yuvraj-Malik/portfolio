export default function Hero() {
  const links = [
    {
      name: "GitHub",
      handle: "/yuvrajmalik",
      href: "https://github.com/yuvrajmalik",
    },
    {
      name: "LeetCode",
      handle: "/yuvraj",
      href: "https://leetcode.com/yuvraj",
    },
    {
      name: "CodeChef",
      handle: "4★ Max | 1800+",
      href: "https://codechef.com/users/yuvraj",
    },
    {
      name: "LinkedIn",
      handle: "/yuvraj-malik",
      href: "https://linkedin.com/in/yuvraj-malik",
    },
  ];

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center px-6 overflow-hidden"
    >
      {/* Subtle background depth */}
      <div className="absolute inset-0 -z-20 opacity-[0.04] bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]"></div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div className="max-w-xl space-y-6 -translate-y-6">
          {/* Welcome Line */}
          <p className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
            <span className="relative group cursor-pointer font-medium">
              Yōkoso
              <span className="absolute left-0 top-6 opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md whitespace-nowrap">
                Welcome (ようこそ)
              </span>
            </span>{" "}
            — I’m Yuvraj Malik.
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight">
            Structured thinking.
            <br />
            <span className="underline decoration-neutral-400 underline-offset-4">
              Built into software.
            </span>
          </h1>

          {/* Capability Strip */}
          <p className="text-xs tracking-[0.25em] text-neutral-500 dark:text-neutral-400 uppercase">
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

        {/* RIGHT — Digital Footprint */}
        <div className="flex justify-center md:justify-end">
          <div className="w-96 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 shadow-xl p-8">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-6">
              Digital Footprint
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-neutral-300 dark:border-neutral-700 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{link.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition">
                      →
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {link.handle}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
