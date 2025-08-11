import React, { useState } from 'react';

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
    <div className='flex flex-col justify-center items-center h-[50vh]'>
    <div className="flex flex-col justify-center items-center bg-[#252525] p-5 w-full md:min-w-[500px] max-w-[350px] mx-auto">
      <h1 className='text-[#eeeeee] text-xl font-sans font-bold'>Frequently Asked Questions</h1>
      <div className="mt-5 text-white w-full">
        {questionsAnswers.map((qa, index) => (
          <div
            key={index}
            className={`border-[1px] shadow-md m-1 border-[#202520] ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="flex justify-between items-center p-3">
              <h3>{qa.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="text-white border-t-2">
                <p>{qa.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQ;
