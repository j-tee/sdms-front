import React, { useContext, useEffect } from 'react'
import { ToastContext } from '../utility/ToastContext';
import UserSession from '../utility/userSession';
import { useAuth } from '../utility/AuthContext';
import BranchCard from './BranchCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Branch = () => {
  const { setShowToast } = useContext(ToastContext);
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  const { openLoginModal, closeLoginModal } = useAuth();
  const tags = ['Calendar', 'Enrolments', 'Staff', 'Dept/Programs', 'Lessons & Coursework']
  const {branches} = useSelector((state:RootState) => state.school)
  useEffect(() => {
    if(!isValid){
      openLoginModal();
    }else{
      closeLoginModal();
    }
  }, [closeLoginModal, isValid, openLoginModal])
  return (
    <div>
      {branches.map((branch, index) => {
        // Manually add tags to each school object
        const branchWithTags = { ...branch, tags };

        return (
          <BranchCard branch={branchWithTags} />
        );
      })}
    </div>
  )
}

export default Branch
