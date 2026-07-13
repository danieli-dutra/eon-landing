/* ======================================================

Narrative Engine

A lightweight timeline dispatcher.

Responsibilities

✓ Schedule timeline events
✓ Dispatch events through a callback
✓ Manage play / stop lifecycle

It does NOT know about:

- React
- Components
- Sections
- Animations
- CSS
- Logos
- Text

====================================================== */

/* ======================================================
   NARRATIVE STATES
====================================================== */

export const NarrativeState = Object.freeze({

  HIDDEN: "hidden",

  VISIBLE: "visible",

  ACTIVE: "active",

  PAST: "past",

  GONE: "gone"

});

/* ======================================================
   NARRATIVE ENGINE
====================================================== */

export function createNarrativeEngine(timeline = []) {

  let timers = [];

  function play(callback) {

    stop();

    timeline.forEach((event) => {

      const timer = setTimeout(() => {

        callback(event);

      }, event.at);

      timers.push(timer);

    });

  }

  function stop() {

    timers.forEach(clearTimeout);

    timers = [];

  }

  return {

    play,
    stop

  };

}