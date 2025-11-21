import React, { useEffect, useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserSession from '../utility/userSession';
import BranchEdit from './BranchEdit';
import BranchDelete from './BranchDelete';
import BranchDetails from './BranchDetails';
import '../css/BranchCard.css';

const BranchCard = (props: any) => {
  const { branch, params } = props;
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const validUser = UserSession.isUserStaffOrOwner(user.id, branch.all_users);
  
  const [isBranchEditModalOpen, setBranchEditModalOpen] = useState(false);
  const [isBranchDeleteModalOpen, setBranchDeleteModalOpen] = useState(false);
  const [isBranchDetailsModalOpen, setBranchDetailsModalOpen] = useState(false);
  
  const privileged_school_roles = ['owner', 'admin', 'staff', 'secretary', 'principal', 'vice_principal'];
  const [roles, setRoles] = useState<string[]>([]);
  
  const handleEdit = () => {
    setBranchEditModalOpen(true);
  };

  const handleDelete = () => {
    setBranchDeleteModalOpen(true);
  };

  const handleDetails = () => {
    setBranchDetailsModalOpen(true);
  };

  useEffect(() => {
    const user_roles = UserSession.getroles();
    setRoles(user_roles);
  }, [validUser]);

  return (
    <Card className="branch-card-modern">
      <div className="branch-card-crest">
        <img
          src={branch.crest_url}
          alt={branch.school_name}
          className="branch-crest-image"
        />
      </div>
      <Card.Body className="branch-card-body-modern">
        <h2 className="branch-name-modern">{branch.branch_name}</h2>
        <ul className="branch-info-grid">
          <li className="branch-info-item">
            <div className="branch-info-icon">
              <i className="fas fa-building"></i>
            </div>
            <div className="branch-info-content">
              <div className="branch-info-label">Type</div>
              <div className="branch-info-value">{branch.ownership} School</div>
            </div>
          </li>
          {branch.website && (
            <li className="branch-info-item">
              <div className="branch-info-icon">
                <i className="fas fa-globe"></i>
              </div>
              <div className="branch-info-content">
                <div className="branch-info-label">Website</div>
                <a href={branch.website} target="_blank" rel="noopener noreferrer" className="branch-info-value branch-info-link">
                  {branch.website}
                </a>
              </div>
            </li>
          )}
          {branch.email_address && (
            <li className="branch-info-item">
              <div className="branch-info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="branch-info-content">
                <div className="branch-info-label">Email</div>
                <a href={`mailto:${branch.email_address}`} className="branch-info-value branch-info-link">
                  {branch.email_address}
                </a>
              </div>
            </li>
          )}
          {branch.postal_address && (
            <li className="branch-info-item">
              <div className="branch-info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="branch-info-content">
                <div className="branch-info-label">Postal Address</div>
                <div className="branch-info-value">{branch.postal_address}</div>
              </div>
            </li>
          )}
          {branch.residential_address && (
            <li className="branch-info-item">
              <div className="branch-info-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="branch-info-content">
                <div className="branch-info-label">Physical Address</div>
                <div className="branch-info-value">{branch.residential_address}</div>
              </div>
            </li>
          )}
          {branch.phone1 && (
            <li className="branch-info-item">
              <div className="branch-info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="branch-info-content">
                <div className="branch-info-label">Phone 1</div>
                <div className="branch-info-value">{branch.phone1}</div>
              </div>
            </li>
          )}
          {branch.phone2 && (
            <li className="branch-info-item">
              <div className="branch-info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="branch-info-content">
                <div className="branch-info-label">Phone 2</div>
                <div className="branch-info-value">{branch.phone2}</div>
              </div>
            </li>
          )}
        </ul>
        {branch.description && (
          <p className="branch-description">{branch.description}</p>
        )}
        {validUser && branch.tags && branch.tags.length > 0 && (
          <ul className="branch-tags">
            {branch.tags.map((tag: any) => {
              const cleanedTag = tag.replace(/[^a-zA-Z]+/g, '-').toLowerCase();
              const icon = tag.toLowerCase().includes('calendar') ? 'fa-calendar-alt' :
                          tag.toLowerCase().includes('enrol') ? 'fa-user-plus' :
                          tag.toLowerCase().includes('staff') ? 'fa-users' :
                          tag.toLowerCase().includes('organ') ? 'fa-sitemap' :
                          tag.toLowerCase().includes('academic') ? 'fa-graduation-cap' :
                          tag.toLowerCase().includes('finance') ? 'fa-dollar-sign' : 'fa-arrow-right';
              return (
                <li key={`${tag}-${branch.id}`}>
                  <Link to={`/${cleanedTag}/${branch.school_id}/${branch.id}`} className="branch-tag-link">
                    <i className={`fas ${icon}`}></i>
                    {tag}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {(roles && privileged_school_roles.some(role => roles.includes(role))) && validUser && (
          <div className="branch-management-links">
            <a className="branch-management-link" onClick={handleEdit} style={{cursor: 'pointer'}}>
              <i className="fas fa-edit"></i>
              Edit Branch
            </a>
            <a className="branch-management-link" onClick={handleDetails} style={{cursor: 'pointer'}}>
              <i className="fas fa-info-circle"></i>
              View Details
            </a>
            <a className="branch-management-link branch-management-link-delete" onClick={handleDelete} style={{cursor: 'pointer'}}>
              <i className="fas fa-trash-alt"></i>
              Delete Branch
            </a>
          </div>
        )}
      </Card.Body>

      {/* Modals */}
      <BranchDetails
        branch={branch}
        params={params}
        isOpen={isBranchDetailsModalOpen}
        setBranchDetailsModalOpen={setBranchDetailsModalOpen}
        onRequestClose={() => setBranchDetailsModalOpen(false)}
      />

      <BranchDelete
        branch={branch}
        params={params}
        isOpen={isBranchDeleteModalOpen}
        setBranchDeleteModalOpen={setBranchDeleteModalOpen}
        onRequestClose={() => setBranchDeleteModalOpen(false)}
      />

      <BranchEdit
        branch={branch}
        params={params}
        isOpen={isBranchEditModalOpen}
        setBranchEditModalOpen={setBranchEditModalOpen}
        onRequestClose={() => setBranchEditModalOpen(false)}
      />
    </Card>
  );
};

export default BranchCard;
