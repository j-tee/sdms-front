import { Form } from 'react-bootstrap'
import { QueryParams } from '../models/queryParams';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type AnyType = {
    [key: string]: string;
  };
  interface SubjectDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    branchId: number;
    schoolId: number;
    params: QueryParams;
  }
const SubjectDropDown:React.FC<SubjectDropDownProps> = ({ onChange, branchId, schoolId, params}) => {
    const { subjects} = useSelector((state: RootState) => state.subject)  
    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const selectedSubjectId = e.target.value;
        onChange('subject_id', selectedSubjectId);
      };
  return (
    <Form.Group controlId="department">
    <Form.Label>Subjects</Form.Label>
    <Form.Control as="select" onChange={handleInputChange} value={params.subject_id}>
      <option value="">---Select---</option>
      {subjects.map((subject) => (<option key={subject.id} value={subject.id}>
        {subject.subject_name}
      </option>
      ))}
    </Form.Control>
  </Form.Group>
  )
}

export default SubjectDropDown
