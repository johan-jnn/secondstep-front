import React from 'react';
import Timer from './timer';
import './styles/homepageBanner.scss';

function HomePageBanner() {
  // Définir la date et l'heure cible dans le futur
  const targetDate = new Date('2024-06-31T23:59:59');

  return (
    <div className="homepage-banner">
      <div
        className="homepage-banner-img"
        style={{backgroundImage: `url('/app/assets/hp-banner.png')`}}
      >
        <div className="homepage-banner-text">
          <Timer targetDate={targetDate} />
          <h1 className="homepage-banner-title">C&apos;est la lucky week</h1>
          <button className="homepage-banner-btn">
            SHOPPER MA PAIRE MAINTENANT
          </button>
          <p className="homepage-banner-sub">
            Reconditionnées et certifiées par nos experts
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePageBanner;
