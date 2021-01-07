"use strict";
{
  const returnAuto = () => m.matches.toString();
  const returnFalse = () => "false";
  const returnTrue = () => "true";
  let isDark;

  const m = matchMedia("(prefers-color-scheme:dark)");
  async function w(s) {
    let e = document.querySelector(s);
    while (!e) {
      await new Promise((d) => requestIdleCallback(d));
      e = document.querySelector(s);
    }
    return e;
  }
  async function u() {
    const s = document.getElementById("owaSettingsButton");
    const c = !s.classList.contains("o365sx-activeButton");
    c && s.click();
    const t = await w(".ms-Toggle-background");
    if (t.getAttribute("aria-checked") !== isDark()) {
      t.click();
    }
    c && s.click();
  }
  function c(options) {
    if (options?.theme !== "auto") {
      m.removeEventListener("change", u);
      isDark = options?.theme === "dark" ? returnTrue : returnFalse;
    } else {
      m.addEventListener("change", u);
      isDark = returnAuto;
    }
    u();
  }
  chrome.storage.onChanged.addListener(c);
  addEventListener("load", () => chrome.storage.sync.get("theme", c), {
    once: true,
  });
}
