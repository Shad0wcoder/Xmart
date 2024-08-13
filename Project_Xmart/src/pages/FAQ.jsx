import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAnswers = [
    {
      question: "What is Xmart?",
      answer: "Xmart is an online marketplace where you can find a wide range of products, from electronics to fashion, all in one place."
    },
    {
      question: "How do I place an order?",
      answer: "You can place an order by selecting the product you want, adding it to your cart, and proceeding to checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, net banking, and popular e-wallets."
    },
    {
      question: "How can I track my order?",
      answer: "After placing an order, you will receive a confirmation email with a tracking link. You can use that link to track your order."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most products. Please refer to our return policy page for more details."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact our customer support via the Contact Us page, email, or our customer service hotline."
    }
  ];

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-content">
        {questionsAnswers.map((qa, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="faq-question">
              <h3>{qa.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{qa.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
