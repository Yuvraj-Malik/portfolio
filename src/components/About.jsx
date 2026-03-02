export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-start pt-6 px-6 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">My Background</h2>

          <div className="space-y-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p>
              I’m a Computer Engineering student at TIET Patiala with a strong
              interest in building structured, reliable software systems. I
              focus on clean implementation and understanding how different
              layers of a system work together.
            </p>

            <p>
              My projects span interactive systems, AI-driven applications, and
              full-stack builds — including gesture-based controls, computer
              vision experiments, and structured web platforms.
            </p>

            <p>
              Alongside building projects, I continuously strengthen my
              fundamentals in data structures and algorithms — because strong
              foundations matter.
            </p>
          </div>

          {/* PHOTO */}
          <div className="mt-6">
            <div className="w-40 h-52 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md">
              <img
                src="/your-photo.jpg"
                alt="Yuvraj Malik"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Skills & Expertise</h3>

          <div className="space-y-6 text-sm">
            <SkillBlock
              title="Languages"
              skills={[
                "C",
                "C++",
                { name: "Python", primary: true },
                { name: "JavaScript", primary: true },
              ]}
            />

            <SkillBlock
              title="Frontend"
              skills={["React", "Tailwind", "HTML", "CSS", "Flutter"]}
            />

            <SkillBlock
              title="Backend & DB"
              skills={["Node", "APIs", "MySQL", "MongoDB"]}
            />

            <SkillBlock
              title="AI / ML"
              skills={[
                "TensorFlow",
                "OpenCV",
                "MediaPipe",
                "Pandas",
                "NumPy",
                "Matplotlib",
              ]}
            />

            <SkillBlock
              title="Tools"
              skills={["GitHub", "Postman", "Arduino", "VS Code", "Tinkercad"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBlock({ title, skills }) {
  return (
    <div>
      <p className="text-xs tracking-wide text-neutral-500 mb-3 uppercase">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
          const isObject = typeof skill === "object";
          const name = isObject ? skill.name : skill;
          const primary = isObject && skill.primary;

          return (
            <span
              key={index}
              className={`px-3 py-1 rounded-full border text-xs font-medium
                ${
                  primary
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                    : "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                }`}
            >
              {name}
              {primary && <span className="ml-1 opacity-70">(Primary)</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}
