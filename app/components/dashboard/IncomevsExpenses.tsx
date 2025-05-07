'use client';

import React from 'react';

interface IncomeVsExpensesProps {
  title: string;
  incomeExpenseData?: {
    income: number;
    expenses: number;
    savings: number;
    savingsRate: number;
    monthlyData: {
      month: string;
      income: number;
      expenses: number;
    }[];
  };
}

const IncomeVsExpenses: React.FC<IncomeVsExpensesProps> = ({ title, incomeExpenseData }) => {
  // Placeholder data if none provided
  const data = incomeExpenseData || {
    income: 60000,
    expenses: 39000,
    savings: 21000,
    savingsRate: 35,
    monthlyData: [
      { month: 'Jan', income: 60000, expenses: 39000 },
      { month: 'Feb', income: 60000, expenses: 40000 },
      { month: 'Mar', income: 62000, expenses: 38000 },
      { month: 'Apr', income: 62000, expenses: 37000 },
      { month: 'May', income: 63000, expenses: 39000 },
      { month: 'Jun', income: 63000, expenses: 41000 }
    ]
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="flex justify-between mb-6">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Monthly Income</span>
          <span className="text-lg font-bold text-black">₹{data.income.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Monthly Expenses</span>
          <span className="text-lg font-bold text-black">₹{data.expenses.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Monthly Savings</span>
          <span className="text-lg font-bold text-black">₹{data.savings.toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      {/* Placeholder for chart */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 h-64 mb-4 flex items-center justify-center">
        <span className="text-gray-400">Income vs Expenses Chart Placeholder</span>
      </div>
      
      <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
        <div 
          className="bg-black h-2 rounded-full" 
          style={{ width: `${data.savingsRate}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-600">Savings Rate</span>
        <span className="text-xs font-medium text-black">{data.savingsRate}%</span>
      </div>
    </div>
  );
};

export default IncomeVsExpenses;