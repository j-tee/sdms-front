import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-modern">
      <Container>
        <Row className="footer-content">
          <Col lg={4} md={6} className="footer-column">
            <div className="footer-brand">
              <h3 className="footer-brand-name">Alpha Logique</h3>
              <p className="footer-brand-tagline">Empowering Education</p>
              <p className="footer-description">
                Comprehensive school management system designed to streamline operations 
                and enhance the educational experience for schools, teachers, and students.
              </p>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="footer-column">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/schools">Schools</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/sorting">Contact</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="footer-column">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><Link to="#">Documentation</Link></li>
              <li><Link to="#">API Reference</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="footer-column">
            <h4 className="footer-title">Connect With Us</h4>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="footer-contact">
              <p><i className="fas fa-envelope"></i> info@alphalogique.com</p>
              <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
            </div>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="footer-copyright">
                &copy; {new Date().getFullYear()} Alpha Logique. All Rights Reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="footer-bottom-links">
                <Link to="#">Privacy</Link>
                <span className="separator">|</span>
                <Link to="#">Terms</Link>
                <span className="separator">|</span>
                <Link to="#">Sitemap</Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
