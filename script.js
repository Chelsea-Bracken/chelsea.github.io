document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav-links");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded)); nav.classList.toggle("open");
  });

  // GA4 ecommerce-style product selection event.
  document.querySelectorAll("[data-product-select]").forEach(button => button.addEventListener("click", () => {
    const card = button.closest("[data-product]");
    const name = card?.dataset.product || button.dataset.productSelect || "Unknown product";
    if (typeof window.gtag === "function") window.gtag("event", "select_item", {
      item_list_name: "Electronics products",
      items: [{item_id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), item_name: name}]
    });
    alert(`${name} selected. This is a front-end demo.`);
  }));

  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-category]").forEach(card =>
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter));
  }));

  // Both forms are demonstration-only: never report a real lead or sign-up.
  const contact = document.querySelector("#contact-form");
  if (contact) contact.addEventListener("submit", event => {
    event.preventDefault(); if (!contact.reportValidity()) return;
    if (typeof window.gtag === "function") window.gtag("event", "demo_form_submit", {form_name:"contact_enquiry_demo"});
    document.querySelector("#contact-message").textContent =
      "Thanks! Your form passed demo validation. No message has been sent.";
    contact.reset();
  });

  const newsletter = document.querySelector("#newsletter-form");
  if (newsletter) newsletter.addEventListener("submit", event => {
    event.preventDefault(); if (!newsletter.reportValidity()) return;
    const email = newsletter.querySelector("input[type=email]").value;
    if (typeof window.gtag === "function") window.gtag("event", "demo_form_submit", {form_name:"newsletter_demo"});
    document.querySelector("#newsletter-message").textContent =
      `Thanks! ${email} passed demo validation. You have not been subscribed.`;
    newsletter.reset();
  });
});
