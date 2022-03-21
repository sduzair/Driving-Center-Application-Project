document.addEventListener("DOMContentLoaded", () => {
  console.log("hello")
  let current = 0
  for (var i = 0; i < document.links.length; i++) {
    if (document.URL.includes(document.links[i].href)) {
      current = i
    }
  }
  document.links[current].className = document.links[current].className + "active"
})
