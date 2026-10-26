import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { pathname } = useLocation();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="main-footer">
      <div className="upper-section section-kt">
        <div className="auto-container">
          <div className="row clearfix">
            
            {/* Footer Col 1 */}
            <div className="footer-col info-col col-lg-6 col-md-12 col-sm-12">
              <div className="inner">
                <div className="content">
                  <div className="logo">
                    <Link to="/" title="Brewocrat - Brewery Skybar & Kitchen">
                      <img src="/images/logo.png" alt="Brewocrat Logo" title="Brewocrat - Brewery Skybar & Kitchen" />
                    </Link>
                  </div>
                  <div className="info">
                    <h6>visit us </h6>
                    <ul>
                      <li>Element One, Block A, 2nd Floor, Sector 47, South City 2, Gurgaon, Haryana 122018</li>
                      <li>Daily - 12.00 PM to 1.00 AM</li>
                      <li><a href="mailto:booking@brewocrat.com">booking@brewocrat.com</a></li>
                      <li><a href="tel:+917303203535">Booking Request : +91 73032 03535 / +91 124 378 9363</a></li>
                    </ul>
                  </div>
                  {pathname !== '/' && (
                    <>
                      <div className="separator"><span> </span> </div>
                      <div className="newsletter">
                        <h4>Our Newsletter</h4>
                        <div className="text">Subscribe us & Get 25% Off on Craft Beer & Dining. Get latest updates.</div>
                        <div className="newsletter-form">
                          {subscribed ? (
                            <div style={{ color: '#CBA25A', fontSize: '14px', marginTop: '10px' }}>
                              ✓ Thank you for subscribing! Check your email for 25% off.
                            </div>
                          ) : (
                            <form onSubmit={handleSubscribe}>
                              <div className="form-group">
                                <span className="alt-icon far fa-envelope"></span>
                                <input
                                  type="email"
                                  name="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Your email"
                                  required
                                />
                                <button type="submit" className="theme-btn btn-style-one clearfix">
                                  <span className="btn-wrap">
                                    <span className="text-one">subscribe</span>
                                    <span className="text-two">subscribe</span>
                                  </span>
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Col 2 */}
            <div className="footer-col footer-image-col col-lg-3 col-md-6 col-sm-12">
              <div className="footer-image">
                <img src="/images/footer-img-1.jpg" alt="Brewocrat Ambience" />
              </div>
            </div>

            {/* Footer Col 3 */}
            <div className="footer-col footer-image-col last col-lg-3 col-md-6 col-sm-12">
              <div className="footer-image">
                <img src="/images/footer-img-2.jpg" alt="Brewocrat Craft Beer" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bottom_footer">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-5 col-md-5 col-sm-12">
              <p>© {new Date().getFullYear()} Brewocrat Services Pvt. Ltd. All Rights Reserved.</p>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-12">
              <ul className="social_media">
                <li><a href="https://www.facebook.com/brewocrat" target="_blank" rel="noreferrer" aria-label="facebook page"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li><a href="https://www.instagram.com/brewocrat" target="_blank" rel="noreferrer" aria-label="instagram page"><i className="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://www.zomato.com/ncr/brewocrat-brewery-skybar-kitchen-sector-47-gurgaon" target="_blank" rel="noreferrer" aria-label="zomato page"><i className="fa-solid fa-utensils"></i></a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <p className="developer_text">
                Designed and Developed by{' '}
                <a href="https://www.yritsolutions.com/" target="_blank" rel="noreferrer">
                  YR IT Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
