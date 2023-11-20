import React, { useContext, useEffect } from 'react'
import { ToastContext } from '../utility/ToastContext';
import UserSession from '../utility/userSession';
import { useAuth } from '../utility/AuthContext';

const Branch = () => {
  const { setShowToast } = useContext(ToastContext);
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  const { openLoginModal, closeLoginModal } = useAuth();


  useEffect(() => {
    if(!isValid){
      openLoginModal();
    }else{
      closeLoginModal();
    }
  }, [closeLoginModal, isValid, openLoginModal])
  return (
    <div>
      
    </div>
  )
}

export default Branch
