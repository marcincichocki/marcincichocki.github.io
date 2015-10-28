import Utilities from './Utilities';
import Carousel from './Carousel';


class App {
  constructor() {
    this.$anchors = $('.anchor');
    this.$aside = $('aside');
    this.$navigation = $('.website-navigation a');

    this.animate = false;
  }

  updateBackground() {
    if ( Utilities.isMobile(navigator.userAgent || navigator.vendor || window.opera) ) {
      $('#home').css({
        height: window.innerHeight
      });
    }

    // allow chaining
    return this;
  }

  toggleAnimation() {
    this.animate = Utilities.isWider();

    if (this.animate) {
      Carousel.run();
    } else {
      Carousel.pause(true);
    }

    return this;
  }

  events() {
    // jQuery $(this) will not work with arrow functions
    // need a reference to class instance
    const self = this;


    $(window).on('resize', () => {
      self.toggleAnimation();
    });

    self.$anchors.on('click', function(event) {
      event.preventDefault();

      const id = $(this).attr('href');

      $('html, body').animate({
        scrollTop: $(id).offset().top
      });
    });

    $('#toggleMenu').on('click', function(event) {
      event.preventDefault();

      $(this).toggleClass('active').children().toggleClass('hidden');
      $('body').toggleClass('aside-visible');
    });

    $(window).on('scroll', function() {
      const scrollTop = $(document).scrollTop();

      self.$navigation.each(function() {
        const $this = $(this);
        const $target = $($this.attr('href'));

        if ($target.offset().top <= scrollTop + window.innerHeight / 2) {
          $('nav a.active').removeClass('active');
          $this.addClass('active');
        }
      });

    }).scroll();

    return this;
  }
}


export default new App();
