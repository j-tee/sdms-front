import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';

const LessonsCard = (props: any) => {
  const {schoolId, branchId, tabIndex} = props;
  const [key, setKey] = useState<string>('time-table');
  return (
    <Tabs
    id="controlled-tab-example"
    activeKey={key}
    onSelect={(k) => k && setKey(k)}
    className="mb-3"
  >
    <Tab eventKey="time-table" title="Time Table">
      <h3>Time Table</h3>
    </Tab>
    <Tab eventKey="attendance" title="Attendance">
      <h3>Attendance</h3>
    </Tab>
  </Tabs>
  )
}

export default LessonsCard
