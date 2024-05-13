import React from 'react';
import './styles/homePageEngagements.scss';
import Icon from './Icon';
import {CheckIcon} from '@shopify/polaris-icons';

function HomePageEngagements() {
  return (
    <div className="homepage-banner-informations">
      <div className="homepage-banner-engagements">
        <h1>Nos Engagements</h1>
        <a href=" ">Découvrez le concept</a>
      </div>
      <div className="homepage-banner-rate">
        <h2>Nous sommes notés 4.5/5 sur</h2>
        <img src="app/assets/Trustpilot.png" alt="google rating" />
      </div>
      <div className="homepage-banner-cardtext">
        <div className="homepage-banner-cardtext-head">
          <Icon
            icon={CheckIcon}
            classes={'homepage-banner-cardtext-head-icon'}
          />
          <h2>Carte d'authenticité certifiée</h2>
        </div>
        <p>
          Nous certifions l'authenticité de nos artccles soumis aux contrôles
          les plus rigoureux et sérieux.
        </p>
      </div>
      <div className="homepage-banner-cardtext">
        <div className="homepage-banner-cardtext-head">
          <Icon
            icon={CheckIcon}
            classes={'homepage-banner-cardtext-head-icon'}
          />
          <h2>Carte d'authenticité certifiée</h2>
        </div>
        <p>
          Nous collaborons avec des experts sneakers artists qui ont fait de
          cette passion un métier.
        </p>
      </div>
    </div>
  );
}

export default HomePageEngagements;
