"use strict";
{
  let justCalledSetThemeIcon = false;
  function setThemeIcon(data) {
    if (justCalledSetThemeIcon) {
      justCalledSetThemeIcon = false;
      return;
    } else if (data.toggle) {
      justCalledSetThemeIcon = true;
    }

    if (typeof data.theme === "string") data.theme = { newValue: data.theme };
    const isDark = Boolean(data.toggle) ^ (data.theme.newValue === "dark");
    const theme = isDark ? "dark" : "light";
    chrome.browserAction.setIcon({ path: `${theme}-icon.png` });

    if (data.toggle) {
      chrome.storage.sync.set({ theme });
    }
  }

  chrome.storage.onChanged.addListener(setThemeIcon);
  chrome.browserAction.onClicked.addListener(() =>
    chrome.storage.sync.get("theme", (data) =>
      setThemeIcon({ ...data, toggle: true })
    )
  );
  chrome.storage.sync.get("theme", setThemeIcon);
}
