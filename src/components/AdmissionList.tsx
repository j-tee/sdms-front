import React, { useContext, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Button, Card } from 'react-bootstrap';
import AdmissionEdit from './AdmissionEdit';
import AdmissionDelete from './AdmissionDelete';
import AdmissionDetails from './AdmissionDetails';


const AdmissionList = (props: any) => {
  const { schoolId, branchId, admission, onChange, params } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [isAdmissionEditModalOpen, setAdmissionEditModalOpen] = useState(false)
  const [isAdmissionDeleteModalOpen, setAdmissionDeleteModalOpen] = useState(false)
  const [isAdmissionDetailsModalOpen, setAdmissionDetailsModalOpen] = useState(false)

  const handleEdit = () => {
    setAdmissionEditModalOpen(true)
  }

  const handleDelete = () => {
    setAdmissionDeleteModalOpen(true)
  }

  const handleDetails = () => {
    setAdmissionDetailsModalOpen(true)
  }
  return (
    <>
      <Card.Body className='d-flex flex-column flex-lg-row gap-3'>
        <Card.Img variant="top" src={admission.picture} style={{ width: "100px" }} />
        <Card.Text className='d-flex flex-column text-muted'>
          <span>
            {admission.student_name}
          </span>
          <span>
          {admission.dept_name} {admission.admission_stage}
          </span>
          <span>
            {admission.admission_program}
          </span>
          <span>
            {new Date(admission.admission_date).toDateString()}
          </span>
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex flex-row gap-2'>
        <Button variant='outline-primary' size='sm' onClick={handleEdit} className='pe-3'>
          Edit
        </Button>
      
        <Button variant='outline-danger' size='sm' onClick={handleDelete} className='pe-3'>
          Delete
        </Button>
        
        <Button variant='outline-info' size='sm' onClick={handleDetails}>
          Details
        </Button>
      </Card.Footer>
      <AdmissionDetails admission={admission}
        isOpen={isAdmissionDetailsModalOpen}
        onRequestClose={() => setAdmissionDetailsModalOpen(false)}
        setAdmissionDetailsModalOpen={setAdmissionDetailsModalOpen} />
      <AdmissionDelete schoolId={schoolId} admission={admission}
        branchId={branchId}
        isOpen={isAdmissionDeleteModalOpen}
        params={params} onChange={onChange}
        onRequestClose={() => setAdmissionDeleteModalOpen(false)}
        setAdmissionDeleteModalOpen={setAdmissionDeleteModalOpen} />
      <AdmissionEdit schoolId={schoolId} admission={admission}
        branchId={branchId}
        isOpen={isAdmissionEditModalOpen}
        params={params} onChange={onChange}
        onRequestClose={() => setAdmissionEditModalOpen(false)}
        setAdmissionEditModalOpen={setAdmissionEditModalOpen} />
    </>
  )
}

export default AdmissionList
