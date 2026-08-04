(() => {
  const DATA = window.PV_DATA;
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

  const CONTACT = {
    phoneDisplay: "+33 6 10 29 76 33",
    phoneHref: "tel:+33610297633",
    email: "stephanie@pierresvives.com"
  };

  const KE_BOOKING = {
    token: "P38982bac16c52fa8398e91c2",
    propertyId: "P6640273",
    key: "98defd6ee70dfb1dea416cecdf391f58",
    units: {
      "salles-du-manoir": "U664027317",
      "le-petit-pavillon": "U66402731",
      "coinka": "U664027318",
      "le-shimala": "U66402732",
      "la-libellule": "U664027311",
      "cerf-et-loup": "U66402733",
      "les-frondaisons": "U664027310",
      "la-grande-illusion": "U66402737",
      "la-vancelle": "U66402739",
      "la-tourelle": "U66402738",
      "les-saisons": "U66402735",
      "la-foret": "U66402734",
      "nuit-etoilee": "U664027313",
      "taran": "U664027314",
      "ondine": "U664027316",
      "grands-chenes": "U664027315",
      "cinquieme-saison": "U664027312"
    }
  };

  const bookingLanguage = () => lang === "fr" ? "fr" : "en";

  function propertyBookingUrl() {
    const params = new URLSearchParams({
      tok: KE_BOOKING.token,
      pid: KE_BOOKING.propertyId,
      lang: bookingLanguage(),
      krc: KE_BOOKING.key
    });
    return `https://reservation.v2.ke-booking.com/acc/show?${params.toString()}`;
  }

  function unitBookingUrl(unit) {
    const uid = KE_BOOKING.units[unit.id];
    if (!uid) return "#/booking";
    const params = new URLSearchParams({
      tok: KE_BOOKING.token,
      uid,
      lang: bookingLanguage(),
      krc: KE_BOOKING.key
    });
    return `https://reservation.v2.ke-booking.com/acc/unit/show?${params.toString()}`;
  }

  function contactLinks(className = "direct-contact-links") {
    return `<div class="${className}">
      <a href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a>
      <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
    </div>`;
  }

  function loadKeBookingWidgets() {
    const widgetLang = bookingLanguage();

    document.querySelectorAll('[data-ke-widget="owner"]').forEach(container => {
      if (container.dataset.loaded === widgetLang) return;
      container.dataset.loaded = widgetLang;
      container.innerHTML = '<div id="ke-booking-frame"></div>';
      const frame = container.querySelector("#ke-booking-frame");
      const script = document.createElement("script");
      script.src = `https://widgets.ke-booking.com/${widgetLang}/owner/site/widget/js/${KE_BOOKING.token}/ke-booking.js`;
      script.type = "text/javascript";
      frame.appendChild(script);
      const credit = document.createElement("div");
      credit.id = "ke-booking-link";
      credit.innerHTML = '<a target="_blank" rel="noopener noreferrer" href="https://www.ke-booking.com"><i>powered by ke-booking</i></a>';
      frame.appendChild(credit);
    });
  }

  const browserLang = (navigator.language || "fr").slice(0, 2);
  let lang = localStorage.getItem("pv-language") || (DATA.languages.includes(browserLang) ? browserLang : "fr");

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
    localStorage.setItem("pv-language", lang);
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

  function unitGallery(unit) {
    if (!unit || !unit.photoVerified || !unit.image) return [];
    return Array.isArray(unit.gallery) && unit.gallery.length ? unit.gallery : [unit.image];
  }

  function unitMedia(unit, className = "") {
    if (unit.photoVerified && unit.image) {
      return `<img class="${className}" src="${unit.image}" alt="${esc(unitName(unit))}" loading="lazy" decoding="async">`;
    }
    return `<span class="unit-photo-placeholder ${className}" role="img" aria-label="${esc(unitName(unit))}">
      <img src="assets/images/maison-champignon-logo.png" alt="" aria-hidden="true">
    </span>`;
  }

  function galleryThumb(image) {
    if (image.includes("/full/") && image.endsWith(".jpg")) {
      return image.replace("/full/", "/thumb/").replace(/\.jpg$/, ".webp");
    }
    return image;
  }

  function allBookableUnits() {
    return propertyList().flatMap(property => property.units
      .filter(unit => KE_BOOKING.units[unit.id])
      .map(unit => ({ property, unit })));
  }


  function visualJourneyItems() {
    const property = DATA.properties.logis;
    return property.units
      .filter(unit => unit.photoVerified && unit.image && KE_BOOKING.units[unit.id])
      .flatMap(unit => unitGallery(unit).map((image, imageIndex) => ({
        property,
        unit,
        image: galleryThumb(image),
        fullImage: image,
        imageIndex,
        bookingUrl: unitBookingUrl(unit),
        detailUrl: `/hebergements/${unit.id}/`
      })));
  }

  function shuffled(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function visualJourneyMarkup(mode = "compact") {
    const items = shuffled(visualJourneyItems());
    const tileCount = mode === "full" ? 9 : 7;
    const initial = items.slice(0, tileCount);
    const serialized = esc(JSON.stringify(items.map(item => ({
      image: item.image,
      fullImage: item.fullImage,
      unitId: item.unit.id,
      unitName: unitName(item.unit),
      bookingUrl: item.bookingUrl,
      detailUrl: item.detailUrl
    }))));

    return `<div class="visual-journey visual-journey-${mode}" data-visual-journey data-items="${serialized}">
      <div class="visual-puzzle" aria-label="${esc(t("visual.instruction"))}">
        ${initial.map((item, index) => `<a class="visual-tile visual-tile-${index + 1}" href="${item.detailUrl}" data-visual-tile data-unit-id="${item.unit.id}" aria-label="${esc(t("visual.book"))} — ${esc(unitName(item.unit))}">
          <img src="${item.image}" alt="${esc(unitName(item.unit))}" loading="${index < 4 ? "eager" : "lazy"}" decoding="async">
          <span class="visual-tile-caption"><strong>${esc(unitName(item.unit))}</strong><small>${esc(t("visual.book"))} →</small></span>
        </a>`).join("")}
      </div>
      <div class="visual-controls">
        <p>${esc(t("visual.instruction"))}</p>
        <div>
          <button class="visual-control" type="button" data-visual-toggle aria-pressed="false">${esc(t("visual.pause"))}</button>
          <button class="visual-control" type="button" data-visual-next>${esc(t("visual.next"))}</button>
        </div>
      </div>
    </div>`;
  }

  function initVisualJourneys() {
    document.querySelectorAll("[data-visual-journey]").forEach(journey => {
      if (journey.dataset.initialized === "true") return;
      journey.dataset.initialized = "true";

      let items = [];
      try { items = JSON.parse(journey.dataset.items || "[]"); } catch (_) { return; }
      if (!items.length) return;

      const tiles = [...journey.querySelectorAll("[data-visual-tile]")];
      const toggle = journey.querySelector("[data-visual-toggle]");
      const nextButton = journey.querySelector("[data-visual-next]");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let cursor = tiles.length;
      let paused = reducedMotion;
      let timer = null;
      let tileCursor = 0;

      const updateToggle = () => {
        if (!toggle) return;
        toggle.textContent = paused ? t("visual.play") : t("visual.pause");
        toggle.setAttribute("aria-pressed", String(paused));
      };

      const replaceTile = (tile, item) => {
        if (!tile || !item) return;
        const image = tile.querySelector("img");
        const title = tile.querySelector("strong");
        const action = tile.querySelector("small");
        const preload = new Image();
        preload.src = item.image;
        preload.onload = () => {
          tile.classList.add("visual-changing");
          window.setTimeout(() => {
            image.src = item.image;
            image.alt = item.unitName;
            title.textContent = item.unitName;
            action.textContent = `${t("visual.book")} →`;
            tile.href = item.detailUrl;
            tile.dataset.unitId = item.unitId;
            tile.setAttribute("aria-label", `${t("visual.book")} — ${item.unitName}`);
            tile.classList.remove("visual-changing");
          }, 260);
        };
      };

      const advance = () => {
        if (!tiles.length) return;
        const tile = tiles[tileCursor % tiles.length];
        let item = items[cursor % items.length];
        let guard = 0;
        while (item && item.unitId === tile.dataset.unitId && guard < items.length) {
          cursor += 1;
          item = items[cursor % items.length];
          guard += 1;
        }
        replaceTile(tile, item);
        tileCursor = (tileCursor + 1) % tiles.length;
        cursor = (cursor + 1) % items.length;
      };

      const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
      const start = () => {
        stop();
        if (!paused && !document.hidden) timer = window.setInterval(advance, 3300);
      };

      toggle?.addEventListener("click", () => {
        paused = !paused;
        updateToggle();
        start();
      });
      nextButton?.addEventListener("click", () => {
        for (let i = 0; i < Math.min(3, tiles.length); i += 1) advance();
      });
      journey.addEventListener("mouseenter", stop);
      journey.addEventListener("mouseleave", start);
      journey.addEventListener("focusin", stop);
      journey.addEventListener("focusout", start);
      document.addEventListener("visibilitychange", start);

      updateToggle();
      start();
    });
  }

  function featuredUnitCard(property, unit) {
    const photos = unitGallery(unit).length;
    return `<article class="featured-unit-card reveal">
      <button class="featured-unit-visual unit-card-details" type="button" data-property="${property.id}" data-unit="${unit.id}" aria-label="${esc(t("actions.details"))} — ${esc(unitName(unit))}">
        ${unitMedia(unit)}
        ${photos ? `<span class="photo-count">${photos} ${esc(t("property.photos"))}</span>` : ""}
      </button>
      <div class="featured-unit-content">
        <div class="unit-card-stats">
          ${unit.size ? `<span>${unit.size} m²</span>` : ""}
          ${unit.capacity ? `<span>${unit.capacity} ${esc(t(unit.capacity === 1 ? "property.person" : "property.people"))}</span>` : ""}
        </div>
        <h3>${esc(unitName(unit))}</h3>
        <p>${esc(propertyName(property))} · ${esc(property.city)}</p>
        <div class="featured-unit-actions">
          <button class="text-action unit-card-details" type="button" data-property="${property.id}" data-unit="${unit.id}">${esc(t("actions.details"))}</button>
          <a class="button small" href="${unitBookingUrl(unit)}" target="_blank" rel="noopener noreferrer">${esc(t("actions.bookNow"))}</a>
        </div>
      </div>
    </article>`;
  }

  function propertyCard(property, index) {
    return `
      <article class="property-card reveal">
        <a href="/etablissements/${property.id === "logis" ? "logis-du-haut-koenigsbourg" : property.id === "domaine" ? "domaine-du-haut-koenigsbourg" : "chateau-lacour"}/" aria-label="${esc(propertyName(property))}">
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
        <a class="mega-card" href="/etablissements/${p.id === "logis" ? "logis-du-haut-koenigsbourg" : p.id === "domaine" ? "domaine-du-haut-koenigsbourg" : "chateau-lacour"}/" data-close-menu>
          <img src="${p.hero}" alt="${esc(propertyName(p))}">
          <span class="mega-card-content"><span>${esc(p.city)}</span><h3>${esc(propertyName(p))}</h3></span>
        </a>`).join("");
    }
    if (mobile) {
      mobile.innerHTML = propertyList().map(p => `
        <a class="mobile-property-link" href="/etablissements/${p.id === "logis" ? "logis-du-haut-koenigsbourg" : p.id === "domaine" ? "domaine-du-haut-koenigsbourg" : "chateau-lacour"}/" data-close-mobile style="background-image:url('${p.hero}')"><span>${esc(propertyName(p))}</span></a>`).join("");
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
            <a class="button" href="/reservation/">${esc(t("actions.book"))}</a>
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

      <section class="quick-book-band">
        <div class="quick-book-copy reveal">
          <p class="eyebrow">${esc(t("booking.eyebrow"))}</p>
          <h2>${esc(t("booking.widgetTitle"))}</h2>
          <p>${esc(t("booking.widgetText"))}</p>
        </div>
        <div class="quick-book-widget reveal"><div class="ke-owner-shell" data-ke-widget="owner"></div></div>
        <a class="button" href="${propertyBookingUrl()}" target="_blank" rel="noopener noreferrer">${esc(t("booking.open"))} ↗</a>
      </section>

      <section class="section visual-home-section">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("visual.eyebrow"))}</p><h2 class="section-title">${esc(t("visual.title"))}</h2></div>
          <div><p class="lead">${esc(t("visual.text"))}</p><a class="text-link visual-page-link" href="/balade-visuelle/">${esc(t("visual.openPage"))} →</a></div>
        </div>
        ${visualJourneyMarkup("compact")}
      </section>

      <section class="section featured-stays-section">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("home.featuredEyebrow"))}</p><h2 class="section-title">${esc(t("home.featuredTitle"))}</h2></div>
          <p class="lead">${esc(t("home.featuredText"))}</p>
        </div>
        <div class="featured-unit-grid">
          ${DATA.properties.logis.units.filter(unit => unit.featured && unit.photoVerified && unit.image).slice(0, 6).map(unit => featuredUnitCard(DATA.properties.logis, unit)).join("")}
        </div>
      </section>

      <section class="section promise-section">
        <p class="eyebrow reveal">PierresVives</p>
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
    updateMeta("PierresVives", t("home.lead"), props[0].hero);
  }

  function renderProperties() {
    app.innerHTML = `
      <section class="standard-hero">
        <p class="eyebrow reveal">${esc(t("properties.eyebrow"))}</p>
        <h1 class="section-title reveal">${esc(t("properties.title"))}</h1>
        <p class="lead reveal">${esc(t("home.collectionText"))}</p>
      </section>
      <section class="section compact"><div class="property-grid">${propertyList().map(propertyCard).join("")}</div></section>`;
    updateMeta(`${t("nav.properties")} — PierresVives`, t("home.collectionText"), propertyList()[0].hero);
  }

  function bedsText(unit) {
    return (unit.beds || []).map(([count,key]) => `${count} ${t(key)}`).join(" · ");
  }

  function unitCard(property, unit) {
    const displayedFeatures = (unit.features || []).slice(0, 3);
    const photos = unitGallery(unit).length;
    return `
      <article class="unit-card reveal" data-unit-card data-capacity="${unit.capacity || 0}" data-name="${esc(unitName(unit).toLocaleLowerCase())}">
        <button class="unit-card-media unit-card-details" type="button" data-property="${property.id}" data-unit="${unit.id}" aria-label="${esc(t("actions.details"))} — ${esc(unitName(unit))}">
          ${unitMedia(unit)}
          ${photos > 1 ? `<span class="photo-count">${photos} ${esc(t("property.photos"))}</span>` : ""}
        </button>
        <div class="unit-card-body">
          <h3>${esc(unitName(unit))}</h3>
          <div class="unit-card-stats">
            ${unit.size ? `<span>${unit.size} m²</span>` : ""}
            ${unit.capacity ? `<span>${unit.capacity} ${esc(t(unit.capacity === 1 ? "property.person" : "property.people"))}</span>` : ""}
          </div>
          <div class="unit-card-features">${displayedFeatures.map(key => `<span class="mini-feature">${esc(t(key))}</span>`).join("")}</div>
          <div class="unit-card-actions">
            <button class="text-action unit-card-details" type="button" data-property="${property.id}" data-unit="${unit.id}">${esc(t("actions.details"))}</button>
            ${KE_BOOKING.units[unit.id] ? `<a class="button small" href="${unitBookingUrl(unit)}" target="_blank" rel="noopener noreferrer">${esc(t("actions.bookNow"))}</a>` : ""}
          </div>
        </div>
      </article>`;
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
            <p class="eyebrow">PierresVives</p>
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
            <div class="practical-row"><span>Tél.</span><strong><a href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a></strong></div>
            <div class="practical-row"><span>E-mail</span><strong><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></strong></div>
          </aside>
        </div>
      </section>

      ${property.gallery && property.gallery.length > 1 ? `
      <section class="section compact">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("property.gallery"))}</p><h2 class="section-title">${esc(propertyName(property))}</h2></div>
          <p class="lead">${esc(text(property.locationText))}</p>
        </div>
        <div class="gallery-grid reveal">
          ${property.gallery.slice(0,5).map((image,i) => `<figure class="gallery-item"><img src="${image}" alt="${esc(propertyName(property))} — ${i+1}" loading="lazy"></figure>`).join("")}
        </div>
      </section>` : ""}

      <section class="section compact">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("property.accommodations"))}</p><h2 class="section-title">${esc(t(property.typeKey))}</h2></div>
          <p class="lead">${esc(t("property.accommodationsText"))}</p>
        </div>
        ${property.units.length > 6 ? `<div class="unit-finder reveal">
          <div class="unit-finder-copy"><p class="eyebrow">${esc(t("finder.eyebrow"))}</p><h3>${esc(t("finder.title"))}</h3><p>${esc(t("finder.text"))}</p></div>
          <label><span>${esc(t("finder.search"))}</span><input id="unit-search" type="search" placeholder="${esc(t("finder.search"))}" autocomplete="off"></label>
          <label><span>${esc(t("finder.guests"))}</span><select id="unit-guests"><option value="0">${esc(t("finder.allGuests"))}</option>${[2,4,5,6,7,8].map(n => `<option value="${n}">${n} ${esc(t("property.people"))}</option>`).join("")}</select></label>
          <strong class="unit-results" id="unit-results"></strong>
        </div>` : ""}
        <div class="units-grid" id="units-grid">${property.units.map(unit => unitCard(property,unit)).join("")}</div>
        <p class="unit-no-results" id="unit-no-results" hidden>${esc(t("finder.none"))}</p>
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
            <img src="${property.hero}" alt="${esc(propertyName(property))}" loading="lazy">
            <span class="location-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2"/></svg></span>
          </div>
        </div>
      </section>

      <section class="section compact">
        <div class="booking-cta reveal">
          <div><h2>${esc(t("property.bookingCtaTitle"))}</h2><p>${esc(t("property.bookingCtaText"))}</p></div>
          <div class="booking-cta-actions">
            <a class="button light" href="${propertyBookingUrl()}" target="_blank" rel="noopener noreferrer">${esc(t("actions.bookBooking"))}</a>
            <a class="booking-contact-link" href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a>
            <a class="booking-contact-link" href="mailto:${CONTACT.email}">${CONTACT.email}</a>
          </div>
        </div>
      </section>`;

    bindUnitDetailButtons(property);
    initUnitFinder(property);
    updateMeta(`${propertyName(property)} — PierresVives`, text(property.description), property.hero);
  }

  function bindUnitDetailButtons(property = null) {
    document.querySelectorAll(".unit-card-details").forEach(button => {
      button.addEventListener("click", () => {
        const selectedProperty = property || DATA.properties[button.dataset.property];
        if (selectedProperty) openUnitDialog(selectedProperty, button.dataset.unit);
      });
    });
  }

  function initUnitFinder(property) {
    const search = document.getElementById("unit-search");
    const guests = document.getElementById("unit-guests");
    const count = document.getElementById("unit-results");
    const empty = document.getElementById("unit-no-results");
    if (!search || !guests) return;
    const cards = [...document.querySelectorAll("[data-unit-card]")];
    const apply = () => {
      const query = search.value.trim().toLocaleLowerCase();
      const minGuests = Number(guests.value || 0);
      let visible = 0;
      cards.forEach(card => {
        const capacity = Number(card.dataset.capacity || 0);
        const matchesName = !query || card.dataset.name.includes(query);
        const matchesGuests = !minGuests || capacity >= minGuests;
        const show = matchesName && matchesGuests;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = `${visible} ${t("finder.results")}`;
      if (empty) empty.hidden = visible !== 0;
    };
    search.addEventListener("input", apply);
    guests.addEventListener("change", apply);
    apply();
  }

  function openUnitDialog(property, unitId) {
    const unit = property.units.find(u => u.id === unitId);
    if (!unit) return;
    const gallery = unitGallery(unit);
    dialogContent.innerHTML = `
      ${gallery.length ? `
      <div class="dialog-gallery" data-dialog-gallery>
        <div class="dialog-gallery-stage">
          <img id="dialog-gallery-main" src="${gallery[0]}" alt="${esc(unitName(unit))}">
          ${gallery.length > 1 ? `<button class="gallery-arrow previous" type="button" data-gallery-prev aria-label="Image précédente">‹</button><button class="gallery-arrow next" type="button" data-gallery-next aria-label="Image suivante">›</button>` : ""}
          <span class="dialog-photo-counter" id="dialog-photo-counter">1 / ${gallery.length}</span>
        </div>
        ${gallery.length > 1 ? `<div class="dialog-thumbnails">${gallery.map((image,index) => `<button type="button" class="dialog-thumb ${index === 0 ? "active" : ""}" data-gallery-index="${index}" aria-label="${esc(unitName(unit))} — ${index+1}"><img src="${galleryThumb(image)}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div>` : ""}
      </div>` : `
      <div class="dialog-gallery dialog-gallery-placeholder">
        ${unitMedia(unit)}
      </div>`}
      <div class="dialog-body">
        <p class="eyebrow">${esc(propertyName(property))}</p>
        <h2>${esc(unitName(unit))}</h2>
        <div class="dialog-stats">
          ${unit.size ? `<span><strong>${esc(t("property.surface"))}:</strong> ${unit.size} m²</span>` : ""}
          ${unit.capacity ? `<span><strong>${esc(t("property.capacity"))}:</strong> ${unit.capacity} ${esc(t(unit.capacity === 1 ? "property.person" : "property.people"))}</span>` : ""}
          ${gallery.length > 1 ? `<span><strong>${gallery.length}</strong> ${esc(t("property.photos"))}</span>` : ""}
        </div>
        <div class="dialog-columns">
          ${unit.beds && unit.beds.length ? `<div><h3>${esc(t("property.bedding"))}</h3><ul class="bed-list">${unit.beds.map(([count,key]) => `<li>${count} × ${esc(t(key))}</li>`).join("")}</ul></div>` : ""}
          ${unit.features && unit.features.length ? `<div><h3>${esc(t("property.amenities"))}</h3><ul class="amenity-list">${unit.features.map(key => `<li>${esc(t(key))}</li>`).join("")}</ul></div>` : ""}
        </div>
        <div class="dialog-booking-actions">
          <a class="button" href="${unitBookingUrl(unit)}" ${unitBookingUrl(unit).startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${esc(t("actions.bookNow"))}</a>
          <a href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a>
          <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
        </div>
      </div>`;
    if (gallery.length) bindDialogGallery(gallery, unitName(unit));
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
    document.body.classList.add("dialog-open");
  }

  function bindDialogGallery(gallery, altBase) {
    const main = document.getElementById("dialog-gallery-main");
    const counter = document.getElementById("dialog-photo-counter");
    const thumbs = [...document.querySelectorAll("[data-gallery-index]")];
    if (!main) return;
    let active = 0;
    const show = index => {
      active = (index + gallery.length) % gallery.length;
      main.src = gallery[active];
      main.alt = `${altBase} — ${active + 1}`;
      if (counter) counter.textContent = `${active + 1} / ${gallery.length}`;
      thumbs.forEach((thumb,i) => thumb.classList.toggle("active", i === active));
    };
    thumbs.forEach(thumb => thumb.addEventListener("click", () => show(Number(thumb.dataset.galleryIndex))));
    document.querySelector("[data-gallery-prev]")?.addEventListener("click", () => show(active - 1));
    document.querySelector("[data-gallery-next]")?.addEventListener("click", () => show(active + 1));
  }

  function closeUnitDialog() {
    if (dialog.open) dialog.close();
    document.body.classList.remove("dialog-open");
  }

  function renderVisualWalk() {
    app.innerHTML = `
      <section class="standard-hero visual-walk-hero">
        <p class="eyebrow reveal">${esc(t("visual.eyebrow"))}</p>
        <h1 class="section-title reveal">${esc(t("visual.allPhotos"))}</h1>
        <p class="lead reveal">${esc(t("visual.text"))}</p>
        ${contactLinks("booking-page-contact")}
      </section>
      <section class="section visual-walk-page">
        ${visualJourneyMarkup("full")}
      </section>
      <section class="visual-booking-band reveal">
        <div><p class="eyebrow">PierresVives</p><h2>${esc(t("booking.title"))}</h2><p>${esc(t("booking.text"))}</p></div>
        <a class="button" href="/reservation/">${esc(t("actions.book"))}</a>
      </section>`;
    updateMeta(`${t("nav.visualWalk")} — PierresVives`, t("visual.text"), DATA.properties.logis.hero);
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
    updateMeta(`${t("nav.experience")} — PierresVives`, t("experience.text"), "assets/images/domaine/main.jpg");
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
          <article class="contact-card contact-card-primary reveal">
            <h2>${esc(t("contact.directTitle"))}</h2>
            <p>${esc(t("contact.directText"))}</p>
            <div class="large-contact-links">
              <a href="${CONTACT.phoneHref}"><span>Téléphone</span><strong>${CONTACT.phoneDisplay}</strong></a>
              <a href="mailto:${CONTACT.email}"><span>E-mail</span><strong>${CONTACT.email}</strong></a>
            </div>
          </article>
          <article class="contact-card reveal">
            <h2>${esc(t("contact.bookingTitle"))}</h2>
            <p>${esc(t("contact.bookingText"))}</p>
            <a class="button" href="/reservation/">${esc(t("actions.book"))}</a>
            <div class="contact-property-list">
              ${propertyList().map(p => `<a class="contact-property-link" href="/etablissements/${p.id === "logis" ? "logis-du-haut-koenigsbourg" : p.id === "domaine" ? "domaine-du-haut-koenigsbourg" : "chateau-lacour"}/"><span>${esc(propertyName(p))}</span><span>${esc(t("actions.viewProperty"))} →</span></a>`).join("")}
            </div>
          </article>
        </div>
      </section>
      <section class="section compact direct-booking-section">
        <div class="section-head reveal">
          <div><p class="eyebrow">${esc(t("booking.eyebrow"))}</p><h2 class="section-title">${esc(t("booking.title"))}</h2></div>
          <p class="lead">${esc(t("booking.text"))}</p>
        </div>
        <div class="ke-owner-shell reveal" data-ke-widget="owner"></div>
      </section>`;
    updateMeta(`${t("nav.contact")} — PierresVives`, t("contact.text"), DATA.properties.chateau.hero);
  }

  function renderBooking() {
    const directUnits = DATA.properties.logis.units.filter(unit => KE_BOOKING.units[unit.id]);

    app.innerHTML = `
      <section class="standard-hero booking-page-hero">
        <p class="eyebrow reveal">${esc(t("booking.eyebrow"))}</p>
        <h1 class="section-title reveal">${esc(t("booking.title"))}</h1>
        <p class="lead reveal">${esc(t("booking.text"))}</p>
        ${contactLinks("booking-page-contact")}
      </section>

      <section class="section compact">
        <div class="booking-light-layout">
          <article class="booking-widget-card reveal">
            <div class="booking-widget-copy">
              <p class="eyebrow">${esc(t("booking.eyebrow"))}</p>
              <h2>${esc(t("booking.widgetTitle"))}</h2>
              <p>${esc(t("booking.widgetText"))}</p>
            </div>

            <div class="ke-owner-shell booking-owner-widget" data-ke-widget="owner"></div>

            <div class="booking-main-actions">
              <a class="button" href="${propertyBookingUrl()}" target="_blank" rel="noopener noreferrer">
                ${esc(t("booking.open"))} ↗
              </a>
              <p>${esc(t("booking.externalNote"))}</p>
            </div>
          </article>

          <aside class="booking-help-card booking-help-card-light reveal">
            <p class="eyebrow">PierresVives</p>
            <h2>${esc(t("booking.help"))}</h2>
            <p>${esc(t("booking.secure"))}</p>
            <div class="booking-help-contacts">
              <a href="${CONTACT.phoneHref}">
                <span>Téléphone</span>
                <strong>${CONTACT.phoneDisplay}</strong>
              </a>
              <a href="mailto:${CONTACT.email}">
                <span>E-mail</span>
                <strong>${CONTACT.email}</strong>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section class="section booking-places-section">
        <div class="section-head reveal">
          <div>
            <p class="eyebrow">${esc(t("booking.placesEyebrow"))}</p>
            <h2 class="section-title">${esc(t("booking.placesTitle"))}</h2>
          </div>
        </div>
        <div class="booking-property-grid">
          ${propertyList().map(property => `
            <a class="booking-property-card reveal" href="/etablissements/${property.id === "logis" ? "logis-du-haut-koenigsbourg" : property.id === "domaine" ? "domaine-du-haut-koenigsbourg" : "chateau-lacour"}/">
              <img src="${property.hero}" alt="${esc(propertyName(property))}" loading="lazy">
              <span class="booking-property-overlay">
                <small>${esc(text(property.typeKey ? t(property.typeKey) : ""))}</small>
                <strong>${esc(propertyName(property))}</strong>
                <em>${esc(property.city)} · ${esc(t("actions.viewProperty"))} →</em>
              </span>
            </a>
          `).join("")}
        </div>
      </section>

      <section class="section compact booking-units-section">
        <div class="section-head reveal">
          <div>
            <p class="eyebrow">${esc(t("booking.unitsEyebrow"))}</p>
            <h2 class="section-title">${esc(t("booking.unitsTitle"))}</h2>
          </div>
          <p class="lead">${esc(t("booking.unitsText"))}</p>
        </div>
        <div class="booking-unit-links">
          ${directUnits.map(unit => `
            <a class="booking-unit-link booking-unit-link-visual reveal" href="${unitBookingUrl(unit)}" target="_blank" rel="noopener noreferrer">
              ${unitMedia(unit, "booking-unit-image")}
              <span>
                <strong>${esc(unitName(unit))}</strong>
                <small>${unit.capacity ? `${unit.capacity} ${esc(t("property.people"))} · ` : ""}${esc(t("booking.availability"))}</small>
              </span>
              <b aria-hidden="true">→</b>
            </a>
          `).join("")}
        </div>
      </section>`;

    updateMeta(`${t("nav.booking")} — PierresVives`, t("booking.text"), DATA.properties.logis.hero);
  }

  function renderLegal(kind) {
    const keyTitle = `${kind}.title`;
    const keyText = kind === "legal" ? "legal.placeholder" : `${kind}.text`;
    app.innerHTML = `
      <section class="standard-hero"><p class="eyebrow">PierresVives</p><h1 class="section-title">${esc(t(keyTitle))}</h1></section>
      <section class="section compact"><div class="legal-content reveal"><p>${esc(t(keyText))}</p>${contactLinks("inline-contact-links")}</div></section>`;
    updateMeta(`${t(keyTitle)} — PierresVives`, t(keyText), DATA.properties.logis.hero);
  }

  function renderNotFound() {
    app.innerHTML = `<section class="standard-hero"><p class="eyebrow">404</p><h1 class="section-title">${esc(t("misc.notFound"))}</h1><p class="lead">${esc(t("misc.notFoundText"))}</p><p><a class="button" href="#/">${esc(t("actions.back"))}</a></p></section>`;
    updateMeta(`404 — PierresVives`, t("misc.notFoundText"), DATA.properties.logis.hero);
  }

  function updateMeta(title, description, image) {
    const siteOrigin = "https://pierresvives.com/";
    const absoluteImage = new URL(image, siteOrigin).href;
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (desc) desc.setAttribute("content", description);
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDesc) ogDesc.setAttribute("content", description);
    if (ogImage) ogImage.setAttribute("content", absoluteImage);
    if (ogUrl) ogUrl.setAttribute("content", siteOrigin);
    if (twitterTitle) twitterTitle.setAttribute("content", title);
    if (twitterDesc) twitterDesc.setAttribute("content", description);
    if (twitterImage) twitterImage.setAttribute("content", absoluteImage);
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
    else if (parts[0] === "balade-visuelle") renderVisualWalk();
    else if (parts[0] === "booking") renderBooking();
    else if (parts[0] === "contact") renderContact();
    else if (["legal","privacy","accessibility"].includes(parts[0])) renderLegal(parts[0]);
    else renderNotFound();

    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => { initReveals(); loadKeBookingWidgets(); bindUnitDetailButtons(); initVisualJourneys(); });
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
