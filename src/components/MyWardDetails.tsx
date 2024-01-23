import { Subscript } from '@mui/icons-material';
import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SubscriptionModal from './SubscriptionModal';

const MyWardDetails = (props: any) => {
  const { student, key } = props;
  const [isSunscriptinModalOpen, setIsSubscriptionModalOpen] = React.useState<boolean>(false)

  const handleSubscription = () => {
    setIsSubscriptionModalOpen(true)
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
            <Card.Link>Academics</Card.Link>
            <Card.Link>Bills and Fees</Card.Link>
            <Card.Link onClick={handleSubscription}>Subscription</Card.Link>
          </ul>
        </span>
      </Card.Body>
      <SubscriptionModal isOpen={isSunscriptinModalOpen}
        onRequestClose={() => setIsSubscriptionModalOpen(false)}
        setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
        student={student} />
    </>
  )
}

export default MyWardDetails
