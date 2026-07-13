/* ======================================================

Motion Engine

A lightweight motion library.

Responsibilities

✓ Provide reusable motion presets
✓ Animate DOM elements
✓ Keep motion consistent across the application

It does NOT know about:

- React
- Components
- Scroll
- Timelines
- Business logic

====================================================== */

/* ======================================================
   MOTION TOKENS
====================================================== */

const DEFAULT_EASING =
  "cubic-bezier(.22,.61,.36,1)";

const DEFAULT_DURATION = 650;

/* ======================================================
   MOTION PRESETS
====================================================== */

export const MotionPreset = Object.freeze({

  FADE: {

    keyframes: [

      {
        opacity: 0
      },

      {
        opacity: 1
      }

    ],

    options: {

      duration: DEFAULT_DURATION,

      easing: DEFAULT_EASING,

      fill: "forwards"

    }

  },

  FADE_UP: {

    keyframes: [

      {

        opacity: 0,

        transform: "translateY(24px)"

      },

      {

        opacity: 1,

        transform: "translateY(0)"

      }

    ],

    options: {

      duration: DEFAULT_DURATION,

      easing: DEFAULT_EASING,

      fill: "forwards"

    }

  },

  PULSE: {

    keyframes: [

      {

        transform: "scale(1)"

      },

      {

        transform: "scale(1.35)"

      },

      {

        transform: "scale(1)"

      }

    ],

    options: {

      duration: 220,

      easing: "ease-out",

      fill: "none"

    }

  }

});

/* ======================================================
   MOTION ENGINE
====================================================== */

export function animate(
  element,
  preset
) {

  if (!element || !preset) {

    return null;

  }

  return element.animate(

    preset.keyframes,

    preset.options

  );

}