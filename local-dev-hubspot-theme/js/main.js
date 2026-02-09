(function () {
  // Variables
  var nav = document.querySelector('.header__navigation');
  var langSwitcher = document.querySelector('.header__language-switcher');
  var search = document.querySelector('.header__search');
  var allToggles = document.querySelectorAll('.header--toggle');
  var navToggle = document.querySelector('.header__navigation--toggle');
  var langToggle = document.querySelector('.header__language-switcher--toggle');
  var searchToggle = document.querySelector('.header__search--toggle');
  var closeToggle = document.querySelector('.header__close--toggle');
  var allElements = document.querySelectorAll(
    '.header--element, .header--toggle'
  );
  var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');

  // Functions

  // Function for executing code on document ready
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Function for toggling mobile navigation
  function toggleNav() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    nav.classList.toggle('open');
    navToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile language selector
  function toggleLang() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    langSwitcher.classList.toggle('open');
    langToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile search field
  function toggleSearch() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    search.classList.toggle('open');
    searchToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for the header close option on mobile
  function closeAll() {
    allElements.forEach(function (element) {
      element.classList.remove('hide', 'open');
    });

    closeToggle.classList.remove('show');
  }

  // Function to disable the other checkbox inputs on the email subscription system page template
  function toggleDisabled() {
    var emailSubItem = document.querySelectorAll('#email-prefs-form .item');

    emailSubItem.forEach(function (item) {
      var emailSubItemInput = item.querySelector('input');

      if (emailGlobalUnsub.checked) {
        item.classList.add('disabled');
        emailSubItemInput.setAttribute('disabled', 'disabled');
        emailSubItemInput.checked = false;
      } else {
        item.classList.remove('disabled');
        emailSubItemInput.removeAttribute('disabled');
      }
    });
  }

  // Execute JavaScript on document ready
  domReady(function () {
    if (!document.body) {
      return;
    } else {
      // Function dependent on language switcher
      if (langSwitcher) {
        langToggle.addEventListener('click', toggleLang);
      }

      // Function dependent on navigation
      if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
      }

      // Function dependent on search field
      if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
      }

      // Function dependent on close toggle
      if (closeToggle) {
        closeToggle.addEventListener('click', closeAll);
      }

      // Function dependent on email unsubscribe from all input
      if (emailGlobalUnsub) {
        emailGlobalUnsub.addEventListener('change', toggleDisabled);
      }

      // Hero slider
      var sliders = document.querySelectorAll('[data-hero-slider]');
      sliders.forEach(function (slider) {
        var slides = Array.prototype.slice.call(
          slider.querySelectorAll('[data-hero-slide]')
        );
        var prevBtn = slider.querySelector('[data-hero-slider-prev]');
        var nextBtn = slider.querySelector('[data-hero-slider-next]');
        var dotsWrapper = slider.querySelector('[data-hero-slider-dots]');
        var autoplay = slider.getAttribute('data-hero-slider-autoplay') === 'true';
        var autoplayDelay = parseInt(
          slider.getAttribute('data-hero-slider-autoplay-delay'),
          10
        );
        var delay = Number.isFinite(autoplayDelay) ? autoplayDelay : 9000;

        if (slides.length <= 1) {
          if (prevBtn) prevBtn.style.display = 'none';
          if (nextBtn) nextBtn.style.display = 'none';
          if (dotsWrapper) dotsWrapper.style.display = 'none';
          return;
        }

        var current = 0;
        var intervalId;
        var dots = [];
        var startX = 0;
        var isSwiping = false;

        function setActive(index) {
          slides.forEach(function (slide, i) {
            var isActive = i === index;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
          });
          dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === index);
          });
          current = index;
        }

        function next() {
          setActive((current + 1) % slides.length);
        }

        function prev() {
          setActive((current - 1 + slides.length) % slides.length);
        }

        function start() {
          if (!autoplay) return;
          intervalId = window.setInterval(next, delay);
        }

        function stop() {
          if (!intervalId) return;
          window.clearInterval(intervalId);
          intervalId = null;
        }

        if (dotsWrapper) {
          slides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 'hero-slider__dot' + (i === 0 ? ' is-active' : '');
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', function () {
              stop();
              setActive(i);
              start();
            });
            dotsWrapper.appendChild(dot);
            dots.push(dot);
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            stop();
            prev();
            start();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            stop();
            next();
            start();
          });
        }

        slider.addEventListener('mouseenter', stop);
        slider.addEventListener('mouseleave', start);

        slider.addEventListener('touchstart', function (event) {
          if (!event.touches || event.touches.length !== 1) return;
          startX = event.touches[0].clientX;
          isSwiping = true;
          stop();
        }, { passive: true });

        slider.addEventListener('touchend', function (event) {
          if (!isSwiping || !event.changedTouches || event.changedTouches.length !== 1) return;
          var endX = event.changedTouches[0].clientX;
          var deltaX = endX - startX;
          if (Math.abs(deltaX) > 40) {
            if (deltaX > 0) {
              prev();
            } else {
              next();
            }
          }
          isSwiping = false;
          start();
        }, { passive: true });

        start();
      });
    }
  });
})();
