import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import AddBranch from './AddBranch';

const SchoolCard = (props: any) => {
  const { school } = props
  const navigate = useNavigate();
  
  const [isAddBranchModalOpen, setAddBranchModalOpen] = useState(false)
  const seeBranches = (school:any) => {
    navigate(`/branches/${school.id}`, { state: { school } });
  }

  const openAddBranchModal = () => {
    setAddBranchModalOpen(true)
  }
  return (
    <Card className="border-0 shadow-sm d-flex flex-md-row my-2">
    <Card.Img className='m-2 d-flex' variant="top" src={school.crest_image_url} alt={school.school_name} style={{ height: 'auto', width: '20%' }} />
    <Card.Body className="d-flex flex-column align-items-center">
      <Card.Title className='fs-1 text-muted'>{school.school_name}</Card.Title>
      <ul className="d-flex flex-md-row gap-4 text-muted ps-0">
        <li className="list-unstyled">{school.level_name} School</li>
        <li>{school.ownership}</li>
        {school.religion === 'Other' ? ' ' : <li>{school.religion}</li>}
      </ul>
      <p>{school.description}</p>
      <ul className="d-flex flex-wrap flex-md-row gap-2 list-unstyled ps-0 card-tags">
        {school.tags.map((tag: any, index: any) => {
          // Remove non-letter characters and spaces
          const cleanedTag = tag.replace(/[^a-zA-Z]+/g, '-').toLowerCase();
          return (
            <li key={index}>
              {/* <Link to={`/${cleanedTag.toLowerCase()}/${school.id}/0`}>{tag}</Link> */}
            </li>
          );
        })}
      </ul>
      <div className="d-flex">
        <Button onClick={() => seeBranches(school)} className="card-btn">
          See Branches
        </Button>
        <Button onClick={openAddBranchModal} className="card-btn ms-4">
          Add New Branch
        </Button>
      </div>
      <AddBranch
        schoolId={school.id}
        isOpen={isAddBranchModalOpen}
        setAddBranchModalOpen={setAddBranchModalOpen}
        onRequestClose={() => setAddBranchModalOpen(false)}
      />
    </Card.Body>
  </Card>
  
  )
}

export default SchoolCard
