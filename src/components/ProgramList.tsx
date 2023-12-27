import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import ProgramEdit from './ProgramEdit';
import ProgramDelete from './ProgramDelete';

const ProgramList = (props: any) => {
  const { prog, params, schoolId, programId } = props;
  const [isProgramEditModalOpen, setProgramEditModalOpen] = useState(false)
  const [isProgramDeleteModalOpen, setProgramDeleteModalOpne] = useState(false)
  const handleEdit = () => {
    setProgramEditModalOpen(true)
  }
  const handleDelete = () => {
    setProgramDeleteModalOpne(true)
  }
  return (
    <>
      <div className='fs-5 text-muted pt-1 border-bottom d-flex flex-row justify-content-between'>
        <span>{prog.prog_name}</span>
        <span>
          <Card.Footer className='p-0 m-0 fs-6 d-flex flex-row'>
            <Card.Link onClick={handleEdit}>Edit</Card.Link><Card.Link onClick={handleDelete}>Delete</Card.Link>
          </Card.Footer>
        </span>
      </div>
      <ProgramEdit isOpen={isProgramEditModalOpen}
        params={params}
        schoolId={schoolId}
        programId={programId}
        onRequestClose={() => { setProgramEditModalOpen(false) }}
        setProgramEditModalOpen={setProgramEditModalOpen}
        program={prog} />
      <ProgramDelete isOpen={isProgramDeleteModalOpen}
        params={params}
        schoolId={schoolId}
        programId={programId}
        onRequestClose={() => { setProgramDeleteModalOpne(false) }}
        setProgramDeleteModalOpne={setProgramDeleteModalOpne}
        program={prog} />
    </>
  )
}

export default ProgramList
