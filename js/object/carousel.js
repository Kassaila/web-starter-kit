/**
 * Carousel display object interactions and accessiblity
 * @param {*} $
 * @returns {init} Determine and run if carousel present
 */

const carousel = (() => {
  // Render carousel
  function renderCarousel() {
    $('.carousel__wrapper').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
    });
  }

  const init = () => {
    if (!$('.carousel').length) {
      return;
    }

    renderCarousel();
  };

  return {
    init,
  };
})();

export default carousel;
