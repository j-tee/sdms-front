import React, { useEffect } from 'react'
import { useAuth } from '../utility/AuthContext';
import UserSession from '../utility/userSession';

const Home = () => {
  const { openLoginModal, closeLoginModal } = useAuth();
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  useEffect(() => {
    if(userInfo.userCategory){
      if (isValid) {
        closeLoginModal && closeLoginModal();
      } else {
        openLoginModal && openLoginModal();
      }
    }
  }, [closeLoginModal, isValid, openLoginModal, userInfo])
  return (
    <section className=" slider_section position-relative">
      <div className="container">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <ol className="carousel-indicators">
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      Welcome to Data Logique  <br />
                      <span>
                        Empowering Schools, One Subscription at a Time
                      </span>
                    </h1>
                    <p>
                      Join a community of schools that have chosen [Your Platform Name] for their management needs. We're committed to providing a seamless and efficient experience for all our subscribers.
                    </p>

                    <div className="btn-box">
                      <a href="htps:" className="btn-1">
                        Read More
                      </a>
                      <a href="htps:" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      Manage Attendance Effortlessly <br />
                      <span>
                        with Data Logique
                      </span>
                    </h1>
                    <p>
                      Track student attendance, generate reports, and streamline administrative tasks with our user-friendly application
                    </p>
                    <div className="btn-box">
                      <a href="htps:" className="btn-1">
                        Read More
                      </a>
                      <a href="htps:" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      Subscribe for free!! <br />
                      <span>
                        And Unleash Your full potential
                      </span>
                    </h1>
                    <p>
                      Are you a school owner  or do you manage a school? Worried about the high cost of available systems for managing your school?
                      Subscribe to Data Logique to access exclusive features, priority support, and regular updates. Elevate your school management experience with a subscription that grows with your needs.
                    </p>
                    <div className="btn-box">
                      <a href="htps:" className="btn-1">
                        Read More
                      </a>
                      <a href="htps:" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      A Perfect Solution <br />
                      <span>
                        For School Management
                      </span>
                    </h1>
                    <p>
                      It is a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum is that it has a more-or-less
                      normal distribution of letters, as
                    </p>
                    <div className="btn-box">
                      <a href="htps:" className="btn-1">
                        Read More
                      </a>
                      <a href="htps:" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      Find the perfect school  <br />
                      <span>
                        For Your Kids
                      </span>
                    </h1>
                    <p>
                      Are you a parent? Have just moved into a new area or town? Are looking for a school for your kids?
                      Browse through our directory of school. Check out data on academic performance and facilities.
                      You a find student teacher ratio and class capacity all made available on the platform
                    </p>
                    <div className="btn-box">
                      <a href="htps:" className="btn-1">
                        Read More
                      </a>
                      <a href="htps:" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
