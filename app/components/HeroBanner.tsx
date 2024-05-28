import React from 'react';
import Timer from './timer';
import './styles/heroBanner.scss';
import type {MetaObjectFieldsFragment} from 'storefrontapi.generated';
import {Link} from 'react-router-dom';

interface HeroPageBannerProps {
  metaObject: MetaObjectFieldsFragment;
}

// Utilitaire pour obtenir la valeur d'un champ
const getFieldValue = (metaObject: MetaObjectFieldsFragment, key: string) => {
  return (
    metaObject.fields.find((field) => field.key === key)?.value || undefined
  );
};

function HeroPageBanner({metaObject}: HeroPageBannerProps) {
  //Title
  const title = getFieldValue(metaObject, 'title');
  //Date
  const dateField = metaObject.fields.find(
    (field) => field.key === 'countdown',
  );
  const targetDate = dateField?.value ? new Date(dateField.value) : null;

  //TextColor
  const textColor = getFieldValue(metaObject, 'couleur_texte');

  //Banner
  const background = metaObject.fields.find((field) => field.key === 'banner');
  if (background && background.type !== 'file_reference')
    throw new Error('Should never happen');
  const backgroundImg = background?.reference as
    | undefined
    | {
        image: {
          url: string;
          altText?: string;
        };
      };

  //Text Button
  const buttonText = getFieldValue(metaObject, 'titre_bouton');

  //Potential url button
  const buttonUrl = getFieldValue(metaObject, 'url');

  //Potential featured collection for button
  const collection = metaObject.fields.find(
    (field) => field.key === 'collection',
  );
  if (collection && collection.type !== 'collection_reference')
    throw new Error('Should never happen');
  const collectionFeatured = collection?.reference as
    | undefined
    | {
        id: string;
        handle?: string;
      };

  //Button Text Color
  const buttonTextColor = getFieldValue(metaObject, 'couleur_texte_bouton');

  //Button Background Color
  const buttonBgColor = getFieldValue(metaObject, 'couleur_background_bouton');

  //Subtitle
  const subtitle = getFieldValue(metaObject, 'soustitre');

  //Subtitle Color
  const subtitleColor = getFieldValue(metaObject, 'couleur_soustitre');

  return (
    <div className="hero-banner">
      <div
        className="hero-banner-img"
        style={{backgroundImage: `url(${backgroundImg?.image.url})`}}
      >
        <div className="hero-banner-content">
          <div className="hero-banner-text" style={{color: textColor}}>
            <div className="hero-banner-timer">
              {targetDate ? <Timer targetDate={targetDate} /> : null}
            </div>
            <h1 className="hero-banner-title">{title}</h1>
          </div>
          {collectionFeatured?.handle ? (
            <Link
              to={`/collections/${collectionFeatured?.handle}`}
              className="link-btn"
            >
              <button className="hero-banner-btn">{buttonText}</button>
            </Link>
          ) : null}

          {buttonUrl ? (
            <Link to={buttonUrl} target="_blank" className="link-btn">
              <button
                className="hero-banner-btn"
                style={{color: buttonTextColor, backgroundColor: buttonBgColor}}
              >
                {buttonText}
              </button>
            </Link>
          ) : null}

          <p className="hero-banner-sub" style={{color: subtitleColor}}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroPageBanner;
