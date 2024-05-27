import type {CollectionMenuQuery} from 'storefrontapi.generated';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import './styles/collectionAsideContent.scss';

export interface CollectionAsideContentProps {
  menu: NonNullable<CollectionMenuQuery['menu']>;
}

export default function CollectionAsideContent({
  menu,
}: CollectionAsideContentProps) {
  return (
    <ul className="asideContentList">
      {menu.items.map((item) => (
        <li key={item.id}>
          <CollectionItem item={item} />
        </li>
      ))}
    </ul>
  );
}

type CollectionItem = CollectionAsideContentProps['menu']['items'][number];
function CollectionItem({item}: {item: CollectionItem}) {
  const {title, resource} = item;
  if (!resource) return;

  return (
    <Link
      to={`/collections/${resource?.handle}`}
      className="collectionItem"
      onClick={(ev) => {
        // close the aside
        window.location.href = ev.currentTarget.href;
      }}
    >
      {resource.image && <Image data={resource.image} />}
      <h4>{title}</h4>
    </Link>
  );
}
