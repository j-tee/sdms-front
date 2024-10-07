import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AssessmentReport from './AssessmentReport';
import StudentTerminalReport from './StudentTerminalReport';

const EvaluationCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const [key, setKey] = useState<string>('ca');
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => k && setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="ca" title="Assessments & Exercises">
        <AssessmentReport index={key} schoolId={schoolId} branchId={branchId} />
      </Tab>
      <Tab eventKey="tr" title="Terminal Report">
        <StudentTerminalReport index={key} schoolId={schoolId} branchId={branchId} />
      </Tab>
    </Tabs>
  )
}

export default EvaluationCard