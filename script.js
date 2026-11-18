// Scroll-reveal for SIT Madrid. Loaded automatically by the TOP theme's base
// layout as /script.js (ES module), after the theme's own main.js.
//
// The <head> sets `html.js` before first paint; CSS uses that to hide reveal
// targets only when JS is present and motion is allowed. This script adds
// `.is-visible` as elements enter the viewport. Multiple safety nets guarantee
// content is never left hidden if anything goes wrong.

function revealAll() {
  document
    .querySelectorAll(
      ".ly-blocks > *, .event, .speaker, .block-logos-list li, .block-people-list li",
    )
    .forEach((el) => el.classList.add("is-visible"));
}

function init() {
  // Archive links (home section + footer) open in a new tab
  document
    .querySelectorAll('a[href*="/files/archive/"]')
    .forEach((a) => {
      a.target = "_blank";
      a.rel = "noopener";
    });

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  const targets = document.querySelectorAll(
    ".ly-blocks > *, .event, .speaker, .block-logos-list li, .block-people-list li",
  );

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  targets.forEach((el) => io.observe(el));

  // Safety: anything still hidden after load / a few seconds gets revealed.
  window.addEventListener("load", () => setTimeout(revealAll, 2500), {
    once: true,
  });
}

try {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
} catch (_err) {
  revealAll();
}
