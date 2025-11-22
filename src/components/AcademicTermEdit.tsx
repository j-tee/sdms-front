import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { AcademicTerm } from "../models/calendar";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { ToastContext } from "../utility/ToastContext";
import { showToastify } from "../utility/Toastify";
import {
  getAcademicTerms,
  updateAcademicTerm,
} from "../redux/slices/calendarSlice";
import CustomDatePicker from './CustomDatePicker';
import '../css/ModernModal.css';

const AcademicTermEdit = (props: any) => {
  const {
    term,
    schoolId,
    branchId,
    isOpen,
    params,
    onRequestClose,
    setAcademicTermEditModalOpen,
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<AcademicTerm>({
    term_name: term.term_name,
    start_date: term.start_date,
    end_date: term.end_date,
    completed: term.completed,
    academic_year_id: term.academic_year_id,
    next_term_start_date: term.next_term_start_date,
  });
  const addUpdateTerm = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const academic_term: AcademicTerm = {
      id: term.id,
      term_name: formData.term_name,
      start_date: formData.start_date,
      end_date: formData.end_date,
      completed: formData.completed,
      academic_year_id: formData.academic_year_id,
      next_term_start_date: formData.next_term_start_date,
    };

    dispatch(updateAcademicTerm(academic_term)).then((res: any) => {
      setShowToast(true);
      showToastify(res.payload.message, res.payload.status);
      if (res.payload.status === "success") {
        dispatch(
          getAcademicTerms({
            ...params,
            year_id: formData.academic_year_id,
            pagination: params.pagination,
          })
        ).then((resp: any) => {
          setAcademicTermEditModalOpen(false);
        });
      }
    });
    setAcademicTermEditModalOpen(false);
  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      term_name: term.term_name,
      start_date: term.start_date,
      end_date: term.end_date,
      completed: term.completed,
      academic_year_id: term.academic_year_id,
      next_term_start_date: term.next_term_start_date,
    }));
  }, [term, params]);
  return (
    <Modal animation show={isOpen} centered onHide={onRequestClose} size="lg" className="modern-modal edit-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-calendar-check"></i>
          Edit Term: {term.term_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
              <Row className="d-flex flex-column flex-lg-row">
                <Col>
                  <Form.Group controlId="termName">
                    <Form.Label>Term/Sem</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.term_name}
                      onChange={(e) =>
                        setFormData({ ...formData, term_name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <CustomDatePicker
                      value={formData.start_date}
                      onChange={(date) =>
                        setFormData({ ...formData, start_date: date })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <CustomDatePicker
                      value={formData.end_date}
                      onChange={(date) =>
                        setFormData({ ...formData, end_date: date })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="nextTermStartDate">
                    <Form.Label>Next Term Start Date</Form.Label>
                    <CustomDatePicker
                      value={formData.next_term_start_date}
                      onChange={(date) =>
                        setFormData({
                          ...formData,
                          next_term_start_date: date,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={addUpdateTerm}>
          <i className="fas fa-save"></i>
          Update Term
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcademicTermEdit;
