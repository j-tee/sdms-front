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
      <div className="org-item-card">
        <div className="org-item-content">
          <div className="org-item-icon">
            <i className="fas fa-project-diagram"></i>
          </div>
          <span className="org-item-name">{prog.prog_name}</span>
        </div>
        <div className="org-item-actions">
          <button className="org-action-btn edit-btn-org" onClick={handleEdit}>
            <i className="fas fa-edit"></i>
            <span>Edit</span>
          </button>
          <button className="org-action-btn delete-btn-org" onClick={handleDelete}>
            <i className="fas fa-trash-alt"></i>
            <span>Delete</span>
          </button>
        </div>
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
