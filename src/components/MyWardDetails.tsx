import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import SubscriptionModal from './SubscriptionModal';
import StudentAcademics from './StudentAcademics';
import StudentBillFeesModal from './StudentBillFeesModal';

const MyWardDetails = (props: any) => {
  const { student, key, params, parent } = props;
  const [isSunscriptinModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false)
  const [isAcademcsModalOpen, setAcademicsModalOpen] = useState<boolean>(false)
  const [isBillsFeesModalOpen, setBillsFeesModalOpen] = useState<boolean>(false)

  const handleSubscription = () => {
    setIsSubscriptionModalOpen(true)
  }

  const handleAcademics = () => {
    setAcademicsModalOpen(true)
  }

  const handleBillsFees = () => { 
    setBillsFeesModalOpen(true)
  }
  return (
    <>
      <Card.Body key={key} className='d-flex flex-lg-row flex-column gap-lg-4'>
        <Card.Img className='m-2 d-flex flex-column' variant="top" src={student.image_url} alt={student.school_name} style={{ height: '100px', width: '100px' }} />
        <span className='d-flex flex-column
            '>
          <ul className="d-flex flex-column flex-xs-row gap-lg-1 text-muted ps-0 pt-2">
            <li className='list-unstyled'>{student.first_name}</li>
            <li className='list-unstyled'>{student.last_name}</li>
            <li className='list-unstyled'>{student.student_id}</li>
          </ul>
          <ul className='d-flex flex-row gap-2 ps-0'>
            <Card.Link onClick={handleAcademics}>Academics</Card.Link>
            <Card.Link onClick={handleBillsFees}>Bills and Fees</Card.Link>
            <Card.Link onClick={handleSubscription}>Subscription</Card.Link>
          </ul>
        </span>
      </Card.Body>
      <SubscriptionModal isOpen={isSunscriptinModalOpen}
        onRequestClose={() => setIsSubscriptionModalOpen(false)}
        setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
        student={student} />
      <StudentAcademics isOpen={isAcademcsModalOpen} 
      onRequestClose={() => setAcademicsModalOpen(false)}
      stage={student.stage}
      student={student}
      branchId={student.branch_id}
      schoolId={student.school_id}
      params={params}
      parent={parent}
      setAcademicsModalOpen={setAcademicsModalOpen}      
      />
      <StudentBillFeesModal isOpen={isBillsFeesModalOpen} 
      onRequestClose={() => setBillsFeesModalOpen(false)}
      stage={student.stage}
      student={student}
      branchId={student.branch_id}
      schoolId={student.school_id}
      params={params}
      parent={parent}
      setBillsFeesModalOpen={setBillsFeesModalOpen}      
      />
      
    </>
  )
}

export default MyWardDetails
