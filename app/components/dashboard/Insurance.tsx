'use client';

import React from 'react';

interface MilestoneItem {
  name: string;
  targetDate: string;
  targetAmount: number;
  currentAmount: number;
  percentComplete: number;
  emoji: string;
}

interface MilestoneTrackerProps {
  title: string;
  milestoneData?: {
    financialIndependence: {
      targetAmount: number;
      currentAmount: number;
      percentComplete: number;
      estimatedYear: number;
    };
    majorMilestones: MilestoneItem[];
  };
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ title, milestoneData }) => {
  // Placeholder data if none provided
  const data = milestoneData || {
    financialIndependence: {
      targetAmount: 10000000,
      currentAmount: 2500000,
      percentComplete: 25,
      estimatedYear: 2035
    },
    majorMilestones: [
      {
        name: "Emergency Fund",
        targetDate: "Dec 2025",
        targetAmount: 234000,
        currentAmount: 100000,
        percentComplete: 43,
        emoji: "🛡️"
      },
      {
        name: "House Down Payment",
        targetDate: "Jun 2027",
        targetAmount: 1500000,
        currentAmount: 350000,
        percentComplete: 23,
        emoji: "🏠"
      },
      {
        name: "Child's Education",
        targetDate: "Jan 2035",
        targetAmount: 5000000,
        currentAmount: 150000,
        percentComplete: 3,
        emoji: "🎓"
      },
      {
        name: "International Vacation",
        targetDate: "Apr 2026",
        targetAmount: 200000,
        currentAmount: 50000,
        percentComplete: 25,
        emoji: "✈️"
      }
    ]
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-black">Financial Independence</span>
          <div className="text-right">
            <span className="text-sm font-bold text-black block">
              ₹{data.financialIndependence.currentAmount.toLocaleString('en-IN')} / 
              ₹{data.financialIndependence.targetAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-600">Est. Year: {data.financialIndependence.estimatedYear}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-black h-2 rounded-full" 
            style={{ width: `${data.financialIndependence.percentComplete}%` }}
          ></div>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-600">
            {data.financialIndependence.percentComplete}% complete
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.majorMilestones.map((milestone, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="mr-2 text-lg">{milestone.emoji}</span>
                <span className="text-sm font-medium text-black">{milestone.name}</span>
              </div>
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {milestone.targetDate}
              </span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">
                ₹{milestone.currentAmount.toLocaleString('en-IN')} / 
                ₹{milestone.targetAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-medium text-black">
                {milestone.percentComplete}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full">
              <div 
                className="bg-black h-1 rounded-full" 
                style={{ width: `${milestone.percentComplete}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTracker;