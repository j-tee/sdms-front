import React, { useContext, useEffect } from 'react'
import { Root } from 'react-dom/client'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Table } from 'react-bootstrap';
import { getSchoolList } from '../redux/slices/schoolSlice';

const SchoolSubscription = (props: any) => {
	const {schools} = useSelector((state: RootState) => state.school);
	const dispatch = useDispatch<AppDispatch>();
	const {setShowToast} = useContext(ToastContext)
	const {params, index} = props

	useEffect(() => {
		if(index === 'first'){
			setShowToast(true);
			dispatch(getSchoolList(params)).then((res: any) => {
				showToastify(res.payload.message, res.payload.status);
			}	);
		}
	}, [dispatch, params, index])
  return (
    <>
      <h1>School Subscriptions</h1>
			<Table striped size='sm' hover>
				<thead>
					<tr>
						<th>School Name</th>
						<th>Ownership Category</th>
						<th>Religious Affiliation</th>
						<th>Level</th>
						<th>Branches</th>
					</tr>
				</thead>
				<tbody>
					{schools.map((school) => (
						<tr key={school.id}>
							<td>{school.school_name}</td>
							<td>{school.ownership}</td>
							<td>{school.religion}</td>
							<td>{school.level_name}</td>
							<td>{school.number_of_branches}</td>
						</tr>
					))}
					</tbody>
				</Table>
    </>
  )
}

export default SchoolSubscription
