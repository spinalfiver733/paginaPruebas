/**
* Template Name: Lumia
* Template URL: https://bootstrapmade.com/lumia-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Manejo de dropdowns del submenu
   */
  const dropdownLinks = document.querySelectorAll('.has-dropdown');

  // Variable para almacenar el menú actualmente abierto
  let activeDropdown = null;

  // Función para manejar el toggle del dropdown
  function toggleDropdown(e) {
    // Solo ejecutar en móvil
    if (window.innerWidth < 1200) {
      e.preventDefault();
      e.stopPropagation();
      
      const parentCol = this.closest('.col-md');
      const dropdownMenu = parentCol.querySelector('.dropdown-menu');
      
      // Si este dropdown ya está activo, lo cerramos
      if (parentCol.classList.contains('active')) {
        parentCol.classList.remove('active');
        dropdownMenu.classList.remove('show');
        activeDropdown = null;
      }
      // Si hay otro dropdown activo, lo cerramos y abrimos este
      else {
        // Cerrar el dropdown activo anterior si existe
        if (activeDropdown) {
          activeDropdown.classList.remove('active');
          activeDropdown.querySelector('.dropdown-menu').classList.remove('show');
        }
        
        // Abrir el nuevo dropdown
        parentCol.classList.add('active');
        dropdownMenu.classList.add('show');
        activeDropdown = parentCol;
      }
    }
  }

  // Agregar event listeners para los dropdowns
  dropdownLinks.forEach(link => {
    link.addEventListener('click', toggleDropdown);
    link.addEventListener('touchstart', toggleDropdown);
  });

  // Función para manejar clics fuera del dropdown
  function handleOutsideClick(e) {
    if (window.innerWidth < 1200) {
      if (!e.target.closest('.col-md') && activeDropdown) {
        activeDropdown.classList.remove('active');
        activeDropdown.querySelector('.dropdown-menu').classList.remove('show');
        activeDropdown = null;
      }
    }
  }

  // Event listeners para cerrar al clic fuera
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('touchstart', handleOutsideClick);

  // Event listener para el resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1200) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.col-md').forEach(col => {
        col.classList.remove('active');
      });
      activeDropdown = null;
    }
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Service cards hover effect
   */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.closest('.row').style.marginBottom = '200px';
      card.closest('.row').style.transition = 'margin-bottom 0.5s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.closest('.row').style.marginBottom = '0';
      card.closest('.row').style.transition = 'margin-bottom 0.5s ease';
    });
  });

  /**
   * Contact section highlight
   */
  document.addEventListener('DOMContentLoaded', function() {
    const enlaceContacto = document.querySelector('.nav-item.dropdown .nav-link');
    
    if (enlaceContacto) {
      enlaceContacto.addEventListener('click', function(e) {
        e.preventDefault();
        
        const seccionContacto = document.getElementById('contact-info');
        
        if (seccionContacto) {
          seccionContacto.scrollIntoView({ behavior: 'smooth' });
          seccionContacto.classList.add('highlight-contact');
          
          setTimeout(() => {
            seccionContacto.classList.remove('highlight-contact');
          }, 3000);
        }
      });
    }
  });

})(); // Fin de la función autoejecutable