import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import ParentCard from './ParentCard';
import StudentDetails from './StudentDetails';
import AdmissionAdd from './AdmissionAdd';

const AdmissionCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const [key, setKey] = useState<string>('parent');
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => k && setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="parent" title="Parent Details">
        <ParentCard index={key} schoolId={schoolId} branchId={branchId} />
      </Tab>
      <Tab eventKey="student" title="Student Information">
        <StudentDetails index={key} schoolId={schoolId} branchId={branchId} />
      </Tab>
      <Tab eventKey="admission" title="Admission Details">
        <AdmissionAdd index={key} schoolId={schoolId} branchId={branchId} />
      </Tab>
    </Tabs>
  )
}

export default AdmissionCard
