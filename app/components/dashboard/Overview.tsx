'use client';

import { Card } from '@/app/components/ui/card';

interface OverviewProps {
  title: string;
  overviewData?: {
    netWorth: number;
    savingsRate: number;
    investmentRate: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlySavings: number;
  };
}

const Overview: React.FC<OverviewProps> = ({ title, overviewData }) => {
  // Use placeholder data if none provided
  const data = overviewData || {
    netWorth: 1250000,
    savingsRate: 35,
    investmentRate: 25,
    monthlyIncome: 60000,
    monthlyExpenses: 39000,
    monthlySavings: 21000
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-black">Net Worth</span>
            <span className="text-sm font-bold text-black">₹{data.netWorth.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-black">Savings Rate</span>
            <span className="text-sm font-bold text-black">{data.savingsRate}%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-black">Investment Rate</span>
            <span className="text-sm font-bold text-black">{data.investmentRate}%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-black">Monthly Income</span>
            <span className="text-sm font-bold text-black">₹{data.monthlyIncome.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-black">Monthly Expenses</span>
            <span className="text-sm font-bold text-black">₹{data.monthlyExpenses.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-black">Monthly Savings</span>
            <span className="text-sm font-bold text-black">₹{data.monthlySavings.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;