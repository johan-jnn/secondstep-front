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
          <Filter name="Marques">
            <>
              {multipleCheckboxEntry(options.brands, 'brand').map(
                ({initial, input}) => (
                  <label htmlFor={input.props.id} key={input.props.name}>
                    {input}
                    {initial}
                  </label>
                ),
              )}
            </>
          </Filter>
          <Filter name="Tailles">
            <>
              {multipleCheckboxEntry(options.sizes, 'size').map(
                ({initial, input}) => (
                  <label htmlFor={input.props.id} key={input.props.name}>
                    {input}
                    {initial}
                  </label>
                ),
              )}
            </>
          </Filter>
          <Filter name="Couleurs">
            <>
              {multipleCheckboxEntry(options.colors, 'color').map(
                ({initial, input}) => (
                  <label htmlFor={input.props.id} key={input.props.name}>
                    {input}
                    {initial}
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
  children: JSX.Element;
}
function Filter({name, children}: FilterProps) {
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
      <div className="content">
        <hr />
        {children}
      </div>
    </li>
  );
}

function multipleCheckboxEntry<T extends string | number>(
  values: T[],
  name: string,
): {initial: T; input: JSX.Element}[] {
  return values.map((initial, index) => ({
    initial,
    input: (
      <>
        <input
          type="checkbox"
          name={`${name}.${index}`}
          id={`${name}_${index}`}
          value={initial}
        />
      </>
    ),
  }));
}
