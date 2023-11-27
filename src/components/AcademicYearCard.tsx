import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import AcademicTermCard from './AcademicTermCard';

const AcademicYearCard = (props: any) => {
  const { academicYear } = props;

  
  return (
    <Card className="border-0 shadow-sm d-flex flex-md-row my-2">
      <Card.Body className="d-flex flex-column">
        <Card.Title className='fs-3 text-muted d-flex justify-content-between'><span>{academicYear.branch_name} Branch</span><span>Academic Year: {academicYear.academic_year}</span> </Card.Title>
        <Card.Text>
          <AcademicTermCard yearId={academicYear.id} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default AcademicYearCard
