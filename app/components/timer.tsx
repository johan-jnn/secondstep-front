import React, {useState, useEffect} from 'react';

interface TimerProps {
  targetDate: Date;
}

export default function Timer({targetDate}: TimerProps) {
  // État local pour stocker le temps restant
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Fonction pour calculer le temps restant
  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    if (difference <= 0) {
      // Le compte à rebours est terminé
      return {days: 0, hours: 0, minutes: 0, seconds: 0};
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return {days, hours, minutes, seconds};
  }

  // Effet pour mettre à jour le temps restant toutes les secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []); // Les dépendances sont vides pour exécuter cet effet une seule fois au montage

  // Fonction pour formater le temps restant sous forme de chaîne "dd:hh:mm:ss"
  function formatTimeRemaining() {
    const {days, hours, minutes, seconds} = timeRemaining;
    return `${days.toString().padStart(2, '0')}:${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <div className="timer">
      <h1>{formatTimeRemaining()}</h1>
    </div>
  );
}
