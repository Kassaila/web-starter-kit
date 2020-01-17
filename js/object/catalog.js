const catalog = (() => {
  const init = () => {
    if (!$('#course-list__table').length) {
      return;
    }

    // eslint-disable-next-line global-require
    Window.DataTable = require('datatables.net')();

    function filterGlobal() {
      const data = $('.dataTables_filter input[type="search"]').val();
      $('#course-table')
        .DataTable()
        .search(data);
    }

    function appendButton() {
      $('.catalog-course-list__reset').appendTo('#course-list__table_filter');
      $('.catalog-course-list__select').prependTo('#course-list__table_filter');
    }

    const table = $('#course-list__table')
      .on('init.dt', appendButton)
      .DataTable({
        paging: false,
        language: {
          search: 'Search Within Table:',
        },
      });

    $.fn.dataTable.ext.search.push((settings, data, dataIndex) => {
      const dataLabel = table.row(dataIndex).node();
      if ($('#subject-filter').val().length > 0) {
        return $(dataLabel).attr('data-subject') === $('#subject-filter').val();
        // eslint-disable-next-line no-else-return
      } else {
        return true;
      }
    });

    $('#subject-filter').on('change keyup', () => {
      table.draw();
      filterGlobal();
    });

    function clearTable() {
      $('#subject-filter').val('');
      table.search('').draw();
    }

    $('.catalog-course-list__reset').click(clearTable);

    function scrollToTop() {
      const offset = $($(this).attr('href')).offset().top;
      $('html,body').animate({ scrollTop: offset }, 300);
    }

    $('.catalog-course-list__top').click(scrollToTop);
  };

  return {
    init,
  };
})();

export default catalog;
