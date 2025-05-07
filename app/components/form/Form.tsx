'use client';

import React, { useState, useEffect } from 'react';
import { generateInvestmentPlan } from '../../api/analyzer';

// Define TypeScript interfaces for our data structures
interface UserFinancialData {
  income: number;
  age: number;
  expenses: number;
  location: string;
  debts: number;
  liabilities: number;
  financialGoals: string[];
  timeHorizon: number;
  monthlySavings?: number;
}

interface FinancialGoal {
  id: string;
  label: string;
  emoji: string;
}

interface FieldConfig {
  min: number;
  max: number;
  step: number;
  increment: number;
}

interface FieldConfigurations {
  [key: string]: FieldConfig;
}

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  emoji: string;
  step?: number;
  min?: number;
  max?: number;
  format?: (val: number) => string;
}

interface FinancialInputSidebarProps {
  onDataSubmit: (data: UserFinancialData) => void;
}

// Aesthetic emojis for different financial categories
const FINANCIAL_EMOJIS: Record<string, string> = {
  income: '✦',
  age: '⦿',
  expenses: '⟐',
  location: '⌘',
  debts: '⎔',
  liabilities: '◈',
  goals: '❖',
  timeHorizon: '⦿',
  plus: '⊕',
  minus: '⊖'
};

// Available cities in India for dropdown
const INDIAN_CITIES: string[] = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Surat', 'Kochi', 'Chandigarh', 'Coimbatore', 'Indore'
];

// Available financial goals with aesthetic emojis
const FINANCIAL_GOALS: FinancialGoal[] = [
  { id: 'phone', label: 'Smartphone', emoji: '📱' },
  { id: 'car', label: 'Car', emoji: '🚘' },
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'education', label: 'Education', emoji: '🎓' },
  { id: 'vacation', label: 'Vacation', emoji: '✈️' },
  { id: 'retirement', label: 'Retirement', emoji: '🌴' },
  { id: 'emergency', label: 'Emergency Fund', emoji: '🛡️' },
  { id: 'wedding', label: 'Wedding', emoji: '💍' }
];

// Field configurations for validation and increment/decrement behavior
const FIELD_CONFIGS: FieldConfigurations = {
  income: { min: 1000, max: 10000000, step: 1000, increment: 1000 },
  age: { min: 18, max: 100, step: 1, increment: 1 },
  expenses: { min: 0, max: 5000000, step: 1000, increment: 1000 },
  debts: { min: 0, max: 10000000, step: 10000, increment: 10000 },
  liabilities: { min: 0, max: 10000000, step: 10000, increment: 10000 },
  timeHorizon: { min: 1, max: 40, step: 1, increment: 1 }
};

