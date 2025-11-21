import React, { useEffect, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddBranch from './AddBranch';
import UserSession from '../utility/userSession';
import SchoolEdit from './SchoolEdit';
import '../css/SchoolCard.css';
import '../css/SchoolCard.css';

const SchoolCard = (props: any) => {
  const { school, params } = props;
  const navigate = useNavigate();
  const [isSchoolEditModalOpen, setSchoolEditModalOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [isAddBranchModalOpen, setAddBranchModalOpen] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const validUser = UserSession.isUserStaffOrOwner(user.id, school.all_users);
  const privileged_school_roles = ['owner', 'admin', 'staff', 'secretary', 'principal', 'vice_principal'];

  const seeBranches = (school: any) => {
    navigate(`/branches/${school.id}`, { state: { school } });
  };

  const openAddBranchModal = () => {
    setAddBranchModalOpen(true);
  };

  const handleEdit = () => {
    setSchoolEditModalOpen(true);
  };

  const handleDelete = () => {
    navigate(`/delete-school/${school.id}`, { state: { school } });
  };

  const handleDetails = () => {
    navigate(`/school-details/${school.id}`, { state: { school } });
  };

  useEffect(() => {
    if (roles.length <= 0) {
      const user_roles = UserSession.getroles();
      setRoles(user_roles);
    }
  }, []);

  return (
    <Card className="school-card-modern">
      <div className="school-card-crest">
        <img
          src={school.crest_image_url}
          alt={school.school_name}
          className="school-crest-image"
        />
      </div>
      <Card.Body className="school-card-body-modern">
        <h2 className="school-name-modern">{school.school_name}</h2>
        <ul className="school-meta-info">
          <li className="school-meta-item">
            <i className="fas fa-graduation-cap"></i>
            {school.level_name} School
          </li>
          <li className="school-meta-item">
            <i className="fas fa-building"></i>
            {school.ownership}
          </li>
          {school.religion !== 'Other' && (
            <li className="school-meta-item">
              <i className="fas fa-church"></i>
              {school.religion}
            </li>
          )}
        </ul>
        <p className="school-description">{school.description}</p>
        <div className="school-actions">
          <button onClick={() => seeBranches(school)} className="school-action-btn school-action-btn-primary">
            <i className="fas fa-code-branch"></i>
            Branches
          </button>
          {validUser && (roles.includes('admin') || roles.includes('owner')) && (
            <button onClick={openAddBranchModal} className="school-action-btn school-action-btn-secondary">
              <i className="fas fa-plus-circle"></i>
              Add New Branch
            </button>
          )}
        </div>
        {(roles && privileged_school_roles.some(role => roles.includes(role))) && (
          <div className="school-management-links">
            {validUser && (
              <a className="school-management-link" onClick={handleEdit} style={{cursor: 'pointer'}}>
                <i className="fas fa-edit"></i>
                Edit School
              </a>
            )}
            <a className="school-management-link" onClick={handleDetails} style={{cursor: 'pointer'}}>
              <i className="fas fa-info-circle"></i>
              View Details
            </a>
            {validUser && (
              <a className="school-management-link school-management-link-delete" onClick={handleDelete} style={{cursor: 'pointer'}}>
                <i className="fas fa-trash-alt"></i>
                Delete School
              </a>
            )}
          </div>
        )}
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
  );
};

export default SchoolCard;
