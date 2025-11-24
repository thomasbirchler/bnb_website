document.addEventListener("DOMContentLoaded", () => {
  fetch("/bnb_website/header.html")
    .then(r => r.text())
    .then(html => {
      const headerWrapper = document.getElementById("header");
      headerWrapper.innerHTML = html;

      // Aktuelle Seite bestimmen
      let currentPage = window.location.pathname.split("/").pop();
      if (!currentPage) currentPage = "index.html";

      // Aktiven Navigationspunkt setzen
      headerWrapper.querySelectorAll(".nav-row a").forEach(a => {
        const page = a.getAttribute("href").split("/").pop();
        if (page === currentPage) a.classList.add("active");
      });

      // Logo ein-/ausblenden beim Scrollen
      const siteHeader = headerWrapper.querySelector(".site-header");
      if (!siteHeader) return;

      const handleScroll = () => {
        if (window.scrollY > 60) siteHeader.classList.add("hide-logo");
        else siteHeader.classList.remove("hide-logo");
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    });
});
