import React, { useEffect, useState } from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap';
import AddSubject from './AddSubject';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SubjectParams } from '../models/subject';
import { getSubjects } from '../redux/slices/subjectSlice';
import SubjectDetails from './SubjectDetails';
import CourseOption from './CourseOption';
import StudentOptionalCourseCard from './StudentOptionalCourseCard';
import SubjectList from './SubjectList';
import UserSession from '../utility/userSession';

const SubjectCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const [tabKey, setTabKey] = useState<string>('subject');
  const dispatch = useDispatch<AppDispatch>();
  const { subjects } = useSelector((state: RootState) => state.subject);
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const [params, setParams] = useState<SubjectParams>({
    school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10 }, paginate: true
  } as SubjectParams);
  useEffect(() => {
    if (tabIndex === 'first') {
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
      dispatch(getSubjects({ ...params, school_id: schoolId, branch_id: branchId }))
    }
  }, [branchId, dispatch, params, schoolId, tabIndex]);
  return (
    <div className="academic-section-content">
      <Tabs
        id="controlled-tab-example"
        activeKey={tabKey}
        onSelect={(k) => k && setTabKey(k)}
        className="modern-tabs-horizontal mb-4"
      >
        <Tab 
          eventKey="subject" 
          title={
            <span>
              <i className="fas fa-book me-2"></i>
              Subjects
            </span>
          }
        >
          {roles && privileged_school_roles.some(role=>roles.includes(role)) && <AddSubject params={params} schoolId={schoolId} branchId={branchId} />}
          <div className="academic-section-header">
            <div className="academic-section-icon">
              <i className="fas fa-list"></i>
            </div>
            <h3 className="academic-section-title">Subject List</h3>
          </div>
          <SubjectList tabKey={tabKey} params={params} subjects={subjects} schoolId={schoolId} branchId={branchId} /> 
        </Tab>
        <Tab 
          eventKey="course-options" 
          title={
            <span>
              <i className="fas fa-stream me-2"></i>
              Course Options
            </span>
          }
        >
          <CourseOption tabKey={tabKey} params={params} schoolId={schoolId} branchId={branchId} />
        </Tab>
        <Tab 
          eventKey="registration" 
          title={
            <span>
              <i className="fas fa-user-check me-2"></i>
              Course Registration
            </span>
          }
        >
          <StudentOptionalCourseCard tabKey={tabKey} params={params} schoolId={schoolId} branchId={branchId} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default SubjectCard
