'use client';

import React from 'react';

interface EmergencyFundProps {
  title: string;
  fundData?: {
    currentAmount: number;
    targetAmount: number;
    percentComplete: number;
    monthlyContribution: number;
    timeToComplete: number;
    childrenEducationFund: {
      currentAmount: number;
      targetAmount: number;
      percentComplete: number;
    };
    retirementFund: {
      currentAmount: number;
      targetAmount: number;
      percentComplete: number;
    };
    dreamFunds: {
      name: string;
      currentAmount: number;
      targetAmount: number;
      percentComplete: number;
    }[];
  };
}

const EmergencyFund: React.FC<EmergencyFundProps> = ({ title, fundData }) => {
  // Placeholder data if none provided
  const data = fundData || {
    currentAmount: 100000,
    targetAmount: 234000,
    percentComplete: 43,
    monthlyContribution: 6000,
    timeToComplete: 22,
    childrenEducationFund: {
      currentAmount: 150000,
      targetAmount: 500000,
      percentComplete: 30
    },
    retirementFund: {
      currentAmount: 700000,
      targetAmount: 3000000,
      percentComplete: 23
    },
    dreamFunds: [
      {
        name: "International Vacation",
        currentAmount: 50000,
        targetAmount: 200000,
        percentComplete: 25
      },
      {
        name: "New Car",
        currentAmount: 100000,
        targetAmount: 600000,
        percentComplete: 17
      }
    ]
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-black">Emergency Fund</span>
          <span className="text-sm font-bold text-black">
            ₹{data.currentAmount.toLocaleString('en-IN')} / ₹{data.targetAmount.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div 
            className="bg-black h-2 rounded-full" 
            style={{ width: `${data.percentComplete}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Monthly: ₹{data.monthlyContribution.toLocaleString('en-IN')}</span>
          <span>{data.timeToComplete} months to target</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-black">Children's Education</span>
          <span className="text-sm font-bold text-black">
            ₹{data.childrenEducationFund.currentAmount.toLocaleString('en-IN')} / 
            ₹{data.childrenEducationFund.targetAmount.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-black h-2 rounded-full" 
            style={{ width: `${data.childrenEducationFund.percentComplete}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-black">Retirement</span>
          <span className="text-sm font-bold text-black">
            ₹{data.retirementFund.currentAmount.toLocaleString('en-IN')} / 
            ₹{data.retirementFund.targetAmount.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-black h-2 rounded-full" 
            style={{ width: `${data.retirementFund.percentComplete}%` }}
          ></div>
        </div>
      </div>
      
      {data.dreamFunds.map((fund, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-black">{fund.name}</span>
            <span className="text-sm font-bold text-black">
              ₹{fund.currentAmount.toLocaleString('en-IN')} / 
              ₹{fund.targetAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-black h-2 rounded-full" 
              style={{ width: `${fund.percentComplete}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyFund;