import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext'

const ClassGroup = () => {
    const { showToast, setShowToast } = useContext(ToastContext)

  useEffect(() => {
    setShowToast(false)
  },[setShowToast])
  return (
    <div>
      <Card.Title className='d-flex justify-content-center'>
        Class Groups
      </Card.Title>
    </div>
  )
}

export default ClassGroup
