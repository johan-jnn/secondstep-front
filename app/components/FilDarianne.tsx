import {Link, useLocation} from 'react-router-dom';
import './styles/fildarianne.scss';
export default function FilDarianne() {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (
      <div className="fildarianne">
        <Link to="/">Accueil</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <span key={to}>
              {' > '}
              {isLast ? <span>{value}</span> : <Link to={to}>{value}</Link>}
            </span>
          );
        })}
      </div>
    );
  };

  return <nav aria-label="breadcrumb">{generateBreadcrumbs()}</nav>;
}
