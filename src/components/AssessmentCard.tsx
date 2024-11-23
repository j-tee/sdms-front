import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AssessmentTypeCard from './AssessmentTypeCard';
import ContinuousAssessmentCard from './ContinuousAssessmentCard';
import { Score } from '@mui/icons-material';
import ScoreSheetCard from './ScoreSheetCard';
import GradeScale from './GradeScale';

const AssessmentCard = (props: any) => {
    const {schoolId, branchId, tabIndex} = props;
  const [key, setKey] = useState<string>('ty');
  return (
    <Tabs
    id="controlled-tab-example"
    activeKey={key}
    onSelect={(k) => k && setKey(k)}
    className="mb-3"
  >
    <Tab eventKey="ty" title="Assessment Types">
      <AssessmentTypeCard index={key} schoolId={schoolId} branchId={branchId} />
    </Tab>
    <Tab eventKey="ca" title="Exercises">
      <ContinuousAssessmentCard index={key} schoolId={schoolId} branchId={branchId} />
    </Tab>
    <Tab eventKey="sc" title="Score Sheet">
      <ScoreSheetCard index={key} schoolId={schoolId} branchId={branchId} />
    </Tab>
    <Tab eventKey="gc" title="Grading Scale">
      <GradeScale index={key} schoolId={schoolId} branchId={branchId} />
    </Tab>
  </Tabs>
  )
}

export default AssessmentCard