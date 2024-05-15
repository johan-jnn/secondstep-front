import React from 'react';
import Timer from './timer';
import './styles/heroBanner.scss';

function HeroPageBanner() {
  // Définir la date et l'heure cible dans le futur
  const targetDate = new Date('2024-06-31T23:59:59');

  return (
    <div className="hero-banner">
      <div
        className="hero-banner-img"
        style={{backgroundImage: `url('/app/assets/hp-banner.png')`}}
      >
        <div className="hero-banner-text">
          <Timer targetDate={targetDate} />
          <h1 className="hero-banner-title">C&apos;est la lucky week</h1>
          <button className="hero-banner-btn">
            SHOPPER MA PAIRE MAINTENANT
          </button>
          <p className="hero-banner-sub">
            Reconditionnées et certifiées par nos experts
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroPageBanner;
