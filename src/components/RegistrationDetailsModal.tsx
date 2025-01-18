import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const RegistrationDetailsModal = (props: any) => {
    const {isOpen, onRequestClose, paeams, setRegDetailsOpen} = props;
    const dispatch = useDispatch<AppDispatch>();
    
  return (
    <div>
      
    </div>
  )
}

export default RegistrationDetailsModal
