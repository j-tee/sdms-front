import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap';

const BranchDetails = (props: any) => {
  const { branch, isOpen, onRequestClose, setBranchDetailsModalOpen } = props;
  
  const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <div className="detail-row">
      <div className="detail-label">
        <i className={`fas ${icon} me-2`}></i>
        {label}
      </div>
      <div className="detail-value">{value || 'N/A'}</div>
    </div>
  );

  return (
    <Modal show={isOpen} centered animation onHide={onRequestClose} size='lg' className="branch-details-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center">
          <i className="fas fa-building me-3 text-primary"></i>
          <div>
            <h5 className="mb-0">{branch.branch_name}</h5>
            <small className="text-muted">{branch.school_name}</small>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <div className="branch-details-content">
          {/* School Information Section */}
          <div className="details-section mb-4">
            <h6 className="section-title">
              <i className="fas fa-info-circle me-2"></i>
              School Information
            </h6>
            <DetailRow icon="fa-building" label="School Name" value={branch.school_name} />
            <DetailRow icon="fa-code-branch" label="Branch Name" value={branch.branch_name} />
            <DetailRow icon="fa-tag" label="Category" value={branch.category_name} />
            <DetailRow icon="fa-shield-alt" label="Ownership Category" value={branch.ownership} />
          </div>

          {/* Contact Information Section */}
          <div className="details-section mb-4">
            <h6 className="section-title">
              <i className="fas fa-address-card me-2"></i>
              Contact Information
            </h6>
            <DetailRow icon="fa-envelope" label="Email Address" value={branch.email_address} />
            <DetailRow icon="fa-phone" label="Phone 1" value={branch.phone1} />
            <DetailRow icon="fa-phone-alt" label="Phone 2" value={branch.phone2} />
            <DetailRow icon="fa-globe" label="Website" value={branch.website} />
          </div>

          {/* Address Information Section */}
          <div className="details-section">
            <h6 className="section-title">
              <i className="fas fa-map-marker-alt me-2"></i>
              Address Information
            </h6>
            <DetailRow icon="fa-home" label="Residential Address" value={branch.residential_address} />
            <DetailRow icon="fa-mailbox" label="Postal Address" value={branch.postal_address} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <button 
          className="btn btn-primary px-4" 
          onClick={() => setBranchDetailsModalOpen(false)}
        >
          <i className="fas fa-times me-2"></i>
          Close
        </button>
      </Modal.Footer>
      
      <style>{`
        .branch-details-modal .modal-content {
          border: none;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .branch-details-modal .modal-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 16px 16px 0 0;
          padding: 1.5rem;
        }

        .branch-details-modal .modal-header .btn-close {
          filter: brightness(0) invert(1);
          opacity: 0.8;
        }

        .branch-details-modal .modal-header .btn-close:hover {
          opacity: 1;
        }

        .branch-details-modal .modal-title {
          width: 100%;
        }

        .branch-details-modal .modal-title h5 {
          font-weight: 600;
          font-size: 1.25rem;
        }

        .branch-details-modal .modal-title small {
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.875rem;
        }

        .branch-details-modal .modal-title i {
          font-size: 2rem;
          opacity: 0.9;
        }

        .branch-details-content {
          padding: 0.5rem 0;
        }

        .details-section {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.25rem;
        }

        .section-title {
          color: #667eea;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e9ecef;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e9ecef;
        }

        .detail-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-label {
          font-weight: 600;
          color: #495057;
          font-size: 0.9rem;
          flex: 0 0 40%;
          display: flex;
          align-items: center;
        }

        .detail-label i {
          color: #667eea;
          font-size: 0.875rem;
          width: 20px;
        }

        .detail-value {
          color: #212529;
          font-size: 0.9rem;
          flex: 0 0 58%;
          text-align: right;
          word-break: break-word;
        }

        .branch-details-modal .modal-footer {
          background: #f8f9fa;
          border-radius: 0 0 16px 16px;
          padding: 1rem 1.5rem;
        }

        .branch-details-modal .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .branch-details-modal .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 991px) {
          .detail-row {
            flex-direction: column;
            gap: 0.5rem;
          }

          .detail-label,
          .detail-value {
            flex: 1 1 100%;
            text-align: left;
          }
        }
      `}</style>
    </Modal>
  )
}

export default BranchDetails
