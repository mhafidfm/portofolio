
// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function setMenuOpen(isOpen) {
    navMenu.classList.toggle("show", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
}

function setActiveLink(activeLink) {
    navLinks.forEach(function (link) {
        const isActive = link === activeLink;
        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

menuToggle.addEventListener("click", function () {
    setMenuOpen(!navMenu.classList.contains("show"));
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        const target = document.getElementById(link.hash.slice(1));

        if (target) {
            setActiveLink(link);
        }

        setMenuOpen(false);
    });
});

document.addEventListener("click", function (event) {
    if (
        navMenu.classList.contains("show") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navMenu.classList.contains("show")) {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

function updateActiveLink() {
    const header = document.querySelector(".header");
    const sections = Array.from(navLinks)
        .map(function (link) {
            return {
                link: link,
                section: document.getElementById(link.hash.slice(1))
            };
        })
        .filter(function (item) {
            return item.section;
        });

    let activeSection = sections[0];
    const activationPoint = header.getBoundingClientRect().bottom + 24;

    sections.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= activationPoint) {
            activeSection = item;
        }
    });

    if (activeSection) {
        setActiveLink(activeSection.link);
    }
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();