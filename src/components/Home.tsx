import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './Header';
import './Home.css';

const Home = () => {
 
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-decoration">
          <img src="/images/cap.jpg" alt="" className="floating-cap floating-cap-1" />
          <img src="/images/cap.jpg" alt="" className="floating-cap floating-cap-2" />
          <img src="/images/cap.jpg" alt="" className="floating-cap floating-cap-3" />
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
        <Container className="hero-content">
          <Row className="align-items-center min-vh-80">
            <Col lg={6} className="hero-text">
              <div className="hero-badge">
                <span className="badge-icon">🎓</span>
                <span>Welcome to Alpha Logique</span>
              </div>
              <h1 className="hero-title">
                Empowering Schools <br />
                <span className="gradient-text">One Subscription at a Time</span>
              </h1>
              <p className="hero-description">
                Join a community of forward-thinking schools that have chosen Alpha Logique 
                for their management needs. Experience seamless operations with our 
                comprehensive, cloud-based platform.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary-modern">
                  Get Started Free
                  <span className="btn-arrow">→</span>
                </button>
                <button className="btn-secondary-modern">
                  Watch Demo
                  <span className="play-icon">▶</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Schools</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Students</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <div className="hero-illustration">
                <div className="hero-cap-showcase">
                  <img src="/images/cap.jpg" alt="Academic Excellence" className="main-cap-image" />
                  <div className="cap-glow"></div>
                </div>
                <div className="floating-card card-1">
                  <div className="card-icon">📊</div>
                  <div className="card-text">Real-time Analytics</div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">✅</div>
                  <div className="card-text">Attendance Tracking</div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">📚</div>
                  <div className="card-text">Academic Management</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-decoration">
          <div className="decoration-cap cap-left">
            <img src="/images/cap.jpg" alt="" />
          </div>
          <div className="decoration-cap cap-right">
            <img src="/images/cap.jpg" alt="" />
          </div>
        </div>
        <Container>
          <div className="section-header">
            <span className="section-tag">FEATURES</span>
            <h2 className="section-title">Everything Your School Needs</h2>
            <p className="section-description">
              Comprehensive tools designed to streamline every aspect of school management
            </p>
          </div>
          
          <Row className="g-4">
            <Col lg={4} md={6}>
              <Card className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">📋</div>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Attendance Management</h3>
                  <p className="feature-description">
                    Track student attendance effortlessly with automated reports 
                    and real-time notifications for parents.
                  </p>
                  <a href="#" className="feature-link">
                    Learn more <span>→</span>
                  </a>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card featured">
                <div className="popular-badge">Most Popular</div>
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">💰</div>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Finance & Billing</h3>
                  <p className="feature-description">
                    Manage fees, payments, and financial records with our 
                    integrated billing system and detailed reports.
                  </p>
                  <a href="#" className="feature-link">
                    Learn more <span>→</span>
                  </a>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">📊</div>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Academic Analytics</h3>
                  <p className="feature-description">
                    Make data-driven decisions with comprehensive analytics 
                    and performance insights.
                  </p>
                  <a href="#" className="feature-link">
                    Learn more <span>→</span>
                  </a>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">👨‍🏫</div>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Staff Management</h3>
                  <p className="feature-description">
                    Coordinate teachers, administrators, and support staff 
                    with role-based access control.
                  </p>
                  <a href="#" className="feature-link">
                    Learn more <span>→</span>
                  </a>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🔔</div>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Parent Communication</h3>
                  <p className="feature-description">
                    Keep parents informed with instant notifications, 
                    progress reports, and direct messaging.
                  </p>
                  <a href="#" className="feature-link">
                    Learn more <span>→</span>
                  </a>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">📱</div>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Mobile Access</h3>
                  <p className="feature-description">
                    Access your school data anywhere, anytime with our 
                    responsive web application.
                  </p>
                  <a href="#" className="feature-link">
                    Learn more <span>→</span>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-decoration">
          <img src="/images/cap.jpg" alt="" className="cta-cap-1" />
          <img src="/images/cap.jpg" alt="" className="cta-cap-2" />
        </div>
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h2 className="cta-title">Ready to Transform Your School?</h2>
              <p className="cta-description">
                Join hundreds of schools already using Alpha Logique. 
                Start your free trial today—no credit card required.
              </p>
            </Col>
            <Col lg={5} className="text-lg-end">
              <button className="btn-cta-primary">
                Start Free Trial
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-cta-secondary">
                Schedule Demo
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
    
  )
}

export default Home
