import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AssessmentTypeCard from './AssessmentTypeCard';
import ContinuousAssessmentCard from './ContinuousAssessmentCard';

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
    <Tab eventKey="ca" title="Continuous Assessment">
      <ContinuousAssessmentCard index={key} schoolId={schoolId} branchId={branchId} />
    </Tab>
    <Tab eventKey="ta" title="Terminal Assessment">
      <h3>Terminal Assessment</h3>
    </Tab>
    <Tab eventKey="sc" title="Score Sheet">
      <h3>Score Sheet</h3>
    </Tab>
  </Tabs>
  )
}

export default AssessmentCard