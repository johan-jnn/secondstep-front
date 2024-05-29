import type {searchOptions} from '~/components/searchForm';
import colors from './colors.json';

export default {
  brands: ['Nike', 'Adidas', 'Air Jordan', 'New Balance', 'Salomon'],
  colors,
  sizes: [
    35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5,
  ],
  cuts: [],
  prices: {
    min: 0,
    max: 750,
  },
} satisfies searchOptions;
