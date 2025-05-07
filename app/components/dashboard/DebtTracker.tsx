import React from 'react';
import Card from '../ui/Card';

interface DebtItem {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  totalPayment: number;
}

interface DebtTrackerProps {
  debts: DebtItem[];
  monthlyAllocation: number;
}

const DebtTracker: React.FC<DebtTrackerProps> = ({
  debts,
  monthlyAllocation,
}) => {
  // Sort debts by interest rate (highest first) for avalanche method
  const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
  
  // Calculate total debt
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  
  // Calculate total minimum payments
  const totalMinimumPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  
  // Calculate extra payment available
  const extraPayment = Math.max(0, monthlyAllocation - totalMinimumPayment);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Estimate payoff time for a debt (in months)
  const estimatePayoffMonths = (debt: DebtItem, additionalPayment: number = 0) => {
    const totalPayment = debt.minimumPayment + additionalPayment;
    const monthlyRate = debt.interestRate / 100 / 12;
    
    // If interest rate is 0 or very small, use simple division
    if (monthlyRate < 0.0001) {
      return Math.ceil(debt.balance / totalPayment);
    }
    
    // Otherwise use formula for loans with interest
    const months = Math.ceil(
      -Math.log(1 - (debt.balance * monthlyRate) / totalPayment) / Math.log(1 + monthlyRate)
    );
    
    return isFinite(months) ? months : Math.ceil(debt.balance / totalPayment);
  };

  return (
    <Card title="Debt Tracker">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Total Debt</p>
          <p className="text-xl font-semibold">{formatCurrency(totalDebt)}</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Monthly Allocation</p>
          <p className="text-xl font-semibold">{formatCurrency(monthlyAllocation)}</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Extra Payment</p>
          <p className="text-xl font-semibold text-green-600">{formatCurrency(extraPayment)}</p>
        </div>
      </div>
      
      <h4 className="text-sm font-medium text-gray-700 mb-3">Debt Payoff Strategy (Avalanche Method)</h4>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Debt
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payoff Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDebts.map((debt, index) => {
              // For avalanche method, allocate extra payment to highest interest debt first
              let additionalPayment = 0;
              if (index === 0) {
                additionalPayment = extraPayment;
              }
              
              // Calculate payoff time
              const months = estimatePayoffMonths(debt, additionalPayment);
              const years = Math.floor(months / 12);
              const remainingMonths = months % 12;
              
              // Format payoff time
              let payoffTime = '';
              if (years > 0) {
                payoffTime += `${years}y `;
              }
              payoffTime += `${remainingMonths}m`;
              
              return (
                <tr key={debt.name}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{debt.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-900">
                    {formatCurrency(debt.balance)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-900">
                    {formatPercentage(debt.interestRate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-900">
                    {formatCurrency(debt.minimumPayment + additionalPayment)}
                    {additionalPayment > 0 && (
                      <span className="text-xs text-green-600 ml-1">
                        (+{formatCurrency(additionalPayment)})
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-900">
                    {payoffTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {debts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No debts to track!</p>
          <p className="text-sm mt-2">Debt-free is the way to be.</p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          The <strong>Avalanche Method</strong> pays minimum payments on all debts, with extra money going toward the highest interest debt first. This saves the most money in interest over time.
        </p>
      </div>
    </Card>
  );
};

export default DebtTracker;