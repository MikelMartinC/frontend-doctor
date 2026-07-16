/**
 * frontend-doctor — demo site behavior
 *
 * Four independent enhancements, each with a single responsibility:
 *   1. initTheme       — manual light/dark toggle, persisted in localStorage
 *   2. initTreatment   — the interactive "sick checkout" before/after demo
 *   3. initCopyButton  — copy the install command, announced via aria-live
 *   4. initReveal      — scroll-triggered reveals and vitals counters
 *
 * Everything is progressive enhancement: the page is fully usable with
 * JavaScript disabled, and all motion respects prefers-reduced-motion.
 */
(function () {
  "use strict";

  var REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var THEME_STORAGE_KEY = "fd-theme";

  /**
   * Light/dark toggle. The system preference (prefers-color-scheme) is the
   * default; a click sets an explicit override on <html data-theme> and
   * persists it, so it wins on future visits.
   */
  function initTheme() {
    var root = document.documentElement;

    try {
      var saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        root.dataset.theme = saved;
      }
    } catch (e) {
      /* Storage unavailable (private mode, blocked cookies): theme still
         follows the system preference, only persistence is lost. */
    }

    document.getElementById("themeToggle").addEventListener("click", function () {
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var current = root.dataset.theme || (systemDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";

      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (e) {
        /* Same as above: non-fatal. */
      }
    });
  }

  /**
   * "Apply treatment" demo: toggles the patient card between its sick and
   * healthy states and marks each finding as treated. State lives in the
   * data-state attribute so CSS owns all the visual differences.
   */
  function initTreatment() {
    var patient = document.getElementById("patient");
    var button = document.getElementById("treatBtn");
    var stateLabel = document.getElementById("patientState");
    var findings = document.getElementById("findings");

    button.addEventListener("click", function () {
      var wasSick = patient.dataset.state === "sick";

      patient.dataset.state = wasSick ? "healthy" : "sick";
      stateLabel.textContent = wasSick ? "● HEALTHY" : "● SICK";
      button.setAttribute("aria-pressed", String(wasSick));
      button.textContent = wasSick ? "Revert treatment ↩" : "Apply treatment 💊";
      findings.classList.toggle("treated", wasSick);
    });
  }

  /**
   * Copy-to-clipboard for the install command. Success and failure are both
   * announced through the role="status" element so screen readers hear the
   * outcome without focus moving.
   */
  function initCopyButton() {
    var button = document.getElementById("copyBtn");
    var status = document.getElementById("copyStatus");
    var STATUS_RESET_MS = 2600;

    button.addEventListener("click", function () {
      var command = document.getElementById("installCmd").textContent;

      function onSuccess() {
        status.textContent = "✓ Copied to clipboard";
        setTimeout(function () {
          status.textContent = "";
        }, STATUS_RESET_MS);
      }

      function onFailure() {
        status.textContent = "Select the command and copy it manually.";
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(command).then(onSuccess, onFailure);
      } else {
        onFailure();
      }
    });
  }

  /**
   * Animates a numeric counter from 0 to its data-count value with an
   * ease-out curve. Skipped entirely under reduced motion — the final
   * value is written immediately.
   */
  function animateCounter(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals, 10) || 0;

    if (REDUCED_MOTION) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    var DURATION_MS = 900;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / DURATION_MS, 1);
      var eased = 1 - Math.pow(1 - progress, 3);

      el.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /**
   * Scroll reveals + vitals counters, driven by one IntersectionObserver.
   *
   * The html.js class — which is what allows CSS to hide .reveal elements —
   * is only added when we know we can reveal them again (observer available,
   * no reduced-motion request). If either check fails, content simply stays
   * visible and the counters render their final values.
   */
  function initReveal() {
    var vitals = document.getElementById("vitalsGrid");
    var countersDone = false;

    function runCounters() {
      if (countersDone) return;
      countersDone = true;
      document.querySelectorAll("[data-count]").forEach(animateCounter);
    }

    var canAnimate = "IntersectionObserver" in window && !REDUCED_MOTION;

    if (!canAnimate) {
      vitals.classList.add("vitals-live");
      runCounters();
      return;
    }

    document.documentElement.classList.add("js");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("in");
          if (entry.target === vitals || vitals.contains(entry.target)) {
            vitals.classList.add("vitals-live");
            runCounters();
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
    observer.observe(vitals);
  }

  initTheme();
  initTreatment();
  initCopyButton();
  initReveal();
})();
