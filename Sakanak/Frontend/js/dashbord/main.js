document.addEventListener("DOMContentLoaded", () => {
  // Shared mobile navigation for Home and Explore.
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const opened = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(opened));
      navToggle.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
      navToggle.textContent = opened ? "×" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      });
    });
  }

  // Current year in footer.
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Home page: sort featured cards.
  const homeSort = document.getElementById("homeSort");
  const homeProperties = document.getElementById("homeProperties");
  if (homeSort && homeProperties) {
    homeSort.addEventListener("change", () => {
      const cards = [...homeProperties.querySelectorAll(".home-property")];
      const mode = homeSort.value;
      cards.sort((a, b) => {
        if (mode === "high") return Number(b.dataset.price) - Number(a.dataset.price);
        if (mode === "rating") return Number(b.dataset.rating) - Number(a.dataset.rating);
        return Number(a.dataset.price) - Number(b.dataset.price);
      });
      cards.forEach(card => homeProperties.appendChild(card));
    });
  }

  // Explore page: interactive filters and sorting.
  const exploreGrid = document.getElementById("exploreProperties");
  if (exploreGrid) {
    const budget = document.getElementById("budgetRange");
    const budgetValue = document.getElementById("budgetValue");
    const distance = document.getElementById("distanceFilter");
    const apply = document.getElementById("applyFilters");
    const reset = document.getElementById("resetFilters");
    const sort = document.getElementById("sortProperties");
    const count = document.getElementById("resultsCount");
    const noResults = document.getElementById("noResults");

    const formatEGP = value => `${Number(value).toLocaleString("en-US")} EGP`;
    const updateBudgetLabel = () => {
      if (budgetValue && budget) budgetValue.textContent = formatEGP(budget.value);
    };
    updateBudgetLabel();
    budget?.addEventListener("input", updateBudgetLabel);

    const applyFilters = () => {
      const maxBudget = Number(budget?.value || 10000);
      const maxDistance = Number(distance?.value || Infinity);
      const capacities = [...document.querySelectorAll('input[name="capacity"]:checked')].map(el => el.value);
      const minSpeed = Number(document.querySelector('input[name="speed"]:checked')?.value || 0);
      const cards = [...exploreGrid.querySelectorAll(".explore-card")];

      let visibleCount = 0;
      cards.forEach(card => {
        const matches =
          Number(card.dataset.price) <= maxBudget &&
          Number(card.dataset.distance) <= maxDistance &&
          (capacities.length === 0 || capacities.includes(card.dataset.capacity)) &&
          Number(card.dataset.speed) >= minSpeed;

        card.hidden = !matches;
        if (matches) visibleCount++;
      });

      if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? "property" : "properties"} found`;
      if (noResults) noResults.hidden = visibleCount !== 0;
    };

    apply?.addEventListener("click", applyFilters);
    budget?.addEventListener("change", applyFilters);
    distance?.addEventListener("change", applyFilters);
    document.querySelectorAll('input[name="capacity"], input[name="speed"]').forEach(input => {
      input.addEventListener("change", applyFilters);
    });

    sort?.addEventListener("change", () => {
      const cards = [...exploreGrid.querySelectorAll(".explore-card")];
      cards.sort((a, b) => {
        if (sort.value === "high") return Number(b.dataset.price) - Number(a.dataset.price);
        if (sort.value === "rating") return Number(b.dataset.rating) - Number(a.dataset.rating);
        return Number(a.dataset.price) - Number(b.dataset.price);
      });
      cards.forEach(card => exploreGrid.appendChild(card));
    });

    reset?.addEventListener("click", () => {
      if (budget) budget.value = "10000";
      if (distance) distance.value = "";
      document.querySelectorAll('input[name="capacity"]').forEach(input => input.checked = false);
      const anySpeed = document.querySelector('input[name="speed"][value="0"]');
      if (anySpeed) anySpeed.checked = true;
      if (sort) sort.value = "low";
      updateBudgetLabel();
      applyFilters();
      sort?.dispatchEvent(new Event("change"));
    });

    // Read optional search values sent from the Home page.
    const params = new URLSearchParams(window.location.search);
    if (params.has("budget") && budget) budget.value = params.get("budget") || "10000";
    if (params.has("distance") && distance) distance.value = params.get("distance");
    updateBudgetLabel();
    applyFilters();
  }
});
