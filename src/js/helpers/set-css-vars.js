/**
 * @function setScrollbarWidth
 * @description Calculate browser scroll width and set CSS custom property
 */
function setScrollbarWidth() {
  const root = document.documentElement;
  const scrollbarWidth = window.innerWidth - root.clientWidth;
  const CSS_VAR = '--scrollbar-width';

  root.style.setProperty(CSS_VAR, `${scrollbarWidth}px`);
}

export default {
  setScrollbarWidth,
};
