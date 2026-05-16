// assets/main.js (FTD)

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // 1) NAV active-state (FTD .nav)
  // -----------------------------
  const nav = document.querySelector(".nav");
  if (nav) {
    const links = Array.from(nav.querySelectorAll("a"));
    const path = window.location.pathname.replace(/\/+$/, "");
    const current = (path.split("/").pop() || "index.html").toLowerCase();

    links.forEach((a) => {
      const hrefRaw = a.getAttribute("href") || "";
      const href = hrefRaw.split("#")[0].split("?")[0].toLowerCase();
      const hrefFile = (href.split("/").pop() || "").toLowerCase();
      const isHome = current === "" || current === "index.html";

      const matches =
        hrefFile === current ||
        (isHome && (hrefFile === "index.html" || href === "./" || href === "/" || href === ""));

      a.classList.toggle("active", matches);
    });
  }

  // -----------------------------------------
  // 2) One-audio-at-a-time (site-wide, safe)
  // -----------------------------------------
  const audios = Array.from(document.querySelectorAll("audio"));
  if (audios.length > 1) {
    audios.forEach((audio) => {
      audio.addEventListener("play", () => {
        audios.forEach((other) => {
          if (other !== audio && !other.paused) other.pause();
        });
      });
    });
  }

  // -----------------------------------------
  // 3) Back-to-top button (site-wide, safe)
  // -----------------------------------------
  if (!document.getElementById("backToTop")) {
    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.type = "button";
    btn.className = "btn back-to-top";
    btn.textContent = "Top";
    btn.setAttribute("aria-label", "Back to top");
    document.body.appendChild(btn);

    const onScroll = () => {
      btn.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // -----------------------------------------
  // 4) Archive accordion controls (archive only)
  // -----------------------------------------
  const archiveGroups = Array.from(document.querySelectorAll("details.archive-group"));
  if (archiveGroups.length) {
    // Build toolbar above first group
    const toolbar = document.createElement("div");
    toolbar.className = "archive-toolbar";
    toolbar.innerHTML = `
      <button class="btn subtle" type="button" id="archiveExpand">Expand all</button>
      <button class="btn subtle" type="button" id="archiveCollapse">Collapse all</button>
    `;

    archiveGroups[0].parentElement.insertBefore(toolbar, archiveGroups[0]);

    const expandBtn = document.getElementById("archiveExpand");
    const collapseBtn = document.getElementById("archiveCollapse");

    expandBtn.addEventListener("click", () => {
      archiveGroups.forEach((d) => (d.open = true));
    });

    collapseBtn.addEventListener("click", () => {
      archiveGroups.forEach((d) => (d.open = false));
    });
  }
    // Collapse Regulatory Foundations essay body
    const humanEntryHeading = Array.from(document.querySelectorAll("h3"))
    .find((h3) => h3.textContent.trim().toLowerCase() === "the human entry");

  if (humanEntryHeading) {
    const essayWrapper = document.createElement("div");
    essayWrapper.className = "essay-collapsible";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "btn essay-toggle";
    toggleBtn.textContent = "Click to read the essay";
    toggleBtn.setAttribute("aria-expanded", "false");

    humanEntryHeading.parentElement.insertBefore(toggleBtn, humanEntryHeading);
    humanEntryHeading.parentElement.insertBefore(essayWrapper, humanEntryHeading);

    let node = humanEntryHeading;
    while (node) {
      const next = node.nextSibling;
      essayWrapper.appendChild(node);
      node = next;
    }

    toggleBtn.addEventListener("click", () => {
      const isOpen = essayWrapper.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.textContent = isOpen
        ? "Hide essay"
        : "Click to read the essay";
    });
  }
  // ===== Archive popup =====

const archivePopup = document.createElement("div");
archivePopup.className = "archive-popup-overlay";

archivePopup.innerHTML = `
  <div class="archive-popup">
    <h2>FTD Is Now an Archive</h2>

    <p>
      Flip The Discourse is now preserved as an archive.
    </p>

    <p>
      This project was a scaffold: a place where I worked through early ideas about regulation, agency, metacognition, education, and self-governance.
    </p>

    <p>
      The active work is moving to <strong>tomhafner.com</strong>, where I will focus on building practical tools and workflows around personal knowledge management systems, AI-assisted learning, data analysis, and self-directed learning.
    </p>

    <p>
      The next phase is focused on building useful systems: local-first AI workflows, privacy-conscious learning tools, student-owned data, study support, metacognitive tools, and projects that help people learn, think, and direct their own growth.
    </p>

    <button class="btn archive-popup-close">Enter Archive</button>
  </div>
`;

document.body.appendChild(archivePopup);

const closePopup = archivePopup.querySelector(".archive-popup-close");

closePopup.addEventListener("click", () => {
  archivePopup.classList.add("hidden");
});
});