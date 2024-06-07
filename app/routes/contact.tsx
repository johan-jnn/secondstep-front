import Icon from '~/components/Icon';
import {
  PlusIcon,
  LogoInstagramIcon,
  EmailIcon,
  ChatIcon,
  ChevronRightIcon,
  PersonFilledIcon,
} from '@shopify/polaris-icons';
import '~/styles/pages.scss';

export default function ContactPage() {
  return (
    <div className="contact-component">
      <div className="contact-card">
        <a href="mailto:contact@second-step.fr" className="top">
          <Icon
            icon={EmailIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
          <h2>Nous Contacter par mail</h2>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
        </a>
        <p>
          N’hésitez pas à remplir notre formulaire de contact avec tous les
          détails de votre demande.
          <br />
          <br />
          Promis, on vous répondra dans les 24 à 48 heures ouvrables. 😊
        </p>
      </div>
      <div className="contact-card">
        <a href="whatsapp://send?phone=0785838528" className="top">
          <Icon
            icon={ChatIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
          <h2>Discuter sur Whatsapp</h2>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
        </a>
        <p>
          Discutez directement avec notre équipe via le chat ou sur WhatsApp au
          +33 7 85 83 85 28.
          <br />
          <br />
          Nous sommes disponibles du lundi au vendredi, de 09h00 à 19h00 GMT+1.
        </p>
      </div>
      <div className="contact-card">
        <a href="https://www.instagram.com/secondstep.fr/" className="top">
          <Icon
            icon={LogoInstagramIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
          <h2>Slider dans nos DM</h2>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color-primary)'}}
          />
        </a>
        <p>
          Contactez-nous en DM Instagram sur @seconstep.fr !
          <br />
          <br />
          Nous sommes disponibles du lundi au vendredi, de 09h00 à 19h00 GMT+1.
        </p>
      </div>
    </div>
  );
}
