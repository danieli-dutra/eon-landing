import "./Pillars.css";

const principles = [
  {
    id: 1,
    keyword: "Clarity",
    suffix: " over Noise",
    description:
      "We simplify the complex to reveal what truly matters."
  },
  {
    id: 2,
    keyword: "Meaning",
    suffix: " over Metrics",
    description:
      "Real impact is measured by purpose, not only by numbers."
  },
  {
    id: 3,
    keyword: "Legacy",
    suffix: " over Trend",
    description:
      "Trends fade. Legacy remains. We build what continues to matter."
  },
  {
    id: 4,
    keyword: "Humans",
    suffix: " over Hype",
    description:
      "Technology amplifies ideas. Humanity gives them purpose."
  }
];

function Pillars() {
  return (
    <section
      id="pillars"
      className="pillars"
    >
      <div className="container">

        <div className="pillars__header">

          <h2 className="pillars__heading">
            PRINCIPLES
          </h2>

          <p className="pillars__subtitle">
            These are the values that guide everything we choose to build.
          </p>

        </div>

        <div className="pillars__grid">

          {principles.map((principle) => (

            <div
              key={principle.id}
              className="pillars__item"
            >

              <div className="pillars__icon"></div>

              <h3 className="pillars__title">

                <span className="pillars__keyword">
                  {principle.keyword}
                </span>

                {principle.suffix}

              </h3>

              <p className="pillars__description">
                {principle.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Pillars;