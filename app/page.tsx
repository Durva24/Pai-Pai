"use client";

import { useState } from 'react';
import { generateInvestmentPlan, UserFinancialData, InvestmentPlan } from '../lib/groqClient';

// Dashboard components
import Overview from '@/app/components/dashboard/Overview';
import IncomeVsExpenses from '@/app/components/dashboard/IncomevsExpenses';
import MonthlyExpenses from '@/app/components/dashboard/MonthlyExpenses';
import EmergencyFund from '@/app/components/dashboard/EmergencyFund';
import InvestmentGraph from '@/app/components/dashboard/InvestmentGraph';
import InvestmentAllocation from '@/app/components/dashboard/InvestmentAllocation';
import MilestoneTracker from '@/app/components/dashboard/Milestones';
import PortfolioPerformance from '@/app/components/dashboard/PortfolioPerformance';
import DebtTracker from '@/app/components/dashboard/DebtTracker';
import Quote from '@/app/components/dashboard/Quote';
import Form from '@/app/components/form/Form';
import Card from '@/app/components/ui/card';

// Define proper types to match component requirements
interface DebtItem {
  name: string;
  amount: number;
  interestRate: number;
  minimumPayment: number;
}

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
}

interface AssetClass {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface PerformanceMetric {
  name: string;
  value: string;
  change: number;
  isPositive: boolean;
}

interface MilestoneItem {
  name: string;
  targetAmount: number;
  currentAmount: number;
  percentComplete: number;
  estimatedYear: number;
}

export default function Home() {
  const [investmentPlan, setInvestmentPlan] = useState<InvestmentPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (userData: UserFinancialData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const plan = await generateInvestmentPlan(userData);
      setInvestmentPlan(plan);
    } catch (err) {
      setError('Failed to generate investment plan. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Adapt investment plan data to match component prop requirements
  const getDebtTrackerData = () => {
    if (!investmentPlan) return null;
    
    // Transform debt data to match DebtTrackerProps
    return {
      totalDebt: investmentPlan.debtRepaymentTracker.totalDebt,
      totalMonthlyPayment: investmentPlan.debtRepaymentTracker.monthlyPayment,
      averageInterestRate: 5.5, // Add appropriate value here
      debtFreeDate: `December ${new Date().getFullYear() + Math.ceil(investmentPlan.debtRepaymentTracker.estimatedRepaymentTime / 12)}`,
      debtItems: Object.entries(investmentPlan.debtRepaymentTracker.repaymentPlan).map(([name, amount]) => ({
        name,
        amount,
        interestRate: 5.0, // Add appropriate value for each debt
        minimumPayment: amount / 24, // Example calculation
      }))
    };
  };

  // Transform overview data to match OverviewProps
  const getOverviewData = () => {
    if (!investmentPlan) return null;
    
    return {
      netWorth: investmentPlan.overview.currentNetWorth,
      savingsRate: investmentPlan.incomeVsExpenses.savingsRate,
      investmentRate: 15, // Add appropriate value
      monthlyIncome: investmentPlan.incomeVsExpenses.monthlyIncome,
      monthlyExpenses: Object.values(investmentPlan.incomeVsExpenses.monthlyExpenses).reduce((a, b) => a + b, 0),
      monthlySavings: investmentPlan.incomeVsExpenses.monthlyIncome * (investmentPlan.incomeVsExpenses.savingsRate / 100)
    };
  };

  // Transform income vs expenses data to match IncomeVsExpensesProps
  const getIncomeExpenseData = () => {
    if (!investmentPlan) return null;

    const totalExpenses = Object.values(investmentPlan.incomeVsExpenses.monthlyExpenses).reduce((a, b) => a + b, 0);
    const savings = investmentPlan.incomeVsExpenses.monthlyIncome - totalExpenses;
    
    return {
      income: investmentPlan.incomeVsExpenses.monthlyIncome,
      expenses: totalExpenses,
      savings: savings,
      savingsRate: investmentPlan.incomeVsExpenses.savingsRate,
      monthlyData: [
        { month: 'January', income: investmentPlan.incomeVsExpenses.monthlyIncome, expenses: totalExpenses },
        { month: 'February', income: investmentPlan.incomeVsExpenses.monthlyIncome, expenses: totalExpenses },
        { month: 'March', income: investmentPlan.incomeVsExpenses.monthlyIncome, expenses: totalExpenses }
      ]
    };
  };

  // Transform expense data to match MonthlyExpensesProps
  const getExpenseData = () => {
    if (!investmentPlan) return null;

    const totalExpenses = Object.values(investmentPlan.monthlyExpenses.recurringBills).reduce((a, b) => a + b, 0);
    
    const categories: ExpenseCategory[] = Object.entries(investmentPlan.monthlyExpenses.recurringBills).map(([name, amount]) => ({
      name,
      amount,
      percentage: (amount / totalExpenses) * 100
    }));
    
    return {
      totalExpenses,
      categories
    };
  };

  // Transform portfolio performance data to match PortfolioPerformanceProps
  const getPerformanceData = () => {
    if (!investmentPlan) return null;
    
    return {
      totalValue: investmentPlan.portfolioPerformance.totalInvestedAmount,
      totalReturn: 12000, // Add appropriate value
      returnPercentage: 8.5, // Add appropriate value
      isPositive: true,
      timeHorizon: "Long-term",
      metrics: [
        { name: "Annual Return", value: "8.5%", change: 1.2, isPositive: true },
        { name: "Dividend Yield", value: "2.1%", change: 0.3, isPositive: true }
      ],
      historicalPerformance: Object.entries(investmentPlan.portfolioPerformance.monthlyInvestments).map(([period, value]) => ({
        period,
        value
      }))
    };
  };

  // Transform investment graph data to match InvestmentGraphProps
  const getInvestmentGraphData = () => {
    if (!investmentPlan) return null;
    
    return {
      currentInvestment: investmentPlan.portfolioPerformance.totalInvestedAmount,
      projectedValue: investmentPlan.investmentGraph.investments[investmentPlan.investmentGraph.investments.length - 1],
      timeHorizon: 20, // Add appropriate value
      growthRate: 8, // Add appropriate value
      monthlyContribution: 5000, // Add appropriate value
      yearlyData: investmentPlan.investmentGraph.months.map((month, index) => ({
        year: Math.floor(month / 12),
        investmentValue: investmentPlan.investmentGraph.investments[index],
        contributionValue: investmentPlan.investmentGraph.investments[index] * 0.7, // Example calculation
        growthValue: investmentPlan.investmentGraph.returns[index]
      }))
    };
  };

  // Transform investment allocation data to match InvestmentAllocationProps
  const getInvestmentAllocationData = () => {
    if (!investmentPlan) return null;
    
    const totalInvestment = Object.values(investmentPlan.investmentAllocation.monthly).reduce(
      (total, asset) => total + asset.amount, 0
    );
    
    const assetClasses: AssetClass[] = Object.entries(investmentPlan.investmentAllocation.monthly).map(
      ([name, data]) => ({
        name,
        value: data.amount,
        percentage: data.percentage,
        color: getColorForAsset(name)
      })
    );
    
    return {
      totalInvestment,
      assetClasses,
      riskLevel: "Moderate",
      expectedReturn: Object.values(investmentPlan.investmentAllocation.expectedReturns)[0] // Example
    };
  };

  // Helper function for allocation colors
  const getColorForAsset = (assetName: string): string => {
    const colors: Record<string, string> = {
      equityMutualFunds: "#4C51BF",
      debt: "#3182CE",
      gold: "#D69E2E",
      nps: "#38A169",
      ppf: "#805AD5"
    };
    return colors[assetName] || "#718096";
  };

  // Transform emergency fund data to match EmergencyFundProps
  const getEmergencyFundData = () => {
    if (!investmentPlan) return null;
    
    const emergencyFund = {
      currentAmount: investmentPlan.funds.emergencyFund.current,
      targetAmount: investmentPlan.funds.emergencyFund.target,
      percentComplete: (investmentPlan.funds.emergencyFund.current / investmentPlan.funds.emergencyFund.target) * 100
    };
    
    const childrenEducationFund = {
      currentAmount: investmentPlan.funds.childrenEducationFund.current,
      targetAmount: investmentPlan.funds.childrenEducationFund.target,
      percentComplete: (investmentPlan.funds.childrenEducationFund.current / investmentPlan.funds.childrenEducationFund.target) * 100
    };
    
    const retirementFund = {
      currentAmount: investmentPlan.funds.retirementFund.current,
      targetAmount: investmentPlan.funds.retirementFund.target,
      percentComplete: (investmentPlan.funds.retirementFund.current / investmentPlan.funds.retirementFund.target) * 100
    };
    
    const dreamFunds = Object.entries(investmentPlan.funds.dreamFunds).map(([name, data]) => ({
      name,
      currentAmount: data.current,
      targetAmount: data.target,
      percentComplete: (data.current / data.target) * 100
    }));
    
    return {
      emergencyFund,
      childrenEducationFund,
      retirementFund,
      dreamFunds
    };
  };

  // Transform milestone tracker data to match MilestoneTrackerProps
  const getMilestoneData = () => {
    if (!investmentPlan) return null;
    
    const financialIndependence = {
      targetAmount: investmentPlan.milestoneTracker.financialIndependence.targetAmount,
      currentAmount: investmentPlan.milestoneTracker.financialIndependence.targetAmount * 
        (investmentPlan.milestoneTracker.financialIndependence.progress / 100),
      percentComplete: investmentPlan.milestoneTracker.financialIndependence.progress,
      estimatedYear: new Date().getFullYear() + 
        Math.ceil((100 - investmentPlan.milestoneTracker.financialIndependence.progress) / 5)
    };
    
    const majorMilestones = Object.entries(investmentPlan.milestoneTracker.majorMilestones).map(([name, data]) => ({
      name,
      targetAmount: data.targetAmount,
      currentAmount: data.targetAmount * (data.progress / 100),
      percentComplete: data.progress,
      estimatedYear: new Date().getFullYear() + Math.ceil((100 - data.progress) / 10)
    }));
    
    return {
      financialIndependence,
      majorMilestones
    };
  };

  return (
    <main className="min-h-screen bg-white flex">
      {/* Left Panel - Input Form (no side margins, reduced padding) */}
      <div className="w-95 border-r border-gray-200 overflow-y-auto">
        <div className="p-2">
          <Form 
            handleSubmit={handleFormSubmit} 
            isLoading={isLoading} 
          />
          {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}
        
          {investmentPlan && getDebtTrackerData() && (
            <div className="mt-4">
              <DebtTracker 
                title="Debt Tracker"
                debtData={getDebtTrackerData()!}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area (full width) */}
      <div className="flex-1 overflow-y-auto">
        {!investmentPlan && !isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              <p className="text-gray-600 mb-4">Enter your financial details to get started with your personalized investment plan.</p>
              <Quote title="Financial Inspiration" />
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Generating your personalized investment plan...</p>
            </div>
          </div>
        ) : investmentPlan && (
          <div className="p-4 space-y-6">
            {/* Top Section - Overview */}
            <Card className="p-4">
              <Overview 
                title="Financial Overview"
                overviewData={getOverviewData()!}
              />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Section - Left Column */}
              <div className="space-y-6">
                <Card className="p-4">
                  <IncomeVsExpenses 
                    title="Income vs Expenses"
                    incomeExpenseData={getIncomeExpenseData()!}
                  />
                </Card>
                
                <Card className="p-4">
                  <MonthlyExpenses 
                    title="Monthly Expenses"
                    expenseData={getExpenseData()!}
                  />
                </Card>
                
                <Card className="p-4">
                  <PortfolioPerformance 
                    title="Portfolio Performance"
                    performanceData={getPerformanceData()!}
                  />
                </Card>
              </div>

              {/* Main Section - Right Column */}
              <div className="space-y-6">
                <Card className="p-4">
                  <InvestmentGraph 
                    title="Investment Growth"
                    graphData={getInvestmentGraphData()!}
                  />
                </Card>
                
                <Card className="p-4">
                  <InvestmentAllocation 
                    title="Investment Allocation"
                    allocationData={getInvestmentAllocationData()!}
                  />
                </Card>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <EmergencyFund 
                  title="Emergency Fund"
                  fundData={getEmergencyFundData()!}
                />
              </Card>
              
              <Card className="md:col-span-2 p-4">
                <MilestoneTracker 
                  title="Financial Milestones"
                  milestoneData={getMilestoneData()!}
                />
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}