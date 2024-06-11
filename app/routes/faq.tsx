import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '~/styles/pages.scss';
import Icon from '~/components/Icon';
import {ChevronRightIcon, ExternalIcon} from '@shopify/polaris-icons';

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

export default function PageFaq() {
  return (
    <div className="faq-page">
      <h2>test</h2>
      <FAQItem question="test" answer={['test']} />
    </div>
  );
}
