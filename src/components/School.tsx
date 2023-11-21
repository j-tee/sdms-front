import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import UserSession from '../utility/userSession';
import { useAuth } from '../utility/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getCategories, getLevels, getOwnershipCategories, getReligiousAffiliation, getSchools } from '../redux/slices/schoolSlice';
import { SchoolParams } from '../models/school';

const School = () => {
  const { setShowToast } = useContext(ToastContext);
  const { schools, levels, religions, categories, ownershipCategories, isLoading } = useSelector((state: RootState) => state.school)
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  const { openLoginModal, closeLoginModal } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const [params, setParams] = useState<SchoolParams>({
    level:'',
    category: '',
    ownership_category: '',
    religious_affiliation: '',
    region_id: 0,
    district_id: 0,
    circuit_id: 0,
    user_id: 0,
    parent_id: 0,
    student_id: 0,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0,
    }
  })
 
  const getAllSchools = () => {
    dispatch(getSchools(params))
  }
 
  return (
    <div>

    </div>
  )
}

export default School
