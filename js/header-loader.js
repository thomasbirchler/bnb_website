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

      // Auto-hide header on scroll down, show on scroll up
      const siteHeader = headerWrapper.querySelector(".site-header");
      if (!siteHeader) return;

      let lastScrollY = window.scrollY;
      const threshold = 80; // start hiding after this scroll depth

      const onScroll = () => {
        const current = window.scrollY;
        const scrollingDown = current > lastScrollY;
        // Directional hide of whole header
        if (scrollingDown && current > threshold) {
          siteHeader.classList.add("header-hidden");
        } else {
          siteHeader.classList.remove("header-hidden");
        }
        // Logo only visible at very top
        if (current === 0) siteHeader.classList.remove("hide-logo");
        else siteHeader.classList.add("hide-logo");
        lastScrollY = current;
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    });
});
