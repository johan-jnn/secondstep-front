import React from 'react';
import VideoCard from './VideoCard';
import './styles/VideoCards.scss';

class VideoCards extends React.Component {
  render() {
    return (
      <div className="video-cards">
        <VideoCard
          backgroundcolor="var(--color-light)"
          textColor="var(--color-dark)"
          num="01"
          text="Chez SecondStep, l'autheticité des produits constitue un pilier fondamental de notre philosophie d'entreprise. Nous comprenons à quel point il est essentiel pour nos clients de se sentir en confiance lors de leurs achats."
          title="Recherche & Dénichage"
          subtext="C'est pourquoi nous avons instauré un processus de vérification rigoureux pour chaque article proposé sur notre site..."
          boldKeywords={[
            'SecondStep',
            'confiance',
            'processus de vérification rigoureux',
          ]}
        />
        <VideoCard
          backgroundcolor="var(--color-dark)"
          textColor="var(--color-light)"
          num="02"
          text="Chez SecondStep, l'autheticité des produits constitue un pilier fondamental de notre philosophie d'entreprise. Nous comprenons à quel point il est essentiel pour nos clients de se sentir en confiance lors de leurs achats."
          title="Authentification"
          subtext="C'est pourquoi nous avons instauré un processus de vérification rigoureux pour chaque article proposé sur notre site..."
          boldKeywords={[
            'SecondStep',
            'confiance',
            'processus de vérification rigoureux',
          ]}
        />
        <VideoCard
          backgroundcolor="var(--color-light)"
          textColor="var(--color-dark)"
          num="03"
          text="Chez SecondStep, l'autheticité des produits constitue un pilier fondamental de notre philosophie d'entreprise. Nous comprenons à quel point il est essentiel pour nos clients de se sentir en confiance lors de leurs achats."
          title="Reconditionnement"
          subtext="C'est pourquoi nous avons instauré un processus de vérification rigoureux pour chaque article proposé sur notre site..."
          boldKeywords={[
            'SecondStep',
            'confiance',
            'processus de vérification rigoureux',
          ]}
        />
      </div>
    );
  }
}

export default VideoCards;
