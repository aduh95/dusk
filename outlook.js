"use strict";
{
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
    if (t.getAttribute("aria-checked") !== m.matches.toString()) {
      t.click();
    }
    c && s.click();
  }
  m.addEventListener("change", u);
  addEventListener("load", u);
}
