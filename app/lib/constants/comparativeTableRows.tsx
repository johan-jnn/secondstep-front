import {CheckIcon, XIcon} from '@shopify/polaris-icons';
import Icon from '~/components/Icon';
import CarteAuthenticite from '~/assets/carte_authenticite.png';
import France from '~/assets/svg/france.svg';

interface comparativeRow {
  title: JSX.Element | string;
  /**
   * SecondStep
   */
  ss: JSX.Element | string;
  /**
   * Seconde Main
   */
  sm: JSX.Element | string;
  /**
   * Achat Neuf
   */
  an: JSX.Element | string;
  handle: string;
}
export const comparativeRows: comparativeRow[] = [
  {
    title: (
      <>
        <b>Ecologique,</b> bon pour la planète
      </>
    ),
    ss: <Icon icon={CheckIcon} />,
    sm: <Icon icon={CheckIcon} />,
    an: <Icon icon={XIcon} />,
    handle: 'ecologique',
  },
  {
    title: (
      <>
        <b>Economique,</b> bon pour tes finances
      </>
    ),
    ss: <div className="deviseSigns">€€</div>,
    sm: <div className="deviseSigns">€</div>,
    an: <div className="deviseSigns">€€€€</div>,
    handle: 'economique',
  },
  {
    title: (
      <>
        <b>Rareté des paires</b> introuvables neuves
      </>
    ),
    ss: <Icon icon={CheckIcon} />,
    sm: <Icon icon={CheckIcon} />,
    an: <Icon icon={XIcon} />,
    handle: 'rare',
  },
  {
    title: (
      <>
        Carte <b>authentification certifiée</b>
      </>
    ),
    ss: <img src={CarteAuthenticite} alt="Carte d'authenticité" />,
    sm: <Icon icon={XIcon} />,
    an: <Icon icon={XIcon} />,
    handle: 'authentifiees',
  },
  {
    title: (
      <>
        <b>Reconditionnnement</b> à neuf
      </>
    ),
    ss: 'Par nos experts sneakers artists',
    sm: <Icon icon={XIcon} />,
    an: <Icon icon={XIcon} />,
    handle: 'reconditionnees',
  },
  {
    title: (
      <>
        Concept et <b>marque française</b>
      </>
    ),
    ss: <img src={France} alt="Forme de la france" />,
    sm: <Icon icon={XIcon} />,
    an: <Icon icon={XIcon} />,
    handle: 'conceptuel',
  },
];
