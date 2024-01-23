import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import TimeTable from './TimeTable';
import AttendanceCard from './AttendanceCard';

const LessonsCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const [tabKey, setTabKey] = useState<string>('time-table');
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={tabKey}
      onSelect={(k) => k && setTabKey(k)}
      className="mb-3"
    >
      <Tab eventKey="time-table" title="Time Table">
        <TimeTable tabKey={tabKey} schoolId={schoolId} branchId={branchId} />
      </Tab>
      <Tab eventKey="attendance" title="Attendance">
        <AttendanceCard index={tabKey} schoolId={schoolId} branchId={branchId} />
      </Tab>
    </Tabs>
  )
}

export default LessonsCard
