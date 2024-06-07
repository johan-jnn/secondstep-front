import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './styles/faq.scss';
import Icon from './Icon';
import data from '../lib/constants/faqHomePage.json';
import faqImg1 from '~/assets/faq/faqImg1.webp';
import faqImg2 from '~/assets/faq/faqImg2.webp';
import faqImg3 from '~/assets/faq/faqImg3.webp';
import {
  PlusIcon,
  LogoInstagramIcon,
  EmailIcon,
  ChatIcon,
  PhoneIcon,
  ChevronRightIcon,
  PersonFilledIcon,
  CaretDownIcon,
  ExternalIcon,
} from '@shopify/polaris-icons';

interface FAQItemProps {
  question: string;
  answer: string[];
  link?: string;
}

function FAQItem({question, answer, link}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(!isOpen);
    e.preventDefault();
  };

  return (
    <div className="faq-item">
      <Link to={link || ''} className="question" onClick={toggleAnswer}>
        <p>{question}</p>
        <Icon icon={link ? ExternalIcon : ChevronRightIcon} />
      </Link>
      {isOpen && (
        <div className="answer">
          {answer.map((paragraph, index) => (
            <React.Fragment key={paragraph}>
              <p>{paragraph}</p>
              {/* Ajout de <br /> si ce n'est pas le dernier paragraphe */}
              {index !== answer.length - 1 && <br />}{' '}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const faqList: FAQItemProps[] = data;

  return (
    <div className="faq">
      <div className="faq-socials">
        <div className="faq-socials-top">
          <p className="title">Une question?</p>
          <p className="sub">Notre équipe est à votré écoute !</p>
        </div>
        <div className="faq-images">
          <img src={faqImg1} alt="faqImg1" />
          <img src={faqImg2} alt="faqImg2" />
          <img src={faqImg3} alt="faqImg3" />
        </div>
        <a href="whatsapp://send?phone=0785838528" className="faq-socials-min">
          <Icon icon={PhoneIcon} customStyling={{fill: 'var(--color-light)'}} />
          <p>07 85 83 85 28</p>
        </a>
        <a href="mailto:contact@second-step.fr" className="faq-socials-min">
          <Icon icon={EmailIcon} customStyling={{fill: 'var(--color-light)'}} />
          <p>contact@second-step.fr</p>
        </a>
      </div>
      <div className="faq-questions">
        <h1>Question Fréquentes</h1>
        {faqList.map((faq) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            link={faq.link}
          />
        ))}
      </div>
    </div>
  );
}
