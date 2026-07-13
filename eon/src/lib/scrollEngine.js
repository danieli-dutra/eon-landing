/* ======================================================

Scroll Engine

A lightweight scroll dispatcher.

Responsibilities

✓ Track page scroll
✓ Detect active section
✓ Dispatch section changes

It does NOT know about:

- React
- Components
- CSS
- Animations
- Business logic

====================================================== */

/* ======================================================
   SCROLL ENGINE
====================================================== */

export function createScrollEngine(
  sections = [],
  options = {}
) {

  let activeSection = null;

  let ticking = false;

  let onScroll = null;

  let onResize = null;

  const activationLine =
    options.activationLine ?? 0.35;

  function observe(callback) {

    function update() {

      ticking = false;

      const triggerLine =
        window.innerHeight * activationLine;

      let currentSection = sections[0]?.id ?? null;

      sections.forEach((section) => {

        if (!section) {

          return;

        }

        const rect =
          section.getBoundingClientRect();

        if (rect.top <= triggerLine) {

          currentSection = section.id;

        }

      });

      if (
        currentSection &&
        currentSection !== activeSection
      ) {

        activeSection = currentSection;

        callback(currentSection);

      }

    }

    onScroll = () => {

      if (ticking) {

        return;

      }

      ticking = true;

      requestAnimationFrame(update);

    };

    onResize = () => {

      requestAnimationFrame(update);

    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onResize
    );

    update();

  }

  function disconnect() {

    if (onScroll) {

      window.removeEventListener(
        "scroll",
        onScroll
      );

    }

    if (onResize) {

      window.removeEventListener(
        "resize",
        onResize
      );

    }

    activeSection = null;

    ticking = false;

  }

  return {

    observe,

    disconnect

  };

}