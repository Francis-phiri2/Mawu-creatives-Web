/**
 * MAWU CREATIVES — JAVASCRIPT CORE
 * Brand: Mawu Creatives (Kitwe, Copperbelt Province, Zambia)
 * Slogan: Creativity without limit – BRINGING YOUR BRAND TO LIFE
 * Primary WhatsApp: +260 960 931 423
 * Secondary Phone: +260 779 493 442
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initPortfolio();
  initQuoteEstimator();
  initFAQ();
  initFloatingWhatsApp();
  initContactForm();
  initSmoothScroll();
  setCurrentYear();
});

/* ==========================================================================
   1. STICKY HEADER & ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Check if header is currently over a dark section
    const darkSections = document.querySelectorAll('.dark-section');
    let isOverDark = false;
    const headerRect = header.getBoundingClientRect();
    const headerMiddle = headerRect.top + headerRect.height / 2;

    darkSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= headerMiddle && rect.bottom >= headerMiddle) {
        isOverDark = true;
      }
    });

    if (isOverDark) {
      header.classList.add('dark-header');
    } else {
      header.classList.remove('dark-header');
    }

    // Highlight active nav item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentId = '';

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
  });

  // Close when clicking nav link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '&#9776;';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '&#9776;';
    }
  });
}

/* ==========================================================================
   3. PORTFOLIO DATA, FILTERING & MODAL LIGHTBOX
   ========================================================================== */
