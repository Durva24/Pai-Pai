'use client';

import React from 'react';

interface DebtItem {
  name: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyPayment: number;
  timeToPayoff: number;
  percentPaid: number;
}

interface DebtTrackerProps {
  title: string;
  debtData?: {
    totalDebt: number;
    totalMonthlyPayment: number;
    averageInterestRate: number;
    debtFreeDate: string;
    debtItems: DebtItem[];
  };
}

const DebtTracker: React.FC<DebtTrackerProps> = ({ title, debtData }) => {
  // Placeholder data if none provided
  const data = debtData || {
    totalDebt: 850000,
    totalMonthlyPayment: 23500,
    averageInterestRate: 12.5,
    debtFreeDate: 'June 2028',
    debtItems: [
      {
        name: 'Home Loan',
        totalAmount: 700000,
        remainingAmount: 550000,
        interestRate: 10.5,
        monthlyPayment: 15000,
        timeToPayoff: 42,
        percentPaid: 21
      },
      {
        name: 'Car Loan',
        totalAmount: 250000,
        remainingAmount: 170000,
        interestRate: 12.0,
        monthlyPayment: 5500,
        timeToPayoff: 36,
        percentPaid: 32
      },
      {
        name: 'Personal Loan',
        totalAmount: 150000,
        remainingAmount: 130000,
        interestRate: 18.0,
        monthlyPayment: 3000,
        timeToPayoff: 52,
        percentPaid: 13
      }
    ]
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600">Total Debt</p>
          <p className="text-lg font-bold text-black">₹{data.totalDebt.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600">Monthly Payment</p>
          <p className="text-lg font-bold text-black">₹{data.totalMonthlyPayment.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600">Avg. Interest Rate</p>
          <p className="text-lg font-bold text-black">{data.averageInterestRate}%</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600">Debt Free Date</p>
          <p className="text-lg font-bold text-black">{data.debtFreeDate}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.debtItems.map((debt, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-black">{debt.name}</h4>
              <div className="text-right">
                <p className="text-sm font-bold text-black">₹{debt.remainingAmount.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-600">of ₹{debt.totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div 
                className="bg-black h-2 rounded-full" 
                style={{ width: `${debt.percentPaid}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div>
                <p className="text-xs text-gray-600">Interest</p>
                <p className="text-sm font-medium text-black">{debt.interestRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Monthly</p>
                <p className="text-sm font-medium text-black">₹{debt.monthlyPayment.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Months Left</p>
                <p className="text-sm font-medium text-black">{debt.timeToPayoff}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebtTracker;