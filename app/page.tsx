"use client";
import { useState } from 'react';

// Define UserFinancialData interface to include all needed properties
interface UserFinancialData {
  income: number;
  age: number;
  expenses: number;
  location: string;
  debts: Array<{name: string; amount: number; interest: number}>;
  liabilities: number;
  financialGoals: string[];
  timeHorizon: number;
  monthlySavings?: number;
  investments: Array<{type: string; amount: number}>;
  savings: number;
  dependents: any;
}

// Dashboard components
import Overview from '@/app/components/dashboard/Overview';
import IncomeVsExpenses from '@/app/components/dashboard/IncomevsExpenses';
import EmergencyFund from '@/app/components/dashboard/EmergencyFund';
import InvestmentVsReturns from '@/app/components/dashboard/InvestmentVsReturns';
import InvestmentAllocation from '@/app/components/dashboard/InvestmentAllocation';
import MilestoneTracker from '@/app/components/dashboard/Milestones';
import DebtTracker from '@/app/components/dashboard/DebtTracker';
import Quote from '@/app/components/dashboard/Quote';
import Form from '@/app/components/form/Form';
import Card from '@/app/components/ui/card';
import Funds from '@/app/components/dashboard/Funds';
import Insurance from '@/app/components/dashboard/Insurance';

export default function Home() {
  const [userData, setUserData] = useState<UserFinancialData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (data: UserFinancialData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate monthlySavings if not provided
      if (!data.monthlySavings) {
        data.monthlySavings = data.income - data.expenses;
      }
      
      // Store the user data directly
      setUserData(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to process financial data. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-white flex overflow-hidden">
      {/* Left Panel - Input Form (25%) */}
      <div className="w-1/4 border-r border-gray-200 overflow-y-auto h-full">
        <div className="p-4">
          <Form 
            onDataSubmit={handleFormSubmit} 
            isLoading={isLoading} 
          />
          {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}
        </div>
      </div>
      
      {/* Main Content Area (60%) */}
      <div className="w-3/5 overflow-y-auto h-full">
        {!userData && !isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              <p className="text-gray-600 mb-4">Enter your financial details to get started with your personalized investment plan.</p>
              <Quote title="Financial Wisdom" />
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Generating your personalized investment plan...</p>
            </div>
          </div>
        ) : userData && (
          <div className="p-4 space-y-6">
            {/* Overview */}
            <Card className="p-4">
              <Overview 
                title="Financial Overview"
                userData={userData}
              />
            </Card>
            
            {/* Income vs Expenses */}
            <Card className="p-4">
              <IncomeVsExpenses 
                title="Income vs Expenses"
                userData={userData}
                income={userData.income}
                expenses={userData.expenses}
                monthlySavings={userData.monthlySavings}
              />
            </Card>
            
            {/* Funds */}
            <Card className="p-4">
              <Funds 
                title="Funds"
                userData={userData}
              />
            </Card>
            
            {/* Debt Tracker */}
            <Card className="p-4">
              <DebtTracker 
                title="Debt Tracker"
                userData={userData}
                debts={userData.debts}
                liabilities={userData.liabilities}
              />
            </Card>
            
            {/* Investment Allocation */}
            <Card className="p-4">
              <InvestmentAllocation 
                title="Investment Allocation"
                userData={userData}
                investments={userData.investments}
                income={userData.income}
                age={userData.age}
                timeHorizon={userData.timeHorizon}
              />
            </Card>
            
            {/* Investment vs Returns Graph */}
            <Card className="p-4">
              <InvestmentVsReturns 
                title="Investment vs Returns"
                userData={userData}
                investments={userData.investments}
                monthlySavings={userData.monthlySavings}
                timeHorizon={userData.timeHorizon}
              />
            </Card>
          </div>
        )}
      </div>
      
      {/* Right Sidebar (20%) */}
      <div className="w-1/5 border-l border-gray-200 overflow-y-auto h-full">
        {userData && (
          <div className="p-4 space-y-6">
            {/* Emergency Fund */}
            <Card className="p-4">
              <EmergencyFund 
                title="Emergency Fund"
                userData={userData} 
              />
            </Card>
            
            {/* Insurance */}
            <Card className="p-4">
              <Insurance 
                title="Insurance"
                userData={userData}
                age={userData.age}
                income={userData.income}
                liabilities={userData.liabilities}
                dependents={userData.dependents}
              />
            </Card>
            
            {/* Milestones */}
            <Card className="p-4">
              <MilestoneTracker 
                title="Financial Milestones"
                userData={userData}
                financialGoals={userData.financialGoals}
                monthlySavings={userData.monthlySavings}
                timeHorizon={userData.timeHorizon}
              />
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}