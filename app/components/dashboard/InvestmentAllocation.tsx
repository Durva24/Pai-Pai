import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle } from 'lucide-react';

// Define the props interface for the component
interface InvestmentAllocationProps {
  title: string;
  userData: {
    income: number;
    savings?: number;
    timeHorizon: number;
  };
}

export default function ProfessionalInvestmentAllocation({ title, userData }: InvestmentAllocationProps) {
  const [allocationData, setAllocationData] = useState<any>(null);

  useEffect(() => {
    if (userData) {
      const { income, savings = 0, timeHorizon } = userData;
      
      // Use 50% of savings for investment instead of 50% of salary
      let investableAmount = savings * 0.5;
      
      // Calculate monthly investment amount (used for pie chart)
      const monthlyInvestment = investableAmount / 12;
      
      // Define the allocation based on income criteria
      let allocation = {
        mutualFunds: {
          percentage: 0,
          largeCap: { percentage: 0, return: 14 },
          midCap: { percentage: 0, return: 16 },
          smallCap: { percentage: 0, return: 18 }
        },
        gold: { percentage: 0, return: 8 },
        stocks: { percentage: 0, return: 15 },
        crypto: { percentage: 0, return: 50 }
      };
      
      // Apply allocation strategy based on income
      const annualIncome = income * 12; // Assuming income is monthly
      
      if (annualIncome < 30000 && savings < 15000) {
        // Scenario 1
        allocation.mutualFunds.percentage = 80;
        allocation.mutualFunds.largeCap.percentage = 60;
        allocation.mutualFunds.midCap.percentage = 30;
        allocation.mutualFunds.smallCap.percentage = 10;
        allocation.gold.percentage = 20;
      } else if (annualIncome < 100000 && savings < 50000) {
        // Scenario 2
        allocation.mutualFunds.percentage = 60;
        allocation.mutualFunds.largeCap.percentage = 50;
        allocation.mutualFunds.midCap.percentage = 30;
        allocation.mutualFunds.smallCap.percentage = 20;
        allocation.gold.percentage = 20;
        allocation.stocks.percentage = 20;
      } else {
        // Scenario 3
        allocation.mutualFunds.percentage = 40;
        allocation.mutualFunds.largeCap.percentage = 45;
        allocation.mutualFunds.midCap.percentage = 25;
        allocation.mutualFunds.smallCap.percentage = 30;
        allocation.gold.percentage = 20;
        allocation.stocks.percentage = 35;
        allocation.crypto.percentage = 5;
      }
      
      // Calculate monthly amounts for each category
      const mutualFundsTotal = (monthlyInvestment * allocation.mutualFunds.percentage) / 100;
      const goldAmount = (monthlyInvestment * allocation.gold.percentage) / 100;
      const stocksAmount = (monthlyInvestment * allocation.stocks.percentage) / 100;
      const cryptoAmount = (monthlyInvestment * allocation.crypto.percentage) / 100;
      
      // Calculate mutual fund sub-allocations (monthly)
      const largeCapAmount = (mutualFundsTotal * allocation.mutualFunds.largeCap.percentage) / 100;
      const midCapAmount = (mutualFundsTotal * allocation.mutualFunds.midCap.percentage) / 100;
      const smallCapAmount = (mutualFundsTotal * allocation.mutualFunds.smallCap.percentage) / 100;
      
      // Calculate returns with compounding and annual step-up
      let totalInvestment = 0;
      let largeCapFutureValue = 0;
      let midCapFutureValue = 0;
      let smallCapFutureValue = 0;
      let goldFutureValue = 0;
      let stocksFutureValue = 0;
      let cryptoFutureValue = 0;
      
      // Monthly investments (annual amount divided by 12)
      let currentLargeCapInvestment = (largeCapAmount * 12) / 12;
      let currentMidCapInvestment = (midCapAmount * 12) / 12;
      let currentSmallCapInvestment = (smallCapAmount * 12) / 12;
      let currentGoldInvestment = (goldAmount * 12) / 12;
      let currentStocksInvestment = (stocksAmount * 12) / 12;
      let currentCryptoInvestment = (cryptoAmount * 12) / 12;
      
      // Annual step-up rate
      const stepUpRate = 5.5 / 100;
      
      // Track annual investment for calculations
      let annualInvestmentTotal = (currentLargeCapInvestment + currentMidCapInvestment + 
                                 currentSmallCapInvestment + currentGoldInvestment + 
                                 currentStocksInvestment + currentCryptoInvestment) * 12;
      
      // Compound interest calculation with annual step-up
      for (let year = 1; year <= timeHorizon; year++) {
        if (year > 1) {
          // Apply step-up for subsequent years
          currentLargeCapInvestment *= (1 + stepUpRate);
          currentMidCapInvestment *= (1 + stepUpRate);
          currentSmallCapInvestment *= (1 + stepUpRate);
          currentGoldInvestment *= (1 + stepUpRate);
          currentStocksInvestment *= (1 + stepUpRate);
          currentCryptoInvestment *= (1 + stepUpRate);
          
          // Update annual investment total for this year
          annualInvestmentTotal = (currentLargeCapInvestment + currentMidCapInvestment + 
                                  currentSmallCapInvestment + currentGoldInvestment + 
                                  currentStocksInvestment + currentCryptoInvestment) * 12;
        }
        
        // Add to total investment
        totalInvestment += annualInvestmentTotal;
        
        // Calculate monthly returns and compound them
        for (let month = 1; month <= 12; month++) {
          // Monthly rate = annual rate / 12
          const largeCapMonthlyRate = allocation.mutualFunds.largeCap.return / 100 / 12;
          const midCapMonthlyRate = allocation.mutualFunds.midCap.return / 100 / 12;
          const smallCapMonthlyRate = allocation.mutualFunds.smallCap.return / 100 / 12;
          const goldMonthlyRate = allocation.gold.return / 100 / 12;
          const stocksMonthlyRate = allocation.stocks.return / 100 / 12;
          
          // Apply monthly compounding
          largeCapFutureValue = (largeCapFutureValue + currentLargeCapInvestment) * (1 + largeCapMonthlyRate);
          midCapFutureValue = (midCapFutureValue + currentMidCapInvestment) * (1 + midCapMonthlyRate);
          smallCapFutureValue = (smallCapFutureValue + currentSmallCapInvestment) * (1 + smallCapMonthlyRate);
          goldFutureValue = (goldFutureValue + currentGoldInvestment) * (1 + goldMonthlyRate);
          stocksFutureValue = (stocksFutureValue + currentStocksInvestment) * (1 + stocksMonthlyRate);
          
          // For crypto, apply high volatility simulation
          if (currentCryptoInvestment > 0) {
            // Simulating monthly volatility with random return between -10% and +20%
            const volatileMonthlyReturn = Math.random() * 30 - 10;
            cryptoFutureValue = (cryptoFutureValue + currentCryptoInvestment) * (1 + volatileMonthlyReturn / 100);
          }
        }
      }
      
      // Calculate total future value
      const totalFutureValue = largeCapFutureValue + midCapFutureValue + smallCapFutureValue + 
                              goldFutureValue + stocksFutureValue + cryptoFutureValue;
      
      // Calculate overall return percentage
      const overallReturn = ((totalFutureValue - totalInvestment) / totalInvestment) * 100;
      
      // Prepare data for pie chart (based on monthly investment)
      const pieData = [
        { name: 'Large Cap', value: largeCapAmount, color: '#0F4C81' },
        { name: 'Mid Cap', value: midCapAmount, color: '#3A6EA5' },
        { name: 'Small Cap', value: smallCapAmount, color: '#6F90BD' },
        { name: 'Gold', value: goldAmount, color: '#FFB347' },
        { name: 'Stocks', value: stocksAmount, color: '#4DAF7C' }
      ];
      
      // Only add crypto if it exists in the allocation
      if (cryptoAmount > 0) {
        pieData.push({ name: 'Crypto', value: cryptoAmount, color: '#9C4F96' });
      }
      
      // Remove any categories with zero value
      const filteredPieData = pieData.filter(item => item.value > 0);
      
      setAllocationData({
        allocation,
        pieData: filteredPieData,
        monthlyInvestment: {
          largeCap: largeCapAmount,
          midCap: midCapAmount,
          smallCap: smallCapAmount,
          gold: goldAmount,
          stocks: stocksAmount,
          crypto: cryptoAmount,
          total: monthlyInvestment
        },
        initialInvestment: {
          total: investableAmount
        },
        futureValue: {
          largeCap: largeCapFutureValue,
          midCap: midCapFutureValue,
          smallCap: smallCapFutureValue,
          gold: goldFutureValue,
          stocks: stocksFutureValue,
          crypto: cryptoFutureValue,
          total: totalFutureValue
        },
        totalInvestment,
        overallReturn,
        timeHorizon
      });
    }
  }, [userData]);

  if (!allocationData) {
    return <div>Loading allocation data...</div>;
  }

  // Format currency in INR
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-mono text-sm">{`${payload[0].name}: ${formatCurrency(payload[0].value)}`}</p>
          <p className="font-mono text-xs text-gray-600">{`${(payload[0].value / allocationData.monthlyInvestment.total * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="font-mono text-black">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      {/* Investment Summary */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Total Savings</p>
            <p className="text-lg font-semibold">{formatCurrency(userData.savings || 0)}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Investment Amount (50%)</p>
            <p className="text-lg font-semibold">{formatCurrency(allocationData.initialInvestment.total)}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Monthly Investment</p>
            <p className="text-lg font-semibold">{formatCurrency(allocationData.monthlyInvestment.total)}</p>
          </div>
        </div>
      </div>
      
      {/* Allocation Chart and Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="md:col-span-1 bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-3">Monthly Investment Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {allocationData.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {allocationData.pieData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Investment Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg p-4 shadow mb-4">
            <h3 className="font-semibold mb-3">Investment Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Investment Type</th>
                    <th className="text-right py-2">Monthly Investment</th>
                    <th className="text-right py-2">Projected Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {allocationData.monthlyInvestment.largeCap > 0 && (
                    <tr className="border-b">
                      <td className="py-2">Large Cap Mutual Funds</td>
                      <td className="text-right">{formatCurrency(allocationData.monthlyInvestment.largeCap)}</td>
                      <td className="text-right">{formatCurrency(allocationData.futureValue.largeCap)}</td>
                    </tr>
                  )}
                  {allocationData.monthlyInvestment.midCap > 0 && (
                    <tr className="border-b">
                      <td className="py-2">Mid Cap Mutual Funds</td>
                      <td className="text-right">{formatCurrency(allocationData.monthlyInvestment.midCap)}</td>
                      <td className="text-right">{formatCurrency(allocationData.futureValue.midCap)}</td>
                    </tr>
                  )}
                  {allocationData.monthlyInvestment.smallCap > 0 && (
                    <tr className="border-b">
                      <td className="py-2">Small Cap Mutual Funds</td>
                      <td className="text-right">{formatCurrency(allocationData.monthlyInvestment.smallCap)}</td>
                      <td className="text-right">{formatCurrency(allocationData.futureValue.smallCap)}</td>
                    </tr>
                  )}
                  {allocationData.monthlyInvestment.gold > 0 && (
                    <tr className="border-b">
                      <td className="py-2">Gold</td>
                      <td className="text-right">{formatCurrency(allocationData.monthlyInvestment.gold)}</td>
                      <td className="text-right">{formatCurrency(allocationData.futureValue.gold)}</td>
                    </tr>
                  )}
                  {allocationData.monthlyInvestment.stocks > 0 && (
                    <tr className="border-b">
                      <td className="py-2">Stocks</td>
                      <td className="text-right">{formatCurrency(allocationData.monthlyInvestment.stocks)}</td>
                      <td className="text-right">{formatCurrency(allocationData.futureValue.stocks)}</td>
                    </tr>
                  )}
                  {allocationData.monthlyInvestment.crypto > 0 && (
                    <tr className="border-b">
                      <td className="py-2 flex items-center">
                        Cryptocurrency
                        <AlertTriangle className="ml-1 text-yellow-500" size={14} />
                      </td>
                      <td className="text-right">{formatCurrency(allocationData.monthlyInvestment.crypto)}</td>
                      <td className="text-right">{formatCurrency(allocationData.futureValue.crypto)}</td>
                    </tr>
                  )}
                  <tr className="font-semibold">
                    <td className="py-2">Total</td>
                    <td className="text-right">{formatCurrency(allocationData.monthlyInvestment.total)}</td>
                    <td className="text-right">{formatCurrency(allocationData.futureValue.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-right mt-3">
              <p className="text-sm font-semibold">Total Return: {formatPercentage(allocationData.overallReturn)}</p>
            </div>
          </div>
          
          {/* Annual Step Up Note */}
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm">
              Your investment plan includes a 5.5% annual step-up in contribution amount over {allocationData.timeHorizon} years.
            </p>
            <p className="text-sm mt-2">
              <strong>Note:</strong> Only 50% of your total savings are allocated for investments. The remaining 50% is kept as liquid reserves.
            </p>
          </div>
          
          {/* Crypto Warning */}
          {allocationData.monthlyInvestment.crypto > 0 && (
            <div className="bg-white rounded-lg p-4 shadow mt-4">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 text-yellow-500" size={16} />
                <p className="text-sm text-yellow-600">
                  Cryptocurrency investments are highly volatile. Projected returns may vary significantly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}