const PROJECTS_DATA = [
  {
    id: 'northform',
    title: 'Northform Studio Identity',
    category: 'branding',
    categoryLabel: 'Corporate Branding',
    badge: 'Concept Project',
    gradientClass: 'mockup-branding-1',
    mockupTitle: 'N°RTHFORM',
    mockupSubtitle: 'ARCHITECTURE & INTERIORS',
    shortDesc: 'A minimalist, architectural identity system built for an upscale spatial design practice.',
    objective: 'Create a distinctive, high-end visual language that conveys structural precision, timeless elegance, and material craftsmanship.',
    approach: 'Employed high-contrast monochrome tones, a bespoke geometric logotype with architectural degree symbol, and structured layout grids across all stationery and touchpoints.',
    deliverables: [
      'Comprehensive Brand Style Guide',
      'Logo Suite (Primary, Wordmark, Sub-mark)',
      'Executive Stationery (Letterhead & Cards)',
      'Digital Presentation System',
      'Corporate Email Signature'
    ],
    outcome: 'An authoritative brand identity ready for market rollout that positions the studio as a premier architectural partner.'
  },
  {
    id: 'copperbelt-mining',
    title: 'Apex Mining Services Profile',
    category: 'corporate',
    categoryLabel: 'Corporate Design',
    badge: 'Sample Work',
    gradientClass: 'mockup-corp-1',
    mockupTitle: 'APEX',
    mockupSubtitle: 'MINING & LOGISTICS ZAMBIA',
    shortDesc: 'An investor-ready 16-page corporate company profile engineered for Copperbelt mining procurement tenders.',
    objective: 'Position the engineering supplier as a compliant, safety-certified, and technologically capable partner for international mining houses.',
    approach: 'Structured corporate messaging around compliance, equipment inventory, safety records, and local capacity. Crafted bespoke data charts, service matrix tables, and professional executive profiles.',
    deliverables: [
      '16-Page High-Impact Corporate Profile (Print & Digital PDF)',
      'Executive Summary One-Pager',
      'Complimentary Custom Business Card Design',
      'Complimentary Digital Letterhead (Word & PDF)'
    ],
    outcome: 'A polished, credible corporate profile that dramatically streamlines client qualification and tender submissions.'
  },
  {
    id: 'atelier-living',
    title: 'Atelier Living Web Platform',
    category: 'web',
    categoryLabel: 'Website Design & Dev',
    badge: 'Concept Project',
    gradientClass: 'mockup-web-1',
    mockupTitle: 'ATELIER',
    mockupSubtitle: 'LUXURY LIVING & FURNISHINGS',
    shortDesc: 'A fast, responsive, editorial e-commerce and showcase website designed for high conversions.',
    objective: 'Transform a high-end furniture brand’s digital presence with intuitive mobile navigation, editorial lookbooks, and instant WhatsApp enquiry channels.',
    approach: 'Implemented mobile-first responsive architecture, fluid typography, optimized responsive imagery, and seamless conversion prompts on every product page.',
    deliverables: [
      'Interactive UI/UX Design System in Figma',
      'Fully Responsive Frontend Development',
      'Dynamic WhatsApp Product Inquiry Integration',
      'Speed & SEO Optimization (<1.2s load)',
      'Mobile-First Product Catalog'
    ],
    outcome: 'A frictionless digital storefront that combines international aesthetics with direct African conversational commerce.'
  },
  {
    id: 'zambia-grow',
    title: 'Harvest Hub Social Campaign',
    category: 'social',
    categoryLabel: 'Social Media Management',
    badge: 'Sample Work',
    gradientClass: 'mockup-social-1',
    mockupTitle: 'HARVEST HUB',
    mockupSubtitle: 'AGRI-TECH SOLUTIONS',
    shortDesc: 'A 30-day social media launch campaign driving SME farmer engagement across Facebook and LinkedIn.',
    objective: 'Build brand awareness, establish agricultural thought-leadership, and generate qualified B2B leads for modern farming equipment.',
    approach: 'Developed 4 distinct content pillars (Educational Agronomy Tips, Customer Spotlight, Equipment Features, Special Seasonal Offers). Designed high-visibility carousel graphics and targeted video reels.',
    deliverables: [
      'Monthly Content Calendar & Copywriting',
      '24 Custom Branded Social Media Graphics',
      'Engaging Video Reel Cutdowns',
      'Weekly Audience Moderation & Engagement',
      'End-of-Month Analytics Performance Report'
    ],
    outcome: 'Generated a 240% increase in inbound WhatsApp enquiries and established an active community of over 4,500 local farmers.'
  },
  {
    id: 'copper-summit',
    title: 'Copperbelt Business Forum Collateral',
    category: 'design',
    categoryLabel: 'Graphic Design',
    badge: 'Sample Work',
    gradientClass: 'mockup-design-1',
    mockupTitle: 'CBF 2026',
    mockupSubtitle: 'ANNUAL LEADERSHIP CONCLAVE',
    shortDesc: 'Complete print and electronic collateral suite for a major Kitwe regional commercial conference.',
    objective: 'Deliver an executive-level visual identity for an industry summit, including physical banners, delegate badges, electronic invitations, and program booklets.',
    approach: 'Utilized deep copper and charcoal tones with crisp typography and clean geometric layout systems to produce legible, elegant conference print assets.',
    deliverables: [
      'Electronic Invitations & VIP Save-the-Date',
      'Roll-Up Banners & Stage Backdrop Displays',
      'Conference Program Booklet (Print & PDF)',
      'Lanyard Delegate Badges & Name Cards',
      'Digital Promotion Flyers for Social Channels'
    ],
    outcome: 'Cohesive, flawless visual execution praised by summit organizers, international speakers, and corporate sponsors.'
  },
  {
    id: 'cafora-coffee',
    title: 'Caffora Specialty Coffee Identity & Packaging',
    category: 'branding',
    categoryLabel: 'Corporate Branding',
    badge: 'Brand Showcase',
    gradientClass: 'mockup-branding-2',
    image: 'assets/images/portfolio/cafora/caffora-cup-mockup-web.jpg',
    mockupTitle: 'CAFFORA',
    mockupSubtitle: 'FOR COFFEE LOVERS',
    shortDesc: 'A warm, sophisticated visual identity, bespoke typographic mark, and packaging system for an artisan coffee brand.',
    objective: 'Create a distinctive, premium coffee brand identity centered around coffee lovers, combining precision typographic geometry with rich, artisanal cafe warmth.',
    approach: 'Engineered a custom geometric letterform featuring a signature coffee bean and steam droplet motif on the initial "C". Developed high-contrast warm latte and dark roast espresso palettes, precision vector lockups, takeaway coffee cup packaging, and complete retail collateral.',
    deliverables: [
      'Custom Typographic Wordmark & Geometric Vector Grid',
      'Signature Brand Monogram & Sub-marks',
      'Takeaway Coffee Cup & Packaging Mockups',
      'Artisan Color Palette (Warm Latte & Dark Roast Espresso)',
      'Comprehensive Vector Asset Suite (.AI, SVG, High-Res PNG)'
    ],
    gallery: [
      { src: 'assets/images/portfolio/cafora/caffora-cup-mockup-web.jpg', caption: 'Takeaway Coffee Cup Packaging Mockup' },
      { src: 'assets/images/portfolio/cafora/caffora-blueprint.png', caption: 'Geometric Vector Construction & Bezier Grid' },
      { src: 'assets/images/portfolio/cafora/caffora-espresso.jpg', caption: 'Dark Roast Espresso Colorway' },
      { src: 'assets/images/portfolio/cafora/caffora-latte.jpg', caption: 'Warm Latte Colorway' },
      { src: 'assets/images/portfolio/cafora/caffora-mark-duo.jpg', caption: 'Signature Monogram Sub-mark' }
    ],
    outcome: 'An unmistakable, inviting brand identity with instant shelf appeal and versatile adaptability across merchandise, packaging, and digital storefronts.'
  }
];

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  if (!portfolioGrid) return;

  // Check URL query parameters for initial filter (e.g. ?filter=branding)
  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get('filter') || 'all';

  filterBtns.forEach(b => {
    if (b.getAttribute('data-filter') === initialFilter) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Render initial items
  renderPortfolio(initialFilter);

  // Filter click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderPortfolio(filter);
      trackEvent('portfolio_filter_click', { filter });
    });
  });

  function renderPortfolio(filter) {
    portfolioGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'portfolio-card';
      card.setAttribute('data-id', project.id);

      const visualHtml = project.image 
        ? `<img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">`
        : `
          <div class="art-mockup ${project.gradientClass}">
            <div class="mockup-content">
              <div class="mockup-logo-mark">${project.mockupTitle}</div>
              <div class="mockup-sub">${project.mockupSubtitle}</div>
            </div>
          </div>
        `;

      card.innerHTML = `
        <div class="project-visual">
          <span class="project-badge">${project.badge}</span>
          <span class="project-category-tag">${project.categoryLabel}</span>
          ${visualHtml}
        </div>
        <div class="project-details">
          <h3>
            ${project.title}
            <span class="arrow">&nearr;</span>
          </h3>
          <p>${project.shortDesc}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        openProjectModal(project);
        trackEvent('portfolio_project_open', { projectId: project.id, title: project.title });
      });

      portfolioGrid.appendChild(card);
    });
  }

  // Modal open function
  function openProjectModal(project) {
    if (!modalOverlay) return;

    const modalContent = modalOverlay.querySelector('.modal-dynamic-content');
    if (!modalContent) return;

    const deliverablesHtml = project.deliverables.map(d => `<li><span class="text-blue">&#10003;</span> ${d}</li>`).join('');

    const prefilledWhatsAppUrl = buildWhatsAppUrl(`Hello Mawu Creatives. I am reviewing your project "${project.title}" (${project.categoryLabel}) on your website and would like to discuss a similar project for my business.`);

    let galleryHtml = '';
    if (project.gallery && project.gallery.length > 0) {
      galleryHtml = `
        <div class="modal-section" style="margin-top: 2rem;">
          <h4>Brand Assets & Visual Showcase</h4>
          <div class="modal-gallery-grid">
            ${project.gallery.map(item => `
              <div class="modal-gallery-item">
                <img src="${item.src}" alt="${item.caption}" loading="lazy">
                <div class="modal-gallery-caption">${item.caption}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const heroHtml = project.image
      ? `
        <div class="modal-hero has-image" style="background-image: url('${project.image}');">
          <div class="text-center">
            <span class="project-badge" style="position:static; display:inline-block; margin-bottom:1rem;">${project.badge}</span>
            <div class="mockup-logo-mark" style="font-size:2.5rem; color:#ffffff;">${project.mockupTitle}</div>
            <div class="mockup-sub" style="color:rgba(255,255,255,0.85);">${project.mockupSubtitle}</div>
          </div>
        </div>
      `
      : `
        <div class="modal-hero ${project.gradientClass}">
          <div class="text-center">
            <span class="project-badge" style="position:static; display:inline-block; margin-bottom:1rem;">${project.badge}</span>
            <div class="mockup-logo-mark" style="font-size:2.5rem;">${project.mockupTitle}</div>
            <div class="mockup-sub">${project.mockupSubtitle}</div>
          </div>
        </div>
      `;

    modalContent.innerHTML = `
      ${heroHtml}
      <div class="modal-body">
        <div class="modal-header-info">
          <div class="eyebrow">${project.categoryLabel}</div>
          <h2>${project.title}</h2>
          <p class="lead">${project.shortDesc}</p>
        </div>

        <div class="modal-grid">
          <div class="modal-main-col">
            <div class="modal-section">
              <h4>Project Objective</h4>
              <p>${project.objective}</p>
            </div>
            <div class="modal-section">
              <h4>Our Creative Approach</h4>
              <p>${project.approach}</p>
            </div>
            <div class="modal-section">
              <h4>Strategic Business Outcome</h4>
              <p>${project.outcome}</p>
            </div>
            ${galleryHtml}
          </div>

          <div class="modal-sidebar-col">
            <div class="modal-deliverables-list">
              <h4 style="margin-bottom:0.75rem; color:var(--text-main); font-size:1rem;">Key Deliverables</h4>
              <ul style="list-style:none; padding:0;">
                ${deliverablesHtml}
              </ul>
            </div>

            <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.75rem;">
              <a href="${prefilledWhatsAppUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width:100%;">
                Enquire via WhatsApp <span>&nearr;</span>
              </a>
              <a href="#contact" class="btn btn-secondary" onclick="document.querySelector('.modal-overlay').classList.remove('open'); prefillServiceInForm('${project.categoryLabel}');" style="width:100%;">
                Request a Custom Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   4. INTERACTIVE QUOTE ESTIMATOR / SCOPE BUILDER
   ========================================================================== */
function initQuoteEstimator() {
  const estimatorWrap = document.querySelector('.estimator-box');
  if (!estimatorWrap) return;

  const checkboxes = estimatorWrap.querySelectorAll('.estimator-item input[type="checkbox"]');
  const totalDisplay = estimatorWrap.querySelector('.est-total-amount');
  const waBtn = estimatorWrap.querySelector('.estimator-wa-btn');
  const briefBtn = estimatorWrap.querySelector('.estimator-brief-btn');

  function calculateEstimate() {
    let total = 0;
    const selectedItems = [];

    checkboxes.forEach(cb => {
      const itemContainer = cb.closest('.estimator-item');
      if (cb.checked) {
        itemContainer.classList.add('checked');
        const price = parseInt(cb.getAttribute('data-price') || '0', 10);
        total += price;
        selectedItems.push(cb.getAttribute('data-name'));
      } else {
        itemContainer.classList.remove('checked');
      }
    });

    if (totalDisplay) {
      totalDisplay.textContent = total === 0 ? 'K0' : `K${total.toLocaleString()}`;
    }

    // Update WhatsApp link
    if (waBtn) {
      if (selectedItems.length === 0) {
        waBtn.href = buildWhatsAppUrl('Hello Mawu Creatives. I visited your website and would like to request a consultation and quote for my business.');
      } else {
        const msg = `Hello Mawu Creatives. I used the project estimator on your website and selected the following starting scope:\n- ${selectedItems.join('\n- ')}\nEstimated Starting Investment: K${total.toLocaleString()}.\nPlease confirm availability and quotation details.`;
        waBtn.href = buildWhatsAppUrl(msg);
      }
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      calculateEstimate();
      trackEvent('quote_estimator_toggle', { item: cb.getAttribute('data-name'), checked: cb.checked });
    });
  });

  if (briefBtn) {
    briefBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = [];
      checkboxes.forEach(cb => {
        if (cb.checked) selected.push(cb.getAttribute('data-name'));
      });
      const descInput = document.querySelector('textarea[name="description"]');
      if (descInput && selected.length > 0) {
        descInput.value = `Selected Estimated Scope:\n- ${selected.join('\n- ')}\n\nProject details: `;
      }
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  calculateEstimate();
}

/* ==========================================================================
   5. ACCORDION FAQ
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items for a clean editorial accordion
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        trackEvent('faq_expand', { question: questionBtn.textContent.trim() });
      }
    });
  });
}

/* ==========================================================================
   6. FLOATING WHATSAPP & PRESET QUICK DRAWER
   ========================================================================== */
function initFloatingWhatsApp() {
  const triggerBtn = document.querySelector('.floating-whatsapp-btn');
  const popup = document.querySelector('.whatsapp-popup');
  const closeBtn = document.querySelector('.whatsapp-popup-close');
  const presetBtns = document.querySelectorAll('.whatsapp-preset-btn');

  if (!triggerBtn || !popup) return;

  triggerBtn.addEventListener('click', () => {
    popup.classList.toggle('open');
    trackEvent('whatsapp_widget_toggle', {});
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('open');
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-preset-text');
      const url = buildWhatsAppUrl(text);
      trackEvent('whatsapp_preset_click', { presetText: text });
      window.open(url, '_blank');
      popup.classList.remove('open');
    });
  });
}

/* ==========================================================================
   7. FORM VALIDATION & ENQUIRY DISPATCH
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const feedback = form.querySelector('.form-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const business = form.querySelector('[name="business"]')?.value.trim() || 'Not specified';
    const phone = form.querySelector('[name="phone"]').value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim() || 'Not specified';
    const service = form.querySelector('[name="service"]').value;
    const budget = form.querySelector('[name="budget"]')?.value || 'Flexible';
    const description = form.querySelector('[name="description"]').value.trim();
    const contactMethod = form.querySelector('[name="contact_method"]')?.value || 'WhatsApp';

    // Validation
    if (!name || !phone || !service || !description) {
      showFeedback('Please fill in all required fields (Name, Phone, Service, and Project Brief).', 'error');
      return;
    }

    const payload = {
      name,
      business,
      phone,
      email,
      service,
      budget,
      description,
      contactMethod,
      timestamp: new Date().toISOString()
    };

    trackEvent('form_submission_attempt', { service, budget });

    // Format WhatsApp prefilled message
    const waMessage = 
      `*New Project Enquiry — Mawu Creatives*\n` +
      `----------------------------------------\n` +
      `*Client Name:* ${name}\n` +
      `*Business Name:* ${business}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Service Required:* ${service}\n` +
      `*Budget Range:* ${budget}\n` +
      `*Preferred Contact:* ${contactMethod}\n\n` +
      `*Project Brief:*\n${description}\n` +
      `----------------------------------------\n` +
      `Sent from Mawu Creatives Website`;

    const waUrl = buildWhatsAppUrl(waMessage);

    // Save to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('mawu_enquiries') || '[]');
      existing.push(payload);
      localStorage.setItem('mawu_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('Local storage error:', err);
    }

    // Attempt optional backend dispatch if available
    try {
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (_) {}

    showFeedback('Your brief has been compiled! Opening WhatsApp to start our conversation with Mawu Creatives...', 'success');

    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 1200);
  });

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ==========================================================================
   UTILITY & HELPERS
   ========================================================================== */
function buildWhatsAppUrl(message) {
  const cleanPhone = '260960931423';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

window.prefillServiceInForm = function(serviceName) {
  const serviceSelect = document.querySelector('select[name="service"]');
  if (serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }
};

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function setCurrentYear() {
  const yearElem = document.getElementById('year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

function trackEvent(eventName, params = {}) {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...params });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (e) {
    // Analytics fail-safe
  }
}

