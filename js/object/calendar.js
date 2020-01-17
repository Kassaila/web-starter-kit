const calendar = (() => {
  const init = () => {
    if (!$('.calendar__category-dates').length) {
      return;
    }

    function expandFilters() {
      $(this).toggleClass('expanded');
      $('.calendar__category-dates').slideToggle();

      if ($(this).hasClass('expanded')) {
        $(this).attr('aria-expanded', 'true');
      } else {
        $(this).attr('aria-expanded', 'false');
      }
    }

    $('.calendar__expand-filters').attr('aria-expanded', 'false');
    $('.calendar__expand-filters').click(expandFilters);
  };

  return {
    init,
  };
})();

export default calendar;
