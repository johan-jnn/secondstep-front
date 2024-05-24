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
import Price from './Price';

export enum sortType {
  'Tendances',
  'Nouveautés',
  'Prix décroissants',
  'Prix croissant',
}
export interface searchOptions {
  brands: ValidBrands[];
  sizes: (number | string)[];
  colors: string[];
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
  } & {[key in keyof searchOptions]?: searchOptions[key]};
  options?: searchOptions;
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
                options.colors,
                'colors',
                current?.colors,
              ).map(({initial, input, key}) => (
                <label
                  htmlFor={key}
                  key={key}
                  style={
                    {
                      '--color': initial,
                    } as CSSProperties
                  }
                >
                  {input}
                  {initial}
                </label>
              ))}
            </>
          </Filter>
          <Filter name="Prix" className="price_range">
            <>
              <input type="hidden" name="prices_min" value={minPrice} />
              <input type="hidden" name="prices_max" value={maxPrice} />
              <p>
                De{' '}
                <Price
                  value={{
                    amount: minPrice.toString(),
                    currencyCode: 'EUR',
                  }}
                  decimals={0}
                />
                {' à '}
                <Price
                  value={{
                    amount: maxPrice.toString(),
                    currencyCode: 'EUR',
                  }}
                  decimals={0}
                />
              </p>

              <RangeSlider
                value={{
                  min: defaultPriceRange[0],
                  max: defaultPriceRange[1],
                }}
                from={minPrice}
                to={maxPrice}
                onChange={(v) => {
                  setMinPrice(parseFloat(v.min));
                  setMaxPrice(parseFloat(v.max));
                }}
                tooltipVisibility="hover"
              />
            </>
          </Filter>
          <Filter name="Coupe" className="cut">
            <>
              {multipleCheckboxEntry(
                ['Coupe basse', 'Coupe mi-haute', 'Coupe haute'],
                'cuts',
                current?.cuts,
              ).map(({initial, input, key}) => (
                <label htmlFor={key} key={key}>
                  {input}
                  {initial}
                </label>
              ))}
            </>
          </Filter>
          <Filter name="Trier par" className="sort">
            <>
              {Object.values(sortType).map(
                (value) =>
                  typeof value === 'string' && (
                    <label htmlFor={value} key={value}>
                      <input
                        type="radio"
                        name="sort"
                        id={value}
                        value={sortType[value as keyof typeof sortType]}
                        defaultChecked={
                          current?.sort !== undefined &&
                          value === sortType[current?.sort]
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
        {children}
      </div>
    </li>
  );
}

function multipleCheckboxEntry<T extends string | number>(
  values: T[],
  name: keyof searchOptions,
  selectedValues?: T[],
): {initial: T; key: string; input: JSX.Element}[] {
  return values.map((initial, index) => {
    const key = `${name}_${index}`;

    return {
      initial,
      key,
      input: (
        <>
          <input
            type="checkbox"
            name={key}
            id={key}
            value={initial}
            defaultChecked={!!selectedValues?.find((val) => val == initial)}
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
      case 'colors':
      case 'brands':
      case 'cuts': {
        if (!result[keyName]) result[keyName] = [];
        //@ts-ignore -- Expect to be a valid key value
        result[keyName].push(keyValue);
        break;
      }
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
