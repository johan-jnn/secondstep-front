import {CaretDownIcon} from '@shopify/polaris-icons';
import Button from './Button';
import Icon from './Icon';
import type {ValidBrands} from './BrandLogo';
import './styles/searchForm.scss';
import {
  ElementRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type FormEventHandler,
  type Ref,
} from 'react';
import {RangeSlider} from 'react-double-range-slider';
import 'react-double-range-slider/dist/cjs/index.css';
import Price from './Price';

export interface searchOptions {
  brands: ValidBrands[];
  sizes: (number | string)[];
  colors: string[];
}

export interface SearchFromProps {
  current?: {
    q?: string;
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
  const defaultPriceRange = [0, 200];
  const [minPrice, setMinPrice] = useState(defaultPriceRange[0].toString());
  const [maxPrice, setMaxPrice] = useState(defaultPriceRange[1].toString());

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
              {multipleCheckboxEntry(options.brands, 'brand').map(
                ({initial, input, key}) => (
                  <label htmlFor={key} key={key}>
                    {input}
                    {initial}
                  </label>
                ),
              )}
            </>
          </Filter>
          <Filter name="Tailles" className="sizes">
            <>
              {multipleCheckboxEntry(options.sizes, 'size').map(
                ({initial, input, key}) => (
                  <label htmlFor={key} key={key}>
                    {input}
                    {initial}
                  </label>
                ),
              )}
            </>
          </Filter>
          <Filter name="Couleurs" className="colors">
            <>
              {multipleCheckboxEntry(options.colors, 'color').map(
                ({initial, input, key}) => (
                  <label htmlFor={key} key={key}>
                    {input}
                    {initial}
                  </label>
                ),
              )}
            </>
          </Filter>
          <Filter name="Prix" className="price_range">
            <>
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
                onChange={(v) => {
                  setMinPrice(v.min);
                  setMaxPrice(v.max);
                }}
                tooltipVisibility="hover"
              />
            </>
          </Filter>
          <Filter name="Coupe" className="cut">
            <>
              {multipleCheckboxEntry(
                ['Coupe basse', 'Coupe mi-haute', 'Coupe haute'],
                'cut',
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
              {[
                'Tendances',
                'Nouveautés',
                'Prix décroissants',
                'Prix croissant',
              ].map((value) => (
                <label htmlFor={value} key={value}>
                  <input type="radio" name="sort" id={value} value={value} />
                  {value}
                </label>
              ))}
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
  name: string,
): {initial: T; key: string; input: JSX.Element}[] {
  return values.map((initial, index) => {
    const key = `${name}_${index}`;
    return {
      initial,
      key,
      input: (
        <>
          <input type="checkbox" name={key} id={key} value={initial} />
        </>
      ),
    };
  });
}
