(() => {
  const DATA = window.ILA_DATA;
  const app = document.getElementById("app");
  const languageSelect = document.getElementById("language-select");
  const megaMenu = document.getElementById("mega-menu");
  const megaTrigger = document.getElementById("mega-trigger");
  const menuToggle = document.getElementById("menu-toggle");
  const mobilePanel = document.getElementById("mobile-panel");
  const siteHeader = document.getElementById("site-header");
  const dialog = document.getElementById("unit-dialog");
  const dialogContent = document.getElementById("unit-dialog-content");
  const dialogClose = document.getElementById("dialog-close");

  const browserLang = (navigator.language || "fr").slice(0, 2);
  let lang = localStorage.getItem("ila-language") || (DATA.languages.includes(browserLang) ? browserLang : "fr");

  const text = (value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) return value[lang] || value.fr || Object.values(value)[0];
    return value ?? "";
  };

  const t = (key) => text(DATA.ui[key]) || key;
  const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

  const icons = {
    wifi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9c4.6-4 11.4-4 16 0M7 13c2.9-2.5 7.1-2.5 10 0M10 17c1.2-1 2.8-1 4 0M12 20h.01"/></svg>',
    parking: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 21V3h6a5 5 0 0 1 0 10H7M7 13h6"/></svg>',
    kitchen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3v7a3 3 0 0 0 3 3V3m-3 4h3m0 6v8M15 3v18m0-18c3 1 5 4 5 7v2h-5"/></svg>',
    view: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17 8 9l4 5 3-4 6 7M3 21h18"/></svg>',
    terrace: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11h16M6 11l1-7h10l1 7M8 11v10m8-10v10M5 21h14"/></svg>',
    bath: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3Zm3 0V6a3 3 0 0 1 6 0"/></svg>',
    breakfast: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Zm11 2h2a2 2 0 0 1 0 4h-2M4 21h15"/></svg>',
    garden: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V8m0 4c-5 0-8-3-8-8 5 0 8 3 8 8Zm0 3c5 0 8-3 8-8-5 0-8 3-8 8Z"/></svg>',
    pet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11c-2 0-4 2-4 5 0 3 2 5 5 5h6c3 0 5-2 5-5 0-3-2-5-4-5-2 0-3 2-4 2s-2-2-4-2ZM7 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>',
    family: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 21v-2a6 6 0 0 1 12 0v2m1-5a5 5 0 0 1 7 4v1"/></svg>',
    history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7M4 9h16"/></svg>',
    accessible: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M7 9h10m-5 0v5m0 0-4 7m4-7 5 7"/></svg>',
    tv: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="13" rx="2"/><path d="m9 22 3-4 3 4"/></svg>',
    default: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'
  };

  const iconForFeature = (key) => {
    if (key.includes("wifi")) return icons.wifi;
    if (key.includes("parking")) return icons.parking;
    if (key.includes("kitchen") || key.includes("dishwasher")) return icons.kitchen;
    if (key.includes("View")) return icons.view;
    if (key.includes("terrace") || key.includes("balcony")) return icons.terrace;
    if (key.includes("bathtub") || key.includes("shower") || key.includes("Bathroom")) return icons.bath;
    if (key.includes("breakfast")) return icons.breakfast;
    if (key.includes("garden")) return icons.garden;
    if (key.includes("pets")) return icons.pet;
    if (key.includes("family")) return icons.family;
    if (key.includes("history")) return icons.history;
    if (key.includes("accessible")) return icons.accessible;
    if (key.includes("tv")) return icons.tv;
    return icons.default;
  };

  const propertyList = () => Object.values(DATA.properties);

  function setLanguage(next) {
    lang = DATA.languages.includes(next) ? next : "fr";
    localStorage.setItem("ila-language", lang);
    document.documentElement.lang = lang;
    languageSelect.value = lang;
    updateStaticI18n();
    renderMenus();
    route();
  }

  function updateStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
  }

  function propertyName(property) { return text(property.name); }
  function unitName(unit) { return text(unit.name); }

  function propertyCard(property, index) {
    return `
      <article class="property-card reveal">
        <a href="#/property/${property.id}" aria-label="${esc(propertyName(property))}">
          <div class="property-card-media">
            <img src="${property.hero}" alt="${esc(propertyName(property))}" loading="lazy">
            <span class="property-card-index">0${index + 1}</span>
          </div>
          <div class="property-card-body">
            <div class="property-card-meta"><span>${esc(property.city)}</span><span>${esc(t(property.typeKey))}</span></div>
            <h3>${esc(propertyName(property))}</h3>
            <p>${esc(text(property.tagline))}</p>
            <span class="property-card-link">${esc(t("actions.viewProperty"))}</span>
          </div>
        </a>
      </article>`;
  }

  function renderMenus() {
    const mega = document.getElementById("mega-properties");
    const mobile = document.getElementById("mobile-property-links");
    if (mega) {
      mega.innerHTML = propertyList().map(p => `
        <a class="mega-card" href="#/property/${p.id}" data-close-menu>
          <img src="${p.hero}" alt="${esc(propertyName(p))}">
          <span class="mega-card-content"><span>${esc(p.city)}</span><h3>${esc(propertyName(p))}</h3></span>
        </a>`).join("");
    }
    if (mobile) {
      mobile.innerHTML = propertyList().map(p => `
        <a class="mobile-property-link" href="#/property/${p.id}" data-close-mobile style="background-image:url('${p.hero}')"><span>${esc(propertyName(p))}</span></a>`).join("");
    }
    bindMenuCloseLinks();
  }

  function renderHome() {
    const props = propertyList();
    app.innerHTML = `
      <section class="hero">
        <div class="hero-content reveal">
          <p class="eyebrow">${esc(t("home.eyebrow"))}</p>
          <h1 class="display-title">${esc(t("home.title1"))}<span>${esc(t("home.title2"))}</span></h1>
          <p class="lead">${esc(t("home.lead"))}</p>
          <div class="hero-actions">
            <a class="button" href="#/properties">${esc(t("actions.allProperties"))}</a>
            <a class="button secondary" href="#/experience">${esc(t("nav.experience"))}</a>
          </div>
        </div>
        <div class="hero-collage" aria-hidden="true">
          <figure class="hero-photo one"><img src="${props[0].hero}" alt=""></figure>
          <figure class="hero-photo two"><img src="${props[2].hero}" alt=""></figure>
          <figure class="hero-photo three"><img src="${props[1].hero}" alt=""></figure>
          <span class="hero-location-tag">Alsace · France</span>
        </div>
        <span class="hero-scroll">Scroll</span>
      </section>

      <section class="section" id="collection">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("home.collectionEyebrow"))}</p><h2 class="section-title">${esc(t("home.collectionTitle"))}</h2></div>
          <p class="lead">${esc(t("home.collectionText"))}</p>
        </div>
        <div class="property-grid">${props.map(propertyCard).join("")}</div>
      </section>

      <section class="section promise-section">
        <p class="eyebrow reveal">I Love Alsace</p>
        <h2 class="section-title reveal">${esc(t("home.promiseTitle"))}</h2>
        <div class="promise-grid">
          ${[1,2,3].map(n => `<article class="promise-item reveal"><h3>${esc(t(`home.promise${n}Title`))}</h3><p>${esc(t(`home.promise${n}Text`))}</p></article>`).join("")}
        </div>
      </section>

      <section class="collection-band">
        <div class="collection-visual"><img src="assets/images/chateau/main.jpg" alt="Château Lacour" loading="lazy"></div>
        <div class="collection-copy reveal">
          <p class="eyebrow">${esc(t("experience.eyebrow"))}</p>
          <h2 class="section-title">${esc(t("experience.title"))}</h2>
          <p class="lead">${esc(t("experience.text"))}</p>
          <div><a class="button secondary" href="#/experience">${esc(t("actions.discover"))}</a></div>
        </div>
      </section>`;
    updateMeta("I Love Alsace", t("home.lead"), props[0].hero);
  }

  function renderProperties() {
    app.innerHTML = `
      <section class="standard-hero">
        <p class="eyebrow reveal">${esc(t("properties.eyebrow"))}</p>
        <h1 class="section-title reveal">${esc(t("properties.title"))}</h1>
        <p class="lead reveal">${esc(t("home.collectionText"))}</p>
      </section>
      <section class="section compact"><div class="property-grid">${propertyList().map(propertyCard).join("")}</div></section>`;
    updateMeta(`${t("nav.properties")} — I Love Alsace`, t("home.collectionText"), propertyList()[0].hero);
  }

  function bedsText(unit) {
    return unit.beds.map(([count,key]) => `${count} ${t(key)}`).join(" · ");
  }

  function unitCard(property, unit) {
    const displayedFeatures = unit.features.slice(0, 3);
    return `
      <button class="unit-card reveal" type="button" data-property="${property.id}" data-unit="${unit.id}">
        <div class="unit-card-media"><img src="${unit.image}" alt="${esc(unitName(unit))}" loading="lazy"></div>
        <div class="unit-card-body">
          <h3>${esc(unitName(unit))}</h3>
          <div class="unit-card-stats">
            ${unit.size ? `<span>${unit.size} m²</span>` : ""}
            ${unit.capacity ? `<span>${unit.capacity} ${esc(t(unit.capacity === 1 ? "property.person" : "property.people"))}</span>` : ""}
          </div>
          <div class="unit-card-features">${displayedFeatures.map(key => `<span class="mini-feature">${esc(t(key))}</span>`).join("")}</div>
        </div>
      </button>`;
  }

  function renderProperty(property) {
    app.innerHTML = `
      <section class="page-hero">
        <div class="page-hero-bg"><img src="${property.hero}" alt="${esc(propertyName(property))}"></div>
        <div class="page-hero-content reveal">
          <div>
            <p class="eyebrow">${esc(t(property.typeKey))} · ${esc(property.city)}</p>
            <h1>${esc(propertyName(property))}</h1>
            <p>${esc(text(property.tagline))}</p>
          </div>
          <div class="page-hero-side"><span>${esc(t("property.location"))}</span><strong>${esc(property.city)}</strong></div>
        </div>
      </section>

      <section class="section compact">
        <div class="property-overview">
          <div class="property-overview-copy reveal">
            <p class="eyebrow">I Love Alsace</p>
            <h2 class="section-title">${esc(text(property.tagline))}</h2>
            <p class="lead">${esc(text(property.description))}</p>
            <div class="highlight-pills">
              ${property.highlights.map(key => `<span class="pill">${iconForFeature(key)}${esc(t(key))}</span>`).join("")}
            </div>
          </div>
          <aside class="practical-card reveal">
            <h2>${esc(t("property.practical"))}</h2>
            <div class="practical-row"><span>${esc(t("property.address"))}</span><strong>${esc(property.address)}</strong></div>
            <div class="practical-row"><span>${esc(t("property.checkin"))}</span><strong>${esc(property.checkin)}</strong></div>
            <div class="practical-row"><span>${esc(t("property.checkout"))}</span><strong>${esc(property.checkout)}</strong></div>
            <div class="practical-row"><span>${esc(t("property.accommodations"))}</span><strong>${property.units.length}</strong></div>
          </aside>
        </div>
      </section>

      <section class="section compact">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("property.gallery"))}</p><h2 class="section-title">${esc(propertyName(property))}</h2></div>
          <p class="lead">${esc(text(property.locationText))}</p>
        </div>
        <div class="gallery-grid reveal">
          ${property.gallery.slice(0,5).map((image,i) => `<figure class="gallery-item"><img src="${image}" alt="${esc(propertyName(property))} — ${i+1}" loading="lazy"></figure>`).join("")}
        </div>
      </section>

      <section class="section compact">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("property.accommodations"))}</p><h2 class="section-title">${esc(t(property.typeKey))}</h2></div>
          <p class="lead">${esc(t("property.accommodationsText"))}</p>
        </div>
        <div class="units-grid">${property.units.map(unit => unitCard(property,unit)).join("")}</div>
      </section>

      <section class="section compact">
        <div class="location-layout">
          <div class="location-copy reveal">
            <p class="eyebrow">${esc(t("property.location"))}</p>
            <h2 class="section-title">${esc(property.city)}</h2>
            <p>${esc(text(property.locationText))}</p>
            <div class="location-address"><strong>${esc(property.address)}</strong></div>
            <a class="button secondary" href="${property.mapUrl}" target="_blank" rel="noopener">${esc(t("actions.directions"))}</a>
          </div>
          <div class="location-visual reveal">
            <img src="${property.gallery[property.gallery.length - 1]}" alt="${esc(property.city)}" loading="lazy">
            <span class="location-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2"/></svg></span>
          </div>
        </div>
      </section>

      <section class="section compact">
        <div class="booking-cta reveal">
          <div><h2>${esc(t("property.bookingCtaTitle"))}</h2><p>${esc(t("property.bookingCtaText"))}</p></div>
          <a class="button light" href="${property.bookingUrl}" target="_blank" rel="noopener noreferrer">${esc(t("actions.bookBooking"))}</a>
        </div>
      </section>`;

    document.querySelectorAll(".unit-card").forEach(button => button.addEventListener("click", () => openUnitDialog(property, button.dataset.unit)));
    updateMeta(`${propertyName(property)} — I Love Alsace`, text(property.description), property.hero);
  }

  function openUnitDialog(property, unitId) {
    const unit = property.units.find(u => u.id === unitId);
    if (!unit) return;
    dialogContent.innerHTML = `
      <div class="dialog-hero"><img src="${unit.image}" alt="${esc(unitName(unit))}"></div>
      <div class="dialog-body">
        <p class="eyebrow">${esc(propertyName(property))}</p>
        <h2>${esc(unitName(unit))}</h2>
        <div class="dialog-stats">
          ${unit.size ? `<span><strong>${esc(t("property.surface"))}:</strong> ${unit.size} m²</span>` : ""}
          ${unit.capacity ? `<span><strong>${esc(t("property.capacity"))}:</strong> ${unit.capacity} ${esc(t(unit.capacity === 1 ? "property.person" : "property.people"))}</span>` : ""}
        </div>
        <div class="dialog-columns">
          <div><h3>${esc(t("property.bedding"))}</h3><ul class="bed-list">${unit.beds.map(([count,key]) => `<li>${count} × ${esc(t(key))}</li>`).join("")}</ul></div>
          <div><h3>${esc(t("property.amenities"))}</h3><ul class="amenity-list">${unit.features.map(key => `<li>${esc(t(key))}</li>`).join("")}</ul></div>
        </div>
        <a class="button" href="${property.bookingUrl}" target="_blank" rel="noopener noreferrer">${esc(t("actions.bookBooking"))}</a>
      </div>`;
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
    document.body.classList.add("dialog-open");
  }

  function closeUnitDialog() {
    if (dialog.open) dialog.close();
    document.body.classList.remove("dialog-open");
  }

  function renderExperience() {
    const cards = [
      {title:"experience.castle", image:"assets/images/domaine/main.jpg", text: DATA.properties.domaine.locationText},
      {title:"experience.wine", image:"assets/images/logis/main.jpg", text: DATA.properties.logis.locationText},
      {title:"experience.hiking", image:"assets/images/logis/la-foret.jpg", text: DATA.properties.logis.description},
      {title:"experience.valley", image:"assets/images/chateau/jardin.jpg", text: DATA.properties.chateau.locationText}
    ];
    app.innerHTML = `
      <section class="standard-hero">
        <p class="eyebrow reveal">${esc(t("experience.eyebrow"))}</p>
        <h1 class="section-title reveal">${esc(t("experience.title"))}</h1>
        <p class="lead reveal">${esc(t("experience.text"))}</p>
      </section>
      <section class="section compact">
        <div class="experience-grid">
          ${cards.map(card => `<article class="experience-card reveal"><img src="${card.image}" alt="${esc(t(card.title))}" loading="lazy"><div class="experience-card-content"><h2>${esc(t(card.title))}</h2><p>${esc(text(card.text))}</p></div></article>`).join("")}
        </div>
      </section>`;
    updateMeta(`${t("nav.experience")} — I Love Alsace`, t("experience.text"), "assets/images/domaine/main.jpg");
  }

  function renderContact() {
    app.innerHTML = `
      <section class="standard-hero">
        <p class="eyebrow reveal">${esc(t("contact.eyebrow"))}</p>
        <h1 class="section-title reveal">${esc(t("contact.title"))}</h1>
        <p class="lead reveal">${esc(t("contact.text"))}</p>
      </section>
      <section class="section compact">
        <div class="contact-grid">
          <article class="contact-card reveal">
            <h2>${esc(t("contact.bookingTitle"))}</h2><p>${esc(t("contact.bookingText"))}</p>
            <div class="contact-property-list">${propertyList().map(p => `<a class="contact-property-link" href="${p.bookingUrl}" target="_blank" rel="noopener noreferrer"><span>${esc(propertyName(p))}</span><span>Booking.com ↗</span></a>`).join("")}</div>
          </article>
          <article class="contact-card reveal"><h2>${esc(t("contact.directTitle"))}</h2><p>${esc(t("contact.directText"))}</p><div class="location-address"><strong>contact@ilovealsace.com</strong><br><span>+33 (0) …</span></div></article>
        </div>
      </section>`;
    updateMeta(`${t("nav.contact")} — I Love Alsace`, t("contact.text"), DATA.properties.chateau.hero);
  }

  function renderLegal(kind) {
    const keyTitle = `${kind}.title`;
    const keyText = kind === "legal" ? "legal.placeholder" : `${kind}.text`;
    app.innerHTML = `
      <section class="standard-hero"><p class="eyebrow">I Love Alsace</p><h1 class="section-title">${esc(t(keyTitle))}</h1></section>
      <section class="section compact"><div class="legal-content reveal"><p>${esc(t(keyText))}</p></div></section>`;
    updateMeta(`${t(keyTitle)} — I Love Alsace`, t(keyText), DATA.properties.logis.hero);
  }

  function renderNotFound() {
    app.innerHTML = `<section class="standard-hero"><p class="eyebrow">404</p><h1 class="section-title">${esc(t("misc.notFound"))}</h1><p class="lead">${esc(t("misc.notFoundText"))}</p><p><a class="button" href="#/">${esc(t("actions.back"))}</a></p></section>`;
    updateMeta(`404 — I Love Alsace`, t("misc.notFoundText"), DATA.properties.logis.hero);
  }

  function updateMeta(title, description, image) {
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDesc) ogDesc.setAttribute("content", description);
    if (ogImage) ogImage.setAttribute("content", image);
  }

  function parseRoute() {
    const raw = location.hash.replace(/^#\/?/, "");
    return raw.split("/").filter(Boolean);
  }

  function route() {
    closeMenus();
    const parts = parseRoute();
    if (!parts.length) renderHome();
    else if (parts[0] === "properties") renderProperties();
    else if (parts[0] === "property" && DATA.properties[parts[1]]) renderProperty(DATA.properties[parts[1]]);
    else if (parts[0] === "experience") renderExperience();
    else if (parts[0] === "contact") renderContact();
    else if (["legal","privacy","accessibility"].includes(parts[0])) renderLegal(parts[0]);
    else renderNotFound();

    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(initReveals);
  }

  function initReveals() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { nodes.forEach(n => n.classList.add("visible")); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: "0px 0px -30px" });
    nodes.forEach(n => observer.observe(n));
  }

  function openMega() {
    megaMenu.classList.add("open");
    megaMenu.setAttribute("aria-hidden", "false");
    megaTrigger.setAttribute("aria-expanded", "true");
    siteHeader.classList.add("menu-active");
    document.body.classList.add("menu-open");
  }

  function closeMega() {
    megaMenu.classList.remove("open");
    megaMenu.setAttribute("aria-hidden", "true");
    megaTrigger.setAttribute("aria-expanded", "false");
    siteHeader.classList.remove("menu-active");
    if (!mobilePanel.classList.contains("open")) document.body.classList.remove("menu-open");
  }

  function toggleMobile() {
    const open = !mobilePanel.classList.contains("open");
    mobilePanel.classList.toggle("open", open);
    mobilePanel.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
    siteHeader.classList.toggle("menu-active", open);
    document.body.classList.toggle("menu-open", open);
  }

  function closeMobile() {
    mobilePanel.classList.remove("open");
    mobilePanel.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    siteHeader.classList.remove("menu-active");
    if (!megaMenu.classList.contains("open")) document.body.classList.remove("menu-open");
  }

  function closeMenus() { closeMega(); closeMobile(); }

  function bindMenuCloseLinks() {
    document.querySelectorAll("[data-close-menu]").forEach(el => el.addEventListener("click", closeMega));
    document.querySelectorAll("[data-close-mobile]").forEach(el => el.addEventListener("click", closeMobile));
  }

  languageSelect.addEventListener("change", e => setLanguage(e.target.value));
  megaTrigger.addEventListener("click", e => { e.stopPropagation(); megaMenu.classList.contains("open") ? closeMega() : openMega(); });
  megaMenu.addEventListener("click", e => { if (e.target === megaMenu) closeMega(); });
  menuToggle.addEventListener("click", toggleMobile);
  dialogClose.addEventListener("click", closeUnitDialog);
  dialog.addEventListener("click", e => { if (e.target === dialog) closeUnitDialog(); });
  window.addEventListener("hashchange", route);
  window.addEventListener("scroll", () => siteHeader.classList.toggle("scrolled", window.scrollY > 20), { passive: true });
  window.addEventListener("keydown", e => { if (e.key === "Escape") { closeMenus(); closeUnitDialog(); } });

  document.getElementById("current-year").textContent = new Date().getFullYear();
  document.documentElement.lang = lang;
  languageSelect.value = lang;
  updateStaticI18n();
  renderMenus();
  route();
})();
