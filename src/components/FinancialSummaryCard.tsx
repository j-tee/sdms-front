import React, { useEffect } from 'react'

const FinancialSummaryCard = (props:any) => {
const {tabIndex} = props;
  useEffect(() => {
    if(tabIndex === 'fourth')
    console.log('FinancialSummaryCard mounted');
    return () => {
      console.log('FinancialSummaryCard unmounted');
    }
  }, [tabIndex])
  return (
    <div>
        <h1>Financial Summaries</h1>
    </div>
  )
}

export default FinancialSummaryCard
