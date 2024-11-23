import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { GradingScale } from '../models/gradingScale';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addGradingScale, getGradingScales } from '../redux/slices/gradingScaleSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { get } from 'http';
import { Table } from 'react-bootstrap';
type AnyType = {
    [key: string]: string;
  };
const GradeScale = (props:any) => {
    const {schoolId, branchId, index} = props;
    const { gradingScales } = useSelector((state: RootState) => state.gradingScale);
    const dispatch = useDispatch<AppDispatch>();
    const { setShowToast } = useContext(ToastContext);
    const [gradingScaleData, setGradingScaleData] = useState<GradingScale>({
        branch_id: branchId,
        grade: '',
        lower_limit: 0,
        upper_limit: 0,
        remarks: '',
    });

    const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
      setGradingScaleData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(addGradingScale(gradingScaleData)).then((result) => {
        setShowToast(true);
        showToastify(result.payload.message, result.payload.status);
      });
    }

    useEffect(() => {
      if(index === 'gc'){
        dispatch(getGradingScales({branch_id: branchId})).then((result) => {
          setShowToast(true);
          showToastify(result.payload.message, result.payload.status);
        })
      }
    }, [branchId, dispatch, index, setShowToast])
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Grade Scale</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Grade</label>
                      <input type="text" className="form-control" placeholder="Grade" 
                      value={gradingScaleData.grade} 
                      onChange={(e) => handleInputChange('grade', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Lower Limit</label>
                      <input type="number" className="form-control" placeholder="Lower Limit" 
                      value={gradingScaleData.lower_limit} 
                      onChange={(e) => handleInputChange('lower_limit', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Upper Limit</label>
                      <input type="number" className="form-control" placeholder="Upper Limit" 
                      value={gradingScaleData.upper_limit} 
                      onChange={(e) => handleInputChange('upper_limit', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Remarks</label>
                      <input type="text" className="form-control" placeholder="Remarks" 
                      value={gradingScaleData.remarks} 
                      onChange={(e) => handleInputChange('remarks', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Grade</th>
          <th>Lower Limit</th>
          <th>Upper Limit</th>
          <th>Remarks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {gradingScales.map((gradingScale: GradingScale) => (
          <tr key={gradingScale.id}>
            <td>{gradingScale.grade}</td>
            <td>{gradingScale.lower_limit}</td>
            <td>{gradingScale.upper_limit}</td>
            <td>{gradingScale.remarks}</td>
            <td>
              <button className="btn btn-danger">Delete</button>
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-info">View</button>
              </td>
          </tr>
        ))}
      </tbody>  
    </Table>
    </>
  )
}

export default GradeScale