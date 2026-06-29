document.addEventListener("toggle", (event) => {
  const current = event.target;
  if (!(current instanceof HTMLDetailsElement) || !current.matches("nav .nav-menu") || !current.open) {
    return;
  }

  const nav = current.closest("nav");
  if (!nav) {
    return;
  }

  nav.querySelectorAll("details.nav-menu[open]").forEach((menu) => {
    if (menu !== current) {
      menu.removeAttribute("open");
    }
  });
}, true);

document.addEventListener("click", (event) => {
  if (event.target.closest("nav")) {
    return;
  }

  document.querySelectorAll("nav details.nav-menu[open]").forEach((menu) => {
    menu.removeAttribute("open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  document.querySelectorAll("nav details.nav-menu[open]").forEach((menu) => {
    menu.removeAttribute("open");
  });
});
