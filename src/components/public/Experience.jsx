const OlivetExperience = () => {
  const values = [
    {
      title: "Learning",
      text: "A foundation for curiosity, discipline and lifelong growth.",
    },
    {
      title: "Character",
      text: "Values that continue to guide Olivetians long after graduation.",
    },
    {
      title: "Community",
      text: "A connection that brings generations of Olivetians together.",
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
              The Olivet Experience
            </span>

            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-[#123B6D] sm:text-5xl lg:text-6xl">
              More than a classroom.
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-lg leading-8 text-slate-600">
              For generations, Olivet has been a place where young people
              discovered more than knowledge. It was where friendships began,
              character was shaped, and lifelong memories were made.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              The lessons carried beyond the classroom — into careers,
              communities and lives across generations.
            </p>
          </div>

        </div>

        {/* Values */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">

          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white p-8 lg:p-10"
            >
              <h3 className="text-xl font-bold text-[#123B6D]">
                {value.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {value.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default OlivetExperience;