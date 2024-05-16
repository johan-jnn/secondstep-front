import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './styles/faq.scss';
import Icon from './Icon';

export interface FAQProps {
  answers: {
    question: string;
    answer: string;
    link?: string;
  }[];
}

function FAQItem({question, answer, link}: FAQProps['answers'][number]) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(!isOpen);
    e.preventDefault();
  };

  return (
    <div className="faq-item">
      <div className="question">
        <p>{question}</p>
        <Link to="" className="faq-link" onClick={toggleAnswer}>
          <img src="app/assets/icons-plus.svg" alt="plus btn" />
        </Link>
      </div>
      {isOpen && <div className="answer">{answer}</div>}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="faq">
      <div className="faq-socials">
        <div className="faq-socials-top">
          <p className="title">Une question?</p>
          <p>La team est là pour vous aider !</p>
          <img src=" " alt=" " />
        </div>
        <div className="faq-socials-min">
          <img src=" " alt=" " />
          <p>Mail : contact@second-step.fr</p>
          <img src=" " alt=" " />
        </div>
        <div className="faq-socials-min">
          <img src=" " alt=" " />
          <p>Chat WhatsApp : 07 85 83 85 28</p>
          <img src=" " alt=" " />
        </div>
        <div className="faq-socials-min">
          <img src=" " alt=" " />
          <p>Instagram : @secondstep.fr</p>
          <img src=" " alt=" " />
        </div>
      </div>
      <div className="faq-questions">
        <h1>Question Fréquentes</h1>
        <FAQItem
          question="Qu'est-ce que React?"
          answer="React est une bibliothèque JavaScript pour construire des interfaces utilisateur." // Réponse en tant que chaîne de caractères normale
        />
        <FAQItem
          question="Quelle est la différence entre React et Angular?"
          answer="React est une bibliothèque JavaScript pour la construction d'interfaces utilisateur, tandis qu'Angular est un framework JavaScript complet." // Réponse en tant que chaîne de caractères normale
        />
        <FAQItem
          question="Quelle est la différence entre React et Angular?"
          answer="React est une bibliothèque JavaScript pour la construction d'interfaces utilisateur, tandis qu'Angular est un framework JavaScript complet." // Réponse en tant que chaîne de caractères normale
        />
        <FAQItem
          question="Quelle est la différence entre React et Angular?"
          answer="React est une bibliothèque JavaScript pour la construction d'interfaces utilisateur, tandis qu'Angular est un framework JavaScript complet." // Réponse en tant que chaîne de caractères normale
        />
        <FAQItem
          question="Quelle est la différence entre React et Angular?"
          answer="React est une bibliothèque JavaScript pour la construction d'interfaces utilisateur, tandis qu'Angular est un framework JavaScript complet." // Réponse en tant que chaîne de caractères normale
        />
      </div>
    </div>
  );
}
