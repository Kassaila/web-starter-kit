/**
 * Accordion display object interactions and accessiblity
 * @param {*} $
 * @returns {init} Determine and run if accordion present
 */

const accordion = (() => {
  // Expand/collapse accordion item.
  function accordionToggle() {
    const parentAccordion = $(this).closest('.accordion');
    const numItems = parentAccordion.find('.accordion__item').length;
    const expandAll = $(parentAccordion).find('.accordion__expand-all');
    const collapseAll = $(parentAccordion).find('.accordion__collapse-all');

    if ($(this).hasClass('js-expanded')) {
      $(this)
        .attr('aria-expanded', 'false')
        .removeClass('js-expanded')
        .next('.accordion__content')
        .slideUp(300);
    } else {
      $(this)
        .attr('aria-expanded', 'true')
        .addClass('js-expanded')
        .next('.accordion__content')
        .slideDown(300);
    }

    const openItems = parentAccordion.find('.js-expanded').length;

    if (openItems > 0) {
      collapseAll
        .removeClass('js-disabled')
        .removeAttr('aria-expanded')
        .prop('disabled', false);
    } else {
      collapseAll
        .addClass('js-disabled')
        .attr('aria-expanded', 'true')
        .prop('disabled', true);
    }

    if (openItems < numItems) {
      expandAll
        .removeClass('js-disabled')
        .removeAttr('aria-expanded')
        .prop('disabled', false);
    } else {
      expandAll
        .addClass('js-disabled')
        .attr('aria-expanded', 'true')
        .prop('disabled', true);
    }
  }

  // Expand-all toggle functionality.
  function accordionExpandAll() {
    const accordionItems = $(this)
      .parent()
      .siblings('.accordion__items')
      .find('.accordion__item');

    $(accordionItems).attr('aria-expanded', 'true');
    $(accordionItems)
      .find('.accordion__toggle')
      .addClass('js-expanded');
    $(accordionItems)
      .find('.accordion__content')
      .slideDown(300);
    $(this)
      .addClass('js-disabled')
      .attr('aria-expanded', 'true')
      .prop('disabled', true);
    $(this)
      .siblings('.accordion__collapse-all')
      .removeClass('js-disabled')
      .removeAttr('aria-expanded')
      .prop('disabled', false);
  }

  // Collapse-all toggle functionality.
  function accordionCollapseAll() {
    const accordionItems = $(this)
      .parent()
      .siblings('.accordion__items')
      .find('.accordion__item');

    $(accordionItems).attr('aria-expanded', 'false');
    $(accordionItems)
      .find('.accordion__toggle')
      .removeClass('js-expanded');
    $(accordionItems)
      .find('.accordion__content')
      .slideUp(300)
      .addClass('js-disabled')
      .attr('aria-expanded', 'false')
      .prop('disabled', true);
    $(this)
      .siblings('.accordion__expand-all')
      .removeClass('js-disabled')
      .removeAttr('aria-expanded')
      .prop('disabled', false);
  }

  // Accordion item back-to-top functionality.
  function accordionBackTop() {
    const headerHeight = $('header').height();
    const accordionTop = $(this)
      .closest('.accordion')
      .find('.accordion__all');

    $('html, body').animate(
      {
        scrollTop: accordionTop.offset().top - headerHeight,
      },
      300,
    );

    accordionTop.find('.accordion__expand-all').focus();
  }

  const init = () => {
    if (!$('.accordion').length) {
      return;
    }

    $('.accordion__toggle').on('click', accordionToggle);
    $('.accordion__expand-all').on('click', accordionExpandAll);
    $('.accordion__collapse-all').on('click', accordionCollapseAll);
    $('.accordion__top').on('click', accordionBackTop);
  };

  return {
    init,
  };
})();

export default accordion;
