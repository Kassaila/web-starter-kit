import { getCssValueNum } from '../helpers/get-css-vars';

const media = {
  lg: getCssValueNum('--lg', 'px'),
  md: getCssValueNum('--md', 'px'),
  sm: getCssValueNum('--sm', 'px'),
  xsm: getCssValueNum('--xsm', 'px'),
};

export default media;
