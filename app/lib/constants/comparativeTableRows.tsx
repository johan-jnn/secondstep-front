import {CashEuroIcon, CheckIcon, XIcon} from '@shopify/polaris-icons';
import Icon from '~/components/Icon';

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
  },
  {
    title: (
      <>
        <b>Economique,</b> bon pour tes finances
      </>
    ),
    ss: (
      <>
        <Icon icon={CashEuroIcon} />
        <Icon icon={CashEuroIcon} />
      </>
    ),
    sm: <Icon icon={CashEuroIcon} />,
    an: (
      <>
        <Icon icon={CashEuroIcon} />
        <Icon icon={CashEuroIcon} />
        <Icon icon={CashEuroIcon} />
        <Icon icon={CashEuroIcon} />
      </>
    ),
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
  },
  {
    title: (
      <>
        Carte <b>authentification certifiée</b>
      </>
    ),
    ss: '<IMAGE CARTE AUTHENTICITE>',
    sm: <Icon icon={XIcon} />,
    an: <Icon icon={XIcon} />,
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
  },
  {
    title: (
      <>
        Concept et <b>marque française</b>
      </>
    ),
    ss: '<IMAGE FRANCE>',
    sm: <Icon icon={XIcon} />,
    an: <Icon icon={XIcon} />,
  },
];
