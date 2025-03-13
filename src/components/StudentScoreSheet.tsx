import { Card, Badge, ProgressBar } from "react-bootstrap";
import { CheckCircle, ExclamationTriangle, Star } from "react-bootstrap-icons";

const getPerformanceBadge = (percentage: number) => {
  if (percentage >= 80) return { badge: <Badge bg="success"><Star /> Outstanding</Badge>, color: "success" };
  if (percentage >= 60 && percentage <= 79.99) return { badge: <Badge bg="primary"><CheckCircle /> Good</Badge>, color: "primary" };
  if (percentage >= 50 && percentage <= 59.99) return { badge: <Badge bg="warning"><ExclamationTriangle /> Needs Improvement</Badge>, color: "warning" };
  return { badge: <Badge bg="danger"><ExclamationTriangle /> Below Average</Badge>, color: "danger" };
};


const StudentScoreSheet = (props: any) => {
  const { score } = props;
  const { badge, color } = getPerformanceBadge(score.percentage_score);
  return (
    <div className="score-container">
      <Card className="mb-3 shadow-sm animated-card">
        <Card.Body>
          <div className="score-header">
            <h2 className="subject-name">{score.subject_name}</h2>
            <h5 className="assessment-name">{score.assessment_id} {score.assessment_name}</h5>
            {badge}
          </div>
          <p className="category-date">
            <strong>Category:</strong> {score.category === 'TA' ? 'Terminal Assessment' : 'Continuous Assessment'} | 
            <strong> Date:</strong> {score.assessment_date}
          </p>
          
          <div className="score-details">
            <span><strong>Base Mark:</strong> {score.base_mark}</span>
            <span><strong>Pass Mark:</strong> {score.pass_mark}</span>
            <span><strong>Score:</strong> {score.score}</span>
          </div>

          <div className="progress-section">
            <strong>Performance:</strong>
            <ProgressBar now={score.percentage_score} label={`${parseFloat(score.percentage_score).toFixed(2)}%`} variant={color} />
          </div>

          <div className="remarks-section">
            <h6>Teacher's Remarks:</h6>
            <p className="remarks">{score.remarks}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentScoreSheet;
