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
      img: '',
      vid: '',
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
      img: '',
      vid: '',
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
      img: '/brands_icons/adidas.svg',
      vid: '',
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
