// components/dashboard/EmergencyFund.tsx
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

const EmergencyFund: React.FC<EmergencyFundProps> = ({ title, userData }) => {
  // Destructure with validation
  const income = Number(userData?.income) || 0;
  const savings = Number(userData?.savings) || 0;
  const timeHorizon = Number(userData?.timeHorizon) || 0;

  // Configuration constants
  const INVESTMENT_RATE = 0.05;         // 5% of savings invested
  const ANNUAL_RETURN = 0.05;          // 5% investment return
  const SAVINGS_INCREASE = 0.055;      // 5.5% annual savings increase
  const SAFE_RETURN = 0.06;            // 6% after reaching target
  const TARGET_MULTIPLIER = 6;         // 6x salary target

  // Calculate initial values
  const monthlyContribution = savings * INVESTMENT_RATE;
  const targetAmount = income * TARGET_MULTIPLIER;

  const calculateProjection = () => {
    // Early return if any critical value is missing or zero
    if (!income || !savings || !timeHorizon) {
      return {
        futureValue: 0,
        yearsToTarget: 0,
        monthsToTarget: 0,
        isValid: false
      };
    }

    // Phase 1: Accumulation until target reached
    let balance = 0;
    let currentContribution = monthlyContribution;
    let monthsToTarget = 0;
    let accumulating = true;

    while (accumulating && monthsToTarget < timeHorizon * 12) {
      // Add monthly contribution
      balance += currentContribution;
      
      // Apply investment return
      balance *= (1 + ANNUAL_RETURN/12);
      
      // Check if target reached
      if (balance >= targetAmount) {
        accumulating = false;
        break;
      }
      
      // Increase contribution annually
      if ((monthsToTarget + 1) % 12 === 0) {
        currentContribution *= (1 + SAVINGS_INCREASE);
      }
      
      monthsToTarget++;
    }

    // Phase 2: Safe growth after target reached
    let remainingMonths = timeHorizon * 12 - monthsToTarget;
    while (remainingMonths > 0) {
      balance *= (1 + SAFE_RETURN/12);
      remainingMonths--;
    }

    return {
      futureValue: Math.round(balance),
      yearsToTarget: Math.floor(monthsToTarget / 12),
      monthsToTarget: monthsToTarget % 12,
      isValid: true
    };
  };

  const projection = calculateProjection();

  if (!projection.isValid) {
    return (
      <div className="w-full font-mono text-black">
        <h2 className="text-lg font-medium mb-3">{title}</h2>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            {!income ? "Income data missing" : 
             !savings ? "Savings data missing" : 
             "Time horizon not specified"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-mono text-black">
      <h2 className="text-lg font-medium mb-3">{title}</h2>
      
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span>Monthly contribution (5% of savings):</span>
            <span className="font-bold">
              ₹{monthlyContribution.toLocaleString('en-IN', {maximumFractionDigits: 0})}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Value after {timeHorizon} {timeHorizon !== 1 ? 'years' : 'year'}:</span>
            <span className="font-bold">
              ₹{projection.futureValue.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Time to reach {TARGET_MULTIPLIER}× salary (₹{targetAmount.toLocaleString('en-IN')}):</span>
            <span className="font-bold">
              {projection.yearsToTarget > 0 && `${projection.yearsToTarget} years `}
              {projection.monthsToTarget > 0 && `${projection.monthsToTarget} months`}
              {projection.yearsToTarget === 0 && projection.monthsToTarget === 0 && 'Already reached'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFund;