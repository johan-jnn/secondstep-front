import {CashEuroIcon, CheckIcon, XIcon} from '@shopify/polaris-icons';
import Icon from './Icon';
import './styles/comparatifNeufVsSS.scss';
import Button from './Button';
import {Link} from '@remix-run/react';
import {comparativeRows} from '~/lib/constants/comparativeTableRows';
import {Image} from '@shopify/hydrogen';
import Logo from './Logo';

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
          <th scope="col">
            <div className="logoWrapper">
              <Logo color="var(--color-primary)" background="transparent" />
            </div>
          </th>
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
        {comparativeRows.map(({title, an, sm, ss}) => (
          <tr key={title.toString()}>
            <th scope="row">{title}</th>
            {[ss, sm, an].map((content) => (
              <td key={content.toString()}>
                <div className="contentWrapper">{content}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
