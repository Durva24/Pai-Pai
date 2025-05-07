'use client';

import React from 'react';

interface PerformanceMetric {
  label: string;
  value: number | string;
  change?: number;
  isPositive?: boolean;
}

interface PortfolioPerformanceProps {
  title: string;
  performanceData?: {
    totalValue: number;
    totalReturn: number;
    returnPercentage: number;
    isPositive: boolean;
    timeHorizon: string;
    metrics: PerformanceMetric[];
    historicalPerformance: {
      period: string;
      value: number;
    }[];
  };
}

const PortfolioPerformance: React.FC<PortfolioPerformanceProps> = ({ title, performanceData }) => {
  // Placeholder data if none provided
  const data = performanceData || {
    totalValue: 500000,
    totalReturn: 75000,
    returnPercentage: 17.5,
    isPositive: true,
    timeHorizon: "1 Year",
    metrics: [
      { label: "XIRR", value: "15.8%", isPositive: true },
      { label: "Volatility", value: "12.4%", isPositive: false },
      { label: "Sharpe Ratio", value: 1.2, isPositive: true },
      { label: "Alpha", value: "3.5%", isPositive: true }
    ],
    historicalPerformance: [
      { period: "1M", value: 2.5 },
      { period: "3M", value: 5.6 },
      { period: "6M", value: 10.2 },
      { period: "1Y", value: 17.5 },
      { period: "3Y", value: 42.3 },
      { period: "5Y", value: 76.8 }
    ]
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-lg font-bold text-black">₹{data.totalValue.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Return</p>
            <div className="flex items-center">
              <p className={`text-lg font-bold ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {data.isPositive ? '+' : '-'}₹{Math.abs(data.totalReturn).toLocaleString('en-IN')}
              </p>
              <span className={`ml-2 text-sm ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                ({data.isPositive ? '+' : '-'}{Math.abs(data.returnPercentage)}%)
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-xs text-gray-600">Time Horizon: {data.timeHorizon}</span>
        </div>
      </div>
      
      {/* Placeholder for chart */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 h-48 mb-4 flex items-center justify-center">
        <span className="text-gray-400">Portfolio Performance Chart Placeholder</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {data.metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">{metric.label}</p>
            <p className={`text-md font-bold ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-sm font-medium text-black mb-3">Historical Performance</h3>
        <div className="flex justify-between">
          {data.historicalPerformance.map((item, index) => (
            <div key={index} className="text-center">
              <p className={`text-sm font-bold ${item.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.value >= 0 ? '+' : ''}{item.value}%
              </p>
              <p className="text-xs text-gray-600">{item.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformance;