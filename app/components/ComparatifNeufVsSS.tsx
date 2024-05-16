import {CashEuroIcon, CheckIcon, XIcon} from '@shopify/polaris-icons';
import Icon from './Icon';
import './styles/comparatifNeufVsSS.scss';
import Button from './Button';
import {Link} from '@remix-run/react';

export default function NeufVsSS() {
  return (
    <div className="neufVsSS">
      <div className="caption">
        <h3>
          Neuf <b>VS</b> seconde <span className="barred">main</span> step
        </h3>
        <sub>Choisir une paire reconditionnée plutôt que neuve ?</sub>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quae,
          sapiente ducimus repudiandae labore fuga alias eveniet eligendi
          aliquid repellendus illo autem omnis cum consequuntur ipsam excepturi
          neque amet beatae?
        </p>
        <Link to={'?'}>
          <Button type="primary" text="Shopper ma paire en seconde main" />
        </Link>
        <div className="trust">
          <Icon icon={CheckIcon} />
          <p>
            <b>Reconditionnées</b> et <b>certifiées</b> par nos experts
          </p>
        </div>
      </div>
      <Table />
    </div>
  );
}

function Table() {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th scope="col">[Image SecondStep]</th>
          <th scope="col">
            <b>Plateformes</b>
            seconde main
          </th>
          <th scope="col">
            <b>Marques</b>
            achat neuf
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <b>Ecologique,</b>
            bon pour la planète
          </th>
          <td>
            <Icon icon={CheckIcon} />
          </td>
          <td>
            <Icon icon={CheckIcon} />
          </td>
          <td>
            <Icon icon={XIcon} />
          </td>
        </tr>
        <tr>
          <th scope="row">
            <b>Economique,</b>
            bon pour tes finances
          </th>
          <td>
            <Icon icon={CashEuroIcon} />
            <Icon icon={CashEuroIcon} />
          </td>
          <td>
            <Icon icon={CashEuroIcon} />
          </td>
          <td>
            <Icon icon={CashEuroIcon} />
            <Icon icon={CashEuroIcon} />
            <Icon icon={CashEuroIcon} />
            <Icon icon={CashEuroIcon} />
          </td>
        </tr>
        <tr>
          <th scope="rows">
            <b>Rareté des paires</b>
            introuvables neuves
          </th>
          <td>
            <Icon icon={CheckIcon} />
          </td>
          <td>
            <Icon icon={XIcon} />
          </td>
          <td>
            <Icon icon={XIcon} />
          </td>
        </tr>
        <tr>
          <th scope="rows">
            Carte
            <b>authentification certifiée</b>
          </th>
          <td>[Image de la carte d&apos;authenticité]</td>
          <td>
            <Icon icon={XIcon} />
          </td>
          <td>
            <Icon icon={XIcon} />
          </td>
        </tr>
        <tr>
          <th scope="rows">
            <b>Reconditionnnement</b> à neuf
          </th>
          <td>Par nos experts sneakers artists</td>
          <td>
            <Icon icon={XIcon} />
          </td>
          <td>
            <Icon icon={XIcon} />
          </td>
        </tr>
        <tr>
          <th scope="rows">
            Concept et
            <b>marque française</b>
          </th>
          <td>[Image de la France]</td>
          <td>
            <Icon icon={XIcon} />
          </td>
          <td>
            <Icon icon={XIcon} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
