import {useState, useEffect} from 'react';
import {calculateDate} from '~/lib/time';

interface TimerProps {
  targetDate: Date;
}

export default function Timer({targetDate}: TimerProps) {
  // État local pour stocker le temps restant
  const [timeRemaining, setTimeRemaining] = useState(
    Date.now() - targetDate.getTime(),
  );

  // Effet pour mettre à jour le temps restant toutes les secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(targetDate.getTime() - Date.now());
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [targetDate]); // Les dépendances sont vides pour exécuter cet effet une seule fois au montage

  // Fonction pour formater le temps restant sous forme de chaîne "dd:hh:mm:ss"
  function formatTimeRemaining() {
    const {days, hours, minutes, seconds} = calculateDate(timeRemaining);
    return `${days.toString().padStart(2, '0')}:${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <div className="timer">
      <h1>{timeRemaining && formatTimeRemaining()}</h1>
    </div>
  );
}
