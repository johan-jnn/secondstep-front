import {Link} from '@remix-run/react';
import VidButtonImg from '~/assets/icons/video-card.png';
import './styles/VideoButton.scss';

export interface VideoButtonProps {
  url: string;
}
export default function VideoButton({url}: VideoButtonProps) {
  return (
    <Link to={url} className="videoButton">
      <img src={VidButtonImg} alt="Bouton pour lire la vidéo" />
    </Link>
  );
}
