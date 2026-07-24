(function () {
  'use strict';

  // ── Category filter on articles index page ──
  var filters = document.querySelectorAll('.pa-filter');
  var cards = document.querySelectorAll('.pa-card[data-category]');
  var counter = document.querySelector('.pa-filter-count');

  if (filters.length && cards.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('is-on'); });
        btn.classList.add('is-on');

        var cat = btn.dataset.filter;
        var visible = 0;

        cards.forEach(function (card) {
          var match = cat === 'all' || card.dataset.category === cat;
          card.classList.toggle('is-hidden', !match);
          if (match) visible++;
        });

        if (counter) {
          counter.textContent = visible + ' of ' + cards.length + ' shown';
        }
      });
    });
  }

  // ── TOC active section tracking on article pages ──
  var tocLinks = document.querySelectorAll('.pa-art-toc a');

  if (tocLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        // Find the ToC link that corresponds to this heading
        var id = entry.target.id;
        tocLinks.forEach(function (link) {
          var parent = link.closest('li');
          if (parent) {
            var href = link.getAttribute('href');
            var match = href && href === '#' + id;
            parent.classList.toggle('is-current', match);
          }
        });
      });
    }, { rootMargin: '0px 0px -66% 0px' });

    // Observe all headings that have corresponding ToC links
    tocLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var id = href.substring(1);
        var heading = document.getElementById(id);
        if (heading) {
          observer.observe(heading);
        }
      }
    });
  }

  // ── Lightbox for content images ──
  var lightboxOverlay;

  function ensureLightboxOverlay() {
    if (lightboxOverlay) return lightboxOverlay;

    lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'pa-lightbox-overlay';
    lightboxOverlay.innerHTML =
      '<button type="button" class="pa-lightbox-close" aria-label="Close">&times;</button>' +
      '<img class="pa-lightbox-img" alt="">';
    document.body.appendChild(lightboxOverlay);

    lightboxOverlay.addEventListener('click', function (e) {
      if (e.target === lightboxOverlay || e.target.classList.contains('pa-lightbox-close')) {
        closeLightbox();
      }
    });

    return lightboxOverlay;
  }

  function closeLightbox() {
    if (lightboxOverlay) lightboxOverlay.classList.remove('is-open');
    document.body.classList.remove('pa-lightbox-lock');
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.pa-lightbox');
    if (!trigger) return;

    e.preventDefault();
    var overlay = ensureLightboxOverlay();
    var img = overlay.querySelector('.pa-lightbox-img');
    img.src = trigger.getAttribute('href');
    img.alt = trigger.getAttribute('data-caption') || '';
    overlay.classList.add('is-open');
    document.body.classList.add('pa-lightbox-lock');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
