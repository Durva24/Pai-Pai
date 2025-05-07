'use client';

import React from 'react';

interface QuoteProps {
  title: string;
  quoteData?: {
    text: string;
    author: string;
  };
}

const Quote: React.FC<QuoteProps> = ({ title, quoteData }) => {
  // Placeholder quotes about financial wisdom
  const quotes = [
    {
      text: "An investment in knowledge pays the best interest.",
      author: "Benjamin Franklin"
    },
    {
      text: "The stock market is a device for transferring money from the impatient to the patient.",
      author: "Warren Buffett"
    },
    {
      text: "Don't save what is left after spending, spend what is left after saving.",
      author: "Warren Buffett"
    },
    {
      text: "It's not how much money you make, but how much money you keep.",
      author: "Robert Kiyosaki"
    },
    {
      text: "The goal isn't more money. The goal is living life on your terms.",
      author: "Chris Brogan"
    }
  ];
  
  // Use provided quote or select a random one
  const data = quoteData || quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="relative">
        <div className="absolute -top-6 -left-4 text-4xl text-gray-200 font-serif">"</div>
        <p className="text-lg italic text-gray-800 mb-2 relative z-10">{data.text}</p>
        <div className="absolute -bottom-6 -right-4 text-4xl text-gray-200 font-serif rotate-180">"</div>
        <p className="text-sm text-right mt-2 text-gray-600">— {data.author}</p>
      </div>
    </div>
  );
};

export default Quote;