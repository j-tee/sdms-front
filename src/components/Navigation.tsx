import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navigation = (props: any) => {
  const { schoolId, branchId } = props;
  const navigate = useNavigate()
  return (
    <div className='d-flex m-2 justify-content-between flex-row'>
      <span>
        <button className='btn btn-outline-none' onClick={() => navigate(`/branches/${schoolId}`)}>Back</button> 
      </span>
      <span>
        <button className='btn btn-outline-none' onClick={() => navigate(`/schools`)}>List of schools</button> 
      </span>
    </div>
  )
}

export default Navigation
