import { useEffect, useRef, useState } from "react";

import "./Resonance.css";

import symbol from "../../../assets/images/logo/eon-symbol.svg";
import logo from "../../../assets/images/logo/eon-logo-light.svg";

import {
  createNarrativeEngine,
  NarrativeState
} from "../../../lib/narrativeEngine";

/* ======================================================
   NARRATIVE ELEMENTS
====================================================== */

const NarrativeElements = Object.freeze({

  QUESTION_SEE: "question-see",

  QUESTION_YOURSELF: "question-yourself",

  QUESTION_HERE: "question-here",

  SYMBOL: "symbol",

  LOGO: "logo",

  SIGNATURE: "signature"

});

/* ======================================================
   QUESTION
====================================================== */

const QUESTION = [

  {
    id: NarrativeElements.QUESTION_SEE,
    text: "DO YOU SEE"
  },

  {
    id: NarrativeElements.QUESTION_YOURSELF,
    text: "YOURSELF"
  },

  {
    id: NarrativeElements.QUESTION_HERE,
    text: "HERE?",
    accent: true
  }

];

/* ======================================================
   REVEAL
====================================================== */

const REVEAL = [

  {
    id: NarrativeElements.SYMBOL,
    type: "symbol"
  },

  {
    id: NarrativeElements.LOGO,
    type: "logo"
  },

  {
    id: NarrativeElements.SIGNATURE,
    type: "signature",
    text: "THIS IS EON"
  }

];

/* ======================================================
   NARRATIVE TIMING
====================================================== */

const START_DELAY = 1200;

const TRANSITION = 700;

const SEE_DURATION = 3800;
const YOURSELF_DURATION = 4000;
const HERE_DURATION = 5000;

const REVEAL_DELAY = 1200;

const SYMBOL_DURATION = 800;
const LOGO_DURATION = 1200;

/* ======================================================
   TIMELINE MARKERS
====================================================== */

const SEE_START = START_DELAY;

const SEE_GONE = SEE_START + SEE_DURATION;

const YOURSELF_START = SEE_GONE + TRANSITION;

const YOURSELF_GONE = YOURSELF_START + YOURSELF_DURATION;

const HERE_START = YOURSELF_GONE + TRANSITION;

const HERE_GONE = HERE_START + HERE_DURATION;

const SYMBOL_START = HERE_GONE + REVEAL_DELAY;

const LOGO_START = SYMBOL_START + SYMBOL_DURATION;

const SIGNATURE_START = LOGO_START + LOGO_DURATION;

/* ======================================================
   NARRATIVE TIMELINE
====================================================== */

const TIMELINE = [

  {
    at: SEE_START,
    id: NarrativeElements.QUESTION_SEE,
    state: NarrativeState.VISIBLE
  },

  {
    at: SEE_GONE,
    id: NarrativeElements.QUESTION_SEE,
    state: NarrativeState.GONE
  },

  {
    at: YOURSELF_START,
    id: NarrativeElements.QUESTION_YOURSELF,
    state: NarrativeState.VISIBLE
  },

  {
    at: YOURSELF_GONE,
    id: NarrativeElements.QUESTION_YOURSELF,
    state: NarrativeState.GONE
  },

  {
    at: HERE_START,
    id: NarrativeElements.QUESTION_HERE,
    state: NarrativeState.VISIBLE
  },

  {
    at: HERE_GONE,
    id: NarrativeElements.QUESTION_HERE,
    state: NarrativeState.GONE
  },

  {
    at: SYMBOL_START,
    id: NarrativeElements.SYMBOL,
    state: NarrativeState.VISIBLE
  },

  {
    at: LOGO_START,
    id: NarrativeElements.LOGO,
    state: NarrativeState.VISIBLE
  },

  {
    at: SIGNATURE_START,
    id: NarrativeElements.SIGNATURE,
    state: NarrativeState.VISIBLE
  }

];

function Resonance() {

  const sectionRef = useRef(null);

  const engine = useRef(null);

  const [started, setStarted] = useState(false);

  const [narrativeState, setNarrativeState] = useState(() =>
    Object.fromEntries(

      Object.values(NarrativeElements).map((id) => [

        id,

        {
          state: NarrativeState.HIDDEN
        }

      ])

    )
  );

  /* ======================================================
     START WHEN SECTION ENTERS VIEWPORT
  ====================================================== */

  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting && !started) {

          setStarted(true);

        }

      },

      {

        threshold: 0.45,
        rootMargin: "-10% 0px"

      }

    );

    if (sectionRef.current) {

      observer.observe(sectionRef.current);

    }

    return () => observer.disconnect();

  }, [started]);

  /* ======================================================
     NARRATIVE ENGINE
  ====================================================== */

  useEffect(() => {

    if (!started) return;

    if (!engine.current) {

      engine.current = createNarrativeEngine(TIMELINE);

    }

    engine.current.play((event) => {

      setNarrativeState((previous) => ({

        ...previous,

        [event.id]: {

          ...previous[event.id],

          state: event.state

        }

      }));

    });

    return () => {

      engine.current.stop();

    };

  }, [started]);

  return (

        <section
      id="resonance"
      className="resonance section"
      ref={sectionRef}
    >

      <div className="container">

        <div className="resonance__content">

          <div className="resonance__stage">

            {/* ======================================================
                QUESTION
            ====================================================== */}

            <div className="resonance__text">

              {QUESTION.map((line) => {

                const current = narrativeState[line.id];

                let stateClass = "resonance__line--hidden";

                switch (current.state) {

                  case NarrativeState.VISIBLE:
                    stateClass = "resonance__line--visible";
                    break;

                  case NarrativeState.GONE:
                    stateClass = "resonance__line--gone";
                    break;

                  default:
                    stateClass = "resonance__line--hidden";

                }

                return (

                  <p
                    key={line.id}
                    id={line.id}
                    className={`
                      resonance__line
                      ${stateClass}
                      ${line.accent ? "resonance__line--accent" : ""}
                    `}
                  >
                    {line.text}
                  </p>

                );

              })}

            </div>

            {/* ======================================================
                REVEAL
            ====================================================== */}

            <div className="resonance__reveal">

              {REVEAL.map((item) => {

                const current = narrativeState[item.id];

                const isVisible =
                  current.state === NarrativeState.VISIBLE;

                switch (item.type) {

                  case "symbol":

                    return (

                      <img
                        key={item.id}
                        id={item.id}
                        className="resonance__symbol"
                        src={symbol}
                        alt=""
                        aria-hidden="true"
                        style={{
                          opacity: isVisible ? 1 : 0
                        }}
                      />

                    );

                  case "logo":

                    return (

                      <img
                        key={item.id}
                        id={item.id}
                        className="resonance__logo"
                        src={logo}
                        alt="EON"
                        style={{
                          opacity: isVisible ? 1 : 0
                        }}
                      />

                    );

                  case "signature":

                    return (

                      <p
                        key={item.id}
                        id={item.id}
                        className="resonance__signature"
                        style={{
                          opacity: isVisible ? 1 : 0
                        }}
                      >
                        {item.text}
                      </p>

                    );

                  default:

                    return null;

                }

              })}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Resonance;