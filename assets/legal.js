// Language switcher for /privacy/ and /terms/ (AR default, FR, EN). Language comes from the URL hash
// (#ar / #fr / #en; the home page footer links pass the current language). Without JS all three languages show.
// Loaded in <head> (not deferred) so the right language is set before the first paint.
(function () {
  var LANGS = ["ar", "fr", "en"];
  var root = document.documentElement;
  root.classList.add("js");
  function current() { var l = location.hash.slice(1); return LANGS.indexOf(l) < 0 ? "ar" : l; }
  function setRoot(l) {
    root.lang = l;
    root.dir = l === "ar" ? "rtl" : "ltr";
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
  }
  function setLinks(l) {
    var links = document.querySelectorAll(".langs a");
    for (var i = 0; i < links.length; i++) links[i].classList.toggle("on", links[i].getAttribute("href") === "#" + l);
    var keep = document.querySelectorAll("a[data-keep-lang]");
    for (var j = 0; j < keep.length; j++) keep[j].hash = l;
  }
  setRoot(current());
  document.addEventListener("DOMContentLoaded", function () { setLinks(current()); });
  window.addEventListener("hashchange", function () { var l = current(); setRoot(l); setLinks(l); window.scrollTo(0, 0); });
})();
