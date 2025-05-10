'use client';
import React from 'react';

interface EmergencyFundProps {
  title: string;
  userData: {
    income: number;
    savings: number;
    timeHorizon: number;
    [key: string]: any;
  };
}

const EmergencyFund: React.FC<EmergencyFundProps> = ({ 
  title, 
  userData 
}) => {
  // Basic validation - ensure no negative values
  const income = Math.max(0, Number(userData?.income) || 0);
  const savings = Math.max(0, Number(userData?.savings) || 0);
  const timeHorizon = Math.max(0, Number(userData?.timeHorizon) || 0);

  // Constants
  const INVEST_RATE = 0.05;    // 5% of savings
  const ANNUAL_RETURN = 0.05;  // 5% return
  const SAVINGS_BUMP = 0.055;  // 5.5% yearly increase
  const SAFE_RETURN = 0.06;    // 6% after target
  const TARGET_MULT = 6;       // 6x salary target

  const monthlyContrib = Math.max(0, savings * INVEST_RATE);
  const targetAmount = Math.max(0, income * TARGET_MULT);

  const calculateProjection = () => {
    if (!income || !savings || !timeHorizon) {
      return {
        futureValue: 0,
        yearsToTarget: 0,
        monthsToTarget: 0,
        isValid: false
      };
    }

    let balance = 0;
    let currentContrib = monthlyContrib;
    let monthsToTarget = 0;
    let accumulating = true;

    while (accumulating && monthsToTarget < timeHorizon * 12) {
      balance += currentContrib;
      balance *= (1 + ANNUAL_RETURN/12);
      
      if (balance >= targetAmount) {
        accumulating = false;
        break;
      }
      
      if ((monthsToTarget + 1) % 12 === 0) {
        currentContrib *= (1 + SAVINGS_BUMP);
      }
      
      monthsToTarget++;
    }

    let remainingMonths = timeHorizon * 12 - monthsToTarget;
    while (remainingMonths > 0) {
      balance *= (1 + SAFE_RETURN/12);
      remainingMonths--;
    }

    return {
      futureValue: Math.max(0, Math.round(balance)),
      yearsToTarget: Math.floor(monthsToTarget / 12),
      monthsToTarget: monthsToTarget % 12,
      isValid: true
    };
  };

  const projection = calculateProjection();

  if (!projection.isValid) {
    return (
      <div className="w-full md:w-auto font-mono text-black">
        <h3 className="text-base font-bold mb-3">{title}</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            {!income ? "Income missing" : 
             !savings ? "Savings missing" : 
             "Time horizon missing"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-auto font-mono text-black">
      <h3 className="text-base font-bold mb-3">{title}</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span>Monthly:</span>
            <span className="font-bold">
              ₹{monthlyContrib.toLocaleString('en-IN', {
                maximumFractionDigits: 0
              })}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Fund:</span>
            <span className="font-bold">
              ₹{projection.futureValue.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Time to:</span>
            <span className="font-bold">
              {projection.yearsToTarget > 0 && 
                `${projection.yearsToTarget}y `}
              {projection.monthsToTarget > 0 && 
                `${projection.monthsToTarget}m`}
              {projection.yearsToTarget === 0 && 
                projection.monthsToTarget === 0 && 'Done'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFund;