import Utilities from './Utilities';


class App {
  constructor() {
    this.$anchors = $('.anchor');
    this.$header = $('.main-header');

    this.animate = false;
    this.interval = null;
    this.isRunning = false;
  }

  carousel() {
    const $ul = $('#carousel').find('ul');

    // play animation on desktops only
    if (this.animate && !this.isRunning) {
      this.isRunning = true;

      const options = [
        'front end',
        'javascript',
        'angular',
        'jquery',
        'bootstrap',
      ];

      options.forEach(value => {
        $('<li>', { text: value }).appendTo($ul);
      });

      const $first = $('ul').find('li:first').addClass('active');
      let $next = $first.next();

      this.interval = setInterval(() => {
        $ul.find('.active').removeClass('active');
        $next = $next.addClass('active').next();

        if (!$next.length) $next = $first;
      }, 3000);
    } else if (!this.animate) {
      this.isRunning = false;
      $ul.empty();
      clearInterval(this.interval);
    }

    return this;
  }

  updateBackground() {
    if ( Utilities.isMobile(navigator.userAgent || navigator.vendor || window.opera) ) {
      this.$header.css({
        height: window.innerHeight
      });
    }

    // allow chaining
    return this;
  }

  toggleAnimation() {
    this.animate = Utilities.isWider();

    return this;
  }

  events() {
    // jQuery $(this) will not work with arrow functions
    // need a reference to class instance
    const self = this;


    $(window).on('resize', () => {
      self
        .toggleAnimation()
        .carousel();
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
      $('nav').toggleClass('visible');
    });

    $(window).on('scroll', function() {
      const scrollTop = $(document).scrollTop();

      if (self.animate) {
        self.$header.css({
          backgroundPositionY: 100 - Math.round(100 * scrollTop / ( $(document).height() - window.innerHeight ) ) + '%'
        });
      }

      if (scrollTop >= $('#projects').offset().top / 2) {
        self.$anchors.each(function() {
          const $this = $(this);
          const $target = $($this.attr('href'));

          if ($target.offset().top <= scrollTop + window.innerHeight / 2) {
            $('nav a.active').removeClass('active');
            $this.addClass('active');
          }
        });
      } else {
        self.$anchors.removeClass('active');
      }
    }).scroll();

    return this;
  }
}


export default new App();
