// Exporting types and functions from the existing API implementation
import { 
    UserFinancialData, 
    InvestmentPlan, 
    generateInvestmentPlan,
    default as groqApi
  } from '../app/api/analyzer'; // Replace with the actual path to your API file
  
  // Re-export everything for use in components
  export type { UserFinancialData, InvestmentPlan };
  export { generateInvestmentPlan };
  export default groqApi;