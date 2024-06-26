import './styles/certification.scss';

export default function Certification() {
  return (
    <ul className="certificationsList">
      <li>
        <CertificationItem
          title="Carte d'authenticité certifiée"
          description="Nous certifions l'authencité de cet article soumis aux contrôles les plus rigoureux"
        />
      </li>
      <li>
        <CertificationItem
          title="Reconditionnées par nos artistes"
          description="Nous collaborons avec des experts sneakers artists qui ont fait de cet passion leur métier"
        />
      </li>
      <li>
        <CertificationItem
          title="Sourcées par nos experts"
          description="Un réseaux de revendeur soigneusement sélectionné pour leur experience et leur expertise"
        />
      </li>
    </ul>
  );
}

export function CarteAuthenticite() {
  return (
    <CertificationItem
      title="Carte d'authenticité certifiée"
      description="Nous certifions l'authencité de cet article soumis aux contrôles les plus rigoureux"
    />
  );
}
export function Reconditionnement() {
  return (
    <CertificationItem
      title="Reconditionnées par nos artistes"
      description="Nous collaborons avec des experts sneakers artists qui ont fait de cet passion leur métier"
    />
  );
}
export function SourceesParNosExperts() {
  return (
    <CertificationItem
      title="Sourcées par nos experts"
      description="Un réseaux de revendeur soigneusement sélectionné pour leur experience et leur expertise"
    />
  );
}

interface ItemProps {
  title: string;
  description: string;
  link?: string;
}
function CertificationItem(props: ItemProps) {
  return (
    <div className="certificationItem">
      <div className="topline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
            fill="var(--color-primary)"
          />
        </svg>
      </div>
      <div className="text">
        <h3>{props.title}</h3>
        <p>
          {props.description}
          {props.link && (
            <>
              ... <a href={props.link || '?'}>En savoir plus</a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
