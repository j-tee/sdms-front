import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserSession from '../utility/userSession';
import BranchEdit from './BranchEdit';
import BranchDelete from './BranchDelete';
import BranchDetails from './BranchDetails';

const BranchCard = (props: any) => {
  const { branch, params } = props;
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const validUser = UserSession.isUserStaffOrOwner(user.id, branch.all_users)
  const [isBranchEditModalOpen, setBranchEditModalOpen] = useState(false)
  const [isBranchDeleteModalOpen, setBranchDeleteModalOpen] = useState(false)
  const [isBranchDetailsModalOpen, setBranchDetailsModalOpen] = useState(false)
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const handleEdit = () => {
    setBranchEditModalOpen(true)
  }

  const handleDelete = () => {
    setBranchDeleteModalOpen(true)
  }

  const handleDetails = () => {
    setBranchDetailsModalOpen(true)
  }

  useEffect(() => {
    const user_roles = UserSession.getroles()
    setRoles(user_roles)
  }, [])


  return (
    <Card className="border-0 shadow-sm d-flex flex-md-row my-2">

      <Card.Img className='m-2 d-flex flex-column' variant="top" src={branch.crest_url} alt={branch.school_name} style={{ height: '20%', width: '20%' }} />
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className='fs-3 text-muted'>{branch.branch_name}</Card.Title>
        <ul className="d-flex flex-lg-row flex-column flex-xs-row gap-lg-4 text-muted ps-0">
          <li className={` ${window.innerWidth <= 768 ? '' : 'list-unstyled'}`}>{branch.ownership} School</li>
          <li>{branch.website}</li>
          <li>{branch.email_address}</li>
          <li style={{ maxWidth: '200px' }}>{branch.postal_address}</li>
          <li style={{ maxWidth: '200px' }}>{branch.residential_address}</li>
          <li style={{ maxWidth: '200px' }}>{branch.phone1}</li>
          <li style={{ maxWidth: '200px' }}>{branch.phone2}</li>
        </ul>
        <p>{branch.description}</p>
        <ul className="d-flex flex-wrap flex-md-row gap-2 list-unstyled ps-0 card-tags">
          {branch.tags.map((tag: any, index: any) => {
            // Remove non-letter characters and spaces
            const cleanedTag = tag.replace(/[^a-zA-Z]+/g, '-').toLowerCase();
            return (
              <>
                {validUser &&
                  <li key={index}>
                    <Link to={`/${cleanedTag.toLowerCase()}/${branch.school_id}/${branch.id}`}>{tag}</Link>
                  </li>}
              </>
            );
          })}
        </ul>
        <Row className='d-flex flex-row mt-3'>
          { (roles && privileged_school_roles.some(role=>roles.includes(role))) &&  validUser  &&  <span>
            <Card.Link fw-light onClick={handleEdit}><em>Edit</em></Card.Link>
            <Card.Link link-info text-decoration-underline onClick={handleDelete}><em>Delete</em></Card.Link>
            <Card.Link link-info text-decoration-underline onClick={handleDetails}><em>Details</em></Card.Link>
          </span>}
        </Row>
       
      </Card.Body>
      <BranchDetails branch={branch} params={params}
        isOpen={isBranchDetailsModalOpen}
        setBranchDetailsModalOpen={setBranchDetailsModalOpen}
        onRequestClose={() => setBranchDetailsModalOpen(false)} />

      <BranchDelete branch={branch} params={params}
        isOpen={isBranchDeleteModalOpen}
        setBranchDeleteModalOpen={setBranchDeleteModalOpen}
        onRequestClose={() => setBranchDeleteModalOpen(false)} />

      <BranchEdit branch={branch} params={params}
        isOpen={isBranchEditModalOpen}
        setBranchEditModalOpen={setBranchEditModalOpen}
        onRequestClose={() => setBranchEditModalOpen(false)} />
    </Card>
  )
}

export default BranchCard
