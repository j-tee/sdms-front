import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AssessmentReport from './AssessmentReport';
import StudentTerminalReport from './StudentTerminalReport';

const EvaluationCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const [key, setKey] = useState<string>('ca');
  return (
    <div className="academic-section-content">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="modern-tabs-horizontal mb-4"
      >
        <Tab 
          eventKey="ca" 
          title={
            <span>
              <i className="fas fa-chart-line me-2"></i>
              Assessments & Exercises
            </span>
          }
        >
          <AssessmentReport index={key} schoolId={schoolId} branchId={branchId} />
        </Tab>
        <Tab 
          eventKey="tr" 
          title={
            <span>
              <i className="fas fa-file-invoice me-2"></i>
              Terminal Report
            </span>
          }
        >
          <StudentTerminalReport index={key} schoolId={schoolId} branchId={branchId} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default EvaluationCard