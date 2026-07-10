import "./Pillars.css";

import clarityIcon from "../../../assets/icons/clarity.svg";
import meaningIcon from "../../../assets/icons/meaning.svg";
import legacyIcon from "../../../assets/icons/legacy.svg";
import humanityIcon from "../../../assets/icons/humanity.svg";

const principles = [
  {
    icon: clarityIcon,
    keyword: "CLARITY",
    title: "over Noise",
    description: "We simplify the complex to reveal what truly matters."
  },
  {
    icon: meaningIcon,
    keyword: "MEANING",
    title: "over Metrics",
    description: "Real impact is measured by purpose, not only by numbers."
  },
  {
    icon: legacyIcon,
    keyword: "LEGACY",
    title: "over Trend",
    description: "Trends fade. Legacy remains. We build what continues to matter."
  },
  {
    icon: humanityIcon,
    keyword: "HUMANS",
    title: "over Hype",
    description: "Technology amplifies ideas. Humanity gives them purpose."
  }
];

function Pillars() {
  return (
    <section id="principles" className="pillars section">
      <div className="container">

        <div className="pillars__header">

          <div className="pillars__eyebrow-wrapper">
            <span className="pillars__eyebrow-line"></span>

            <span className="pillars__eyebrow">
              WHAT GUIDES US
            </span>

            <span className="pillars__eyebrow-line"></span>
          </div>

          <h2 className="pillars__heading">
            PRINCIPLES
          </h2>

          <p className="pillars__subtitle">
            The values behind every decision.
          </p>

        </div>

        <div className="pillars__grid">
          {principles.map((principle) => (
            <article
              key={principle.keyword}
              className="pillar"
            >
              <div className="pillar__icon">
                <img
                  src={principle.icon}
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <h3 className="pillars__title">
                <span className="pillars__keyword">
                  {principle.keyword}
                </span>

                <span className="pillars__complement">
                  {principle.title}
                </span>
              </h3>

              <p className="pillar__description">
                {principle.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Pillars;