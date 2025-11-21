import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AssessmentTypeCard from './AssessmentTypeCard';
import ContinuousAssessmentCard from './ContinuousAssessmentCard';
import ScoreSheetCard from './ScoreSheetCard';
import GradeScale from './GradeScale';

const AssessmentCard = (props: any) => {
    const {schoolId, branchId, tabIndex} = props;
  const [key, setKey] = useState<string>('ty');
  return (
    <div className="academic-section-content">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="modern-tabs-horizontal mb-4"
      >
        <Tab 
          eventKey="ty" 
          title={
            <span>
              <i className="fas fa-clipboard-list me-2"></i>
              Assessment Types
            </span>
          }
        >
          <AssessmentTypeCard index={key} schoolId={schoolId} branchId={branchId} />
        </Tab>
        <Tab 
          eventKey="ca" 
          title={
            <span>
              <i className="fas fa-tasks me-2"></i>
              Exercises
            </span>
          }
        >
          <ContinuousAssessmentCard index={key} schoolId={schoolId} branchId={branchId} />
        </Tab>
        <Tab 
          eventKey="sc" 
          title={
            <span>
              <i className="fas fa-file-alt me-2"></i>
              Score Sheet
            </span>
          }
        >
          <ScoreSheetCard index={key} schoolId={schoolId} branchId={branchId} />
        </Tab>
        <Tab 
          eventKey="gc" 
          title={
            <span>
              <i className="fas fa-award me-2"></i>
              Grading Scale
            </span>
          }
        >
          <GradeScale index={key} schoolId={schoolId} branchId={branchId} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default AssessmentCard