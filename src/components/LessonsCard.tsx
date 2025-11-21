import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import TimeTable from './TimeTable';
import AttendanceCard from './AttendanceCard';

const LessonsCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const [tabKey, setTabKey] = useState<string>('time-table');
  return (
    <div className="academic-section-content">
      <Tabs
        id="controlled-tab-example"
        activeKey={tabKey}
        onSelect={(k) => k && setTabKey(k)}
        className="modern-tabs-horizontal mb-4"
      >
        <Tab 
          eventKey="time-table" 
          title={
            <span>
              <i className="fas fa-calendar-alt me-2"></i>
              Time Table
            </span>
          }
        >
          <TimeTable tabKey={tabKey} lessonTabIndex={tabIndex} schoolId={schoolId} branchId={branchId} />
        </Tab>
        <Tab 
          eventKey="attendance" 
          title={
            <span>
              <i className="fas fa-user-check me-2"></i>
              Attendance
            </span>
          }
        >
          <AttendanceCard index={tabKey} schoolId={schoolId} branchId={branchId} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default LessonsCard
