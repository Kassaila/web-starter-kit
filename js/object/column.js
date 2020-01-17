/**
 * Statistic 3up display object interactions and accessiblity
 * @param {*} $
 * @returns {init} Determine and run if accordion present
 */

const column = (() => {
  const threeColDotSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    draggable: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 699,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1025,
        settings: 'unslick',
      },
    ],
  };

  const threeColArrowSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    draggable: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 699,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1025,
        settings: 'unslick',
      },
    ],
  };

  function slickInit() {
    $('.column--three.slick--dot:not(.slick-initialized)').slick(
      threeColDotSettings,
    );
    $('.column--three.slick--arrow:not(.slick-initialized)').slick(
      threeColArrowSettings,
    );
  }

  const init = () => {
    if (!$('.column.slick').length) {
      return;
    }

    if ($(window).width() <= 1024) {
      slickInit();
    }
  };

  return {
    init,
  };
})();

export default column;