const FinancialInputSidebar: React.FC<FinancialInputSidebarProps> = ({ onDataSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserFinancialData>({
    income: 30000,
    age: 30,
    expenses: 15000,
    location: 'Bangalore',
    debts: 500000,
    liabilities: 700000,
    financialGoals: ['phone', 'car'],
    timeHorizon: 15,
  });

  // Calculate monthly savings whenever income or expenses change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      monthlySavings: prev.income - prev.expenses
    }));
  }, [formData.income, formData.expenses]);

  const handleNumberChange = (field: string, value: number): void => {
    const config = FIELD_CONFIGS[field];
    // Ensure value is within bounds
    const boundedValue = Math.max(config.min, Math.min(config.max, value));
    
    setFormData(prev => ({
      ...prev,
      [field]: boundedValue
    }));
  };

  // Smart value adjustments based on field type
  const incrementValue = (field: string): void => {
    const config = FIELD_CONFIGS[field];
    setFormData(prev => ({
      ...prev,
      [field]: Math.min(prev[field] + config.increment, config.max)
    }));
  };

  const decrementValue = (field: string): void => {
    const config = FIELD_CONFIGS[field];
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(prev[field] - config.increment, config.min)
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFormData(prev => ({
      ...prev,
      location: e.target.value
    }));
  };

  const handleGoalToggle = (goalId: string): void => {
    setFormData(prev => {
      const updatedGoals = prev.financialGoals.includes(goalId)
        ? prev.financialGoals.filter(g => g !== goalId)
        : [...prev.financialGoals, goalId];
      
      return {
        ...prev,
        financialGoals: updatedGoals
      };
    });
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      // Call the API function to generate investment plan
      const investmentPlan = await generateInvestmentPlan(formData);
      // Pass the investment plan to the parent component
      onDataSubmit(formData);
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reusable number input with minimal custom design and +/- buttons
  const NumberInput: React.FC<NumberInputProps> = ({ 
    label, 
    value, 
    onChange, 
    onIncrement,
    onDecrement,
    emoji, 
    step = 1000, 
    min = 0, 
    max = 10000000,
    format = (val: number) => `₹${val.toLocaleString('en-IN')}`
  }) => {
    return (
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="mr-2 text-lg text-black">{emoji}</span>
            <span className="text-sm font-medium tracking-wide text-black">{label}</span>
          </div>
          <div className="flex items-center">
            <button 
              onClick={onDecrement}
              className="w-8 h-8 flex items-center justify-center text-lg text-black hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Decrease value"
            >
              {FINANCIAL_EMOJIS.minus}
            </button>
            <div className="mx-2 text-sm font-medium min-w-24 text-center text-black">{format(value)}</div>
            <button 
              onClick={onIncrement}
              className="w-8 h-8 flex items-center justify-center text-lg text-black hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Increase value"
            >
              {FINANCIAL_EMOJIS.plus}
            </button>
          </div>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="absolute h-2 bg-black rounded-full"
            style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
          ></div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
            aria-label={`Adjust ${label}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-96 h-screen bg-white border-r border-gray-100 p-6 overflow-y-auto font-mono">
      <div className="py-4 mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-black">Pai-Pai</h1>
        <p className="text-sm text-black mt-1">Financial Planning Tool</p>
      </div>
      
      <div className="mb-8">
        <NumberInput 
          label="Monthly Income" 
          value={formData.income} 
          onChange={(value) => handleNumberChange('income', value)} 
          onIncrement={() => incrementValue('income')}
          onDecrement={() => decrementValue('income')}
          emoji={FINANCIAL_EMOJIS.income}
          step={FIELD_CONFIGS.income.step}
          min={FIELD_CONFIGS.income.min}
          max={FIELD_CONFIGS.income.max}
        />
        
        <NumberInput 
          label="Age" 
          value={formData.age} 
          onChange={(value) => handleNumberChange('age', value)}
          onIncrement={() => incrementValue('age')}
          onDecrement={() => decrementValue('age')} 
          emoji={FINANCIAL_EMOJIS.age}
          step={FIELD_CONFIGS.age.step}
          min={FIELD_CONFIGS.age.min}
          max={FIELD_CONFIGS.age.max}
          format={(val) => `${val} years`}
        />
        
        <NumberInput 
          label="Monthly Expenses" 
          value={formData.expenses} 
          onChange={(value) => handleNumberChange('expenses', value)}
          onIncrement={() => incrementValue('expenses')}
          onDecrement={() => decrementValue('expenses')} 
          emoji={FINANCIAL_EMOJIS.expenses}
          step={FIELD_CONFIGS.expenses.step}
          min={FIELD_CONFIGS.expenses.min}
          max={FIELD_CONFIGS.expenses.max}
        />
        
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="mr-2 text-lg text-black">{FINANCIAL_EMOJIS.location}</span>
              <span className="text-sm font-medium tracking-wide text-black">Location</span>
            </div>
          </div>
          <select 
            className="w-full py-2 px-3 border border-gray-200 rounded-md bg-white text-sm text-black focus:outline-none focus:border-black transition-colors"
            value={formData.location}
            onChange={handleLocationChange}
            aria-label="Select your location"
          >
            {INDIAN_CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <NumberInput 
          label="Total Debts" 
          value={formData.debts} 
          onChange={(value) => handleNumberChange('debts', value)}
          onIncrement={() => incrementValue('debts')}
          onDecrement={() => decrementValue('debts')} 
          emoji={FINANCIAL_EMOJIS.debts}
          step={FIELD_CONFIGS.debts.step}
          min={FIELD_CONFIGS.debts.min}
          max={FIELD_CONFIGS.debts.max}
        />
        
        <NumberInput 
          label="Total Liabilities" 
          value={formData.liabilities} 
          onChange={(value) => handleNumberChange('liabilities', value)}
          onIncrement={() => incrementValue('liabilities')}
          onDecrement={() => decrementValue('liabilities')} 
          emoji={FINANCIAL_EMOJIS.liabilities}
          step={FIELD_CONFIGS.liabilities.step}
          min={FIELD_CONFIGS.liabilities.min}
          max={FIELD_CONFIGS.liabilities.max}
        />
        
        <NumberInput 
          label="Time Horizon" 
          value={formData.timeHorizon} 
          onChange={(value) => handleNumberChange('timeHorizon', value)}
          onIncrement={() => incrementValue('timeHorizon')}
          onDecrement={() => decrementValue('timeHorizon')} 
          emoji={FINANCIAL_EMOJIS.timeHorizon}
          step={FIELD_CONFIGS.timeHorizon.step}
          min={FIELD_CONFIGS.timeHorizon.min}
          max={FIELD_CONFIGS.timeHorizon.max}
          format={(val) => `${val} years`}
        />
        
        <div className="flex items-center justify-between py-4 px-5 bg-black text-white rounded-lg mt-6 shadow-md">
          <span className="text-sm font-medium tracking-wide">Monthly Savings</span>
          <span className="text-sm font-bold">₹{formData.monthlySavings?.toLocaleString('en-IN') || (formData.income - formData.expenses).toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="mr-2 text-lg text-black">{FINANCIAL_EMOJIS.goals}</span>
          <h3 className="text-sm font-medium tracking-wide text-black">Financial Goals</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FINANCIAL_GOALS.map(goal => (
            <button
              key={goal.id}
              className={`flex items-center justify-between p-3 rounded-md ${formData.financialGoals.includes(goal.id) ? 'bg-black text-white shadow-md' : 'bg-gray-50 text-black border border-gray-100 shadow-sm'} transition-all duration-200 hover:border-gray-300`}
              onClick={() => handleGoalToggle(goal.id)}
              aria-pressed={formData.financialGoals.includes(goal.id)}
              aria-label={`Select ${goal.label} as a financial goal`}
            >
              <div className="flex items-center">
                <span className="mr-2 text-lg">{goal.emoji}</span>
                <span className="text-xs font-medium">{goal.label}</span>
              </div>
              <div className={`w-4 h-4 rounded-full border ${formData.financialGoals.includes(goal.id) ? 'bg-white border-white' : 'border-gray-300'}`}>
                {formData.financialGoals.includes(goal.id) && (
                  <div className="w-full h-full rounded-full bg-black"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <button 
        className="w-full py-4 px-6 relative overflow-hidden group bg-black text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        onClick={handleSubmit}
        disabled={loading}
        aria-label="Generate financial plan"
      >
        <span className="relative z-10">
          {loading ? 'Generating Plan...' : 'Generate Financial Plan'}
        </span>
        <span className="absolute left-0 bottom-0 h-full bg-gray-800 w-0 transition-all duration-300 group-hover:w-full"></span>
      </button>
    </div>
  );
};

export default FinancialInputSidebar;