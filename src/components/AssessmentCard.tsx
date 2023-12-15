import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';

const AssessmentCard = (props: any) => {
    const {schoolId, branchId, tabIndex} = props;
  const [key, setKey] = useState<string>('ca');
  return (
    <Tabs
    id="controlled-tab-example"
    activeKey={key}
    onSelect={(k) => k && setKey(k)}
    className="mb-3"
  >
    <Tab eventKey="ca" title="Continuous Assessment">
      <h3>Continuous Assessment</h3>
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