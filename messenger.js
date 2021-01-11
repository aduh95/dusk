"use strict";
{
  const m = matchMedia("(prefers-color-scheme:dark)");

  const returnAuto = () => m.matches;
  const returnFalse = () => false;
  const returnTrue = () => true;
  let isDark;

  async function w(s, d = document) {
    let e = d.querySelector(s);
    while (!e) {
      await new Promise((d) => requestIdleCallback(d));
      e = d.querySelector(s);
    }
    return e;
  }
  async function u() {
    console.log("u");
    if (
      document.documentElement.classList.contains("__fb-dark-mode") !== isDark()
    ) {
      console.log("change");
      const banner = await w('div[role="banner"]');
      const menuOpener =
        banner.lastElementChild.firstElementChild.firstElementChild
          .firstElementChild.firstElementChild;

      const menuAlreadyOpen = banner.querySelector(
        '[data-pagelet="root"] hr ~ hr + div > * >:nth-child(3)'
      );
      if (!menuAlreadyOpen) menuOpener.click();

      const menu = await w(
        '[data-pagelet="root"] hr ~ hr + div > * >:nth-child(3)',
        banner
      );
      menu.firstElementChild.click();
      const toggle = isDark() ? "on" : "off";
      const radio = await w(
        `input[name="dark-mode"][value="${toggle}"]`,
        menu.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling
      );
      radio.click();
      if (!menuAlreadyOpen) menuOpener.click();
    }
  }
  function c(options) {
    if (typeof options.theme === "string")
      options.theme = { newValue: options.theme };
    if (options?.theme == null || options.theme.newValue === "auto") {
      m.addEventListener("change", u);
      isDark = returnAuto;
    } else {
      m.removeEventListener("change", u);
      isDark = options.theme.newValue === "dark" ? returnTrue : returnFalse;
    }
    u();
  }
  chrome.storage.onChanged.addListener(c);
  chrome.storage.sync.get("theme", c);
}
