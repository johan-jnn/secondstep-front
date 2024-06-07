import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './styles/faq.scss';
import Icon from './Icon';
import data from '../lib/constants/faqHomePage.json';
import {
  PlusIcon,
  LogoInstagramIcon,
  EmailIcon,
  ChatIcon,
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
        <Icon icon={link ? ExternalIcon : CaretDownIcon} />
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
          <p>La team est là pour vous aider !</p>
        </div>
        <a href="mailto:contact@second-step.fr" className="faq-socials-min">
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color)'}}
          />
          <p>Mail : contact@second-step.fr</p>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color)'}}
          />
        </a>
        <a href="whatsapp://send?phone=0785838528" className="faq-socials-min">
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color)'}}
          />
          <p>Chat WhatsApp : 07 85 83 85 28</p>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color)'}}
          />
        </a>
        <a
          href="https://www.instagram.com/secondstep.fr/"
          className="faq-socials-min"
        >
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color)'}}
          />
          <p>Instagram : @secondstep.fr</p>
          <Icon
            icon={ChevronRightIcon}
            customStyling={{fill: 'var(--color)'}}
          />
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
