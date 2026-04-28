const year = String(new Date().getFullYear());

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = year;
});

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("in-view"));
}

const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = [...navLinks]
  .map((link) => document.getElementById(link.dataset.navLink))
  .filter(Boolean);

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    if (link.dataset.navLink === id) {
      link.dataset.active = "true";
    } else {
      delete link.dataset.active;
    }
  });
};

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveNav(visible.target.id);
      }
    },
    { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -40% 0px" },
  );

  sections.forEach((section) => navObserver.observe(section));
}
