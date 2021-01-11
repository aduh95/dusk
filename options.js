function onChange() {
  chrome.storage.sync.set({ theme: this.value }, Function.prototype);
}

for (const el of document.querySelectorAll("input"))
  el.addEventListener("change", onChange);

chrome.storage.sync.get("theme", (val) => {
  (
    document.querySelector(`input[value="${val?.theme}"]`) ??
    document.querySelector(`input[value="auto"]`)
  ).checked = true;
});

chrome.storage.onChanged.addListener(({ theme }) => {
  (
    document.querySelector(`input[value="${theme.oldValue}"]`) ?? {}
  ).checked = false;
  (
    document.querySelector(`input[value="${theme.newValue}"]`) ?? {}
  ).checked = true;
});
