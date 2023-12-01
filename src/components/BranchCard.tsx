import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { School } from '../models/school';
import UserSession from '../utility/userSession';

const BranchCard = (props: any) => {
  const { branch } = props;
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const validUser = UserSession.isUserStaffOrOwner(user.id, branch.all_users)
  return (
    <Card className="border-0 shadow-sm d-flex flex-md-row my-2">
      
        <Card.Img className='m-2 d-flex flex-column' variant="top" src={branch.crest_url} alt={branch.school_name} style={{ height: '20%', width: '20%' }} />
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title className='fs-3 text-muted'>{branch.branch_name}</Card.Title>
          <ul className="d-flex flex-lg-row flex-column flex-xs-row gap-lg-4 text-muted ps-0">
          <li className={` ${window.innerWidth <= 768 ? '' : 'list-unstyled'}`}>{branch.email_address} School</li>
            <li>{branch.website}</li>
            <li style={{ maxWidth: '200px' }}>{branch.postal_address}</li>
            <li style={{ maxWidth: '200px' }}>{branch.residential_address}</li>
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
          {/* <Button className="card-btn">
            See Branches
          </Button> */}
        </Card.Body>
      </Card>
  )
}

export default BranchCard
