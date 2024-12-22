import React, { useEffect, useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import AddBranch from './AddBranch';
import UserSession from '../utility/userSession';
import SchoolEdit from './SchoolEdit';

const SchoolCard = (props: any) => {
  const { school, params } = props
  const navigate = useNavigate();
  const [isSchoolEditModalOpen, setSchoolEditModalOpen] = useState(false)
  const [roles, setRoles] = useState<string[]>([]);
  const [isAddBranchModalOpen, setAddBranchModalOpen] = useState(false)
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const validUser = UserSession.isUserStaffOrOwner(user.id, school.all_users)
  const privileged_school_roles = ['owner', 'admin', 'staff', 'secretary', 'principal', 'vice_principal']
  const seeBranches = (school: any) => {
    navigate(`/branches/${school.id}`, { state: { school } });
  }

  const openAddBranchModal = () => {
    setAddBranchModalOpen(true)
  }

  const handleEdit = () => {
    setSchoolEditModalOpen(true)
  }

  const handleDelete = () => {
    navigate(`/delete-school/${school.id}`, { state: { school } });
  }

  const handleDetails = () => {
    navigate(`/school-details/${school.id}`, { state: { school } });
  }

  useEffect(() => {
    if (roles.length <= 0) {
      console.log('roles====>',roles)
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
    }
  }, [])

  return (
    <Card className="border-0 shadow-sm d-flex flex-md-row my-2">
      <Card.Img className='m-2 d-flex' variant="top border-right" src={school.crest_image_url} alt={school.school_name} style={{ height: 'auto', width: '20%' }} />
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
            // const cleanedTag = tag.replace(/[^a-zA-Z]+/g, '-').toLowerCase();
            return (
              <li key={index}>
                {/* <Link to={`/${cleanedTag.toLowerCase()}/${school.id}/0`}>{tag}</Link> */}
              </li>
            );
          })}
        </ul>
        <div className="d-flex">
          <Button onClick={() => seeBranches(school)} className="card-btn">
            Branches
          </Button>
          {validUser && (roles.includes('admin') || roles.includes('owner')) && <Button onClick={openAddBranchModal} className="card-btn ms-4">
            Add New Branch
          </Button>}
        </div>
        {(roles && privileged_school_roles.some(role => roles.includes(role))) && <Row className='d-flex flex-row mt-5'>
          <span>
            {validUser && <Card.Link fw-light onClick={handleEdit}><em>Edit</em></Card.Link>}
            {validUser && <Card.Link link-info text-decoration-underline onClick={handleDelete}><em>Delete</em></Card.Link>}
            <Card.Link link-info text-decoration-underline onClick={handleDetails}><em>Details</em></Card.Link>
          </span>
        </Row>}
        <SchoolEdit
          params={params}
          school={school}
          isOpen={isSchoolEditModalOpen}
          setSchoolEditModalOpen={setSchoolEditModalOpen}
          onRequestClose={() => setSchoolEditModalOpen(false)}
        />
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
