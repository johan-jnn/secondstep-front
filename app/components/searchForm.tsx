import {CaretDownIcon} from '@shopify/polaris-icons';
import Button from './Button';
import Icon from './Icon';
import type {ValidBrands} from './BrandLogo';
import './styles/searchForm.scss';
import {
  type CSSProperties,
  useState,
  type FormEventHandler,
  type Ref,
} from 'react';
import {RangeSlider} from 'react-double-range-slider';
import 'react-double-range-slider/dist/cjs/index.css';
import './styles/sliders.scss';
import Price from './Price';
import DoubleRangedSlider from './doubleRangedSlider';
import searchOptionsValues from '~/lib/constants/searchOptionsValues';
import colors from '~/lib/constants/colors.json';
import './styles/searchBar.scss';

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

export interface SearchFromProps {
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

export default function SearchForm({
  current,
  inputRef,
  options,
  onChange,
  onFocus,
  onSubmit,
}: SearchFromProps) {
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
      className="searchForm"
      action="/search"
      method="get"
      onFocus={onFocus}
      onInput={onChange}
      onSubmit={onSubmit}
    >
      <h2>Recherchez votre prochaine paire !</h2>
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

        <Button
          type="primary"
          text="Rechercher >"
          caption={options && 'Et appliquer les filtres'}
          btnType="submit"
        />
      </div>
      {options && (
        <ul className="filters">
          <Filter name="Marques" className="brands">
            <>
              {multipleCheckboxEntry(
                options.brands,
                'brands',
                current?.brands,
              ).map(({initial, input, key}) => (
                <label htmlFor={key} key={key}>
                  {input}
                  {initial}
                </label>
              ))}
            </>
          </Filter>
          <Filter name="Tailles" className="sizes">
            <>
              {multipleCheckboxEntry(
                options.sizes,
                'sizes',
                current?.sizes,
              ).map(({initial, input, key}) => (
                <label htmlFor={key} key={key}>
                  {input}
                  {initial}
                </label>
              ))}
            </>
          </Filter>
          <Filter name="Couleurs" className="colors">
            <>
              {multipleCheckboxEntry(
                options.colors.map((c) => [c.name, c.code]),
                'colors',
                current?.colors?.map((c) => [c.name, c.code]),
              ).map(({initial, input, key}) => (
                <label
                  htmlFor={key}
                  key={key}
                  style={
                    {
                      '--color': initial[1],
                    } as CSSProperties
                  }
                >
                  {input}
                  <span className="preview"></span>
                  {initial[0]}
                </label>
              ))}
            </>
          </Filter>
          <Filter name="Prix" className="price_range">
            <>
              <p>
                De{' '}
                <span className="price">
                  <Price
                    value={{
                      amount: minPrice.toString(),
                      currencyCode: 'EUR',
                    }}
                    decimals={0}
                  />
                </span>
                {' à '}
                <span className="price">
                  <Price
                    value={{
                      amount: maxPrice.toString(),
                      currencyCode: 'EUR',
                    }}
                    decimals={0}
                  />
                </span>
              </p>

              <DoubleRangedSlider
                min={defaultPriceRange[0]}
                max={defaultPriceRange[1]}
                default={{
                  start: minPrice,
                  end: maxPrice,
                }}
                form={{
                  start_input_name: 'prices_min',
                  end_input_name: 'prices_max',
                }}
                onUpdate={(values) => {
                  setMinPrice(values.start);
                  setMaxPrice(values.end);
                }}
                onChange={(values) => {
                  setMinPrice(values.start);
                  setMaxPrice(values.end);
                }}
              />
            </>
          </Filter>
          <Filter name="Coupe" className="cut">
            <>
              {multipleCheckboxEntry(options.cuts, 'cuts', current?.cuts).map(
                ({initial, input, key}) => (
                  <label htmlFor={key} key={key}>
                    {input}
                    {initial}
                  </label>
                ),
              )}
            </>
          </Filter>
          <Filter name="Livraison" className="delivery">
            <>
              {multipleCheckboxEntry(
                Object.values(deliveryType).filter(
                  (v) => typeof v === 'number',
                ),
                'delivery',
                current?.delivery as number[] | undefined,
              ).map(({initial, input, key}) => (
                <label htmlFor={key} key={key}>
                  {input}
                  {deliveryType[initial]}
                </label>
              ))}
            </>
          </Filter>
          <Filter name="Trier par" className="sort">
            <>
              {Object.values(sortType).map(
                (value, index) =>
                  typeof value === 'string' && (
                    <label htmlFor={value} key={value}>
                      <input
                        type="radio"
                        name="sort"
                        id={value}
                        value={sortType[value as keyof typeof sortType]}
                        defaultChecked={
                          current?.sort !== undefined
                            ? value === sortType[current?.sort]
                            : !index
                        }
                      />
                      {value}
                    </label>
                  ),
              )}
            </>
          </Filter>
        </ul>
      )}
    </form>
  );
}

interface FilterProps {
  name: string;
  className?: string;
  children: JSX.Element;
}
function Filter({name, children, className}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li data-open={isOpen || null}>
      <button
        className="heading"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4>{name}</h4>
        <Icon
          icon={CaretDownIcon}
          customStyling={{
            fill: 'var(--color-grey)',
          }}
        />
      </button>
      <div className={`content ${className}`}>
        <hr />
        <div className="wrapper">{children}</div>
      </div>
    </li>
  );
}
export interface SearchBarProps {
  current?: string;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: FormEventHandler<HTMLFormElement>;
  onFocus?: FormEventHandler<HTMLFormElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export function TinySearchBar({
  current,
  inputRef,
  onChange,
  onFocus,
  onSubmit,
}: SearchBarProps) {
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
          defaultValue={current}
          ref={inputRef}
          placeholder="Recherche un modèle, une marque, ..."
        />
      </div>
    </form>
  );
}

function multipleCheckboxEntry<
  T extends string | number | [string | number, string | number],
>(
  values: T[],
  name: keyof NonNullable<SearchFromProps['current']>,
  selectedValues?: T[],
): {initial: T; key: string; input: JSX.Element}[] {
  return values.map((initial, index) => {
    const key = `${name}_${index}`;
    const getValue = (input: T): string | number =>
      input instanceof Array ? input[1] : input;

    return {
      initial,
      key,
      input: (
        <>
          <input
            type="checkbox"
            name={key}
            id={key}
            value={getValue(initial)}
            defaultChecked={
              !!selectedValues?.find(
                (val) => getValue(val) == getValue(initial),
              )
            }
          />
        </>
      ),
    };
  });
}

export type searchParserResult = NonNullable<SearchFromProps['current']>;
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
