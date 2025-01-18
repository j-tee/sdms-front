import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Modal, Image, Row } from 'react-bootstrap'
import { School } from '../models/school';
import SchoolDropdowns from './SchoolDropdowns';
import UserSession from '../utility/userSession';
import { ToastContext } from '../utility/ToastContext';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { showToastify } from '../utility/Toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utility/AuthContext';
import { getSchools, updateSchool } from '../redux/slices/schoolSlice';

const SchoolEdit = (props: any) => {
  const { school, params, isOpen, onRequestClose, setSchoolEditModalOpen } = props
  const isValid = UserSession.validateToken();
  const { setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>();
  const [crestImagePreview, setCrestImagePreview] = useState<string | null>();
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>();
  const navigate = useNavigate()
  const { openLoginModal, closeLoginModal } = useAuth();
  const [schoolData, setSchoolData] = useState<School>({
    id: school.id,
    level_id: school.level_id,
    category_id: school.category_id,
    religious_affiliation_id: school.religious_affiliation_id,
    ownership_category_id: school.ownership_category_id,
    school_name: school.school_name,
    crest_image: school.crest_image,
    background_picture_image: school.background_picture_image,
  });

  useEffect(() => {
    setCrestImagePreview(school.crest_image_url)
    setBackgroundImagePreview(school.bg_image_url)
    setSchoolData((prevData) => ({
      ...prevData,
      id: school.id,
      level_id: school.level_id,
      category_id: school.category_id,
      religious_affiliation_id: school.religious_affiliation_id,
      ownership_category_id: school.ownership_category_id,
      school_name: school.school_name,
      crest_image: school.crest_image,
      background_picture_image: school.background_picture_image,
    }))
  }, [school, params])

  type AnyType = {
    [key: string]: string;
  };

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setSchoolData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (field: keyof School, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files.length > 0 ? (e.target.files[0] as File) : null;
if (file && file.size > 102400) {
      showToastify('Image size should not exceed 100KB', 'error');
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
        dispatch(updateSchool(school)).then((response) => {
          setShowToast(true);
          showToastify(response.payload.message, response.payload.status);
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
    
      <Modal show={isOpen} onHide={onRequestClose} centered animation size='lg'>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Edit: {school.school_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
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
          <Row>
            <Col className='my-2'>
              
            </Col>
          </Row>          
        </Modal.Body>
        <Modal.Footer>
        <button className='btn btn-primary' type='submit'>Update</button>
        </Modal.Footer>
        </Form>
      </Modal>
  )
}

export default SchoolEdit
