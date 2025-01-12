import React, { useContext, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../utility/ToastContext";
import { getSubscriptions } from "../redux/slices/subscriptionSlice";
import { showToastify } from "../utility/Toastify";
import { Form, Table } from "react-bootstrap";
import { getSchoolList } from "../redux/slices/schoolSlice";
type AnyType = {
  [key: string]: string;
};
const ParentSubscription = (props: any) => {
  const { subscriptions } = useSelector(
    (state: RootState) => state.subscription
  );
  const { schools } = useSelector((state: RootState) => state.school);
  const dispatch = useDispatch<AppDispatch>();
  const { params, index } = props;
  const { setShowToast } = useContext(ToastContext);

  useEffect(() => {
    if (index === "second") {
      setShowToast(true);
      dispatch(getSchoolList({ ...params, paginate: false }));
      dispatch(getSubscriptions(params)).then((res: any) => {
        showToastify(res.payload.message, res.payload.status);
      });
    }
  }, [dispatch, params, index]);
  const handleInputChange = <T extends AnyType>(
    field: keyof T,
    value: string
  ) => {
    dispatch(getSubscriptions({ ...params, [field]: value })).then(
      (res: any) => {
        showToastify(res.payload.message, res.payload.status);
      }
    );
  };
  return (
    <>
      <Form>
        <Form.Group controlId="schoolId">
          <Form.Label>Schools</Form.Label>
          <Form.Select
            as="select"
            onChange={(e) => handleInputChange("school_id", e.target.value)}
          >
            <option value="">-----Select School----</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.school_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <Table striped size="sm" hover>
        <thead>
          <tr>
            <th>Parent</th>
            <th>Student</th>
            <th>Fee</th>
            <th>Taxes</th>
            <th>Amount Due</th>
            <th>Status</th>
            <th>Expiration</th>
            <th>Validity</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td>{subscription.parents_info}</td>
              <td>{subscription.student_name}</td>
              <td>{subscription.fee}</td>
              <td>{subscription.taxes}</td>
              <td>{subscription.amt_due}</td>
              <td>{subscription.status}</td>
              <td>{subscription.exp_date}</td>
              <td>{subscription.valid_subscription}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ParentSubscription;
