import { useEffect, useState } from "react";

import { createScrollEngine } from "../../../lib/scrollEngine";

import "./SideNavigation.css";

/* ======================================================
   SECTIONS
====================================================== */

const sections = [
  {
    id: "hero",
    label: "INTRO",
  },
  {
    id: "manifesto",
    label: "MANIFESTO",
  },
  {
    id: "principles",
    label: "PRINCIPLES",
  },
  {
    id: "availability",
    label: "AVAILABILITY",
  },
  {
    id: "resonance",
    label: "RESONANCE",
  },
  {
    id: "join",
    label: "JOIN",
  },
];

/* ======================================================
   COMPONENT
====================================================== */

function SideNavigation() {

  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {

    const elements = sections
      .map((section) =>
        document.getElementById(section.id)
      )
      .filter(Boolean);

    const scrollEngine =
      createScrollEngine(elements);

    scrollEngine.observe((sectionId) => {

      setActiveSection(sectionId);

    });

    return () => {

      scrollEngine.disconnect();

    };

  }, []);

  return (

    <nav
      className="side-navigation"
      aria-label="Page navigation"
    >

      <ul className="side-navigation__list">

        {sections.map((section) => (

          <li
            key={section.id}
            className="side-navigation__item"
          >

            <a
              href={`#${section.id}`}
              className={`side-navigation__link ${
                activeSection === section.id
                  ? "side-navigation__link--active"
                  : ""
              }`}
            >

              <span className="side-navigation__dot"></span>

              <span className="side-navigation__label">

                {section.label}

              </span>

            </a>

          </li>

        ))}

      </ul>

    </nav>

  );

}

export default SideNavigation;