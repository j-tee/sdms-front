import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const StudentRegistration = (props: any) => {
    
    const { schoolId, branchId, tabIndex } = props;
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        other_names: '',
        nationality: '',
        parent_id: '',
        student_id: '',
      });
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
        // Handle form submission logic here
      };
    
    return (
        <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="birth_date">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type="text"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="other_names">
                <Form.Label>Other Names</Form.Label>
                <Form.Control
                  type="text"
                  name="other_names"
                  value={formData.other_names}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="parent_id">
                <Form.Label>Parent ID</Form.Label>
                <Form.Control
                  type="text"
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="student_id">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
    )
}

export default StudentRegistration
