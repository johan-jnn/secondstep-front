import type {ValidBrands} from './BrandLogo';
import './styles/searchBar.scss';
import {
  type CSSProperties,
  useState,
  type FormEventHandler,
  type Ref,
} from 'react';
import 'react-double-range-slider/dist/cjs/index.css';
import './styles/sliders.scss';
import searchOptionsValues from '~/lib/constants/searchOptionsValues';
import colors from '~/lib/constants/colors.json';

export enum sortType {
  'Tendances',
  'Nouveautés',
  'Prix décroissants',
  'Prix croissant',
}
export enum deliveryType {
  'Normal',
  'Fast',
}
export interface searchOptions {
  brands: ValidBrands[];
  sizes: (number | string)[];
  colors: {name: string; code: string}[];
  cuts: string[];
  prices: {
    min: number;
    max: number;
  };
}

export interface SearchBarProps {
  current?: {
    q?: string;
    sort?: sortType;
    delivery?: deliveryType[];
  } & {[key in keyof searchOptions]?: searchOptions[key]};
  options?: searchOptions | 'default';
  inputRef?: Ref<HTMLInputElement>;
  onChange?: FormEventHandler<HTMLFormElement>;
  onFocus?: FormEventHandler<HTMLFormElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export default function SearchBar({
  current,
  inputRef,
  options,
  onChange,
  onFocus,
  onSubmit,
}: SearchBarProps) {
  if (options === 'default') options = searchOptionsValues;

  const defaultPriceRange = [
    options?.prices.min || 0,
    options?.prices.max || 9999,
  ];
  const [minPrice, setMinPrice] = useState(
    current?.prices?.min || defaultPriceRange[0],
  );
  const [maxPrice, setMaxPrice] = useState(
    current?.prices?.max || defaultPriceRange[1],
  );

  return (
    <form
      className="searchBar"
      action="/search"
      method="get"
      onFocus={onFocus}
      onInput={onChange}
      onSubmit={onSubmit}
    >
      <div className="queryAndSubmit">
        <input
          type="text"
          name="q"
          id="query"
          defaultValue={current?.q}
          ref={inputRef}
          placeholder="Recherche un modèle, une marque, ..."
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
        />
      </div>
    </form>
  );
}

export type searchParserResult = NonNullable<SearchBarProps['current']>;
export function searchParser(search: string) {
  const result: searchParserResult = {};
  const params = new URLSearchParams(search);

  for (const key of Array.from(params.keys())) {
    const keyValue = params.get(key);
    if (!keyValue) continue;

    const [keyName, keyIndex, ...keyInfos] = key.split('_') as [
      keyof searchParserResult,
      string,
      ...string[],
    ];

    switch (keyName) {
      case 'sizes':
      case 'brands':
      case 'cuts':
      case 'delivery': {
        if (!result[keyName]) result[keyName] = [];
        //@ts-ignore -- Expect to be a valid key value
        result[keyName].push(keyValue);
        break;
      }
      case 'colors':
        if (!result.colors) result.colors = [];
        const color = colors.find((c) => c.code === keyValue);
        if (!color) break;
        result.colors.push(color);
        break;
      case 'q': {
        result['q'] = keyValue;
        break;
      }
      case 'prices': {
        if (!result['prices'])
          result['prices'] = {
            min: 0,
            max: Infinity,
          };
        result['prices'][keyIndex as 'min' | 'max'] = parseInt(keyValue);
        break;
      }
      case 'sort': {
        result['sort'] = parseInt(keyValue);
        break;
      }
      default:
        break;
    }
  }

  return result;
}
