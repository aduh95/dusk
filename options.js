function onChange() {
  console.log(this.value);
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
