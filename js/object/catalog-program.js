const catalogProgram = (() => {
  const init = () => {
    if (!$('#program-list__table').length) {
      return;
    }

    // eslint-disable-next-line global-require
    Window.DataTable = require('datatables.net')();

    function appendButton() {
      $('.catalog-program-list__reset').appendTo('#program-list__table_filter');
    }
    const table = $('#program-list__table')
      .on('init.dt', appendButton)
      .DataTable({
        paging: false,
        language: {
          search: 'Search Within Table:',
        },
      });

    function clearTable() {
      table.search('').draw();
    }

    $('.catalog-program-list__reset').click(clearTable);

    function scrollToTop() {
      const offset = $($(this).attr('href')).offset().top;
      $('html,body').animate({ scrollTop: offset }, 300);
    }

    $('.catalog-program-list__top').click(scrollToTop);
  };

  return {
    init,
  };
})();

export default catalogProgram;
