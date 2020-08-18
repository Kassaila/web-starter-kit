/**
 * @function getCssValue
 * @param {string} variable
 * @returns {*}
 * @description get CSS custom property and return value
 */
function getCssValue(variable) {
  return window.getComputedStyle(document.documentElement).getPropertyValue(variable);
}

/**
 * @function getCssValueNumNum
 * @param {string} variable
 * @param {string} units
 * @returns {number}
 * @description get CSS custom property and return value as number
 */
function getCssValueNum(variable, units) {
  return Number(getCssValue(variable).replace(units, ''));
}

export { getCssValue, getCssValueNum };
