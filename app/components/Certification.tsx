import './styles/certification.scss';

export default function Certification() {
  return (
    <ul className="certifications">
      <CertificationItem
        title="Carte d'authenticité certifiée"
        description="Nous certifions l'authencité de cet article soumis aux contrôles les plus rigoureux"
        link="?"
      />
      <CertificationItem
        title="Reconditionnées par nos artistes"
        description="Nous collaborons avec des experts sneakers artists qui ont fait de cet passion leur métier"
        link="?"
      />
      <CertificationItem
        title="Sourcées par nos experts"
        description="Un réseaux de revendeur soigneusement sélectionné pour leur experience et leur expertise"
        link="?"
      />
    </ul>
  );
}

interface ItemProps {
  title: string;
  description: string;
  link?: string;
}
function CertificationItem(props: ItemProps) {
  return (
    <li>
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
        <h3>{props.title}</h3>
      </div>
      <p>
        {props.description}
        {props.link && (
          <>
            ... <a href={props.link}>En savoir plus</a>
          </>
        )}
      </p>
    </li>
  );
}
