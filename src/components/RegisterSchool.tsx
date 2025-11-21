import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Image, Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../utility/AuthContext';
import UserSession from '../utility/userSession';
import { AppDispatch, RootState } from '../redux/store';
import { School } from '../models/school';
import { registerSchool } from '../redux/slices/schoolSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { useNavigate } from 'react-router-dom';
import SchoolDropdowns from './SchoolDropdowns';
import Header from './Header';

const RegisterSchool = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { openLoginModal, closeLoginModal } = useAuth();
  const { setShowToast } = useContext(ToastContext);
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  const navigate = useNavigate()

  type AnyType = {
    [key: string]: string;
  };

  const [schoolData, setSchoolData] = useState<School>({
    level_id: 0,
    category_id: 0,
    religious_affiliation_id: 0,
    ownership_category_id: 0,
    school_name: '',
    crest_image: null,
    background_picture_image: null,
  });

  const [crestImagePreview, setCrestImagePreview] = useState<string | null>(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null);

  // const handleInputChange = (field: keyof School, value: string) => {
  //   setSchoolData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };


  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setSchoolData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (field: keyof School, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files.length > 0 ? (e.target.files[0] as File) : null;
    if (file && file.size > 5120) {
      showToastify("Image size should not exceed 5KB. Visit 'https://image.pi7.org/compress-image-to-20kb' to resize your image", 'error');
      return;
    }
    
    setSchoolData((prevData) => ({
      ...prevData,
      [field]: file // Assuming you want to store the filename
    }));

    // Optionally, preview the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (field === 'crest_image') {
          setCrestImagePreview(reader.result as string);
        } else if (field === 'background_picture_image') {
          setBackgroundImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowToast(true);

    const school = new FormData();

    // Append regular fields
    for (const key in schoolData) {
      if (schoolData.hasOwnProperty(key)) {
        if (key !== 'crest_image' && key !== 'background_picture_image') {
          school.append(`school[${key}]`, (schoolData as any)[key]);
        }
      }
    }

    // Append files
    if (schoolData.crest_image instanceof File) {
      school.append('school[crest_image]', schoolData.crest_image);
    }

    if (schoolData.background_picture_image instanceof File) {
      school.append('school[background_picture_image]', schoolData.background_picture_image);
    }

    try {
      if (isValid) {
        dispatch(registerSchool(school)).then((res)=>{
          if (res.meta.requestStatus === 'fulfilled') {
            showToastify('Congratulations!! Your school has been duly registered with us', 'success');
            setTimeout(() => {
              navigate('/schools')
            }, 3000);
          } else if (res.meta.requestStatus === 'rejected') {
            showToastify(`Registration failed ${res}`, 'error');
          }
        })

       
      } else {
        showToastify(`Session is expired! Please relogin`, 'information');
        navigate('/')
        openLoginModal && openLoginModal();
      }
    } catch (error) {
      console.error('Error during registration:', error);
      showToastify('An error occurred during registration', 'error');
    }
  };

  return (
    <Container>
      <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Card className='m-2'>
          <Card.Header><h2>Register School</h2></Card.Header>
          <Card.Body>
          <Row>
                <Col md={6}>

                  <Form.Group controlId="crestImage" className='d-flex flex-column gap-1'>
                    <Form.Label>School Crest</Form.Label>
                    <span>
                      {crestImagePreview && <Image src={crestImagePreview} alt="Crest Preview" thumbnail
                        style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                    </span>
                    <Form.Control style={{ maxWidth: '100px' }}
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleFileChange('crest_image', e)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="backgroundPictureImage" className='d-flex flex-column gap-1'>
                    <Form.Label>Background Picture</Form.Label>
                    {backgroundImagePreview && (
                      <Image src={backgroundImagePreview} alt="Background Preview" thumbnail
                        style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    )}
                    <Form.Control style={{ maxWidth: '100px' }}
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleFileChange('background_picture_image', e)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr className="solid" />
              <Row>
                <Col md={12}>
                  <Form.Group controlId="schoolName">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={schoolData.school_name}
                      onChange={(e) => handleInputChange('school_name', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <SchoolDropdowns onChange={handleInputChange} />
              </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
};

export default RegisterSchool;
