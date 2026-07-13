import { useEffect, useRef, useState } from "react";

import { createScrollEngine } from "../../../lib/scrollEngine";

import "./SideNavigation.css";

/* ======================================================
   SECTIONS
====================================================== */

const sections = [
  { id: "hero", label: "INTRO" },
  { id: "manifesto", label: "MANIFESTO" },
  { id: "principles", label: "PRINCIPLES" },
  { id: "availability", label: "AVAILABILITY" },
  { id: "resonance", label: "RESONANCE" },
  { id: "join", label: "JOIN" },
];

/* ======================================================
   COMPONENT
====================================================== */

function SideNavigation() {

  const [activeSection, setActiveSection] = useState("hero");

  const navRef = useRef(null);

  const indicatorRef = useRef(null);

  /* ======================================================
     SCROLL ENGINE
  ====================================================== */

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

  /* ======================================================
   INDICATOR
====================================================== */

useEffect(() => {

  const nav = navRef.current;

  const indicator = indicatorRef.current;

  if (!nav || !indicator) {

    return;

  }

  const activeDot = nav.querySelector(

    ".side-navigation__link--active .side-navigation__dot"

  );

  if (!activeDot) {

    return;

  }

  const navRect = nav.getBoundingClientRect();

  const dotRect = activeDot.getBoundingClientRect();

  const left =
    dotRect.left -
    navRect.left +
    dotRect.width / 2;

  const top =
    dotRect.top -
    navRect.top +
    dotRect.height / 2;

  /* Primeira execução */

  if (!indicator.dataset.initialized) {

    indicator.style.left = `${left}px`;

    indicator.style.top = `${top}px`;

    indicator.style.transform =
      "translate(-50%, -50%)";

    indicator.dataset.initialized = "true";

    return;

  }

  /* Caminhada */

  indicator.animate(

    [

      {

        left: indicator.style.left,

        top: indicator.style.top

      },

      {

        left: `${left}px`,

        top: `${top}px`

      }

    ],

    {

      duration: 450,

      easing: "cubic-bezier(.22,.61,.36,1)",

      fill: "forwards"

    }

  ).finished.then(() => {

    indicator.style.left = `${left}px`;

    indicator.style.top = `${top}px`;

  });

}, [activeSection]);

  /* ======================================================
     RENDER
  ====================================================== */

  return (

    <nav
      ref={navRef}
      className="side-navigation"
      aria-label="Page navigation"
    >

      <div
        ref={indicatorRef}
        className="side-navigation__indicator"
        aria-hidden="true"
      />

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