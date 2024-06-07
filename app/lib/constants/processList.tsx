import {CartIcon, LockIcon, SunIcon} from '@shopify/polaris-icons';
import type {AdjustIcon} from '@shopify/polaris-icons';

export interface ProcessItem {
  title: string;
  icon: typeof AdjustIcon;
  illustrations: {
    img: string;
    vid?: string;
  };
  descriptions: JSX.Element;
}

export const processList: ProcessItem[] = [
  {
    title: 'Achat',
    icon: CartIcon,
    illustrations: {
      img: 'https://cdn.shopify.com/s/files/1/0761/3231/9561/files/Minero-min_1_adc5131f-6c63-44da-9ad4-18c7e3a961bc.jpg?v=1701867514',
    },
    descriptions: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum et
          consequuntur quasi sint corrupti pariatur consectetur minima.
          Asperiores corrupti deserunt maxime ipsum rerum odio nesciunt tempore
          amet unde laboriosam!
        </p>
      </>
    ),
  },
  {
    title: 'Authentification',
    icon: LockIcon,
    illustrations: {
      img: 'https://cdn.shopify.com/s/files/1/0761/3231/9561/products/8a3bb4984251e989a79b5cfbf57711d7.png?v=1701432113',
      vid: '?',
    },
    descriptions: (
      <>
        <p>
          Chez <a href="/">SecondStep</a>, l&apos;authenticité des produits
          constitue le pilier fondamental de notre philosophie
          d&apos;entreprise. Nous comprenons à quel point il est essentiel pour
          nos clients de se sentir en confiance lors de leurs achats.
        </p>
        <p>
          C&apos;est pourquoi nous avons instauré un{' '}
          <strong>processus de vérification rigoureux</strong> pour chaque
          article proposé sur notre plateforme.
        </p>
        <p>
          Avant qu&apos;un produit ne parvienne entre les mains de nos clients,
          il passe par les mains expertes de notre{' '}
          <strong>équipe de contrôle</strong>. Ces professionnels hautement
          qualifiés sont spécialement formés pour déceler les contrefaçons et
          garantir ainsi que{' '}
          <strong>seuls les produits authentiques sont mis en vente</strong>.
        </p>
        <p>
          Chez SecondStep, nous croyons fermement que l&apos;authenticité est la
          clé de relations durables avec nos clients. Nous nous engageons à{' '}
          <strong>maintenir cet engagement</strong> et à vous offrir une
          expérience d&apos;achat <strong>sereine et fiable</strong> à chaque
          fois que vous choisissez de faire confiance à notre plateforme
        </p>
      </>
    ),
  },
  {
    title: 'Confiance',
    icon: SunIcon,
    illustrations: {
      img: 'https://cdn.shopify.com/s/files/1/0761/3231/9561/products/67dbd09523c1ac7ac2587d2c37ed0e31.jpg?v=1701432095',
    },
    descriptions: (
      <>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos ut
          ipsum, repudiandae expedita, quidem quisquam dolorum voluptas
          recusandae cupiditate consequuntur dolorem mollitia maiores ratione
          consectetur asperiores repellendus deleniti accusantium commodi?
        </p>
      </>
    ),
  },
];
