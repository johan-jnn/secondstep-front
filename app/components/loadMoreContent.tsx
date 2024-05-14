import type {FC, Ref} from 'react';
import type {RemixLinkProps} from '@remix-run/react/dist/components';
import Button from './Button';

export interface loadMoreProps {
  isLoading: boolean;
  direction: 'more' | 'previous';
  link: FC<
    Omit<RemixLinkProps, 'to'> & {
      ref?: Ref<HTMLAnchorElement>;
    }
  >;
}

export default function LoadMore({
  direction,
  isLoading,
  link: Link,
}: loadMoreProps) {
  return (
    <Link className="buttonLoad">
      <Button
        text={
          direction === 'more'
            ? "Charger plus d'éléments"
            : 'Charger les éléments précédents'
        }
        type="primary"
        caption={isLoading ? 'Chargement...' : undefined}
      />
    </Link>
  );
}
