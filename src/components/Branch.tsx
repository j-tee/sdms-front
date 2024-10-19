import React, { useEffect } from 'react';
import UserSession from '../utility/userSession';
import { useAuth } from '../utility/AuthContext';
import BranchCard from './BranchCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Branch = () => {
  const isValid = UserSession.validateToken();
  const { openLoginModal, closeLoginModal } = useAuth();
  
  // Initial tags array
  let tags = ['Calendar', 'Enrolments', 'Staff', 'Organisation/Structures', 'Lessons & Coursework'];
  const { branches } = useSelector((state: RootState) => state.school);

  useEffect(() => {
    if (!isValid) {
      openLoginModal();
    } else {
      closeLoginModal();
    }
  }, [closeLoginModal, isValid, openLoginModal]);

  return (
    <div>
      {branches.map((branch, index) => {
        // Manually add tags to each school object
        const branchWithTags = { ...branch, tags };

        return (
          <BranchCard key={index} branch={branchWithTags} />
        );
      })}
    </div>
  );
};

export default Branch;
