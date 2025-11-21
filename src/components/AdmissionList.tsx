import React, { useContext, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Button, Card } from 'react-bootstrap';
import AdmissionEdit from './AdmissionEdit';
import AdmissionDelete from './AdmissionDelete';
import AdmissionDetails from './AdmissionDetails';
import '../css/AdmissionList.css';


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
      <Card className='admission-card'>
        <Card.Body className='admission-card-body'>
          <div className='admission-avatar-wrapper'>
            <div className='admission-avatar admission-avatar-placeholder'>
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className='admission-info'>
            <div className='admission-name'>
              {admission.student_name}
            </div>
            <div className='admission-detail'>
              <i className="fas fa-graduation-cap"></i>
              <span>{admission.dept_name} - {admission.admission_stage}</span>
            </div>
            <div className='admission-detail'>
              <i className="fas fa-book"></i>
              <span>{admission.admission_program}</span>
            </div>
            <div className='admission-detail admission-date'>
              <i className="fas fa-calendar-alt"></i>
              <span>{new Date(admission.admission_date).toDateString()}</span>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className='admission-card-footer'>
          <Button 
            onClick={handleEdit} 
            className='admission-btn admission-btn-edit'
          >
            <i className="fas fa-edit"></i>
            Edit
          </Button>
        
          <Button 
            onClick={handleDelete} 
            className='admission-btn admission-btn-delete'
          >
            <i className="fas fa-trash-alt"></i>
            Delete
          </Button>
          
          <Button 
            onClick={handleDetails}
            className='admission-btn admission-btn-details'
          >
            <i className="fas fa-info-circle"></i>
            Details
          </Button>
        </Card.Footer>
      </Card>

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
