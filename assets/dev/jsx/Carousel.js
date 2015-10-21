class Carousel {
  constructor(delay = 3000) {
    this.intervalId = null;
    this.delay = delay;
    this.isRunning = false;

    this.options = [
      'front end',
      'javascript',
      'angular',
      'jquery',
      'bootstrap',
    ];

    this.$carousel = $('#carousel');
    this.$first = null;
    this.$next = null;
  }

  run() {
    if (!this.isRunning) {
      this.isRunning = true;

      if (this.$carousel.is(':empty')) {
        this.options.forEach(value => {
          $('<span>', { text: value }).appendTo(this.$carousel);
        });

        this.$first = this.$carousel.find('span:first').addClass('active');
        this.$next = this.$first.next();
      }


      this.intervalId = setInterval(() => {
        this.$carousel.find('.active').removeClass('active');
        this.$next = this.$next.addClass('active').next();

        if (!this.$next.length) this.$next = this.$first;
      }, this.delay);
    }
  }

  pause(remove) {
    this.isRunning = false;
    clearInterval(this.intervalId);
    if (remove) this.$carousel.empty();
  }
}

export default new Carousel();
