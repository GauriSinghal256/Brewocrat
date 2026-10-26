import React, { useState } from 'react';
import {
  TextReveal,
  FadeLeft,
  FadeRight,
  ImageShineReveal,
  ScaleReveal
} from '../components/AnimatedComponents';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Inner Banner */}
      <section className="inner-banner">
        <div className="image-layer" style={{ backgroundImage: "url('https://b.zmtcdn.com/data/reviews_photos/fcd/3221cf45ce8dc3f068c63b448a12efcd_1629299546.jpg?output-format=webp')" }}></div>
        <div className="auto-container">
          <TextReveal className="inner">
            <h1>Contact Us</h1>
            <div className="sub_text">
              <p>Brewocrat - Brewery Skybar & Kitchen | <span className="primary-color">Sector 47, Gurgaon</span></p>
            </div>
          </TextReveal>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-page section-kt">
        <div className="auto-container">
          <div className="c-page-form-box">
            <div className="row clearfix">
              
              {/* Form Image & Location Section */}
              <FadeLeft className="loc-block info-block col-lg-5 col-md-12 col-sm-12">
                <ImageShineReveal className="contact-image rounded-xl overflow-hidden shadow-2xl mb-4">
                  <img src="https://b.zmtcdn.com/data/reviews_photos/fcd/3221cf45ce8dc3f068c63b448a12efcd_1629299546.jpg?output-format=webp" alt="Brewocrat Gurgaon" className="w-full h-auto object-cover" />
                </ImageShineReveal>
                <h5> Visit Brewocrat </h5>
                <div className="text">
                  2nd Floor, Element One, Block A, Lower Terrace, Sector 47, South City 2, Gurgaon, Haryana 122018 <br /> <br />
                  <span className="c-info-ttl"> Opening Hours </span> - 12:00 PM – 01:00 AM Daily <br />
                  <span className="c-info-ttl"> Average Cost for Two </span> - ₹2,000 – ₹2,500 (approx. with alcohol) <br /> <br />
                  <span className="more-link"> Phone : <a href="tel:+917303203535">+91 73032 03535</a> / <a href="tel:+911243789363">+91 124 378 9363</a> </span> <br />
                  <span className="more-link"> Email: <a href="mailto:booking@brewocrat.com">booking@brewocrat.com</a></span>
                </div>
              </FadeLeft>

              {/* Vertical line */}
              <div className="col-12 col-md-1 d-flex justify-content-center middle-line-wrapper">
                <div className="middle-line-container">
                  <div className="dot top-dot"></div>
                  <div className="v-line"></div>
                  <div className="dot bottom-dot"></div>
                </div>
              </div>

              {/* Form Section */}
              <FadeRight className="loc-block col-lg-6 col-md-12 col-sm-12">
                <div className="form-side">
                  <div className="title-box centered">
                    <div className="subtitle"><span>Write to us</span></div>
                    <h2>Message us</h2>
                    <div className="text desc">Get in touch for table reservations, group bookings, private rooftop parties, or event inquiries!</div>
                  </div>
                  <div className="default-form reservation-form">
                    {submitted ? (
                      <div style={{ color: '#CBA25A', textAlign: 'center', padding: '20px' }}>
                        ✓ Thank you! Your message to Brewocrat has been sent successfully. We will get back to you shortly!
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="clearfix">
                          <div className="form-group">
                            <div className="field-inner">
                              <input type="text" placeholder="Your Name" required />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="field-inner">
                              <input type="email" placeholder="Your Email" required />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="field-inner">
                              <input type="tel" placeholder="Phone Number (+91 73032 03535)" required />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="field-inner">
                              <textarea placeholder="Your Message / Reservation Inquiry" required></textarea>
                            </div>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="theme-btn btn-style-one clearfix border-0 cursor-pointer">
                              <span className="btn-wrap">
                                <span className="text-one">send your message</span>
                                <span className="text-two">send your message</span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </FadeRight>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <ScaleReveal className="contact-map">
        <div className="row clearfix">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1634.1448803875737!2d77.04636420132202!3d28.421022601263083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d237113c32b33%3A0x65060696b19cfa87!2sBrewocrat%20-%20Brewery%20Skybar%20%26%20Kitchen!5e0!3m2!1sen!2sin!4v1790246347275!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Brewocrat - Brewery Skybar & Kitchen Location Map"
          ></iframe>
        </div>
      </ScaleReveal>
    </div>
  );
}
