import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Button, Image, Card, Col, Form, Row } from 'react-bootstrap'
import { getParentByEmail } from '../redux/slices/parentSlice'
import { showToastify } from '../utility/Toastify'
import { ToastContext } from '../utility/ToastContext'
import { addStudent, getCountries } from '../redux/slices/studentSlice'
import { Student, StudentViewModel, country } from '../models/student'
import { ParentViewModel } from '../models/parent'

const StudentDetails = (props: any) => {
  const { index, schoolId, branchId } = props;
  const { parent, message, status, myWards } = useSelector((state: RootState) => state.parent)
  const [parentInfo, setParentInfo] = useState<ParentViewModel>({})
  const { student, countries, std_message, std_status } = useSelector((state: RootState) => state.student)
  const [studentImagePreview, setStudentImagePreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [email, setEmail] = useState('')
  const [studentId, setStudentId] = useState('')
  const [formData, setFormData] = useState<Student>({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    other_names: '',
    nationality: '',
    parent_id: 0,
    student_id: '',
    avatar: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const student = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key !== 'avatar') {
          student.append(`student[${key}]`, (formData as any)[key]);
        }
      }
    }
    if (parent && parent.id) {
      student.append('student[parent_id]', (parent?.id?.toString() || parentInfo.id?.toString() || ''));
      student.append('student[student_id]', studentId);
    }

    if (formData.avatar instanceof File) {
      student.append('student[avatar]', formData.avatar);
    }
    dispatch(addStudent(student)).then((res: any) => {
      sessionStorage.setItem('student', JSON.stringify(res.payload.student))
      sessionStorage.removeItem('parent')
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
    })
  };
  const generateStudentId = (parentId: string) => {
    // Get current timestamp in milliseconds
    const timestamp = Date.now().toString();
  
    // Dynamically determine the length of the timestamp part
    const timestampPartLength = 12 - parentId.length;
    const timestampPart = timestamp.slice(-timestampPartLength);
  
    // Use the parentId as is, or trim/pad it to fit the remaining length
    const parentPart = parentId.padStart(12 - timestampPart.length, '0').slice(0, 12 - timestampPartLength);
  
    // Combine both parts to create a 12-character ID
    const studentId = `${parentPart}${timestampPart}`;
    return studentId;
  };
   
  
  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files.length > 0 ? (e.target.files[0] as File) : null;

    setFormData((prevData) => ({
      ...prevData,
      [field]: file // Assuming you want to store the filename
    }));

    // Optionally, preview the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStudentImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const getParent = (email: string) => {
    setEmail(email);  // Assuming you have a state variable setEmail for storing the email
    dispatch(getParentByEmail(encodeURIComponent(email)))
      .then((res: any) => {

        setShowToast(true);
        showToastify(message, status);
      })
  }
  useEffect(() => {
    if(!studentId){
      setStudentId(parent.id ? generateStudentId(parent.id.toString()) : '');
    }
  }, [studentId, myWards])

  useEffect(() => {
    // setParentInfo(JSON.parse(sessionStorage.getItem('parent') || '{}'));
    let parsedParentData = {};

    try {
      // Attempt to parse the data from sessionStorage
      const parentData = sessionStorage.getItem('parent');
      parsedParentData = parentData ? JSON.parse(parentData) : {};
    } catch (error) {
      console.error("Failed to parse 'parent' data from sessionStorage:", error);
      // If parsing fails, fall back to an empty object
      parsedParentData = {};
    }

    // Set the parent info
    setParentInfo(parsedParentData);


    dispatch(getCountries())
  }, [dispatch])
  // useEffect(() => {
  //   if (index === 'student') {
  //     // setStudentId(getNextStudentId(myWards))
  //   }
  // }, [index, setShowToast, std_message, std_status])
  return (
    <Card>
      <Card.Header className='fs-2'>
        Student Details
      </Card.Header>
      <Card.Body>
        {(parent?.id ?? 0) > 0 &&
          <Card.Title className='d-flex fs-5 flex-lg-row flex-column gap-1 justify-content-center'>
            <span>PARENT ID: {parent?.id}</span>
          </Card.Title>
        }
        {(parent?.id ?? 0) > 0 &&
          <Card.Title className='d-flex fs-5 flex-lg-row flex-column gap-1 justify-content-center'>
            <span>{parent?.fathers_full_name}</span>
            <span className='d-none d-lg-inline'>|</span>
            <span>{parent?.mothers_full_name}</span>
            <span className='d-none d-lg-inline'>|</span>
            <span>{parent?.fathers_contact_number}</span>
            <span className='d-none d-lg-inline'>|</span>
            <span>{parent?.fathers_email_address}</span>
            <span className='d-none d-lg-inline'>|</span>
            <span>{parent?.mothers_email_address}</span>
          </Card.Title>}
       {(parent?.id ?? 0) > 0 && <Card.Title className='d-flex flex-lg-row flex-column gap-2 justify-content-center'>
          <span>Children/Wards</span>
        </Card.Title>}
        <Card.Subtitle className='d-flex flex-lg-row flex-column gap-2 justify-content-center'>
          {myWards.map((ward: StudentViewModel) => (
            <span key={ward.id}>{ward.student_id} {ward.first_name} {ward.last_name}</span>
          ))}
        </Card.Subtitle>
        {!parent?.fathers_email_address && (
          <Row className='my-3 d-flex flex-row justify-content-center'>
            <Col>
              <Form>
                <Form.Group className='d-flex flex-lg-row flex-column justify-content-center gap-3'>
                  <Form.Label>Find Parent</Form.Label>
                  <Form.Control
                    value={parentInfo ? parentInfo.fathers_email_address : ''}
                    style={{ width: '70%' }}
                    placeholder='Enter parent email address'
                    type='text'
                    // onFocus={(e) => getParent(e.target.value)}
                    onBlur={(e) => getParent(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        )}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="crestImage" className='d-flex flex-column gap-1'>
                <Form.Label>Passport Picture</Form.Label>
                <span>
                  {studentImagePreview && <Image src={studentImagePreview} alt="Student Preview" thumbnail
                    style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                </span>
                <Form.Control style={{ maxWidth: '100px' }}
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFileChange('avatar', e)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='d-flex flex-lg-row flex-column'>
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

          <Row className='d-flex flex-lg-row flex-column'>
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
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as='select'
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}>
                    <option value={''}>---Select Gender</option>
                  <option value={'Male'}>Male</option>
                  <option value={'Female'}>Female</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <Form.Group controlId="birth_date">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control as={'select'}
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                >
                  <option value={''}>---Select---</option>
                  {countries && countries.map((country: country) => (
                    <option value={country.name}>{country.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <Form.Group controlId="parent_id">
                {/* <Form.Label>Parent ID:{parent?.id}</Form.Label> */}
                <Form.Control
                  type="hidden"
                  name="parent_id"
                  value={parent?.id}
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
                  value={studentId}
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

export default StudentDetails
