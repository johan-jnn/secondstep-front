import FilDarianne from '~/components/FilDarianne';
import '~/styles/pages.scss';
import Button from '~/components/Button';

export default function ContactPage() {
  return (
    <div className="contact-component">
      <FilDarianne />
      <div className="contact-card">
        <h2>Nous Contacter par mail</h2>
        <p>
          N’hésitez pas à remplir notre formulaire de contact avec tous les
          détails de votre demande.
          <br />
          <br />
          Promis, on vous répondra dans les 24 à 48 heures ouvrables.
        </p>
        <a href="mailto:contact@second-step.fr" className="link-bottom">
          <Button text="contact@second-step.fr" />
        </a>
      </div>
      <div className="contact-card">
        <h2>Discuter sur Whatsapp</h2>
        <p>
          Discutez directement avec notre équipe via le chat ou sur WhatsApp
          au&nbsp;
          <span>+33 7 85 83 85 28.</span>
          <br />
          <br />
          Nous sommes disponibles du lundi au vendredi, de 09h00 à 19h00 GMT+1.
        </p>
        <a href="whatsapp://send?phone=0785838528" className="link-bottom">
          <Button text="07 85 83 85 28" />
        </a>
      </div>
      <div className="contact-card">
        <h2>Slider dans nos DM</h2>
        <p>
          Contactez-nous en DM Instagram sur @seconstep.fr !
          <br />
          <br />
          Nous sommes disponibles du lundi au vendredi, de 09h00 à 19h00 GMT+1.
        </p>
        <a
          href="https://www.instagram.com/secondstep.fr/"
          className="link-bottom"
        >
          <Button text="@secondstep.fr" />
        </a>
      </div>
    </div>
  );
}
