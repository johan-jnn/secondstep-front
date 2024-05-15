import {Link} from 'react-router-dom';
import './styles/HomePageRestoredProduct.scss';
import type {RestoredShoesQuery} from 'storefrontapi.generated';
import CollectionBA from './CollectionBeforeAfter';
import Button from './Button';

export default function HomePageRestoredProduct({
  collection,
}: {
  collection: NonNullable<RestoredShoesQuery['collection']>;
}) {
  return (
    <div className="restoredProduct">
      <div className="restoredProduct-left">
        <h1> Nos Dernières paires restaurées</h1>
        <p>Chez SecondStep nous prennons à coeur notre mission</p>
        <p>
          Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum
          dolar
        </p>
        <Link to="/collections/all">
          <Button type="primary" text="Shopper ma paire reconditionnée" />
        </Link>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
              fill="var(--color-primary)"
            />
          </svg>
          <p>Reconditionnées et certifiées par nos experts</p>
        </div>
      </div>
      <div className="restoredProduct-Right">
        <CollectionBA collection={collection} />
      </div>
    </div>
  );
}
